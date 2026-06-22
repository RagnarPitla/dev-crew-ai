# Flowart Prompt Template

Fill every `{SLOT}`. Output as a single fenced code block. Do not remove the signature block, do not paraphrase it.

```
[@image:shape-{STYLE_REF_ID}:{STYLE_REF_NAME}:{STYLE_REF_URL}] Clean minimal technical diagram, flat vector illustration, cream off-white
background (#FAF7F2), monospace fonts throughout, tan/brown accent (#B8845C),
soft rounded corners, documentation-illustration style.

TOP-LEFT: small tan monospace label "{TOP_LEFT_LABEL}".
Below: large bold monospace headline "{HEADLINE}".
Below headline: two-line monospace subtitle in dark gray:
"{SUBTITLE_LINE_1}" / "{SUBTITLE_LINE_2}".

MAIN CANVAS (large soft-rounded off-white panel with thin tan border, generous whitespace):

UPPER REGION , horizontal journey spine flowing LEFT to RIGHT. A single thin
tan arrow runs the full width underneath {N} milestone cards. {N} tick
marks on the arrow align with each card.
{OPTIONAL_BRACKET_BLOCK}

Card 1 {CARD_1_WEIGHT}:
  - Stage badge: small tan monospace label "{CARD_1_BADGE}"
  - Monospace title: "{CARD_1_TITLE}"
  - Mini-visual: {CARD_1_VISUAL}
  - One-line caption under visual in dark gray monospace: "{CARD_1_CAPTION}"

Card 2 {CARD_2_WEIGHT}:
  - Stage badge: "{CARD_2_BADGE}"
  - Monospace title: "{CARD_2_TITLE}"
  - Mini-visual: {CARD_2_VISUAL}
  - One-line caption: "{CARD_2_CAPTION}"

Card 3 {CARD_3_WEIGHT}:
  - Stage badge: "{CARD_3_BADGE}"
  - Monospace title: "{CARD_3_TITLE}"
  - Mini-visual: {CARD_3_VISUAL}
  - One-line caption: "{CARD_3_CAPTION}"

{OPTIONAL_CARD_4_BLOCK}
{OPTIONAL_CARD_5_BLOCK}

Under the tan arrow, small tan monospace labels spaced along its length:
"{AXIS_LABEL_1}" under Card 1, "{AXIS_LABEL_2}" under Card 2,
"{AXIS_LABEL_3}" under Card 3{AXIS_TRAIL}.

LOWER REGION , compact {N}-row mini-table with thin tan dividers and rounded
corners. Monospace header row in tan uppercase:
"{TABLE_HEADER}".

{N} data rows in monospace dark gray:
  1. {ROW_1}
  2. {ROW_2}
  3. {ROW_3}
  {OPTIONAL_ROW_4}
  {OPTIONAL_ROW_5}

{OPTIONAL_MUTED_ROW_NOTE}

LEFT BOOKEND (small callout outside the table, top-left area): monospace
tan text "TODAY: {LEFT_BOOKEND_TEXT}" with a thin tan arrow pointing to
Card 1.

RIGHT BOOKEND (small callout outside the table, top-right area): monospace
tan text "TOMORROW: {RIGHT_BOOKEND_TEXT}" with a thin tan arrow pointing to
{RIGHT_BOOKEND_TARGET_CARD}.

BOTTOM-LEFT caption (uppercase monospace tan):
"{TAGLINE}".

BOTTOM-RIGHT of canvas: bold monospace signature "by Ragnar Pitla" in deep
royal blue (#2563EB), ~18pt (slightly larger than a footnote), very visible,
with a subtle blue underline accent. Positioned in the bottom-right corner
of the canvas panel with clean spacing from the edge.

Soft drop shadows on all cards. Generous whitespace between the spine and
the table. No orange, no gradients, no 3D, no hand-drawn sketch. Minimal.
Documentation-illustration style.
```

## Slot Reference

| Slot | What goes here | Example |
|---|---|---|
| `{STYLE_REF_ID}` / `{STYLE_REF_NAME}` / `{STYLE_REF_URL}` | Lovart style-reference image. If user did not provide one, use `REPLACE_WITH_YOUR_STYLE_REF` for the id and drop the name/url | `rJVQJbjyYb5GbpbH2Xhu9` / `Stage 4 Headless Horizon` / `https://a.lovart.ai/...` |
| `{TOP_LEFT_LABEL}` | 2-3 words, uppercase | `THE MAP`, `THE ANATOMY`, `THE STACK` |
| `{HEADLINE}` | Core thesis, bold, <8 words, no em dashes | `From Task to Objective`, `Agent = Model + Harness` |
| `{SUBTITLE_LINE_1}` / `{SUBTITLE_LINE_2}` | Two-line hook, no em dashes | "We are all task-oriented today." / "Here is the map." |
| `{N}` | Card count (3, 4, or 5) | `4` |
| `{OPTIONAL_BRACKET_BLOCK}` | See "Bracket block" below | |
| `{CARD_N_WEIGHT}` | Either `(solid)` or `(visibly muted with a dashed tan border to signal "horizon")` | |
| `{CARD_N_BADGE}` | `STAGE N`, `LAYER N`, `PILLAR N`, `STEP N` | |
| `{CARD_N_TITLE}` | 1-2 words, bold monospace | `Task`, `Model`, `Orchestration` |
| `{CARD_N_VISUAL}` | Concrete mini-visual description, 1-3 sentences, using the icon vocabulary from visual-dna.md | |
| `{CARD_N_CAPTION}` | One line, dark gray, describes what happens at this card | `you orchestrate every prompt` |
| `{AXIS_LABEL_N}` | Lowercase tan label under each card position | `today`, `bridge`, `destination`, `horizon` |
| `{AXIS_TRAIL}` | Extra axis labels for card 4 and/or 5 | `, "horizon" under Card 4` |
| `{TABLE_HEADER}` | Pipe-separated column names in uppercase | `STAGE | YOU OWN | AI OWNS | STUCK SIGNAL` |
| `{ROW_N}` | Pipe-separated row values matching header column count | |
| `{OPTIONAL_MUTED_ROW_NOTE}` | Only if a card is muted, add a line telling Lovart to mute that row too | See muted-row note below |
| `{LEFT_BOOKEND_TEXT}` | 8-14 words, describes today | `you are the orchestrator. the AI is a tool.` |
| `{RIGHT_BOOKEND_TEXT}` | 8-14 words, describes tomorrow | `you set the objective. the AI becomes the team.` |
| `{RIGHT_BOOKEND_TARGET_CARD}` | The card this arrow points to (usually the "destination" card, not necessarily the last) | `the Stage 3 card` |
| `{TAGLINE}` | Uppercase, comma-separated, no em dashes | `90% OF PRODUCTION VALUE LIVES IN THE HARNESS, NOT THE MODEL` |

## Bracket Block (Optional)

Use when a subset of cards (2-4) forms a named group. Insert after the "tan arrow" line:

```
A thin tan bracket spans across cards {X}-{Y} with a centered monospace
tan label "{BRACKET_LABEL}" above the bracket.
```

Example:
```
A thin tan bracket spans across cards 2-4 with a centered monospace
tan label "THE HARNESS" above the bracket.
```

## Muted Row Note (Optional)

When a card is muted on the spine, match it in the table:

```
Row {N} ({CARD_TITLE}) rendered in slightly muted gray to match its "horizon"
treatment on the spine above.
```

## Card-4 and Card-5 Blocks

For 4 cards, add:

```
Card 4 {CARD_4_WEIGHT}:
  - Stage badge: "{CARD_4_BADGE}"
  - Monospace title: "{CARD_4_TITLE}"
  - Mini-visual: {CARD_4_VISUAL}
  - One-line caption: "{CARD_4_CAPTION}"
```

For 5, repeat for Card 5.

## Pre-Output Checklist

Before delivering the prompt:

- [ ] No em dashes anywhere in the output
- [ ] Signature block is present, unedited, with #2563EB and "by Ragnar Pitla"
- [ ] 3-5 cards, not 2, not 6+
- [ ] Table row count matches card count
- [ ] If any card is muted, its table row is also muted
- [ ] Bookends point to valid card numbers (LEFT to Card 1, RIGHT to destination card)
- [ ] Tagline is uppercase, no em dashes, comma-separated
- [ ] Every `{SLOT}` has been filled
