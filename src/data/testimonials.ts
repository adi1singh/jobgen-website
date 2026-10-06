// Copied word for word from the testimonials published on https://jobgen.ai.
// `product` decides which product page shows each quote.
export type Testimonial = { quote: string; name: string; detail: string; product: "jenny" | "olivia" | "jess" };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The phone stopped being the thing that interrupts the work. Jenny takes the call, handles what she can and passes on only what needs one of us.",
    name: "Mandar Gokhale",
    detail: "M&S Business Solutions · Accounting",
    product: "jenny",
  },
  {
    quote: "We put Jenny on our own front desk before we ever put her in front of a customer. Calls that used to ring out after hours now get answered, logged and booked.",
    name: "George Limberis",
    detail: "ONETEC Communications · Telecommunications",
    product: "jenny",
  },
  {
    quote: "Jess screens every applicant, not just the ones we get to before the day runs out. The shortlist is waiting in the morning instead of at the end of the week.",
    name: "Pri Gillett",
    detail: "Founder & Director · Prima Recruitment & Consultancy",
    product: "jess",
  },
  {
    quote: "A buyer rings about a listing at seven on a Saturday night. Jenny answers, works out what they are actually after and books the inspection — nothing sits in a voicemail until Monday.",
    name: "Multi Dynamic",
    detail: "Real Estate Agency",
    product: "jenny",
  },
  {
    quote: "Every owner enquiry gets a call the same day now. Olivia works the list, spots who is actually thinking of selling and books the appraisal before a competitor gets there.",
    name: "Buta Deogun",
    detail: "Buta Deogun Property · Real Estate",
    product: "olivia",
  },
  {
    quote: "Jess screens the whole pipeline and grades every candidate, so my consultants spend their day on the shortlist that is already qualified.",
    name: "Krystal",
    detail: "Jolie Recruitment · Recruitment",
    product: "jess",
  },
  {
    quote: "Between courses and student calls we never miss one now. Jenny handles the routine questions and passes on only what needs a person.",
    name: "McGill Institute",
    detail: "Education & Training",
    product: "jenny",
  },
];
