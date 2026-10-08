(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const still = matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Header ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Rotating industry word ---------- */
  const rotator = $(".rotator");
  const words = $$(".rotator > span");
  let wordIndex = 0;
  if (rotator) {
  const fitRotator = () => {
    const pad = getComputedStyle(rotator);
    rotator.style.width =
      words[wordIndex].offsetWidth + parseFloat(pad.paddingLeft) + parseFloat(pad.paddingRight) + "px";
  };
  fitRotator();
  addEventListener("resize", fitRotator);
  document.fonts?.ready.then(fitRotator);
  if (!still.matches)
    setInterval(() => {
      if (document.hidden) return;
      words[wordIndex].classList.remove("is-active");
      words[wordIndex].classList.add("is-leaving");
      const leaving = words[wordIndex];
      setTimeout(() => leaving.classList.remove("is-leaving"), 550);
      wordIndex = (wordIndex + 1) % words.length;
      words[wordIndex].classList.add("is-active");
      fitRotator();
      rotator.dispatchEvent(new CustomEvent("word", { detail: wordIndex }));
    }, 1800);
  }

  /* ---------- Voice ribbon: sound-wave lines that speak in bursts ---------- */
  const ribbon = $("#voice-ribbon");
  if (ribbon) {
    const ctx = ribbon.getContext("2d");
    const root = getComputedStyle(document.documentElement);
    // On a professional's page the wave takes their colours; elsewhere the full JOBGEN.AI spectrum.
    const persona = document.body.dataset.persona ? getComputedStyle(document.body) : null;
    const colours = persona
      ? ["--p1", "--p2", "--p3", "--p1", "--p2"].map((v) => persona.getPropertyValue(v).trim())
      : ["--edu", "--prop", "--rest", "--care"].map((v) => root.getPropertyValue(v).trim()).concat("#b48cff");
    const lines = colours.map((colour, i) => ({ colour, phase: i * 1.9, speed: 0.55 + i * 0.13, freq: 1.1 + i * 0.32, boost: 0 }));
    // which line flares for each rotating word: buyer, booking, after-hours, missed
    const lineForWord = [1, 0, 4, 2];
    let w = 0, h = 0, t = 0, energy = 0.3, target = 0.3, visible = true, raf = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = ribbon.clientWidth;
      h = ribbon.clientHeight;
      ribbon.width = w * dpr;
      ribbon.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still.matches) draw();
    };
    // speech rhythm: syllables, short pauses, the odd louder phrase
    const syllable = () => {
      target = Math.random() < 0.22 ? 0.1 : 0.25 + Math.random() * 0.6;
      setTimeout(syllable, 140 + Math.random() * 260);
    };
    function draw() {
      t += 0.016;
      energy += (target - energy) * 0.08;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const line of lines) {
        const amp = h * 0.36 * (energy * 0.75 + line.boost * 0.9);
        const path = new Path2D();
        for (let x = 0; x <= w; x += 4) {
          const nx = x / w;
          const env = Math.pow(Math.sin(Math.PI * nx), 1.6);
          const y =
            h / 2 +
            env * amp *
              (Math.sin(nx * line.freq * 6.28 * 2 + t * line.speed * 3 + line.phase) * 0.6 +
                Math.sin(nx * line.freq * 6.28 * 5.3 - t * line.speed * 2.2 + line.phase * 2) * 0.4);
          x ? path.lineTo(x, y) : path.moveTo(x, y);
        }
        ctx.strokeStyle = line.colour;
        ctx.globalAlpha = 0.07 + line.boost * 0.12;
        ctx.lineWidth = 7 + line.boost * 6;
        ctx.stroke(path);
        ctx.globalAlpha = 0.5 + line.boost * 0.5;
        ctx.lineWidth = 1.4 + line.boost * 1.4;
        ctx.stroke(path);
        line.boost *= 0.975;
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (!still.matches && visible && !document.hidden) raf = requestAnimationFrame(draw);
      else raf = 0;
    }
    const run = () => {
      if (!raf && !still.matches && visible) raf = requestAnimationFrame(draw);
    };
    resize();
    addEventListener("resize", resize);
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      run();
    }).observe(ribbon);
    document.addEventListener("visibilitychange", run);
    rotator?.addEventListener("word", (e) => {
      lines[lineForWord[e.detail]].boost = 1;
      energy = 1;
    });
    if (still.matches) draw();
    else syllable();
  }

  /* ---------- Front-desk cards cycle through a call ---------- */
  const minis = $$(".mini");
  const PERIOD = 8000;
  const start = performance.now();
  function tickMinis(now) {
    minis.forEach((card, i) => {
      const t = (now - start + i * 2000) % PERIOD;
      const state = t < 1400 ? "ringing" : t < 5200 ? "live" : "done";
      if (card.dataset.state === state) return;
      card.dataset.state = state;
      $(".mini-text", card).textContent =
        state === "ringing" ? "Incoming call" : state === "live" ? "Jenny is on the call" : "✓ " + card.dataset.result;
    });
    if (!still.matches) requestAnimationFrame(tickMinis);
  }
  if (still.matches)
    minis.forEach((card) => {
      card.dataset.state = "done";
      $(".mini-text", card).textContent = "✓ " + card.dataset.result;
    });
  else requestAnimationFrame(tickMinis);

  /* ---------- Missed-call calculator: sliders → Calculate → the working → get in touch ---------- */
  // The total stays hidden until the visitor presses Calculate. Then the working is revealed line by
  // line, the estimate counts up, and a short form asks for their email and phone (LINKS.leadEndpoint).
  const inCalls = $("#in-calls");
  if (inCalls) {
    const box = inCalls.closest("[data-missed-calls]");
    const inMissed = $("#in-missed"), inConv = $("#in-conv"), inValue = $("#in-value");
    const inputs = [inCalls, inMissed, inConv, inValue].filter(Boolean);
    const aud = (v) => "A$" + Math.round(v).toLocaleString("en-AU");
    // Steps keep their decimals (e.g. 43.56 customers); only the final dollar figure is rounded.
    const num = (v) => (+v.toFixed(2)).toLocaleString("en-AU", { maximumFractionDigits: 2 });
    const put = (sel, v) => { const el = $(sel, box); if (el) el.textContent = v; };
    const goBtn = $("[data-calc-go]", box), goLabel = $("[data-calc-go-label]", box);
    const staleHint = $("[data-calc-stale]", box), reveal = $("[data-calc-reveal]", box);
    const steps = $$(".calc-assumptions li", box);
    let calculated = false, last = null, timers = [];

    const read = () => {
      const calls = +inCalls.value, missedPct = +inMissed.value, value = +inValue.value;
      const conv = inConv ? +inConv.value : 33;
      const missedMonth = ((calls * missedPct) / 100) * 22;
      const customers = (missedMonth * conv) / 100;
      return { calls, missedPct, conv, value, missedMonth, customers, total: customers * value };
    };
    // Sliders only update their own labels; the estimate waits for Calculate.
    const showInputs = () => {
      const r = read();
      inputs.forEach((el) => el.style.setProperty("--fill", ((el.value - el.min) / (el.max - el.min)) * 100 + "%"));
      put("#out-calls", r.calls);
      put("#out-missed", r.missedPct + "%");
      put("#out-conv", r.conv + "%");
      put("#out-value", aud(r.value));
      // keeps the pricing page's "answering them" comparison in step
      box.dataset.missed = r.missedMonth;
      box.dataset.lost = r.total;
      document.dispatchEvent(new CustomEvent("missedcalls", { detail: { missed: r.missedMonth, lost: r.total } }));
    };
    const countUp = (el, to, fmt, ms) => {
      if (!el) return;
      const start = performance.now();
      const tick = (now) => {
        const k = still.matches ? 1 : Math.min(1, (now - start) / ms);
        el.textContent = fmt(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const calculate = () => {
      const r = (last = read());
      timers.forEach(clearTimeout);
      timers = [];
      calculated = true;
      staleHint.hidden = true;
      goLabel.textContent = "Recalculate";
      put("#as-calls", num(r.calls));
      put("#as-missed", r.missedPct + "%");
      put("#as-conv", r.conv + "%");
      put("#as-value", aud(r.value));
      put("#as-month2", num(r.missedMonth));
      put("#as-cust2", num(r.customers));
      put("#calc-missed", num(r.missedMonth));
      put("#calc-number", aud(0));
      $("[data-calc-zero]", box).hidden = r.customers >= 1;
      steps.forEach((li) => li.classList.remove("is-shown"));
      box.classList.remove("is-result");
      reveal.hidden = false;
      const gap = still.matches ? 0 : 700;
      const results = [["#as-month", r.missedMonth, num], ["#as-cust", r.customers, num], ["#as-total", r.total, aud]];
      steps.forEach((li, i) =>
        timers.push(setTimeout(() => {
          li.classList.add("is-shown");
          countUp($(results[i][0], box), results[i][1], results[i][2], 550);
        }, i * gap)),
      );
      timers.push(setTimeout(() => {
        box.classList.add("is-result");
        countUp($("#calc-number", box), r.total, aud, 800);
      }, steps.length * gap));
      if (!still.matches) reveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    inputs.forEach((el) =>
      el.addEventListener("input", () => {
        showInputs();
        if (!calculated) return;
        // the shown estimate no longer matches: fold it away until they recalculate
        timers.forEach(clearTimeout);
        reveal.hidden = true;
        staleHint.hidden = false;
      }),
    );
    goBtn.addEventListener("click", calculate);
    showInputs();

    // "Get in touch": email + phone + their numbers, sent to the sales team once an endpoint is set.
    const form = $("[data-lead-form]", box);
    if (form) {
      const status = $("[data-lead-status]", form), submit = $("[data-lead-submit]", form);
      const say = (html, tone = "") => {
        status.innerHTML = html;
        status.dataset.tone = tone;
      };
      // Each field explains its own problem right beneath it, and the message clears as soon as it's fixed.
      const rules = {
        email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : v ? "That email looks incomplete. Check the part after the @." : "Please enter your email."),
        phone: (v) => {
          const digits = v.replace(/\D/g, "").length;
          if (!v) return "Please enter a phone number we can call.";
          if (/[^\d\s()+-]/.test(v)) return "Use numbers only, with spaces or + if you like.";
          return digits >= 8 && digits <= 15 ? "" : "That number looks too short. Include the area code.";
        },
      };
      const validate = (name) => {
        const input = form.elements[name];
        const msg = rules[name](input.value.trim());
        input.setAttribute("aria-invalid", String(!!msg));
        $(`[data-error-for="${name}"]`, form).textContent = msg;
        return !msg;
      };
      Object.keys(rules).forEach((name) => {
        const input = form.elements[name];
        input.addEventListener("blur", () => input.value.trim() && validate(name));
        input.addEventListener("input", () => input.getAttribute("aria-invalid") === "true" && validate(name));
      });
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = form.elements.email.value.trim(), phone = form.elements.phone.value.trim();
        const okEmail = validate("email"), okPhone = validate("phone");
        if (!okEmail || !okPhone) {
          say("");
          (!okEmail ? form.elements.email : form.elements.phone).focus();
          return;
        }
        const endpoint = form.dataset.endpoint;
        const done = () => {
          say("");
          $("[data-lead-body]", form).hidden = true;
          $("[data-lead-done]", form).hidden = false;
        };
        if (!endpoint) {
          // Not connected yet: show the thank-you design, clearly marked, and send nothing.
          done();
          $("[data-lead-preview]", form).hidden = false;
          return;
        }
        submit.disabled = true;
        say("Sending…");
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, phone, website: form.elements.website.value, calc: last || read(), page: location.pathname }),
          });
          if (!res.ok) throw new Error(String(res.status));
          done();
          // carry their email into the booking calendar, so picking a time is one step less
          const cal = $(".booking iframe");
          if (cal) {
            const url = new URL(cal.dataset.src);
            url.searchParams.set("email", email);
            cal.dataset.src = url.toString();
            if (cal.src) {
              url.searchParams.set("embed_domain", location.hostname || "localhost");
              cal.src = url.toString();
            }
          }
        } catch {
          say('We couldn’t send that just now. Email us at <a href="mailto:hello@jobgen.ai">hello@jobgen.ai</a> or pick a time below.', "error");
        } finally {
          submit.disabled = false;
        }
      });
    }
  }

  /* ---------- Quiet zones: floating controls step aside while people use audio, transcripts, forms
     and calendars (anything of these reaching the bottom of the screen, a playing call, or a focused
     field), so nothing fixed sits on top of what they're using. ---------- */
  {
    const QUIET = ".recording, [data-missed-calls], [data-cost], form, .booking, .try-stage, .estimator, .video-frame";
    const near = new Set();
    const update = () => {
      const field = document.activeElement?.matches?.("input, textarea, select") ?? false;
      const playing = [...document.querySelectorAll("audio, video")].some((m) => !m.paused);
      const on = near.size > 0 || playing || field;
      if (document.body.classList.contains("quiet-zone") === on) return;
      document.body.classList.toggle("quiet-zone", on);
      document.dispatchEvent(new Event("quietzone"));
    };
    // Only the bottom strip of the screen matters: that's where the floating controls live.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
        update();
      },
      { rootMargin: "-75% 0px 0px 0px" },
    );
    $$(QUIET).forEach((el) => io.observe(el));
    // media events don't bubble, so listen in the capture phase
    ["play", "pause", "ended"].forEach((t) => document.addEventListener(t, update, true));
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", () => setTimeout(update, 0));
  }

  /* ---------- Phones: a slim booking bar once the hero is out of view ---------- */
  const bookBar = $("#book-bar");
  if (bookBar) {
    const phone = matchMedia("(max-width: 900px)");
    const seen = { hero: true, book: false, footer: false };
    const sync = () => {
      bookBar.hidden = !phone.matches || seen.hero || seen.book || seen.footer || document.body.classList.contains("quiet-zone");
      // one booking button at a time: the header button steps aside while the bar is up
      document.body.classList.toggle("book-bar-on", !bookBar.hidden);
    };
    const watch = (el, key) =>
      el &&
      new IntersectionObserver(([e]) => {
        seen[key] = e.isIntersecting;
        sync();
      }).observe(el);
    watch($(".hero"), "hero");
    watch($("#book"), "book");
    watch($(".footer"), "footer");
    phone.addEventListener("change", sync);
    document.addEventListener("quietzone", sync);
  }

  /* ---------- Reveal on scroll ---------- */
  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      }),
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => reveal.observe(el));

  /* ---------- Before → after scenes play once they're properly in view ---------- */
  const scenes = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("play");
        scenes.unobserve(e.target);
      }),
    { threshold: 0.9 },
  );
  $$("[data-scene]").forEach((el) => scenes.observe(el));

  /* ---------- Booking calendar loads when it's close to view ---------- */
  const calendar = $(".booking iframe");
  if (calendar) {
    // A visible loading state until Calendly is in, and a plain link if it's slow.
    const status = $("[data-booking-status]");
    const load = () => {
      const url = new URL(calendar.dataset.src);
      url.searchParams.set("embed_domain", location.hostname || "localhost");
      if (status) {
        status.hidden = false;
        calendar.addEventListener("load", () => (status.hidden = true), { once: true });
        setTimeout(() => {
          if (status.hidden) return;
          $("[data-booking-text]", status).innerHTML =
            'The calendar is taking a while. <a href="https://calendly.com/jobgen-demo/30min" target="_blank" rel="noopener">Open the booking page ↗</a>';
          status.classList.add("is-slow");
        }, 10000);
      }
      calendar.src = url.toString();
    };
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        load();
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(calendar);
    // Any "Book a demo" link starts the calendar loading straight away, before the scroll lands.
    document.addEventListener("click", (e) => {
      if (!e.target.closest?.('a[href="#book"]') || calendar.src) return;
      near.disconnect();
      load();
    });
  }

  /* ---------- Rules console ---------- */
  const rules = $$(".rule input");
  const ruleSummary = $("#rule-summary");
  function updateRules() {
    const on = rules.filter((r) => r.checked).map((r) => r.dataset.rule);
    const sentence =
      on.length === 0
        ? "Wait for your instructions. Nothing goes live without your rules."
        : on.length === 1
          ? on[0]
          : on.slice(0, -1).join(", ") + " and " + on[on.length - 1];
    ruleSummary.textContent = sentence[0].toUpperCase() + sentence.slice(1) + (on.length ? "." : "");
  }
  if (ruleSummary) {
    rules.forEach((r) => r.addEventListener("change", updateRules));
    updateRules();
  }
})();
