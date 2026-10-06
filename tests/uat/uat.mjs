// User acceptance tests for the JOBGEN.AI site, played as real visitors with real goals.
// See tests/uat/README.md. Usage: node tests/uat/uat.mjs [baseURL] [outDir]
// Needs Playwright (with Chromium) and axe-core: npm i --no-save playwright axe-core && npx playwright install chromium
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { extname } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");

const BASE = process.argv[2] || "http://localhost:8770";
const OUT = process.argv[3] || "./tests/uat/out";
mkdirSync(OUT, { recursive: true });
const AXE = readFileSync(process.env.AXE_PATH || require.resolve("axe-core/axe.min.js"), "utf8");
const PAGES = ["/", "/receptionist/", "/olivia/", "/recruiter-agent/", "/web-development/", "/pricing/", "/about/", "/demo/",
  "/industries/", "/industries/property/", "/industries/plumbing/", "/industries/electricians/", "/industries/accounting/",
  "/industries/medical/", "/industries/legal/", "/industries/automotive/", "/industries/home-services/",
  "/solutions/", "/solutions/after-hours/", "/solutions/overflow/", "/solutions/booking/", "/solutions/property-outreach/",
  "/partners/", "/news/", "/news/australia-job-market-2026/"];
const results = [];
let current = "";
const check = (name, ok, detail = "") => {
  results.push({ uat: current, name, ok: !!ok, detail: String(detail ?? "") });
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};
const section = (t) => { current = t; console.log("\n" + t); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const aud = (v) => "A$" + Math.round(v).toLocaleString("en-AU");
const calcModel = (calls, missedPct, conv, value) => {
  const missedMonth = Math.round(((calls * missedPct) / 100) * 22);
  const customers = Math.round((missedMonth * conv) / 100);
  return { missedMonth, customers, total: customers * value };
};

const b = await chromium.launch();
const external = [];
async function ctx(opts = {}, { fx = "ok" } = {}) {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  await c.route(/calendly\.com/, (r) => r.fulfill({ status: 200, contentType: "text/html", body: "<body style='margin:0;background:#fff;font:20px sans-serif;display:grid;place-items:center;height:100vh'>Calendly calendar</body>" }));
  await c.route(/api\.frankfurter\.dev/, (r) => fx === "ok"
    ? r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ amount: 1, base: "USD", date: "2026-10-06", rates: { AUD: 1.4322 } }) })
    : r.abort());
  c.on("request", (req) => { const u = req.url(); if (!u.startsWith(BASE) && !/calendly|frankfurter|fonts\.g|data:/.test(u)) external.push(u); });
  return c;
}
async function page(c, path) {
  const p = await c.newPage();
  p.errors = [];
  p.on("pageerror", (e) => p.errors.push(e.message));
  p.on("console", (m) => m.type() === "error" && !/calendly|Failed to load resource|net::ERR/.test(m.text()) && p.errors.push(m.text()));
  await p.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await p.waitForLoadState("load");
  return p;
}
const inView = (p, sel) => p.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight, visible: r.top < innerHeight && r.bottom > 0 }; }, sel);
const settle = (p) => p.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });

/* ================= UAT-1: Sarah, clinic owner, on her phone ================= */
section("UAT-1 · Sarah, dental clinic owner, phone (390×844): “What is this, can I trust it, how do I book?”");
{
  const c = await ctx({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await page(c, "/");
  await wait(1800);
  const h1 = await p.locator("h1").innerText();
  const hero = await inView(p, ".hero");
  check("Understands the offer in 5 seconds: headline says what it is", /Grow your business\s+with an AI workforce/i.test(h1), h1.replace(/\s+/g, " "));
  check("Primary CTA visible without scrolling (Fitts/primacy)", (await inView(p, ".hero-actions .btn-light")).bottom <= 844);
  check("Jenny, Olivia and Jess fully readable on first screen", (await inView(p, ".team-strip")).bottom <= 844, JSON.stringify(await inView(p, ".team-strip")));
  check("No cream strip peeking under the hero", hero.bottom >= 843, `hero bottom ${hero.bottom}`);
  await p.screenshot({ path: `${OUT}/uat1-first-screen.png` });
  await p.locator(".hero-actions a", { hasText: "Hear a real call" }).tap();
  await wait(1200);
  const listen = await inView(p, "#listen");
  check("“Hear a real call” takes her straight to the recordings", listen && listen.top < 200 && listen.top > -400, JSON.stringify(listen));
  const played = await p.locator("audio").first().evaluate(async (a) => { a.muted = true; try { await a.play(); } catch (e) { return "play failed: " + e.message; } await new Promise((r) => setTimeout(r, 2500)); a.pause(); return a.currentTime; });
  check("The real recording actually plays", typeof played === "number" && played > 1, `currentTime ${played}`);
  check("Transcript opens and follows along when playing", await p.locator("[data-recording] details").first().evaluate((d) => d.open) && (await p.locator("li.is-now").count()) > 0);
  check("Recording is labelled REAL and says personal details are removed", (await p.locator(".real-tag").count()) >= 2 && /personal details removed/i.test(await p.locator("#listen").innerText()));
  await p.locator(".header-book").tap();
  await wait(1500);
  const cal = await inView(p, "#book");
  check("Header “Book a demo” lands her on the calendar", cal && cal.top >= 0 && cal.top < 260, JSON.stringify(cal));
  check("Calendar starts loading on tap", !!(await p.locator("#book iframe").getAttribute("src")));
  await p.screenshot({ path: `${OUT}/uat1-calendar.png` });
  // tap targets: buttons and button-like links
  const small = await p.evaluate(() => [...document.querySelectorAll("button, .btn, .menu-btn, input, summary, .nav-start, .lead-alt, .member-link, .picker a")]
    .filter((el) => el.offsetParent && !el.closest("[hidden]") && !el.matches(".lead-hp *"))
    .map((el) => { const r = el.getBoundingClientRect(); return { el: (el.className || el.tagName).toString().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) }; })
    .filter((x) => x.h < 44 && !/slider|range/.test(x.el)));
  check("Tap targets at least 44px tall (Fitts)", small.length === 0, JSON.stringify(small.slice(0, 8)));
  check("No script errors", p.errors.length === 0, p.errors.join(" | "));
  await c.close();
}

/* ================= UAT-2: Raj, real estate principal, desktop ================= */
section("UAT-2 · Raj, real estate principal, desktop (1440×900): “Is Olivia for agencies like mine?”");
{
  const c = await ctx();
  const p = await page(c, "/");
  await p.locator(".nav-trigger").click();
  check("AI workforce menu opens and names Olivia’s role", /Olivia\s*AI sales agent for real estate/i.test(await p.locator("#workforce-menu").innerText()));
  await p.locator("#workforce-menu a", { hasText: "Olivia" }).click();
  await p.waitForURL("**/olivia/");
  await wait(1200);
  check("Olivia’s page badge says “AI sales agent for real estate”", /AI sales agent for real estate/.test(await p.locator(".product").innerText()));
  check("Olivia’s page has its own colour (amber hero)", (await p.evaluate(() => getComputedStyle(document.body).getPropertyValue("--p1").trim())) === "#f2b552");
  await settle(p);
  await p.locator(".ol-board").scrollIntoViewIfNeeded();
  await wait(15500);
  const totals = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll("[data-ol-total]")].map((d) => [d.dataset.olTotal, +d.textContent])));
  const called = await p.locator("[data-ol-called]").textContent();
  check("Her list animation completes all owners", called === "7", `called ${called}/7`);
  check("Counters match the rows (hot 2, warm 3, reports 2, booked 3)", totals.hot === 2 && totals.warm === 3 && totals.report === 2 && totals.booked === 3, JSON.stringify(totals));
  await p.locator(".ol-board").screenshot({ path: `${OUT}/uat2-olivia-list.png` });
  check("Animation is clearly labelled as a simulation", /Simulated example/.test(await p.locator(".ol-board").innerText()));
  await p.locator(".sig-note a").click();
  await wait(1000);
  const proof = await inView(p, "#proof");
  check("“Hear a real Olivia call” jumps to her real recordings", proof && proof.top < 200 && proof.top > -400, JSON.stringify(proof));
  check("Two real Olivia recordings present", (await p.locator("#proof [data-recording]").count()) === 2);
  await p.locator(".hero-actions .btn-light").scrollIntoViewIfNeeded();
  await p.locator(".hero-actions .btn-light").click();
  await wait(1500);
  const cal = await inView(p, "#book");
  check("Book a demo lands on the calendar", cal && cal.top >= 0 && cal.top < 260, JSON.stringify(cal));
  check("No script errors", p.errors.length === 0, p.errors.join(" | "));
  // Raj also checks the property industry page
  const pi = await page(c, "/industries/property/");
  check("Property industry page is Olivia’s (badge + amber)", /Olivia/.test(await pi.locator(".product").innerText()) && (await pi.evaluate(() => document.body.dataset.persona)) === "olivia");
  const tabs = pi.locator('[role="tab"]');
  await tabs.nth(1).click();
  check("Example tabs switch the example", (await pi.locator('[role="tabpanel"]:not([hidden])').getAttribute("id")) === "case-1");
  await tabs.nth(1).focus(); await pi.keyboard.press("ArrowRight");
  check("Example tabs work with arrow keys", (await pi.locator('[role="tabpanel"]:not([hidden])').getAttribute("id")) === "case-2");
  await c.close();
}
section("UAT-2b · Dana, plumbing business owner, phone: “Will it handle an urgent job?”");
{
  const c = await ctx({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await page(c, "/");
  await p.locator(".menu-btn").tap();
  await p.locator("#mobile-menu a", { hasText: "Industries" }).tap();
  await p.waitForURL("**/industries/");
  await p.locator('a[href="/industries/plumbing/"]').tap();
  await p.waitForURL("**/industries/plumbing/");
  const body = await p.locator("main").innerText();
  check("Plumbing page uses Jenny, never the old receptionist name", /Jenny/.test(body) && !/Olivia/.test(body.replace(/Olivia · AI sales agent for real estate/g, "")), "");
  check("Plumbing example shows an urgent leak and what she won’t promise", /water coming through/i.test(body) && /Do not promise dispatch/i.test(body));
  check("Says where Jenny stops", /WHERE JENNY STOPS/.test(body));
  await p.locator(".hero-actions a", { hasText: "See an example" }).tap(); await wait(1000);
  const ex = await inView(p, "#example");
  check("“See an example” jumps to the example", ex && ex.top < 200 && ex.top > -400, JSON.stringify(ex));
  await p.locator(".explore-solution").first().tap();
  await p.waitForURL("**/solutions/**");
  check("Related solution link works", /\/solutions\//.test(p.url()), p.url());
  check("No script errors", p.errors.length === 0, p.errors.join(" | "));
  await c.close();
}

/* ================= UAT-3: Mia, ops manager, uses the calculator on her phone ================= */
section("UAT-3 · Mia, ops manager, phone (360×740): “What are missed calls costing us?”");
{
  const c = await ctx({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await page(c, "/");
  const sent = [];
  p.on("request", (r) => r.method() === "POST" && sent.push(r.url()));
  await settle(p);
  await p.locator("#cost").scrollIntoViewIfNeeded();
  check("No number before she asks for it (calculate gate)", await p.locator("[data-calc-reveal]").isHidden());
  await p.locator("#in-calls").fill("50");
  await p.locator("#in-missed").fill("25");
  check("Slider labels update as she drags", (await p.locator("#out-calls").textContent()) === "50" && (await p.locator("#out-missed").textContent()) === "25%");
  check("Still no number while dragging", await p.locator("[data-calc-reveal]").isHidden());
  await p.locator("[data-calc-go]").tap();
  await wait(700);
  const mid = await p.locator(".calc-assumptions li.is-shown").count();
  check("Working is revealed step by step (goal-gradient)", mid >= 1 && mid < 3, `${mid} of 3 shown after 0.7s`);
  await wait(2800);
  const m = calcModel(50, 25, 33, 150);
  check("Estimate is correct", (await p.locator("#calc-number").textContent()) === aud(m.total), `${await p.locator("#calc-number").textContent()} vs ${aud(m.total)}`);
  const working = (await p.locator(".calc-assumptions").innerText()).replace(/\s+/g, " ");
  check("Working shows each step with her numbers", working.includes(`= ${m.missedMonth.toLocaleString("en-AU")} missed calls a month`) && working.includes(`= ${m.customers} new customers`), working);
  await p.locator(".calc").screenshot({ path: `${OUT}/uat3-calculated.png` });
  // form: empty, bad email, bad phone, good
  await p.locator("[data-lead-submit]").tap();
  const emailErr = await p.evaluate(() => { const i = document.querySelector('[name="email"]'); const id = i.getAttribute("aria-describedby"); return { invalid: i.getAttribute("aria-invalid"), msg: id ? document.getElementById(id)?.textContent : null, focused: document.activeElement === i }; });
  check("Empty submit: email flagged, message next to the field, focus moved there", emailErr.invalid === "true" && !!emailErr.msg && emailErr.focused, JSON.stringify(emailErr));
  await p.locator('[name="email"]').fill("mia@clinic");
  await p.locator('[name="phone"]').fill("0412 345 678");
  await p.locator("[data-lead-submit]").tap();
  check("Bad email (no domain ending) is caught", (await p.locator('[name="email"]').getAttribute("aria-invalid")) === "true");
  await p.locator('[name="email"]').fill("mia@clinic.com.au");
  await p.locator('[name="phone"]').fill("12 34");
  await p.locator("[data-lead-submit]").tap();
  check("Too-short phone is caught", (await p.locator('[name="phone"]').getAttribute("aria-invalid")) === "true");
  await p.locator('[name="phone"]').fill("+61 412 345 678");
  check("Error clears as soon as she fixes it", (await p.locator('[name="phone"]').getAttribute("aria-invalid")) !== "true");
  await p.locator("[data-lead-submit]").tap();
  await wait(500);
  check("Thank-you state shows", await p.locator("[data-lead-done]").isVisible());
  check("Honest: preview note says nothing was sent", await p.locator("[data-lead-preview]").isVisible());
  check("Honest: no request was actually sent anywhere", sent.length === 0, sent.join(", "));
  await p.locator("[data-lead-done]").screenshot({ path: `${OUT}/uat3-thanks.png` });
  await p.locator("#in-value").fill("400");
  check("Changing a number hides the stale estimate", await p.locator("[data-calc-reveal]").isHidden());
  check("…and tells her to recalculate", await p.locator("[data-calc-stale]").isVisible() && (await p.locator("[data-calc-go-label]").textContent()) === "Recalculate");
  check("No script errors", p.errors.length === 0, p.errors.join(" | "));
  await c.close();

  // Ironclad maths: random and extreme inputs (reduced motion so the result is immediate)
  const c2 = await ctx({ viewport: { width: 320, height: 640 }, reducedMotion: "reduce", isMobile: true });
  const p2 = await page(c2, "/");
  const cases = [[5, 5, 5, 20], [200, 60, 80, 2000], [30, 20, 33, 150]];
  for (let i = 0; i < 12; i++) cases.push([5 * (1 + Math.floor(Math.random() * 40)), 5 * (1 + Math.floor(Math.random() * 12)), 5 + Math.floor(Math.random() * 76), 20 + 10 * Math.floor(Math.random() * 199)]);
  let bad = [];
  for (const [a, m_, cv, v] of cases) {
    await p2.locator("#in-calls").fill(String(a));
    await p2.locator("#in-missed").fill(String(m_));
    await p2.locator("#in-conv").fill(String(cv));
    await p2.locator("#in-value").fill(String(v));
    await p2.locator("[data-calc-go]").click();
    await wait(120);
    const want = calcModel(a, m_, cv, v);
    const got = await p2.locator("#calc-number").textContent();
    const as = await p2.locator("#as-total").textContent();
    if (got !== aud(want.total) || as !== aud(want.total)) bad.push(`${a}/${m_}%/${cv}%/A$${v}: got ${got} (${as}) want ${aud(want.total)}`);
  }
  check(`Maths is right for ${cases.length} input combinations incl. extremes`, bad.length === 0, bad.join(" | "));
  await p2.locator("#in-calls").fill("200"); await p2.locator("#in-missed").fill("60"); await p2.locator("#in-conv").fill("80"); await p2.locator("#in-value").fill("2000");
  await p2.locator("[data-calc-go]").click(); await wait(200);
  check("Largest result fits a 320px phone", (await p2.evaluate(() => document.documentElement.scrollWidth)) <= 320);
  await p2.locator(".calc-result").screenshot({ path: `${OUT}/uat3-max-320.png` });
  await p2.locator("#in-calls").fill("5"); await p2.locator("#in-missed").fill("5"); await p2.locator("#in-conv").fill("5"); await p2.locator("#in-value").fill("20");
  await p2.locator("[data-calc-go]").click(); await wait(200);
  const tiny = (await p2.locator(".calc-result").innerText()).replace(/\s+/g, " ");
  check("Tiny inputs don’t produce a confusing A$0 dead end", !/A\$0 a month|^.*A\$0\b/.test(tiny) || /less than one/i.test(tiny), tiny);
  await c2.close();
}

/* ================= UAT-4: Keyboard-only visitor + accessibility audit ================= */
section("UAT-4 · Sam, keyboard-only visitor (1280×720) + automated accessibility audit");
{
  const c = await ctx({ viewport: { width: 1280, height: 720 } });
  const p = await page(c, "/");
  await p.keyboard.press("Tab");
  check("First Tab shows “Skip to content”", /Skip to content/.test(await p.evaluate(() => document.activeElement.textContent)));
  await p.keyboard.press("Enter");
  await wait(300);
  check("Skip link moves past the header", await p.evaluate(() => location.hash === "#main"));
  // menu by keyboard
  await p.locator(".nav-trigger").focus();
  await p.keyboard.press("Enter");
  check("Enter opens the AI workforce menu", (await p.locator(".nav-trigger").getAttribute("aria-expanded")) === "true");
  await p.keyboard.press("Escape");
  check("Escape closes it and returns focus", (await p.locator(".nav-trigger").getAttribute("aria-expanded")) === "false" && (await p.evaluate(() => document.activeElement.classList.contains("nav-trigger"))));
  // calculator by keyboard
  await p.locator("#in-calls").focus();
  for (let i = 0; i < 4; i++) await p.keyboard.press("ArrowRight");
  check("Sliders work with arrow keys", (await p.locator("#out-calls").textContent()) === "50");
  await p.locator("[data-calc-go]").focus();
  await p.keyboard.press("Enter");
  await wait(3200);
  check("Calculate works with Enter", await p.locator("[data-calc-reveal]").isVisible());
  // tab through whole page: every stop must show a visible focus indicator
  await p.evaluate(() => document.activeElement.blur());
  await p.evaluate(() => window.scrollTo(0, 0));
  const noRing = new Set();
  let stops = 0;
  for (let i = 0; i < 160; i++) {
    await p.keyboard.press("Tab");
    const info = await p.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      // focus inside the third-party booking frame is drawn by Calendly itself; we can't style or read it
      if (el.tagName === "IFRAME") return { ring: true, id: "IFRAME (Calendly draws its own focus)" };
      const s = getComputedStyle(el);
      const ring = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== "none");
      return { ring, id: (el.tagName + "." + (el.className || "").toString().split(" ")[0] + ":" + (el.textContent || el.getAttribute("aria-label") || el.name || "").trim().slice(0, 24)) };
    });
    if (!info) continue;
    stops++;
    if (!info.ring) noRing.add(info.id);
  }
  check(`Every keyboard stop shows a visible focus ring (${stops} stops)`, noRing.size === 0, [...noRing].slice(0, 10).join(" | "));
  await c.close();

  // axe-core on every page
  const c2 = await ctx();
  for (const path of PAGES) {
    const p2 = await page(c2, path);
    await p2.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important}" });
    await p2.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")));
    await wait(600);
    await p2.addScriptTag({ content: AXE });
    const v = await p2.evaluate(async () => {
      const r = await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }, resultTypes: ["violations"] });
      return r.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length, sample: x.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" ; ") }));
    });
    const serious = v.filter((x) => x.impact === "serious" || x.impact === "critical");
    check(`Accessibility (axe WCAG 2.1 AA) on ${path}: no serious/critical issues`, serious.length === 0, serious.map((x) => `${x.id}×${x.n} [${x.sample}]`).join(" | "));
    const minor = v.filter((x) => !(x.impact === "serious" || x.impact === "critical"));
    if (minor.length) console.log("        (minor: " + minor.map((x) => `${x.id}×${x.n}`).join(", ") + ")");
    await p2.close();
  }
  await c2.close();
}

/* ================= UAT-5: Priya, finance lead, checks pricing (Sydney) ================= */
section("UAT-5 · Priya, finance lead in Sydney, desktop: “What will this cost us, in AUD?”");
{
  const c = await ctx({ timezoneId: "Australia/Sydney" });
  const p = await page(c, "/pricing/");
  await wait(800);
  check("Australian visitor sees AUD first", (await p.locator('[data-cur][aria-checked="true"]').textContent()) === "AUD");
  check("AUD default matches sales.jobgen.ai × today’s rate (A$0.430 / A$58.94)", (await p.locator('[data-out="per"]').textContent()) === "A$0.430" && (await p.locator('[data-out="monthly"]').textContent()) === "A$58.94");
  check("AUD is labelled approximate with the rate and date", /Approximate AUD.*1\.4322.*6 Oct 2026/.test(await p.locator('[data-out="fx"]').textContent()));
  await p.locator('[data-cur="USD"]').click();
  check("USD matches sales.jobgen.ai exactly ($0.300 / $41.15)", (await p.locator('[data-out="per"]').textContent()) === "$0.300" && (await p.locator('[data-out="monthly"]').textContent()) === "$41.15");
  const lens = await Promise.all([1, 2, 3, 4, 5].map((m) => p.locator(`[data-out="len${m}"]`).first().textContent()));
  check("1–5 minute prices match sales.jobgen.ai", lens.join(",") === "$0.220,$0.464,$0.732,$1.024,$1.340", lens.join(","));
  await p.reload(); await wait(800);
  check("Her USD choice is remembered on reload", (await p.locator('[data-cur][aria-checked="true"]').textContent()) === "USD");
  await p.locator(".est-more summary").click();
  await p.locator('[data-key="numbers"]').fill("150");
  await p.locator('[data-key="numbers"]').blur();
  const nums = await p.locator('[data-key="numbers"]').inputValue();
  const rental = await p.locator('[data-out="rental"]').textContent();
  check("Numbers needed is capped at 99 and the box shows what’s charged", nums === "99" && rental === "$1,102.86", `box ${nums}, rental ${rental}`);
  await p.locator('[data-key="numbers"]').fill("-3"); await p.locator('[data-key="numbers"]').blur();
  check("Negative number of lines is not accepted", (await p.locator('[data-key="numbers"]').inputValue()) === "0");
  check("Says Jess and web development aren’t in the estimator", /Jess.*web development.*isn’t in this estimator/.test(await p.locator(".price-notes-more").innerText()));
  check("No script errors", p.errors.length === 0, p.errors.join(" | "));
  await c.close();
  const c2 = await ctx({ timezoneId: "Australia/Sydney" }, { fx: "fail" });
  const p2 = await page(c2, "/pricing/");
  await wait(1200);
  check("If the rate can’t load: stays in USD and says so", (await p2.locator('[data-cur][aria-checked="true"]').textContent()) === "USD" && /unavailable/.test(await p2.locator('[data-out="fx"]').textContent()) && (await p2.locator('[data-cur="AUD"]').isDisabled()));
  await c2.close();
}

/* ================= UAT-6: Reduced motion + slow mobile network ================= */
section("UAT-6 · Ken, reduced-motion setting on a slow 3G phone (390×844)");
{
  const c = await ctx({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const p = await c.newPage();
  const cdp = await c.newCDPSession(p);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 300, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await p.addInitScript(() => {
    window.__cls = 0; window.__lcp = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__lcp = e.startTime))).observe({ type: "largest-contentful-paint", buffered: true });
  });
  const t0 = Date.now();
  await p.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  const dcl = Date.now() - t0;
  await p.waitForLoadState("load");
  await wait(1500);
  const vitals = await p.evaluate(() => ({ cls: +window.__cls.toFixed(3), lcp: Math.round(window.__lcp) }));
  check("Headline readable quickly on slow 3G (LCP < 4s)", vitals.lcp > 0 && vitals.lcp < 4000, `LCP ${vitals.lcp}ms, DOMContentLoaded ${dcl}ms`);
  check("Page doesn’t jump around while loading (CLS < 0.1)", vitals.cls < 0.1, `CLS ${vitals.cls}`);
  const weight = await p.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((s, r) => s + (r.transferSize || 0), 0) / 1024));
  check("First load is light (< 1.5 MB before any audio is played)", weight < 1536, `${weight} KB`);
  check("Scroll colour bar is off with reduced motion", await p.locator(".scroll-progress").evaluate((e) => getComputedStyle(e).display === "none"));
  await p.locator("#in-calls").fill("40");
  await p.locator("[data-calc-go]").tap();
  await wait(150);
  check("Calculator reveals everything instantly with reduced motion", (await p.locator(".calc-assumptions li.is-shown").count()) === 3 && (await p.locator("#calc-number").textContent()) === aud(calcModel(40, 20, 33, 150).total));
  await p.goto(BASE + "/olivia/"); await wait(500);
  check("Olivia’s list shows its finished state instantly", (await p.locator("[data-ol-called]").textContent()) === "7");
  await p.goto(BASE + "/recruiter-agent/"); await wait(500);
  check("Jess’s pipeline shows its finished state instantly", (await p.locator("[data-jp-short]").textContent()) === "4");
  await c.close();
}

/* ================= UAT-7: Content integrity: every page, every link, every width ================= */
section("UAT-7 · Content integrity: links, headings, previews, alt text, every width incl. tablets");
{
  const c = await ctx();
  const internal = new Map();
  for (const path of PAGES) {
    const p = await page(c, path);
    const info = await p.evaluate(() => ({
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || "",
      og: document.querySelector('meta[property="og:image"]')?.content || "",
      imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      ids: [...document.querySelectorAll("[id]")].map((e) => e.id),
    }));
    check(`${path}: one h1, a title and a description`, info.h1 === 1 && info.title.length > 10 && info.desc.length > 50, `h1×${info.h1}`);
    check(`${path}: every image has alt text`, info.imgsNoAlt === 0);
    const ogPath = info.og.replace("https://jobgen.ai", "");
    const og = await p.request.get(BASE + ogPath);
    check(`${path}: link-preview image exists`, og.status() === 200, ogPath);
    for (const h of info.links) {
      if (h.startsWith("#")) { if (h.length > 1 && !info.ids.includes(h.slice(1))) check(`${path}: in-page link ${h} has a target`, false); continue; }
      if (h.startsWith("/")) internal.set(h, path);
    }
    await p.close();
  }
  const broken = [];
  for (const [h, from] of internal) {
    const [url, hash] = h.split("#");
    const r = await c.request.get(BASE + url);
    if (r.status() !== 200) { broken.push(`${h} (from ${from}) → ${r.status()}`); continue; }
    if (hash && !(await r.text()).includes(`id="${hash}"`)) broken.push(`${h} (from ${from}) → no #${hash}`);
  }
  check(`All ${internal.size} internal links work (incl. #anchors)`, broken.length === 0, broken.join(" | "));
  const ext = await (await page(c, "/")).evaluate(() => [...new Set([...document.querySelectorAll('a[href^="http"]')].map((a) => new URL(a.href).host))]);
  check("External links only go to JobGen-owned or booking domains", ext.every((h) => /jobgen\.ai$|calendly\.com$|^www\.linkedin\.com$|primarecruitment|onetec|jolierecruitment|butadeogunproperty|msbusinesssolutions|studyandwork/.test(h)), ext.join(", "));
  const overflow = [];
  for (const w of [320, 360, 390, 768, 820, 1024, 1280, 1440, 1920]) {
    const c3 = await ctx({ viewport: { width: w, height: 900 } });
    for (const path of PAGES) {
      const p = await page(c3, path);
      const sw = await p.evaluate(() => document.documentElement.scrollWidth);
      if (sw > w) overflow.push(`${path}@${w}: ${sw}px`);
      if (w === 768 || w === 1024) await p.screenshot({ path: `${OUT}/uat7-${path.replace(/\//g, "") || "home"}-${w}.png` });
      await p.close();
    }
    await c3.close();
  }
  check("No sideways scrolling on any page at 9 widths (phones, tablets, desktops)", overflow.length === 0, overflow.join(" | "));
  check("No unexpected third-party requests", external.length === 0, [...new Set(external)].slice(0, 5).join(", "));
  await c.close();
}

/* ================= UAT-8: Ella, sceptical buyer: honesty and objections ================= */
section("UAT-8 · Ella, sceptical operations director (desktop): “What’s the catch? Are these numbers real?”");
{
  const c = await ctx();
  const p = await page(c, "/");
  const faq = p.locator("#faq details");
  check("Homepage answers the big objections in a FAQ", (await faq.count()) >= 5);
  await p.locator("#faq summary", { hasText: "cannot answer" }).click();
  check("“What if the AI can’t answer?” is answered plainly", /escalates instead of guessing/.test(await p.locator("#faq").evaluate((el) => el.textContent)));
  const ld = await p.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)));
  const faqLd = ld.find((x) => x["@type"] === "FAQPage");
  check("FAQ is also published for search engines, matching the page", faqLd && faqLd.mainEntity.length === (await faq.count()));
  check("Live-demo and video prompts don’t load anything until asked", (await p.evaluate(() => document.querySelectorAll('iframe[src*="youtube"], script[src*="voice-demo-widget"]').length)) === 0);
  // every simulation is labelled as one
  const labels = await p.evaluate(() => [...document.querySelectorAll(".member-live")].every((m) => /example/i.test(m.textContent)));
  check("Team tickers are labelled as examples", labels);
  await p.close();
  for (const [path, sel] of [["/olivia/", ".ol-board"], ["/recruiter-agent/", ".sig-jess"]]) {
    const q = await page(c, path);
    check(`${path}: animation says it is simulated`, /Simulated example/.test(await q.locator(sel).innerText()));
    await q.close();
  }
  // Honesty audit: percentages, multipliers and money/time-saved claims only where they are the visitor's
  // own inputs, pricing maths, labelled examples, or the press release.
  // Allowed: the visitor's own estimates, pricing maths, labelled simulations, and the press release (its
  // figures are the ABS's, named in the release).
  const ALLOW = "[data-missed-calls], .estimator, .lengths, .news-article, .news-list, .jp, .member-live, .ol-board, script, style, noscript";
  const offenders = [];
  for (const path of PAGES) {
    const q = await page(c, path);
    const hits = await q.evaluate((allow) => {
      const out = [];
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const re = /(\b\d+(?:[.,]\d+)?\s?%|\b\d+(?:\.\d+)?x\b|\bsav(?:e|ed|ing)s?\b[^.]{0,30}(?:\$|hours?)|\$\s?\d[\d,]*(?:k|K)?\s*(?:a|per)\s*(?:year|month))/;
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        const t = n.textContent;
        if (!re.test(t)) continue;
        const el = n.parentElement;
        if (!el || el.closest(allow) || el.closest("[hidden]")) continue;
        out.push(t.trim().slice(0, 80));
      }
      return out;
    }, ALLOW);
    hits.forEach((h) => offenders.push(`${path}: “${h}”`));
    await q.close();
  }
  check("Honesty audit: no unsourced percentages or savings claims on any page", offenders.length === 0, offenders.slice(0, 6).join(" | "));
  await c.close();
}

/* ================= UAT-9: Search crawler with JavaScript off ================= */
section("UAT-9 · A search engine crawler (no JavaScript): can it read and index everything?");
{
  const c = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  let hiddenTotal = 0;
  const meta = [];
  for (const path of PAGES) {
    const p = await c.newPage();
    await p.goto(BASE + path);
    hiddenTotal += await p.evaluate(() => [...document.querySelectorAll(".reveal")].filter((e) => getComputedStyle(e).opacity === "0").length);
    const m = await p.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || "",
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return true; } catch { return false; } }),
    }));
    meta.push({ path, ...m });
    await p.close();
  }
  check("Without JavaScript, no content is left invisible", hiddenTotal === 0, `${hiddenTotal} hidden blocks`);
  const longTitles = meta.filter((m) => m.title.length > 65).map((m) => `${m.path} (${m.title.length})`);
  check("Every title fits in a search result (≤ 65 characters)", longTitles.length === 0, longTitles.join(", "));
  const badDesc = meta.filter((m) => m.desc.length < 50 || m.desc.length > 200).map((m) => `${m.path} (${m.desc.length})`);
  check("Every page has a useful description (50–200 characters)", badDesc.length === 0, badDesc.join(", "));
  check("Every page has a canonical address on jobgen.ai", meta.every((m) => m.canonical.startsWith("https://jobgen.ai/")));
  check("All structured data parses", meta.every((m) => m.ld.length > 0 && m.ld.every(Boolean)));
  const robots = await c.request.get(BASE + "/robots.txt");
  check("robots.txt allows crawling and points to the sitemap", robots.status() === 200 && /Sitemap: https:\/\/jobgen\.ai\/sitemap\.xml/.test(await robots.text()));
  const sm = await c.request.get(BASE + "/sitemap.xml");
  const locs = [...(await sm.text()).matchAll(/<loc>https:\/\/jobgen\.ai([^<]*)<\/loc>/g)].map((x) => x[1]);
  const dead = [];
  for (const l of locs) if ((await c.request.get(BASE + l)).status() !== 200) dead.push(l);
  check(`Sitemap lists ${locs.length} pages and every one exists`, sm.status() === 200 && locs.length >= PAGES.length && dead.length === 0, dead.join(", "));
  const nf = await c.request.get(BASE + "/404.html");
  check("The 404 page exists and is kept out of search results", nf.status() === 200 && /<meta name="robots" content="noindex"/.test(await nf.text()));
  const icons = await Promise.all(["/icons/icon.svg", "/icons/apple-touch-icon.png", "/site.webmanifest"].map((u) => c.request.get(BASE + u).then((r) => r.status())));
  check("Icon, home-screen icon and manifest exist", icons.every((s) => s === 200), icons.join(","));
  await c.close();
}

/* ================= UAT-10: Lisa on an iPad, and a phone held sideways ================= */
section("UAT-10 · Lisa on an iPad (820×1180) and a phone held sideways (844×390)");
{
  for (const [w, h] of [[820, 1180], [844, 390]]) {
    const c = await ctx({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
    const p = await page(c, "/");
    await wait(1200);
    const hdr = await p.evaluate(() => {
      const brand = document.querySelector(".brand").getBoundingClientRect();
      const book = document.querySelector(".header-book").getBoundingClientRect();
      const menu = document.querySelector(".menu-btn").getBoundingClientRect();
      return { overlap: brand.right > book.left || book.right > menu.left + 1, menuVisible: menu.width > 0 };
    });
    check(`${w}×${h}: header items don’t collide`, !hdr.overlap, JSON.stringify(hdr));
    await p.locator(".menu-btn").tap();
    check(`${w}×${h}: menu opens and lists the workforce`, (await p.locator("#mobile-menu a").count()) >= 8);
    await p.keyboard.press("Escape");
    check(`${w}×${h}: no sideways scrolling`, (await p.evaluate(() => document.documentElement.scrollWidth)) <= w);
    const heroH1 = await inView(p, "h1");
    check(`${w}×${h}: headline on the first screen`, heroH1.top >= 0 && heroH1.top < h, JSON.stringify(heroH1));
    await p.screenshot({ path: `${OUT}/uat10-${w}x${h}.png` });
    check("No script errors", p.errors.length === 0, p.errors.join(" | "));
    await c.close();
  }
}

/* ================= UAT-11: Someone following an old link ================= */
section("UAT-11 · Someone following an old jobgen.ai or sales.jobgen.ai link");
{
  const html404 = await (await b.newContext()).request.get(BASE + "/404.html").then((r) => r.text());
  const c = await ctx();
  const olds = { "/industries/plumbing-old": "/industries/", "/pricing/annual": "/pricing/", "/coach/start": "https://candidates.jobgen.ai/", "/solutions/overflow-handling": "/solutions/", "/receptionist-old": "/receptionist/" };
  await c.route(/\/(industries\/plumbing-old|pricing\/annual|coach\/start|solutions\/overflow-handling|receptionist-old|totally-unknown)$/, (r) => r.fulfill({ status: 404, contentType: "text/html", body: html404 }));
  for (const [from, to] of Object.entries(olds)) {
    const p = await page(c, from);
    await wait(150);
    const href = await p.locator("[data-guess-link]").getAttribute("href");
    check(`Old link ${from} is pointed to ${to}`, (await p.locator("[data-guess]").isVisible()) && href === to, href);
    await p.close();
  }
  const p = await page(c, "/totally-unknown");
  check("Unknown address still offers popular pages and the home page", (await p.locator(".notfound-links a").count()) >= 5 && (await p.locator('.hero-actions a[href="/"]').count()) === 1);
  check("404 booking goes straight to the calendar page", (await p.locator(".header-book").getAttribute("href")).includes("calendly.com"));
  await c.close();
  const vercel = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));
  check("Redirects: /coach goes to candidates.jobgen.ai", vercel.redirects.some((r) => r.source === "/coach" && r.destination.startsWith("https://candidates.jobgen.ai")));
}

/* ================= UAT-12: Wants to try it or watch a customer ================= */
section("UAT-12 · Noah wants to hear it live, or watch a customer talk about it");
{
  // On the preview the live demo opens the current jobgen.ai/demo/ in a new tab.
  const c = await ctx();
  await c.route(/jobgen\.ai\/demo/, (r) => r.fulfill({ status: 200, contentType: "text/html", body: "<h1>jobgen.ai demo</h1>" }));
  const p = await page(c, "/");
  const [popup] = await Promise.all([c.waitForEvent("page"), p.locator(".listen-live [data-live-demo]").click()]);
  await popup.waitForLoadState();
  check("Off jobgen.ai, “Try a live demo” opens the current live demo in a new tab", popup.url() === "https://jobgen.ai/demo/", popup.url());
  // The video only loads on play, from youtube-nocookie.
  await c.route(/youtube-nocookie\.com/, (r) => r.fulfill({ status: 200, contentType: "text/html", body: "<body>video</body>" }));
  await p.locator(".video-play").scrollIntoViewIfNeeded();
  await p.locator(".video-play").click();
  const src = await p.locator(".video-frame iframe").getAttribute("src");
  check("Pressing play loads the customer video (privacy-enhanced YouTube)", /^https:\/\/www\.youtube-nocookie\.com\/embed\/CA_NEg3xJz0/.test(src || ""), src);
  await c.close();
  // On jobgen.ai the widget opens in place (sales.jobgen.ai stubbed; nothing is submitted).
  const DIST = new URL("../../dist", import.meta.url).pathname;
  const types = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json", ".webmanifest": "application/manifest+json", ".webm": "audio/webm", ".m4a": "audio/mp4", ".jpg": "image/jpeg" };
  const c2 = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const posted = [];
  await c2.route("https://jobgen.ai/**", (r) => {
    let pth = new URL(r.request().url()).pathname;
    if (pth.endsWith("/")) pth += "index.html";
    const f = DIST + pth;
    if (!existsSync(f)) return r.fulfill({ status: 404, body: "" });
    r.fulfill({ status: 200, contentType: types[extname(f)] || "application/octet-stream", body: readFileSync(f) });
  });
  await c2.route(/sales\.jobgen\.ai\/voice-demo-widget\.js/, (r) => r.fulfill({ status: 200, contentType: "application/javascript", body: "class W extends HTMLElement{};customElements.define('jobgen-voice-demo',W);window.JobGenVoiceDemo={open(){const d=document.createElement('div');d.id='voiceDemoModal';d.textContent='Live voice demo';document.body.appendChild(d);}};" }));
  await c2.route(/sales\.jobgen\.ai\/api\//, (r) => { posted.push(r.request().method()); r.abort(); });
  await c2.route(/calendly|fonts\.g/, (r) => r.abort());
  const p2 = await c2.newPage();
  await p2.goto("https://jobgen.ai/");
  await p2.locator(".listen-live [data-live-demo]").click();
  await wait(800);
  check("On jobgen.ai, “Try a live demo” opens the live demo in place", (await p2.locator("#voiceDemoModal").count()) === 1 && (await p2.evaluate(() => document.querySelector("jobgen-voice-demo")?.getAttribute("default-product"))) === "receptionist");
  check("Opening the demo submits nothing", posted.filter((m) => m !== "GET").length === 0, posted.join(","));
  await c2.close();
}

await b.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
process.exit(failed.length ? 1 : 0);
