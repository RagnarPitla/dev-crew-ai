# Dev Crew AI MVP

## MVP promise

A developer can open any local project, make it safe for agent work, create a lane, run an agent command, and review changes.

## MVP flow

```text
Open folder
→ scan project
→ initialize local Git if needed
→ create manual lane
→ create worktree/branch
→ write lane instructions
→ start custom command provider
→ stream output
→ show diff
```

## MVP features

- Project scan.
- GitHub/local Git/plain folder modes.
- Initialize local Git.
- Optional baseline commit.
- Manual lane creation.
- Worktree creation.
- Lane instruction file.
- Custom command provider.
- Terminal output.
- Diff preview.

## Not in MVP

- Accounts.
- Cloud sync.
- Team dashboards.
- Paid features.
- Automatic merge.
- Complex planner.
- Hosted inference.

## Success criteria

A first-time user can try Dev Crew AI on a plain local folder without publishing code and understand what commands are being run.
