// Newsroom, moved from https://jobgen.ai/news (press release copied word for word).
export type Block = { type: "p" | "quote" | "list" | "h2" | "contact"; text?: string; who?: string; items?: string[] };
export const NEWS = [
  {
    slug: "australia-job-market-2026",
    kind: "PRESS RELEASE",
    date: "21 July 2026",
    place: "Sydney, Australia",
    readTime: "4 min read",
    title: "With Job Vacancies Down 30%, Australians Are Rethinking How They Apply for Jobs",
    // Shorter for search results; the page keeps the release's own headline.
    seoTitle: "Job vacancies down 30%: Australians rethink applying",
    summary: "Job vacancies are 30.3% below their 2022 peak. With fewer roles and more competition, job seekers are using AI to apply smarter, not just more.",
    image: "/news/AustraliaJobMarket.webp",
    pdf: "/news/JobGenMedia.pdf",
    body: [
      {
        "type": "p",
        "text": "SYDNEY, Australia, 21 July 2026 — Australia's job market is becoming increasingly competitive. The Australian Bureau of Statistics reports job vacancies fell 2.1% in the three months to May 2026 and are now 30.3% below their 2022 peak. With fewer roles available and more candidates competing for each opportunity, standing out has never mattered more."
      },
      {
        "type": "p",
        "text": "The days of sending the same resume to every employer are over. Recruiters and applicant tracking systems (ATS) are increasingly looking for candidates who clearly demonstrate how their experience aligns with the specific requirements of each role."
      },
      {
        "type": "p",
        "text": "Research from the University of Oxford's SkillScale project, cited by the World Economic Forum, found that candidates who demonstrate AI skills are 8–15% more likely to receive an interview invitation than otherwise identical applicants. The message is clear: how candidates present their experience can be just as important as the experience itself."
      },
      {
        "type": "p",
        "text": "Job seekers are responding by using AI not simply to submit more applications, but to submit better ones. Since launching, JobGen.AI has helped thousands of job seekers across Australia and New Zealand create more targeted applications and prepare more effectively for interviews."
      },
      {
        "type": "quote",
        "text": "\"I was made redundant from one of the big health providers. Over a couple of weeks I sent out more than 40 applications with barely any callbacks. I have a mortgage and two kids, so the stress really started to build. Using JobGen.AI, I went from zero interviews to eight interviews and two job offers in under six weeks. It wasn't just about applying. Before every interview it helped me prepare with phone scripts, the right questions to ask and the keywords recruiters were actually looking for.\"",
        "who": "Sid Ramani, Project Manager, Sydney"
      },
      {
        "type": "p",
        "text": "That shift — from applying more to applying smarter — is exactly what JobGen.AI was designed to support."
      },
      {
        "type": "quote",
        "text": "\"Finding a job shouldn't become a full-time job. The candidates succeeding today aren't necessarily those with the strongest resumes. They're the ones who clearly demonstrate the value they can bring to a particular employer. AI shouldn't replace the candidate or invent their story. It should help people communicate their experience more effectively, prepare with confidence and present themselves at their best.\"",
        "who": "Kush Bhatia, Founder and CEO of JobGen.AI"
      },
      {
        "type": "p",
        "text": "JobGen.AI has also recently introduced Emma™, its AI Job Search Assistant, which guides candidates through the application process by asking targeted questions to improve resumes, cover letters and interview preparation. Additional career advice is available through the weekly JobGen.AI Connect podcast."
      },
      {
        "type": "p",
        "text": "Based on insights from hundreds of successful candidates, JobGen.AI recommends job seekers:"
      },
      {
        "type": "list",
        "items": [
          "Prioritise quality over quantity. Apply for fewer roles that genuinely match your experience. Compare your resume against the job description and address genuine skill gaps rather than simply adding keywords.",
          "Lead with impact. Keep your professional summary concise (around 300–350 characters) and focus on the value you've delivered, not just your responsibilities.",
          "Show measurable achievements. Wherever possible, include outcomes supported by metrics, percentages, dollar values or timeframes.",
          "Tailor every application. A strong cover letter explains why your experience matches the employer's needs rather than repeating your resume."
        ]
      },
      {
        "type": "h2",
        "text": "About JobGen.AI"
      },
      {
        "type": "p",
        "text": "JobGen.AI is an Australian AI-powered workforce platform headquartered in Sydney, built around three products: Emma™, the AI Job Search Assistant, helping job seekers tailor applications and prepare for interviews; Jess™, the AI Recruitment Assistant, helping agencies move from job brief to shortlist in under 60 minutes; and Jenny™, the AI Receptionist, an AI voice agent that answers calls, books appointments, raises invoices, sends emails and manages front-desk operations for growing businesses. Founded by Kush Bhatia, the company won the Global Excellence Award at AIMBIG Oceania 2026. JobGen.AI is a member of the Antler AU15 cohort, UNSW Founders, NVIDIA Inception and Google for Startups, and serves candidates and recruiters across Australia, India, France, the UK and the United States."
      },
      {
        "type": "contact",
        "text": "Media Contact: Claudia Sagripanti, Mob: 0414 520 836"
      }
    ] as Block[],
  },
];
