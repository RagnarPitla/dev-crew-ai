# Harness Map

This map shows how Dev Crew AI demonstrates a team harness.

## Layers

| Layer | Example | Who owns it |
|-------|---------|-------------|
| Model | GPT, Claude, local models | Model provider |
| Vendor harness | Claude Code, GitHub Copilot CLI, Codex, Cursor | Tool provider |
| Team harness | Rules, prompts, docs, checks, lanes, review loops | Your team |

## Guides

Guides steer the agent before action.

| Guide | File |
|-------|------|
| Shared rules | `AGENTS.md` |
| Claude guidance | `CLAUDE.md` |
| Copilot guidance | `.github/copilot-instructions.md` |
| Product context | `README.md`, `docs/product/` |
| Safety model | `docs/safety.md` |
| Provider model | `docs/provider-adapters.md` |
| Planning workflow | `.claude/skills/plan/SKILL.md` |

## Sensors

Sensors observe after action.

| Sensor | File or command |
|--------|-----------------|
| Unit tests | `npm test` |
| Type check | `npm run typecheck` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Rubber duck review | `.claude/agents/rubber-duck.md`, `.github/prompts/rubber-duck.prompt.md` |
| Harness retro | `.github/prompts/harness-retro.prompt.md` |

## Why this matters

The team harness externalizes tacit knowledge:

- what the product is;
- what safety means;
- which actions are blocked;
- how work should be split;
- when a human approval is required;
- which checks define "done."

That is why a team still needs a harness even when the tool is already a harness.

