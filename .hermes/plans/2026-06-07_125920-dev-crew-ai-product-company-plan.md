# Dev Crew AI Product + Company Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Turn Dev Crew AI from an early open-source scaffold into a real product/company: a local-first Parallel Development Studio for AI coding agents that helps developers and teams run multiple agent sessions safely across GitHub issues, features, PRs, reviews, and releases.

**Architecture:** Build locally first as an Electron desktop product with Git/GitHub CLI orchestration, provider adapters, worktree-backed lanes, visible multi-session coordination, local persistence, and a safety-first UX. Use open source as the distribution and trust wedge; add commercial/team features later after proving individual developer value.

**Tech Stack:** Electron, React, TypeScript, Vite, Node child processes, Git CLI, GitHub CLI, SQLite/local storage, provider adapters for GitHub Copilot/Claude Code/Ollama/custom commands, Vitest, Playwright later.

---

## 1. Product thesis

Dev Crew AI should not be “another AI chat app.”

It should be:

> **The local command center for running AI coding agents like a coordinated dev crew.**

Most AI coding tools are one-session tools. Dev Crew AI should own the workflow where a builder wants to work on many things at once:

- one lane for a feature;
- one lane for a bugfix;
- one lane for PR review;
- one lane for docs;
- one lane for release readiness;
- one message bus so everything is visible and auditable.

The core product promise:

> **Scout the work. Spin up lanes. Review diffs. Ship PRs.**

---

## 2. Who we are making this for

### Primary ICP: AI-native solo developer / open-source maintainer

**Profile:**
- Maintains 1–10 repos.
- Uses GitHub issues/PRs heavily.
- Already experiments with Claude Code, Copilot, Codex, OpenCode, Aider, Ollama, or Hermes.
- Wants to move faster but is worried about agent chaos.

**Pain:**
- Too many issues/PRs.
- Agent sessions get mixed together.
- Branch switching loses context.
- Reviewing generated changes is hard.
- Running multiple agents feels unsafe.

**Why they buy/use:**
- They want an organized command center.
- They want worktree safety without manual setup.
- They want visible status, diffs, and PR flow.

### Secondary ICP: small engineering team / startup

**Profile:**
- 2–20 engineers.
- Uses GitHub.
- Open to AI agents but wants guardrails.
- Has many parallel backlog items.

**Pain:**
- AI work is not auditable.
- Agents do not coordinate well.
- Managers cannot see agent progress.
- Developers do not trust auto-generated branches.

**Why they buy/use:**
- Team visibility.
- Standard workflow for agent-created PRs.
- Safety and audit trail.
- Optional team policies later.

### Tertiary ICP: enterprise power user

**Profile:**
- Developer inside a large company.
- Needs local-first / privacy-friendly tooling.
- Cannot send all code to random SaaS products.

**Pain:**
- Security constraints.
- Approved models/tools vary.
- Need bring-your-own-provider.

**Why they buy/use:**
- Local-first.
- Provider-flexible.
- GitHub-native.
- No hidden cloud requirement.

---

## 3. Product categories we are blending

Dev Crew AI sits between:

1. **AI coding agents** — Claude Code, Copilot, Codex, OpenCode, Aider, Goose.
2. **GitHub workflow tools** — gh CLI, issue/PR dashboards, release tools.
3. **Local developer desktops** — VS Code-like workflows, Git clients, terminal multiplexers.
4. **Agent orchestration** — multi-agent coordination, worktree isolation, message bus.

Our wedge:

> **Not the agent itself. The operating layer for multiple agents working on real GitHub tasks.**

---

## 4. Positioning

### One-liner

Dev Crew AI is a local-first Parallel Development Studio for running multiple AI coding agents safely across GitHub issues, branches, PRs, and reviews.

### Simple pitch

Dev Crew AI turns GitHub work into isolated agent lanes. Each lane gets its own worktree, branch, instructions, terminal session, transcript, and PR workflow — so you can run multiple AI coding sessions without losing control.

### Taglines

- Scout the work. Spin up lanes. Review diffs. Ship PRs.
- Multi-session AI coding without the chaos.
- A local command center for your AI dev crew.
- Worktrees, agents, GitHub, and PRs — organized.

### What we are not

- Not a generic chatbot.
- Not a hosted agent marketplace.
- Not a replacement for GitHub.
- Not a replacement for VS Code.
- Not fully autonomous merge-and-pray tooling.

---

## 5. Product principles

1. **Local-first:** Code, state, logs, and transcripts live locally by default.
2. **GitHub-native:** GitHub issues, PRs, branches, and CI are first-class.
3. **Bring your own agent:** Copilot, Claude Code, Codex, OpenCode, Aider, Ollama, Hermes, custom commands.
4. **Worktree isolation:** Every lane gets its own workspace and branch.
5. **Visible autonomy:** Users see terminal output, diffs, status, and PRs.
6. **Explicit communication:** Lanes communicate through a message bus, not hidden context leakage.
7. **No surprise destructive actions:** No automatic merge, force-push, or delete without approval.
8. **Product before platform:** First make one developer love it locally; then build team/company features.

---

## 6. MVP definition

The MVP should make one local developer say:

> “This is the easiest way to run multiple coding agents on my GitHub backlog.”

### MVP user journey

1. User opens Dev Crew AI.
2. Adds a local GitHub repo.
3. Sees repo status, open issues, open PRs.
4. Clicks “Create Lane” from issue.
5. Dev Crew AI creates a git worktree + branch.
6. Dev Crew AI writes `DEV_CREW_LANE.md` instructions.
7. User picks provider: Copilot, Claude Code, Ollama, custom command.
8. Agent starts in that lane.
9. User watches output in lane detail.
10. User creates a second lane for another task.
11. Dev Crew AI warns if lanes touch same files.
12. User reviews diff.
13. User creates PR.
14. User cleans up lane after merge.

### MVP must-have features

- Project add/import.
- Git repo detection.
- GitHub CLI auth detection.
- Issue/PR list from `gh`.
- Lane creation.
- Worktree creation.
- Instruction generation.
- Provider command execution.
- Live terminal output.
- Lane board.
- Lane detail view.
- Message bus.
- Diff preview.
- PR creation.
- Lane cleanup.

### MVP should-not-have features

- Accounts.
- Cloud sync.
- Team billing.
- Plugin marketplace.
- Advanced analytics.
- Autonomous merge.
- Hosted model inference.
- Complex agent planning engine.

---

## 7. Company/product roadmap

### Phase 0 — Local product clarity

**Goal:** Define product, ICP, and UX before adding more code.

Deliverables:
- Product brief.
- ICP doc.
- User journeys.
- Landing page copy.
- README revised to “we are building this now.”
- Local demo script.

### Phase 1 — Usable local alpha

**Goal:** Make the app work end-to-end locally for one repo.

Deliverables:
- Add project from local path.
- Persist project and lanes.
- List GitHub issues and PRs.
- Create lane from issue.
- Create worktree and branch.
- Start custom command provider.
- Stream process output.
- Show diff.
- Create PR.
- Cleanup lane.

### Phase 2 — Provider polish

**Goal:** Make common providers easy.

Deliverables:
- Claude Code preset.
- GitHub Copilot command preset.
- Ollama summarization preset.
- Custom command UI.
- Provider health checks.
- Provider docs.

### Phase 3 — Multi-session coordination

**Goal:** Make parallel work clear and safe.

Deliverables:
- Message bus send/forward flow.
- File conflict detection.
- Lane dependency notices.
- Lane-to-review handoff.
- Global “pause all lanes.”
- Activity timeline.

### Phase 4 — Public beta

**Goal:** Get real users.

Deliverables:
- Installer builds.
- Demo videos.
- Landing page.
- Example repo walkthrough.
- GitHub Discussions enabled.
- Issue templates.
- Contribution guide.

### Phase 5 — Company/commercial direction

**Goal:** Add team/company value without breaking open-source trust.

Potential paid features:
- Team policy packs.
- Shared lane dashboards.
- Audit logs.
- Enterprise provider policies.
- Private team templates.
- Cloud sync for lane metadata only.
- Organization-level reporting.

Open-source core stays:
- local lanes;
- worktrees;
- providers;
- GitHub issue/PR basics;
- message bus;
- safety model.

---

## 8. Product docs we need

Create these files before heavy implementation:

- `docs/product/vision.md`
- `docs/product/icp.md`
- `docs/product/user-journeys.md`
- `docs/product/mvp.md`
- `docs/product/company-roadmap.md`
- `docs/product/pricing-hypotheses.md`
- `docs/product/launch-plan.md`
- `docs/product/demo-script.md`

---

## 9. Engineering backlog

### Task 1: Create product docs folder

**Objective:** Capture product/company strategy locally before pushing more changes.

**Files:**
- Create: `docs/product/vision.md`
- Create: `docs/product/icp.md`
- Create: `docs/product/user-journeys.md`
- Create: `docs/product/mvp.md`
- Create: `docs/product/company-roadmap.md`

**Verification:**
- Docs clearly answer who, what, why, and MVP.

### Task 2: Update README from “done” to “building now”

**Objective:** Make public messaging honest and founder-led.

**Files:**
- Modify: `README.md`

**Copy direction:**

```md
We are building Dev Crew AI in public.

This repo is the early open-source scaffold for a local-first Parallel Development Studio for AI coding agents. The goal is to help developers run multiple agent sessions safely across GitHub issues, branches, PRs, and reviews.

More updates, demos, and videos are coming as we build.
```

**Verification:**
- README does not overclaim features that are not implemented.

### Task 3: Add local persistence

**Objective:** Projects and lanes survive app restart.

**Files:**
- Create: `src/main/services/dbService.ts`
- Create: `src/main/services/migrations/001_initial.sql`
- Modify: `src/main/ipc.ts`
- Test: `tests/unit/dbService.test.ts`

**Verification:**

```bash
npm test
npm run build
```

### Task 4: Implement project import UI

**Objective:** User can add a local git repo from the app.

**Files:**
- Modify: `src/main/ipc.ts`
- Modify: `src/preload/index.ts`
- Modify: `src/renderer/src/components/ProjectSidebar.tsx`
- Create: `src/renderer/src/components/AddProjectDialog.tsx`

**Verification:**
- Add local repo.
- Repo appears in sidebar.
- GitHub owner/repo detected.

### Task 5: Implement GitHub issue lane creation

**Objective:** Turn a GitHub issue into a lane.

**Files:**
- Modify: `src/main/services/ghService.ts`
- Modify: `src/main/services/laneService.ts`
- Modify: `src/renderer/src/components/ProjectSidebar.tsx`
- Create: `src/renderer/src/components/CreateLaneDialog.tsx`

**Verification:**
- Select issue.
- Create lane.
- Worktree created.
- `DEV_CREW_LANE.md` written.

### Task 6: Implement terminal streaming

**Objective:** Show live provider process output in lane detail.

**Files:**
- Modify: `src/main/services/commandRunner.ts`
- Modify: `src/main/ipc.ts`
- Modify: `src/preload/index.ts`
- Modify: `src/renderer/src/components/TerminalView.tsx`

**Verification:**
- Start a lane with custom command.
- Output streams into app.
- Stop button kills process.

### Task 7: Implement diff preview

**Objective:** Show current lane changes.

**Files:**
- Modify: `src/main/services/gitService.ts`
- Modify: `src/main/ipc.ts`
- Modify: `src/renderer/src/components/DiffView.tsx`

**Verification:**
- Make file change in lane.
- Diff appears in app.

### Task 8: Implement PR creation

**Objective:** Create GitHub PR from lane.

**Files:**
- Modify: `src/main/services/laneService.ts`
- Modify: `src/renderer/src/components/LaneDetail.tsx`
- Create: `src/renderer/src/components/CreatePrDialog.tsx`

**Verification:**
- Commit lane changes.
- Create PR through app.
- PR URL stored/displayed.

### Task 9: Implement message bus forwarding

**Objective:** Let users coordinate lanes explicitly.

**Files:**
- Modify: `src/main/services/messageBusService.ts`
- Modify: `src/renderer/src/components/MessageBus.tsx`
- Modify: `src/renderer/src/components/LaneDetail.tsx`

**Verification:**
- Broadcast message appears.
- User can forward to lane.
- Message appears in lane transcript.

### Task 10: Implement conflict detection

**Objective:** Warn when lanes edit same files.

**Files:**
- Create: `src/main/services/conflictService.ts`
- Test: `tests/unit/conflictService.test.ts`

**Verification:**
- Two lanes edit same file.
- Message bus shows system warning.

---

## 10. Launch plan

### Now

Message publicly as:

> We are building Dev Crew AI now.

Not:

> Dev Crew AI is finished.

### LinkedIn post direction

- Announce working/building in public.
- Explain problem.
- Explain target users.
- Show visuals.
- Link repo.
- Ask for feedback.
- Promise videos/demos soon.

### First demo video

Title:

> Building Dev Crew AI: turning GitHub issues into AI agent lanes

Script:
1. Show repo and README.
2. Explain problem: one agent session at a time.
3. Show UI mock.
4. Show lane concept.
5. Show future flow: issue → worktree → agent → PR.
6. Ask for feedback/contributors.

---

## 11. Company questions to answer

Before commercialization:

1. Is the first customer solo devs, OSS maintainers, or small teams?
2. Is the product primarily desktop, CLI, or desktop + CLI?
3. Does the company brand stay Dev Crew AI or RBuild.ai?
4. What stays open source forever?
5. What becomes paid?
6. How do we handle enterprise privacy/security?
7. Do we support GitHub only first, or Azure DevOps later?
8. Do we build our own agent runtime, or stay provider-agnostic?

Recommended answers for now:

- First customer: AI-native solo devs + OSS maintainers.
- Product: desktop first, CLI later.
- Brand: Dev Crew AI product under RBuild.ai.
- Open source: local core.
- Paid later: team coordination, policies, audit, org dashboards.
- GitHub first.
- Provider-agnostic, no custom model lock-in.

---

## 12. Immediate next actions

1. Keep working locally before next push.
2. Update public messaging to “we are building this now.”
3. Create product docs locally.
4. Build local persistence.
5. Build project import.
6. Build issue-to-lane flow.
7. Record first short demo once issue-to-lane works.

---

## Success criteria for the next local milestone

Before pushing the next public update, Dev Crew AI should support:

- add a local repo;
- see GitHub issues;
- create a lane from an issue;
- create a worktree;
- write lane instructions;
- start a custom command provider;
- see lane output;
- show a diff.

That is the first “real product” moment.
