---
name: flowart
description: "Generates Lovart.ai prompts in Ragnar Pitla's signature flow-diagram style , cream background, tan monospace, horizontal card spine, bottom data table, 'by Ragnar Pitla' signature in royal blue. Use when user says 'flowart', 'flow diagram for X', 'flow design', 'build a flow map', 'diagram this in flowart style', 'Ragnar-style diagram', or pastes a concept and asks for a one-visual explanation. Produces copy-paste-ready Lovart prompts that follow the 'From Task to Objective' / 'Agent = Model + Harness' template exactly."
user-invokable: true
argument-hint: "[concept to diagram, e.g. 'harness engineering anatomy' or 'PO approval journey']"
metadata:
  author: Ragnar Pitla
  version: "1.0"
  category: content
---

# Flowart , Ragnar's Signature Flow Diagram Generator

## What This Skill Does

Turns any concept (progression, anatomy, framework, journey) into a ready-to-paste Lovart.ai prompt that produces Ragnar's recognizable flow-diagram style: cream canvas, tan monospace cards in a horizontal spine, bottom data table, bookend callouts, and a royal-blue "by Ragnar Pitla" signature in the bottom-right.

**Input:** a concept + optional stage/layer labels.
**Output:** one Markdown code block containing the full Lovart prompt.

## Triggers

- "flowart {X}" or `/flowart {X}`
- "flow diagram for {X}"
- "flow design for {X}"
- "build a flow map of {X}"
- "diagram this in flowart style"
- "Ragnar-style diagram of {X}"
- "turn this into a one-visual explainer"

## Non-Negotiables (Hard Rules)

1. **Signature block is mandatory.** Every prompt ends with "by Ragnar Pitla" in deep royal blue (#2563EB), ~18pt bold monospace, subtle blue underline, bottom-right of canvas. Never omit, never recolor.
2. **No em dashes (,) anywhere in the prompt.** Use commas, colons, periods, or rewrite. This is a hard Ragnar writing rule.
3. **Palette is locked:** cream #FAF7F2 background, tan #B8845C accent, dark gray body text, royal blue #2563EB for the signature only.
4. **Monospace throughout.** No serif, no handwritten, no decorative fonts.
5. **Style aesthetic is locked:** flat vector, soft rounded corners, no gradients, no 3D, no sketch/hand-drawn, documentation-illustration style.

## Workflow

### Step 1: Parse the concept into 3-5 cards

Ask yourself: does this concept naturally decompose into a horizontal progression or anatomy? If yes, identify 3-5 cards.

| Concept Type | Cards Represent | Axis reads as |
|---|---|---|
| **Progression** (today to future) | Stages over time | timeline |
| **Anatomy** (components of one thing) | Layers/parts | transformation |
| **Journey** (user path) | Steps | process flow |
| **Framework** (dimensions of a concept) | Pillars | comparison |

If the concept does NOT decompose into 3-5 cards, ask the user one clarifying question before generating.

### Step 2: Decide the treatment

- **Top-left label:** pick one based on type: `THE MAP` (progression), `THE ANATOMY` (layers), `THE JOURNEY` (user flow), `THE STACK` (architecture), `THE FRAMEWORK` (pillars).
- **Muted card?** If one card is "horizon/future" OR "commodity/deprecated", render it dashed + muted gray. Otherwise all cards are solid equal weight.
- **Bracket over cards?** If a subset of cards forms a named group (e.g., "THE HARNESS" spanning 3 of 4 cards), add a thin tan bracket above them with a centered monospace label.
- **Table columns:** pick 2-3 columns that create tension. Good defaults: `YOU OWN | AI OWNS | STUCK SIGNAL` for progressions, `WHAT IT DOES | STUCK SIGNAL (MISSING IT)` for anatomies.

### Step 3: Write the bookend callouts

Two callouts outside the table:
- **LEFT BOOKEND:** "TODAY: {one-line state of the world}" pointing to leftmost card
- **RIGHT BOOKEND:** "TOMORROW: {one-line destination}" pointing to the destination card

These are the most persuasive elements. Make them sharp.

### Step 4: Write the bottom-left tagline

One uppercase monospace tan sentence that summarizes the thesis. Format: `CLAIM, CONTRAST, PUNCHLINE`. No em dashes. Use commas or rewrite.

Examples:
- `WE ARE ALL IN STAGE 1 TODAY, AGENTIC OS IS THE BRIDGE, STAGE 4 IS THE HORIZON`
- `90% OF PRODUCTION VALUE LIVES IN THE HARNESS, NOT THE MODEL`

### Step 5: Generate the prompt

Use the template in [references/template.md](references/template.md). Fill every slot. Output as a single fenced Markdown code block so the user can copy-paste into Lovart. Start the prompt with the `[@image:shape-...]` line using a placeholder the user can swap with their own style-reference image.

### Step 6: Deliver

Output exactly:
1. The prompt block (fenced, copy-paste ready)
2. A 2-3 bullet "design choices" note below explaining why you picked the label, muted card, and bracket (if any). Keep under 60 words total.

Do not output anything else.

## Output Format

````markdown
```
[@image:shape-REPLACE_WITH_YOUR_STYLE_REF] Clean minimal technical diagram, flat vector illustration, cream off-white
background (#FAF7F2), monospace fonts throughout, tan/brown accent (#B8845C),
soft rounded corners, documentation-illustration style.

{...full template filled in...}

BOTTOM-RIGHT of canvas: bold monospace signature "by Ragnar Pitla" in deep
royal blue (#2563EB), ~18pt, with a subtle blue underline accent. Positioned
in the bottom-right corner of the canvas panel with clean spacing from the edge.

Soft drop shadows on all cards. Generous whitespace. No orange, no gradients,
no 3D, no hand-drawn sketch. Minimal. Documentation-illustration style.
```

**Design choices:**
- {why this label}
- {why this muted card / bracket}
- {why this tagline framing}
````

## References

- [references/visual-dna.md](references/visual-dna.md) , exact palette, typography, card anatomy, iconography rules
- [references/template.md](references/template.md) , the fill-in-the-blank prompt template
- [references/examples.md](references/examples.md) , two worked examples ("From Task to Objective", "Agent = Model + Harness") with the full prompt text for each

## Common Issues

| Issue | Cause | Fix |
|---|---|---|
| Lovart renders em dashes | You left one in a caption or tagline | Grep the prompt, replace every `,` with comma or rewrite |
| Signature missing or wrong color | Slot left empty in template | Use the literal signature block from [references/template.md](references/template.md) , do not paraphrase |
| Cards feel unbalanced | 2 cards or 6+ cards | Enforce 3-5 cards; ask user to merge or split |
| Style drifts to colorful/3D | User ref-image is 3D | Remind user to swap `[@image:shape-...]` with a flat vector reference, not a 3D one |
| Bracket label fights with card titles | Bracket is too wide or too verbose | Keep bracket label ≤2 words, span only a meaningful subset |

## Related Skills

- `lovart` , general Lovart prompt generator; use when concept does NOT need the signature flow-diagram structure
- `tech-architecture-diagrams` , use for system architecture, data flows, MCP integrations (different aesthetic: blue-palette Figma-style)
- `3d-lovart` , 3D clay corporate illustrations (opposite aesthetic)
- `in-our-ai-era-visuals` , "In Our AI Era" podcast brand visuals (editorial, different DNA)
