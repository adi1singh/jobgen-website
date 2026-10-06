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

  /* ---------- Missed-call calculator ---------- */
  // Keep the calculator consistent with JobGen's Australian sales context.
  const inCalls = $("#in-calls");
  if (inCalls) {
    const inMissed = $("#in-missed"), inValue = $("#in-value");
    const money = {
      factor: 1,
      fmt: { format: (value) => "A$" + Math.round(value).toLocaleString("en-AU") },
    };
    const step = Math.max(5, Math.round((10 * money.factor) / 5) * 5);
    inValue.step = step;
    inValue.min = step;
    inValue.max = Math.round((2000 * money.factor) / step) * step;
    inValue.value = Math.round((150 * money.factor) / step) * step;
    let shown = 0, raf = 0;
    const update = () => {
      const calls = +inCalls.value, missedPct = +inMissed.value, value = +inValue.value;
      [inCalls, inMissed, inValue].forEach((el) =>
        el.style.setProperty("--fill", ((el.value - el.min) / (el.max - el.min)) * 100 + "%"),
      );
      $("#out-calls").textContent = calls;
      $("#out-missed").textContent = missedPct + "%";
      $("#out-value").textContent = money.fmt.format(value);
      const missedMonth = Math.round(((calls * missedPct) / 100) * 22);
      const total = Math.round(missedMonth / 3) * value;
      $("#calc-missed").textContent = missedMonth.toLocaleString();
      const box = inCalls.closest("[data-missed-calls]");
      if (box) {
        box.dataset.missed = missedMonth;
        box.dataset.lost = total;
        document.dispatchEvent(new CustomEvent("missedcalls", { detail: { missed: missedMonth, lost: total } }));
      }
      cancelAnimationFrame(raf);
      const from = shown, start = performance.now();
      const tick = (now) => {
        const k = still.matches ? 1 : Math.min(1, (now - start) / 450);
        shown = Math.round(from + (total - from) * (1 - Math.pow(1 - k, 3)));
        $("#calc-number").textContent = money.fmt.format(shown);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    [inCalls, inMissed, inValue].forEach((el) => el.addEventListener("input", update));
    update();
  }

  /* ---------- Phones: a slim booking bar once the hero is out of view ---------- */
  const bookBar = $("#book-bar");
  if (bookBar) {
    const phone = matchMedia("(max-width: 900px)");
    const seen = { hero: true, book: false, footer: false };
    const sync = () => {
      bookBar.hidden = !phone.matches || seen.hero || seen.book || seen.footer;
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

  /* ---------- Booking calendar loads when it's close to view ---------- */
  const calendar = $(".booking iframe");
  if (calendar) {
    const load = () => {
      const url = new URL(calendar.dataset.src);
      url.searchParams.set("embed_domain", location.hostname || "localhost");
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
