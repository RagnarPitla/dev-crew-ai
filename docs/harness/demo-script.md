# Demo Script: Dev Crew AI as a Harness Example

Use this section in the YouTube video after explaining feedforward and feedback.

## Setup line

"I do not want harness engineering to stay abstract, so I added a small harness example to my Dev Crew AI repo."

## Walkthrough

1. Open `AGENTS.md`.
   - "This is the shared rulebook. It is not a giant style guide. It is the pilot checklist."
2. Open `.github/copilot-instructions.md`.
   - "GitHub Copilot users get the same operating model."
3. Open `.github/prompts/`.
   - "These are reusable prompts: grill me, grill docs, rubber duck, and harness retro."
4. Open `.claude/skills/`.
   - "Claude users get the same workflow as skills."
5. Open `docs/harness/harness-map.md`.
   - "This maps guides and sensors so the team can reason about the harness as a system."
6. Run:

```bash
node scripts/harness-loop.mjs --print
```

Close with:

"The point is not that this repo is magic. The point is that every team needs a place to put learning. When the agent fails, do not just retry. Improve the harness."

