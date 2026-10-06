/*
  "Your turn. Call Jenny." — an interactive call you can steer.

  Each business has a small conversation tree: Jenny says a line, the
  visitor picks a reply, and every path ends with the summary the team would
  receive. Visitors can also just listen: that plays the scripted call for the
  same business from calls.js.

  Everything here is simulated. Businesses, people and details are fictional,
  the voice is the browser's built-in speech, and nothing is sent anywhere.
*/
(() => {
  const TREES = {
    education: {
      name: "Northside College",
      start: "start",
      nodes: {
        start: {
          say: "Good morning, Northside College. This is Jenny, the college’s AI assistant. How can I help?",
          replies: [
            ["I’d like to enrol my daughter in Year 7", "enrol"],
            ["What time does school finish?", "hours"],
            ["My son is sick today", "absent"],
          ],
        },
        enrol: {
          say: "Lovely. Year 7 enrolments for next year are open. Would you like to book a campus tour? We run them on Tuesdays and Thursdays.",
          replies: [
            ["Thursday works for me", "enrolTour"],
            ["Could someone call me instead?", "enrolCall"],
          ],
        },
        enrolTour: {
          say: "Done. You’re booked for Thursday at 10am. I’ll text you a confirmation and let admissions know you’re coming.",
          summary: [["Intent", "Year 7 enrolment"], ["Booked", "Campus tour · Thu 10:00am"], ["Text to caller", "Confirmation by text"]],
          to: "Admissions",
        },
        enrolCall: {
          say: "Of course. I’ve asked our admissions team to call you back this afternoon on the number you’re calling from.",
          summary: [["Intent", "Year 7 enrolment"], ["Next step", "Callback this afternoon"]],
          to: "Admissions",
        },
        hours: {
          say: "The school day finishes at 3:10, and after-school care runs until 6pm. Is there anything else I can help with?",
          replies: [
            ["That’s all, thanks", "hoursDone"],
            ["How do I book after-school care?", "oshc"],
          ],
        },
        hoursDone: {
          say: "My pleasure. Have a lovely day!",
          summary: [["Intent", "General question"], ["Answered", "Finish time and after-school care"]],
          to: "No follow-up needed",
        },
        oshc: {
          say: "You can book through the parent portal. I’ve just texted you the link and the daily fee sheet.",
          summary: [["Intent", "After-school care"], ["Text to caller", "Portal link + fee sheet by text"]],
          to: "No follow-up needed",
        },
        absent: {
          say: "Sorry to hear that. What’s your son’s name and year level?",
          replies: [["Leo Martin, Year 9", "absentDone"]],
        },
        absentDone: {
          say: "Thanks. I’ve recorded Leo as absent today and let his year coordinator know. I hope he feels better soon.",
          summary: [["Intent", "Absence report"], ["Student", "Leo Martin · Year 9"]],
          to: "Attendance + Year 9 coordinator",
        },
      },
    },

    property: {
      name: "Harbour & Co Realty",
      start: "start",
      nodes: {
        start: {
          say: "Thanks for calling Harbour and Co Realty. This is Jenny, the agency’s AI assistant. How can I help?",
          replies: [
            ["Is the 3-bed on Elm Street still available?", "listing"],
            ["I’d like to book a rental inspection", "rental"],
            ["Can I get my home appraised?", "appraisal"],
          ],
        },
        listing: {
          say: "It is. There’s an open home this Saturday from 11 to 11:30. Shall I register you?",
          replies: [
            ["Yes, register me", "listingYes"],
            ["Would they take an offer before auction?", "listingOffer"],
          ],
        },
        listingYes: {
          say: "Done. You’re registered for Saturday at 11, and I’ve texted you the address and contract details.",
          summary: [["Intent", "Buyer enquiry · Elm Street"], ["Booked", "Open home · Sat 11:00am"], ["Text to caller", "Contract details by text"]],
          to: "Sam, listing agent",
        },
        listingOffer: {
          say: "Good question. I’ve flagged it to Sam, the listing agent, as a priority. He’ll call you today.",
          summary: [["Intent", "Pre-auction offer · Elm Street"], ["Priority", "Hot lead"], ["Next step", "Callback today"]],
          to: "Sam, listing agent",
        },
        rental: {
          say: "Happy to help. We have inspections on Wednesday at 5:30 or Saturday at 10. Which suits you?",
          replies: [
            ["Wednesday at 5:30", "rentalWed"],
            ["Saturday at 10", "rentalSat"],
          ],
        },
        rentalWed: {
          say: "You’re booked for Wednesday at 5:30. I’ve texted you the address and how to apply.",
          summary: [["Intent", "Rental inspection"], ["Booked", "Wed 5:30pm"]],
          to: "Property management",
        },
        rentalSat: {
          say: "You’re booked for Saturday at 10. I’ve texted you the address and how to apply.",
          summary: [["Intent", "Rental inspection"], ["Booked", "Sat 10:00am"]],
          to: "Property management",
        },
        appraisal: {
          say: "Of course. One of our agents can visit to appraise it. Would a weekday or the weekend suit you better?",
          replies: [
            ["A weekday", "appraisalDone"],
            ["The weekend", "appraisalDone"],
          ],
        },
        appraisalDone: {
          say: "Great. I’ll have an agent call you today to lock in a time that works.",
          summary: [["Intent", "Appraisal request"], ["Next step", "Agent to call today"]],
          to: "Sales team",
        },
      },
    },

    restaurant: {
      name: "Luca’s Trattoria",
      start: "start",
      nodes: {
        start: {
          say: "Ciao, Luca’s Trattoria. This is Jenny, the restaurant’s AI assistant. How can I help?",
          replies: [
            ["Book a table for Friday night", "book"],
            ["Are you open on Mondays?", "hours"],
            ["Do you do takeaway?", "takeaway"],
          ],
        },
        book: {
          say: "Of course. How many people, and what time were you thinking?",
          replies: [
            ["Six people, around 7", "six"],
            ["Two people at 8", "two"],
          ],
        },
        six: {
          say: "I have 7:15 for six. Are there any dietary requirements I should note for the kitchen?",
          replies: [
            ["One of us is gluten-free", "sixGf"],
            ["No, we’re all good", "sixDone"],
          ],
        },
        sixGf: {
          say: "Lovely. A table for six, Friday at 7:15, with gluten-free noted for the kitchen. I’ll text you a confirmation.",
          summary: [["Booked", "Fri 7:15pm · 6 guests"], ["Notes", "1 × gluten-free"]],
          to: "Bookings + kitchen notes",
        },
        sixDone: {
          say: "Perfect. A table for six, Friday at 7:15. I’ll text you a confirmation.",
          summary: [["Booked", "Fri 7:15pm · 6 guests"]],
          to: "Bookings",
        },
        two: {
          say: "Perfect, a table for two this Friday at 8. See you then!",
          summary: [["Booked", "Fri 8:00pm · 2 guests"]],
          to: "Bookings",
        },
        hours: {
          say: "We’re closed on Mondays, but open Tuesday to Sunday from 5pm. Would you like to book another night?",
          replies: [
            ["Yes, Tuesday for two", "tuesday"],
            ["No thanks", "hoursDone"],
          ],
        },
        tuesday: {
          say: "Done. A table for two on Tuesday at 7. I’ll text you a confirmation.",
          summary: [["Booked", "Tue 7:00pm · 2 guests"]],
          to: "Bookings",
        },
        hoursDone: {
          say: "No problem at all. Have a lovely evening!",
          summary: [["Intent", "Opening hours"], ["Answered", "Closed Mondays, open Tue–Sun"]],
          to: "No follow-up needed",
        },
        takeaway: {
          say: "We do. Takeaway starts at 5pm and is ready in about 20 minutes. Shall I text you the menu?",
          replies: [
            ["Yes please", "menu"],
            ["I’ll just walk in", "walkin"],
          ],
        },
        menu: {
          say: "Sent! Enjoy, and ciao for now.",
          summary: [["Intent", "Takeaway"], ["Text to caller", "Menu link by text"]],
          to: "No follow-up needed",
        },
        walkin: {
          say: "Perfect, see you soon!",
          summary: [["Intent", "Takeaway"], ["Answered", "Hours and wait time"]],
          to: "No follow-up needed",
        },
      },
    },

    childcare: {
      name: "Little Acorns Early Learning",
      start: "start",
      nodes: {
        start: {
          say: "Hello, Little Acorns Early Learning. This is Jenny, the centre’s AI assistant. How can I help?",
          replies: [
            ["I’m looking for a place for my son", "place"],
            ["My daughter won’t be in today", "absent"],
            ["What are your fees?", "fees"],
          ],
        },
        place: {
          say: "Lovely. How old is he, and which days would you need?",
          replies: [
            ["He’s two, Monday, Wednesday and Friday", "toddler"],
            ["He’s four, full time", "kinder"],
          ],
        },
        toddler: {
          say: "Our toddler room has limited spots, so I can add him to the waitlist and book you a tour. Does Tuesday at 9:30 suit?",
          replies: [
            ["Yes, book the tour", "tour"],
            ["Can the director call me?", "director"],
          ],
        },
        tour: {
          say: "Wonderful. Your tour is booked for Tuesday at 9:30, and our director will call you about availability.",
          summary: [["Intent", "New enrolment · toddler room"], ["Child", "Age 2 · Mon, Wed, Fri"], ["Booked", "Centre tour · Tue 9:30am"]],
          to: "Centre director · waitlist added",
        },
        director: {
          say: "Of course. I’ve added him to the waitlist, and our director will call you today.",
          summary: [["Intent", "New enrolment · toddler room"], ["Child", "Age 2 · Mon, Wed, Fri"], ["Next step", "Director callback today"]],
          to: "Centre director · waitlist added",
        },
        kinder: {
          say: "Our kinder room has a few full-time spots from next term. I’ve noted your details, and our director will call you today to talk it through.",
          summary: [["Intent", "New enrolment · kinder room"], ["Child", "Age 4 · full time"], ["Next step", "Director callback today"]],
          to: "Centre director",
        },
        absent: {
          say: "Thanks for letting us know. What’s her name, and which room is she in?",
          replies: [["Mia, in the Possum room", "absentDone"]],
        },
        absentDone: {
          say: "Thank you. I’ve marked Mia absent today and let the Possum room educators know. I hope she feels better soon.",
          summary: [["Intent", "Absence"], ["Child", "Mia · Possum room"]],
          to: "Room educators",
        },
        fees: {
          say: "Daily fees depend on the room and days, and many families are eligible for the Child Care Subsidy. Would you like our fee sheet by text?",
          replies: [
            ["Yes please", "feesSent"],
            ["Could someone call me?", "feesCall"],
          ],
        },
        feesSent: {
          say: "Sent! If you have any questions, our director is happy to call.",
          summary: [["Intent", "Fees enquiry"], ["Text to caller", "Fee sheet by text"]],
          to: "No follow-up needed",
        },
        feesCall: {
          say: "Of course. Our director will call you today to go through the fees.",
          summary: [["Intent", "Fees enquiry"], ["Next step", "Director callback today"]],
          to: "Centre director",
        },
      },
    },

    trades: {
      name: "Kestrel Plumbing",
      start: "start",
      nodes: {
        start: {
          say: "Kestrel Plumbing, this is Jenny, the team’s AI assistant. How can I help?",
          replies: [
            ["A pipe has burst under my sink", "burst"],
            ["Can I get a quote for a new hot water system?", "quote"],
            ["Are you open on Saturdays?", "hours"],
          ],
        },
        burst: {
          say: "I’m sorry, that’s stressful. If you can, turn off the water at the stopcock, usually under the sink or near the meter. Is it off now?",
          replies: [
            ["Yes, it’s off now", "burstDone"],
            ["I can’t find it", "burstHelp"],
          ],
        },
        burstDone: {
          say: "Well done. I’ve marked this urgent and passed it to our on-call plumber, who will ring you back within 15 minutes.",
          summary: [["Intent", "Burst pipe · urgent"], ["Advice given", "Water off at stopcock"], ["Next step", "Callback within 15 min"]],
          to: "On-call plumber",
        },
        burstHelp: {
          say: "No problem. I’m putting you through to our on-call plumber now so they can talk you through it.",
          summary: [["Intent", "Burst pipe · urgent"], ["Next step", "Transferred to on-call plumber"]],
          to: "On-call plumber",
        },
        quote: {
          say: "Happy to help. Is your current system gas or electric, and roughly how old is it?",
          replies: [["Gas, about 12 years old", "quoteDone"]],
        },
        quoteDone: {
          say: "Thanks. I’ve booked a free on-site quote for Thursday morning, and I’ll text you a confirmation.",
          summary: [["Intent", "Hot water quote"], ["Details", "Gas system · ~12 years old"], ["Booked", "On-site quote · Thu AM"]],
          to: "Estimating team",
        },
        hours: {
          say: "We’re open Saturdays from 8 till 1, and our on-call plumber covers emergencies around the clock. Anything else?",
          replies: [["That’s all, thanks", "hoursDone"]],
        },
        hoursDone: {
          say: "My pleasure. Have a good day!",
          summary: [["Intent", "Opening hours"], ["Answered", "Sat 8–1, 24/7 emergencies"]],
          to: "No follow-up needed",
        },
      },
    },
  };

  const $ = (s) => document.querySelector(s);
  const phone = $("#phone");
  if (!phone) return;
  const body = $("#phone-body"),
    replies = $("#phone-replies"),
    status = $("#phone-status"),
    nameEl = $("#phone-name"),
    callBtn = $("#call-btn"),
    inbox = $("#inbox-list"),
    voiceToggle = $("#voice"),
    stage = $(".try-stage"),
    inboxCta = $("#inbox-cta"),
    listenBtn = $("#listen-btn"),
    listenLabel = $("#listen-label"),
    picks = [...document.querySelectorAll(".try-pick button")];
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const tintVar = { education: "edu", property: "prop", restaurant: "rest", childcare: "care", trades: "trade" };

  let industry = "education",
    tree = TREES.education,
    session = 0, // bumps on every new call so stale timers and speech are ignored
    mode = "steer", // "steer" (visitor picks replies) or "listen" (scripted call plays itself)
    audioCtx = null;

  /* ---------- voice ---------- */
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices().filter((v) => v.lang && v.lang.startsWith("en"));
    const preferred = /Karen|Catherine|Samantha|Serena|Moira|Tessa|Natasha|Sonia|Libby|Aria|Jenny|Google UK English Female|Female/i;
    voice =
      voices.find((v) => v.lang === "en-AU" && preferred.test(v.name)) ||
      voices.find((v) => preferred.test(v.name)) ||
      voices.find((v) => v.lang === "en-AU") ||
      voices.find((v) => v.lang === "en-GB") ||
      voices[0] ||
      null;
  }
  let callerVoice = null;
  function pickCallerVoice() {
    if (!synth) return;
    const voices = synth.getVoices().filter((v) => v.lang && v.lang.startsWith("en") && v !== voice);
    callerVoice = voices.find((v) => /Daniel|Lee|Gordon|Arthur|Ryan|Guy|Male|Alex|Fred/i.test(v.name)) || voices[0] || null;
  }
  if (synth) {
    pickVoice();
    pickCallerVoice();
    synth.addEventListener?.("voiceschanged", () => {
      pickVoice();
      pickCallerVoice();
    });
  } else {
    voiceToggle.checked = false;
    voiceToggle.disabled = true;
  }
  function speak(text, id, who = "ai") {
    return new Promise((resolve) => {
      if (!synth || !voiceToggle.checked || !synth.getVoices().length) return resolve();
      const u = new SpeechSynthesisUtterance(text.replace(/&/g, "and"));
      const v = who === "ai" ? voice : callerVoice;
      if (v) u.voice = v;
      u.rate = who === "ai" ? 1.03 : 1.08;
      u.pitch = who === "ai" ? 1.05 : 0.9;
      const done = () => resolve();
      u.onend = done;
      u.onerror = done;
      // Some browsers never fire onend; don't let the call hang.
      setTimeout(done, 1500 + text.length * 85);
      if (id === session) synth.speak(u);
      else resolve();
    });
  }

  /* ---------- ringtone (Web Audio, no files) ---------- */
  function ring(times = 2) {
    if (!voiceToggle.checked) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const gain = audioCtx.createGain();
      gain.gain.value = 0;
      gain.connect(audioCtx.destination);
      [400, 450].forEach((f) => {
        const o = audioCtx.createOscillator();
        o.frequency.value = f;
        o.connect(gain);
        o.start(now);
        o.stop(now + times * 1.5);
      });
      for (let i = 0; i < times; i++) {
        const t = now + i * 1.5;
        [0, 0.6].forEach((off) => {
          gain.gain.setValueAtTime(0.06, t + off);
          gain.gain.setValueAtTime(0, t + off + 0.4);
        });
      }
    } catch {}
  }

  /* ---------- helpers ---------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    function setState(state) {
    phone.dataset.state = state;
    callBtn.setAttribute("aria-label", state === "idle" || state === "ended" ? `Call ${tree.name}` : "Hang up");
  }
  function bubble(who, text) {
    const p = document.createElement("p");
    p.className = "msg " + who;
    p.textContent = who === "ai" ? "" : text;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
    return p;
  }
  async function typeInto(el, text, id) {
    if (still.matches) {
      el.textContent = text;
      return;
    }
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (id !== session) return;
      el.textContent = words.slice(0, i + 1).join(" ");
      body.scrollTop = body.scrollHeight;
      await wait(70);
    }
  }

  /* ---------- the call ---------- */
  async function say(nodeId, id) {
    const node = tree.nodes[nodeId];
    phone.classList.add("speaking");
    status.textContent = "Jenny is speaking";
    const el = bubble("ai", node.say);
    await Promise.all([typeInto(el, node.say, id), speak(node.say, id)]);
    if (id !== session) return;
    phone.classList.remove("speaking");
    if (node.summary) return finish(node, id);
    status.textContent = "Your turn · choose a reply";
    replies.innerHTML = "";
    node.replies.forEach(([label, next], i) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.style.animationDelay = i * 70 + "ms";
      b.addEventListener("click", async () => {
        if (id !== session) return;
        replies.innerHTML = "";
        bubble("caller", label);
        status.textContent = "Jenny is listening";
        await wait(650);
        if (id === session) say(next, id);
      });
      replies.appendChild(b);
    });
    replies.querySelector("button")?.focus({ preventScroll: true });
  }

  async function finish(node, id) {
    await wait(700);
    if (id !== session) return;
    setState("ended");
    setListening(false);
    status.textContent = "Call ended · example summary below";
    const card = document.createElement("div");
    card.className = "msg recap";
    card.innerHTML =
      `<span class="mono">EXAMPLE CALL SUMMARY</span>` +
      node.summary.map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("") +
      `<div><small>Would go to</small><b>${node.to}</b></div>` +
      `<p class="recap-note">Demo only. No message was sent.</p>`;
    body.appendChild(card);
    const next = document.createElement("div");
    next.className = "msg next-step";
    next.innerHTML =
      `<p>That was a simulation. Want to hear the real Jenny answer calls like yours?</p>` +
      `<a class="btn btn-light btn-small" href="#book">Book 30 minutes <span aria-hidden="true">→</span></a>` +
      `<button type="button" class="again">Try another call</button>`;
    next.querySelector(".again").addEventListener("click", () => {
      (picks.find((b) => b.getAttribute("aria-checked") === "true") || picks[0]).focus();
    });
    body.appendChild(next);
    body.scrollTop = body.scrollHeight;
    deliver(node);
    // Keyboard and screen-reader users land on the next step instead of losing focus.
    next.querySelector("a").focus({ preventScroll: true });
  }

  function deliver(node) {
    inbox.querySelector(".inbox-empty")?.remove();
    const item = document.createElement("article");
    item.className = "inbox-item";
    item.style.setProperty("--tint", `var(--${tintVar[industry]})`);
    item.innerHTML =
      `<header><span class="dot"></span><b>${tree.name}</b><time>example</time></header>` +
      `<p>${node.summary.map(([, v]) => v).join(" · ")}</p>` +
      `<footer>Would go to → ${node.to}</footer>`;
    inbox.prepend(item);
    [...inbox.children].slice(4).forEach((old) => old.remove());
    inboxCta.hidden = false;
    stage.classList.remove("delivered");
    void stage.offsetWidth;
    stage.classList.add("delivered");
  }

  function setListening(on) {
    mode = on ? "listen" : "steer";
    listenBtn.classList.toggle("is-playing", on);
    listenLabel.textContent = on ? "Stop the example call" : "Or just listen to a full example call";
    phone.classList.toggle("listening", on);
  }

  async function call() {
    setListening(false);
    document.dispatchEvent(new Event("jobgen:demo-start"));
    const id = ++session;
    synth?.cancel();
    body.innerHTML = "";
    replies.innerHTML = "";
    setState("ringing");
    status.textContent = "Calling…";
    ring(2);
    await wait(still.matches ? 300 : 2600);
    if (id !== session) return;
    setState("live");
    say(tree.start, id);
  }

  /* ---------- listen mode: the scripted call from calls.js plays itself ---------- */
  async function listen() {
    const script = window.JOBGEN_CALLS?.[industry];
    if (!script) return;
    const id = ++session;
    document.dispatchEvent(new Event("jobgen:demo-start"));
    synth?.cancel();
    setListening(true);
    body.innerHTML = "";
    replies.innerHTML = "";
    setState("ringing");
    status.textContent = "Example call · ringing";
    ring(1);
    await wait(still.matches ? 300 : 1500);
    if (id !== session) return;
    setState("live");
    for (const line of script.lines) {
      if (id !== session) return;
      const ai = line.who === "ai";
      phone.classList.toggle("speaking", ai);
      status.textContent = ai ? "Jenny is speaking" : "Caller is speaking";
      const el = bubble(line.who, line.text);
      if (ai) await Promise.all([typeInto(el, line.text, id), speak(line.text, id, "ai")]);
      else await Promise.all([speak(line.text, id, "caller"), wait(voiceToggle.checked ? 0 : 900 + line.text.length * 25)]);
      await wait(350);
    }
    if (id !== session) return;
    phone.classList.remove("speaking");
    const rows = script.summary.filter(([k]) => k !== "Sent to");
    const to = (script.summary.find(([k]) => k === "Sent to") || [, "Your team"])[1];
    finish({ summary: rows, to }, id);
  }

  function hangUp() {
    session++;
    setListening(false);
    phone.classList.remove("speaking");
    synth?.cancel();
    replies.innerHTML = "";
    setState("ended");
    status.textContent = "Call ended";
  }

  function choose(key) {
    if (industry === key && phone.dataset.state === "idle") return;
    hangUp();
    industry = key;
    tree = TREES[key];
    picks.forEach((b) => {
      const on = b.dataset.industry === key;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    phone.style.setProperty("--tint", `var(--${tintVar[key]})`);
    nameEl.textContent = tree.name;
    body.innerHTML = '<p class="phone-hint">Press the green button to ring Jenny, or just listen to a full example call.</p>';
    setState("idle");
    status.textContent = "On shift · ready when you are";
  }

  callBtn.addEventListener("click", () => {
    const state = phone.dataset.state;
    if (state === "idle" || state === "ended") call();
    else hangUp();
  });
  picks.forEach((b) => b.addEventListener("click", () => choose(b.dataset.industry)));
  // Radio group keys: arrows move and select, Home/End jump to the ends. Only the selected option is tabbable.
  $(".try-pick").addEventListener("keydown", (e) => {
    const i = picks.indexOf(document.activeElement);
    if (i < 0) return;
    const last = picks.length - 1;
    const to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = picks[(to + picks.length) % picks.length];
    next.focus();
    choose(next.dataset.industry);
  });
  listenBtn.addEventListener("click", () => {
    if (mode === "listen") hangUp();
    else listen();
  });
  voiceToggle.addEventListener("change", () => {
    if (!voiceToggle.checked) synth?.cancel();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) synth?.cancel();
  });
  choose("education");
})();
