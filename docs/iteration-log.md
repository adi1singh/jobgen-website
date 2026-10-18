# Developer / critic iteration log

User brief: keep the hero wormhole; add + product markers; make the site punchier, align headings, enlarge default text and stabilise the blue palette. Preserve the complete live JobGen offering. Run ten substantive review/fix passes and keep Git checkpoints.

## Pass 1 — Baseline critique
- Critic: the prior design uses 11–14px reading text, lightweight headings, an inconsistent setup heading grid, and products below the hero instead of on its artwork.
- Developer: established measurable targets: 17–19px reading text, 700+ display weights, shared left edges and interactive product markers.
- Evidence: original source and an independent critic review.

## Pass 2 — Typography, colour and alignment
- Developer: added punch.css with stronger variable Geist weights, larger copy/buttons, a single blue-led palette and aligned chapter headings. Replaced the vague opening with “Business on. Busywork off.”
- Critic: desktop browser confirms the strong hierarchy and zero document overflow. Heading weight is 810; body text is 19px. Setup title now uses the common left edge.
- Validation: Astro builds all 28 routes.

## Pass 3 — Wormhole as product navigation
- Developer: added Jenny/Olivia/Jess links anchored to the projected signal surface, + symbols on the artwork, native link fallbacks, focus treatment and blue-only light variation.
- Critic: first desktop capture revealed Olivia's marker extending beyond the visible hero.
- Fix: constrain marker positions to the visible viewport instead of the full offscreen canvas. Next browser pass must confirm bounds at desktop, tablet and phone widths.

## Passes 4–10
In progress. Only record a pass as complete with its actual critique, change and verification; do not count cosmetic repetitions as separate reviews.
