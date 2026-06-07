# GitHub Workflow

Dev Crew AI uses the GitHub CLI instead of reimplementing GitHub.

## Auth

Users should authenticate once:

```bash
gh auth login
gh auth status
```

## Lane from issue

```bash
gh issue list --state open --json number,title,body,labels,url
git fetch origin
git worktree add ../dev-crew-worktrees/<lane> -b feature/<lane> origin/main
```

Dev Crew AI then writes `DEV_CREW_LANE.md` into the worktree and starts the selected provider command.

## PR from lane

```bash
git push -u origin <branch>
gh pr create --title "..." --body "Closes #123"
```

## Cleanup

```bash
git worktree remove <path>
git fetch --prune
```

## Principles

- GitHub is the source of truth for issues, PRs, CI, and review.
- The local app is the orchestration and visibility layer.
- The user approves PR creation and cleanup.
