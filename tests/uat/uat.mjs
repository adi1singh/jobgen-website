// User acceptance tests for the JOBGEN.AI site, played as real visitors with real goals.
// See tests/uat/README.md. Usage: node tests/uat/uat.mjs [baseURL] [outDir]
// Needs Playwright (with Chromium) and axe-core: npm i --no-save playwright axe-core && npx playwright install chromium
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");

const BASE = process.argv[2] || "http://localhost:8770";
const OUT = process.argv[3] || "./tests/uat/out";
mkdirSync(OUT, { recursive: true });
const AXE = readFileSync(process.env.AXE_PATH || require.resolve("axe-core/axe.min.js"), "utf8");
const PAGES = ["/", "/receptionist/", "/olivia/", "/recruiter-agent/", "/web-development/", "/pricing/", "/about/",
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
  check("External links only go to JobGen-owned or booking domains", ext.every((h) => /jobgen\.ai$|calendly\.com$|primarecruitment|onetec|jolierecruitment|butadeogunproperty|msbusinesssolutions|studyandwork/.test(h)), ext.join(", "));
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

await b.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
process.exit(failed.length ? 1 : 0);
