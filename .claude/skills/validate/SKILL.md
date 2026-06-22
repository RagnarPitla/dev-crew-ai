---
name: validate
description: Run the Dev Crew AI validation gate and report PASS or FAIL.
disable-model-invocation: true
---

# /validate

Run:

```bash
npm test
npm run build
```

When TypeScript or lint-sensitive files changed, also run:

```bash
npm run typecheck
npm run lint
```

Report PASS or FAIL for each command. If a command fails, include the first actionable error and fix before claiming completion.

