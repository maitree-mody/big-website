(function () {
  const BIG = window.BIG;
  const page = document.body.dataset.page;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const TYPE_LABEL = { speaker: "Speaker", "site-visit": "Site visit", workshop: "Workshop", community: "Community" };

  // ---------- Dates ----------
  const parseDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmt = (iso, opts) => parseDate(iso).toLocaleDateString("en-US", opts);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const term = (iso) => { const d = parseDate(iso), m = d.getMonth(); return (m >= 7 ? "Fall " : m <= 4 ? "Spring " : "Summer ") + d.getFullYear(); };

  // ---------- Events ----------
  const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const events = BIG.events.map((e) => ({ ...e, slug: e.date + "-" + slugify(e.title) })).sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = events.filter((e) => parseDate(e.date) >= today).reverse();
  const past = events.filter((e) => parseDate(e.date) < today);
  const eventUrl = (e) => "event.html?e=" + encodeURIComponent(e.slug);
  const withOrg = (e) => e.org && e.org !== "BIG" && !e.title.includes(e.org) ? e.org : "";

  const dateBlock = (iso) => `<span class="date-block"><span>${fmt(iso, { month: "short" })}</span><strong>${fmt(iso, { day: "numeric" })}</strong><span>${fmt(iso, { weekday: "short" })}</span></span>`;

  // ---------- Photo banners: <section data-bg="path"> ----------
  document.querySelectorAll("[data-bg]").forEach((el) => { el.style.backgroundImage = `url("${el.dataset.bg}")`; });

  // ---------- Shared header / footer ----------
  const NAV = [["about", "About"], ["events", "Events"], ["team", "Team"], ["newsletter", "Newsletter"], ["join", "Join"]];
  const current = page === "event" ? "events" : page;
  $("#site-header").outerHTML = `
    <header class="site-header">
      <div class="wrap site-header__inner">
        <a class="brand" href="index.html"><img src="assets/logo.png" alt="" /><span>Barnard<br />Investment Group</span></a>
        <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
        <nav class="nav" id="nav">
          ${NAV.map(([k, label]) => `<a href="${k}.html"${k === current ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
      </div>
    </header>`;
  $("#site-footer").outerHTML = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand"><img src="assets/logo.png" alt="Barnard Investment Group logo" /><p>Empowering women to pursue careers in finance.</p></div>
          <div><h4>Explore</h4><ul>${NAV.map(([k, l]) => `<li><a href="${k}.html">${l}</a></li>`).join("")}</ul></div>
          <div><h4>Follow</h4><ul>
            <li><a href="${esc(BIG.links.instagram)}" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="${esc(BIG.links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="${esc(BIG.links.substack)}" target="_blank" rel="noopener">Substack</a></li>
            <li><a href="${esc(BIG.links.linktree)}" target="_blank" rel="noopener">Linktree</a></li></ul></div>
          <div><h4>Contact</h4>
            <a href="mailto:${esc(BIG.links.email)}">${esc(BIG.links.email)}</a>
            <address>Barnard College<br />3009 Broadway<br />New York, NY 10027</address></div>
        </div>
        <div class="footer-base">
          <span>© ${new Date().getFullYear()} Barnard Investment Group · A student organization at Barnard College</span>
          <span>Campus photos via Wikimedia Commons: <a href="https://commons.wikimedia.org/wiki/File:Milbank,_Brinckerhoff,_and_Fiske_Halls_-_Barnard_College_(55466789970).jpg" target="_blank" rel="noopener">Ajay Suresh</a> (CC BY 4.0), <a href="https://commons.wikimedia.org/wiki/File:Milstein_front.jpg" target="_blank" rel="noopener">Mollywollydoodle</a> (CC BY-SA 4.0), <a href="https://commons.wikimedia.org/wiki/File:Barnard_College_of_Columbia_University_(52008382627).jpg" target="_blank" rel="noopener">Ajay Suresh</a> (CC BY 2.0), <a href="https://commons.wikimedia.org/wiki/File:Barnard_College_WDNY_2024_jeh.jpg" target="_blank" rel="noopener">Jim Henderson</a> (CC BY 4.0), <a href="https://commons.wikimedia.org/wiki/File:2014_Barnard_College_Lehman_Hall.jpg" target="_blank" rel="noopener">Beyond My Ken</a> (CC BY-SA 4.0), <a href="https://commons.wikimedia.org/wiki/File:ColumbiaCampusSunset.JPG" target="_blank" rel="noopener">Ctrl build</a> (CC BY-SA 3.0). Firm logos are trademarks of their respective owners.</span>
        </div>
      </div>
    </footer>`;

  // Transparent header over the photo, solid once you scroll past it
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const menu = $(".menu-btn");
  menu.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    menu.setAttribute("aria-expanded", open);
    menu.textContent = open ? "Close" : "Menu";
  });

  // Fill any [data-link="key"] anchor from data.js
  document.querySelectorAll("[data-link]").forEach((a) => {
    const url = BIG.links[a.dataset.link];
    if (url) a.href = url; else a.hidden = true;
  });

  // ---------- Shared bits ----------
  const eventRow = (e) => `
    <li><a href="${eventUrl(e)}">
      <time datetime="${e.date}">${fmt(e.date, { month: "short", day: "numeric" })}</time>
      <span><strong>${esc(e.title)}</strong>${e.photos && e.photos.length ? '<span class="photo-flag">Photos</span>' : ""}${withOrg(e) ? `<small>${esc(withOrg(e))}</small>` : ""}</span>
      <span class="tag tag--${e.type}">${TYPE_LABEL[e.type] || ""}</span>
      <span class="go">→</span>
    </a></li>`;

  const render = {
    home() {
      $("#firms").innerHTML = BIG.firms.map((f) => `<li><img src="${esc(f.logo)}" alt="${esc(f.name)}"${f.tall ? ' class="tall"' : f.wide ? ' class="wide"' : ""} loading="lazy" /></li>`).join("");
      const n = upcoming[0];
      $("#next").innerHTML = n ? `
        <p class="caps">Next event</p>
        <a class="next-card" href="${eventUrl(n)}">
          ${dateBlock(n.date)}
          <div><h3>${esc(n.title)}</h3><p>${esc([n.time, n.location].filter(Boolean).join(" · "))}</p><span class="more more--light">Event details →</span></div>
        </a>` : `
        <p class="caps">Next event</p>
        <h3 style="margin:14px 0 8px">Events are announced weekly.</h3>
        <p>Subscribe to the newsletter for the latest speaker events and site visits.</p>
        <a class="more more--light" href="events.html">Event archive →</a>`;
    },

    about() {},

    events() {
      $("#upcoming").innerHTML = upcoming.length
        ? `<div class="upcoming">${upcoming.map((e) => `
            <a class="event-card" href="${eventUrl(e)}">
              ${dateBlock(e.date)}
              <div><span class="tag tag--${e.type}">${TYPE_LABEL[e.type]}</span><h3>${esc(e.title)}</h3>
              <p class="meta">${esc([e.time, e.location].filter(Boolean).join(" · "))}</p></div>
            </a>`).join("")}</div>`
        : `<p class="empty">Nothing on the calendar yet. Subscribe to the <a href="newsletter.html">newsletter</a> or follow along on <a href="${esc(BIG.links.instagram)}" target="_blank" rel="noopener">Instagram</a>.</p>`;

      const TERMS_SHOWN = 2;
      let filter = "all", showAll = false;
      const draw = () => {
        const list = past.filter((e) => filter === "all" || (filter === "photos" ? e.photos && e.photos.length : e.type === filter));
        const terms = [...new Set(list.map((e) => term(e.date)))];
        const visible = showAll || filter !== "all" ? terms : terms.slice(0, TERMS_SHOWN);
        $("#archive").innerHTML = terms.length ? visible.map((t) => {
          const items = list.filter((e) => term(e.date) === t);
          return `<div class="term"><h3>${t} <span>${items.length} event${items.length > 1 ? "s" : ""}</span></h3>
            <ul class="elist">${items.map(eventRow).join("")}</ul></div>`;
        }).join("") : `<p class="empty">No events match.</p>`;
        $("#more").hidden = visible.length === terms.length;
      };
      $("#filters").addEventListener("click", (ev) => {
        const b = ev.target.closest("button"); if (!b) return;
        filter = b.dataset.filter;
        document.querySelectorAll("#filters button").forEach((x) => x.classList.toggle("is-active", x === b));
        draw();
      });
      $("#more").addEventListener("click", () => { showAll = true; draw(); });
      draw();
    },

    event() {
      const slug = new URLSearchParams(location.search).get("e");
      const i = events.findIndex((e) => e.slug === slug);
      const e = events[i];
      if (!e) { $("#event-title").textContent = "Event not found."; $("#event").innerHTML = `<a class="more" href="events.html">← All events</a>`; return; }
      document.title = e.title + " · Barnard Investment Group";
      $("#event-meta").textContent = `${TYPE_LABEL[e.type]} · ${term(e.date)}`;
      $("#event-title").textContent = e.title;
      $("#event-org").textContent = withOrg(e);

      const paras = (e.recap || e.description || `Barnard Investment Group hosted ${e.title}${withOrg(e) ? " with " + withOrg(e) : ""}.`)
        .split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join("");
      const facts = [
        ["Date", fmt(e.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })],
        ["Time", e.time], ["Location", e.location], ["With", e.org !== "BIG" ? e.org : ""], ["Type", TYPE_LABEL[e.type]],
      ].filter(([, v]) => v);
      const photos = e.photos || [];
      const newer = events[i - 1], older = events[i + 1];
      const isFuture = parseDate(e.date) >= today;

      $("#event").innerHTML = `
        <a class="more crumb" href="events.html">← All events</a>
        <div class="event-body">
          <div class="prose">${paras}
            ${e.link && isFuture ? `<p class="prose-actions"><a class="btn" href="${esc(e.link)}" target="_blank" rel="noopener">RSVP &amp; details</a></p>` : ""}
            ${!photos.length && !isFuture ? `<p class="prose-actions"><a class="more" href="${esc(BIG.links.instagram)}" target="_blank" rel="noopener">View more on Instagram →</a></p>` : ""}
          </div>
          <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        </div>
        ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${esc(src)}" alt="${esc(e.title)}" loading="lazy" />`).join("")}</div>` : ""}
        <nav class="pager">
          ${older ? `<a href="${eventUrl(older)}"><span class="caps">← Previous</span><strong>${esc(older.title)}</strong></a>` : ""}
          ${newer ? `<a class="next" href="${eventUrl(newer)}"><span class="caps">Next →</span><strong>${esc(newer.title)}</strong></a>` : ""}
        </nav>`;
    },

    team() {
      $("#eboard-year").textContent = BIG.eboardYear;
      const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
      $("#board").innerHTML = BIG.eboard.map((p) => `
        <article class="member">
          <div class="member__photo">${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy" />` : `<span>${esc(initials(p.name))}</span>`}</div>
          <h3>${esc(p.name)}</h3>
          <p class="role">${esc(p.role)}</p>
          ${p.major ? `<p class="major">${esc(p.major)}</p>` : ""}
          ${p.experience && p.experience.length ? `<p class="exp">${p.experience.map(esc).join(" · ")}</p>` : ""}
          ${p.linkedin ? `<a href="${esc(p.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        </article>`).join("");
    },

    newsletter() {
      const issues = window.BIG_NEWSLETTER || [];
      $("#issues").innerHTML = issues.map((p) => `
        <a class="issue" href="${esc(p.url)}" target="_blank" rel="noopener">
          <p class="caps">${fmt(p.date, { month: "long", day: "numeric", year: "numeric" })}</p>
          <h3>${esc(p.title)}</h3>
          ${p.highlights.length ? `<ul>${p.highlights.slice(0, 3).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : `<p>${esc(p.subtitle)}</p>`}
        </a>`).join("");
    },

    join() {
      if (BIG.links.eboardApplication) $("#apply-note").hidden = true;
    },
  };

  (render[page] || (() => {}))();

})();
