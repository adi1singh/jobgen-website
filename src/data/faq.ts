// Plain answers, word for word from https://jobgen.ai/about/ (the cost answer adds a pointer to the
// pricing page, which now exists).
export const FAQ = [
  {
    q: "What does Jenny from JobGen.AI do?",
    a: "Jenny is an AI receptionist. She answers calls 24/7, responds to approved questions, takes messages, transfers callers, creates callback handoffs and books, reschedules, cancels or confirms appointments in connected calendars.",
  },
  {
    q: "How does JobGen.AI handle calls its AI cannot answer?",
    a: "The assistant escalates instead of guessing. Depending on the business rules, it can live-transfer the caller, take a message or create a callback handoff, preserving the transcript, summary and collected information for the team.",
  },
  {
    q: "How long does setup take?",
    a: "A straightforward deployment can be live within a few business days. JobGen.AI configures the voice, scripts, calendar connections and handover rules with the business, then runs a test period before handling live calls.",
  },
  {
    q: "What does JobGen.AI cost?",
    a: "Pricing depends on the assistant and the expected call or candidate volume. JobGen.AI provides pricing for the intended usage during a product demonstration.",
    link: { label: "Estimate the price per conversation", href: "/pricing/" },
  },
  {
    q: "Does JobGen.AI integrate with Bullhorn?",
    a: "Yes. Jess supports ATS writeback to Bullhorn, JobDiva and Ceipal, allowing supported candidate screening information and results to be returned to the recruitment system.",
  },
  {
    q: "What is JobGen.AI?",
    a: "JobGen.AI is an Australian AI software platform for job searching, recruitment and AI-powered business assistants. Founded in 2024 and based in Sydney, JobGen.AI began as an AI job-search assistant and has grown into a broader AI workforce platform for candidates and businesses.",
  },
];

// Tools named on sales.jobgen.ai (and Jess's ATS writeback). Its own caveat applies.
export const INTEGRATIONS = [
  "Google Calendar", "Calendly", "HubSpot", "Salesforce", "Slack", "Microsoft Teams", "WhatsApp", "Zapier",
  "Google Drive", "Dropbox", "Notion", "Airtable", "Mailchimp", "Stripe", "MYOB", "LinkedIn",
  "Bullhorn", "JobDiva", "Ceipal",
];
