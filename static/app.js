const state = {
  apiKey: "",
  sourceFile: null,
  referenceFile: null,
  sourceAssetId: null,
  sourceUrl: null,
  referenceUrl: null,
  uploaded: false,
  preparationId: null,
  preparationReady: false,
  preparationResumeOnly: false,
  preparationUnknown: false,
  draftRequestId: null,
  draftResumeOnly: false,
  draftUnknown: false,
  draftUrl: null,
  finalRequestId: null,
  finalResumeOnly: false,
  finalizeUnknown: false,
  ffmpeg: false,
  busy: false,
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  apiKey: $("#api-key"),
  sourceFile: $("#source-file"),
  referenceFile: $("#reference-file"),
  sourceName: $("#source-name"),
  referenceName: $("#reference-name"),
  sourcePreview: $("#source-preview"),
  referencePreview: $("#reference-preview"),
  uploadButton: $("#upload-button"),
  prepareButton: $("#prepare-button"),
  draftButton: $("#draft-button"),
  uploadStatus: $("#upload-status"),
  prompt: $("#prompt"),
  error: $("#error-box"),
  progress: $("#progress-panel"),
  progressTitle: $("#progress-title"),
  progressCopy: $("#progress-copy"),
  progressBar: $("#progress-bar"),
  progressLabel: $("#progress-label"),
  progressRequest: $("#progress-request"),
  prepPanel: $("#prep-panel"),
  prepSourceVideo: $("#prep-source-video"),
  depthVideo: $("#depth-video"),
  matteVideo: $("#matte-video"),
  compositeVideo: $("#composite-video"),
  prepApproveCheck: $("#prep-approve-check"),
  draftPanel: $("#draft-panel"),
  draftVideo: $("#draft-video"),
  draftLink: $("#draft-open-link"),
  approveCheck: $("#approve-check"),
  finalizeButton: $("#finalize-button"),
  finalPanel: $("#final-panel"),
  finalVideo: $("#final-video"),
  downloadLink: $("#download-link"),
  requirements: $("#requirements-card"),
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
  try { data = await response.json(); } catch { /* The status code below is enough for an empty response. */ }
  if (!response.ok) {
    let detail = data.detail;
    if (detail && typeof detail === "object") detail = detail.error?.message || detail.message;
    const error = new Error(typeof detail === "string" ? detail : data.message || "Request failed (" + response.status + ").");
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

function updateControls() {
  const ready = Boolean(elements.apiKey.value.trim() && state.sourceFile && state.referenceFile && !state.busy && !state.uploaded);
  elements.uploadButton.disabled = !ready;
  elements.apiKey.disabled = state.busy;
  elements.sourceFile.disabled = state.busy || state.uploaded;
  elements.referenceFile.disabled = state.busy || state.uploaded;
  elements.prompt.disabled = state.busy;
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
  const isPrep = kind === "preparation";
  elements.progress.classList.remove("hidden");
  elements.draftPanel.classList.add("hidden");
  elements.finalPanel.classList.add("hidden");
  elements.progressTitle.textContent = isPrep
    ? "Preparing depth and subject matte…"
    : isFinal ? "Rendering your approved final…" : "Preparing your draft…";
  elements.progressCopy.textContent = isPrep
    ? "Depth extraction and subject separation run in parallel. This can take several minutes."
    : isFinal
      ? "The accepted draft is being rendered at 1080p. Keep this tab open while it runs."
      : "The reviewed depth composite is being generated as a 480p preview. Keep this tab open while it runs.";
  elements.progressRequest.textContent = requestId ? "REQUEST " + requestId.slice(0, 12).toUpperCase() : "";
  const labels = { submitting: "SUBMITTING REQUEST", processing: "WAITING FOR SERVICE", completed: "COMPLETE" };
  elements.progressLabel.textContent = labels[status] || "WAITING FOR SERVICE";
  elements.progressBar.classList.toggle("indeterminate", status !== "completed");
  elements.progressBar.classList.toggle("finished", status === "completed");
  $("#progress-eyebrow").textContent = isPrep ? "DEPTH + MATTE PREPARATION" : isFinal ? "1080P FINAL RENDER" : "480P DRAFT PREVIEW";
}

function findVideoUrl(payload) {
  const seen = new Set();
  const visit = (value) => {
    if (typeof value === "string") {
      return /^https:\/\//i.test(value) && /\.(mp4|webm|mov|mkv|gif)(\?|$)/i.test(value) ? value : null;
    }
    if (!value || typeof value !== "object" || seen.has(value)) return null;
    seen.add(value);
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = visit(item);
        if (found) return found;
      }
      return null;
    }
    for (const key of ["video_url", "video", "output_url", "url", "outputs"]) {
      const found = visit(value[key]);
      if (found) return found;
    }
    for (const child of Object.values(value)) {
      const found = visit(child);
      if (found) return found;
    }
    return null;
  };
  return visit(payload?.output_data || payload?.output || payload?.result || payload?.data || payload);
}

function taskStatus(payload) {
  return String(payload?.status || payload?.task_status || payload?.prediction?.status || payload?.data?.status || "processing").toLowerCase();
}

function sleep(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function waitForTask(requestId, kind) {
  const started = Date.now();
  const terminalSuccess = new Set(["completed", "succeeded", "success", "done"]);
  const terminalFailure = new Set(["failed", "error", "cancelled", "canceled"]);
  while (Date.now() - started < 45 * 60 * 1000) {
    const result = await api("/api/predictions/" + encodeURIComponent(requestId), {
      headers: { "x-api-key": state.apiKey },
    });
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
    await sleep(3500);
  }
  throw new Error("This request is taking longer than expected. Check its status before submitting another generation.");
}

async function waitForPreparation() {
  const started = Date.now();
  const complete = new Set(["completed", "succeeded", "success", "done"]);
  const failed = new Set(["failed", "error", "cancelled", "canceled", "unknown"]);
  while (Date.now() - started < 45 * 60 * 1000) {
    const status = await api("/api/preparations/" + encodeURIComponent(state.preparationId) + "/status", {
      headers: { "x-api-key": state.apiKey },
    });
    const depthStatus = status.depth?.status || "unknown";
    const matteStatus = status.matte?.status || "unknown";
    const depthDone = complete.has(depthStatus);
    const matteDone = complete.has(matteStatus);
    elements.progressCopy.textContent = "Depth map: " + depthStatus + " · Subject matte: " + matteStatus + ".";
    elements.progressRequest.textContent = [
      status.depth?.request_id ? "DEPTH " + status.depth.request_id.slice(0, 8).toUpperCase() : "",
      status.matte?.request_id ? "MATTE " + status.matte.request_id.slice(0, 8).toUpperCase() : "",
    ].filter(Boolean).join(" · ");
    if (failed.has(depthStatus) || failed.has(matteStatus)) {
      const detail = status.depth?.error || status.matte?.error || "A preparation task did not complete.";
      const error = new Error(detail + " Check request history before starting another preparation.");
      error.terminal = true;
      throw error;
    }
    if (depthDone && matteDone && status.ready) return status;
    await sleep(3500);
  }
  throw new Error("Preparation is still running. Resume status checks here; do not submit another preparation.");
}

async function uploadOne(file, kind) {
  const form = new FormData();
  form.set("api_key", state.apiKey);
  form.set("kind", kind);
  form.set("file", file, file.name);
  return api("/api/upload", { method: "POST", body: form });
}

elements.apiKey.addEventListener("input", updateControls);
elements.sourceFile.addEventListener("change", () => {
  state.sourceFile = elements.sourceFile.files?.[0] || null;
  elements.sourceName.textContent = state.sourceFile?.name || "Choose your clip";
  if (state.sourceFile) {
    elements.sourcePreview.src = URL.createObjectURL(state.sourceFile);
    elements.sourcePreview.classList.remove("hidden");
  } else {
    elements.sourcePreview.classList.add("hidden");
    elements.sourcePreview.removeAttribute("src");
  }
  updateControls();
});
elements.referenceFile.addEventListener("change", () => {
  state.referenceFile = elements.referenceFile.files?.[0] || null;
  elements.referenceName.textContent = state.referenceFile?.name || "Choose a clear image";
  if (state.referenceFile) {
    elements.referencePreview.src = URL.createObjectURL(state.referenceFile);
    elements.referencePreview.classList.remove("hidden");
  } else {
    elements.referencePreview.classList.add("hidden");
    elements.referencePreview.removeAttribute("src");
  }
  updateControls();
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
  updateControls();
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
    state.uploaded = true;
    elements.uploadStatus.innerHTML = '<span class="uploaded-check">✓</span> Media uploaded. The source also stays on this device for audio restoration.';
    elements.uploadButton.classList.add("hidden");
    elements.prepareButton.classList.remove("hidden");
    elements.prepareButton.disabled = false;
    setStep(2);
  } catch (error) {
    setError(error.message);
    elements.uploadStatus.textContent = "Upload did not finish. Check your key and try again.";
  } finally {
    state.busy = false;
    busy(elements.uploadButton, false);
    updateControls();
  }
});

elements.prepareButton.addEventListener("click", async () => {
  clearError();
  state.apiKey = elements.apiKey.value.trim() || state.apiKey;
  if (!state.sourceAssetId || !state.apiKey || state.preparationUnknown) return;
  state.busy = true;
  updateControls();
  elements.prepareButton.classList.add("hidden");
  showProgress("preparation", null, state.preparationResumeOnly ? "processing" : "submitting");
  try {
    if (!state.preparationId) {
      const submitted = await api("/api/prepare", {
        method: "POST",
        json: { api_key: state.apiKey, source_asset_id: state.sourceAssetId },
      });
      state.preparationId = submitted.preparation_id;
    }
    const completed = await waitForPreparation();
    await api("/api/preparations/" + encodeURIComponent(state.preparationId) + "/compose", { method: "POST", json: {} });
    const mediaBase = "/api/preparations/" + encodeURIComponent(state.preparationId) + "/media/";
    elements.prepSourceVideo.src = mediaBase + "source";
    elements.depthVideo.src = mediaBase + "depth";
    elements.matteVideo.src = mediaBase + "matte";
    elements.compositeVideo.src = mediaBase + "prepared";
    state.preparationReady = Boolean(completed.ready);
    state.preparationResumeOnly = false;
    elements.prepPanel.classList.remove("hidden");
    elements.progress.classList.add("hidden");
    elements.prepApproveCheck.checked = false;
    elements.draftButton.disabled = true;
    setStep(2);
    elements.prepPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    elements.progress.classList.add("hidden");
    if (error.status === 504 && !state.preparationId) {
      state.preparationUnknown = true;
      setError("The service did not confirm whether preparation was accepted. Check request history before retrying; the app has disabled another submission for this source.");
    } else if (error.terminal) {
      state.preparationUnknown = true;
      setError("A depth or matte task failed or returned an unclear result. Check request history, then clear this session before starting a new preparation. " + error.message);
    } else if (state.preparationId) {
      state.preparationResumeOnly = true;
      elements.prepareButton.innerHTML = "Resume preparation status <span aria-hidden=\"true\">→</span>";
      elements.prepareButton.classList.remove("hidden");
      elements.prepareButton.disabled = false;
      setError("Preparation request is still associated with this session. Resume status checks to avoid submitting duplicate tasks. " + error.message);
    } else {
      elements.prepareButton.classList.remove("hidden");
      elements.prepareButton.disabled = false;
      setError(error.message);
    }
  } finally {
    state.busy = false;
    updateControls();
  }
});

elements.prepApproveCheck.addEventListener("change", () => {
  elements.draftButton.disabled = !elements.prepApproveCheck.checked || !state.preparationReady || state.busy;
});

elements.draftButton.addEventListener("click", async () => {
  clearError();
  state.apiKey = elements.apiKey.value.trim() || state.apiKey;
  if (!state.preparationReady || !elements.prepApproveCheck.checked || !state.apiKey) return;
  const prompt = elements.prompt.value.trim();
  if (!state.draftResumeOnly && prompt.length < 8) return setError("Add a little more direction before creating the draft.");
  if (!state.ffmpeg) return setError("Install FFmpeg and ffprobe before making a draft. They are used to create the composite and restore source audio.");
  state.busy = true;
  updateControls();
  elements.draftButton.classList.add("hidden");
  setStep(3);
  showProgress("draft", state.draftRequestId, state.draftResumeOnly ? "processing" : "submitting");
  busy(elements.draftButton, true, state.draftResumeOnly ? "Checking draft…" : "Submitting draft…");
  try {
    if (!state.draftResumeOnly) {
      const submitted = await api("/api/draft", {
        method: "POST",
        json: {
          api_key: state.apiKey,
          source_asset_id: state.sourceAssetId,
          preparation_id: state.preparationId,
          preparation_approved: true,
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
    elements.draftPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    elements.progress.classList.add("hidden");
    if (error.terminal) {
      state.draftRequestId = null;
      state.draftResumeOnly = false;
      setError("The service marked this draft as failed. Check request history before submitting another. " + error.message);
      elements.draftButton.textContent = "Create a new 480p draft →";
      elements.draftButton.classList.remove("hidden");
      elements.draftButton.disabled = !elements.prepApproveCheck.checked;
      setStep(2);
    } else if (state.draftRequestId) {
      state.draftResumeOnly = true;
      setError("Draft request " + state.draftRequestId + " was submitted. Resume its status here to avoid another paid submission. " + error.message);
      elements.draftButton.innerHTML = "Resume draft status <span aria-hidden=\"true\">→</span>";
      elements.draftButton.classList.remove("hidden");
      elements.draftButton.disabled = false;
    } else if (error.status === 504) {
      state.draftUnknown = true;
      setError("The service did not confirm whether the draft was accepted. Check generation history before starting another job. The app has disabled another draft submission.");
    } else {
      setError(error.message);
      setStep(2);
      elements.draftButton.textContent = "Create 480p draft →";
      elements.draftButton.classList.remove("hidden");
      elements.draftButton.disabled = !elements.prepApproveCheck.checked;
    }
  } finally {
    state.busy = false;
    busy(elements.draftButton, false);
    updateControls();
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
  setStep(4);
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
    elements.finalPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    elements.progress.classList.add("hidden");
    if (error.terminal) {
      state.finalRequestId = null;
      state.finalResumeOnly = false;
      setError("The service marked this final render as failed. Check request history before retrying. " + error.message);
      elements.finalizeButton.textContent = "Retry 1080p final →";
      elements.approveCheck.disabled = false;
      setStep(3);
    } else if (state.finalRequestId) {
      state.finalResumeOnly = true;
      setError("Final request " + state.finalRequestId + " was submitted. Resume status checks here; this will not submit another render. " + error.message);
      elements.finalizeButton.textContent = "Resume final status →";
      elements.finalizeButton.disabled = false;
      elements.approveCheck.disabled = true;
    } else if (error.status === 504) {
      state.finalizeUnknown = true;
      setError("The service did not confirm whether the final request was accepted. Check generation history before trying again. The app has disabled another final submission for this draft.");
      elements.finalizeButton.disabled = true;
      elements.approveCheck.disabled = true;
      setStep(3);
    } else {
      setError(error.message);
      elements.approveCheck.disabled = false;
      setStep(3);
    }
  } finally {
    state.busy = false;
    busy(elements.finalizeButton, false);
    if (state.finalResumeOnly) {
      elements.finalizeButton.textContent = "Resume final status →";
      elements.finalizeButton.disabled = false;
    } else if (state.finalRequestId || state.finalizeUnknown) {
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
  try { await api("/api/clear", { method: "POST", json: {} }); } catch { /* Clear browser state even if server cleanup is unavailable. */ }
  state.apiKey = "";
  state.sourceFile = state.referenceFile = null;
  state.sourceAssetId = state.sourceUrl = state.referenceUrl = null;
  state.uploaded = false;
  state.preparationId = null;
  state.preparationReady = false;
  state.preparationResumeOnly = false;
  state.preparationUnknown = false;
  state.draftRequestId = state.draftUrl = null;
  state.draftResumeOnly = false;
  state.draftUnknown = false;
  state.finalRequestId = null;
  state.finalResumeOnly = false;
  state.finalizeUnknown = false;
  state.busy = false;
  elements.apiKey.value = "";
  elements.sourceFile.value = "";
  elements.referenceFile.value = "";
  [elements.sourcePreview, elements.prepSourceVideo, elements.depthVideo, elements.matteVideo, elements.compositeVideo, elements.draftVideo, elements.finalVideo].forEach((video) => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
  elements.referencePreview.removeAttribute("src");
  elements.prepPanel.classList.add("hidden");
  elements.draftPanel.classList.add("hidden");
  elements.finalPanel.classList.add("hidden");
  elements.progress.classList.add("hidden");
  elements.prepareButton.classList.add("hidden");
  elements.uploadButton.classList.remove("hidden");
  elements.uploadStatus.textContent = "Add both files and your API key to continue.";
  elements.sourcePreview.classList.add("hidden");
  elements.referencePreview.classList.add("hidden");
  elements.sourceName.textContent = "Choose your clip";
  elements.referenceName.textContent = "Choose a clear image";
  elements.prepApproveCheck.checked = false;
  elements.approveCheck.checked = false;
  elements.approveCheck.disabled = false;
  elements.draftButton.textContent = "Create 480p draft →";
  elements.draftButton.classList.remove("hidden");
  elements.draftButton.disabled = true;
  elements.finalizeButton.textContent = "Approve & render 1080p →";
  elements.finalizeButton.disabled = true;
  elements.prepareButton.innerHTML = "Prepare depth + subject mask <span aria-hidden=\"true\">→</span>";
  elements.prepareButton.disabled = true;
  setStep(1);
  clearError();
  updateControls();
});

$("#new-recast-button").addEventListener("click", () => $("#clear-button").click());

api("/api/health").then((health) => {
  state.ffmpeg = Boolean(health.ffmpeg && health.ffprobe);
  if (state.ffmpeg) {
    elements.requirements.innerHTML = '<span class="requirements-icon good">✓</span><div><strong>FFmpeg ready</strong><span>Depth compositing and source-audio restoration are available.</span></div>';
  } else {
    elements.requirements.innerHTML = '<span class="requirements-icon warn">!</span><div><strong>FFmpeg not found</strong><span>Install FFmpeg and ffprobe to create the depth composite and export with source audio.</span></div>';
  }
}).catch(() => {
  elements.requirements.innerHTML = '<span class="requirements-icon warn">!</span><div><strong>Local service unavailable</strong><span>Restart the app server, then refresh this page.</span></div>';
});
