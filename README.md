# JOBGEN.AI website

The business website for JOBGEN.AI's AI workforce: Jenny (AI receptionist), Olivia (AI sales agent),
Jess (AI recruitment assistant), web development and pricing. Job seekers are served separately at
https://candidates.jobgen.ai.

The design (colours, fonts, components, interactions) comes from the boss-approved page in
`adi1singh/jobgen-olivia-redesign`. Keep new pages in that style.

## Run it

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

On Vercel, import this repo; it detects Astro (build `npm run build`, output `dist`).

## Structure

- `src/layouts/Base.astro`: every page's head (title, description, social preview), header and footer.
- `src/components/Header.astro`: logo + AI WORKFORCE tag, "AI workforce" menu (Jenny, Olivia, Jess),
  Web development, Pricing, For job seekers, Start free, Book a demo; a menu button on phones.
- `src/components/Footer.astro`: product, company and legal links, Sydney and San Francisco offices.
- `src/components/RealRecording.astro`: a real call with audio, outcome and a transcript that follows along.
- `src/components/Testimonials.astro`: quote cards.
- `src/data/site.ts`: every shared link. Products not yet rebuilt here point at their current
  jobgen.ai pages; switch the `href` when the new page ships.
- `src/data/testimonials.ts`: testimonials copied word for word from jobgen.ai, tagged by product.
- `src/data/recordings.json` + `recordings.ts`: the real recordings and transcripts published on
  sales.jobgen.ai, tagged by product (education → Jenny; the two property calls → Olivia; restaurant
  and child care outbound calls → to be confirmed, not shown yet). Audio files are in `public/audio/`.
- `src/pages/index.astro`: home page, told as a story in chapters: hero ("Grow your business with an
  AI workforce") → 01 The problem (pick what's falling through: calls → Jenny, owners → Olivia,
  applicants → Jess, website → web team) → 02 Meet the team → 03 Real calls + testimonials →
  04 With your people → 05 Our story + founder note → book a demo.
- `src/pages/receptionist.astro`: Jenny's page (the approved design).
- `src/pages/olivia.astro`: Olivia, AI sales agent: two real property calls and the Buta Deogun testimonial.
- `src/pages/recruiter-agent.astro`: Jess: capabilities, how she works with consultants, and the two
  recruitment testimonials. No call recording is shown until a real one is approved.
- `src/pages/web-development.astro`: services, the four client projects, the four-stage process, industries.
- `src/components/PageHero.astro`, `Badge.astro`, `BookDemo.astro`: shared hero, name badge and booking section.
- `src/data/founder.ts`: the founder note (see below).
- `public/styles/site.css`: the approved stylesheet, unchanged apart from font paths.
- `public/styles/layout.css`: header menu, phone menu, footer, recording and testimonial styles.
- `public/js/`: the approved page's scripts (`tryit.js` simulated demo, `calls.js` listen-mode scripts,
  `app.js` page interactions).

## Founder note

The home page has a founder section for Kush (photo, personal note, mission and vision), driven by
`src/data/founder.ts`. The facts come from jobgen.ai/about; **the note, mission and vision are a draft
for Kush to rewrite in his own words**. The section stays hidden on the live site until:

1. a photo is added: put it in `public/team/` (square, at least 600×600) and set `photo`, e.g. `"/team/kush.jpg"`;
2. Kush approves the words: set `approved: true`.

To review the draft before then, add `?founder=preview` to the home page address. It shows with a
clear DRAFT label.

## Content rules

- Never invent testimonials, customer names, statistics, outcomes or prices. Real material only.
- Simulated demos stay labelled as simulated; the browser voice is never presented as a real voice.
- Test at 1440, 390, 360 and 320px wide with no horizontal overflow.

## Roadmap

1. ✅ Rename the receptionist to Jenny (in jobgen-olivia-redesign)
2. ✅ Astro, shared layout, Jenny's page with a real recording and testimonials
3. ✅ Home page (story + problem picker + founder note), Olivia, Jess and Web development pages
4. Pricing: rebuild the sales.jobgen.ai estimator with a USD/AUD toggle (live exchange rate)
5. Industries, solutions, partners, about and news pages (existing copy, lightly tidied)
6. Boss review on the Vercel preview → point jobgen.ai here → redirects (sales.jobgen.ai marketing
   pages, /coach → candidates.jobgen.ai); login and sign-up stay on sales.jobgen.ai
