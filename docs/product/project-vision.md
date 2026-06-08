# Project Vision

Project Vision is Dev Crew AI's implementation of the idea that every agent needs a constitution before it starts work.

## Why it matters

AI coding agents reset context often. Without a stable project north star, every lane has to rediscover:

- what the product is;
- what the project should refuse;
- what quality bar matters;
- what invariants should not change;
- what customer outcome the work serves.

Project Vision gives every lane a shared foundation.

## Detection priority

Dev Crew AI detects the first available file in this order:

```text
VISION.md
AGENTS.md
CLAUDE.md
DEV_CREW.md
README.md
```

If none exists, the lane instructions include a note recommending one.

## How lanes use it

When Dev Crew AI creates a lane, the generated `DEV_CREW_LANE.md` includes:

- project name;
- worktree and branch;
- lane mission;
- detected Project Vision source;
- Project Vision content;
- safety rules;
- done criteria.

## Recommended `VISION.md` shape

```markdown
# Vision

## What we are building

[One paragraph]

## Who it is for

[Primary users]

## What we should do

- [principle]
- [principle]

## What we should refuse

- [non-goal]
- [non-goal]

## Invariants

- [thing that should stay true]
- [thing that should stay true]
```

## Product principle

Project Vision turns Dev Crew AI from a tool that runs agents into a tool that helps agents understand the system they are improving.
