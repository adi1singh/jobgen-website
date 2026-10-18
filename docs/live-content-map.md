# Live JobGen content preservation map

Baseline: https://jobgen.ai/, /about, /pricing, the site's public production bundle, its linked product/industry destinations and the earlier website source. Reviewed 19 October 2026, Australia/Sydney.

This is a presentation and wording migration. The main homepage remains problem → solution → products → value. All 28 original generated routes remain, plus /calls/. Some external JobGen destinations stay external; access to them is preserved.

| Live content / behaviour | Revamp destination / evidence |
| --- | --- |
| JobGen mark and blue identity | Official mark, shared blue palette, retained assets; wormhole with + product links |
| Jenny inbound reception, Olivia outbound sales, Jess recruitment | Homepage product tabs and retained /receptionist/, /olivia/, /recruiter-agent/ pages; abstract animated identities |
| Emma for candidates | /about/ four-product section; candidates.jobgen.ai link retained in footer |
| Business-name greeting, approved answers, 24/7, after-hours/overflow, existing number and forwarding | /#conversations, receptionist, solutions and merged FAQs |
| Calendar availability, duration/staff/buffer rules, booking/change/cancel/confirm | /#appointments, booking solution, FAQs |
| Website chat, browser voice and WhatsApp | /#conversations, web development, /demo/ and live demo links |
| Eligible-contact outreach, schedules, preferences and qualification | /#conversations, Olivia and property outreach solution |
| SMS/WhatsApp confirmations, brochures, intake forms, checklists and maps | /#appointments, FAQs, receptionist workflows |
| Contact details, intent, CRM/ATS writeback, summaries/tasks and handover | /#appointments, /#visibility, product pages and retained ATS integration content |
| Urgent/VIP escalation, warm transfer, callback and staff availability | /#conversations, /#platform-controls, FAQs |
| Recordings, transcript/search/logs, sentiment tags, email/document intake, monitoring | /#visibility, /calls/, product pages |
| Documents/menus/pricing/hours/listings, intake questions, identity checks, sandbox, deployment, consent/audit | /#platform-controls, setup narrative and industry/product workflows |
| Six real recordings | /calls/: tax return, property value, education, stale listing, restaurant and childcare. Audio/transcripts retained locally; tax call and published waveform recovered. Explicit verified speaker labels, search, seek, skip, rate, download, synced transcript and audio fallback |
| All live integration names | /#integrations: WhatsApp, Teams, HubSpot, Drive, Slack, LinkedIn, Calendly, Dropbox, Notion, Airtable, Mailchimp, Stripe, Zapier, Salesforce, Google Calendar, MYOB, Outlook, Xero, Twilio; existing Bullhorn/JobDiva/Ceipal retained |
| Manual-work comparison / operating benefits | Problem scenes, four-step solution, value section and /#visibility comparison |
| Current M&S quote, video, $65,000+ overhead / 100% after-hours figures | Customer story and VideoTestimonial, clearly attributed as published case-study figures; other retained customer testimonials and partner assets remain |
| Industry examples and all live menu entries | Ten existing local industry pages plus homepage industry directory. Construction, mortgage brokers, dental and NDIS link to the official receptionist.jobgen.ai guides. Hospitality/childcare real calls remain in library. Example scenarios are labelled illustrative |
| Full USD estimator and rates | /pricing/: direction, property/education/accounting, volume, duration, six models, three voices, four transcription options, own/managed telephone, landline/mobile, number count, streaming and price breakdown. Published production-bundle constants/formula match local pricing.ts. Default duration-step mismatch fixed |
| AUD plan information / FX | Existing owner-confirmed A$100–A$1,000 plan copy retained, separately described from call-cost estimates. Live FX conversion with dated rate, cached lookup and honest unavailable state |
| Cost of waiting | Retained interactive calculation for missed calls, cold enquiries and admin time; full working, editable assumptions and estimated-result wording |
| FAQs | All 11 current live topics plus eight existing company/product answers. Natural-voice answer avoids unmeasured latency/recognition guarantees; original source answer retained in liveFaq.json |
| About, history, products, company identifiers | Retained /about/ facts/timeline/Emma; added current AI Core story, global operations, philosophy and full addresses |
| Founder | Published photo, bio, name/title, tel:+61433506034, mailto:kush@jobgen.ai and LinkedIn retained; removed unsourced first-person placeholder copy |
| Partners, careers, news, web development | Original local routes/assets and published external careers/candidate destinations retained |
| Booking, demo, sign-in, email and direct phones | Calendly embed/fallback, /demo/ official voice handoff, login, email, Sydney and US telephone links; new call library booking section fixes #book anchor |
| Enquiry action | Empty backend endpoint renders actual booking/email links, not a form with simulated success. Optional configured endpoint path remains available |
| Privacy, terms, security | Official policy destinations retained. Live Security & Compliance was a # placeholder; replaced with meaningful platform controls link, without inventing a certification page |

## External services and editorial boundaries

- Four industry guides remain on official JobGen domains rather than being represented as new local pages. Other external destinations include candidates, careers, sign-in and policies.
- Voice widget is restricted to official JobGen hosts. The private preview opens the official /demo/ destination; calendar and video depend on their normal external services. No production integration credentials were invented.
- Source pages contain conflicting sub-500/550/600/800ms timing claims, percentages about unanswered calls, absolute “zero hallucination / 100% factual” language, and security/biometric/immutable-ledger claims. Their underlying product topics are retained; numerical or absolute guarantees are not newly asserted as verified performance. See source-claims-review.md.
- This map covers the live public offering and retained route tree; it does not claim a byte-for-byte copy of every old carousel illustration or marketing sentence.

## Verification

`npm run check` builds the full site and checks generated internal paths, assets, anchors and duplicate IDs. Browser verification covers responsive hero geometry, product selection/keyboard tabs, capability disclosures, call library search/playback and pricing/calculator interactions. See iteration-log.md for measured outcomes and limits.
