// The founder section on the home page.
//
// Facts below are from https://jobgen.ai/about/. The note, mission and vision are a PLACEHOLDER
// written from those facts, live for now and to be replaced with Kush's own words. The section
// only shows when `approved` is true AND a photo is set; with `approved: false` it can still be
// previewed with ?founder=preview at the end of the address.
export const FOUNDER = {
  name: "Kushagra (Kush) Bhatia",
  shortName: "Kush",
  title: "Founder & CEO, JobGen AI Pty Ltd",
  // Portrait photo in public/team/, 4:5 (720×900 or larger).
  photo: "/team/kush.webp" as string,
  photoAlt: "Kush Bhatia, founder and CEO of JobGen.AI",
  linkedin: "",
  // Placeholder words, approved to go live until Kush sends his own. Each string is a paragraph.
  approved: true,
  note: [
    "I started JobGen.AI in Sydney in 2024 to help people find work faster. Building our job-search assistant taught me how much good work gets lost in the gaps: the call nobody was free to answer, the candidate nobody got back to, the owner nobody followed up.",
    "So we built specialists for those gaps. Jenny answers the phone. Olivia follows up the owners already on your list. Jess screens every applicant. Not to replace your team, but to give them back the hours for the work only people can do.",
    "If something is falling through the gaps in your business, I’d like to hear about it.",
  ],
  mission: "No business should lose a customer, a candidate or a listing because nobody was free to pick up.",
  vision: "An AI workforce that any business can put to work, alongside the people it already has.",
  signoff: "Kush",
};
