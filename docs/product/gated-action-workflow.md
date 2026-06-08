# Gated Action Workflow

Dev Crew AI uses **Action Gates** to make agent-assisted development safer before code is pushed to GitHub.

## Lifecycle

Every action item should move through:

```text
PM Spec → Dev → QA → PM Final → GitHub Push Allowed
```

## Why this exists

Running multiple AI coding agents can create speed, but speed without review creates risk.

Action Gates make every task explicit:

- what problem is being solved;
- what files are likely to change;
- what tests prove the work;
- what QA verified;
- who approved the final push.

## Gate responsibilities

### PM Spec

Defines:

- problem;
- outcome;
- acceptance criteria;
- non-goals;
- privacy/public scope;
- likely target files.

### Dev

Builds the approved spec:

- follows TDD where code changes are involved;
- keeps scope tight;
- records changed files;
- runs tests/build;
- does not push to GitHub.

### QA

Verifies the work:

- checks acceptance criteria;
- runs tests/build;
- checks privacy boundaries;
- checks that private local plans or secrets are not staged;
- requests changes when needed.

### PM Final

Approves or blocks shipping:

- compares final implementation to product intent;
- checks QA evidence;
- decides if public docs/marketing need updates;
- explicitly allows or blocks GitHub push.

## Push rule

Dev Crew AI product-controlled GitHub push actions must be blocked until final PM approval exists.

```text
Push blocked: PM Final approval is required before GitHub push.
```

## Scope

This workflow can block Dev Crew AI's own push helpers and recommendations. It cannot prevent a user from manually running `git push` outside the app.

## Private planning state

Private local operating state should not be committed:

```text
.hermes/private-plans/
.hermes/action-items/
.hermes/gates/
```

Public docs should describe the product workflow. Private role notes and internal plans should stay local unless intentionally converted into public documentation.
