// Real call recordings, copied with their transcripts from https://sales.jobgen.ai (#recordings),
// where they're published as real recordings with personal details omitted.
// `product` decides which page shows each one. The restaurant and child care calls are outbound
// follow-ups whose product is still to be confirmed, so no page shows them yet.
import data from "./recordings.json";

export type Recording = (typeof data)[number] & { product: "jenny" | "olivia" | null };

const PRODUCT: Record<string, Recording["product"]> = {
  "education-support": "jenny",
  "property-report": "olivia",
  "property-listing": "olivia",
  "restaurant-booking": null,
  "daycare-tour": null,
};

export const RECORDINGS: Recording[] = data.map((r) => ({ ...r, product: PRODUCT[r.id] ?? null }));
