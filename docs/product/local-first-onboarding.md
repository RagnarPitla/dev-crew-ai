# Dev Crew AI Local-First Onboarding UX

Dev Crew AI should work even when the user's project is not on GitHub and not using Git yet.

## Project modes

### GitHub repo

- `.git` exists.
- Remote points to GitHub.
- GitHub CLI can load issues/PRs.

Primary CTA: **Create lane from issue**

### Local Git repo

- `.git` exists.
- No GitHub remote, or remote is not GitHub.

Primary CTA: **Create manual lane**

Secondary CTA: **Connect GitHub later**

### Plain folder

- `.git` does not exist.

Primary CTA: **Initialize local Git**

Secondary CTA: **Explore read-only**

## First-run empty state

Headline:

> Bring your project. Spin up your dev crew.

Body:

> Start with a GitHub repo, a local Git repo, or a plain folder. Dev Crew AI works locally first and can initialize Git so agent changes are reversible.

CTA:

- Add project
- Open sample
- Read how it works

## Add Project wizard

### Step 1: Select source

Options:

- Open a folder
- Open an existing Git repo
- Clone GitHub repo later

### Step 2: Project scan

Show:

- path;
- Git status;
- GitHub status;
- dirty files;
- detected stack;
- recommended action.

### Step 3: Safety setup

If no Git:

> This folder is not using Git yet. Dev Crew AI can initialize local Git so every agent change is trackable and reversible. You do not need to publish this project to GitHub.

Buttons:

- Initialize local Git
- Explore read-only

### Step 4: Lane strategy

Options:

- Manual lane
- GitHub issue lane, if connected
- Explore project first

## Command preview

Before initializing Git, show:

```bash
git init
git add .
git commit -m "chore: baseline before Dev Crew AI lanes"
```

If Git identity is missing, show a clear prompt for local repo identity.
