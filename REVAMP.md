# JobGen / In full flow

A substantial homepage evolution built on adi1singh/jobgen-website, retaining its Astro pages, real call recordings, product facts, calculator and booking flow.

## Design
- Soft blue accents, diffuse light, warm off-white sections and the official JobGen mark.
- A dimensional animated signal ribbon opens the page.
- Narrative: problem → solution → products → value.
- Desktop problem scenes progress with normal scrolling; phones show a readable stacked sequence.
- Jenny, Olivia and Jess have distinct abstract voice identities in place of synthetic human portraits.
- Product selection supports keyboard navigation and direct fragment links.
- Existing inner pages inherit the updated shared palette, header and logo. Their content and layouts remain the existing site foundation.

## Validation
- Astro builds all 28 existing pages successfully.
- All 73 local homepage references and fragment targets resolve.
- Desktop problem transitions and keyboard product navigation checked in the browser.
- Phone menu, agent selection and horizontal overflow checked at a 390px CSS viewport.
- Real call playback and transcript synchronisation checked.
- Calculator checked with changed inputs: 40 calls/day and other default assumptions yields A$7,397/month and A$88,760/year.
- Added reduced-motion and script-free reading fallbacks; small text on pale surfaces darkened for contrast.

## Development
npm install
npm run dev
npm run build

The shared booking flow still opens the real JobGen Calendly calendar. The live voice demo uses the existing integration. No microphone conversation or booking was submitted during verification.

## Git checkpoint workflow

Development branch: `codex/jobgen-blue-revamp` in `adi1singh/jobgen-website`. Commit and push each meaningful update to this branch so work is preserved between chats. Keep the original main branch for the normal review/merge process.

Private design preview: https://jobgen-blue-revamp.adityasingh-ind28.chatgpt.site

`astro.config.mjs` defaults canonical URLs to the official JobGen domain. Preview hosts may set `SITE_URL` when building. The opening preview capture is at `docs/jobgen-revamp-preview.jpg`.

## Required content parity

The user requires everything from the live JobGen site to remain available in the revamp. The live site can also supply useful content, assets and patterns. See `AGENTS.md` and `docs/live-content-map.md` for the preserved brief, coverage checklist and remaining migration checks. The first visual pass is not a completed full-content migration.
