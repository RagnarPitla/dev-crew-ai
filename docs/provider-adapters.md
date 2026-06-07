# Provider Adapters

Dev Crew AI treats providers as local command adapters.

## Custom command

The most important provider. It allows users to bring any local agent.

Examples:

```bash
claude
codex
opencode
aider
ollama run qwen2.5-coder:7b
hermes chat -q "..."
```

## Claude Code

Interactive command:

```bash
claude
```

One-shot command:

```bash
claude -p "Read DEV_CREW_LANE.md and implement the task" --max-turns 10
```

## GitHub Copilot

Copilot command surfaces differ across installations and accounts. Dev Crew AI starts with a configurable command adapter rather than assuming one stable CLI.

Potential commands:

```bash
gh copilot suggest
copilot
```

## Ollama

Ollama is useful for local summarization, planning, issue triage, and diff explanation.

```bash
ollama run qwen2.5-coder:7b
```

## Adapter rule

Every adapter must produce:

- command;
- args;
- cwd;
- environment;
- capability flags.
