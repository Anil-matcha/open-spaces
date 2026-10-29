const state = {
  apiKey: "",
  sourceFile: null,
  referenceFile: null,
  sourceAssetId: null,
  sourceUrl: null,
  referenceUrl: null,
  draftRequestId: null,
  draftResumeOnly: false,
  draftUrl: null,
  finalRequestId: null,
  finalResumeOnly: false,
  finalizeUnknown: false,
  ffmpeg: false,
  busy: false,
  locked: false,
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  apiKey: $("#api-key"), sourceFile: $("#source-file"), referenceFile: $("#reference-file"),
  sourceName: $("#source-name"), referenceName: $("#reference-name"), sourcePreview: $("#source-preview"),
  referencePreview: $("#reference-preview"), uploadButton: $("#upload-button"), draftButton: $("#draft-button"),
  uploadStatus: $("#upload-status"), prompt: $("#prompt"), error: $("#error-box"),
  progress: $("#progress-panel"), progressTitle: $("#progress-title"), progressCopy: $("#progress-copy"),
  progressBar: $("#progress-bar"), progressLabel: $("#progress-label"), progressRequest: $("#progress-request"),
  draftPanel: $("#draft-panel"), draftVideo: $("#draft-video"), draftLink: $("#draft-open-link"),
  approveCheck: $("#approve-check"), finalizeButton: $("#finalize-button"), finalPanel: $("#final-panel"),
  finalVideo: $("#final-video"), downloadLink: $("#download-link"), requirements: $("#requirements-card"),
};

function setError(message) {
  elements.error.textContent = message || "Something went wrong.";
  elements.error.classList.remove("hidden");
}

function clearError() {
  elements.error.textContent = "";
  elements.error.classList.add("hidden");
}

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  let body = options.body;
  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.json);
  }
  const response = await fetch(path, { method: options.method || "GET", headers, body });
  let data = {};
  try { data = await response.json(); } catch { /* An empty error body is handled below. */ }
  if (!response.ok) {
    let detail = data.detail;
    if (detail && typeof detail === "object") detail = detail.error?.message || detail.message;
    const error = new Error(typeof detail === "string" ? detail : data.message || `Request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return data;
}

function busy(button, isBusy, label) {
  button.disabled = isBusy;
  button.classList.toggle("is-busy", isBusy);
  if (isBusy) button.dataset.originalText = button.innerHTML;
  if (label) button.innerHTML = label;
  else if (!isBusy && button.dataset.originalText) button.innerHTML = button.dataset.originalText;
}

function updateUploadButton() {
  const ready = Boolean(elements.apiKey.value.trim() && state.sourceFile && state.referenceFile && !state.busy && !state.locked);
  elements.uploadButton.disabled = !ready;
}

function lockInputs(locked) {
  state.locked = locked;
  [elements.apiKey, elements.sourceFile, elements.referenceFile, elements.prompt].forEach((input) => { input.disabled = locked; });
  updateUploadButton();
}

function setStep(activeStep) {
  document.querySelectorAll(".stepper-step").forEach((step) => {
    const number = Number(step.dataset.step);
    step.classList.toggle("active", number === activeStep);
    step.classList.toggle("done", number < activeStep);
  });
}

function showProgress(kind, requestId, status = "processing") {
  const isFinal = kind === "final";
  elements.progress.classList.remove("hidden");
  elements.draftPanel.classList.add("hidden");
  elements.finalPanel.classList.add("hidden");
  elements.progressTitle.textContent = isFinal ? "Rendering your approved final…" : "Preparing your draft…";
  elements.progressCopy.textContent = isFinal
    ? "The service is finalizing the accepted draft at 1080p. Keep this tab open while it runs."
    : "The service is generating your 480p preview. Keep this tab open while it runs.";
  elements.progressRequest.textContent = requestId ? `REQUEST ${requestId.slice(0, 12).toUpperCase()}` : "";
  const label = status === "submitting" ? "SUBMITTING REQUEST" : "WAITING FOR SERVICE";
  elements.progressLabel.textContent = label;
  elements.progressBar.classList.toggle("indeterminate", status !== "completed");
  elements.progressBar.classList.toggle("finished", status === "completed");
  $("#progress-eyebrow").textContent = isFinal ? "1080P FINAL RENDER" : "480P DRAFT PREVIEW";
}

function findVideoUrl(payload) {
  const roots = [payload?.output_data, payload?.output, payload?.result, payload?.data?.output_data, payload?.data?.output, payload?.data, payload];
  const seen = new Set();
  const visit = (value) => {
    if (!value || typeof value !== "object" || seen.has(value)) return null;
    seen.add(value);
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = visit(item);
        if (found) return found;
      }
      return null;
    }
    for (const key of ["video_url", "video", "output_url", "url"]) {
      const candidate = value[key];
      if (typeof candidate === "string" && /^https:\/\//i.test(candidate) && (key !== "url" || /\.mp4(?:\?|$)/i.test(candidate))) return candidate;
    }
    for (const child of Object.values(value)) {
      const found = visit(child);
      if (found) return found;
    }
    return null;
  };
  for (const root of roots) {
    const found = visit(root);
    if (found) return found;
  }
  return null;
}

function taskStatus(payload) {
  return String(payload?.status || payload?.task_status || payload?.prediction?.status || payload?.data?.status || "processing").toLowerCase();
}

async function waitForTask(requestId, kind) {
  const started = Date.now();
  const terminalSuccess = new Set(["completed", "succeeded", "success", "done"]);
  const terminalFailure = new Set(["failed", "error", "cancelled", "canceled"]);
  while (Date.now() - started < 45 * 60 * 1000) {
    const result = await api(`/api/predictions/${encodeURIComponent(requestId)}`, { headers: { "x-api-key": state.apiKey } });
    const status = taskStatus(result);
    showProgress(kind, requestId, status);
    if (terminalSuccess.has(status)) {
      const videoUrl = findVideoUrl(result);
      if (!videoUrl) throw new Error("The request completed, but no video URL was returned.");
      return { result, videoUrl };
    }
    if (terminalFailure.has(status)) {
      const detail = result?.error_message || result?.error?.message || result?.output_data?.error || "The service could not complete this request.";
      const error = new Error(String(detail));
      error.terminal = true;
      throw error;
    }
    await new Promise((resolve) => window.setTimeout(resolve, 3500));
  }
  throw new Error("This request is taking longer than expected. Check its status in your provider's history before submitting again.");
}

async function uploadOne(file, kind) {
  const form = new FormData();
  form.set("api_key", state.apiKey);
  form.set("kind", kind);
  form.set("file", file, file.name);
  return api("/api/upload", { method: "POST", body: form });
}

elements.apiKey.addEventListener("input", updateUploadButton);
elements.sourceFile.addEventListener("change", () => {
  state.sourceFile = elements.sourceFile.files?.[0] || null;
  state.sourceAssetId = null;
  state.sourceUrl = null;
  elements.sourceName.textContent = state.sourceFile?.name || "Choose your clip";
  if (state.sourceFile) {
    elements.sourcePreview.src = URL.createObjectURL(state.sourceFile);
    elements.sourcePreview.classList.remove("hidden");
  } else {
    elements.sourcePreview.classList.add("hidden");
  }
  elements.draftButton.classList.add("hidden");
  elements.uploadButton.classList.remove("hidden");
  elements.uploadStatus.textContent = "Source changed. Upload both files to continue.";
  updateUploadButton();
});
elements.referenceFile.addEventListener("change", () => {
  state.referenceFile = elements.referenceFile.files?.[0] || null;
  state.referenceUrl = null;
  elements.referenceName.textContent = state.referenceFile?.name || "Choose a clear image";
  if (state.referenceFile) {
    elements.referencePreview.src = URL.createObjectURL(state.referenceFile);
    elements.referencePreview.classList.remove("hidden");
  } else {
    elements.referencePreview.classList.add("hidden");
  }
  elements.draftButton.classList.add("hidden");
  elements.uploadButton.classList.remove("hidden");
  elements.uploadStatus.textContent = "Reference changed. Upload both files to continue.";
  updateUploadButton();
});

$("#toggle-key").addEventListener("click", () => {
  const isHidden = elements.apiKey.type === "password";
  elements.apiKey.type = isHidden ? "text" : "password";
  $("#toggle-key").textContent = isHidden ? "Hide" : "Show";
});

elements.uploadButton.addEventListener("click", async () => {
  clearError();
  state.apiKey = elements.apiKey.value.trim();
  if (!state.apiKey || !state.sourceFile || !state.referenceFile) return;
  state.busy = true;
  lockInputs(true);
  busy(elements.uploadButton, true, "Uploading…");
  elements.uploadStatus.textContent = "Uploading source video and character image…";
  try {
    const [source, reference] = await Promise.all([
      uploadOne(state.sourceFile, "source"),
      uploadOne(state.referenceFile, "reference"),
    ]);
    state.sourceAssetId = source.asset_id;
    state.sourceUrl = source.url;
    state.referenceUrl = reference.url;
    elements.uploadStatus.innerHTML = '<span class="uploaded-check">✓</span> Media uploaded. Your source is also held locally for audio restoration.';
    elements.uploadButton.classList.add("hidden");
    elements.draftButton.classList.remove("hidden");
    elements.draftButton.disabled = false;
  } catch (error) {
    setError(error.message);
    elements.uploadStatus.textContent = "Upload did not finish. Check your key and try again.";
    busy(elements.uploadButton, false);
  } finally {
    state.busy = false;
    lockInputs(false);
    updateUploadButton();
    elements.draftButton.disabled = !state.sourceUrl || !state.referenceUrl;
  }
});

elements.draftButton.addEventListener("click", async () => {
  clearError();
  state.apiKey = elements.apiKey.value.trim();
  if (!state.sourceUrl || !state.referenceUrl || !state.apiKey) return;
  const resume = state.draftResumeOnly;
  const prompt = elements.prompt.value.trim();
  if (!resume && prompt.length < 8) return setError("Add a little more direction before creating the draft.");
  if (!resume && !state.ffmpeg) return setError("Install FFmpeg and ffprobe before making a draft. The final export uses them to restore the original soundtrack.");
  state.busy = true;
  lockInputs(true);
  elements.draftButton.classList.add("hidden");
  setStep(2);
  showProgress("draft", state.draftRequestId, resume ? "processing" : "submitting");
  busy(elements.draftButton, true, resume ? "Checking draft…" : "Submitting draft…");
  try {
    if (!resume) {
      const submitted = await api("/api/draft", {
        method: "POST",
        json: {
          api_key: state.apiKey,
          source_asset_id: state.sourceAssetId,
          source_url: state.sourceUrl,
          reference_url: state.referenceUrl,
          prompt,
        },
      });
      state.draftRequestId = submitted.request_id;
    }
    const completed = await waitForTask(state.draftRequestId, "draft");
    showProgress("draft", state.draftRequestId, "completed");
    elements.progressTitle.textContent = "Preparing your review copy…";
    elements.progressCopy.textContent = "Adding the original soundtrack to the 480p preview on this device.";
    const preview = await api("/api/export", {
      method: "POST",
      json: { source_asset_id: state.sourceAssetId, video_url: completed.videoUrl },
    });
    state.draftResumeOnly = false;
    state.draftUrl = preview.download_url;
    elements.draftVideo.src = state.draftUrl;
    elements.draftLink.href = state.draftUrl;
    elements.draftPanel.classList.remove("hidden");
    elements.progress.classList.add("hidden");
    elements.approveCheck.checked = false;
    elements.finalizeButton.disabled = true;
    document.querySelector("#draft-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    elements.progress.classList.add("hidden");
    if (error.terminal) {
      state.draftRequestId = null;
      state.draftResumeOnly = false;
      setError(`The service marked this draft as failed. Check request history and credits before submitting a fresh draft. ${error.message}`);
      elements.draftButton.textContent = "Create a new 480p draft →";
      elements.draftButton.classList.remove("hidden");
      lockInputs(false);
    } else if (state.draftRequestId) {
      state.draftResumeOnly = true;
      setError(`Draft request ${state.draftRequestId} was submitted. Resume status checks here to avoid another paid submission. ${error.message}`);
      elements.draftButton.textContent = "Resume draft status →";
      elements.draftButton.classList.remove("hidden");
      lockInputs(true);
    } else if (error.status === 504) {
      setError("The service did not confirm whether the draft request was accepted. Check generation history before starting another job. Clear local files only after you have checked.");
      lockInputs(true);
    } else {
      setError(error.message);
      setStep(1);
      elements.draftButton.textContent = "Create 480p draft →";
      elements.draftButton.classList.remove("hidden");
      lockInputs(false);
    }
  } finally {
    state.busy = false;
    busy(elements.draftButton, false);
  }
});

elements.approveCheck.addEventListener("change", () => {
  elements.finalizeButton.disabled = !elements.approveCheck.checked || !state.ffmpeg || state.busy;
});

elements.finalizeButton.addEventListener("click", async () => {
  clearError();
  const resume = state.finalResumeOnly;
  if ((!elements.approveCheck.checked && !resume) || (!state.draftRequestId && !resume)) return;
  if (!state.ffmpeg) return setError("FFmpeg is required to create the final file with source audio.");
  state.busy = true;
  if (!resume) state.finalizeUnknown = false;
  elements.approveCheck.disabled = true;
  setStep(3);
  showProgress("final", state.finalRequestId, resume ? "processing" : "submitting");
  busy(elements.finalizeButton, true, resume ? "Checking final…" : "Submitting final…");
  try {
    if (!resume) {
      const submitted = await api("/api/finalize", {
        method: "POST",
        json: { api_key: state.apiKey, draft_request_id: state.draftRequestId },
      });
      state.finalRequestId = submitted.request_id;
    }
    const completed = await waitForTask(state.finalRequestId, "final");
    state.finalResumeOnly = false;
    showProgress("final", state.finalRequestId, "completed");
    elements.progressTitle.textContent = "Restoring the source soundtrack…";
    elements.progressCopy.textContent = "Downloading your final render and muxing the original audio on this device.";
    const exported = await api("/api/export", {
      method: "POST",
      json: { source_asset_id: state.sourceAssetId, video_url: completed.videoUrl },
    });
    elements.finalVideo.src = exported.download_url;
    elements.downloadLink.href = exported.download_url;
    elements.downloadLink.download = "open-genjutsu-final.mp4";
    $("#export-headline").textContent = exported.source_audio_restored ? "Original soundtrack restored." : "Final render ready.";
    $("#export-copy").textContent = exported.source_audio_restored
      ? "The complete source audio track has been muxed into your 1080p render locally."
      : "The source clip has no audio track, so the generated video was exported as-is.";
    elements.finalPanel.classList.remove("hidden");
    elements.progress.classList.add("hidden");
    document.querySelector("#final-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    elements.progress.classList.add("hidden");
    if (error.terminal) {
      state.finalRequestId = null;
      state.finalResumeOnly = false;
      setError(`The service marked this final render as failed. Check request history and credits before retrying. ${error.message}`);
      elements.finalizeButton.textContent = "Retry 1080p final →";
      elements.approveCheck.disabled = false;
      setStep(2);
    } else if (state.finalRequestId) {
      state.finalResumeOnly = true;
      setError(`Final request ${state.finalRequestId} was submitted. Resume status checks here; this will not submit another render. ${error.message}`);
      elements.finalizeButton.textContent = "Resume final status →";
      elements.finalizeButton.disabled = false;
      elements.approveCheck.disabled = true;
      setStep(3);
    } else if (error.status === 504) {
      state.finalizeUnknown = true;
      setError("The service did not confirm whether the final request was accepted. Check generation history before trying again. The app has disabled another final submission for this draft.");
      elements.finalizeButton.disabled = true;
      elements.approveCheck.disabled = true;
      setStep(3);
    } else {
      setError(error.message);
      elements.approveCheck.disabled = false;
      setStep(2);
    }
  } finally {
    state.busy = false;
    busy(elements.finalizeButton, false);
    if (state.finalResumeOnly) {
      elements.finalizeButton.textContent = "Resume final status →";
      elements.finalizeButton.disabled = false;
    } else if (state.finalRequestId) {
      elements.finalizeButton.disabled = true;
    } else if (state.finalizeUnknown) {
      elements.finalizeButton.disabled = true;
    } else {
      elements.finalizeButton.textContent = "Approve & render 1080p →";
      elements.finalizeButton.disabled = !elements.approveCheck.checked || !state.ffmpeg;
    }
  }
});

$("#clear-button").addEventListener("click", async () => {
  if (state.busy) {
    setError("Wait for the current upload or render step to finish before clearing the session.");
    return;
  }
  try { await api("/api/clear", { method: "POST", json: {} }); } catch { /* Local state is still cleared. */ }
  state.apiKey = "";
  state.busy = false;
  state.finalizeUnknown = false;
  lockInputs(false);
  state.sourceAssetId = state.sourceUrl = state.referenceUrl = state.draftRequestId = state.draftUrl = null;
  state.draftResumeOnly = state.finalRequestId = state.finalResumeOnly = null;
  state.sourceFile = state.referenceFile = null;
  elements.apiKey.value = "";
  elements.sourceFile.value = "";
  elements.referenceFile.value = "";
  elements.sourcePreview.pause();
  elements.draftVideo.pause();
  elements.finalVideo.pause();
  elements.sourcePreview.removeAttribute("src");
  elements.referencePreview.removeAttribute("src");
  elements.draftVideo.removeAttribute("src");
  elements.finalVideo.removeAttribute("src");
  elements.draftPanel.classList.add("hidden");
  elements.finalPanel.classList.add("hidden");
  elements.progress.classList.add("hidden");
  elements.draftButton.classList.add("hidden");
  elements.uploadButton.classList.remove("hidden");
  elements.uploadStatus.textContent = "Add both files and your API key to continue.";
  elements.sourcePreview.classList.add("hidden");
  elements.referencePreview.classList.add("hidden");
  elements.sourceName.textContent = "Choose your clip";
  elements.referenceName.textContent = "Choose a clear image";
  elements.approveCheck.checked = false;
  elements.approveCheck.disabled = false;
  elements.draftButton.textContent = "Create 480p draft →";
  elements.finalizeButton.textContent = "Approve & render 1080p →";
  elements.finalizeButton.disabled = true;
  setStep(1);
  clearError();
  updateUploadButton();
});

$("#new-recast-button").addEventListener("click", () => $("#clear-button").click());

api("/api/health").then((health) => {
  state.ffmpeg = Boolean(health.ffmpeg && health.ffprobe);
  if (state.ffmpeg) {
    elements.requirements.innerHTML = '<span class="requirements-icon good">✓</span><div><strong>FFmpeg ready</strong><span>Source audio can be restored in the final export.</span></div>';
  } else {
    elements.requirements.innerHTML = '<span class="requirements-icon warn">!</span><div><strong>FFmpeg not found</strong><span>Install FFmpeg and ffprobe to enable draft and final exports.</span></div>';
  }
}).catch(() => {
  elements.requirements.innerHTML = '<span class="requirements-icon warn">!</span><div><strong>Local service unavailable</strong><span>Restart the app server, then refresh this page.</span></div>';
});
