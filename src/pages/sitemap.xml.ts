// sitemap.xml for search engines: every public page on the site.
import { INDUSTRIES } from "../data/industries";
import { SOLUTIONS } from "../data/solutions";
import { NEWS } from "../data/news";

const SITE = "https://jobgen.ai";
const pages = [
  "/", "/receptionist/", "/olivia/", "/recruiter-agent/", "/web-development/", "/pricing/", "/about/", "/demo/",
  "/industries/", ...INDUSTRIES.map((i) => `/industries/${i.slug}/`),
  "/solutions/", ...SOLUTIONS.map((s) => `/solutions/${s.slug}/`),
  "/partners/", "/news/", ...NEWS.map((n) => `/news/${n.slug}/`),
];

export function GET() {
  const urls = pages.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
