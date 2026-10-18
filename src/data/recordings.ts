// Real recordings/transcripts retained from the published JobGen sites.
// Voice labels verified against jobgen.ai production call-library metadata, 19 Oct 2026.
// `product` decides which page shows each one. The restaurant and child care calls are outbound
// follow-ups with no dedicated product assignment; both remain available in /calls/.
import data from "./recordings.json";

export type Recording = (typeof data)[number] & { product: "jenny" | "olivia" | null };

const PRODUCT: Record<string, Recording["product"]> = {
  "inbound-appointment": "jenny",
  "education-support": "jenny",
  "property-report": "olivia",
  "property-listing": "olivia",
  "restaurant-booking": null,
  "daycare-tour": null,
};

// Library IDs differ from the published sales-property-report/stale-listing IDs.
export const RECORDING_VOICES: Record<string, string> = {
  "inbound-appointment": "Jenny",
  "education-support": "Jenny",
  "property-report": "Olivia",
  "property-listing": "Leo",
  "restaurant-booking": "Mark",
  "daycare-tour": "Olivia",
};
export const recordingVoice = (rec: Pick<Recording, "id">) => RECORDING_VOICES[rec.id] ?? "AI";

export const RECORDINGS: Recording[] = data.map((r) => ({ ...r, product: PRODUCT[r.id] ?? null }));
