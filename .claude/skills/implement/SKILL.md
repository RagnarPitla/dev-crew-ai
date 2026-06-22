---
name: implement
description: Implement from a plan file with focused edits and validation.
disable-model-invocation: true
---

# /implement

Read the plan file passed by the user. Execute the plan in order.

Rules:

1. Read target files before editing.
2. Keep changes small and reviewable.
3. Preserve local-first, provider-flexible, visible-autonomy principles.
4. Run validation before completion.
5. Write `reports/<feature-slug>-implementation-report.md`.

The report should include tasks completed, files changed, validation results, and any deviations from the plan.

