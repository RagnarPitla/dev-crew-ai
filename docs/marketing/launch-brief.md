# Dev Crew AI Launch Brief

**Product:** Dev Crew AI  
**Company:** RBuild.ai  
**Creator:** Ragnar Pitla  
**Category:** Local-first developer tools / AI coding agent orchestration  
**Tagline:** Scout the work. Spin up lanes. Review diffs. Ship PRs.

## One-line pitch

Dev Crew AI is a local-first Parallel Development Studio that lets developers run multiple AI coding agents in isolated terminal lanes across GitHub repos, local Git repos, and plain folders.

## Problem

AI coding tools are powerful, but most developers still use them one terminal at a time:

- one agent session blocks the next task;
- parallel work creates branch and file conflicts;
- agents lose project/task context;
- local-only projects are excluded by GitHub-first workflows;
- users cannot clearly see which agent changed what.

## Solution

Dev Crew AI makes AI development visible and lane-based:

- a left project selector for GitHub repos, local Git repos, and plain folders;
- terminal panes for multiple agent sessions;
- one lane per task, branch, provider, and worktree when Git is available;
- visible diffs, status, provider, and message bus coordination;
- local Git initialization for plain folders before agent edits.

## Audience

Primary early users:

1. solo founders and indie hackers building multiple projects;
2. developers already using Claude Code, Copilot CLI, Codex, OpenCode, Aider, Ollama, or Hermes;
3. local-AI builders who want small-model and private workflows;
4. open-source maintainers juggling issues, reviews, docs, and releases;
5. Windows developers who want an actual desktop command center for AI work.

## Positioning

Dev Crew AI does not replace AI coding agents. It is the desktop command center around them.

Comparable mental models:

- visual tmux for AI agents;
- GitHub Desktop for parallel agent lanes;
- local-first command center for coding assistants;
- a safer way to run multiple AI coding sessions at once.

## Differentiators

- Local-first: GitHub is optional, not mandatory.
- Bring-your-own-agent: works toward Copilot, Claude Code, Codex, OpenCode, Aider, Ollama, Hermes, and custom commands.
- Worktree-first safety: isolate each lane when Git is available.
- Plain folder onboarding: initialize local Git so beginners and private projects are not excluded.
- Visible coordination: message bus and lane state instead of hidden cross-agent context.

## Current proof points

- Public Electron + React + TypeScript scaffold.
- Local-first project modes in the model.
- Project scan foundation for GitHub/local/plain folders.
- Initial Git safety foundation.
- Interactive terminal workspace mockup.
- Product docs, roadmap, safety docs, and provider adapter docs.
- Verified tests and production build.

## Near-term milestones

1. Build the interactive Add Project Wizard.
2. Implement the multi-terminal pane grid in React.
3. Wire panes to command/provider processes.
4. Add local Git initialization and baseline commit UX.
5. Add manual lane creation for local Git and plain folder projects.
6. Add first public demo video and screenshots.

## Launch message

Ragnar Pitla and RBuild.ai are building Dev Crew AI in public: an open-source local-first desktop app for running AI coding agents in parallel lanes. The goal is simple: make AI-assisted development safer, more visible, and faster without forcing every project into a cloud workflow first.
