# Roadmap

## v0.1 — Local lane scaffold

- Electron app shell.
- Demo lane board.
- Project model.
- Lane model.
- Git service.
- GitHub CLI service.
- Provider adapter interface.
- Claude Code, Copilot, Ollama, and custom-command presets.
- Lane instruction generation.
- Message bus scaffold.

## v0.2 — Real lane execution

- Add Project Vision detection and include it in lane instructions.
- Add project from file picker.
- Persist projects and lanes in SQLite.
- Create lane from GitHub issue.
- Stream live process output into terminal pane.
- Stop/restart lane process.
- Add Action Gates for PM → Dev → QA → PM Final review before product-controlled GitHub push.

## v0.3 — PR workflow

- Show diffs.
- Commit helper.
- Push branch.
- Create PR.
- Watch CI.
- Cleanup worktree.

## v0.4 — Multi-session clarity

- Cross-lane message forwarding.
- OBO browser automation evidence for approved test lanes.
- File conflict detection.
- Lane dependency graph.
- Review lane handoff.

## v0.5 — Provider expansion

- OpenCode.
- Aider.
- Codex.
- Goose.
- Hermes/Ruby.

## v1.0

A reliable local Parallel Development Studio where developers can run multiple agent lanes across real GitHub work and ship PRs safely.
