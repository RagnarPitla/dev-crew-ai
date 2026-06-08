# OBO — On Your Behalf

OBO means **On Your Behalf**.

It is the Dev Crew AI feature direction for letting agents browse, click, test, and verify work for the user with explicit consent, visible evidence, and Action Gates.

## Short positioning

```text
Autopilot with consent.
```

Longer:

```text
Dev Crew AI can operate browsers and test environments on your behalf, while showing exactly what it did and requiring approval before risky actions.
```

## Why OBO matters

Modern coding agents need more than text output. They need:

- eyes: screenshots, DOM, browser state;
- hands: click, type, navigate;
- clean rooms: isolated test environments;
- memory: transcripts and evidence;
- gates: PM/QA approval before shipping.

OBO packages this as a product capability.

## Initial scope

OBO is a roadmap feature, not a finished production feature yet.

Initial product direction:

- ship Playwright as a dev dependency for OBO-capable lanes;
- provide explicit browser install scripts instead of silently downloading browsers;
- provide browser automation helpers for test lanes;
- capture screenshots and traces as evidence;
- attach evidence to Action Gates;
- require user approval before external side effects.

## Safety principles

OBO must be:

- visible: user can see what happened;
- auditable: screenshots/traces/logs are saved;
- consent-based: risky actions require approval;
- scoped: browser actions are tied to a lane/action item;
- local-first where possible.

## Future command examples

Install OBO browser runtimes explicitly:

```bash
npm run obo:install-browsers
```

Linux environments that need system dependencies can use:

```bash
npm run obo:install-deps
```

Future OBO commands:

```bash
dev-crew obo test http://localhost:3000
dev-crew obo screenshot http://localhost:3000/pricing
dev-crew obo inspect --lane lane-123
```

## Relationship to Action Gates

OBO evidence should feed QA and PM Final gates:

```text
OBO browser trace → QA evidence → PM Final decision → push allowed
```

## Relationship to Autopilot

Autopilot is the mode. OBO is the capability.

```text
Autopilot with OBO = Dev Crew AI acts on your behalf, but stays visible, gated, and reviewable.
```
