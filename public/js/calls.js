/*
  Scripted example calls, played in the phone when a visitor chooses
  "Or just listen to a full example call" in the interactive demo.

  These are simulated: fictional businesses, people and phone numbers
  (0491 570 xxx is reserved for fictional use in Australia). Real recordings
  don't go here; add them to proof.js so they appear under "Hear the real Jenny".

  Each call needs `name` (matching tryit.js), `lines` and a `summary`. The
  summary row named "Sent to" becomes the "Would go to" line in the demo.
*/
window.JOBGEN_CALLS = {
  education: {
    business: "Northside College · Front office",
    title: "A parent asks about Year 7 enrolment.",
    copy: "Jenny answers the enrolment question, books a campus tour and passes everything to admissions while the parent is still on the line.",
    outcomes: ["Enrolment question answered", "Campus tour booked", "Admissions team notified"],
    lines: [
      { who: "ai", text: "Good morning, you’ve reached Northside College. This is Jenny, the college’s AI assistant. How can I help?" },
      { who: "caller", text: "Hi, I’m looking at enrolling my daughter for Year 7 next year." },
      { who: "ai", text: "Lovely. Year 7 enrolments are open now. Would you like to book a campus tour? We run them Tuesdays and Thursdays." },
      { who: "caller", text: "Thursday would be great." },
      { who: "ai", text: "Perfect. Can I take your name, your daughter’s name and the best number to reach you?" },
      { who: "caller", text: "Priya Shah, my daughter is Anaya, and it’s 0491 570 156." },
      { who: "ai", text: "Thanks, Priya. You’re booked for Thursday at 10am, and I’ve sent your details to admissions. A confirmation text is on its way." },
    ],
    summary: [
      ["Intent", "Year 7 enrolment enquiry"],
      ["Caller", "Priya Shah · 0491 570 156"],
      ["Student", "Anaya · starting Year 7 next year"],
      ["Booked", "Campus tour · Thursday 10:00am"],
      ["Sent to", "Admissions team"],
    ],
  },

  property: {
    business: "Harbour & Co Realty · Sales",
    title: "A buyer calls about a new listing.",
    copy: "Jenny confirms the listing, registers the buyer for the open home and flags a hot lead to the listing agent for a same-day callback.",
    outcomes: ["Listing details confirmed", "Open home registration", "Priority callback for the agent"],
    lines: [
      { who: "ai", text: "Thanks for calling Harbour & Co Realty, this is Jenny, the agency’s AI assistant. How can I help?" },
      { who: "caller", text: "Hi, I saw the three-bedroom on Elm Street online. Is it still available?" },
      { who: "ai", text: "It is. There’s an open home this Saturday from 11 to 11:30. Would you like me to register you?" },
      { who: "caller", text: "Yes please. I’d also like to know if the owners would consider an offer before auction." },
      { who: "ai", text: "Good question. I’ll pass that straight to Sam, the listing agent, so he can call you today. Can I take your name and number?" },
      { who: "caller", text: "Daniel Reid, 0491 570 158." },
      { who: "ai", text: "Thanks, Daniel. You’re registered for Saturday, and Sam will call you this afternoon." },
    ],
    summary: [
      ["Intent", "Buyer enquiry · 3-bed, Elm Street"],
      ["Caller", "Daniel Reid · 0491 570 158"],
      ["Booked", "Open home · Saturday 11:00am"],
      ["Flag", "Wants to offer before auction"],
      ["Sent to", "Sam, listing agent · callback today"],
    ],
  },

  restaurant: {
    business: "Luca’s Trattoria · Reservations",
    title: "A guest books a table for Friday night.",
    copy: "Jenny finds a time that works, notes a dietary requirement for the kitchen and confirms the booking by text, all during the dinner rush.",
    outcomes: ["Table booked", "Dietary note for the kitchen", "Confirmation sent by text"],
    lines: [
      { who: "ai", text: "Ciao, Luca’s Trattoria, this is Jenny, the restaurant’s AI assistant. How can I help?" },
      { who: "caller", text: "Hi, can I book a table for six this Friday, around 7?" },
      { who: "ai", text: "Let me check. I have 7:15 available for six. Would that work?" },
      { who: "caller", text: "Perfect. One of us is gluten-free, is that okay?" },
      { who: "ai", text: "Absolutely. Most of our pasta can be made gluten-free, and I’ll note it for the kitchen. What name is the booking under?" },
      { who: "caller", text: "Emma Clarke." },
      { who: "ai", text: "Lovely, Emma. Table for six, Friday at 7:15, gluten-free noted. We’ll text you a confirmation." },
    ],
    summary: [
      ["Intent", "Dinner reservation"],
      ["Guest", "Emma Clarke · party of 6"],
      ["Booked", "Friday · 7:15pm"],
      ["Notes", "1 × gluten-free"],
      ["Sent to", "Booking system + kitchen notes"],
    ],
  },

  childcare: {
    business: "Little Acorns Early Learning · Enquiries",
    title: "A parent looks for care before returning to work.",
    copy: "Jenny checks the details that matter, adds the child to the waitlist and books a centre tour, then gives the director everything they need.",
    outcomes: ["Needs and days captured", "Waitlist and centre tour", "Director follow-up arranged"],
    lines: [
      { who: "ai", text: "Hello, Little Acorns Early Learning, this is Jenny, the centre’s AI assistant. How can I help?" },
      { who: "caller", text: "Hi, I’m going back to work in March and need care for my son, three days a week." },
      { who: "ai", text: "Congratulations on the return. How old will he be, and which days were you thinking?" },
      { who: "caller", text: "He’ll be two, and Monday, Wednesday and Friday would be ideal." },
      { who: "ai", text: "Our toddler room has limited spots, so I’ll add him to the waitlist and book you a tour to meet the educators. Does Tuesday at 9:30 suit?" },
      { who: "caller", text: "That works. I’m Hannah Lee, 0491 570 159." },
      { who: "ai", text: "Thank you, Hannah. Your tour is booked for Tuesday at 9:30, and our director will call you about March availability." },
    ],
    summary: [
      ["Intent", "New enrolment · toddler room"],
      ["Parent", "Hannah Lee · 0491 570 159"],
      ["Child", "Age 2 · Mon, Wed, Fri from March"],
      ["Booked", "Centre tour · Tuesday 9:30am"],
      ["Sent to", "Centre director · waitlist added"],
    ],
  },

  trades: {
    business: "Kestrel Plumbing · After hours",
    title: "A homeowner calls about a burst pipe at night.",
    lines: [
      { who: "ai", text: "Kestrel Plumbing, this is Jenny, the team’s AI assistant. How can I help?" },
      { who: "caller", text: "Hi, a pipe under my kitchen sink has burst. There’s water everywhere." },
      { who: "ai", text: "I’m sorry, that’s stressful. If you can, turn off the water at the stopcock, usually under the sink or near the meter. Is that off now?" },
      { who: "caller", text: "Okay, it’s off. It’s 14 Elm Road, Brunswick." },
      { who: "ai", text: "Thank you. I’m marking this urgent and passing it to our on-call plumber now. Can I take your name?" },
      { who: "caller", text: "Tom Nguyen, 0491 570 157." },
      { who: "ai", text: "Thanks, Tom. Our on-call plumber will ring you back within 15 minutes. Keep the water off until then." },
    ],
    summary: [
      ["Intent", "Burst pipe · urgent"],
      ["Caller", "Tom Nguyen · 0491 570 157"],
      ["Address", "14 Elm Road, Brunswick"],
      ["Advice given", "Water turned off at stopcock"],
      ["Sent to", "On-call plumber · callback in 15 min"],
    ],
  },
};
