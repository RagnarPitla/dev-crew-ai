# Dev Crew AI Agent Harness

Use this file as the shared harness entry point for AI coding agents.

## Product frame

Dev Crew AI is a local-first parallel development studio for AI coding agents. It lets users run multiple agent lanes safely across GitHub repos, local Git repos, and plain folders.

## Harness principles

- Treat every repeated agent failure as a harness signal.
- Prefer small, isolated lanes over one large mixed-context session.
- Keep work visible: branch, worktree, prompt, validation, diff, and approval state should be inspectable.
- Use deterministic checks for rules that can be made explicit.
- Use inferential review for judgment-heavy work, such as architecture fit, docs clarity, and overengineering.
- Do not auto-merge, force push, or hide cross-lane context sharing.

## Default loop

1. Grill me: pressure-test the request and uncover missing acceptance criteria.
2. Grill docs: verify docs or requirements are clear enough for implementation.
3. Plan: produce a plan artifact in `plans/`.
4. Implement: work from the plan in an isolated lane.
5. Validate: run deterministic checks.
6. Review: run rubber-duck or code-review critique.
7. Improve harness: update rules, docs, prompts, tests, or hooks when a failure repeats.

## Validation commands

Use the existing repo commands:

```bash
npm test
npm run build
```

Use `npm run typecheck` and `npm run lint` when the task touches TypeScript or lint-sensitive files.

## Safety rules

- Never read or commit `.env` or credential files.
- Never run recursive deletes without explicit user approval.
- Never force push or merge PRs automatically.
- Keep private planning state out of git unless the user explicitly asks to publish it.
- Surface uncertainty instead of pretending a task is complete.

