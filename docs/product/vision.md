# Dev Crew AI Product Vision

Dev Crew AI is a local-first Parallel Development Studio for AI coding agents.

## The problem

AI coding tools are powerful, but most developer workflows still run one agent session at a time. Developers lose context switching branches, struggle to coordinate multiple tasks, and cannot easily see what each agent is doing across features, bugfixes, docs, and PR reviews.

## The product

Dev Crew AI turns work into visible **lanes**. Each lane is an isolated development workspace with:

- a project;
- a Git branch;
- a Git worktree when available;
- scoped lane instructions;
- an agent/provider command;
- terminal output;
- diffs;
- status;
- explicit cross-lane messages.

## Local-first promise

Users should be able to start with:

1. a GitHub repo;
2. a local Git repo;
3. a plain folder that is not using Git yet.

GitHub should be an upgrade path, not a requirement.

## North star

A user can open any project folder, make it safe for AI-assisted changes, spin up several lanes, review the work, and ship with confidence.

## Product line

- **Open-source core:** local app, lane model, Git/worktree orchestration, provider adapters, message bus, local safety.
- **Future paid/team layer:** team policies, audit logs, shared dashboards, org-level controls, remote metadata sync, enterprise provider policies.
