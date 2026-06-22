# Dev Crew AI

You are working inside Dev Crew AI — Parallel Development Studio for AI coding agents.

## Product principles

- Local-first.
- GitHub-native.
- Provider-flexible.
- Visible autonomy.
- Worktree isolation by default.
- Cross-lane communication must be explicit and auditable.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm test`

## Harness workflow

Use `AGENTS.md` as the shared cross-tool harness. For harness demos, start with `docs/harness/README.md`, then show `.claude/skills/`, `.github/prompts/`, and `scripts/harness-loop.mjs`.

Default loop:

1. Grill me.
2. Grill docs.
3. Plan.
4. Implement.
5. Validate.
6. Review.
7. Improve harness.

## Safety

Do not implement automatic merge, force-push, or hidden context sharing without explicit design review.
