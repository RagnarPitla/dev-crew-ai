# Build Your Own Harness Template

Use this template for a solo user harness or a team harness.

## 1. Name the bounded context

```text
Harness owner:
Repo or workspace:
Agent tools used:
Primary risks:
Definition of done:
```

## 2. Define the guide layer

Guides steer the agent before it acts.

| Guide | File or tool | Owner | When loaded |
|-------|--------------|-------|-------------|
| Shared agent rules | `AGENTS.md` | | Every session |
| Tool-specific rules | `CLAUDE.md`, `.github/copilot-instructions.md` | | Every session |
| Architecture notes | `docs/architecture.md` | | Architecture tasks |
| Testing guide | `docs/testing.md` | | Test changes |
| Domain glossary | `docs/glossary.md` | | Domain tasks |
| Prompt or skill | `.github/prompts/`, `.claude/skills/` | | On demand |

## 3. Define the sensor layer

Sensors observe after the agent acts.

| Sensor | Command or file | Fast or expensive | Where it runs |
|--------|-----------------|-------------------|---------------|
| Unit tests | | Fast | Before completion |
| Typecheck | | Fast | Before completion |
| Lint | | Fast | After edits or before completion |
| Security scan | | Medium | Before PR |
| Rubber duck review | | Medium | Before PR |
| Human review | | Expensive | Before merge |
| Pipeline checks | | Expensive | After integration |

## 4. Define the loop

```text
Grill me -> Grill docs -> Plan -> Implement -> Validate -> Review -> Improve harness
```

Use `plans/` for planning handoffs and `reports/` for validation and review handoffs.

## 5. Define failure-to-harness mapping

| Failure pattern | Harness improvement |
|-----------------|---------------------|
| Agent missed a convention | Add or tighten a rule. |
| Agent misunderstood the task | Improve grill-me prompt or acceptance criteria. |
| Agent trusted its own code | Add validation gate or stop checklist. |
| Agent repeated the same edit loop | Add loop detection or rubber-duck review. |
| Agent touched unsafe files | Add hook or safety rule. |
| Human review repeats same comment | Add review checklist, test, or prompt. |

## 6. Keep the harness small

Do not turn the harness into a dumping ground. Each rule should be traceable to:

- a real failure;
- a repeated review comment;
- a safety constraint;
- a documented architecture decision;
- a measurable quality gate.

## 7. Monthly harness retro

Review:

1. Which failures repeated?
2. Which sensors never fired?
3. Which guides are ignored?
4. Which checks are too slow?
5. Which rules are stale?
6. Which harness changes should become templates for other repos?

