# Developer / critic iteration log

User brief: retain the hero wormhole, add + product markers, make the site punchier, align headings, enlarge default text, stabilise the blue palette and preserve the live JobGen offering. Ten substantive passes, with Git checkpoints.

## 1 — Baseline critique
Critic found 11–14px reading text, light display weights, inconsistent setup alignment and products disconnected from the hero artwork. Developer established 17–19px reading type, strong display weights, a common heading edge and named product hotspots. Evidence: existing source and independent critic review.

## 2 — Typography, colour and alignment
Added punch.css: heavier variable Geist, larger copy/buttons, blue-led dark/pale surfaces and “Business on. Busywork off.” Browser measured hero weight 810 and 19px supporting copy. Chapter titles now share their left edge. Build passed all original 28 routes.

## 3 — Wormhole product navigation
Placed Jenny, Olivia and Jess links with + markers on the existing animated signal. Retained native links, hash destinations and focus treatment. Critic found Olivia clipping at the desktop edge. Constrained placement to the visible viewport, then verified all markers remained in bounds at 1440px.

## 4 — Responsive collision repair
Phone review found Jenny/Olivia overlap and a 13px overflow at 320px from product tabs. Staggered phone hotspot positions and changed the tab grid to minmax(0,1fr). Increased mobile hero breathing room; short displays use normal-flow problem scenes. Actual 320×739 and 389×844 browser checks show zero document overflow; tablet/desktop checks show no marker collisions. Desktop headings align at x=60 in the 1439px viewport.

## 5 — Complete real-call library
The live homepage has six calls; the source had five. Recovered the published tax call, its 22-line transcript and original waveform, then restored the actual 112.756-second audio. Added /calls/ with word search, seeking, ±10s, playback speed, downloads, synced transcripts and native audio fallback. Browser confirmed playback, loaded duration, transcript opening/highlighting, exclusive playback, skip to 10 seconds and pause-on-filter. Seeking was retested with a byte-range-capable server after discovering Python’s basic server cannot seek M4A.

## 6 — Full platform depth
Restored distinct conversations, calendars, messaging/documents, visibility and controls details, all live integration names and the 11 live FAQ topics alongside the eight existing answers. Added the 12 live industry-menu destinations, retaining four as official external guides and ten existing local guides. Corrected FAQ selectors that missed the actual .home-faq component. Build creates 29 pages; native capability disclosures were verified with click and keyboard.

## 7 — Independent interaction/accessibility critique
Critic identified invented voice assignments, missing persona search and an audio loading state that could remain after failure. Added a verified voice map (Jenny, Olivia, Leo and Mark), searchable agent names, generic AI fallback and reset-on-error/pause. Browser search for Leo returns only the stale-listing call; no-results/clear restores six calls; Olivia returns two. Product hotspot selection, Home/End tab navigation and visible selected panels work. Error recovery is source-reviewed; a network error was not artificially injected into the browser.

## 8 — Motion, colour and resource use
Kept the wormhole while limiting its paint loop to 30fps, reducing mesh complexity on phones and capping DPR. It pauses offscreen/when hidden and reacts to reduced-motion changes. Normal-flow content remains available below the cinematic breakpoint and with reduced motion. Removed remaining purple voice-ribbon/aurora/pricing accents. Browser showed zero console errors during the homepage/disclosure checks. Reduced-motion handling was source-reviewed; no OS preference was changed for the test.

## 9 — Site-wide content and conversion repair
Critic found a missing phone-menu library link, missing founder contacts, older About content and simulated form success without an endpoint. Restored mobile navigation, published founder bio/phone/email/LinkedIn, AI Core story, global operational roles, philosophy and full Sydney address. Unconnected enquiry forms now offer real booking/email actions. Restored the current published customer quote and clearly attributed case-study figures. Added /calls/ to sitemap. Browser found an invalid 1.34-minute default on a 0.05-step slider: changed the step to 0.01. Verified USD default $41.15; inbound accounting on own telephone $33.97, managed mobile $54.94; zero number rental at zero numbers; cost-of-waiting default A$6,077. Added a structural build audit: 29 HTML pages, 1,759 internal links/assets and no duplicate IDs or missing anchors at this checkpoint.

## 10 — Final critic and release verification
Independent critic confirmed the prior defects were resolved and found no new blocking source defect. Final browser sweep covered nine representative routes at actual 320px and 1439px widths: zero horizontal overflow and no broken loaded images. Browser verification caught an initial product deep-link offset caused by pinned chapter layout; resolving the anchor after load/fonts now lands Olivia’s panel at y=110px beneath the header. The final visual capture caught a decorative label behind Jess’s hotspot; removed the redundant label. The retained Jenny hero also received the stronger weight/alignment and its last purple accent was replaced. Final structural check: all 29 pages, 1,846 internal paths/assets, no missing anchors or duplicate IDs. Final hero screenshots and source export are saved with the release; GitHub and private Sites publication are recorded in the release notes.
