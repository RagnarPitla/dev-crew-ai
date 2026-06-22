# Dev Crew AI Harness Example

This repo is also a public example of a lightweight team harness for AI coding agents.

## Why this exists

Claude Code, GitHub Copilot CLI, Codex, Cursor, OpenCode, Aider, and similar tools are already harnesses around models. Dev Crew AI adds another layer: the team harness.

The vendor harness gives the model general capability. The team harness gives it local reliability.

## Definition

A team harness is the system of guides and sensors that wraps an agent so it can work inside a specific codebase, team, and process.

Guides steer before the agent acts. Sensors observe after the agent acts and help it self-correct.

## What this repo includes

| Surface | Purpose |
|---------|---------|
| `AGENTS.md` | Shared cross-tool harness rules. |
| `CLAUDE.md` | Claude-specific project guidance. |
| `.github/copilot-instructions.md` | GitHub Copilot project instructions. |
| `.github/prompts/` | Reusable Copilot prompts for grill, review, and retro workflows. |
| `.claude/skills/` | Claude skills for grill, plan, implement, validate, and review. |
| `.claude/agents/rubber-duck.md` | A high-signal reviewer agent definition. |
| `scripts/harness-loop.mjs` | Local script that prints and optionally runs the harness loop. |
| `docs/harness/build-your-own-harness-template.md` | Copyable template for creating a user or team harness. |
| `docs/harness/flowart-skill.md` | Flowart skill overview for Claude and GitHub Copilot users. |
| `plans/` | Plan handoff artifacts. |
| `reports/` | Implementation and review artifacts. |

## Starter loop

```text
Grill me -> Grill docs -> Plan -> Implement -> Validate -> Review -> Improve harness
```

This is intentionally simple. The goal is not to build a giant framework. The goal is to give the team a repeatable place to capture learning.

## Demo command

```bash
node scripts/harness-loop.mjs --print
```

This prints the loop and maps each step to the files in this repo.

## Template

Copy [Build Your Own Harness Template](build-your-own-harness-template.md) when you want to create a harness for another repo, team, or personal workflow.

## Mental model

Do not ask only, "Which model failed?"

Ask, "What did our harness fail to provide?"
