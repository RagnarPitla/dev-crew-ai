# Grill Loop

The grill loop is a lightweight way to reduce bad agent starts.

## 1. Grill me

Use when the request is broad, ambiguous, risky, or likely to hide assumptions.

Goal:

- restate the request clearly;
- identify missing acceptance criteria;
- expose hidden assumptions;
- identify safety and privacy risks;
- set a realistic implementation boundary.

Files:

- `.github/prompts/grill-me.prompt.md`
- `.claude/skills/grill-me/SKILL.md`

## 2. Grill docs

Use when a doc, spec, issue, or plan needs to be implementation-ready.

Goal:

- check whether another engineer or agent could implement from the doc;
- identify unclear terms;
- add missing examples;
- clarify validation and safety boundaries.

Files:

- `.github/prompts/grill-docs.prompt.md`
- `.claude/skills/grill-docs/SKILL.md`

## 3. Plan, implement, validate, review

After the grill steps, use the normal loop:

```text
Plan -> Implement -> Validate -> Review
```

Files:

- `.claude/skills/plan/SKILL.md`
- `.claude/skills/implement/SKILL.md`
- `.claude/skills/validate/SKILL.md`
- `.claude/skills/review/SKILL.md`

## 4. Improve harness

After a failure, run the harness retro.

Ask:

- Was context missing?
- Was a deterministic check missing?
- Was a hook missing?
- Was the work too large for one lane?
- Was the review standard unclear?
- Was the doc not implementation-ready?

File:

- `.github/prompts/harness-retro.prompt.md`

