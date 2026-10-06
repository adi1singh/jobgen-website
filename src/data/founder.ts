// The founder section on the home page.
//
// Facts below are from https://jobgen.ai/about/. The personal note is a DRAFT written from those
// facts for Kush to rewrite in his own words. It stays hidden on the live site until `approved`
// is true AND a photo is added. Preview it with ?founder=preview at the end of the address.
export const FOUNDER = {
  name: "Kushagra (Kush) Bhatia",
  shortName: "Kush",
  title: "Founder & CEO, JobGen AI Pty Ltd",
  // Put the photo in public/team/ (e.g. public/team/kush.jpg, square, at least 600×600) and set the path.
  photo: "" as string,
  photoAlt: "Kush Bhatia, founder and CEO of JobGen.AI",
  linkedin: "",
  approved: false,
  // Draft for Kush to edit. Each string is a paragraph.
  note: [
    "I started JobGen.AI in Sydney in 2024 to help people find work faster. Building our job-search assistant taught me how much good work gets lost in the gaps: the call nobody was free to answer, the candidate nobody got back to, the owner nobody followed up.",
    "So we built specialists for those gaps. Jenny answers the phone. Olivia follows up the owners already on your list. Jess screens every applicant. Not to replace your team, but to give them back the hours for the work only people can do.",
  ],
  mission: "No business should lose a customer, a candidate or a listing because nobody was free to pick up.",
  vision: "An AI workforce that any business can put to work, alongside the people it already has.",
  signoff: "Kush",
};
