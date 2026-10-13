<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)
[![Jev](https://img.shields.io/badge/TypeSafe-Jev-0d9488)](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
[![API docs](https://img.shields.io/badge/API-Docs-0f766e)](https://docs.typesafe.ai/api)
[![Python SDK](https://img.shields.io/badge/Python-SDK-3776ab)](https://github.com/typesafe-ai/typesafe-sdk-python)
[![JavaScript SDK](https://img.shields.io/badge/JavaScript-SDK-f7df1e?logo=javascript&logoColor=111827)](https://github.com/typesafe-ai/typesafe-sdk-js)

</div>

# Awesome Jev by TypeSafe

<p align="center"><a href="https://youtu.be/BOn4OMC8O9c"><img src="https://i.ytimg.com/vi/BOn4OMC8O9c/maxresdefault.jpg" width="720"></a></p>
<p align="center"><a href="https://youtu.be/BOn4OMC8O9c"><b>▶ Watch: Jev: 8 Wild Things People Already Built With TypeSafe's New AI Model </b></a></p>

An evidence-backed, practical collection of use cases, patterns, prompts, and starter code for **Jev**, TypeSafe AI’s first **System One Model**.

Jev is built for software that needs a judgment, not a paragraph:

```text
text or JSON state + typed questions → constrained answers + probabilities → your code
```

Use it to classify, route, score, detect, rank, extract, verify, and gate automation. Keep the final control flow, thresholds, and side effects in code.

> This is an independent community collection. It is not an official TypeSafe AI repository. Product behavior, prices, limits, and model aliases can change.
>
> Snapshot reviewed: **September 19, 2026.**

## Related Projects

- [awesome-gpt-6-astra](https://github.com/Anil-matcha/awesome-gpt-6-astra) — sibling evidence-backed use-case collection for a general-purpose reasoning model.
- [awesome-meta-muse-agent](https://github.com/Anil-matcha/awesome-meta-muse-agent) — copy-paste Muse agent briefs with explicit connectors, approval boundaries, and evidence workflows.
- [BTK audit studies](https://boringtoolskit.com/blog/seo-audit-cost-2026/) — Jev-powered technical SEO audit cost study and calculator-site comparison: 1,204 pages crawled, 4,816 typed judgments per run, $0.0048 per 12-query triage batch.
- [awesome-agent-apis](https://github.com/Anil-matcha/awesome-agent-apis) — catalog of APIs and tools that typed decisions can route to.
- [open-business-agents](https://github.com/Anil-matcha/open-business-agents) — specialized business agents that can use Jev as a decision and safety layer.
- [awesome-generative-ai-apps](https://github.com/Anil-matcha/awesome-generative-ai-apps) — production-oriented AI app templates where Jev can help with routing, guardrails, and verification.
- [llm-wiki-agent](https://github.com/SamurAIGPT/llm-wiki-agent) — persistent, interlinked knowledge workflow that pairs naturally with semantic retrieval and citation checks.
- [Paper Radar](https://github.com/Eliot5566/JEV-Paper-Radar) — daily arXiv/bioRxiv radar: one Noul per plain-English interest for every new paper, thresholds applied in code, published as a page and RSS from GitHub Actions; 501 papers for $0.0196 in a measured run, with `calibrate` for checking Jev's calibration on your own labels.
- [How to Use Jev](https://howtousejev.com/blog) — independent guide site with 19 free articles written against `jev-1.13.0`: writing `Choice`, `Score`, and `Noul` questions, picking confidence thresholds in code, averaging out option-order effects in one request, and a summary of published prompt-injection tests with links to each source; full text at [llms-full.txt](https://howtousejev.com/llms-full.txt). Not affiliated with TypeSafe; paid interactive courses are sold separately.

## Related directories

- [awesome-jev-prompts](https://github.com/vicfei/awesome-jev-prompts) — 43 field-tested Jev question patterns (Choice/Score/Noul) with templates, thresholds, and failure modes, plus 10 anti-patterns. CC0, bilingual EN/中文.
- [Awesome Jev directory](https://awesomejev.com/) — searchable, daily-refreshed directory of Jev repositories, live demos, benchmarks, and articles; use it for discovery, not as an endorsement.
- [yibie/awesome-jev](https://github.com/yibie/awesome-jev) — high-signal field guide with explicit inclusion and evidence rules.
- [cobanov/awesome-jev](https://github.com/cobanov/awesome-jev) — source-backed ecosystem list organized around SDKs, agent tooling, workflows, games, reproductions, and evaluation.
- [AnotiaWang/awesome-jev](https://github.com/AnotiaWang/awesome-jev) — broad index covering official resources, clients, agent tools, games, research, cookbooks, and patterns.
- [awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe) — broader TypeSafe/System One index including official resources and community projects.
- [valentynkit/awesome-jev-typesafe](https://github.com/valentynkit/awesome-jev-typesafe) — CC0 and awesome-lint clean, sorted by what you would install, with a short "know before you build" section on the limits.
- [MrJev/awesome-jev](https://github.com/MrJev/awesome-jev) — selective list behind a 10-star bar, paired with hands-on reviews at [mrjev.com](https://mrjev.com/best-jev-tools/) that record what each tool sends and where.
- [jev-in-the-wild](https://github.com/Jessie-QingYu/jev-in-the-wild) — index of what people build with Jev that reaches past GitHub into Reddit, Hacker News and YouTube, and keeps a section for the benchmarks and reports where Jev did not work; machine-readable JSON with a schema, rebuilt daily.

## The short version

Most LLMs produce strings for people. Jev evaluates a state against questions whose answer spaces you define in advance. It returns typed values and probability distributions that ordinary software can branch on.

That makes Jev a good fit for the fuzzy middle between brittle rules and expensive generative workflows:

| If your application needs to… | Reach for… |
|---|---|
| Pick one value from a known set | `Choice` |
| Measure a position on an ordered rubric | `Score` |
| Estimate whether a condition is true | `Noul` |
| Decide whether to act, review, or fall back | probabilities + confidence + code |
| Write an explanation, code, or a reply | an LLM, optionally after Jev routes or verifies it |

## Quick facts

| Item | Current detail | Source |
|---|---|---|
| Model | **Jev**, TypeSafe’s flagship and first System One model | [Introduction](https://docs.typesafe.ai/introduction) |
| API model alias | `jev-latest` | [Models](https://docs.typesafe.ai/models) |
| Current version listed by TypeSafe | `jev-1.13.0` | [Models](https://docs.typesafe.ai/models) |
| Endpoint | `POST https://api.typesafe.ai/v1/systemone` | [API reference](https://docs.typesafe.ai/api) |
| Input | A string, JSON object, or array of text values | [State](https://docs.typesafe.ai/concepts/state) |
| Output | `Choice`, `Score`, and `Noul` answers with typed fields; Choice and Score also include probabilities and confidence | [Primitives](https://docs.typesafe.ai/primitives) |
| Current listed price | `$0.042 / 1M` input tokens; output tokens listed as free | [Models](https://docs.typesafe.ai/models) |
| Current listed limits | `250,000` tokens/second and `1,200` requests/minute; TypeSafe says limits can change dynamically | [Models](https://docs.typesafe.ai/models) |
| Context length | `64k` tokens per request; TypeSafe documents `32k` for state plus the longest question | [Models](https://docs.typesafe.ai/models) |
| Alias behavior | `jev-latest` and `jev-preview` resolve to versioned releases; aliases can move | [Models](https://docs.typesafe.ai/models) |
| Calibration guidance | Pin a versioned model ID when thresholds depend on model behavior, and log the version returned in each response | [Models](https://docs.typesafe.ai/models) |
| Language guidance | English is the primary language; test non-English workloads on representative data before relying on calibrated thresholds | [Models](https://docs.typesafe.ai/models) |
| Data handling | TypeSafe says customer requests and responses are not used to train models; check current enterprise retention terms for zero-data-retention requirements | [Models](https://docs.typesafe.ai/models) |
| Modalities | Text only for now; images, audio, and video are not supported | [System One](https://docs.typesafe.ai/concepts/system-one) |
| Availability | Early access at launch; check the [TypeSafe console](https://console.typesafe.ai/) | [Launch post](https://typesafe.ai/blog/introducing-system-one-models-and-jev) |

TypeSafe’s launch materials report **70–500 ms** end-to-end response times for TypeSafe and describe Jev as roughly two orders of magnitude faster and more efficient for System One-shaped tasks. Treat those as vendor-reported, workload-dependent results; benchmark your own state, question design, network path, and concurrency.

### Official access paths

| Path | Best fit | Notes |
|---|---|---|
| [Official API and SDKs](https://docs.typesafe.ai/api) | Direct production integrations | Use the TypeSafe Python or JavaScript SDK, or call `POST /v1/systemone` directly when you need full control over retries and transport. |
| [Vercel AI Gateway](https://vercel.com/ai-gateway/models/jev) | AI SDK applications | Jev is available as `typesafe-ai/jev`; provider pricing, limits, and gateway behavior should be checked separately from the direct API. |
| [Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/) | Edge and Workers deployments | The model is listed as `typesafe/jev`; verify platform-specific context, rate, and data-handling terms. |
| [System One adapter for Python](https://github.com/typesafe-ai/system-one-adapter-python) | Local or provider-backed compatibility testing | A drop-in System One-shaped adapter backed by OpenAI, Anthropic, or OpenAI-compatible models; useful for comparison and development, not a substitute for production Jev calibration. |
| [TypeSafe agent skill](https://docs.typesafe.ai/agent-skill) | Claude Code, Codex, and other coding agents | Official instructions make Jev available as a typed decision tool inside an agent workflow. |

## Read first

1. [Introduction](https://docs.typesafe.ai/introduction) — the core mental model.
2. [State](https://docs.typesafe.ai/concepts/state) — how to package messages, records, policies, and application context.
3. [Primitives](https://docs.typesafe.ai/primitives) — when to use `Choice`, `Score`, or `Noul`.
4. [Confidence](https://docs.typesafe.ai/confidence) — how to turn uncertainty into safe routing.
5. [Patterns](https://docs.typesafe.ai/patterns) — fan-out, confidence gates, composite scoring, and intent routing.
6. [API reference](https://docs.typesafe.ai/api) — the request and response contract.

## Quick start

### Python

The official Python SDK reads `TYPESAFE_API_KEY` from the environment and defaults to `jev-latest`.

```bash
python -m pip install typesafe-sdk
export TYPESAFE_API_KEY="your-key"
python examples/python/quickstart.py
```

```python
from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

state = {
    "ticket": "I was charged twice and need the duplicate refunded today.",
    "account_tier": "business",
}

with TypeSafeClient() as client:
    response = client.system_one(
        state=state,
        questions={
            "intent": Choice(
                instructions="What is the customer's main request?",
                criteria={
                    "refund": "The customer wants money returned.",
                    "technical_help": "The customer needs a bug or integration fixed.",
                    "information": "The customer is asking for information only.",
                    "other": "None of the other options clearly fits.",
                },
            ),
            "is_urgent": Noul(
                instructions="Does the ticket explicitly communicate time pressure?",
            ),
            "frustration": Score(
                instructions="How frustrated does the customer appear?",
                criteria=[
                    "Calm and neutral",
                    "Concerned but civil",
                    "Very angry or using strong language",
                ],
            ),
        },
    )

print(response.answers["intent"].choice)
print(response.answers["intent"].probabilities)
print(response.answers["is_urgent"].noul)
print(response.answers["frustration"].score)
```

### JavaScript / TypeScript

```bash
npm install @typesafe-ai/sdk
export TYPESAFE_API_KEY="your-key"
npx tsx examples/typescript/quickstart.ts
```

```ts
import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();
const result = await client.systemOne({
  state: {
    ticket: "I was charged twice and need the duplicate refunded today.",
  },
  questions: {
    intent: choice("What is the customer's main request?", {
      refund: "The customer wants money returned.",
      technical_help: "The customer needs a bug or integration fixed.",
      information: "The customer is asking for information only.",
      other: "None of the other options clearly fits.",
    }),
    isUrgent: noul("Does the ticket explicitly communicate time pressure?"),
    frustration: score("How frustrated does the customer appear?", [
      "Calm and neutral",
      "Concerned but civil",
      "Very angry or using strong language",
    ]),
  },
});

console.log(result.answers.intent.choice);
console.log(result.answers.isUrgent.noul);
console.log(result.answers.frustration.score);
```

See the [official Python SDK](https://github.com/typesafe-ai/typesafe-sdk-python), [official JavaScript SDK](https://github.com/typesafe-ai/typesafe-sdk-js), and [Quick start](https://docs.typesafe.ai/introduction/quickstart) for the supported client options.

## The three primitives

Each question should ask for one focused judgment about the same state. Several questions can be sent in one request and are evaluated independently.

### `Choice`: one known option

Use it for intent, department, document type, tool name, risk category, or any other unordered finite set. Include `other` or `none_of_the_above` when your options may not cover reality.

```python
"department": Choice(
    instructions="Which team should own this ticket?",
    criteria={
        "billing": "Payments, invoices, refunds, or charges.",
        "technical": "Bugs, outages, or integrations.",
        "account": "Access, profile, or account administration.",
        "other": "None of the teams above clearly fits.",
    },
)
```

Returns the selected `choice`, a probability for every option, and `confidence`.

### `Score`: a position on an ordered rubric

Use it for severity, relevance, frustration, quality, suitability, or complexity. Define what each level means. The returned `score` is probability-weighted and may land between levels.

```python
"severity": Score(
    instructions="How severe is the customer-facing impact of this incident?",
    criteria=[
        "Minor inconvenience; workaround available",
        "Material degradation; some users affected",
        "Critical outage; core workflow blocked",
    ],
)
```

Returns `score`, `legend`, `probabilities`, and `confidence`.

### `Noul`: probability that a statement is true

Use it when the probability itself is useful: “Does this request ask for a refund?”, “Does this passage answer the question?”, or “Is this prompt a jailbreak attempt?”

```python
"contains_prompt_injection": Noul(
    instructions="Does the user-provided text attempt to override the application's instructions?",
)
```

Returns `noul` from `0` to `1`. Near `0.5` means the question is uncertain; it is not a medium score.

## Core patterns

| Pattern | Shape | Where it shines |
|---|---|---|
| Atomic questions | One narrow question per judgment | Reliable, inspectable workflow logic |
| Speculative fan-out | Ask every likely-needed question in one call; ignore irrelevant answers in code | Support triage, smart-home commands, agent routing |
| Confidence-gated routing | Treat answer and confidence as separate axes | Automation with human fallback |
| Composite scoring | Normalize several Scores and combine with explicit weights | Candidate, lead, vendor, and risk ranking |
| Intent routing | Choose deterministic code, specialist LLM, or human | Cost and latency control |
| Two-stage dependency | Make a second call only when the first answer changes the next state or options | Hierarchical classification, structure recovery |

The important design rule is: **questions describe judgments; code owns composition, thresholds, and side effects.**

## Use-case map

The following cases are practical starting points, not promises that Jev will be correct for every domain. Each one is a small decision system with a clear output contract.

### Workflow control

#### 1. Support inbox triage

Classify the request, detect urgency and refund intent, score frustration, then route with ordinary code. Ask all dimensions together—even bug severity that matters only for bug reports—using [speculative fan-out](https://docs.typesafe.ai/patterns/fan-out).

```python
if result.answers["intent"].choice == "technical_help":
    if result.answers["severity"].score >= 1.5:
        escalate_to_engineering()
    else:
        add_to_bug_backlog()
elif result.answers["intent"].choice == "refund":
    route_to_billing()
```

Evidence: [TypeSafe’s support fan-out pattern](https://docs.typesafe.ai/patterns/fan-out) and [customer-support use cases](https://docs.typesafe.ai/concepts/use-case-map).

#### 2. Intent and model routing

Put a cheap, fast decision layer in front of deterministic handlers, specialist LLMs, and human agents. Let confidence decide when a category is safe to trust.

Evidence: [Intent routing](https://docs.typesafe.ai/patterns/intent-routing).

#### 3. Confidence-gated actions

Use lower thresholds for reversible read-only actions and higher thresholds for risky operations. For example, show a balance at one threshold, ask for confirmation before a transfer at another, and send ambiguous commands to a human.

Evidence: [Confidence-gated routing](https://docs.typesafe.ai/patterns/confidence-routing).

#### 4. Typed function and tool dispatch

Map a natural-language command to a function name and closed-set arguments. Jev chooses only from the values your function accepts; code still validates authorization, required fields, and side effects before execution.

Evidence: [Function-calling cookbook](https://docs.typesafe.ai/cookbooks/function_calling).

### Retrieval and knowledge

#### 5. RAG passage filtering

Score relevance, answer support, contradiction, and prompt-injection risk for each retrieved passage. Pass only evidence that clears your application’s thresholds to the answering model.

Evidence: [Classifying RAG passages](https://docs.typesafe.ai/cookbooks/classifying_rag_passages).

#### 6. Semantic search and re-ranking

Use BM25 or embeddings to create a shortlist, then score each query–candidate pair with a `Noul` and sort by the returned value. This gives the semantic stage a numeric signal without asking a generative model to invent a scale.

Evidence: [Re-ranking cookbook](https://docs.typesafe.ai/cookbooks/rerank_typesafe) and [line-by-line search](https://docs.typesafe.ai/cookbooks/semantic_find).

Community implementation: [Jev Search](https://github.com/superagents-lab/jev-search) uses the user's request and retrieved titles and snippets as state, asks Jev `Noul` questions about each result's relevance, then uses application code to deduplicate URLs, sort results, and group lower-scoring matches separately. It also uses `Choice` and `Noul` judgments to select query candidates, time ranges, and sources before retrieval through Search1API; the [live demo](https://jev.s1.dev) displays links and snippets with relevance scores, which are model judgments rather than verified accuracy. This is an independent Search1API project, not an official TypeSafe product.

#### 7. Citation and claim verification

Compare a claim, its cited passage, and the source document. Ask whether the passage supports, contradicts, or fails to establish the claim, and route low-confidence results to review.

Evidence: [Double-checking citations](https://docs.typesafe.ai/cookbooks/citation_check).

#### 8. Knowledge-graph entity alignment

For each candidate pair, choose `merge`, `leave_unlinked`, or `curator_review`, or score how likely the records refer to the same entity. Keep the final merge policy deterministic and auditable.

Evidence: [Knowledge-graph entity alignment](https://docs.typesafe.ai/cookbooks/entity_alignment).

### Safety and quality

#### 9. LLM input/output guardrails

Screen prompts, generated replies, and tool calls with hazard `Noul`s and a harm `Score`. Your policy can pass, review, block, or route instead of relying only on a system prompt.

Evidence: [Guardrails for LLMs](https://docs.typesafe.ai/cookbooks/llm_guardrails).

#### 10. Semantic code and writing linting

Turn team conventions into narrow yes/no checks and run them in CI. Use the result to annotate a pull request or request review; do not silently rewrite code or policy text.

Evidence: [Semantic code linting in the TypeSafe use-case map](https://docs.typesafe.ai/concepts/use-case-map).

#### 11. Policy, compliance, and document verification

Check contracts, filings, marketing claims, or support replies against explicit requirements. Return structured findings and escalate high-impact or ambiguous cases to a named reviewer.

Evidence: [Legal and compliance use cases](https://docs.typesafe.ai/concepts/use-case-map).

#### 12. Self-consistency and uncertain labels

Add an explicit uncertain option to a moderation or classification space, or compare repeated decisions on high-risk inputs. Use disagreement as a review signal, not as a reason to blindly majority-vote.

Evidence: [TypeSafe’s self-consistency cookbooks](https://docs.typesafe.ai/llms.txt).

### Data and operations

#### 13. Structured extraction with validation

Recover known fields from messy text by first finding candidate spans with deterministic code, then using Jev to choose the requested span or label. Normalize dates, amounts, and identifiers in code and validate them before storage.

Evidence: [Pre-parsed value extraction](https://docs.typesafe.ai/cookbooks/pre_parsed_value_extraction_cookbook) and [date extraction](https://docs.typesafe.ai/cookbooks/date_extraction_cookbook).

#### 14. Composite candidate, lead, or vendor scoring

Score independent dimensions—such as role evidence, technical depth, and communication—then combine normalized values with weights you own. The same design works for lead fit, vendor risk, ad suitability, and claim complexity.

Evidence: [Composite scoring](https://docs.typesafe.ai/patterns/composite-scoring).

#### 15. Feature extraction for classical ML

Convert language into probabilistic features such as purchase intent, churn signals, competitive pressure, or complaint severity, then feed them into a supervised model alongside structured features.

Evidence: [Feature extraction use cases](https://docs.typesafe.ai/concepts/use-case-map).

#### 16. High-cardinality and hierarchical classification

For large taxonomies, use staged choices or a probability-aware beam. Let the first decision choose a branch and ask a second question only when the next option set depends on that branch.

Evidence: [Hierarchical classification](https://docs.typesafe.ai/cookbooks/hierarchical_classification).

### Real-time and agentic systems

#### 17. Smart-home and UI command control

Fan out across command category, domain, device type, and action in one request. Use deterministic code for permissions and execution, and hand general conversation to a generative model when the request is outside the closed command space.

Evidence: [Smart-home demo](https://docs.typesafe.ai/demos/smart-home).

#### 18. Agent harness routing and skill suggestion

Use Jev to decide whether a turn needs a skill, tool, retrieval step, or expensive reasoning model. Keep tool descriptions, authorization, and stop conditions outside the model’s answer space.

Evidence: [Agent skill](https://docs.typesafe.ai/agent-skill) and [skill-suggestion cookbook](https://docs.typesafe.ai/cookbooks/skill_suggestion).

Community implementation: [Augustus](https://github.com/24601/Augustus) ships the independent augustus and augustus-train agent skills for application-specific decision models: primitive, base-model and method selection, data assembly, fitting, export/reload, bounded improvement and independent evaluation. TypeSafe Jev is the default hosted exemplar; exact constraints, authorization, and effects remain in code or explicit human policy. These skills and offline evaluators are not an official TypeSafe product, a bundled live Jev client, or a general Jev reproduction, and do not guarantee production benefit.

### Recent workflow evaluations and cookbook patterns

The following additions come from TypeSafe’s current workflow evaluations and cookbooks. They are useful reference architectures, not guarantees that a model decision is correct. Keep arithmetic, authorization, thresholds, and side effects in code.

#### 19. Security incident response

Join an alert with asset context, open tickets, registered devices, maintenance windows, and standing authorizations. Ask whether the activity is unauthorized, whether an existing record explains it, and how strong the evidence is; then let a deterministic playbook choose close, queue, notify, or containment. Only ask deeper questions about credentials, sessions, processes, and spread after the first branch requires them.

Source: [Security Incidents workflow](https://evals.typesafe.ai/security_incidents).

#### 20. Agent-trace observability

Review a completed agent run—including instructions, conversation, tool calls, final response, and feedback—for permission breaches, task completion, satisfaction, expectation gaps, and silent failures. Route the trace to auto-close, human review, bug filing, or on-call escalation.

Source: [Agent Trace Observability workflow](https://evals.typesafe.ai/agent_trace_observability).

#### 21. Invoice matching and payment controls

Evaluate an invoice against its purchase order, contract, vendor record, prior invoices, correspondence, delivery evidence, and approvals. Use Jev for semantic checks such as duplicate/fraud/wrong-vendor signals and use code for totals, dates, account numbers, and payment execution. Emit actions such as pay, schedule, hold, dispute lines, request correction, or route for approval.

Source: [Invoice Processing workflow](https://evals.typesafe.ai/invoice_processing).

#### 22. Multi-action customer service

Treat a support turn as a set of possible actions rather than a single intent label: say something, refund, freeze a card, set an intent, hand off, flag for review, or close. Fan out over intent, frustration, urgency, consent, fraud, legal risk, and requests for a person; then verify the assistant’s previous claims against account records before allowing a consequential action.

Source: [Customer Service workflow](https://evals.typesafe.ai/customer_service).

#### 23. Expense-claim approval

Check receipt readability, classify the expense, compare meal claims with a policy threshold, and route only the exceptions for approval. Sums and other deterministic calculations belong in code; Jev supplies the semantic readings that select the next rule.

Source: [Expense Claims example in the workflow evals](https://evals.typesafe.ai/).

#### 24. Confidence-aware insurance claims triage

Run a claims rubric as independent `Noul`s for coverage, exclusions, documentation, fraud indicators, review requirements, and related conditions. Preserve each probability and map a middle band to `uncertain`/human review rather than forcing pay or deny.

Source: [Self-consistency for Nouls](https://docs.typesafe.ai/cookbooks/consistency_noul_cookbook) and [insurance claims on the use-case map](https://docs.typesafe.ai/concepts/use-case-map).

#### 25. Abstaining content moderation

Use `Choice` questions for labels such as threat, spam, and general content, with an explicit uncertain outcome or confidence gate. This lets a moderation system measure label stability and send borderline posts to review instead of turning close probabilities into automatic removals.

Source: [Self-consistency for Choices](https://docs.typesafe.ai/cookbooks/consistency_choice_cookbook) and [moderation and trust & safety](https://docs.typesafe.ai/concepts/use-case-map).

#### 26. Batched regulatory and policy review

Ask many independent questions about one long document in one request—for example, whether a policy contains particular obligations, exceptions, or prohibited claims—then use code to assemble the briefing. This is a map-reduce-shaped workflow for document corpora: retrieve or split in code, evaluate in batches, aggregate deterministically.

Source: [Parallel questions](https://docs.typesafe.ai/cookbooks/parallel_questions).

#### 27. Structure recovery from messy text

Recover headings, lists, code blocks, callouts, and paragraph boundaries from plain text that lost its formatting. Use one pass to reconnect hard-wrapped lines and a second typed classification pass for blocks; keep the final Markdown renderer deterministic.

Source: [Structure recovery](https://docs.typesafe.ai/cookbooks/autoformat.md).

#### 28. Verified structured-data extraction cascades

Have a small generative model extract candidate fields, use Jev `Noul`s to check whether each value is missing, unrelated, or unsupported by the source, and escalate only failed fields to a larger reasoning model. This is useful for invoices, claims, applications, and forms where extraction quality matters more than free-form prose.

Source: [SDE cascade](https://docs.typesafe.ai/cookbooks/sde_cascade).

#### 29. Autoresearch for semantic ML features

Let a research loop propose Jev questions, turn free text into numeric `Score`/`Noul` features, train a downstream supervised model, inspect held-out errors, and propose the next questions. The feature table, validation split, and final model stay under ordinary ML tooling.

Source: [Autoresearch feature discovery](https://docs.typesafe.ai/cookbooks/autoresearch_feature_discovery).

#### 30. Confidence-aware hierarchical classification

Classify a document into a fine-grained taxonomy, then use the returned confidence to decide whether to report the narrow label, roll up to a parent category, or ask for review. This avoids a second model call when the taxonomy already provides a safe fallback.

Source: [Classification using confidence](https://docs.typesafe.ai/cookbooks/classification_using_confidence).

#### 31. Real-time game-state and high-cardinality control

When a program can describe the current state and legal actions, Jev can make a fast decision inside the loop: choose a move from a generated action set, or choose the next link from a large frontier such as a Wikiracing page. Keep collision checks, legal-action generation, game rules, deadlines, and fallback actions in code.

Source: [TypeSafe’s launch examples for real-time applications, Doom, and Wikiracing](https://typesafe.ai/blog/introducing-system-one-models-and-jev).

### Additional industry use cases from the current TypeSafe map

These are additional domains explicitly listed in the official use-case map. Each is a good candidate for a small state object, atomic questions, and a code-owned review branch.

| Domain | Example Jev workflow | Source |
|---|---|---|
| Scientific discovery | Screen papers, label themes in qualitative research, check manuscript citations, and link entities to evidence. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Recruiting | Evaluate job-related evidence, match candidates to roles, route applications, and escalate uncertain cases. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Lead generation | Score ICP fit, buyer relevance, pain points, and purchase intent before routing leads. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Insurance claims | Classify first-notice-of-loss records, detect missing information and fraud indicators, and prioritize adjuster review. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Financial crime | Evaluate transaction narratives, KYC material, and alert histories; match entities and prioritize investigator queues. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Legal and compliance | Find missing clauses, prohibited claims, and policy violations in contracts, filings, and marketing material. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| E-commerce marketplaces | Normalize listings, extract product attributes, detect counterfeit or prohibited-listing signals, and route exceptions. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Moderation and trust & safety | Apply organization-specific criteria to toxicity, harassment, spam, fraud, unsafe advice, and personal-data exposure. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Advertising | Check brand safety, audience suitability, regulatory claims, creative quality, and ad-to-landing-page alignment. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Gaming | Moderate chat, score engagement or frustration, detect abuse and churn signals, and route player support. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Risk assessment | Turn incident reports, claims, transaction descriptions, and vendor assessments into probabilistic risk features. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Demand forecasting | Extract purchase intent, urgency, product interest, supply concerns, and competitive pressure for a time-series model. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |
| Knowledge graphs | Classify entity types and relationships, detect contradictions, and support probabilistic traversal. | [Example use-case map](https://docs.typesafe.ai/concepts/use-case-map) |

### Recent independent implementations

These are community projects, not TypeSafe endorsements. They show how the same decision-layer interface is being used outside the official examples; treat demos, dry runs, and financial or home-automation integrations as experiments that require your own safety controls.

| Implementation | Use case | Evidence |
|---|---|---|
| [jev-lint](https://github.com/ckorhonen/jev-lint) | Edit-time checks for team conventions that need judgment: Jev answers per-rule Noul questions, while local gates and thresholds feed violations back to Claude Code and Codex before code review; configurable packs and repo rules define the checks. | [API client](https://github.com/ckorhonen/jev-lint/blob/main/src/jev.ts), [rule policy](https://github.com/ckorhonen/jev-lint/blob/main/src/lint.ts), and [evaluation notebook source](https://github.com/ckorhonen/jev-lint/tree/main/report) |
| [JEV Book Tags](https://github.com/iamjonatha/jev-book-tags) | calibre book tagging: metadata and optional EPUB excerpts become state for `Noul` questions about genres and subjects, while plugin code owns per-tag probability thresholds, review decisions, and preserving existing tags. | [API call](https://github.com/iamjonatha/jev-book-tags/blob/v1.1.1/plugin/client.py#L78), [policy](https://github.com/iamjonatha/jev-book-tags/blob/v1.1.1/plugin/core.py#L157), [setup and demo](https://github.com/iamjonatha/jev-book-tags#readme) |
| [Jev Deep Research](https://github.com/sunyasheng/JevDeepResearch) | Experimental evidence retrieval: Jev `Choice` locates source lines and `Noul` checks evidence presence in document regions concurrently, while Pi-Serini code validates responses, selects original passages, and enforces a source budget for a GPT research agent. | [Jev API call](https://github.com/sunyasheng/JevDeepResearch/blob/72965685fa924c240bf8dd1bc27efa7336e744a2/integrations/pi-serini/src/extensions/jev_find_batch_v4.ts#L34-L57), [typed questions](https://github.com/sunyasheng/JevDeepResearch/blob/72965685fa924c240bf8dd1bc27efa7336e744a2/integrations/pi-serini/src/extensions/jev_find_v1.ts#L56-L68), and [reproduction guide](https://github.com/sunyasheng/JevDeepResearch/blob/72965685fa924c240bf8dd1bc27efa7336e744a2/integrations/pi-serini/README.md) |
| [JevLoop](https://github.com/parkavenue9639/jevloop) | Experimental Python agent loop: Jev evaluates bounded workspace state with batched `Choice` action/target questions and `Noul`/`Score` signals, while application code owns confidence-based LLM arbitration, execution budgets, and Docker tool dispatch. | [Decision compiler and API call](https://github.com/parkavenue9639/jevloop/blob/c5557d08b866eae5890ef9d475242e3bbd83e90f/backend/jevloop/model.py) and [scoped paired case study](https://github.com/parkavenue9639/jevloop/blob/c5557d08b866eae5890ef9d475242e3bbd83e90f/docs/fastapi-case-study.md#english) |
| [DroidJev](https://github.com/mkruglikov/droidjev) | A fast, screenshot-free Android emulator clicker | [TypeSafe integration](https://github.com/mkruglikov/droidjev/blob/master/src/typesafe.js) |
| [Jev plays Snake](https://github.com/sorrycc/typesafe-snake) | Real-time game control: code generates legal moves and exact state facts, while Jev chooses one move per tick. | Repository |
| [Home Assistant Jev](https://github.com/AboveColin/HA-Jev) | Expose `Noul`, `Choice`, and `Score` answers as automation entities and actions for household workflows. | Repository |
| [GeekLink Jev Subtitle Translator](https://github.com/GeekLinkDev/jev-subtitle-translator) | Subtitle translation quality control: sends source–translation pairs as state and asks one `Noul` question per subtitle cue, while application code flags suspicious lines for human review without rewriting them. | [Jev request](https://github.com/GeekLinkDev/jev-subtitle-translator/blob/main/src/jev_subtitle_translator/openrouter.py) and [review policy](https://github.com/GeekLinkDev/jev-subtitle-translator/blob/main/src/jev_subtitle_translator/qc.py) |
| [Jev MCP server](https://github.com/jkudish/jev-mcp) | Give coding agents typed claim verification, content screening, and semantic ranking tools. | Repository |
| [Jev logs](https://github.com/reachjalil/jevlogs) | Annotate OpenTelemetry/log records with Jev decisions and optionally skip expensive analysis for low-value traces. | Repository |
| [Jev trader](https://github.com/jarrodwatts/jev-trader) | Experimental sub-second market-side decision loop; the project documents a default dry-run and a separate live-trading path. | Repository |
| [Learn Jev end to end](https://github.com/harshithsunku/learn-jev-end-to-end) | Hands-on course of 12 Python notebooks: an agent loop asks Jev a `Choice` (allow / ask / block) plus `Noul` irreversibility and exfiltration checks before each tool call and sends `ask` to a human, alongside `Choice` model routing, per-passage `Noul` relevance and citation checks, and `Score` log severity; code owns thresholds and hard rules, tools are read-only or dry-run, and an `adapter` fallback is labeled. | Repository, executed notebooks with labeled-fixture checks |
| [Edward](https://github.com/VeridicalTech/Edward) | External control plane for coding agents: one batched Jev call judges the cross-turn trajectory (continue / pause / escalate, confidence-gated), while deterministic code owns dangerous-command blocking, budget caps, intervention execution, and an Ed25519-signed receipt chain. | [Jev backend](https://github.com/VeridicalTech/Edward/blob/main/edward/backends.py) and [measurement series](https://github.com/VeridicalTech/Edward/blob/main/BENCHMARK.md) |
| [jev-align (Sutro)](https://github.com/sutro-sh/jev-align) | Active-learning CLI that evaluates tabular rows with Jev `Choice`, `Score`, or `Noul` questions, sends uncertain and audit samples to a human, and uses GEPA to propose revised definitions while the user retains every label and acceptance decision. | [Jev adapter](https://github.com/sutro-sh/jev-align/blob/main/src/jev_align/jev.py) and [learning loop](https://github.com/sutro-sh/jev-align/blob/main/src/jev_align/session.py) |
| [JevRouter](https://github.com/BillionsBobby/JevRouter) | Model, tool, and subagent routing: Jev answers one typed `Choice` over a candidate capability set while router code owns availability, permissions, risk, confirmation, and fallback policy. | [Router](https://github.com/BillionsBobby/JevRouter/blob/main/src/router.ts) and [provider](https://github.com/BillionsBobby/JevRouter/blob/main/src/provider.ts) |
| [jev-social](https://github.com/socai-io/jev-social) | Social research routing: Jev `Choice` selects the platform and bounded socai operation from observed state, while code rejects malformed or low-confidence decisions before the local CLI performs read-only browser work. | [Classifier](https://github.com/socai-io/jev-social/blob/main/src/classifier.js) and [action loop](https://github.com/socai-io/jev-social/blob/main/src/actions.js) |
| [QuantDinger](https://github.com/OpenByteInc/QuantDinger) | Opt-in live pre-trade gate that sends structured strategy, market, position, exposure, and budget state to Jev `Choice` questions; application code validates probabilities and confidence, blocks rejected entries, bypasses exits and protective orders, and falls back to a configured LLM or a fail-open audited path when Jev is unavailable. | [Implementation](https://github.com/OpenByteInc/QuantDinger/blob/main/backend_api_python/app/services/ai_decision_filter.py) |
| [jev-curate](https://github.com/AkashPriyadarshii/jev-curate) | High-throughput synthetic dataset sifter in Rust: evaluates JSONL and Parquet rows via Jev Noul checks and streams clean/rejected rows to disk. | Repository |
| [dsh-jev-interceptor](https://github.com/AskTheWay/dsh-jev-interceptor) | Agent safety plugin for DeepSeek Harness: a `Choice` risk class plus `Noul` irreversibility and injection checks gate each non-read-only tool call (deny / ask / delegate), `Noul` scope and reversibility questions auto-approve clearly-granted calls behind argument-evidence gating, and per-message `Score` ranking replaces oldest-first session-reference retention; every failure mode falls back to stock harness behavior, with a shadow mode and 64 offline tests. | [Jev request client](https://github.com/AskTheWay/dsh-jev-interceptor/blob/main/src/jev.ts) and [retention scoring](https://github.com/AskTheWay/dsh-jev-interceptor/blob/main/src/session-reference.ts) |
| [is-malicious](https://github.com/luantak/is-malicious) | Scans source, configuration, build, and CI files with Jev `Noul`, `Score`, and `Choice` questions; code-owned thresholds trigger a second pass and determine report severity. | Repository |
| [TypeSafe AI Swift SDK](https://github.com/alterhq/typesafe-sdk-swift) | Swift 6 client for Jev `Choice`, `Score`, and `Noul` questions with strict concurrency, application-owned authentication and retry policy, and network-free tests. | Repository |
| [jev-seo](https://github.com/AkashPriyadarshii/jev-seo) | Zero-cost agent-first SEO and GEO search radar CLI and MCP server. | Repository |
| [jev-superpowers](https://github.com/AkashPriyadarshii/jev-superpowers) | Agentic software-development framework upgraded with TypeSafe Jev typed decisions. | Repository |
| [jev-scout](https://github.com/AkashPriyadarshii/jev-scout) | Open-source repository and crate scout powered by Jev scoring, with Rust, CLI, and MCP surfaces. | Repository |
| [jev-git](https://github.com/AkashPriyadarshii/jev-git) | Rust pre-commit and pre-push gate that screens staged diffs for secrets and destructive commands using Jev Noul checks. | Repository |
| [jevcal](https://github.com/abhixhek/jevcal) | Fits per-question confidence thresholds on labelled data, verifies them on a held-out split, and writes a calibration lock file. | Repository |
| [Janus](https://github.com/FirasSX914/Janus) | Measures calibration and confidence-based routing, with raw JSONL and figures committed for inspection. | Repository |
| [jevql](https://github.com/kylemclaren/jevql) | Adds Jev `Noul`, `Choice`, and `Score` filters, probability sorts, and choice groups to semantic SQL over Postgres. | Repository |
| [duckdb-jev](https://github.com/prasanthj/duckdb-jev) | Native DuckDB extension that turns text, JSON, `STRUCT`, `LIST`, and `ARRAY` rows into batched Jev `Noul`, `Choice`, `Score`, or multi-question judgments with confidence, while SQL code owns thresholds and side effects. | [Native implementation](https://github.com/prasanthj/duckdb-jev/blob/main/src/jev_extension.cpp), [tests and compatibility matrix](https://github.com/prasanthj/duckdb-jev#build-and-test) |
| [jev-pref](https://github.com/doeixd/jev-pref) | Semantic code review: project preferences from AGENTS.md are encoded as rules in `jev-pref.json` and checked with Jev against diff hunks, staged files, or PRs; findings are fed back to the coding agent (`npx jev-pref setup`, MIT). | Repository |
| [wakegate](https://github.com/shitianfang/wakegate) | Experimental wake gate for long-running agents: before a sleeping agent's LLM is resumed on a timer or incoming event, Jev answers one `Choice` (`wake` / `not_yet` / `unrelated`) against the agent's own sleep note; code skips the wakeup only when `wake` is below 0.2 and always wakes on user messages, bare timers, a skip limit, errors, and timeouts. | Repository |
| [Supercov](https://github.com/supercorp-ai/supercov) | Code quality and coverage for coding agents. | Repository |
| [jevkit](https://github.com/ariel-frischer/jevkit) | Typed-decisions CLI: Rust command-line client that accepts `Choice`/`Score`/`Noul` question sets in terse YAML or JSON, validates them offline with 13 lint rules before any call, expands them to the canonical wire payload, and prints parsed answers as JSON; thresholds and exit codes stay in the caller's shell script. | Repository |
| [jev-skip](https://github.com/valentynkit/jev-skip) | Browser extension that reads the YouTube caption track and paints a per-segment sponsor probability on the seek bar before the intro ends, with no crowd database. | Repository; reports catching 77% of SponsorBlock's sponsor seconds across 23 videos at $0.0008 a video. |
| [jev-plays-pokemon-red](https://github.com/valentynkit/jev-plays-pokemon-red) | Real-time game control on PyBoy: deterministic code owns the route and arithmetic while Jev picks only at branches, and each battle turn's faint prediction is scored by Brier against RAM state. | Repository |
| [Jev Trade](https://github.com/aowang-ai/jev-trade) | Each Hyperliquid tick is evaluated as book, tape, and position state; Jev answers `Choice` questions for long/short, open/close/hold, and leverage; application code owns quoting and whether an order is sent. Documents a dry-run path and a separate live-trading path. | Repository |
| [jev-use](https://github.com/shitianfang/jev-use) | Claude Code / Codex / pi plugin that hands steps needing no text output to Jev: MCP tools batch typed `Noul`/`Choice`/`Score` questions about agent state, and a typed escalation contract returns generation-shaped or low-confidence steps to the LLM. | Repository |
| [Jev Web Analyzer](https://github.com/replynodes/jev-web-analyzer) | Public SaaS landing-page evaluation: clean Markdown is the state and ten bounded `Choice` questions ask what a first-time visitor is likely to understand; URL validation, SSRF protection, bounds, caching, sanitization, and presentation remain in application code. | [Integration](https://github.com/replynodes/jev-web-analyzer/blob/main/app/api/analyze/route.ts), [questions](https://github.com/replynodes/jev-web-analyzer/blob/main/lib/founder-questions.ts) |
| [Jev Reranker (Rust CLI)](https://github.com/shinpr/jev-reranker) | Retrieval post-processing CLI that asks Jev separate `Noul` questions for ranking, evidence filtering, and extractive compression, with Rust applying the resulting order and thresholds. | [Jev questions](https://github.com/shinpr/jev-reranker/blob/149ed84e4d3cce66bb3cc997a105d6a252983834/src/http.rs#L224-L240), [selection logic](https://github.com/shinpr/jev-reranker/blob/149ed84e4d3cce66bb3cc997a105d6a252983834/src/ranking.rs#L30-L101), and [evaluation write-up](https://www.norsica.jp/blog/what-retrieval-still-hasnt-decided) |
| [Jev RAG](https://github.com/aifabrice/jev-rag) | Local knowledge retrieval and evaluation: SQLite BM25 or agent-planned lexical search supplies candidate passages; Jev `Noul` questions score relevance and answer support while Python owns batching, thresholds, ordering, caching, and the final answer boundary. | [Reranking questions and ordering](https://github.com/aifabrice/jev-rag/blob/78463598454534b039a62f5ef568dbaeb14885bd/local_kb.py#L1692-L1773), [data boundaries](https://github.com/aifabrice/jev-rag/blob/78463598454534b039a62f5ef568dbaeb14885bd/docs/ARCHITECTURE.md#data-boundaries), and [reproducible NFCorpus evaluation](https://github.com/aifabrice/jev-rag/blob/78463598454534b039a62f5ef568dbaeb14885bd/benchmarks/NFCORPUS_RESULTS.md) |
| [nlgrep](https://github.com/YehuiTang0316/jev-nlgrep) | File search: evaluates code, docs, logs, and text with Jev `Noul` questions against natural-language conditions, while TypeScript applies probability thresholds and returns ranked files with source lines. | [Jev adapter](https://github.com/YehuiTang0316/jev-nlgrep/blob/ceec0d92be8577abd36729d1d4ddae36710e23b4/src/jev.ts) and [search policy](https://github.com/YehuiTang0316/jev-nlgrep/blob/ceec0d92be8577abd36729d1d4ddae36710e23b4/src/search.ts) |
| [JevPDF](https://github.com/kylemclaren/jevpdf) | PDF search: pdf.js extracts each page's lines in the browser, and each line gets one Jev `Noul` (does this line answer the query?) in batches of up to 16 that share the query and page text as state; code highlights lines at or above 0.55, ranks them by probability, and runs exact-text matching locally. Jev receives text only, never PDF bytes. | [Jev requests](https://github.com/kylemclaren/jevpdf/blob/main/src/lib/jev.ts) and [question and thresholds](https://github.com/kylemclaren/jevpdf/blob/main/src/lib/jev-config.ts) |
| [slop-grader](https://github.com/lukstei/slop-grader) | Text and documentation quality: CLI tool that checks markdown files against custom rulesets using typed Jev scores and line-level flags, then guides an AI agent to auto-fix violations. | Repository |
| [Soupbase](https://github.com/spoonnotfound/soupbase) | Lateral-thinking puzzle adjudication: Jev `Choice` questions classify player questions and check proposed solutions against required facts, while application code validates results and enforces confidence thresholds before marking a puzzle solved. | [Jev integration](https://github.com/spoonnotfound/soupbase/blob/4e071a5a500f7db2a8ec4f5a3f99aa02a4c784aa/src/server/model.ts) and [solution gate](https://github.com/spoonnotfound/soupbase/blob/4e071a5a500f7db2a8ec4f5a3f99aa02a4c784aa/src/server/guess.ts) |
| [Jev Auto Router](https://github.com/miniLV/Jev-Auto-Router) | Experimental Codex CLI routing: Jev `Choice` selects a host-available model/reasoning pair per call from compact task state; a local Responses proxy preserves the session, while fallback and independent verification remain application-owned. | [Jev adapter](https://github.com/miniLV/Jev-Auto-Router/blob/master/src/jev-adapter.ts), [verification](https://github.com/miniLV/Jev-Auto-Router/blob/master/src/verification.ts), and [prototype status](https://github.com/miniLV/Jev-Auto-Router/blob/master/README.en.md) |
| [Oko](https://github.com/bartlomein/oko) | Code search for coding agents: BM25 shortlists chunks, Jev `Noul` scores each against the question, code applies the cutoff and serves excerpts over MCP; measured on Agent Retrieval Bench and SWE-Explore with raw results published. | [Benchmarks](https://github.com/bartlomein/oko/blob/main/docs/benchmark-results.md) |
| [discern](https://github.com/doeixd/discern) | Framework decision layer | Effect library where `Choice`, `Noul`, and `Score` answers become typed control flow: caller-supplied thresholds decide the branch, answers below them take an explicit `Uncertain` case rather than the top label, procedure routing skips the model call when deterministic predicates leave one candidate, and recording, replay, caching, and per-run call budgets are `DecisionModel` middleware. | [Patterns and thresholds](https://github.com/doeixd/discern/blob/main/src/index.ts), [middleware](https://github.com/doeixd/discern/blob/main/src/model.ts), and [Jev provider wiring](https://github.com/doeixd/discern/blob/main/examples/headline.ts#L82-L86) |
| [jev-slop-guard](https://github.com/davertor/jev-slop-guard) | Social feed filtering: each X or LinkedIn post is the state and Jev answers one `Choice` question (`slop` / `not_slop`); extension code owns the threshold, the blur-and-stamp side effect, the per-post cache and a three-request concurrency cap, and the user brings a TypeSafe or OpenRouter key. | [Jev question](https://github.com/davertor/jev-slop-guard/blob/1f2ee47f13329dafb05fbecb75f67942de7d8d39/lib/jev.ts) and [threshold policy](https://github.com/davertor/jev-slop-guard/blob/1f2ee47f13329dafb05fbecb75f67942de7d8d39/lib/verdict.ts) |
| [Slop Filter for LinkedIn](https://github.com/Arpit-Khandelwal/jev-linkedin-slop-filter) | Feed annotation: each LinkedIn post is state for two `Noul` questions (engagement bait, corporate marketing) and one `Choice` category; extension code owns the thresholds, the local keyword pre-filter that avoids most calls, per-post caching, and whether a stamp is drawn. Posts are annotated, never hidden, and any error leaves the post untouched. | [Questions and thresholds](https://github.com/Arpit-Khandelwal/jev-linkedin-slop-filter/blob/main/server/jev.js) and [14-post labelled set](https://github.com/Arpit-Khandelwal/jev-linkedin-slop-filter/blob/main/test/samples.json) |
| [Search with Jev and Milvus](https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev) | Nine runnable notebooks use Gemini embeddings and Milvus retrieval, then Jev Noul or Choice for reranking, context filtering, search stopping, routing, cache validation, curation, guardrails, and evaluation; Python owns sorting, thresholds, and control flow. | [Reranking notebook](https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb); synthetic examples with recorded outputs, not a quality benchmark |
| [Switchboard](https://github.com/ruban-24/switchboard) | Coding-agent routing: Jev `Choice` questions assess a new Claude Code or Codex conversation's capability tier and model-specific reasoning demand; local confidence policy selects and pins the model and effort through follow-ups, tool calls, and resume to avoid unnecessary prompt-cache disruption. | [Jev questions](https://github.com/ruban-24/switchboard/blob/main/src/jev-questions.ts), [routing policy](https://github.com/ruban-24/switchboard/blob/main/src/core/policy.ts), and [session routing](https://github.com/ruban-24/switchboard/blob/main/src/core/session.ts) |
| [Jev Chess](https://jevchess.com) | Real-time game control: code generates every legal move and exact state facts, while Jev picks from them as the options of one Choice question - illegal moves are impossible by construction; a live panel scores every move by claimed confidence against a one-ply material check. | [Repository](https://github.com/sliday/jev-chess) |
| [Jev Chess](https://jevchess.com) | Real-time game control: code generates every legal move and exact state facts, while Jev picks from them as the options of one Choice question - illegal moves are impossible by construction; a live panel scores every move by claimed confidence against a one-ply material check. | [Repository](https://github.com/sliday/jev-chess-algo) |
| [r2r-jev](https://github.com/Thneoly/r2r-jev) | Agent governance: two Jev `Noul` checks per tool call (beyond scope, destructive) become Evidence that can degrade persistent Trust / Delegation / Authorization relations until a human override repairs them, so later calls inherit the history; ships deterministic provenance ids and a stateless-vs-stateful comparison with a scenario adversarial to persistence. | [Jev adapter](https://github.com/Thneoly/r2r-jev/blob/ce080c72d0f9d7a3fb348573d5991782f6cb6b3d/src/jev.rs), [governance kernel](https://github.com/Thneoly/r2r-jev/blob/ce080c72d0f9d7a3fb348573d5991782f6cb6b3d/src/r2r.rs), and [experiment](https://github.com/Thneoly/r2r-jev/blob/ce080c72d0f9d7a3fb348573d5991782f6cb6b3d/experiments/stateless-vs-stateful/README.md) |
| [PlotVeil](https://github.com/Dearest/plotveil) | YouTube spoiler protection: each comment is covered on arrival while one `Noul` question, batched 20 per request, asks whether it reveals a concrete plot event of the video being watched or of another title the user protects; the extension owns the 0.85 / 0.7 / 0.5 threshold, and a failed or quota-rejected check leaves the comment covered rather than revealed. | [Typed question](https://github.com/Dearest/plotveil/blob/main/src/rules/spoiler.ts), [Jev call](https://github.com/Dearest/plotveil/blob/main/proxy/src/index.ts), [threshold gate](https://github.com/Dearest/plotveil/blob/main/src/runner.ts), and a [10-sample regression set](https://github.com/Dearest/plotveil/blob/main/docs/qa/jev-v2-evaluation.json) that is not a production accuracy measurement |
| [PlotVeil](https://github.com/Dearest/plotveil) | YouTube spoiler protection: each comment is covered on arrival while one `Noul` question, batched 20 per request, asks whether it reveals a concrete plot event of the video being watched or of another title the user protects; the extension owns the 0.85 / 0.7 / 0.5 threshold, and a failed or quota-rejected check leaves the comment covered rather than revealed. | [Typed question](https://github.com/Dearest/plotveil/blob/main/src/rules/spoiler.ts), [Jev call](https://github.com/Dearest/plotveil/blob/main/proxy/src/index.ts), [threshold gate](https://github.com/Dearest/plotveil/blob/main/src/runner.ts), a [10-sample regression set](https://github.com/Dearest/plotveil/blob/main/docs/qa/jev-v2-evaluation.json) that is not a production accuracy measurement, and install instructions at [plotveil.app](https://plotveil.app/install) |
| [profanity-checker](https://github.com/4rays/profanity-checker) | Trust & safety: Cloudflare Workers service that sends text or usernames to Jev `Noul` (literal profanity plus a disguised-handle `Noul` for usernames, in one parallel inference call); the threshold, `max()` policy, JSON response, and OpenAPI schema are owned by the Worker, and other Workers can call it via service bindings. | [Endpoint source](https://github.com/4rays/profanity-checker/blob/main/src/endpoints/profanityCheck.ts) |
| [jfind](https://github.com/religa/jfind) | Semantic file search: a `find(1)`-style CLI whose `--like TEXT` predicate asks one Jev `Noul` per filesystem entry (path, name, type, size, mtime, optional 8 KiB head); Python owns the walk, `-name`/`-type`/`.gitignore` filters, the probability threshold, and `grep`-style exit codes, and `--dry-run` estimates cost without any API call. | [Jev questions](https://github.com/religa/jfind/blob/v0.1.0/src/jfind/matcher.py) and [threshold and exit codes](https://github.com/religa/jfind/blob/v0.1.0/src/jfind/cli.py) |
| [jgrep](https://github.com/kyu1204/jgrep) | Semantic grep: state is 16 code chunks (or diff hunks / CSV rows) per request, one `Noul` per chunk asks whether it matches the user's English description; code applies the threshold, caches by (model, question, chunk) and prints grep-style `file:line` hits with exit codes for CI lint rules. | [src/jgrep.ts](https://github.com/kyu1204/jgrep/blob/main/src/jgrep.ts) · [src/rows.ts](https://github.com/kyu1204/jgrep/blob/main/src/rows.ts) |
| [jevsearch](https://github.com/kylemclaren/jevsearch) | Site search (shadcn/ui registry block): a local keyword pass shortlists up to 20 pages, then one Jev request asks a `Noul` per page (would the visitor be glad to land here?), a `Choice` for the single best answer, and a `Noul` for whether any page answers at all; code blends relevance with best-answer share, drops hits under a threshold, and keeps keyword order if TypeSafe is slow or down. | [Jev request](https://github.com/kylemclaren/jevsearch/blob/main/src/lib/jev-search-server.ts) and [benchmark](https://github.com/kylemclaren/jevsearch/blob/main/bench/results.json) (author-reported: Hit@1 83% vs 41% for the keyword pass alone, 41 labelled queries over the TypeSafe docs) |
| [jevr](https://github.com/romeromarcelo/jev-retrieval) | Semantic code and document search: state is one candidate file's 100/20-line windows (≤24 windows and ≤24 KB per request), one `Noul` per window plus a file-level `Noul` asks whether the file belongs to the subsystem behind the query (a separate coverage phrasing for prose), and one listwise `Choice` per lane reranks the kept files; Rust code owns BM25 + git-grep recall, the per-lane probability thresholds, score fusion, a sha256-keyed response cache, and grep-style `path:line` output with exit codes. | [Typed questions](https://github.com/romeromarcelo/jev-retrieval/blob/main/src/jev/questions.rs), [verification](https://github.com/romeromarcelo/jev-retrieval/blob/main/src/verify.rs), [rerank](https://github.com/romeromarcelo/jev-retrieval/blob/main/src/rerank.rs), and [API client](https://github.com/romeromarcelo/jev-retrieval/blob/main/src/jev/client.rs) |
| [Magic Jev Ball](https://magic-jev.mikecann.app) | Magic 8 Ball demo: the state is the user's question and Jev answers one `Choice` over the 20 classic 8 Ball answers, instructed to take a side unless the question is nonsense; a Convex action calls Jev through the Convex AI Gateway, and code shows the highest-probability option rather than Jev's reported choice, since rounded probabilities occasionally disagree with it. | [Jev call](https://github.com/mikecann/magic-jev-ball/blob/main/convex/jev.ts) and [frontend](https://github.com/mikecann/magic-jev-ball/blob/main/src/main.ts) |
| [Cribrix](https://github.com/david96182/cribrix) | RAG answer gating: one `Choice` routes each query to search or chitchat, each retrieved chunk is state for a relevance `Score` plus two `Noul` questions (states the answer, prompt injection), and every claim in the generated draft becomes one `Noul` in a single request against the kept evidence; application code owns the confidence, relevance, evidence, and injection thresholds, refuses without calling the LLM when no chunk survives, rejects claims with numbers absent from the sources, and withholds unsupported drafts. | [Jev questions](https://github.com/david96182/cribrix/blob/a2b6ca24fd715863d530154b12be90ae865a16b3/cribrix/clients/jev.py#L280-L360), [triage policy](https://github.com/david96182/cribrix/blob/a2b6ca24fd715863d530154b12be90ae865a16b3/cribrix/pipeline/triage.py#L55-L71), [verification gate](https://github.com/david96182/cribrix/blob/a2b6ca24fd715863d530154b12be90ae865a16b3/cribrix/pipeline/verification.py#L270-L292), and [recorded evaluation](https://github.com/david96182/cribrix/blob/a2b6ca24fd715863d530154b12be90ae865a16b3/cribrix/evaluation/recordings/golden.json) |
| [Sedum](https://github.com/sedum-dev/sedum) | Browser end-to-end tests: in goal mode each turn asks one Jev `Choice` for the next operation (click, type, done or blocked) and its target; authored plain-English steps ask one `Choice` for the matching element (or none); each verify claim asks two `Noul`s (holds, contradicted). Code passes at holds ≥ 0.75, flags 0.60–0.75 as low confidence, and flags passes with contradicted ≥ 0.50; Playwright performs every action. | [goal-mode Choice](https://github.com/sedum-dev/sedum/blob/44f2a83a6d6205f098348721535356fa8d1bb346/packages/provider-typesafe/src/index.ts#L407-L440), [element Choice](https://github.com/sedum-dev/sedum/blob/44f2a83a6d6205f098348721535356fa8d1bb346/packages/provider-typesafe/src/request.ts#L225-L237), [Noul requests](https://github.com/sedum-dev/sedum/blob/44f2a83a6d6205f098348721535356fa8d1bb346/packages/provider-typesafe/src/request.ts#L254-L275) and [thresholds](https://github.com/sedum-dev/sedum/blob/main/docs/probabilistic-testing.md) |
| [sortwell](https://github.com/dharun-cohere/jev-sortwell) | Personal inbox for notes, links, and meeting lines (MCP server and Claude Code plugin): state is the captured text, the user's project scopes, and recent items, and one Jev request asks `Choice` questions for kind, destination project, and next action plus a `Noul` for whether the item duplicates an existing one; code routes to a project only at 0.45 or above, marks a duplicate only at 0.70 with a specific matching item, and appends the text verbatim to local JSONL that is never rewritten. That state is sent to TypeSafe; MIT. | [Typed questions and thresholds](https://github.com/dharun-cohere/jev-sortwell/blob/main/src/capture.ts), [Jev client](https://github.com/dharun-cohere/jev-sortwell/blob/main/src/jev.ts), and [offline tests](https://github.com/dharun-cohere/jev-sortwell/blob/main/test/sortwell.test.ts) |
| [1 Million Emojis](https://github.com/cwdx/1-million-emojis) | Collaborative emoji canvas: after each stroke on a shared 1000 × 1000 grid, one request asks a `Choice` over named (emoji, square) pairs next to it and a `Noul` on whether the stroke is an unfinished shape; code finishes the shape above 0.7 or samples the pick from the returned probabilities. Live at [chriswijnia.com/lab/emoji](https://chriswijnia.com/lab/emoji). | [Call site](https://github.com/cwdx/1-million-emojis/blob/main/packages/emoji/src/jev-join.ts) |
| [JevSpan](https://github.com/lzq-0529/jev-span) | Zero-shot named entity recognition for Chinese and English: code splits text at punctuation and enumerates candidate windows with exact character offsets; Jev answers batched `Choice` questions that nominate a window per entity type, verify each nominee (the type, none, mixed, or partial), and pick its exact boundary; code resolves overlaps, applies an optional score threshold, and keeps every question in a decision trace. | [Jev client](https://github.com/lzq-0529/jev-span/blob/main/src/jevspan/jev_client.py), [question logic](https://github.com/lzq-0529/jev-span/blob/main/src/jevspan/recognizer.py), [benchmark report](https://github.com/lzq-0529/jev-span/blob/main/bench/results/FINAL_REPORT.md) |
| [jev-opus](https://github.com/WXK-AI/jev-opus) | Per-step reasoning-effort routing for Claude Code on Opus 5.5: on each prompt and after every tool batch, Jev answers typed `Choice`, `Score`, and `Noul` questions about the task and step state; code maps them to low/medium/high, enforces floors and ceilings, falls back to local heuristics without a key, and sends effort as a per-message statement so the prompt cache is kept. | [Jev calls](https://github.com/WXK-AI/jev-opus/blob/9e437d4/src/router/router.ts#L123), [questions](https://github.com/WXK-AI/jev-opus/blob/9e437d4/src/router/questions.ts), offline tests (`npm test`) |
| [Jev Chat Assistant](https://github.com/jev-chat/jev-chat-jarvis) | Android chat copilot: state is the visible QQ, X or Feishu/Lark conversation (read through the accessibility service, with on-device OCR for Feishu message text) plus optional user notes; one request asks three `Choice` questions (intent, what the other person needs, next action type), one `Score` (danger level) and three `Noul` checks (literal message, whether to reply with substance, tension resolved), a separate chat model drafts three replies, and one more `Choice` ranks them. Code only fills the picked reply into the input box and never sends. | [Questions](https://github.com/jev-chat/jev-chat-jarvis/blob/main/app/src/main/java/com/jev/probe/jev/JevQuestions.kt), [client](https://github.com/jev-chat/jev-chat-jarvis/blob/main/app/src/main/java/com/jev/probe/jev/JudgeClient.kt) |
| [jev-browser-bridge](https://github.com/lexmount/jev-browser-bridge) | Browser agents on any CDP browser: Jev `Choice` picks the operation and its target element each step from candidates read off the DOM rather than the layout, so the same loop runs on Chrome and on engines that never draw a page (Moli, Lightpanda, Kitesurf); a small text model writes only when a field is typed into. | [Decision call](https://github.com/lexmount/jev-browser-bridge/blob/main/jev_browser_bridge/model.py) and [offline tests](https://github.com/lexmount/jev-browser-bridge/blob/main/tests/test_offline.py); self-reported: at least 90% of runs pass on each of 14 browsers (five web tasks, two runs each, judged by final URL). |

### Curated ecosystem additions

These projects add useful integration surfaces that are easy to miss in a use-case-only list. They are included because their public documentation exposes a concrete Jev decision boundary or a reusable developer workflow; inclusion is not an endorsement.

| Project | Area | Why it belongs |
|---|---|---|
| [typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) | Agent tooling | Go MCP server and CLI for exposing typed Jev decisions to coding agents and automation. |
| [Jevbridge](https://github.com/gamesonrblx/Jevbridge) | Agent tooling | Agent integration bridge that makes Jev decisions available alongside coding-workflow tools. |
| [jev-axi](https://github.com/shiftynick/jev-axi) | Decision CLI | Command-line primitives for picking, rating, checking, ranking, triaging, and guarding actions. |
| [jev-guard](https://github.com/leepokai/jev-guard) | Guardrails | Experimental tool-call risk scoring with explicit deny, ask, and allow outcomes. |
| [jev-engineering](https://github.com/eugeniughelbur/jev-engineering) | Guardrails | Claude Code PreToolUse gate: regex hard rules and a read-only allowlist run first, then one request with a destructive `Noul` and an allow/ask/deny `Choice`; code owns the thresholds, and auto mode approves only clear allows. Ships an offline test suite and a rerunnable 300-call injection test. |
| [pg-jev](https://github.com/realZachi/pg-jev) | Data and SQL | PostgreSQL extension for asking typed semantic questions over table data. |
| [jev-tree](https://github.com/reachjalil/jev-tree) | Classification | Hierarchical decision-tree workflow for routing high-cardinality categories with Jev. |
| [Jev Ultrafast](https://github.com/browser-use/jev-ultrafast) | Browser use | Jev chooses the browser operation and element while a smaller model writes text, keeping action selection explicit. |
| [Jev for Chrome](https://github.com/chy4pro/jev-for-chrome) | Browser use | Unofficial Chrome extension port of Jev Ultrafast: one Jev request per step selects the operation and DOM element, code owns the loop, budgets and stale checks, and two Noul cross-checks (goal reached, stuck) gate DONE and BLOCKED. |
| [typesafe-mario](https://github.com/fhshaik/typesafe-mario) | Games and simulation | Uses structured emulator state and typed decisions for game control. |
| [jev-drone](https://github.com/RomanSlack/jev-drone) | Robotics and simulation | Experimental MuJoCo quadrotor control loop with Jev in the decision path. |
| [jev-belay](https://github.com/valentynkit/jev-belay) | Guardrails | Claude Code Stop hook that checks transcript evidence before trusting a "done" claim, spending one four-question Jev call only when files changed with no passing check since, and failing open on any error. |
| [jev-commit](https://github.com/valentynkit/jev-commit) | Git tooling | Pre-commit hook that uses one Jev call to check whether the commit message matches the staged diff, flags debug leftovers and unmentioned work, and blocks only when it detects a credential. |
| [jev.nvim](https://github.com/valentynkit/jev.nvim) | Editor tooling | Neovim plugin that splits the buffer into functions with Treesitter, scores each against a plain-language question with Jev, and lists answers in the quickfix window ranked by probability. |
| [jeff](https://github.com/saembit/jeff-cli) | Decision CLI | Go CLI where `jeff rank` asks one `Score` per item per weighted dimension of a YAML spec in a single request and code owns the weights and the composite order, with `Noul`, `Choice` and `Score` commands that turn a threshold into an exit code. |
| [Jevonian](https://github.com/xinyao27/jevonian) | Agent tooling | Local OpenAI/Anthropic/Responses-compatible proxy where one Jev call answers both the model route and the thinking level for the virtual model `jevonian/auto`, from a state snapshot of the session (recent messages and tool results, consecutive error count, context headroom, quota health, candidate capabilities, cache-switch penalties); code filters candidates by protocol, context window and effort floor and owns every threshold before Jev is asked, a pinned model ID or explicit `jevonian/<route>` skips Jev entirely, `minConfidence` surfaces a low-confidence route in the ledger instead of accepting it, and each turn is recorded with the serving model, reason, real token usage, cache reads, and an estimated cost. | [Brain](https://github.com/xinyao27/jevonian/blob/main/src/brain.ts) and [routing](https://github.com/xinyao27/jevonian/blob/main/src/routing.ts) |
| [hunch](https://github.com/steven-shoemaker/hunch) | Python and TypeScript library | Turns Jev `Choice`, `Score`, and `Noul` questions into functions over lists and DataFrames (classify, score, check, where, extract, pick, rank, verify); code owns thresholds, weights, and actions, and unsure rows can be escalated to an LLM that must pick from the same labels. TypeScript port: [hunch-js](https://github.com/steven-shoemaker/hunch-js). |
| [Refix](https://refix.ai) | Growth | AI that helps your product grow faster on autopilot by running product experiments, SEO, content, and ads. |
| [Milvus Model](https://github.com/milvus-io/milvus-model) | Reranker adapter | Jev Noul questions score candidate documents in one request; Python sorts scores, keeps original indices, and applies top-k. |

### Benchmarks, calibration, and open reproductions

Keep measured results separate from demos. A useful benchmark record includes the versioned model ID, question definitions, dataset and sample count, deterministic baseline, metric, latency or cost, and the behavior on ambiguous or out-of-domain cases.

| Project | Focus | How to interpret it |
|---|---|---|
| [Bosun v3.1](https://huggingface.co/Hanno-Labs/bosun-v3.1-1.7b) | Open decision model | Apache-2.0 Qwen3 model family with public 0.6B and 1.7B weights and shipped `choice`/`score`/`noul` inference; it is a separate Jev-style alternative, not hosted Jev. |
| [NeoHorse-Jev](https://github.com/TokenRhythm/NeoHorse/tree/main/jev) | Open decision model | Apache-2.0 4B decision model from TokenRhythm built on NeoHorse-1-4B, answering `Choice`/`Noul`/`Score` questions via prefill-only inference; deployable with vLLM, SGLang, or a native Python/CLI/HTTP runtime, with weights on Hugging Face and ModelScope; the project reports 77.70 across six text benchmark groups (JevBench, Kev, OpenJev text, Nimble, VitaminC, MASSIVE), the highest among open-weight entries with complete results in its own published comparison — treat as project-reported, not an independent measurement. |
| [DecisionBench](https://github.com/Hanno-Labs/decision-bench) | Decision-model evaluation | Open runner with pinned document-grounded tasks and a native Jev adapter; inspect the model version, task mix, and scoring protocol before comparing results. |
| [jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks) | Evaluation and benchmark harnesses | Useful for comparing decision quality and operational behavior; inspect the dataset and protocol before reusing a number. |
| [jev-fanout-bench](https://github.com/blowxian/jev-fanout-bench) | Billing and answer stability | Measures requests made through OpenRouter's TypeSafe-compatible endpoint and publishes raw responses; interpret it as evidence about observed token overhead and batching savings in that route, not model accuracy or concurrent fan-out latency. |
| [jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark) | Korean-language evaluation | A language-specific benchmark candidate; treat results as workload evidence rather than a general multilingual guarantee. |
| [Jev in the Wild: A Data-Driven Analysis of the Jev Model's Functionality, Applications and Ecosystem](https://arxiv.org/abs/2609.30216) | Application ecosystem survey | Data-driven analysis of 2,170 public GitHub Jev projects, mapping rapid early growth, application domains, and decision-use patterns; repository counts do not measure deployments or model accuracy. |
| [openjev-sglang](https://github.com/ekzhang/openjev-sglang) | Open reproduction | Jev-inspired/open-model infrastructure; it is not the hosted TypeSafe Jev model. |
| [Open Medical Jev](https://github.com/FeiLiuEM/open-medical-jev) | Open reproduction, no training | Independent MIT-licensed reconstruction of the decision loop with two frozen open-weight readers (per-option probability question), a fit-free confidence gate and split-conformal candidate sets; three 600-item national licensing exams land within 2 points of hosted Jev, the hosted baseline still leads at the highest precision tiers, and it does not call the TypeSafe API. |
| [jevmlx](https://github.com/bnsd55/jevmlx) | Local MLX experimentation | Jev-style parallel decisions on MLX for local experimentation; compare semantics and calibration separately from hosted Jev. |
| [typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) | Structured-decision comparison | A benchmark project for TypeSafe-shaped decisions; record whether a run uses the official API, a gateway, or an adapter. |
| [PlayJev](https://github.com/OmniJev/PlayJev) | Open reproduction | Open 0.8B model that reads a game frame and scores the moves the game lists in one forward pass; weights, games and the reproduction script are public, and it is not the hosted Jev model. |
| [jevos](https://github.com/feder-cr/jev) | Open decision model | MIT-licensed CPU-only alternative to Jev for `Noul` (yes/no) questions only (`choice`/`score` return 422): MiniCPM5-1B cut to 17 layers with a one-logit head, shipped as a 619 MB GGUF q4_k_m [release](https://github.com/feder-cr/jev/releases/tag/jevos) for llama.cpp, one forward pass, no GPU. Same `/v1/systemone` wire format as Jev. On an Intel Core Ultra 7 255H (16 threads): 54/220 ms for a short/long request vs Jev's hosted 344/345 ms; 0.815 accuracy vs Jev's 0.927 on 2,000 held-out yes/no policy questions never seen in training (Jev is more accurate). Not the hosted Jev model. |
| [OneJev](https://github.com/OmniJev/OneJev) | Open multimodal model | Open weights from 0.8B to 27B that take screenshots, photos and video alongside the System One request and return a calibrated probability per option in one forward pass. |
| [RSI-Jev](https://github.com/Shanghua-Gao/RSI-Jev) | Open reproduction | Open 2B Jev-like model trained by a recursively self-improving AI research system; v4.0-VL (2026-09-30) also reads up to four images per request and scores 86.6 image AUROC zero-shot on 2,162 VisA test photos (Jev-Omni 81.1); every experiment is published, failures included. Not the hosted Jev model. |
| [jev-style](https://github.com/lawrence3699/jev-style) | Open reproduction | Open 0.8B Qwen3.5 decision model (`pip install "jev-style[torch]"`, or `[mlx]` on Apple silicon) served locally behind a `/v1/systemone`-compatible API with `Choice`, `Score` and `Noul`; it is not the hosted TypeSafe Jev model, which its README reports as more accurate on every published comparison set (e.g. tweet_topic zero-shot, n = 1,693: Jev 1.13 at 79.3% vs 75.5%, per the model card), and its `jev-style eval` command measures accuracy, calibration and automation rate on your own labels before you trust it. |
| [When a Judgment Layer’s Self-Reported Fields Lie](https://doi.org/10.5281/zenodo.22901853) | Independent measurement, calibration and cost accounting | Jev is one of three judgment layers measured on identical items, not the sole subject; Murphy/Brier/ECE are computed against binary ground truth and the per-call costs come from a recorded ledger. Its contradiction finding rests on seven live readings with no JSON artifact behind them, which the write-up discloses in its own errata. |
| [Jevals.com](https://jevals.com/) | Independent ground-truth benchmark | Hosted Jev (`typesafe-ai/jev` via Vercel AI Gateway) and six LLMs answering through an adapter, graded against human labels on PubMedQA (`Noul`), Banking77 (`Choice`) and HelpSteer2 (`Score`), 300 items × 5 runs each; every per-decision probability is published in [jevals-data](https://github.com/Jevals/jevals-data), the harness code is not, so recompute from the logs rather than rerun. |
| [WaterSheep](https://github.com/SamratDuttaOfficial/WaterSheep) | Open reproduction | Apache-2.0 open weights behind a local server that accepts Jev's `/v1/systemone` request format (TypeSafe's Python SDK works against it); answers `noul`/`choice`/`score` and multi-label questions about text with a probability for every option. A separate open model, not the hosted TypeSafe Jev. |
| [WebJev](https://github.com/lexmount/WebJev) | Open decision model for browser agents | Open reproduction, not hosted Jev: Apache-2.0 weights ([WebJev-35B-A3B](https://huggingface.co/Lexmount/WebJev-35B-A3B), a Qwen3.5-35B-A3B-Base fine-tune) served behind a Jev-compatible `/v1/systemone` endpoint. Author-reported, with the same jev-ultrafast agent and cloud browser: 38.52% (47/122 gradable) versus 16.67% (20/120) for `typesafe/jev-1.13-20260917` on 125 real-website tasks from Online-Mind2Web, WebGym and WebVoyager, each scored by a deterministic verifier over live-page evidence (Jev run 2026-09-24, WebJev run 2026-09-29); mean accuracy 83.72% versus 84.70% on 8 public single-step benchmarks. Per-task outcomes, verifier code and benchmark predictions are committed. |
| [Convex Decision Evals](https://www.convex.dev/evals/decision) | Domain-knowledge multiple choice | Hosted Jev (`typesafe/jev-1.13` via OpenRouter's `/api/alpha/decisions`, native `Choice`) and 14 LLMs (structured output limited to A-D, no tools, low reasoning effort) answer 108 verified four-option questions about the Convex backend platform, drawn from 90 Convex coding evals; each run asks every question 3 times with shuffled options, tasks are weighted equally, and the score is the mean of the last 3 full runs (random guessing is 25%). In the 23 Sept 2026 run Jev scored 84.6% ±0.7 at 199 ms median per question and $0.0088 per full run (13th of 15), against 98.0% at 2.12 s and $1.59 for the top model. [Source](https://github.com/get-convex/convex-evals/tree/main/runner/decisions) is Apache-2.0 and a [per-answer explorer](https://convex-evals.netlify.app) shows each choice, Jev's probabilities, and the raw request and response. Maintained by Convex, so read it as vendor-run evidence for one technical domain, not a general accuracy measurement. |
| [Jev in Search: Three Practical Evaluations](https://zc277584121.github.io/rag/2026/09/22/jev-search-deep-evaluation.html) | Independent search evaluation | Search stopping, memory reranking, and graph retrieval; independent results with public implementation links, private-data and sample-count limitations, and a labeled simulated animation. |
| [Jev Does Not Play Dice](https://kantahayashiai.github.io/posts/jev-does-not-play-dice/) | Independent calibration evaluation | Tests hosted Jev on fair random events with probabilities known by construction and on synthetic forecast documents; on 400 hidden fair-die trials, Choice selected face 1 every time with 82.9% mean reported probability and 19.0% accuracy, while Noul on the same fair-die event averaged 19.2% against the 16.7% reference probability; recorded outputs, requests, methods, and offline recomputation are public on [GitHub](https://github.com/KantaHayashiAI/jev-does-not-play-dice); the experiments were run during launch week against Jev 1.13.0 and measure probability behavior under known uncertainty rather than comparative accuracy on realistic tasks. |

For every benchmark entry, prefer a committed dataset or fixture, a reproducible command, and a clear statement of whether the result measures Jev, an adapter, an open reproduction, or a different model with a similar interface.

Have a project that belongs here? See [Adding your implementation](#adding-your-implementation) below.

## A production-shaped decision loop

```text
      ┌────────────┐
      │ state      │  text / JSON records / policy / history
      └─────┬──────┘
            │
            ▼
      ┌────────────┐      typed questions
      │ Jev        │  ──────────────────────┐
      └─────┬──────┘                         │
            │ answers + distributions       │
            ▼                                │
      ┌────────────┐  high confidence       ▼
      │ code       │ ───────────────────► act / route / rank
      │ thresholds │
      └─────┬──────┘  uncertain or risky
            └───────────────────────────► review / confirm / fallback
```

A useful implementation boundary is:

1. **Inspect** the state and decide which judgments the workflow needs.
2. **Evaluate** atomic questions together where they share the same state.
3. **Compose** answers, probabilities, and business rules in code.
4. **Gate** side effects by risk-specific thresholds.
5. **Record** the version, question definitions, distributions, chosen path, and reviewer outcome.
6. **Calibrate** thresholds on representative labeled data and revisit them after model or policy changes.

## What Jev is not

- It is not a chatbot, copywriter, code generator, or explanation engine.
- It does not return arbitrary strings. The answer space comes from the question you define.
- It is not a guarantee that a semantic judgment is correct. Calibration describes groups of predictions, not any individual answer.
- It is not a replacement for authorization, deterministic validation, policy enforcement, or human review in high-impact workflows.
- It does not currently accept images, audio, or video.

When you need a free-form answer, pair Jev with a generative model: let Jev route, retrieve, verify, or guard the call, then let the LLM write within the boundaries your application enforces.

## Safety and reliability checklist

- Keep API keys server-side and restrict which services may call the endpoint.
- Include an `other`, `unknown`, or `review` option whenever the option list can be incomplete.
- Set thresholds per action and risk level; do not copy one global threshold across the system.
- Treat low confidence as a first-class branch: ask for clarification, use a fallback, or involve a person.
- Version state schemas, question instructions, criteria, and policy code together.
- Log the versioned model returned in the response, not only the alias sent in the request.
- Store probability distributions for audit and calibration, not just the winning label.
- Use the SDK’s default retry behavior for `429` and `529`, or implement exponential backoff for direct HTTP calls.
- Make side effects an explicit second step after inspection and approval.
- Evaluate with your own representative cases, including ambiguity, adversarial text, missing fields, and out-of-domain inputs.

## Included examples

| Path | What it demonstrates |
|---|---|
| [`examples/python/quickstart.py`](examples/python/quickstart.py) | One request mixing Choice, Noul, and Score |
| [`examples/python/workflows.py`](examples/python/workflows.py) | Support triage, guardrail questions, semantic re-ranking, and composite scoring |
| [`examples/python/decision_policies.py`](examples/python/decision_policies.py) | Pure policy code for confidence gates and weighted scores |
| [`examples/typescript/quickstart.ts`](examples/typescript/quickstart.ts) | TypeScript SDK usage |
| [`tests/test_decision_policies.py`](tests/test_decision_policies.py) | Offline tests that need no API key |
| [`docs/jev-use-case-playbook.md`](docs/jev-use-case-playbook.md) | Detailed, implementation-oriented case studies |
| [`docs/coding-agent-use-cases.md`](docs/coding-agent-use-cases.md) | Agent harness and coding-agent patterns |

Run the offline checks:

```bash
python -m unittest discover -s tests -v
```

Run a live example only after setting `TYPESAFE_API_KEY`:

```bash
python examples/python/quickstart.py
```

## Repository metadata

The intended GitHub description and topic set are recorded in [`docs/repository-metadata.md`](docs/repository-metadata.md). The topic list is capped at **20**.

## Official references

- [TypeSafe AI](https://typesafe.ai/)
- [Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)
- [TypeSafe documentation](https://docs.typesafe.ai/introduction)
- [API reference](https://docs.typesafe.ai/api)
- [Models, aliases, prices, and limits](https://docs.typesafe.ai/models)
- [State](https://docs.typesafe.ai/concepts/state)
- [Primitives](https://docs.typesafe.ai/primitives)
- [Confidence](https://docs.typesafe.ai/confidence)
- [Patterns](https://docs.typesafe.ai/patterns)
- [Example use cases](https://docs.typesafe.ai/concepts/use-case-map)
- [Workflow evaluations](https://evals.typesafe.ai/)
- [Quick start](https://docs.typesafe.ai/introduction/quickstart)
- [Official Python SDK](https://github.com/typesafe-ai/typesafe-sdk-python)
- [Official JavaScript SDK](https://github.com/typesafe-ai/typesafe-sdk-js)
- [Official agent skill guide](https://docs.typesafe.ai/agent-skill)
- [Official agent skills repository](https://github.com/typesafe-ai/skills)
- [System One adapter for Python](https://github.com/typesafe-ai/system-one-adapter-python)
- [Vercel AI Gateway Jev](https://vercel.com/ai-gateway/models/jev)
- [Cloudflare Workers AI Jev](https://developers.cloudflare.com/ai/models/typesafe/jev/)
- [TypeSafe console](https://console.typesafe.ai/)

## Contributing

Useful contributions are small, reproducible, and honest about uncertainty:

- add a use case with a clear state, question contract, code-owned policy, and source;
- include a fixture or offline test when behavior can be checked without an API key;
- report model version, date, thresholds, and evaluation set for performance claims;
- separate TypeSafe-reported results from your own measurements;
- avoid putting credentials, private customer data, or irreversible actions in examples.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the review and evidence checklist used for new projects, benchmarks, and use cases.

### Adding your implementation

Built something on Jev? Open a PR that adds one row to the [Recent independent implementations](#recent-independent-implementations) table (or a short "Community implementation" note under the closest matching use case if a table row doesn't fit). To get merged quickly:

1. **Keep the diff small.** One row or one short paragraph, in the closest matching section. Don't reformat unrelated content in the same PR.
2. **Name it, don't sell it.** One sentence on what state it evaluates, what typed questions it asks (`Choice` / `Score` / `Noul`), and where application code owns policy, thresholds, or side effects.
3. **Disclose affiliation.** Say in the PR description if you built or maintain the project. That's fine — this list is for independent implementations, not just third-party ones — but it must be stated.
4. **Link to evidence.** A public repo, and ideally the specific file(s) that call the Jev API, so reviewers can verify the claim without trusting the description.
5. **Make it inspectable.** Public source, a license, and a README that explains setup and any data sent to providers. No closed demos as the only evidence.
6. **Don't overclaim.** No unverified performance/benchmark numbers. Mark experimental or dry-run-only paths (e.g., trading, financial, or home-automation actions) explicitly.

Listing here is not a TypeSafe endorsement — see the disclaimer above the table.

## License

MIT — see [LICENSE](LICENSE).
