# GitHub Copilot Instructions for Dev Crew AI

Dev Crew AI is a local-first parallel development studio for AI coding agents. Follow the shared harness in `AGENTS.md`.

## Work pattern

1. Read `AGENTS.md`, `README.md`, and the relevant docs before editing.
2. For unclear requests, run the "grill me" pattern before implementation.
3. For docs-heavy work, run the "grill docs" pattern before implementation.
4. Produce small, reviewable changes.
5. Run the relevant validation command before claiming completion.

## Safety

- Do not read or modify `.env` files.
- Do not add automatic merge, force push, or hidden context sharing.
- Do not remove user changes that are unrelated to the task.
- Prefer local-first behavior and visible provider commands.

## Project commands

```bash
npm test
npm run build
npm run typecheck
npm run lint
```

