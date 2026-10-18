# JobGen revamp — review handoff

19 October 2026. Branch: [codex/jobgen-blue-revamp](https://github.com/adi1singh/jobgen-website/tree/codex/jobgen-blue-revamp).
Implementation checkpoint: f41d9d6ebbf9f680a326963acf03c89060a6fa01. The branch also carries these release notes.

Ten developer/critic passes are recorded in [iteration-log.md](iteration-log.md). The result retains the wormhole, puts + product navigation on it, strengthens typography/default reading size, aligns major headings and uses a consistent blue palette. Abstract animated AI identities replace synthetic human portraits.

All 28 original generated routes remain, plus the complete six-call library. Platform details, integrations, FAQs, company/founder material, current customer story and contacts are mapped in [live-content-map.md](live-content-map.md). Four industry guides remain accessible on their official external JobGen destinations. Source technical claims requiring supporting evidence are retained in [source-claims-review.md](source-claims-review.md).

## Verification

- `npm run check`: 29 generated pages, 1,846 internal link/asset references, no missing paths/anchors or duplicate IDs.
- Nine representative routes checked at actual 320px and 1439px widths: zero horizontal document overflow; loaded images valid.
- Hero markers checked for collisions/clipping at phone/tablet/desktop sizes. Product selection and Home/End keyboard tabs work.
- Six-call search, persona names, no-results/clear, playback, seeking, speed, exclusive playback, synced transcripts and pause-on-filter checked.
- Pricing default matches its control at 1.34 minutes; USD default $41.15. Inbound accounting: own telephone $33.97; managed mobile $54.94. Zero numbers removes rental. Cost-of-waiting default A$6,077.
- Capability disclosures and deep links checked. Direct Olivia navigation settles below the header after pinned layout/font loading. Jenny's retained hero now uses weight 780 (rotator 740), with no narrow-phone overflow.
- Reduced motion and error recovery reviewed in source. No OS motion setting or artificial browser network error was injected.

## Preview status

The final GitHub checkpoint and local screenshots are saved. The user chose **GitHub and local files only** on 19 October 2026. The hosted preview was not updated; no production domain or sharing setting changed.

The existing URL, https://jobgen-blue-revamp.adityasingh-ind28.chatgpt.site, still shows the earlier version. Use the final local screenshots/source and the GitHub branch for this release.

## Local use

Install the locked dependencies with `npm ci`, then use `npm run dev`. `npm run check` performs the production build and structural audit. Node modules, build output and runtime credentials are excluded from the source export.

Final screenshots: [Desktop](previews/desktop.png) · [Phone](previews/mobile.png).
