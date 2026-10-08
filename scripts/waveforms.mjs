// Draws each real recording's waveform from the audio itself: `node scripts/waveforms.mjs` (needs ffmpeg).
// Writes src/data/waveforms.json, one loudness value (8–100) per bar.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const BARS = 72;
const RATE = 8000;
const recordings = JSON.parse(readFileSync("src/data/recordings.json", "utf8"));
const out = {};
for (const rec of recordings) {
  const file = "public" + rec.audio.replace(/\.m4a$/, ".webm");
  const raw = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", String(RATE), "-f", "f32le", "-"], { maxBuffer: 1 << 28 });
  const pcm = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
  const size = Math.floor(pcm.length / BARS);
  const rms = Array.from({ length: BARS }, (_, i) => {
    let sum = 0;
    for (let k = i * size; k < (i + 1) * size; k++) sum += pcm[k] * pcm[k];
    return Math.sqrt(sum / size);
  });
  // Scaled to the loudest tenth of the call, so one loud moment doesn't flatten the rest.
  const ref = [...rms].sort((a, b) => a - b)[Math.floor(BARS * 0.9)] || 1;
  out[rec.id] = rms.map((v) => Math.round(8 + 92 * Math.min(1, Math.pow(v / ref, 0.8))));
}
writeFileSync("src/data/waveforms.json", JSON.stringify(out) + "\n");
console.log(Object.keys(out).map((k) => `${k}: ${out[k].length} bars`).join("\n"));
