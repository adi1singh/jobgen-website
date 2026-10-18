# Live JobGen content preservation map

Baseline: https://jobgen.ai/ and its linked public pages. Reviewed 19 October 2026 (Australia/Sydney).

The user requires the complete existing site's content, pages and functional capabilities to survive the revamp. Reorganising presentation is allowed. A category below is not complete merely because a short homepage summary mentions it.

## Current checkpoint

The first visual pass redesigns the homepage and shared brand styling. The repository's existing 28 generated pages, product data, assets, recordings, estimator and booking integration are retained. Full live-site parity has not yet been signed off.

Private design preview: https://jobgen-blue-revamp.adityasingh-ind28.chatgpt.site

## Coverage checklist

| Live material / behaviour | Existing foundation | Remaining parity check |
| --- | --- | --- |
| Official JobGen brand, blue identity, Jenny and Olivia | Official mark and abstract named identities in the revamp | Preserve names, roles and brand; use the new visual treatment |
| AI receptionist, property sales, recruitment, candidate/job-search product | Jenny/Olivia/Jess product routes; candidate portal link; about page | Verify Emma's full role and every product entry against live About/Product links |
| Inbound answering, approved answers, business-name greeting, 24/7 and after-hours/overflow coverage | Product pages, solutions, FAQs | Give all distinct capabilities an explicit destination in the new narrative |
| Existing number, call forwarding and number provisioning | Receptionist and pricing foundation | Confirm forwarding/setup information remains discoverable |
| Booking, changing, cancellation, availability, duration/buffers/staff rules and confirmations | Product/booking content and calendar integration | Compare all live details, including Outlook, Google Calendar and Calendly |
| Website chat and browser voice; outbound eligible-contact follow-up | Web-development and demo routes; Olivia content | Preserve both voice and messaging journeys, consent/contact preferences and custom schedules |
| WhatsApp and SMS messages, brochures, intake documents, checklists and location links | Integration data and product descriptions | Restore complete live messaging/document details, not just a generic integration mention |
| Capture contact details, intent, lead qualification, summaries and CRM writeback | Existing data and product workflows | Cover complete handover context and staff-owned next steps |
| Live/warm transfer, callback, urgent/VIP escalation and staff availability | Human-handover content and FAQs | Check all live transfer/escalation rules and contextual handoff details |
| Transcripts, recordings, search/logs, telemetry and conversation history | RealRecording component and product content | Verify all log/summary details and recording-consent information |
| Business knowledge, PDFs, service menus, pricing policies, intake fields, test/sandbox and deployment | Setup process and product content | Retain the full deployment/guardrails story as distinct information |
| Identity/security checks and audit trail | Some general trust/data content | Map live identity/verification and audit features explicitly; do not invent certifications |
| Real call library | Five audio/transcript records in src/data/recordings.json; two featured on new homepage | Live home lists six calls: tax return, property value, student course enquiry, stale listing, restaurant booking and childcare tour. Locate/preserve the missing tax recording and expose the full library. Preserve search, seeking, playback speed, skip controls and synced transcripts |
| Integrations | INTEGRATIONS in src/data/faq.ts | Preserve the live set: WhatsApp, Teams, HubSpot, Drive, Slack, LinkedIn, Calendly, Dropbox, Notion, Airtable, Mailchimp, Stripe, Zapier, Salesforce, Google Calendar and MYOB; retain existing ATS connectors too |
| Workflow comparison and operational benefits | Problem/solution narrative and calculator | Keep the substantive voicemail/manual-work versus AI comparison, with clear factual wording |
| Customer story, quote, video and named businesses | VideoTestimonial, testimonials data and partner assets retained | Compare exact live material and any published outcome figures; do not silently replace with invented proof |
| Industry navigation, examples and scenarios | Ten industry pages in existing repo | Live menu additionally names construction, mortgage brokers, dental and NDIS. Preserve these destinations and check hospitality/childcare scenarios and all live carousel states |
| Pricing estimator | Existing full estimator and src/data/pricing.ts | Live /pricing includes direction, property/education/accounting, volume, duration, AI model, voice, transcription, customer/JobGen telecom, landline/mobile, number count, streaming and USD estimate. Verify every control and rate. Keep USD estimator distinct from separately confirmed AUD service-plan copy |
| Cost of waiting / lost revenue calculator | Existing interactive calculator retained | Preserve the live entry points and honest assumptions |
| FAQs | Existing eight-answer FAQ | Live home has additional answers; compare the complete expanded list, including natural speech, calendars, after-call work, number retention and messaging |
| About, company identity, founder/history, team, ABN/ACN, offices | Existing about/company source | Compare the entire live About page and linked product pages |
| Partners, careers, news, web development and candidate portal | Existing routes and links retained | Check every published entry and external destination |
| Booking/demo, sign-in and contact | Calendly, demo page, login, email retained | Add/check direct US and Sydney telephone routes, all CTA targets and both headquarters addresses |
| Privacy and terms | External official policy links retained | Preserve official policy destinations and content access |
| Security & Compliance footer entry | Live homepage currently points to a fragment placeholder | Record the placeholder honestly; do not invent a policy or certification page |
| Useful existing imagery, illustrations and interaction patterns | Official mark copied; prior assets retained | Reuse any live assets and patterns that improve the new site without reverting the agreed design direction |

## Source pages checked in this pass

- https://jobgen.ai/
- https://jobgen.ai/about
- https://jobgen.ai/pricing
- Local source: src/data/site.ts, src/data/faq.ts, src/data/pricing.ts, src/data/recordings.json and the retained route tree.

## Next migration pass

1. Enumerate the complete live navigation, expanded FAQs, industry states and all linked product/company pages.
2. Compare the checklist against rendered destinations, not just source keywords.
3. Move each missing item into an appropriate section or page while preserving problem → solution → products → value on the homepage.
4. Test the migrated interactions, update this map, and commit/push the checkpoint.

Live wording that makes absolute technical promises or quotes numerical outcomes should remain traceable to its source and receive an explicit factual review before new claims are introduced.
