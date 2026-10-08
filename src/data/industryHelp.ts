// "How we can help": for each industry, what JobGen.AI can build across its whole offering (AI receptionist
// and voice agents, appointment booking, follow-up workflows with the built-in CRM, SMS and email, websites
// and chat, lead offers, and custom integrations; all confirmed live by the owner, Oct 2026). These describe
// what we can build, not results. Agent names appear only on the agent's own industry pages.
export type HelpItem = { area: string; title: string; text: string; link?: { label: string; href: string } };
export const HELP: Record<string, { title: string; items: HelpItem[] }> = {
  property: {
    title: "Where we can help an agency",
    items: [
      { area: "OUTBOUND CALLS", title: "Owner follow-up, list by list", text: "Olivia calls the owners in your database, offers a property report and arranges appraisals or agent callbacks.", link: { label: "Meet Olivia", href: "/olivia/" } },
      { area: "INBOUND CALLS", title: "Buyer and rental enquiries answered", text: "An AI receptionist answers listing enquiries around the clock, registers buyers for open homes and books inspections, with handover to your agents.", link: { label: "See the AI receptionist", href: "/receptionist/" } },
      { area: "LEAD OFFERS", title: "Appraisal and report offers", text: "Property evaluation reports and appraisal offers on your website, so owners thinking of selling leave their details." },
      { area: "FOLLOW-UP", title: "Automated SMS and email", text: "Follow-up campaigns for the enquiries and owners you choose, with every contact kept in a built-in CRM." },
      { area: "INTEGRATIONS", title: "Real estate portals connected", text: "Connect the portals and systems you already use, so enquiries land in one place." },
      { area: "WEBSITE", title: "A website built to convert", text: "An AI-ready website with chat, turning visitors into appraisal and inspection enquiries.", link: { label: "Web development", href: "/web-development/" } },
    ],
  },
  plumbing: {
    title: "Where we can help a plumbing business",
    items: [
      { area: "CALLS", title: "Urgent jobs triaged, day or night", text: "Jenny answers calls around the clock, captures the job, address and urgency, and routes emergencies to your on-call plumber.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Quotes and jobs in the diary", text: "Quote visits and jobs booked into your calendar, and confirmed or moved by phone or chat." },
      { area: "FOLLOW-UP", title: "Quotes followed up", text: "Automated SMS and email follow-up on the quotes you choose, kept in a built-in CRM so nothing waits on memory." },
      { area: "REPEAT WORK", title: "Referral and reminder campaigns", text: "Referral offers and service reminders to past customers, sent by SMS or email." },
      { area: "WEBSITE", title: "Searches turned into booked jobs", text: "An AI-ready website with a chat assistant for after-hours questions and quote requests.", link: { label: "Web development", href: "/web-development/" } },
      { area: "INTEGRATIONS", title: "Less re-keying", text: "Job details connected to your job management or booking system, instead of copied from a message." },
    ],
  },
  electricians: {
    title: "Where we can help an electrical business",
    items: [
      { area: "CALLS", title: "Fault calls routed safely", text: "Jenny captures the fault, location and urgency, gives your approved safety instructions and routes urgent jobs to the person on call. She doesn’t diagnose faults.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Quotes and installs booked", text: "Quote visits and installation jobs booked into your calendar, by phone or chat." },
      { area: "FOLLOW-UP", title: "Open quotes chased", text: "Automated SMS and email follow-up on the quotes you choose, with each lead in a built-in CRM." },
      { area: "REPEAT WORK", title: "Referral and service campaigns", text: "Referral offers and reminders for inspections or servicing, sent to the customers you choose." },
      { area: "WEBSITE", title: "More enquiries from your website", text: "An AI-ready website with chat that captures job details before anyone calls back.", link: { label: "Web development", href: "/web-development/" } },
      { area: "INTEGRATIONS", title: "Connected to your job system", text: "Bookings and job details connected to the systems your team already uses." },
    ],
  },
  accounting: {
    title: "Where we can help a practice",
    items: [
      { area: "CALLS", title: "Busy-season calls handled", text: "Jenny answers calls, identifies existing clients as configured and takes structured messages with deadlines for the right adviser.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Consultations booked", text: "Client meetings booked, moved and confirmed in connected calendars." },
      { area: "FOLLOW-UP", title: "Reminders that go out on time", text: "SMS and email reminders for the clients and deadlines you choose, sent from a built-in CRM." },
      { area: "NEW CLIENTS", title: "New-business enquiries followed up", text: "Website chat captures new enquiries, and automated follow-up keeps them warm until an adviser calls." },
      { area: "LEAD OFFERS", title: "Guides that bring in enquiries", text: "Offers such as a new-business checklist on your website, so prospects leave their details." },
      { area: "INTEGRATIONS", title: "Connected to your practice systems", text: "Bookings and messages connected to the booking and client systems you already use." },
    ],
  },
  medical: {
    title: "Where we can help a clinic",
    items: [
      { area: "CALLS", title: "Appointment calls off the front desk", text: "Jenny books, reschedules, cancels and confirms appointments in connected calendars, and hands over anything clinical.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "AFTER HOURS", title: "A clear answer after hours", text: "Callers get your approved information and a message for the team. Emergencies follow the route you set. No medical advice." },
      { area: "FOLLOW-UP", title: "Reminders and recalls", text: "SMS and email reminders and recall campaigns for the patients you choose." },
      { area: "WEBSITE", title: "New patients, captured online", text: "An AI-ready website with chat that answers approved questions and takes new-patient enquiries.", link: { label: "Web development", href: "/web-development/" } },
      { area: "INTEGRATIONS", title: "Connected to your booking system", text: "Appointments connected to the practice booking system you already use." },
      { area: "ADMIN", title: "Fewer repeat calls", text: "Routine questions about hours, location and fees answered, so staff spend more time with patients in the room." },
    ],
  },
  legal: {
    title: "Where we can help a firm",
    items: [
      { area: "CALLS", title: "New matters captured properly", text: "Jenny captures the enquiry type, urgency and contact details for the right lawyer. She doesn’t give legal advice.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Consultations booked", text: "Initial consultations booked into the right lawyer’s calendar." },
      { area: "FOLLOW-UP", title: "Enquiries that don’t go cold", text: "Automated SMS and email follow-up for the enquiries you choose, tracked in a built-in CRM." },
      { area: "WEBSITE", title: "Intake that starts online", text: "An AI-ready website with chat that answers approved questions about your practice areas and captures enquiries.", link: { label: "Web development", href: "/web-development/" } },
      { area: "LEAD OFFERS", title: "Helpful guides", text: "Guides such as what to bring to a first consultation, offered in exchange for contact details." },
      { area: "INTEGRATIONS", title: "Connected to your practice system", text: "Enquiries and bookings connected to the practice management system you use." },
    ],
  },
  automotive: {
    title: "Where we can help a workshop or dealership",
    items: [
      { area: "CALLS", title: "Service calls answered", text: "Jenny answers calls, books services and takes clear messages for the workshop, with handover when someone is needed.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Services in the diary", text: "Service and repair bookings made, moved and confirmed by phone or chat." },
      { area: "FOLLOW-UP", title: "Service reminders", text: "SMS and email reminders for upcoming services, sent to the customers you choose." },
      { area: "QUOTES", title: "Quotes followed up", text: "Automated follow-up on repair quotes that haven’t been approved yet." },
      { area: "WEBSITE", title: "Bookings from your website", text: "An AI-ready website with chat that takes service bookings and answers common questions.", link: { label: "Web development", href: "/web-development/" } },
      { area: "INTEGRATIONS", title: "Connected to your systems", text: "Bookings connected to the workshop or dealer systems you already use." },
    ],
  },
  "home-services": {
    title: "Where we can help a home services business",
    items: [
      { area: "CALLS", title: "Enquiries get a clear next step", text: "Jenny answers calls around the clock, captures the job and suburb, and books quotes or passes on urgent work.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Jobs booked and confirmed", text: "Quotes and jobs booked into your calendar, with confirmations and changes handled by phone or chat." },
      { area: "FOLLOW-UP", title: "Quotes and past customers", text: "Automated SMS and email follow-up on quotes, plus campaigns to past customers, from a built-in CRM." },
      { area: "LEAD OFFERS", title: "Referral campaigns", text: "Referral offers that turn happy customers into new enquiries." },
      { area: "WEBSITE", title: "A website that books work", text: "An AI-ready website with chat that captures job details and quote requests.", link: { label: "Web development", href: "/web-development/" } },
      { area: "INTEGRATIONS", title: "Connected to your tools", text: "Jobs and bookings connected to the scheduling system you already use." },
    ],
  },
  recruitment: {
    title: "Where we can help an agency",
    items: [
      { area: "SCREENING", title: "Applicants screened by phone", text: "Jess calls applicants, runs your qualification checks and scores their responses the same way each time.", link: { label: "Meet Jess", href: "/recruiter-agent/" } },
      { area: "ATS", title: "Results written to your ATS", text: "Screening results written back to supported applicant tracking systems: Bullhorn, JobDiva and Ceipal." },
      { area: "SOURCING", title: "Sourcing from LinkedIn and job boards", text: "Passive and active candidates found from LinkedIn and job boards, alongside the ones who apply." },
      { area: "CALLS", title: "Candidate and client calls answered", text: "An AI receptionist answers inbound calls, takes messages and books meetings for your consultants.", link: { label: "See the AI receptionist", href: "/receptionist/" } },
      { area: "FOLLOW-UP", title: "Candidates kept informed", text: "SMS and email updates and interview reminders for the candidates you choose." },
      { area: "WEBSITE", title: "Job seekers and clients captured", text: "An AI-ready website with chat that captures candidate and client enquiries.", link: { label: "Web development", href: "/web-development/" } },
    ],
  },
  education: {
    title: "Where we can help a college or training provider",
    items: [
      { area: "CALLS", title: "Student and parent enquiries answered", text: "Jenny answers questions about courses, classes, tuition and enrolment from your approved information, and passes on what needs a person.", link: { label: "Meet Jenny", href: "/receptionist/" } },
      { area: "BOOKINGS", title: "Tours and consultations booked", text: "Campus tours, course consultations and enrolment meetings booked into your calendar." },
      { area: "FOLLOW-UP", title: "Enrolment enquiries followed up", text: "Automated SMS and email follow-up for the enquiries you choose, tracked in a built-in CRM." },
      { area: "LEAD OFFERS", title: "Course guides", text: "Course guides and brochures offered on your website in exchange for contact details." },
      { area: "WEBSITE", title: "A website that enrols", text: "An AI-ready website with chat that answers course questions any time.", link: { label: "Web development", href: "/web-development/" } },
      { area: "INTEGRATIONS", title: "Connected to your systems", text: "Enquiries and bookings connected to the student or booking systems you already use." },
    ],
  },
};
