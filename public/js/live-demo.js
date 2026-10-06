/*
  Live voice demo: any element with data-live-demo="receptionist" | "sales" | "recruiter" opens
  JobGen's own live demo (the same widget jobgen.ai uses, served by sales.jobgen.ai). Its API only
  answers jobgen.ai, so anywhere else (the Vercel preview, localhost) the button opens
  https://jobgen.ai/demo/ in a new tab instead of failing.
*/
(() => {
  const WIDGET = "https://sales.jobgen.ai/voice-demo-widget.js?v=20260908";
  const LIVE_HOSTS = ["jobgen.ai", "www.jobgen.ai"];
  const FALLBACK = "https://jobgen.ai/demo/";
  const onJobgen = LIVE_HOSTS.includes(location.hostname);
  let loading = null;

  const load = () => {
    if (window.JobGenVoiceDemo) return Promise.resolve();
    if (loading) return loading;
    if (!document.querySelector("jobgen-voice-demo")) {
      const el = document.createElement("jobgen-voice-demo");
      el.setAttribute("privacy-url", "https://recruiter.jobgen.ai/privacy");
      el.setAttribute("booking-url", "https://calendly.com/jobgen-demo/30min");
      document.body.appendChild(el);
    }
    loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = WIDGET;
      s.async = true;
      s.onload = () => (window.JobGenVoiceDemo ? resolve() : reject(new Error("no widget")));
      s.onerror = () => reject(new Error("load failed"));
      document.head.appendChild(s);
    }).catch((e) => {
      loading = null;
      throw e;
    });
    return loading;
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest?.("[data-live-demo]");
    if (!trigger) return;
    e.preventDefault();
    if (!onJobgen) {
      window.open(FALLBACK, "_blank", "noopener");
      return;
    }
    const product = trigger.getAttribute("data-live-demo") || "receptionist";
    const status = (trigger.closest(".listen-live, section") || document).querySelector("[data-live-demo-status]");
    if (status) status.textContent = "Opening the live demo…";
    load()
      .then(() => {
        document.querySelector("jobgen-voice-demo")?.setAttribute("default-product", product);
        window.JobGenVoiceDemo.open();
        if (status) status.textContent = "";
      })
      .catch(() => {
        if (status) status.textContent = "The live demo couldn’t load just now. Try again, or book a demo below.";
      });
  });

  // Links point at the fallback until the page knows it can run the demo in place.
  document.querySelectorAll("a[data-live-demo]").forEach((a) => {
    a.href = onJobgen ? "#live-demo" : FALLBACK;
    if (!onJobgen) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });
})();
