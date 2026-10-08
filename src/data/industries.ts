// Industry pages, moved from sales.jobgen.ai/industries/* (copy kept word for word from that site's
// data; the receptionist there was still called Olivia, so receptionist copy now says Jenny).
// Photos are the same workplace images that site used. Recruitment and education (added Oct 2026) are
// written from Jess's and Jenny's published capabilities, not copied from that site.
export type Industry = {
  slug: string; label: string; shortLabel: string; agent: "jenny" | "olivia" | "jess";
  headline: string; intro: string; image: string | null;
  painTitle: string; problems: [string, string][]; outcomes: string[]; questions: string[];
  caseTitle: string; cases: { label: string; request: string; fields: [string, string][]; outcome: string; next: string }[];
  prepTitle: string; preparation: [string, string][]; boundary: string; related: string[];
};
export const INDUSTRIES: Industry[] = [
  {
    "slug": "property",
    "label": "Property & real estate",
    "shortLabel": "Property",
    "agent": "olivia",
    "headline": "Property calls, clearly handled.",
    "intro": "Bring inbound property enquiries and outbound owner follow-ups into one reviewable workflow. Keep report interest, selling plans and appraisal requests separate.",
    "image": null,
    "painTitle": "Property opportunities disappear between a missed call and a late follow-up.",
    "problems": [
      [
        "Owner lists sit untouched",
        "Agents know opportunity is in the database, but consistent, respectful outreach is difficult to maintain."
      ],
      [
        "Intent stays buried in notes",
        "Report interest, selling timeframe and callback requests need to become visible actions."
      ],
      [
        "Generic scripts damage trust",
        "Property conversations need verified context, clear identity and a graceful human handoff."
      ]
    ],
    "outcomes": [
      "Known-owner outreach",
      "Selling-intent capture",
      "Property report requests",
      "Agent callback routing"
    ],
    "questions": [
      "Is the saved property still relevant?",
      "Would a digital property report be useful?",
      "Are you considering selling?",
      "When would you prefer an agent callback?"
    ],
    "caseTitle": "An owner conversation, ready for the agent.",
    "cases": [
      {
        "label": "Property report",
        "request": "“A report would be useful. We might sell later this year.”",
        "fields": [
          [
            "Property",
            "Saved address checked with the owner"
          ],
          [
            "Interest",
            "Digital property report requested"
          ],
          [
            "Timeframe",
            "Later this year"
          ],
          [
            "Callback",
            "Afternoons preferred"
          ]
        ],
        "outcome": "Report request + agent callback",
        "next": "The agent reviews the request and confirms the report and callback. Interest is not a completed appraisal."
      },
      {
        "label": "Stale listing",
        "request": "“We took it off the market. I’d be open to discussing another approach.”",
        "fields": [
          [
            "Listing context",
            "Previously listed property"
          ],
          [
            "Current situation",
            "No longer on the market"
          ],
          [
            "Owner preference",
            "Open to an agent conversation"
          ],
          [
            "Next contact",
            "Callback requested"
          ]
        ],
        "outcome": "Agent review requested",
        "next": "Preserve the owner’s wording and listing context. The agent handles strategy, pricing and any appraisal."
      },
      {
        "label": "Inbound enquiry",
        "request": "“Can someone tell me more about this property?”",
        "fields": [
          [
            "Property",
            "Address or listing reference"
          ],
          [
            "Enquiry",
            "Information requested by the caller"
          ],
          [
            "Contact",
            "Name and preferred callback details"
          ],
          [
            "Routing",
            "Responsible agent or team"
          ]
        ],
        "outcome": "Property enquiry captured",
        "next": "Use approved listing facts for routine answers. Route missing information and negotiation questions to the agent."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      [
        "Audience",
        "Choose known owners and check contact eligibility before launch."
      ],
      [
        "Purpose",
        "Use a report, listing follow-up or appraisal conversation—not a generic sales pitch."
      ],
      [
        "Contact rules",
        "Set calling schedules, DNC handling and what happens when an owner declines."
      ]
    ],
    "boundary": "Olivia captures intent. Your agent provides valuations, confirms appointments and handles negotiations.",
    "related": [
      "property-outreach",
      "overflow"
    ]
  },
  {
    "slug": "plumbing",
    "label": "Plumbing",
    "shortLabel": "Plumbers",
    "agent": "jenny",
    "headline": "Keep working. We’ll answer.",
    "intro": "A burst pipe and a tap replacement should not land in the same callback queue. Configure Jenny to collect job details and surface urgent requests while your plumbers are on site.",
    "image": "/industries/plumbing.webp",
    "painTitle": "Urgent plumbing leads rarely wait for voicemail.",
    "problems": [
      [
        "Emergency calls go cold fast",
        "A caller with an active leak usually calls the next plumber instead of waiting for a callback."
      ],
      [
        "Messages miss job context",
        "Your team needs location, urgency, issue type and access details before dispatch."
      ],
      [
        "After-hours coverage is costly",
        "JobGen can collect useful details without staffing a second overnight front desk."
      ]
    ],
    "outcomes": [
      "Emergency triage",
      "Service-area checks",
      "Quote and job booking",
      "Urgent technician handoff"
    ],
    "questions": [
      "Is there active water damage?",
      "What is the service address?",
      "Can the water be isolated?",
      "Is this an emergency or quote request?"
    ],
    "caseTitle": "Give the next plumber a useful job brief.",
    "cases": [
      {
        "label": "Active leak",
        "request": "“There’s water coming through the laundry floor.”",
        "fields": [
          [
            "Issue reported",
            "Active water leak"
          ],
          [
            "Location",
            "Service address and suburb"
          ],
          [
            "Access",
            "Caller on site; access details requested"
          ],
          [
            "Urgency",
            "Urgent callback requested"
          ]
        ],
        "outcome": "Route to the configured urgent contact",
        "next": "Pass the reported issue and address to the team. Do not promise dispatch, arrival time or a repair over the call."
      },
      {
        "label": "Quote request",
        "request": "“I’d like a quote to replace two bathroom taps.”",
        "fields": [
          [
            "Work requested",
            "Replace two taps"
          ],
          [
            "Property",
            "Residential address"
          ],
          [
            "Timing",
            "Preferred date range"
          ],
          [
            "Next step",
            "Quote callback"
          ]
        ],
        "outcome": "Quote enquiry for office review",
        "next": "The office confirms the scope, site visit and price before a job is booked."
      }
    ],
    "prepTitle": "Define the route before you route a call.",
    "preparation": [
      [
        "Service area",
        "Suburbs you cover and what to say outside that area."
      ],
      [
        "Urgent route",
        "The person or number that receives urgent requests, including after hours."
      ],
      [
        "Job intake",
        "Issue type, address, access and preferred callback time."
      ]
    ],
    "boundary": "Use your approved escalation wording. Jenny does not diagnose faults or guarantee emergency attendance.",
    "related": [
      "after-hours",
      "overflow"
    ]
  },
  {
    "slug": "electricians",
    "label": "Electricians",
    "shortLabel": "Electricians",
    "agent": "jenny",
    "headline": "Stay on the tools. Stay reachable.",
    "intro": "Keep reported hazards visible without turning a call assistant into an electrician. Routine work can be qualified; safety-sensitive questions belong with your designated person.",
    "image": "/industries/electricians.webp",
    "painTitle": "The most urgent electrical jobs are also the least patient.",
    "problems": [
      [
        "Safety calls need fast triage",
        "Potential hazards cannot be buried inside a generic name-and-number message."
      ],
      [
        "Technicians cannot always answer",
        "Calls arrive while your team is on ladders, testing circuits or working in panels."
      ],
      [
        "Vague notes slow dispatch",
        "The issue, site, urgency and preferred time should be captured before follow-up."
      ]
    ],
    "outcomes": [
      "Safety-first intake",
      "Job qualification",
      "Appointment requests",
      "Priority alerts"
    ],
    "questions": [
      "Is there smoke or sparking?",
      "Is power lost to one area or the whole site?",
      "What is the property address?",
      "When did the issue begin?"
    ],
    "caseTitle": "Two calls. Different routes to your team.",
    "cases": [
      {
        "label": "Reported hazard",
        "request": "“One outlet smells burnt and the power keeps cutting out.”",
        "fields": [
          [
            "Caller’s report",
            "Burnt smell and repeated power loss"
          ],
          [
            "Site",
            "Address and residential / commercial"
          ],
          [
            "Contact",
            "Best callback number"
          ],
          [
            "Route",
            "Configured urgent contact"
          ]
        ],
        "outcome": "Safety-sensitive request escalated",
        "next": "Keep the caller’s report intact and use the escalation wording your team has approved. No troubleshooting or assurance that the site is safe."
      },
      {
        "label": "Installation",
        "request": "“We need three ceiling fans fitted.”",
        "fields": [
          [
            "Job type",
            "Ceiling fan installation"
          ],
          [
            "Quantity",
            "Three fans"
          ],
          [
            "Site details",
            "Address and access information"
          ],
          [
            "Availability",
            "Preferred days"
          ]
        ],
        "outcome": "Installation enquiry prepared",
        "next": "An electrician confirms suitability, scope and pricing. Jenny captures what is needed for that conversation."
      }
    ],
    "prepTitle": "Define the route before you route a call.",
    "preparation": [
      [
        "Hazard language",
        "The terms and situations that require immediate human escalation."
      ],
      [
        "Types of work",
        "Installations, repairs and commercial work your business accepts."
      ],
      [
        "Ownership",
        "Who handles urgent calls and who follows up on quotes."
      ]
    ],
    "boundary": "Never use the assistant to certify safety, diagnose an electrical fault or give repair instructions.",
    "related": [
      "overflow",
      "after-hours"
    ]
  },
  {
    "slug": "accounting",
    "label": "Accounting practices",
    "shortLabel": "Accounting",
    "agent": "jenny",
    "headline": "Client calls, without the disruption.",
    "intro": "During a busy filing period, “please call me” is not enough. Collect the matter, deadline and usual adviser so the practice can decide what to handle first.",
    "image": "/industries/accounting.webp",
    "painTitle": "Peak-season calls create invisible work across the whole practice.",
    "problems": [
      [
        "Reception is interrupted constantly",
        "Routine booking and status calls break concentration across the team."
      ],
      [
        "Messages lack ownership",
        "A recorded request needs a clear recipient, urgency and follow-up action."
      ],
      [
        "Sensitive matters need boundaries",
        "The assistant must know when to stop and route the client to authorised staff."
      ]
    ],
    "outcomes": [
      "Appointment booking",
      "Structured messages",
      "Client identification",
      "Staff handoffs"
    ],
    "questions": [
      "Are you an existing client?",
      "What is the call about?",
      "Is there a deadline?",
      "Who normally handles your matter?"
    ],
    "caseTitle": "A callback docket, not another vague message.",
    "cases": [
      {
        "label": "Existing client",
        "request": "“I need to discuss my BAS before Friday.”",
        "fields": [
          [
            "Client status",
            "Existing client; verification as configured"
          ],
          [
            "Topic",
            "BAS discussion"
          ],
          [
            "Deadline reported",
            "Friday"
          ],
          [
            "Owner",
            "Usual adviser requested"
          ]
        ],
        "outcome": "Deadline-aware adviser callback",
        "next": "Staff confirm the deadline and what is required. No tax advice or account-specific information without the required verification."
      },
      {
        "label": "New business",
        "request": "“We’ve started a company and need an accountant.”",
        "fields": [
          [
            "Enquiry",
            "New company accounting services"
          ],
          [
            "Business",
            "Name and general service needs"
          ],
          [
            "Contact",
            "Preferred callback details"
          ],
          [
            "Request",
            "Introductory meeting"
          ]
        ],
        "outcome": "New-client consultation request",
        "next": "The practice confirms service fit, fees and appointment availability."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      [
        "Routine answers",
        "Opening hours, consultation process and approved document-submission instructions."
      ],
      [
        "Client checks",
        "Verification rules before discussing customer-specific information."
      ],
      [
        "Matter ownership",
        "Staff responsibilities and how caller-reported deadlines are recorded."
      ]
    ],
    "boundary": "Tax positions, financial advice and sensitive account details stay with authorised staff.",
    "related": [
      "booking",
      "overflow"
    ]
  },
  {
    "slug": "medical",
    "label": "Medical & dental clinics",
    "shortLabel": "Clinics",
    "agent": "jenny",
    "headline": "Keep the front desk moving.",
    "intro": "Use Jenny for non-clinical appointment requests, clinic information and messages. Keep medical questions and urgent concerns outside the routine booking flow.",
    "image": "/industries/medical.webp",
    "painTitle": "A busy phone line should not become a barrier to care.",
    "problems": [
      [
        "Routine calls crowd the desk",
        "Bookings, cancellations and opening-hour questions consume front-desk time."
      ],
      [
        "Clinical advice needs guardrails",
        "An AI receptionist must not diagnose or replace qualified clinical judgement."
      ],
      [
        "After-hours messages need clarity",
        "Staff should return to a prioritised summary rather than a voicemail queue."
      ]
    ],
    "outcomes": [
      "Non-clinical scheduling",
      "Message capture",
      "Emergency escalation",
      "Call summaries"
    ],
    "questions": [
      "Is this an emergency?",
      "Are you an existing patient?",
      "Which appointment needs changing?",
      "What is the best callback number?"
    ],
    "caseTitle": "An administrative assistant, with clear clinical boundaries.",
    "cases": [
      {
        "label": "Change an appointment",
        "request": "“I need to move Thursday’s appointment.”",
        "fields": [
          [
            "Request",
            "Reschedule existing appointment"
          ],
          [
            "Identification",
            "Clinic-defined verification"
          ],
          [
            "Existing booking",
            "Thursday; staff to verify"
          ],
          [
            "Preference",
            "Alternative day or time"
          ]
        ],
        "outcome": "Rescheduling request for confirmation",
        "next": "Only confirm a change when the connected workflow supports it. Otherwise, clinic staff review availability and contact the patient."
      },
      {
        "label": "Message for the clinic",
        "request": "“Could a member of the care team call me?”",
        "fields": [
          [
            "Request",
            "Clinical staff callback"
          ],
          [
            "Contact",
            "Verified callback details as required"
          ],
          [
            "Recipient",
            "Appropriate clinic team"
          ],
          [
            "Content",
            "Minimum information needed for the handoff"
          ]
        ],
        "outcome": "Message routed to clinic staff",
        "next": "Use the clinic’s approved emergency wording when applicable. Jenny does not assess symptoms or give clinical advice."
      }
    ],
    "prepTitle": "Start with the clinic’s administrative rules.",
    "preparation": [
      [
        "Administrative scope",
        "Clinic hours, location and appointment types approved for the assistant."
      ],
      [
        "Verification",
        "What must be checked before patient-specific information is discussed."
      ],
      [
        "Clinical handoff",
        "Approved wording and staff contacts for clinical or urgent requests."
      ]
    ],
    "boundary": "No diagnosis, treatment advice or clinical triage. Urgent concerns follow clinic-approved instructions, not an AI assessment.",
    "related": [
      "booking",
      "after-hours"
    ]
  },
  {
    "slug": "legal",
    "label": "Law firms",
    "shortLabel": "Legal",
    "agent": "jenny",
    "headline": "Capture enquiries. Protect focused time.",
    "intro": "Give your intake team the broad enquiry, caller details and reported deadline. Leave conflict checks, engagement decisions and legal advice with the firm.",
    "image": "/industries/legal.webp",
    "painTitle": "A missed legal enquiry often becomes another firm’s new client.",
    "problems": [
      [
        "Calls interrupt focused work",
        "Lawyers and support staff cannot stop for every first-touch enquiry."
      ],
      [
        "Deadlines are easy to miss",
        "Urgency and key dates need to be visible before the callback."
      ],
      [
        "Advice boundaries matter",
        "Initial intake must stay factual and hand legal questions to qualified staff."
      ]
    ],
    "outcomes": [
      "New-matter intake",
      "Deadline capture",
      "Staff routing",
      "No-advice guardrails"
    ],
    "questions": [
      "What type of matter is this?",
      "Is there a hearing or deadline?",
      "Are you an existing client?",
      "Who should return the call?"
    ],
    "caseTitle": "Keep initial intake focused—and limited.",
    "cases": [
      {
        "label": "New enquiry",
        "request": "“It’s an employment matter. There’s a deadline next week.”",
        "fields": [
          [
            "Category",
            "Employment enquiry"
          ],
          [
            "Status",
            "New enquiry; not an accepted matter"
          ],
          [
            "Date reported",
            "Next week; exact date requested"
          ],
          [
            "Contact",
            "Preferred callback details"
          ]
        ],
        "outcome": "Initial enquiry for intake review",
        "next": "The firm carries out its own conflict and suitability checks before deciding whether to act. Avoid detailed confidential narratives during first-touch intake."
      },
      {
        "label": "Existing matter",
        "request": "“Can my solicitor call me about my appointment?”",
        "fields": [
          [
            "Client",
            "Identity checks as configured"
          ],
          [
            "Reference",
            "Matter reference if supplied"
          ],
          [
            "Recipient",
            "Named solicitor or support team"
          ],
          [
            "Request",
            "Appointment callback"
          ]
        ],
        "outcome": "Message for the responsible team",
        "next": "Route the request without discussing case strategy, making representations or changing legal deadlines."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      [
        "Intake boundaries",
        "General matter categories and information the firm permits before review."
      ],
      [
        "Date capture",
        "Record caller-reported dates without interpreting deadlines."
      ],
      [
        "Routing",
        "Existing-matter owners and the team that reviews new enquiries."
      ]
    ],
    "boundary": "No legal advice, automated conflict clearance or promise that the firm has accepted the matter.",
    "related": [
      "overflow",
      "after-hours"
    ]
  },
  {
    "slug": "automotive",
    "label": "Automotive services",
    "shortLabel": "Automotive",
    "agent": "jenny",
    "headline": "Keep the workshop moving.",
    "intro": "Give the service adviser a structured enquiry: the vehicle, the driver’s description and their availability. Leave diagnosis, workshop capacity and pricing to your team.",
    "image": "/industries/automotive.webp",
    "painTitle": "Workshop noise and full hands should not cost the next booking.",
    "problems": [
      [
        "Calls arrive mid-job",
        "Technicians cannot pause inspections and repairs every time the phone rings."
      ],
      [
        "Booking notes are inconsistent",
        "Vehicle, issue, availability and contact details need one reliable format."
      ],
      [
        "Urgent jobs need priority",
        "Breakdowns and safety concerns should stand out from routine service enquiries."
      ]
    ],
    "outcomes": [
      "Vehicle intake",
      "Service booking requests",
      "Urgency capture",
      "Workshop summaries"
    ],
    "questions": [
      "What is the make and model?",
      "What issue are you experiencing?",
      "Is the vehicle safe to drive?",
      "When are you available?"
    ],
    "caseTitle": "Build the brief for the service adviser.",
    "cases": [
      {
        "label": "Repair enquiry",
        "request": "“The engine light came on in my Mazda this morning.”",
        "fields": [
          [
            "Vehicle",
            "2019 Mazda 3 — caller supplied"
          ],
          [
            "Issue reported",
            "Engine warning light"
          ],
          [
            "When noticed",
            "This morning"
          ],
          [
            "Request",
            "Service adviser callback"
          ]
        ],
        "outcome": "Repair enquiry; inspection not yet booked",
        "next": "The adviser reviews the issue and confirms the next step. Jenny does not diagnose the vehicle or tell the driver it is safe to drive."
      },
      {
        "label": "Routine service",
        "request": "“Can I bring the car in for a service next week?”",
        "fields": [
          [
            "Vehicle",
            "Make, model and year requested"
          ],
          [
            "Work",
            "Routine service"
          ],
          [
            "Preference",
            "Next week"
          ],
          [
            "Contact",
            "Callback number"
          ]
        ],
        "outcome": "Service booking request",
        "next": "Confirm duration, workshop availability and costs through the configured booking workflow or service adviser."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      [
        "Vehicle details",
        "The make, model, year and service information your advisers need."
      ],
      [
        "Booking rules",
        "Accepted job types and which requests require an adviser first."
      ],
      [
        "Urgent enquiries",
        "Approved handoff rules for breakdowns and safety concerns."
      ]
    ],
    "boundary": "No remote diagnosis, repair quote or assurance that a vehicle is safe to drive.",
    "related": [
      "booking",
      "overflow"
    ]
  },
  {
    "slug": "home-services",
    "label": "Home services",
    "shortLabel": "Home services",
    "agent": "jenny",
    "headline": "More jobs. Fewer missed calls.",
    "intro": "A roofing enquiry, a garden job and an air-conditioning repair need different details. Configure the intake around the services and locations your team actually covers.",
    "image": "/industries/home-services.webp",
    "painTitle": "Local service businesses win when they answer first and follow up clearly.",
    "problems": [
      [
        "Leads call several providers",
        "Slow answers give the next business an immediate advantage."
      ],
      [
        "Service areas matter",
        "The team should know location and eligibility before spending time on follow-up."
      ],
      [
        "Every trade asks different questions",
        "A configurable call flow makes each enquiry useful to the person doing the job."
      ]
    ],
    "outcomes": [
      "Quote qualification",
      "Service-area checks",
      "Booking requests",
      "Urgent routing"
    ],
    "questions": [
      "What service do you need?",
      "Where is the property?",
      "Is the situation urgent?",
      "Would you prefer a quote or booking?"
    ],
    "caseTitle": "Qualify the request before the estimator calls.",
    "cases": [
      {
        "label": "HVAC",
        "request": "“Our air conditioner has stopped cooling.”",
        "fields": [
          [
            "Service",
            "Air-conditioning repair enquiry"
          ],
          [
            "Area",
            "Service suburb and address"
          ],
          [
            "Issue",
            "Not cooling; caller description"
          ],
          [
            "Timing",
            "Preferred callback and urgency"
          ]
        ],
        "outcome": "Repair enquiry for service review",
        "next": "Your team confirms coverage, availability and whether an inspection is required."
      },
      {
        "label": "Landscaping",
        "request": "“We want to redo the garden at the front of the house.”",
        "fields": [
          [
            "Service",
            "Landscaping quote"
          ],
          [
            "Property",
            "Location and access"
          ],
          [
            "Scope",
            "Front garden project"
          ],
          [
            "Timing",
            "Desired start period"
          ]
        ],
        "outcome": "Project brief for the estimator",
        "next": "The estimator confirms scope and site-visit requirements. No fixed price is promised from the initial enquiry."
      },
      {
        "label": "Outside the area",
        "request": "“Do you cover my suburb?”",
        "fields": [
          [
            "Location",
            "Caller-provided suburb"
          ],
          [
            "Coverage",
            "Check against approved service area"
          ],
          [
            "Uncertainty",
            "Ask staff if coverage is not confirmed"
          ],
          [
            "Result",
            "Approved answer or callback request"
          ]
        ],
        "outcome": "Coverage check before booking",
        "next": "Avoid implying that every location or service can be accepted. Keep the response tied to your maintained business information."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      [
        "Where",
        "Covered suburbs, travel limits and uncertain-area handling."
      ],
      [
        "What",
        "Service-specific questions instead of one script for every trade."
      ],
      [
        "Next step",
        "Whether to capture a quote request, site visit or staff callback."
      ]
    ],
    "boundary": "Quotes, attendance and job acceptance are confirmed by your configured workflow or team—not inferred from an enquiry.",
    "related": [
      "booking",
      "after-hours"
    ]
  },
  {
    "slug": "recruitment",
    "label": "Recruitment & staffing",
    "shortLabel": "Recruitment",
    "agent": "jess",
    "headline": "More applicants screened. Less time on the phone.",
    "intro": "Jess calls applicants, runs your checks, scores their responses and writes results to your ATS, so consultants start the day with a shortlist instead of a call list.",
    "image": null,
    "painTitle": "Good candidates slip away while the call list waits.",
    "problems": [
      ["Screening calls eat the day", "Consultants spend hours on first-round calls that follow the same questions every time."],
      ["Applicants wait too long", "Good candidates move on while they wait for a first conversation."],
      ["Notes don’t reach the ATS", "Screening answers live in notebooks and inboxes instead of the system the team works from."]
    ],
    "outcomes": ["Voice screening calls", "Consistent scoring", "ATS writeback", "Interview booking"],
    "questions": ["Do you have the right to work here?", "When could you start?", "What salary range are you looking for?", "Tell me about your experience with…"],
    "caseTitle": "A screening call your consultant can act on.",
    "cases": [
      {
        "label": "New applicant",
        "request": "“I applied for the payroll officer role yesterday.”",
        "fields": [["Role", "Payroll officer"], ["Right to work", "Answer recorded"], ["Availability", "Start date recorded"], ["Match", "Scored against your criteria"]],
        "outcome": "Screening summary written to the ATS",
        "next": "A consultant reviews the shortlist and books interviews with the strongest candidates."
      },
      {
        "label": "Not the right fit yet",
        "request": "“I’m looking for something part-time.”",
        "fields": [["Role", "Full-time vacancy"], ["Preference", "Part-time work"], ["Status", "Kept on file"], ["Next step", "Consider for future roles"]],
        "outcome": "Candidate kept on file, not lost",
        "next": "The agency decides whether to contact the candidate about suitable roles later."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      ["Screening questions", "The checks and questions for each role, and what a strong answer looks like."],
      ["Scoring", "How responses are scored and which candidates go to the shortlist."],
      ["Your ATS", "Which supported system results are written to: Bullhorn, JobDiva or Ceipal."]
    ],
    "boundary": "Hiring decisions, offers and anything sensitive stay with your consultants.",
    "related": []
  },
  {
    "slug": "education",
    "label": "Education & training",
    "shortLabel": "Education",
    "agent": "jenny",
    "headline": "Course enquiries answered between classes.",
    "intro": "Jenny answers student and parent questions about courses, classes, tuition and enrolment from your approved information, and passes on only what needs a person.",
    "image": null,
    "painTitle": "Enquiries arrive when the office is busiest, or closed.",
    "problems": [
      ["Routine questions fill the phone", "Class times, fees and enrolment steps are asked again and again."],
      ["Enquiries arrive after hours", "Prospective students call and message in the evening, when nobody is there to answer."],
      ["Follow-up slips", "Enrolment enquiries go quiet without a reminder or a next step."]
    ],
    "outcomes": ["Course and tuition answers", "Tour and consultation booking", "Student identification", "Staff handoffs"],
    "questions": ["Are you a current or prospective student?", "Which course are you asking about?", "What would you like to know?", "What’s the best way to reach you?"],
    "caseTitle": "A course enquiry, answered and recorded.",
    "cases": [
      {
        "label": "Current student",
        "request": "“When is my next class, and what do I still owe?”",
        "fields": [["Student", "Identified as configured"], ["Question", "Next class and tuition"], ["Answered", "From approved information"], ["Handover", "Anything account-specific"]],
        "outcome": "Course and tuition details confirmed",
        "next": "Staff follow up only on what Jenny couldn’t answer."
      },
      {
        "label": "Prospective student",
        "request": "“I’m interested in your evening courses.”",
        "fields": [["Interest", "Evening courses"], ["Contact", "Preferred callback details"], ["Request", "Course information and a consultation"], ["Follow-up", "Enrolment enquiry recorded"]],
        "outcome": "Consultation request recorded",
        "next": "The team confirms course fit, intake dates and enrolment steps."
      }
    ],
    "prepTitle": "What your team sets before the first call.",
    "preparation": [
      ["Course information", "Courses, class times, fees and enrolment steps Jenny can share."],
      ["Student checks", "How students are identified before anything account-specific is discussed."],
      ["Handovers", "Who takes enrolment, fee and welfare questions, and how urgent ones are routed."]
    ],
    "boundary": "Enrolment decisions, fee arrangements and student welfare matters stay with your staff.",
    "related": ["booking", "after-hours"]
  },
];
