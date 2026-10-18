# JobGen website revamp

## User requirements

- Build on this existing website and its approved hero/product presentation. This is a major visual upgrade.
- Use diffused colours, consistent JobGen blue accents, bold punchy typography and cinematic scrolling. Body text must be comfortably readable at default zoom (17–19px); align major headings on the same grid.
- Keep the animated wormhole hero; place named product links on it using + markers. The user explicitly requests ten developer/critic improvement passes, bug checks and Git checkpoints.
- Main narrative: problem → solution → products → value. Serve both small businesses and enterprise buyers.
- Prefer distinct abstract animated voice identities for Jenny and Olivia over synthetic human headshots.
- Use adi1singh/website-ideas for the user's selected components and visual references.
- Preserve the complete content, pages and functional features of https://jobgen.ai/. The live site is the content baseline; the first design pass is not proof of content parity. Reuse its existing assets, content and useful patterns where appropriate.
- Keep docs/live-content-map.md current. Do not silently remove a product, recording, industry, integration, contact route or pricing capability to simplify the new design. Record unresolved differences explicitly.

## Git checkpoints

- Current development branch: codex/jobgen-blue-revamp in adi1singh/jobgen-website.
- Commit and push every meaningful update, at sensible checkpoints during longer work and before ending a turn. The user explicitly asked to preserve work before context/tokens run out.
- Verify the remote branch head after pushing. Keep this file and the content map with the source.
- Preserve unrelated changes. Use the normal review/merge process for main; never force-push it.
- The separate private Sites preview has its own hosting metadata. Do not copy credentials or temporary build/runtime data into this GitHub repository.

## Verification

- Run the existing Astro build for source changes. Reuse unchanged dependencies.
- Check meaningful interactions and responsive layouts for UI changes; preserve reduced-motion and script-free reading paths.
- Label illustrative workflow scenes and calculator assumptions. Preserve product roles and verified source material; do not invent customer outcomes or metrics.
