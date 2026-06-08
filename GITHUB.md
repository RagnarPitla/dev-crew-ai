# GitHub Workflow for Dev Crew AI

This file is a human and agent guide for using GitHub with Dev Crew AI.

> GitHub CLI does **not** require this file. The `gh` CLI requires authentication with `gh auth login`. This file explains the recommended setup and workflow for contributors and AI agents.

## Required tools

- Git
- GitHub CLI: `gh`
- Node.js 20+

Optional:

- GitHub Copilot CLI extension or Copilot support through `gh copilot`
- Provider CLIs such as Claude Code, Codex, OpenCode, Aider, Ollama, or Hermes

## Login with GitHub CLI

Run:

```bash
gh auth login
```

Recommended choices:

```text
GitHub.com
HTTPS
Authenticate with browser
```

Then configure Git integration:

```bash
gh auth setup-git
```

Verify:

```bash
gh auth status
gh repo view RagnarPitla/dev-crew-ai
```

## GitHub Copilot CLI readiness

Check whether Copilot is available through your GitHub CLI:

```bash
gh copilot --help
```

If available, a shell suggestion can be requested with:

```bash
gh copilot suggest -t shell "show git status"
```

Dev Crew AI treats Copilot as a configurable command adapter because GitHub Copilot CLI availability can vary by account, extension, platform, and installation method.

## OS-specific launch commands

Dev Crew AI supports command planning for:

- Windows: `win32`
- macOS: `darwin`
- Linux: `linux`

Browser opening commands:

```text
Windows: cmd.exe /d /s /c start "" <url>
macOS:   open <url>
Linux:   xdg-open <url>
```

GitHub login command:

```bash
gh auth login --web --hostname github.com --git-protocol https
```

Copilot suggestion command:

```bash
gh copilot suggest -t shell "<prompt>"
```

## Dev Crew AI gated workflow

Before Dev Crew AI pushes to GitHub, every action item should pass:

```text
PM Spec → Dev → QA → PM Final → Push allowed
```

Rules:

- PM Spec defines the problem, acceptance criteria, and privacy scope.
- Dev implements with tests and does not push.
- QA verifies behavior, tests, build, and private-file boundaries.
- PM Final explicitly approves GitHub push.
- Dev Crew AI should block product-controlled push actions until PM Final approval exists.

## Local development commands

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build:

```bash
npm run build
```

## Before pushing

Run:

```bash
npm test
npm run build
git status --short
git diff --stat
```

Confirm:

- tests pass;
- build passes;
- no secrets are present;
- no private planning files are staged;
- PM Final approval exists for the action item.

## Private files that should not be pushed

Local-only private planning state should stay out of Git:

```text
.hermes/private-plans/
.hermes/action-items/
.hermes/gates/
```

If these appear in `git status`, stop and fix ignore/exclude rules before pushing.
