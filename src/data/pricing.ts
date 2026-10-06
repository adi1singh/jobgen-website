// The per-conversation price estimator, copied exactly from https://sales.jobgen.ai/pricing
// (assets/index-BpDkzRau.js, October 2026). Prices are set in USD. Keep these numbers in step
// with that page: change them here and the pricing page, its defaults and its examples follow.

export type Direction = "inbound" | "outbound";
export type Telephone = "existing" | "managed";
export type NumberType = "local" | "mobile";

export const DIRECTIONS = [
  { id: "inbound", label: "Inbound", detail: "Customer calls your number" },
  { id: "outbound", label: "Outbound", detail: "Your campaign calls the customer" },
] as const;

type Rates = {
  detail: string;
  conversationBase: number;
  conversationGrowth: number;
  ttsPerMinute: number;
  sttPerMinute: number;
};

export const PRODUCTS: { id: string; label: string; detail: string; inbound: Rates; outbound: Rates }[] = [
  {
    id: "property",
    label: "Property",
    detail: "Real-estate receptionist and outreach",
    inbound: { detail: "Inbound receptionist", conversationBase: 0.104, conversationGrowth: 0.027, ttsPerMinute: 0.026, sttPerMinute: 0.0087 },
    outbound: { detail: "Outbound outreach", conversationBase: 0.066, conversationGrowth: 0.024, ttsPerMinute: 0.026, sttPerMinute: 0.0087 },
  },
  {
    id: "education",
    label: "Education",
    detail: "Student services and outreach",
    inbound: { detail: "Inbound student services", conversationBase: 0.111, conversationGrowth: 0.022, ttsPerMinute: 0.026, sttPerMinute: 0.0087 },
    outbound: { detail: "Outbound student outreach", conversationBase: 0.052, conversationGrowth: 0.019, ttsPerMinute: 0.026, sttPerMinute: 0.0087 },
  },
  {
    id: "accounting",
    label: "Accounting",
    detail: "Receptionist and tax workflows",
    inbound: { detail: "Inbound receptionist / tax", conversationBase: 0.194, conversationGrowth: 0.037, ttsPerMinute: 0.026, sttPerMinute: 0.0087 },
    outbound: { detail: "Outbound service follow-up", conversationBase: 0.194, conversationGrowth: 0.037, ttsPerMinute: 0.026, sttPerMinute: 0.0087 },
  },
];

export const MODELS = [
  { id: "gpt-5.5", label: "GPT-5.5", detail: "Flagship", multiplier: 1.55 },
  { id: "gpt-5.4-mini", label: "GPT-5.4 mini", detail: "Balanced", multiplier: 0.5 },
  { id: "gpt-4.1", label: "GPT-4.1", detail: "Reliable", multiplier: 1.15 },
  { id: "gpt-4.1-mini", label: "GPT-4.1 mini", detail: "Efficient", multiplier: 0.55 },
  { id: "gpt-4o", label: "GPT-4o", detail: "Recommended", multiplier: 1 },
  { id: "gpt-4o-mini", label: "GPT-4o mini", detail: "Lowest price", multiplier: 0.3 },
];

export const VOICES = [
  { id: "eleven-flash", label: "ElevenLabs Flash / Turbo", detail: "Natural conversational voice", multiplier: 1 },
  { id: "eleven-v3-conversational", label: "ElevenLabs v3 Conversational", detail: "Natural conversational voice", multiplier: 1 },
  { id: "eleven-v3", label: "ElevenLabs v3", detail: "Expressive voice generation", multiplier: 2 },
];

export const TRANSCRIPTION = [
  { id: "scribe-realtime", label: "ElevenLabs Scribe v2 Realtime", detail: "Realtime transcription", multiplier: 1 },
  { id: "scribe", label: "ElevenLabs Scribe v2", detail: "Accurate transcription", multiplier: 0.56 },
  { id: "gpt-live-transcribe", label: "GPT live transcribe", detail: "Realtime transcription", multiplier: 0.044 },
  { id: "gpt-4o-mini-transcribe", label: "GPT-4o mini transcribe", detail: "Accurate transcription", multiplier: 0.008 },
];

// JobGen Telephone: monthly rental per number, and per-minute usage by call direction.
export const PHONE: Record<NumberType, { label: string; monthly: number; inbound: number; outbound: number }> = {
  local: { label: "Landline", monthly: 4.05, inbound: 0.0135, outbound: 0.034 },
  mobile: { label: "Mobile", monthly: 11.14, inbound: 0.0675, outbound: 0.1013 },
};
// Audio streaming, per minute, when JobGen Telephone connects the call to the assistant.
export const STREAMING_PER_MINUTE = 0.0059;

export const DEFAULTS = {
  direction: "outbound" as Direction,
  product: "property",
  calls: 100,
  minutes: 1.34,
  model: "gpt-4o",
  voice: "eleven-flash",
  transcription: "scribe-realtime",
  telephone: "managed" as Telephone,
  numberType: "mobile" as NumberType,
  numbers: 1,
  streaming: true,
};
export type Setup = typeof DEFAULTS;

const pick = <T extends { id: string }>(list: T[], id: string) => list.find((x) => x.id === id) ?? list[0];

/** Price of one conversation of `minutes`, split into its parts (USD). */
export function perConversation(s: Setup, minutes: number) {
  const product = pick(PRODUCTS, s.product);
  const r = product[s.direction] ?? product.outbound;
  const phone = PHONE[s.numberType];
  const managed = s.telephone === "managed";
  const m = Math.max(0, Number(minutes) || 0);
  const ai = m * (r.conversationBase + (r.conversationGrowth * m) / 2) * pick(MODELS, s.model).multiplier;
  const voice = m * r.ttsPerMinute * pick(VOICES, s.voice).multiplier + m * r.sttPerMinute * pick(TRANSCRIPTION, s.transcription).multiplier;
  const line = managed ? m * (s.direction === "inbound" ? phone.inbound : phone.outbound) + (s.streaming ? m * STREAMING_PER_MINUTE : 0) : 0;
  return { ai, voice, line, total: ai + voice + line };
}

/** The full estimate as shown on sales.jobgen.ai (USD). Call length is floored at 15 seconds. */
export function estimate(s: Setup) {
  const per = perConversation(s, Math.max(0.25, Number(s.minutes) || 0.25));
  const rental = s.telephone === "managed" ? PHONE[s.numberType].monthly * Math.max(0, Number(s.numbers) || 0) : 0;
  return { per, rental, monthly: per.total * Number(s.calls) + rental };
}

export const fmtUSD = (n: number, digits = 2) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(
    Number.isFinite(n) ? n : 0,
  );
