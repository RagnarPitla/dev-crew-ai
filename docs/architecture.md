# Architecture

Dev Crew AI is a local desktop orchestration layer for AI coding sessions.

## Core idea

A **lane** is an isolated unit of development work.

Each lane has:

- project;
- git worktree;
- branch;
- linked GitHub issue or PR;
- provider/agent process;
- scoped instructions;
- terminal output/transcript;
- status;
- message-bus events.

## Process model

```text
Electron main process
  ├─ Git service          -> git CLI
  ├─ GitHub service       -> gh CLI
  ├─ Lane service         -> worktree + instructions + provider
  ├─ Provider service     -> Claude/Copilot/Ollama/custom adapters
  ├─ Message bus service  -> explicit lane communication
  └─ Renderer UI          -> lane board, detail, terminal, diff, messages
```

## Why Electron

Electron is heavier than Tauri, but v0.1 needs fast iteration on:

- embedded terminal/process UX;
- cross-platform packaging;
- Node child process orchestration;
- React UI.

Tauri can be reconsidered after the product shape stabilizes.

## Provider adapters

Providers are presets over local commands. The first version intentionally avoids provider lock-in.

Supported scaffold adapters:

- custom command;
- Claude Code;
- GitHub Copilot command adapter;
- Ollama.

Future adapters:

- Codex;
- OpenCode;
- Aider;
- Goose;
- Hermes/Ruby.

## Cross-lane communication

Agents do not silently share context. Communication happens through a visible message bus.

Message types:

- user broadcast;
- lane-to-lane request;
- system conflict alert;
- dependency notice;
- PR/review handoff.

## Safety

Dev Crew AI should never hide destructive actions. v0.1 should avoid automatic merge, force-push, or deletion.
