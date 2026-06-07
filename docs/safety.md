# Safety

Dev Crew AI exists to make parallel AI development safer, not more chaotic.

## Safety defaults

- Each lane uses a separate git worktree.
- No automatic merges.
- No automatic force pushes.
- No hidden cross-lane context sharing.
- Provider commands are visible and configurable.
- Cleanup requires user intent.

## Dangerous actions

These should require confirmation before execution:

- `git push --force`
- `gh pr merge`
- `git worktree remove`
- recursive deletion
- commands touching `.env` or credential files
- package install commands that modify shared lockfiles across lanes

## Conflict detection

Future versions should detect overlapping changed files:

```bash
git diff --name-only
```

If two lanes edit the same file, Dev Crew AI should post a system message to the shared message bus.

## Local-first promise

Source code and transcripts stay on the user's machine unless a provider command sends context externally. Provider choice is explicit.
