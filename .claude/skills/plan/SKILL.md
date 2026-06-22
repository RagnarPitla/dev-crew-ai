---
name: plan
description: Create a context-rich implementation plan in plans/<feature-slug>-plan.md.
disable-model-invocation: true
---

# /plan

Read `AGENTS.md`, `README.md`, and the relevant docs before planning. Do not write code in this phase.

Create `plans/<feature-slug>-plan.md` with:

1. Goal.
2. Acceptance criteria.
3. Files to read.
4. Files likely to change.
5. Ordered tasks.
6. Risks and safety boundaries.
7. Validation commands.

Use this validation gate unless a narrower gate is justified:

```bash
npm test
npm run build
```

