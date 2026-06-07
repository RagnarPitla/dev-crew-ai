# Dev Crew AI

**Parallel Development Studio for AI coding agents.**

Dev Crew AI is a local-first desktop app for Windows and macOS that lets you run multiple AI coding sessions safely across GitHub projects, issues, features, PRs, and reviews.

Bring your own agent: GitHub Copilot, Claude Code, Codex, OpenCode, Aider, Ollama, Hermes, or any custom command.

> Views expressed in this project are Ragnar Pitla's own and do not represent Microsoft's official position.

![Dev Crew AI overview](assets/dev-crew-ai-overview.svg)

## Why

One repo, one branch, one terminal, one AI session is sequential hell.

Dev Crew AI turns work into visible **lanes**:

- each lane gets a git worktree;
- each lane gets a branch;
- each lane gets scoped instructions;
- each lane runs an agent/provider process;
- each lane can create a PR;
- lanes coordinate through an auditable message bus.

## How it works

![Dev Crew AI workflow](assets/dev-crew-ai-flow.svg)

1. **Scout** GitHub issues, PRs, and local repo state.
2. **Spin up a lane** with its own worktree, branch, and instructions.
3. **Run an agent** using Copilot, Claude Code, Ollama, Hermes, or a custom command.
4. **Review and ship** with visible diffs, message bus coordination, and PR creation.

## What it does

- Add local GitHub repos as projects.
- Read issues and PRs through `gh` CLI.
- Create isolated git worktree lanes from issues, features, bugfixes, reviews, docs, releases, or spikes.
- Start agent sessions in each lane.
- Show lane status, terminal output, branch, worktree, provider, and linked GitHub work.
- Provide a visible cross-lane message bus so sessions can coordinate clearly.
- Detect future file conflicts across lanes.
- Create PRs and clean up worktrees.

## Product positioning

**Dev Crew AI** is the brand.

**Parallel Development Studio** is the descriptive phrase.

Tagline:

> Scout the work. Spin up lanes. Review diffs. Ship PRs.

## Status

Early open-source scaffold. The repo includes:

- Electron + React + TypeScript app shell;
- lane data model;
- Git service;
- GitHub CLI service;
- provider adapter interface;
- Claude Code, Copilot, Ollama, and custom-command provider presets;
- lane orchestration service;
- demo UI for lane board, lane detail, and message bus;
- docs and templates.

## Quickstart

```bash
git clone https://github.com/RagnarPitla/dev-crew-ai.git
cd dev-crew-ai
npm install
npm run dev
```

## Requirements

- Node.js 20+
- Git
- GitHub CLI (`gh`) authenticated for GitHub workflows
- Optional provider CLIs:
  - Claude Code: `claude`
  - GitHub Copilot CLI or `gh copilot`
  - Ollama: `ollama`
  - any custom command

## Safety model

Dev Crew AI is local-first and visible-by-default:

- no automatic merge;
- no automatic force push;
- no hidden cross-agent context sharing;
- every lane is isolated by git worktree;
- dangerous cleanup actions require user intent;
- provider commands are visible and configurable.

## Roadmap

See [docs/roadmap.md](docs/roadmap.md).

## License

MIT
