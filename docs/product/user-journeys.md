# Dev Crew AI User Journeys

## Journey 1: GitHub repo

```text
Open Dev Crew AI
→ Add Project
→ Select local GitHub repo
→ Dev Crew AI detects Git + GitHub remote
→ User sees issues and PRs
→ User creates lane from issue
→ Dev Crew AI creates worktree + branch
→ Dev Crew AI writes DEV_CREW_LANE.md
→ User starts agent provider
→ User reviews output and diff
→ User creates PR
```

## Journey 2: Local Git repo without GitHub

```text
Open Dev Crew AI
→ Add Project
→ Select local Git repo
→ Dev Crew AI detects Git but no GitHub remote
→ User creates manual lane
→ Dev Crew AI creates worktree + branch
→ User starts agent provider
→ User reviews diff
→ User commits locally
→ User optionally connects GitHub later
```

## Journey 3: Plain folder, no Git

```text
Open Dev Crew AI
→ Add Project
→ Select folder
→ Dev Crew AI detects no Git
→ App explains why local Git makes agent work reversible
→ User initializes local Git
→ User optionally creates .gitignore
→ User creates baseline commit
→ User creates manual lane
→ Agent works safely in isolated lane
```

## Journey 4: Explore first, read-only

```text
Open Dev Crew AI
→ Add folder
→ No Git detected
→ User chooses Explore first
→ Agent scans project without edits
→ Dev Crew AI recommends setup steps
→ User decides whether to initialize Git
```

## Journey 5: Connect GitHub later

```text
User starts local-only
→ Project becomes valuable
→ User clicks Connect GitHub
→ Dev Crew AI creates or adds remote
→ User pushes default branch
→ Issues/PRs become available
```
