# Contributing to Dev Crew AI

Thanks for helping improve Dev Crew AI.

## Before you start

- Read the project direction in [/README.md](/README.md) and [/docs/roadmap.md](/docs/roadmap.md).
- Check for existing issues and discussions before opening a new one.
- Keep changes focused and small when possible.

## Local setup

```bash
git clone https://github.com/RagnarPitla/dev-crew-ai.git
cd dev-crew-ai
npm install
```

Run the app locally:

```bash
npm run dev
```

## Development checklist

Before opening a pull request:

```bash
npm run test
npm run build
npm run lint
```

If lint fails due local ESLint config mismatch, include the output in your PR notes and still run tests + build.

## Pull request guidelines

- Use clear titles and descriptions.
- Explain what changed and why.
- Link related issues (for example: `Closes #123`).
- Include screenshots or terminal output when UI or workflow behavior changes.
- Keep PRs reviewable; avoid bundling unrelated changes.

## Commit style

- Write short, descriptive commit messages.
- Prefer multiple focused commits over one large commit.

## Code and docs expectations

- Follow existing TypeScript and React patterns in the repository.
- Update docs when behavior or workflows change.
- Avoid introducing breaking behavior without discussion in an issue first.

## Need help?

If you are unsure about approach or scope, open an issue first so maintainers and community can align before implementation.
