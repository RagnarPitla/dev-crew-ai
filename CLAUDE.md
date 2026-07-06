# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are working inside **Dev Crew AI** — a local-first Electron desktop studio for running multiple AI coding agents in parallel, each isolated in its own git worktree. This repo is also a public, self-referential example of a "team harness" (see `docs/harness/`).

## Product principles

- Local-first.
- GitHub-native.
- Provider-flexible (no vendor lock-in).
- Visible autonomy — branch, worktree, prompt, validation, diff, and approval state must all be inspectable.
- Worktree isolation by default.
- Cross-lane communication must be explicit and auditable (no hidden context sharing).

## Commands

```bash
npm install
npm run dev          # electron-vite dev (hot reload, opens the desktop app)
npm run build        # tsc --noEmit THEN electron-vite build — typecheck gates the build
npm test             # vitest run (all unit tests)
npm run test:watch   # vitest watch mode
npm run typecheck    # tsc --noEmit only
npm run lint         # eslint . --ext .ts,.tsx
npm run smoke:electron   # build + launch packaged-ish smoke (scripts/electron-smoke.cjs)
npm run dist         # build + electron-builder (dmg on mac, nsis on win)
node scripts/harness-loop.mjs --print   # print the harness loop and its file map
```

Run a single test file or test by name (no vitest config file exists — vitest uses defaults):

```bash
npx vitest run tests/unit/actionGateService.test.ts
npx vitest run -t "approveGate"
```

Tests are pure-TS unit tests over domain logic and display mappers (no Electron runtime), so they run fast and in isolation.

## Architecture

Three-process Electron app bundled by **electron-vite**. `electron.vite.config.ts` declares three independent build targets — `main`, `preload`, `renderer` (React 19) — each with its own entry point.

### The IPC contract chain (read this before touching cross-process code)

Renderer never imports Node/Electron directly. Every renderer→main call flows through one typed chain — keep all four layers in sync when adding a capability:

1. `src/main/ipc.ts` — `ipcMain.handle('channel:name', ...)` wires a channel to a service. This file also **owns all in-memory state** (`projects` Map) and instantiates every service as a singleton.
2. `src/preload/index.ts` — exposes `window.devCrew.<method>` via `contextBridge` (the only bridge; `contextIsolation: true`, `nodeIntegration: false`). Its inferred type is exported as `DevCrewApi`.
3. `src/renderer/lib/ipcClient.ts` — `devCrewApi` wrapper the React components call.
4. `src/shared/types.ts` — the **single source of truth** for all domain types. The renderer reaches it through a re-export barrel at `src/renderer/src/shared/types.ts` (`export type * from '../../../shared/types'`) because Vite roots the renderer at `src/renderer`. Main/preload import `../shared/types` directly. `src/shared/schemas.ts` holds Zod schemas that mirror these types and **must be updated by hand** when the types change.

### Domain model: lanes

A **lane** is the core unit of work — an isolated agent session. Lifecycle lives in `src/main/services/laneService.ts`:

- `createLane` → creates a git worktree at `<repoParent>/dev-crew-worktrees/<slug>` (a sibling of the repo, **outside** the project root), creates branch `<type>/<slug>`, and writes scoped `DEV_CREW_LANE.md` instructions into the worktree (`instructionService.ts`, seeded with project "vision" detected by `visionService.ts`).
- `startLane` → asks the provider to build a shell command and spawns it via `CommandRunner`; stdout/stderr are piped into the message bus as `agent` messages.
- `stopLane` / `cleanupLane` → kill the process / remove the worktree.
- `createPrForLane` → `git push -u origin <branch>` then `gh pr create`.

### Provider adapters

Providers are presets over **local CLIs**, not SDKs (`src/main/providers/`). Each implements `AgentProvider` (`providerTypes.ts`): `detect()`, `buildStartCommand()`, optional `buildOneShotCommand()`. `ProviderService` registers Custom-Command, Claude Code (`claude`), Copilot (`gh copilot`), and Ollama. Add a provider by implementing the interface and registering it in `providerService.ts`.

### Action gates

`src/main/services/actionGateService.ts` is a pure-function state machine for a 4-stage human/agent approval gate: `pm_spec → dev → qa → pm_final`, enforced **sequentially** (you cannot approve a gate before its predecessors). Only after `pm_final` does `canPushToGitHub` return true. This encodes the "visible autonomy / no silent push" principle in code.

### Git & GitHub

All git and GitHub operations **shell out to the `git` and `gh` CLIs** (`gitService.ts`, `ghService.ts`) — there is no libgit2 or Octokit. `parseGitHubRemote` normalizes ssh/https remotes. `platformCommands.ts` builds OS-specific commands (open URL, `gh auth login`) for win32/darwin/linux.

### Key gotchas

- **State is in-memory only.** Projects, lanes, and messages live in `Map`s inside `ipc.ts` / the services — nothing persists across app restarts. There is no DB yet.
- **The renderer ships demo data.** `src/renderer/src/App.tsx` hardcodes `demoProviders`/`demoLanes`/`demoProject`. The UI is partly wired to live IPC and partly to demo state — don't assume a rendered lane reflects real backend state.
- **`CommandRunner` spawns with `shell: true`** and merges `process.env`. Treat any command string as shell-interpreted. `normalizeCwd` silently falls back to `process.cwd()` if the target path doesn't exist — a wrong `cwd` won't throw, it'll run in the wrong place.

## Harness workflow

This repo dogfoods a cross-tool harness. `AGENTS.md` is the shared entry point for every AI tool; `CLAUDE.md` (this file) is Claude-specific; `.github/copilot-instructions.md` is Copilot's. Reusable workflows live in `.claude/skills/` (grill-me, grill-docs, plan, implement, validate, review, flowart), `.claude/agents/rubber-duck.md`, and `.github/prompts/`. For harness demos start at `docs/harness/README.md`.

Default loop (also printed by `node scripts/harness-loop.mjs --print`):

1. Grill me — pressure-test the request, surface missing acceptance criteria.
2. Grill docs — confirm specs are implementation-ready.
3. Plan — write a plan artifact in `plans/`.
4. Implement — work in a focused lane.
5. Validate — run deterministic checks (`npm test`, `npm run build`; add `typecheck`/`lint` when touching TS).
6. Review — rubber-duck / code-review critique.
7. Improve harness — when a failure repeats, fix the rule/doc/prompt/test/hook, not just the symptom. Ask "what did the harness fail to provide?", not just "which model failed?".

## Safety

- Never read or commit `.env` or credential files.
- Do not implement automatic merge, force-push, or hidden cross-lane context sharing without explicit design review.
- Never run recursive deletes without explicit user approval.
- Surface uncertainty instead of claiming a task is complete.
