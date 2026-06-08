# Multi-Terminal Agent Workspace UX

Dev Crew AI should feel like a visual tmux/worktree command center, but friendlier for product users.

## User goal

The user wants multiple AI agents opened in their own terminal boxes, similar to a 2x2 terminal pane layout. The left side of the app should let the user select projects. The main area should show multiple terminal panes, each representing an agent lane.

## Core layout

```text
┌──────────────────────┬──────────────────────────────────────────────┐
│ Project Sidebar      │ Workspace: Terminal Pane Grid                │
│                      │                                              │
│ Projects             │ ┌──────────────────┬──────────────────┐     │
│ - Project A          │ │ Agent Lane 1     │ Agent Lane 2     │     │
│ - Project B          │ │ Feature work     │ Bugfix work      │     │
│ - Project C          │ │ Terminal output  │ Terminal output  │     │
│                      │ ├──────────────────┼──────────────────┤     │
│ Issues/PRs           │ │ Agent Lane 3     │ Agent Lane 4     │     │
│ Providers            │ │ PR review        │ Docs/release     │     │
│ Local/GitHub status  │ │ Terminal output  │ Terminal output  │     │
│                      │ └──────────────────┴──────────────────┘     │
└──────────────────────┴──────────────────────────────────────────────┘
```

## Left sidebar

The left sidebar is the project selector and mission control.

It should show:

- all added projects;
- project mode: GitHub, local Git, plain folder;
- GitHub connection status;
- active lane count;
- issues and PRs when available;
- quick buttons:
  - Add project;
  - Create manual lane;
  - Create lane from issue;
  - Connect GitHub;
  - Initialize Git.

## Main workspace

The main workspace should support multiple views:

### 1. Terminal Grid View

Default view for running agents.

Each pane is a live terminal box:

- title: lane name;
- subtitle: project / branch / provider;
- terminal output;
- status badge;
- controls: start, pause, stop, focus, split, close;
- conflict warning badge if another lane touches same files.

Layouts:

- 1 pane: full screen;
- 2 panes: vertical split;
- 3 panes: large left + two right or grid;
- 4 panes: 2x2 grid;
- more than 4: tabs/workspaces.

### 2. Lane Board View

Kanban-like overview of all lanes.

Columns:

- Ready;
- Running;
- Blocked;
- Review needed;
- PR opened;
- Done.

### 3. Diff/Review View

Focused review mode for a selected lane:

- file list;
- diff;
- test output;
- PR body draft;
- create PR button.

### 4. Message Bus View

Shared communication layer:

- broadcast to all lanes;
- send message to one lane;
- forward message into terminal;
- show system warnings like file conflicts.

## Terminal pane behaviors

Each terminal pane should map to one `Lane`.

A pane has:

```ts
interface TerminalPane {
  id: string;
  laneId: string;
  projectId: string;
  title: string;
  cwd: string;
  providerId: string;
  processId?: string;
  layout: { row: number; col: number; rowSpan: number; colSpan: number };
  focused: boolean;
}
```

## Agent lane lifecycle in pane UX

```text
Create Lane
→ Create worktree/branch if Git enabled
→ Write DEV_CREW_LANE.md
→ Open terminal pane
→ Start provider command
→ Stream output into pane
→ User can type into pane
→ User reviews diff
→ User creates PR or commits locally
```

## Product copy

Use language like:

> Each pane is one agent lane. Run a feature, a bugfix, a review, and docs in parallel — each isolated in its own terminal, branch, and worktree.

## Safety expectations

- A pane must show which project and branch it controls.
- A pane must show if it is local-only or GitHub-connected.
- A pane must show when an agent touches files also touched by another lane.
- Closing a pane should not silently delete work.
- Stopping a pane should stop the process, not remove the worktree.

## Implementation direction

Use an embedded terminal library such as `@xterm/xterm` for real terminal panes.

Suggested components:

- `ProjectSidebar`
- `WorkspaceLayout`
- `TerminalGrid`
- `TerminalPane`
- `PaneToolbar`
- `LaneBoard`
- `MessageBus`

Suggested services:

- `processService` for live processes;
- `terminalSessionService` for pane state;
- `layoutService` for grid layout;
- `conflictService` for file overlap warnings.

## MVP for this UX

First implementation should support:

- project selector on left;
- 2x2 demo terminal grid;
- each terminal pane bound to a lane;
- start/stop controls;
- visible provider/project/branch metadata;
- manual pane focus;
- message bus below or side panel.

Live terminal input can come after the visual grid works.
