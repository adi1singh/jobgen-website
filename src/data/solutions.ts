// Solution pages, moved from sales.jobgen.ai/solutions/* (copy kept word for word; the receptionist
// there was still called Olivia, so receptionist copy now says Jenny). Each page's example section is
// copied from the rendered page.
export type Solution = {
  slug: string; label: string; agent: "jenny" | "olivia"; headline: string; intro: string; points: string[];
  example: {
    kind: "timeline" | "routing" | "steps" | "campaign"; eyebrow: string; title: string; steps: [string, string][];
    tag: string; quote: string; note?: string; fields: [string, string][];
    fieldsEyebrow?: string; fieldsTitle?: string; fieldsIntro?: string;
    pairTitleEyebrow?: string; pairTitle?: string; pair?: [string, string][];
  };
  preparation: [string, string][]; boundary: string; cta: string;
};
export const SOLUTIONS: Solution[] = [
  {
    "slug": "after-hours",
    "label": "After-hours answering",
    "agent": "jenny",
    "headline": "Close the office. Keep the conversation open.",
    "intro": "Give late callers an approved answer and a useful next step. Routine requests can wait for the morning; urgent exceptions follow the route you define.",
    "points": [
      "Custom after-hours greeting",
      "Messages with urgency and ownership",
      "Emergency and human escalation rules",
      "Full transcript and summary"
    ],
    "example": {
      "kind": "timeline",
      "eyebrow": "AN EVENING-TO-MORNING EXAMPLE",
      "title": "The call ends. The context stays.",
      "steps": [
        [
          "18:00",
          "The office closes"
        ],
        [
          "22:10",
          "A customer calls"
        ],
        [
          "08:30",
          "Your team returns"
        ]
      ],
      "tag": "CALLBACK REQUESTED",
      "quote": "“Can I arrange a quote for a tap replacement tomorrow?” Jenny collects the request without promising a next-day visit.",
      "fields": [
        [
          "Request",
          "Tap replacement quote"
        ],
        [
          "Location",
          "Service address collected"
        ],
        [
          "Preference",
          "Tomorrow, if available"
        ]
      ],
      "pairTitleEyebrow": "NOT EVERY CALL SHOULD WAIT",
      "pairTitle": "Keep an exception route open.",
      "pair": [
        [
          "A routine enquiry",
          "Answer approved questions and capture enough detail for the next working day. Be explicit when a callback still needs to happen."
        ],
        [
          "An urgent request",
          "Use your approved escalation wording and contact route. If nobody is available, follow your fallback rather than promising a response time."
        ]
      ]
    },
    "preparation": [
      [
        "Hours & greeting",
        "Set your business hours, time zone and what callers hear outside those hours."
      ],
      [
        "Who gets contacted",
        "Choose the urgent contact and the fallback when that person is unavailable."
      ],
      [
        "Morning ownership",
        "Decide who reviews overnight messages and follows up on each request."
      ]
    ],
    "boundary": "An after-hours answer is not a promise of overnight service. Do not offer attendance or availability your team cannot confirm.",
    "cta": "What should happen to tonight’s next call?"
  },
  {
    "slug": "overflow",
    "label": "Overflow call handling",
    "agent": "jenny",
    "headline": "Your team first. Jenny when the line needs help.",
    "intro": "Keep the number customers know. Use configured call forwarding for unanswered or busy calls, so another conversation does not have to become another voicemail.",
    "points": [
      "Missed-call coverage",
      "Multiple simultaneous conversations",
      "Spam and non-actionable call filtering",
      "Instant team visibility"
    ],
    "example": {
      "kind": "routing",
      "eyebrow": "COVERAGE WITHOUT CHANGING THE FRONT DOOR",
      "title": "One number. A clear fallback.",
      "steps": [
        [
          "Your business number",
          ""
        ],
        [
          "Configured provider forwarding",
          ""
        ],
        [
          "Your team answers",
          "No answer · The line is busy"
        ]
      ],
      "tag": "ANSWER OR CAPTURE THE NEXT STEP",
      "quote": "The unanswered call reaches Jenny. After the ring timeout configured with your phone provider, the call forwards to Jenny. She uses your greeting, approved knowledge and intake questions.",
      "note": "Illustrative routing—not a live phone-system configuration.",
      "fieldsEyebrow": "AFTER THE FALLBACK CALL",
      "fieldsTitle": "Your team should not have to start again.",
      "fieldsIntro": "Keep the caller’s purpose, collected information and requested next action together. Forwarding a call is only useful if someone can follow through.",
      "fields": [
        [
          "Caller’s purpose",
          "“I need to change my appointment.”"
        ],
        [
          "Details captured",
          "Existing appointment + preferred alternative"
        ],
        [
          "Next action",
          "Booking review or staff callback"
        ]
      ]
    },
    "preparation": [
      [
        "Phone routing",
        "Check forwarding support and configure busy or unanswered-call routing with your phone provider."
      ],
      [
        "Shared information",
        "Use the same services, opening hours and approved answers as your front desk."
      ],
      [
        "One handoff owner",
        "Define which team receives messages and when a caller needs a person instead."
      ]
    ],
    "boundary": "Forwarding behaviour depends on your phone provider and configuration. Test the full route, including unavailable contacts, before turning it on.",
    "cta": "Try the call your team cannot get to."
  },
  {
    "slug": "booking",
    "label": "Appointment booking",
    "agent": "jenny",
    "headline": "A booking request is the beginning. Confirmation is the finish.",
    "intro": "Collect the appointment details, check what your connected workflow supports and make the outcome clear. Never leave a caller guessing whether a time is confirmed.",
    "points": [
      "Appointment requests and rescheduling",
      "Calendar-aware availability",
      "Confirmation and follow-up workflows",
      "Human handoff for exceptions"
    ],
    "example": {
      "kind": "steps",
      "eyebrow": "FROM PREFERENCE TO OUTCOME",
      "title": "Three checks before “you’re booked.”",
      "steps": [
        [
          "01",
          "Request"
        ],
        [
          "02",
          "Availability"
        ],
        [
          "03",
          "Outcome"
        ]
      ],
      "tag": "DETAILS BEING COLLECTED",
      "quote": "Understand the appointment.",
      "fields": [
        [
          "Service",
          "Initial consultation"
        ],
        [
          "Preference",
          "Thursday afternoon"
        ],
        [
          "Contact",
          "Caller details verified as configured"
        ]
      ],
      "note": "A preferred time is not yet an available slot.",
      "pairTitleEyebrow": "WHAT THE CALLER SHOULD HEAR",
      "pairTitle": "Make pending and confirmed unmistakable.",
      "pair": [
        [
          "Confirmed",
          "“Your appointment is booked for the confirmed date and time.” Only after a successful scheduling action."
        ],
        [
          "Request received",
          "“I’ve recorded your preferred time. The team will need to confirm availability.” When availability or a booking cannot be confirmed."
        ]
      ]
    },
    "preparation": [
      [
        "Appointment rules",
        "Define accepted services, appointment lengths and which requests need staff review."
      ],
      [
        "Availability source",
        "Connect supported scheduling and confirm what it can read or update."
      ],
      [
        "Exceptions",
        "Set a callback route for unavailable times, rescheduling problems and unsupported requests."
      ]
    ],
    "boundary": "Confirm a booking only when the configured scheduling workflow has successfully created or updated it. Otherwise record a request for your team.",
    "cta": "Walk through your real booking rules."
  },
  {
    "slug": "property-outreach",
    "label": "Property owner outreach",
    "agent": "olivia",
    "headline": "A reason to call. A signal worth following up.",
    "intro": "Turn selected owner records into purposeful conversations about reports, listings and selling plans. Keep a polite decline separate from genuine interest in an agent callback.",
    "points": [
      "Scenario-based greeting",
      "Ordered consultation questions",
      "DNC and eligibility checks",
      "Report, appraisal and callback outcomes"
    ],
    "example": {
      "kind": "campaign",
      "eyebrow": "BEFORE THE FIRST DIAL",
      "title": "Choose the audience before the script.",
      "steps": [
        [
          "01 · Known owner records",
          "Select the contacts and saved property context relevant to this campaign."
        ],
        [
          "02 · Eligibility & DNC",
          "Review contact eligibility, exclusions and do-not-call status before outreach."
        ],
        [
          "03 · Schedule & purpose",
          "Set the calling window and choose a specific reason for the conversation."
        ]
      ],
      "tag": "SHAPE THE CONVERSATION · A USEFUL REASON TO PICK UP",
      "quote": "“Would an updated property report be useful?”",
      "fields": [
        [
          "Listen for",
          "Report interest + selling timeframe"
        ],
        [
          "Record",
          "Report request and agent callback preference"
        ]
      ],
      "note": "Illustrative conversation—not a live campaign.",
      "pairTitleEyebrow": "REVIEW RESULTS SEPARATELY",
      "pairTitle": "Reached is not interested. Interested is not booked.",
      "pair": [
        [
          "Reached",
          "A conversation took place."
        ],
        [
          "Interested",
          "The owner expressed a specific interest."
        ],
        [
          "Callback requested",
          "The owner wants the agent to follow up."
        ],
        [
          "Declined / DNC",
          "Respect the response and contact restrictions."
        ]
      ]
    },
    "preparation": [
      [
        "Eligible audience",
        "Select known contacts, check DNC status and review who belongs in the campaign."
      ],
      [
        "Conversation purpose",
        "Choose a report, stale-listing follow-up or appraisal conversation and the questions that support it."
      ],
      [
        "Follow-up responsibility",
        "Name the agent or team that reviews interest and confirms the next step."
      ]
    ],
    "boundary": "Keep contact eligibility and calling schedules under your control. A report request or appraisal enquiry is not a sale, valuation or confirmed appointment.",
    "cta": "Start with one owner conversation."
  }
];
