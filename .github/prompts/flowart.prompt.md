---
mode: ask
description: Generate Ragnar-style Lovart prompts for clean flow diagrams.
---

# Flowart

Use this prompt when the user asks for `flowart`, a Ragnar-style diagram, a flow map, a one-visual explainer, or a Lovart prompt in Ragnar's signature flow-diagram style.

## Output

Return one fenced Markdown code block containing a copy-paste-ready Lovart prompt.

After the prompt block, add a short **Design choices** note with 2 to 3 bullets.

## Style rules

- Cream background: `#FAF7F2`.
- Tan accent: `#B8845C`.
- Dark gray body text.
- Royal blue signature only: `#2563EB`.
- Monospace typography throughout.
- Flat vector documentation style.
- Soft rounded corners.
- No gradients, no 3D, no sketch style.
- No em dashes.
- Mandatory bottom-right signature: `by Ragnar Pitla` in deep royal blue, bold monospace, subtle underline.

## Structure

Parse the concept into 3 to 5 cards:

- Progression: stages over time.
- Anatomy: layers or parts.
- Journey: user path.
- Framework: pillars or dimensions.

Use:

1. A top-left label: `THE MAP`, `THE ANATOMY`, `THE JOURNEY`, `THE STACK`, or `THE FRAMEWORK`.
2. A horizontal card spine.
3. Optional bracket over a meaningful subset of cards.
4. A bottom data table with 2 to 3 columns.
5. Left and right bookend callouts.
6. A bottom-left uppercase thesis tagline.
7. The mandatory signature.

If the concept cannot be decomposed into 3 to 5 cards, ask one clarifying question before generating.

