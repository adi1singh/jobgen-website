// Serves the built site like Vercel does: index.html for folders, 404.html for anything missing, and
// byte ranges, so the recordings can be seeked. Usage: node tests/uat/serve.mjs dist 8770
import { createServer } from "node:http";
import { createReadStream, statSync, existsSync } from "node:fs";
import { join, extname, normalize } from "node:path";
const [root, port] = [process.argv[2] || "dist", Number(process.argv[3] || 8770)];
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json", ".webmanifest": "application/manifest+json", ".webm": "audio/webm", ".m4a": "audio/mp4", ".jpg": "image/jpeg", ".xml": "application/xml", ".txt": "text/plain", ".pdf": "application/pdf", ".ico": "image/x-icon" };
createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404, { "content-type": "text/html" }); return createReadStream(join(root, "404.html")).pipe(res); }
  const size = statSync(file).size;
  const type = TYPES[extname(file)] || "application/octet-stream";
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || "");
  if (range) {
    const start = range[1] ? Number(range[1]) : size - Number(range[2]);
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    res.writeHead(206, { "content-type": type, "accept-ranges": "bytes", "content-range": `bytes ${start}-${end}/${size}`, "content-length": end - start + 1 });
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { "content-type": type, "accept-ranges": "bytes", "content-length": size });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Serving ${root} on http://localhost:${port}`));
