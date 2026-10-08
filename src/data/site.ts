// Links used across the site. Products not yet rebuilt here point at their current pages on
// jobgen.ai; switch each `href` to the local page as it ships.
export const LINKS = {
  calendly: "https://calendly.com/jobgen-demo/30min",
  startFree: "https://sales.jobgen.ai/register",
  login: "https://sales.jobgen.ai/login",
  jobSeekers: "https://candidates.jobgen.ai/",
  webDevelopment: "/web-development/",
  pricing: "/pricing/",
  // Where the calculator's "get in touch" form (email + phone + numbers) is sent, as a JSON POST.
  // Empty for now: the form shows its thank-you state with a "not connected yet" note and sends nothing.
  leadEndpoint: "",
  partners: "/partners/",
  industries: "/industries/",
  solutions: "/solutions/",
  about: "/about/",
  news: "/news/",
  careers: "https://recruiter.jobgen.ai/jobs/jobgen-ai-4",
  linkedin: "https://www.linkedin.com/company/jobgenai/",
  contact: "mailto:hello@jobgen.ai",
  privacy: "https://www.jobgen.ai/privacy/",
  terms: "https://www.jobgen.ai/terms/",
};

// The AI workforce. Descriptions and capabilities come from jobgen.ai (lightly tidied).
// `tint` is the product's colour from the approved palette.
export const WORKFORCE = [
  {
    key: "jenny",
    name: "Jenny",
    role: "AI receptionist",
    href: "/receptionist/",
    tint: "var(--edu)",
    problem: "Calls ringing out",
    promise: "Answer every call, day or night",
    summary: "Answers calls around the clock, handles approved enquiries, takes messages, manages appointments and escalates calls that need a person.",
    capabilities: [
      "Answers and greets every call, day or night",
      "Books, moves and confirms appointments",
      "Routes calls, takes messages and transfers to a person on request",
    ],
  },
  {
    key: "olivia",
    name: "Olivia",
    role: "AI sales agent for real estate",
    href: "/olivia/",
    tint: "var(--prop)",
    problem: "Owners on your list going cold",
    promise: "Win more listings",
    summary: "Calls known property owners, identifies selling intent, handles follow-ups and organises appraisals or agent callbacks.",
    capabilities: [
      "Known-owner outbound conversations",
      "Hot, warm and normal lead scoring",
      "Appraisal and agent callback routing",
    ],
  },
  {
    key: "jess",
    name: "Jess",
    role: "AI recruitment assistant",
    href: "/recruiter-agent/",
    tint: "var(--care)",
    problem: "Too many applicants, too little time",
    promise: "Screen every candidate",
    summary: "Sources and screens candidates, conducts voice interviews, scores responses and writes results back to supported applicant tracking systems.",
    capabilities: [
      "Sourcing from LinkedIn and job boards",
      "Voice screening interviews at scale",
      "ATS writeback (Bullhorn, JobDiva, Ceipal)",
    ],
  },
];

// Teams JobGen.AI works with: customers and partners named on jobgen.ai (testimonials and the partners
// page). Logos are the ones published there.
export const CLIENTS = [
  { name: "ONETEC Communications", logo: "/partners/onetec.webp", w: 200, h: 68 },
  { name: "M&S Business Solutions", logo: "/partners/ms-business.webp", w: 600, h: 224 },
  { name: "McGill Institute", logo: "/partners/mcgill-institute-transparent.png", w: 360, h: 92 },
  { name: "Prima Recruitment & Consultancy", logo: "/partners/prima-white.webp", w: 571, h: 158 },
  { name: "Jolie Recruitment", logo: "/partners/jolie-recruitment-white.png", w: 509, h: 217 },
  { name: "Buta Deogun Property", logo: "/partners/buta-deogun-property.png", w: 900, h: 160 },
  { name: "Multi Dynamic", logo: "/partners/multi-dynamic-white.webp", w: 960, h: 186 },
  { name: "Study and Work", logo: "/partners/studyandwork-trimmed.png", w: 234, h: 186 },
];
