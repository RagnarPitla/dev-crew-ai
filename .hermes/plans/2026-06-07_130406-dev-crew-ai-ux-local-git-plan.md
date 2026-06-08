# Dev Crew AI UX + Local Git Onboarding Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Design Dev Crew AI’s first-run and project onboarding experience so users can work with existing GitHub repos, existing local Git repos, or plain folders that are not Git projects yet.

**Architecture:** Add a project onboarding wizard in the Electron renderer, backed by main-process Git services that can detect repo state, initialize local Git safely, optionally create a GitHub remote later, and choose the correct lane strategy. The UX must make Git safety understandable without forcing GitHub on every user.

**Tech Stack:** Electron, React, TypeScript, Git CLI, GitHub CLI optional, local persistence, provider adapters.

---

## 1. Product principle

Dev Crew AI should not require GitHub on day one.

GitHub is a power path, but the product should support three project modes:

1. **GitHub repo** — project has Git + GitHub remote.
2. **Local Git repo** — project has Git but no GitHub remote.
3. **Plain local folder** — project has no Git yet.

This matters because many users will start with:

- a local prototype;
- a downloaded folder;
- a zip file;
- a personal app that is not on GitHub;
- a client project they cannot push remotely;
- a folder they want agents to work on safely.

Dev Crew AI should meet them where they are.

---

## 2. Core UX idea

First-run CTA:

> **Add a project**

Then ask:

```text
How do you want to start?

[Open a GitHub repo]
Connect to issues, PRs, CI, branches, and remotes.

[Open a local Git repo]
Use local branches and worktrees. GitHub optional later.

[Open a folder]
Initialize local Git so agent work is safe and reversible.
```

The key promise:

> You can use Dev Crew AI locally first. GitHub is optional until you want PRs.

---

## 3. Project modes

### Mode A: GitHub repo

**Detection:**

- Folder contains `.git`.
- `git remote get-url origin` points to GitHub.
- `gh auth status` works.

**Available features:**

- list issues;
- list PRs;
- create lane from issue;
- create worktree;
- push branch;
- create PR;
- watch CI later.

**Primary user journey:**

```text
Add Project → GitHub detected → Load Issues/PRs → Create Lane → Agent works → Create PR
```

### Mode B: Local Git repo

**Detection:**

- Folder contains `.git`.
- No GitHub remote, or remote is not GitHub.

**Available features:**

- create manual lanes;
- create local branches/worktrees;
- run agents;
- show diffs;
- commit changes;
- no GitHub issue/PR integration until remote connected.

**Primary user journey:**

```text
Add Project → Local Git detected → Create Manual Lane → Agent works → Review diff → Commit locally
```

**Optional upgrade path:**

```text
Connect GitHub Remote → Push branch → Create PR
```

### Mode C: Plain local folder

**Detection:**

- No `.git`.

**Available features after setup:**

- initialize Git;
- create baseline commit;
- create lanes;
- create local branches/worktrees;
- run agents;
- show diffs;
- commit locally.

**Primary user journey:**

```text
Add Folder → No Git detected → Initialize local Git → Baseline commit → Create Lane → Agent works safely
```

**Important copy:**

> Dev Crew AI uses Git locally so agent changes are reversible. You do not need to publish this project to GitHub.

---

## 4. Onboarding wizard UX

### Step 1: Welcome

Title:

> Welcome to Dev Crew AI

Subtitle:

> A Parallel Development Studio for running AI coding agents safely across your projects.

Actions:

- Add a project
- Open demo project
- Read how it works

### Step 2: Choose source

Options:

1. Open local folder
2. Clone GitHub repo
3. Open existing repo

For v0.1, prioritize local folder and existing repo. Clone can come later.

### Step 3: Project scan

After user selects folder, show scan result:

```text
Project scan

Path: C:\Users\ragnar\projects\my-app
Git: Not initialized
GitHub: Not connected
Package: Node.js detected
Recommended setup: Initialize local Git and create baseline commit
```

Possible scan fields:

- Git status: GitHub repo / local Git / no Git
- Remote: GitHub / other / none
- Default branch
- Dirty files count
- Project type: Node/Python/.NET/unknown
- Package manager: npm/pnpm/yarn/uv/pip/dotnet/unknown
- Agent instruction files: CLAUDE.md / AGENTS.md / none

### Step 4: Safety setup

If no Git:

```text
This folder is not a Git project yet.

Dev Crew AI can initialize local Git so every agent change is trackable and reversible.

[Initialize local Git]
[Skip for now — read-only exploration]
```

If user chooses initialize:

1. Run `git init`.
2. Create `.gitignore` if missing.
3. Stage files.
4. Create baseline commit.

Suggested commit:

```bash
git add .
git commit -m "chore: baseline before Dev Crew AI lanes"
```

If user does not have Git identity configured, show:

```text
Git needs your name and email before creating commits.
```

Options:

- Use global Git identity if present.
- Set local repo identity.
- Skip baseline commit.

### Step 5: Lane strategy

After project is ready, ask:

```text
How do you want to create work lanes?

[Manual lanes]
Create feature, bugfix, docs, review, or spike lanes from your own description.

[GitHub issues]
Connect GitHub and create lanes from issues.

[Explore first]
Ask an agent to inspect the project before making changes.
```

---

## 5. UX screens to design/build

### Screen: Empty state

Purpose: explain product and get user to add a project.

Content:

- headline;
- 3-step visual: Project → Lane → PR;
- CTA: Add project;
- secondary CTA: open sample.

### Screen: Project scan result

Purpose: build trust by showing what Dev Crew AI detected before doing anything.

Sections:

- Project path;
- Git status;
- GitHub status;
- Package/ecosystem;
- Recommended next step.

### Screen: Initialize local Git

Purpose: make Git setup feel safe, not scary.

Content:

- why Git is needed;
- what commands will run;
- checkbox to create `.gitignore`;
- checkbox to create baseline commit;
- command preview.

### Screen: Project dashboard

Purpose: central hub after setup.

Tabs based on mode:

- Overview
- Lanes
- Local tasks
- GitHub issues (only if connected)
- PRs (only if connected)
- Settings

### Screen: Create manual lane

Fields:

- lane title;
- lane type: feature/bugfix/docs/review/release/spike;
- provider;
- base branch;
- scope notes;
- files allowed/blocked;
- create worktree toggle.

### Screen: Connect GitHub later

For local-only users:

```text
Want PRs and issues?

Connect this local repo to GitHub when you are ready.
```

Options:

- create new GitHub repo;
- add existing remote;
- keep local only.

---

## 6. Feature flags by project mode

### GitHub repo

Enabled:

- Issues
- PRs
- Worktrees
- Branch push
- PR creation
- CI watch later

### Local Git repo

Enabled:

- Manual lanes
- Worktrees
- Diffs
- Commits
- Local branch management

Disabled/upsell-copy:

- Issues: “Connect GitHub to use issues.”
- PRs: “Connect GitHub to create PRs.”

### Plain folder

Before setup:

- Read-only project scan
- Initialize Git
- Explore first

After local Git setup:

- Manual lanes
- Worktrees
- Diffs
- Commits

---

## 7. Copy guidelines

Use reassuring language.

Bad:

> This project is not valid.

Good:

> This folder is not using Git yet. Dev Crew AI can initialize local Git so agent changes are trackable and reversible.

Bad:

> GitHub unavailable.

Good:

> GitHub is optional. You can work locally now and connect GitHub later for issues and PRs.

Bad:

> Create worktree failed.

Good:

> Dev Crew AI could not create a worktree. This usually happens when the repo has uncommitted setup changes or the branch already exists.

---

## 8. Engineering changes needed

### Data model changes

Update `Project`:

```ts
export type ProjectMode = 'github' | 'local-git' | 'plain-folder';

export interface Project {
  id: string;
  name: string;
  rootPath: string;
  mode: ProjectMode;
  gitInitialized: boolean;
  githubConnected: boolean;
  remoteUrl?: string;
  githubOwner?: string;
  githubRepo?: string;
  defaultBranch?: string;
  createdAt: string;
  updatedAt: string;
}
```

Add `ProjectScanResult`:

```ts
export interface ProjectScanResult {
  rootPath: string;
  exists: boolean;
  isGitRepo: boolean;
  hasCommits: boolean;
  hasGitHubRemote: boolean;
  remoteUrl?: string;
  githubOwner?: string;
  githubRepo?: string;
  currentBranch?: string;
  defaultBranch?: string;
  dirtyFiles: string[];
  detectedStack: string[];
  recommendedAction: 'open-github' | 'open-local-git' | 'init-git' | 'read-only';
}
```

### Git service changes

Add functions:

```ts
scanProject(path: string): Promise<ProjectScanResult>
initRepo(path: string): Promise<void>
hasCommits(path: string): Promise<boolean>
ensureGitIdentity(path: string): Promise<GitIdentityStatus>
createBaselineCommit(path: string, message: string): Promise<void>
createGitignoreIfMissing(path: string): Promise<void>
addRemote(path: string, name: string, url: string): Promise<void>
```

### IPC changes

Add channels:

- `projects:scan`
- `projects:init-git`
- `projects:create-baseline`
- `projects:create-gitignore`
- `projects:add-remote`
- `projects:set-mode`

### UI changes

Create:

- `src/renderer/src/components/onboarding/WelcomeScreen.tsx`
- `src/renderer/src/components/onboarding/AddProjectWizard.tsx`
- `src/renderer/src/components/onboarding/ProjectScanCard.tsx`
- `src/renderer/src/components/onboarding/InitializeGitStep.tsx`
- `src/renderer/src/components/onboarding/ConnectGitHubStep.tsx`
- `src/renderer/src/components/ManualLaneDialog.tsx`

---

## 9. Implementation tasks

### Task 1: Add project mode types

**Objective:** Represent GitHub, local Git, and plain folder projects in the domain model.

**Files:**
- Modify: `src/shared/types.ts`
- Modify: `src/shared/schemas.ts`
- Modify: `src/renderer/src/shared/types.ts`
- Test: `tests/unit/domain.test.ts`

**Verification:**

```bash
npm test
npm run build
```

### Task 2: Implement project scanning

**Objective:** Detect whether a selected folder is GitHub, local Git, or plain folder.

**Files:**
- Modify: `src/main/services/gitService.ts`
- Test: `tests/unit/gitService.test.ts`

**Test cases:**

- plain temp folder → `plain-folder` recommendation.
- git repo with no remote → `local-git`.
- git repo with GitHub remote → `github`.

### Task 3: Implement local Git initialization

**Objective:** Safely initialize Git for plain folders.

**Files:**
- Modify: `src/main/services/gitService.ts`
- Test: `tests/unit/gitInit.test.ts`

**Behavior:**

- `git init` only if no `.git` exists.
- create `.gitignore` if missing.
- detect missing identity before commit.
- baseline commit optional.

### Task 4: Add onboarding IPC

**Objective:** Expose scan/init/baseline APIs to renderer.

**Files:**
- Modify: `src/main/ipc.ts`
- Modify: `src/preload/index.ts`
- Modify: `src/renderer/lib/ipcClient.ts`

**Verification:**

```bash
npm run build
```

### Task 5: Build empty state + add project wizard

**Objective:** Make first-run UX understandable.

**Files:**
- Create: `src/renderer/src/components/onboarding/WelcomeScreen.tsx`
- Create: `src/renderer/src/components/onboarding/AddProjectWizard.tsx`
- Create: `src/renderer/src/components/onboarding/ProjectScanCard.tsx`
- Modify: `src/renderer/src/App.tsx`

**Verification:**

Manual: open app, see welcome screen, scan folder.

### Task 6: Build initialize Git step

**Objective:** Let plain-folder users initialize local Git safely.

**Files:**
- Create: `src/renderer/src/components/onboarding/InitializeGitStep.tsx`
- Modify: `src/renderer/src/components/onboarding/AddProjectWizard.tsx`

**Verification:**

Manual:

- select plain folder;
- see command preview;
- initialize Git;
- project mode becomes local Git.

### Task 7: Add manual lane path

**Objective:** Let users create lanes without GitHub issues.

**Files:**
- Create: `src/renderer/src/components/ManualLaneDialog.tsx`
- Modify: `src/main/services/laneService.ts`
- Modify: `src/renderer/src/App.tsx`

**Verification:**

Manual:

- local Git project;
- create manual lane;
- worktree created;
- instructions written.

### Task 8: Add mode-aware UI

**Objective:** Hide/disable GitHub features when GitHub is not connected.

**Files:**
- Modify: `src/renderer/src/components/ProjectSidebar.tsx`
- Modify: `src/renderer/src/components/LaneBoard.tsx`
- Create: `src/renderer/src/components/ConnectGitHubPrompt.tsx`

**Verification:**

- Plain folder shows init Git prompt.
- Local Git shows manual lane prompt.
- GitHub repo shows issues/PRs.

---

## 10. UX acceptance criteria

A non-GitHub user should be able to say:

> “I can use Dev Crew AI on a local folder without publishing anything.”

A GitHub user should be able to say:

> “I can connect my repo and turn issues into agent lanes.”

A safety-conscious user should be able to say:

> “I understand what commands Dev Crew AI runs before it runs them.”

---

## 11. Updated product messaging

Add this to product copy:

> Dev Crew AI works locally first. You can start with a plain folder, initialize local Git for safety, and run agent lanes without publishing your code. Connect GitHub later when you want issues, PRs, and CI.

---

## 12. Recommended next local milestone

Before building PR creation, build this UX milestone:

```text
Open folder → scan project → initialize local Git if needed → create manual lane → create worktree → start custom command → show output
```

This gives us a better first product experience than requiring GitHub upfront.
