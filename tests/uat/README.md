# User acceptance tests

`uat.mjs` plays real visitors with real goals through the built site in a browser, and checks what they
see and can do. Run it before every merge.

```sh
npm run build
node tests/uat/serve.mjs dist 8770 &     # serves dist/ like Vercel, byte ranges included
npm i --no-save playwright axe-core
npx playwright install chromium
node tests/uat/uat.mjs http://localhost:8770
```

Use `serve.mjs` (or another server that answers byte-range requests): without ranges, browsers can’t
seek inside the recordings, and the player checks fail.

It prints PASS/FAIL per check, saves screenshots and `results.json` to `tests/uat/out/`, and exits
non-zero if anything fails. Calendly and the exchange-rate service are stubbed so results are repeatable.

## The visitors

| # | Who | Goal | What we check |
|---|-----|------|---------------|
| 1 | Sarah, dental clinic owner, phone 390×844 | “What is this, can I trust it, how do I book?” | Headline, CTA and Jenny/Olivia/Jess on the first screen; no next section peeking; “Hear a real call” → our player (the call’s own waveform) plays the real recording, pauses, and the transcript follows; header “Book a demo” lands on the calendar; tap targets ≥ 44px |
| 2 | Raj, real estate principal, desktop | “Is Olivia for agencies like mine?” | Menu names her “AI sales agent for real estate”; her own colours; list animation completes with counters matching the rows; labelled as simulated; jump to her real calls; booking |
| 2b | Dana, plumbing business owner, phone | “Will it handle an urgent job?” | Phone menu → Industries → Plumbing; the page uses Jenny (never the old receptionist name); the urgent-leak example and what she won’t promise; “Where Jenny stops”; “See an example” jump; related solution link |
| 3 | Mia, ops manager, phone 360×740 | “What are missed calls costing us?” | No number until Calculate; working revealed step by step; correct maths for 15 combinations incl. extremes; field-level errors that clear when fixed; honest “not connected yet” thank-you with no request sent; stale result hidden after changes; largest result fits 320px; under-one-customer result explained |
| 4 | Sam, keyboard only, 1280×720 | Use the whole site without a mouse | Skip link; menu opens with Enter, closes with Escape and returns focus; sliders and Calculate by keyboard; a real call plays with Enter and skips 5 seconds per arrow key; every Tab stop shows a focus ring; axe WCAG 2.1 AA on all 25 pages with no serious or critical issues |
| 5 | Priya, finance lead in Sydney | “What will this cost us, in AUD?” | AUD first for Australia; matches sales.jobgen.ai ($0.300 / $41.15, 1–5 minute prices) and × today’s rate; labelled approximate; USD choice remembered; numbers box clamps 0–99; USD fallback when the rate can’t load |
| 6 | Ken, reduced motion on slow 3G | Read and use the site without motion | LCP < 4s, CLS < 0.1, first load < 1.5 MB; scroll bar off; calculator, both signatures and the problem cards show their final state instantly; pages change without a cross-fade. For everyone else: hovering a link fetches the page ahead, and pages cross-fade |
| 7 | Content integrity (all 25 pages) | Nothing broken anywhere | One h1, title and description per page; alt text; preview images exist; every internal link and #anchor resolves; only JobGen/Calendly/partner external links; no sideways scroll at 9 widths (320 → 1920 incl. tablets); no unexpected third-party requests |
| 8 | Ella, sceptical operations director | “What’s the catch? Are these numbers real?” | FAQ answers the objections (incl. what happens when the AI can’t answer) and matches its FAQPage data; the live demo and video load nothing until asked; tickers and animations labelled as examples or simulated; honesty audit: no percentages, multipliers or savings claims outside the visitor’s own estimates, pricing maths, labelled simulations and the press release; each professional’s pages name only that professional (the receptionist’s old name can’t creep back) |
| 9 | A search crawler without JavaScript | Can it read and index everything? | Nothing hidden without JS; titles ≤ 65 characters; descriptions 50–200; canonical on jobgen.ai; structured data parses; robots.txt and a sitemap whose every entry exists; 404 kept out of search; icons and manifest |
| 10 | Lisa, iPad (820×1180) and a phone sideways (844×390) | Use it on in-between screens | Header items don’t collide; menu opens with the workforce; no sideways scroll; headline on the first screen; no script errors |
| 11 | Someone with an old jobgen.ai or sales.jobgen.ai link | Land somewhere useful | The 404 page guesses the right page from the old address (industries, pricing, coach → candidates.jobgen.ai, solutions, receptionist); popular pages and booking offered; vercel.json sends /coach to candidates.jobgen.ai |
| 12 | Noah, wants to hear it live or watch a customer | Try it without friction | Off jobgen.ai the live-demo buttons open jobgen.ai/demo/ in a new tab; on jobgen.ai they open JobGen’s own widget in place and submit nothing by themselves; the customer video loads (youtube-nocookie) only on play |
| 13 | Tom, practice manager, desktop | “Can I try Jenny myself?” | “Try a demo call” lands on the demo, labelled simulated; picking a business updates the phone; Call → Hang up; steering the replies ends in the summary his team would get, delivered to the inbox preview with a next step that takes focus; Jenny never appears as Olivia; “Just listen” plays a full call; nothing is sent |
| 14 | Grace, café owner, phone | “Which one do I need?” | The guide waits until the hero has scrolled away and lives in the booking bar on phones; it asks about her business first; a clinic missing calls → Jenny, an agency with a cold database → Olivia plus follow-up, a business short of online enquiries → website and lead offers; each suggestion gives its reason and says it’s a starting point, not a quote; Escape returns focus; nothing is sent |
| 15 | Tom, café owner in Brisbane | “What do you do, is it real, what will it cost?” | Opening line and “Start with one solution” under the main actions; page order calls → customer story → solutions → how we work → FAQ → booking; featured story structured problem / what we did / what changed with no figures added; no sweeping absolutes; calendar loading state and fallback link; at 360, 390 and 820px only one floating control at a time, never over audio, forms or the calendar; pricing explains running costs vs quoted setup before the estimator, with technical settings in Advanced configuration |
| 16 | Leah, physio clinic owner | “What is waiting costing me, and what would you do for clinics?” | The “what is waiting costing you?” calculator on home and pricing: hidden until Calculate, illustrative defaults, A$6,077 a month at the defaults (132 missed calls, A$4,560 revenue + A$1,517 staff time), full precision at the extremes, not-guaranteed wording and the plan range ex GST; every industry page shows at least five ways we can help; recruitment is Jess’s page; education plays a real call; no “Start free”; data stored in Australia in the footer and FAQ; cost answer with A$100–1,000 ex GST |

## Design principles the tests hold the site to

- **Hick’s law:** few choices at each decision: two hero buttons, three problems, one booking ask.
- **Fitts’s law:** primary actions big and close; every tap target ≥ 44px, sliders included.
- **Jakob’s law:** familiar patterns: logo home top-left, nav in the header, booking at the end.
- **Foot-in-the-door / commitment:** the calculator asks for numbers first and only then for an email and phone.
- **Goal-gradient & peak-end:** the working counts up step by step to the result; every page ends on the calendar.
- **Von Restorff:** the Calculate button is the one full-spectrum button on the page.
- **Social proof at the decision point:** real recordings straight after the hero; testimonials word for word.
- **Forms (NN/g):** visible labels, errors next to the field, cleared as soon as they’re fixed.

## History

- Step 5 (industries, solutions, partners, news): 175/175 after fixing tab and card-number contrast and adding booking to the news pages.
- Visitors 8–12 (sceptic, crawler, tablet, old links, live demo): 214/218 → 218/218 after shortening the
  home and press-release search titles and the home description.
- Recording player, name check, page transitions and Jenny’s demo (visitor 13): found “OLIVIA WILL” and
  “OLIVIA ON SHIFT” left on Jenny’s page (fixed), and that seeking needs a server with byte ranges (hence
  `serve.mjs`). 236/236.
- Messaging and layout brief (Oct 2026): calculator now keeps full precision until the final dollar figure
  (defaults A$6,534, not A$6,600); calculator checks moved to Jenny’s page; visitor 15 added. 269/269.
- Pricing model, data in Australia, cost-of-waiting calculator, industry help and two new industries
  (visitor 16). 299/299.

### First run (Oct 2026): 82/98 → 98/98 after fixes

Olivia’s “Booked” counter counted a retry as a booking · form errors only at the bottom and not
clearing · “A$0 a month” with no explanation · 6px slider touch area and sub-44px buttons · pricing
“Numbers needed” box showing 150 while charging 99 · recordings only in .m4a (now Opus first, .m4a
fallback, 5× smaller) · no focus ring on the recording player · colour contrast on the aurora, cream
headings and footer · logo link name · an invalid ARIA attribute in Jenny’s demo.

Not covered here: real Calendly booking (third party), the lead form’s destination (not connected
yet), real exchange-rate responses, and real devices (run on a phone before launch).
