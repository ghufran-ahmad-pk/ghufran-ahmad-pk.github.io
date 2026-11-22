/* =====================================================================
   site.js  |  builds every page from content.js and runs the motion
   You should not need to edit this file. Edit content.js instead.
   ===================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var page = body.getAttribute("data-page") || "";
  var C = window.SITE_CONTENT;
  var P = window.Art;

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var STATUSES = ["Published", "Accepted", "Under review", "Submitted", "In review", "Planned"];
  var TYPE_LABEL = { tool: "Interactive tool", infographic: "Infographic", exhibit: "Exhibition", animation: "Animation", video: "Short video", external: "Post" };
  var TYPE_PLURAL = { tool: "Interactive tools", infographic: "Infographics", exhibit: "Exhibitions", animation: "Animations", video: "Videos", external: "Posts" };
  var CURSOR = { tool: "Explore", infographic: "View", exhibit: "View", animation: "Play", video: "Play", external: "Open" };

  /* ------------------------------------------------------------------
     helpers
     ------------------------------------------------------------------ */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v == null || v === false) continue;
        if (k === "class") e.className = v;
        else if (k === "text") e.textContent = v;
        else if (k === "style") e.style.cssText = v;
        else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? "" : v);
      }
    }
    if (kids != null) {
      (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
        if (c == null || c === false) return;
        e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return e;
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function str(v) { return typeof v === "string" ? v.trim() : ""; }
  function list(v) { return Array.isArray(v) ? v : []; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // only allow normal web links, mail links and files inside the site
  function safeUrl(u) {
    u = str(u);
    if (!u) return "";
    if (/^(https?:)?\/\//i.test(u) || /^mailto:/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return "";      // blocks javascript: and friends
    return u;
  }
  function arrow() { return h("span", { class: "arr", "aria-hidden": "true", text: "↗" }); }
  function ext(a) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); return a; }

  /* ------------------------------------------------------------------
     content error notice (helps when a comma goes missing in content.js)
     ------------------------------------------------------------------ */
  if (!C || typeof C !== "object") {
    C = {};
    body.appendChild(h("div", {
      role: "alert",
      style: "position:fixed;left:0;right:0;bottom:0;z-index:300;padding:14px 18px;background:#b81530;color:#fff;font:600 15px/1.4 system-ui,sans-serif"
    }, "content.js could not be read. Check your last edit for a missing comma or quote mark."));
  }
  var person = C.person || {};
  var links = C.links || {};
  var projects = list(C.projects).filter(function (p) { return p && str(p.id) && TYPE_LABEL[p.type] && p.draft !== true; });
  var research = list(C.research).filter(function (r) { return r && (str(r.label) || str(r.title)); });
  var certs = list(C.certificates).filter(function (c) { return c && str(c.title); });
  var learning = list(C.currentlyLearning).map(str).filter(Boolean);

  /* ------------------------------------------------------------------
     media with graceful fallback (never a broken image)
     ------------------------------------------------------------------ */
  function media(src, alt, type, seed, eager, tag) {
    src = safeUrl(src);
    if (!src) return P.placeholder(type, seed, tag);
    var box = h("div", { class: "media" });
    var img = h("img", { src: src, alt: alt || "", decoding: "async", loading: eager ? "eager" : "lazy" });
    img.addEventListener("error", function () {
      var ph = P.placeholder(type, seed, tag);
      if (box.parentNode) box.parentNode.replaceChild(ph, box);
    });
    box.appendChild(img);
    return box;
  }

  /* ------------------------------------------------------------------
     project card
     ------------------------------------------------------------------ */
  function projectHref(p) {
    return p.type === "external" ? safeUrl(p.url) : "project.html?id=" + encodeURIComponent(p.id);
  }
  function card(p, n, tag) {
    var href = projectHref(p);
    var a = h(href ? "a" : "div", { class: "card", href: href || null, "data-type": p.type, "data-cursor": CURSOR[p.type] });
    if (p.type === "external" && href) ext(a);

    var m = h("div", { class: "card-media" });
    m.appendChild(media(p.image || p.poster, str(p.alt) || str(p.title), p.type, p.id));
    m.appendChild(h("span", { class: "card-chip" }, [h("i"), p.type === "external" && str(p.platform) ? str(p.platform) : TYPE_LABEL[p.type]]));
    if (str(p.duration)) m.appendChild(h("span", { class: "card-chip card-chip--r", text: str(p.duration) }));
    a.appendChild(m);

    var meta = [h("span", { class: "card-idx", text: pad(n) })];
    if (str(p.series)) meta.push(h("span", { text: str(p.series) }));
    else meta.push(h("span", { text: TYPE_LABEL[p.type] }));
    if (str(p.date)) meta.push(h("span", { text: str(p.date) }));
    a.appendChild(h("div", { class: "card-body" }, [
      h("div", { class: "card-meta" }, meta),
      h(tag || "h3", { class: "card-title" }, h("span", { text: str(p.title) || "Untitled" }))
    ]));

    if (FINE && !RM && p.type === "video") wireCard(a, m, p);
    return a;
  }

  // desktop only: a short muted preview when the pointer rests on a video card
  function wireCard(a, m, p) {
    var vid = null;
    a.addEventListener("pointerenter", function () {
      if (!safeUrl(p.src)) return;
      if (!vid) {
        vid = h("video", { muted: true, loop: true, playsinline: true, preload: "none", "aria-hidden": "true", tabindex: "-1" });
        vid.muted = true;
        vid.addEventListener("playing", function () { vid.classList.add("is-playing"); });
        vid.addEventListener("error", function () { vid.classList.remove("is-playing"); });
        vid.src = safeUrl(p.src);
        m.appendChild(vid);
      }
      var pr = vid.play();
      if (pr && pr.catch) pr.catch(function () {});
    });
    a.addEventListener("pointerleave", function () {
      if (vid) { vid.pause(); vid.classList.remove("is-playing"); }
    });
  }

  function badge(status) {
    if (STATUSES.indexOf(status) === -1) {
      if (window.console) console.warn('Unknown status "' + status + '". Use one of: ' + STATUSES.join(", "));
      return null;
    }
    return h("span", { class: "badge", "data-status": status }, [h("i", { "aria-hidden": "true" }), status]);
  }

  /* ------------------------------------------------------------------
     shared: fill static text and links from content.js
     ------------------------------------------------------------------ */
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o && o[k]; }, C);
  }
  function starred(text) {             // "turning *pixels* on"  ->  nodes with one highlighted word
    var out = [];
    String(text).split(/(\*[^*]+\*)/).forEach(function (part) {
      if (!part) return;
      if (/^\*[^*]+\*$/.test(part)) out.push(h("em", { class: "hl", text: part.slice(1, -1) }));
      else out.push(document.createTextNode(part));
    });
    return out;
  }
  function bind() {
    $$("[data-bind]").forEach(function (el) {
      var v = str(get(el.getAttribute("data-bind")));
      if (!v) return;
      if (el.hasAttribute("data-star")) { el.textContent = ""; starred(v).forEach(function (n) { el.appendChild(n); }); }
      else el.textContent = v;
    });
    $$("[data-link]").forEach(function (el) {
      var key = el.getAttribute("data-link");
      var url = safeUrl(links[key]);
      if (key === "email" && url && !/^mailto:/i.test(url)) url = "mailto:" + url;
      var holder = el.closest("[data-link-wrap]") || el;
      if (!url) { holder.hidden = true; return; }
      holder.hidden = false;
      el.setAttribute("href", url);
    });
    var orcid = str(links.orcid);
    $$("[data-orcid-id]").forEach(function (el) {
      var id = orcid.replace(/^https?:\/\/orcid\.org\//i, "").replace(/\/$/, "");
      if (id) el.textContent = id;
    });
    $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
    $$("[data-updated]").forEach(function (el) {
      if (str(person.updated)) { el.textContent = "Last updated " + str(person.updated) + "."; el.hidden = false; } else el.hidden = true;
    });
  }

  /* ------------------------------------------------------------------
     shared: marquee and "currently learning" ticker
     ------------------------------------------------------------------ */
  function buildMarquee(el, items) {
    if (!el || !items.length) return;
    var track = h("div", { class: "marquee-track" });
    var reps = Math.max(2, Math.ceil(10 / items.length));
    for (var copy = 0; copy < 2; copy++) {
      var ul = h("ul", copy ? { "aria-hidden": "true" } : null);
      for (var r = 0; r < (copy ? reps : reps); r++) {
        items.forEach(function (t) {
          var li = h("li", { text: t });
          if (r > 0 && !copy) li.setAttribute("aria-hidden", "true");
          ul.appendChild(li);
        });
      }
      track.appendChild(ul);
    }
    el.textContent = "";
    el.appendChild(track);
  }
  function buildLearning() {
    $$("[data-learning]").forEach(function (sec) {
      if (!learning.length) { sec.hidden = true; return; }
      sec.hidden = false;
      var slot = $("[data-learning-slot]", sec);
      if (!slot) return;
      slot.textContent = "";
      var mq = h("div", { class: "marquee ticker" });
      buildMarquee(mq, learning);
      slot.appendChild(h("div", { class: "ticker-wrap" }, [h("span", { class: "ticker-tag", text: "Currently learning" }), mq]));
    });
  }

  /* ------------------------------------------------------------------
     shared: certificates and research cells
     ------------------------------------------------------------------ */
  function buildCerts(el) {
    if (!el) return;
    if (!certs.length) { var s = el.closest("[data-certs-section]"); if (s) s.hidden = true; return; }
    el.textContent = "";
    certs.forEach(function (c, i) {
      var kids = [
        h("div", { class: "r-top" }, [P.icon("certificate", "cert-ico"), h("span", { class: "cell-num", text: pad(i + 1) })]),
        h("h3", { class: "push", text: str(c.title) }),
        h("p", { class: "muted", text: [str(c.issuer), str(c.date)].filter(Boolean).join(" · ") })
      ];
      if (str(c.credentialId)) kids.push(h("p", { class: "fine", text: "Credential ID " + str(c.credentialId) }));
      var v = safeUrl(c.verifyUrl);
      if (v) kids.push(ext(h("a", { class: "textlink", href: v, style: "width:fit-content" }, ["Verify certificate ", arrow()])));
      var art = h("article", { class: "cell cert", "data-reveal": "", style: "--d:" + (i % 4) * 90 + "ms" }, kids);
      if (i >= 4) art.hidden = true;
      el.appendChild(art);
    });
    // strongest four first, the rest behind one button
    var old = el.parentNode.querySelector(".certs-more"); if (old) old.remove();
    if (certs.length > 4) {
      var more = h("button", { class: "btn btn--ghost certs-more", type: "button", "aria-expanded": "false" }, "Show all " + certs.length + " certificates");
      more.addEventListener("click", function () {
        $$(".cert", el).forEach(function (c) { c.hidden = false; c.classList.add("in"); });
        more.remove();
      });
      el.parentNode.insertBefore(more, el.nextSibling);
    }
    // courses still in progress
    var cw = $("#courses-wrap"), cl = $("#courses"), cs = list(C.coursesInProgress).filter(function (c) { return c && str(c.title); });
    if (cw && cl) {
      cl.textContent = "";
      cs.forEach(function (c) {
        cl.appendChild(h("li", null, [h("span", { class: "badge", "data-status": "Planned" }, [h("i", { "aria-hidden": "true" }), str(c.state) || "In progress"]), h("strong", { text: str(c.title) }), h("span", { class: "muted", text: str(c.issuer) })]));
      });
      cw.hidden = !cs.length;
    }
  }

  function researchCell(r, i, span) {
    var top = h("div", { class: "r-top" }, [h("span", { class: "cell-num", text: pad(i + 1) }), badge(str(r.status))]);
    var kids = [top, h("h3", { class: "r-label push", text: str(r.label) || str(r.title) })];
    if (str(r.label) && str(r.title)) kids.push(h("p", { class: "r-title", text: str(r.title) }));
    if (str(r.summary)) kids.push(h("p", { class: "muted", text: str(r.summary) }));
    var dl = [];
    if (str(r.role)) dl.push(h("div", null, [h("dt", { text: "Role" }), h("dd", { text: str(r.role) })]));
    if (str(r["with"])) dl.push(h("div", null, [h("dt", { text: "With" }), h("dd", null, safeUrl(r.withUrl) ? ext(h("a", { class: "textlink", href: safeUrl(r.withUrl) }, [str(r["with"]) + " ", arrow()])) : str(r["with"]))]));
    if (str(r.when)) dl.push(h("div", null, [h("dt", { text: "When" }), h("dd", { text: str(r.when) })]));
    if (str(r.note)) dl.push(h("div", null, [h("dt", { text: "Note" }), h("dd", { text: str(r.note) })]));
    if (dl.length) kids.push(h("dl", null, dl));
    var l = safeUrl(r.link);
    if (l) kids.push(ext(h("a", { class: "textlink", href: l, style: "width:fit-content" }, ["Open ", arrow()])));
    return h("article", { class: "cell r-card c" + span, "data-reveal": "", style: "--d:" + (i % 3) * 90 + "ms" }, kids);
  }

  /* ------------------------------------------------------------------
     HOME
     ------------------------------------------------------------------ */
  function home() {
    heroPhoto();
    // topics strip
    buildMarquee($("#topics"), list(C.topics).map(str).filter(Boolean));

    // the row of numbers under the hero comes from content.js (real figures only)
    var factsEl = $("#facts"), fs = list(C.facts).filter(function (f) { return f && str(String(f.number)) && str(f.label); }).slice(0, 4);
    if (factsEl && fs.length) {
      factsEl.textContent = "";
      factsEl.setAttribute("data-n", String(fs.length));
      fs.forEach(function (f) {
        var raw = str(String(f.number)), mm = /^(\d+)(.*)$/.exec(raw);
        var b = h("b", { text: mm ? pad(+mm[1]) + mm[2] : raw });
        if (mm) { b.setAttribute("data-count", ""); b.setAttribute("data-to", mm[1]); b.setAttribute("data-suffix", mm[2]); }
        factsEl.appendChild(h("div", { class: "fact" }, [h("dt", { class: "sr-only", text: str(f.label) }), h("dd", null, b), h("span", { "aria-hidden": "true", text: str(f.label) })]));
      });
    }

    // interactive learning tools: large feature cards
    var toolsEl = $("#tools");
    var tools = projects.filter(function (p) { return p.type === "tool" && p.featured; });
    if (toolsEl) {
      toolsEl.textContent = "";
      tools.forEach(function (p, i) {
        var a = h("a", { class: "feature", href: projectHref(p), "data-cursor": "Explore", "data-reveal": "", style: "--d:" + i * 120 + "ms" }, [
          h("div", { class: "feature-media" }, [media(p.image, str(p.alt) || str(p.title), "tool", p.id), str(p.status) ? h("span", { class: "card-chip" }, [h("i"), str(p.status)]) : null]),
          h("div", { class: "feature-body" }, [
            h("p", { class: "label", text: "Interactive tool " + pad(i + 1) }),
            h("h3", { class: "feature-title" }, h("span", { text: str(p.title) })),
            str(p.caption) ? h("p", { class: "muted", text: str(p.caption) }) : null,
            str(p.note) ? h("p", { class: "fine", text: str(p.note) }) : null,
            h("span", { class: "textlink", style: "width:fit-content" }, ["Open the tool page ", arrow()])
          ])
        ]);
        toolsEl.appendChild(a);
      });
      var ts = toolsEl.closest("section"); if (ts) ts.hidden = !tools.length;
    }

    // selected work (everything featured that is not a tool)
    var track = $("#selected");
    if (track) {
      var feat = projects.filter(function (p) { return p.featured && p.type !== "tool"; });
      if (!feat.length) feat = projects.filter(function (p) { return p.type !== "tool"; }).slice(0, 5);
      track.textContent = "";
      feat.forEach(function (p, i) {
        var c = card(p, i + 1);
        c.classList.add("hs-item");
        track.appendChild(c);
      });
      track.appendChild(h("a", { class: "hs-end", href: "work.html", "data-cursor": "All" }, [
        h("span", { class: "label", text: pad(projects.length) + " pieces so far" }),
        h("p", null, ["See all the ", h("em", { class: "hl", text: "work" })]),
        h("span", { class: "textlink", style: "width:fit-content" }, ["Open the Work page ", arrow()])
      ]));
      if (!feat.length) { var s = track.closest("section"); if (s) s.hidden = true; }
    }

    // research snapshot
    var rows = $("#research-rows");
    if (rows) {
      rows.textContent = "";
      research.forEach(function (r, i) {
        var kids = [
          h("span", { class: "cell-num", text: pad(i + 1) }),
          h("h3", { class: "r-label", text: str(r.label) || str(r.title) }),
          badge(str(r.status))
        ];
        if (str(r.note)) kids.push(h("p", { class: "r-note", text: str(r.note) }));
        rows.appendChild(h("li", { class: "r-row", "data-reveal": "", style: "--d:" + i * 80 + "ms" }, kids));
      });
    }

    shortsBlock();
    channels();
  }

  // side project: short explainer videos. A typographic card first, the real video only after a click.
  function shortsBlock() {
    var wrap = $("#shorts");
    if (!wrap) return;
    var sh = C.shorts || {};
    var vids = list(sh.videos).filter(function (v) { return v && /^[\w-]{6,20}$/.test(str(v.videoId)); }).slice(0, 6);
    var sec = wrap.closest("section");
    if (!vids.length) { if (sec) sec.hidden = true; return; }
    var note = $("#shorts-note"); if (note && str(sh.note)) note.textContent = str(sh.note);
    wrap.textContent = "";
    var local = !/^https?:$/.test(location.protocol);     // double-clicked file: YouTube refuses to play inside the page
    vids.forEach(function (v, i) {
      var id = str(v.videoId), title = str(v.title) || "Watch this short";
      var watch = "https://www.youtube.com/shorts/" + encodeURIComponent(id);
      var img = h("img", { class: "short-img", src: safeUrl(v.thumb) || "assets/images/shorts/" + id + ".jpg", alt: "", loading: "lazy", decoding: "async" });
      var kids = [
        img,
        h("span", { class: "short-num", "aria-hidden": "true", text: pad(i + 1) }),
        h("span", { class: "short-foot" }, [h("span", { class: "play" }, playIcon()), h("span", { class: "short-title", text: title })])
      ];
      var card = local
        ? ext(h("a", { class: "short has-img", href: watch, "data-cursor": "Watch", "data-reveal": "", style: "--d:" + i * 90 + "ms" }, kids))
        : h("button", { class: "short has-img", type: "button", "data-cursor": "Play", "data-reveal": "", style: "--d:" + i * 90 + "ms" }, kids);
      img.addEventListener("error", function () { img.remove(); card.classList.remove("has-img"); });
      var cell = h("div", { class: "short-cell" }, [card, ext(h("a", { class: "fine short-link", href: watch }, ["Watch on YouTube ", arrow()]))]);
      if (!local) card.addEventListener("click", function () {
        var box = h("div", { class: "short short--live" }, h("iframe", {
          src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0&playsinline=1",
          title: title, referrerpolicy: "strict-origin-when-cross-origin",
          allow: "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen; web-share", allowfullscreen: true
        }));
        cell.replaceChild(box, card);
      });
      wrap.appendChild(cell);
    });
  }

  // the portrait in the home hero (hidden when person.photo is empty or the file is missing)
  function heroPhoto() {
    var hp = $("#hero-photo");
    if (!hp) return;
    var src = safeUrl(person.photo);
    if (!src) { hp.hidden = true; return; }
    var im = $("img", hp);
    if (im.getAttribute("src") !== src) im.setAttribute("src", src);
    im.addEventListener("error", function () { hp.hidden = true; });
  }

  function channels() {
    var wrap = $("#channels");
    if (!wrap) return;
    var ch = C.channels || {};
    var defs = [
      { key: "instagram", name: "Instagram", note: ch.instagramNote, accent: true },
      { key: "youtube", name: "YouTube", note: ch.youtubeNote },
      { key: "linkedin", name: "LinkedIn", note: ch.linkedinNote },
      { key: "facebook", name: "Facebook", note: ch.facebookNote }
    ].filter(function (d) { return safeUrl(links[d.key]) && (!Array.isArray(ch.cards) || ch.cards.indexOf(d.key) > -1); });

    var hl = $("#highlight"), hd = ch.highlight || {};
    if (hl) {
      if (str(hd.big)) {
        hl.textContent = "";
        hl.appendChild(h("p", { class: "label", text: str(hd.label) || "Highlight" }));
        hl.appendChild(h("p", { class: "cell-big push", text: str(hd.big) }));
        if (str(hd.text)) hl.appendChild(h("p", { class: "muted", text: str(hd.text) }));
        if (safeUrl(hd.url)) hl.appendChild(ext(h("a", { class: "textlink", href: safeUrl(hd.url), style: "width:fit-content" }, ["See the post ", arrow()])));
        hl.hidden = false;
      } else hl.hidden = true;
    }

    wrap.textContent = "";
    defs.forEach(function (d, i) {
      var a = ext(h("a", {
        class: "cell channel" + (i === 0 ? " cell--accent" : ""), href: safeUrl(links[d.key]),
        "data-cursor": "Open", "data-reveal": "", style: "--d:" + i * 90 + "ms"
      }, [
        h("span", { class: "label", text: "Channel " + pad(i + 1) }),
        h("p", { class: "channel-name push", text: d.name }),
        str(d.note) ? h("p", { class: "muted", text: str(d.note) }) : null,
        h("span", { class: "go" }, ["Open " + d.name + " ", arrow()])
      ]));
      wrap.appendChild(a);
    });

    var embeds = $("#embeds");
    var vids = list(ch.youtubeVideos).filter(function (v) { return v && /^[\w-]{6,20}$/.test(str(v.videoId)); });
    var posts = list(ch.instagramPosts).filter(function (p) { return p && safeUrl(p.url); });
    if (embeds) {
      embeds.textContent = "";
      vids.forEach(function (v) {
        var title = str(v.title) || "YouTube video";
        var btn = h("button", { class: "yt", type: "button", "data-cursor": "Play", "aria-label": "Play video: " + title }, [
          P.placeholder("video", v.videoId, " "),
          h("span", { class: "yt-ui" }, h("span", { class: "play" }, playIcon())),
          h("span", { class: "label label--plain yt-note", text: "YouTube · loads on click" }),
          h("span", { class: "yt-title", text: title })
        ]);
        btn.firstChild.classList.add("ph--bare");
        btn.firstChild.style.cssText = "position:absolute;inset:0";
        btn.addEventListener("click", function () {
          var box = h("div", { class: "yt" }, h("iframe", {
            src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(str(v.videoId)) + "?autoplay=1&rel=0",
            title: title, allow: "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: true, loading: "lazy"
          }));
          btn.parentNode.replaceChild(box, btn);
        });
        embeds.appendChild(btn);
      });
      posts.forEach(function (p, i) {
        var thumb = h("span", { class: "thumb" }, media(p.image, "", "external", "ig" + i, false, " "));
        if (thumb.firstChild.classList.contains("ph")) thumb.firstChild.classList.add("ph--bare");
        embeds.appendChild(ext(h("a", { class: "cell ig-post", href: safeUrl(p.url), "data-cursor": "Open" }, [
          thumb,
          h("span", null, [h("span", { class: "label label--plain", text: "Instagram post" }), h("br"), h("strong", { text: str(p.title) || "View post" }), " ", arrow()])
        ])));
      });
      embeds.hidden = !(vids.length || posts.length);
    }
    var sec = wrap.closest("section");
    if (sec) sec.hidden = !(defs.length || vids.length || posts.length);
  }

  function playIcon() { return P.icon("play"); }

  /* ------------------------------------------------------------------
     WORK
     ------------------------------------------------------------------ */
  // the Mechanism series: a plain list of written posts with their sources
  function seriesBlock() {
    var listEl = $("#series");
    if (!listEl) return;
    var w = C.writing || {}, posts = list(w.posts).filter(function (p) { return p && str(p.title); });
    var sec = listEl.closest("section");
    if (!posts.length) { if (sec) sec.hidden = true; return; }
    var note = $("#series-note"); if (note && str(w.note)) note.textContent = str(w.note);
    var cnt = $("#series-count"); if (cnt) cnt.textContent = pad(posts.length);
    listEl.textContent = "";
    posts.forEach(function (p, i) {
      listEl.appendChild(h("li", { class: "s-row", "data-reveal": "", style: "--d:" + Math.min(i, 5) * 60 + "ms" }, [
        h("span", { class: "cell-num", text: pad(i + 1) }),
        h("span", { class: "s-topic", text: str(p.topic) }),
        h("h3", { class: "s-title", text: str(p.title) }),
        str(p.source) ? h("p", { class: "s-source", text: "Source: " + str(p.source) }) : null
      ]));
    });
  }

  function work() {
    seriesBlock();
    shortsBlock();
    var grid = $("#work-grid"), bar = $("#filters");
    if (!grid || !bar) return;
    var order = ["tool", "infographic", "exhibit", "animation", "video", "external"];
    var present = order.filter(function (t) { return projects.some(function (p) { return p.type === t; }); });
    var cards = projects.map(function (p, i) { var c = card(p, i + 1, "h2"); c.setAttribute("data-reveal", ""); return c; });
    var current = "all";

    function show(type, instant) {
      current = type;
      $$(".filter", bar).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === type)); });
      var next = cards.filter(function (c) { return type === "all" || c.getAttribute("data-type") === type; });
      function swap() {
        grid.textContent = "";
        next.forEach(function (c, i) {
          c.classList.remove("is-out"); c.classList.remove("in");
          c.style.setProperty("--d", Math.min(i, 6) * 70 + "ms");
          grid.appendChild(c);
        });
        if (!next.length) grid.appendChild(h("p", { class: "empty-note", text: "Nothing here yet." }));
        void grid.offsetWidth;
        requestAnimationFrame(function () { next.forEach(function (c) { c.classList.add("in"); }); });
        var st = $("#work-status"); if (st) st.textContent = next.length + (next.length === 1 ? " project shown" : " projects shown");
      }
      if (instant || RM) { swap(); return; }
      cards.forEach(function (c) { c.classList.add("is-out"); });
      setTimeout(swap, 260);
    }

    bar.textContent = "";
    [["all", "All", projects.length]].concat(present.map(function (t) {
      return [t, TYPE_PLURAL[t], projects.filter(function (p) { return p.type === t; }).length];
    })).forEach(function (f) {
      bar.appendChild(h("button", {
        class: "filter", type: "button", "data-filter": f[0], "aria-pressed": "false",
        onclick: function () {
          if (current === f[0]) return;
          show(f[0]);
          try { history.replaceState(null, "", f[0] === "all" ? "work.html" : "work.html?type=" + f[0]); } catch (e) {}
        }
      }, [f[1], h("sup", { text: pad(f[2]) })]));
    });

    var want = "";
    try { want = new URLSearchParams(location.search).get("type") || ""; } catch (e) {}
    grid.textContent = "";
    current = present.indexOf(want) > -1 ? want : "all";
    $$(".filter", bar).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === current)); });
    cards.filter(function (c) { return current === "all" || c.getAttribute("data-type") === current; })
      .forEach(function (c, i) { c.style.setProperty("--d", (i % 3) * 90 + "ms"); grid.appendChild(c); });
    if (!projects.length) grid.appendChild(h("p", { class: "empty-note", text: "Projects will appear here soon." }));
  }

  /* ------------------------------------------------------------------
     PROJECT (case study), built from ?id=
     ------------------------------------------------------------------ */
  function project() {
    var id = "";
    try { id = new URLSearchParams(location.search).get("id") || ""; } catch (e) {}
    var real = projects.filter(function (p) { return p.type !== "external"; });
    var idx = -1;
    real.forEach(function (p, i) { if (p.id === id) idx = i; });
    var view = $("#project");
    if (!view) return;
    if (idx === -1) {
      $("#project-missing").hidden = false;
      view.hidden = true;
      return;
    }
    var p = real[idx];
    var title = str(p.title) || "Untitled";
    document.title = title + " | " + (str(person.name) || "Portfolio");
    var md = $('meta[name="description"]');
    if (md && str(p.caption)) md.setAttribute("content", str(p.caption));

    $("#p-type").textContent = TYPE_LABEL[p.type];
    $("#p-type").setAttribute("href", "work.html?type=" + p.type);
    var t = $("#p-title"); t.textContent = title;

    // ----- stage
    var stage = $("#p-stage");
    stage.textContent = "";
    var extra = [];
    if (p.type === "tool") {
      var tsrc = safeUrl(p.src);
      var tframe = h("div", { class: "frame frame--wide", style: "aspect-ratio:16 / 9;--fw:1240px" });
      tframe.appendChild(media(p.image, str(p.alt) || title, "tool", p.id, true, " "));
      if (tframe.firstChild.classList.contains("ph")) tframe.firstChild.classList.add("ph--bare");
      if (tsrc) {
        tframe.appendChild(ext(h("a", { class: "stage-start", href: tsrc, "data-cursor": "Launch" }, [
          h("span", { class: "play" }, playIcon()), h("span", { class: "t", text: "Launch full screen" })
        ])));
        extra.push(ext(h("a", { class: "btn", href: tsrc }, ["Launch the tool ", arrow()])));
      }
      stage.appendChild(tframe);
    }
    else if (p.type === "infographic" || p.type === "exhibit") {
      var src = safeUrl(p.image);
      var holder = h("div", { class: "stage-img" });
      var m = media(src, str(p.alt) || title, "infographic", p.id, true, "Image not added yet");
      if (src && m.classList.contains("media")) {
        var a = ext(h("a", { href: src, "data-cursor": "Zoom", "aria-label": "Open the full-size image in a new tab" }, m));
        holder.appendChild(a);
        extra.push(ext(h("a", { class: "btn btn--ghost", href: src }, ["Open full size ", arrow()])));
        var im = $("img", m);
        im.addEventListener("load", function () {
          if (im.naturalWidth && im.naturalHeight) m.style.aspectRatio = im.naturalWidth + " / " + im.naturalHeight;
          m.classList.add("is-loaded");
        });
        im.addEventListener("error", function () {
          extra.forEach(function (b) { b.remove(); });
          var plx = $("#p-links"); if (plx) plx.hidden = !plx.childNodes.length;
          setTimeout(function () { while (a.firstChild) holder.appendChild(a.firstChild); a.remove(); }, 0);
        });
      } else holder.appendChild(m);
      stage.appendChild(holder);
    }
    else if (p.type === "video") {
      var screen = h("div", { class: "phone-screen" });
      var vsrc = safeUrl(p.src);
      function noVideo() {
        screen.textContent = "";
        screen.appendChild(media(p.poster, str(p.alt) || title, "video", p.id, true, "Video not added yet"));
      }
      if (vsrc) {
        var v = h("video", { controls: true, playsinline: true, preload: "metadata", "aria-label": title });
        if (safeUrl(p.poster)) {
          var probe = new Image();
          probe.onload = function () { v.setAttribute("poster", safeUrl(p.poster)); };
          probe.src = safeUrl(p.poster);
        }
        v.addEventListener("error", noVideo);
        v.src = vsrc;
        screen.appendChild(v);
      } else noVideo();
      stage.appendChild(h("div", { class: "phone" }, screen));
    }
    else if (p.type === "animation") {
      var asp = /^\s*\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?\s*$/.test(str(p.aspect)) ? str(p.aspect) : "9 / 16";
      var parts = asp.split("/").map(Number), ratio = parts[0] / parts[1];
      var frame = h("div", { class: "frame", style: "aspect-ratio:" + asp + ";--fw:" + (ratio >= 1 ? "1100px" : "430px") });
      var asrc = safeUrl(p.src);
      frame.appendChild(media(p.poster, str(p.alt) || title, "animation", p.id, true, " "));
      if (frame.firstChild.classList.contains("ph")) frame.firstChild.classList.add("ph--bare");
      function missing() {
        frame.appendChild(h("div", { class: "stage-msg" }, h("p", null, [h("b", { text: "Animation coming soon" }), "This file has not been uploaded yet."])));
      }
      function load() {
        frame.textContent = "";
        frame.appendChild(h("iframe", { src: asrc, title: title, loading: "lazy", allow: "fullscreen; autoplay", allowfullscreen: true }));
      }
      if (asrc) {
        var start = h("button", { class: "stage-start", type: "button", "data-cursor": "Play", "aria-label": "Play the animation: " + title }, [
          h("span", { class: "play" }, playIcon()), h("span", { class: "t", text: "Play animation" })
        ]);
        start.addEventListener("click", function () {
          start.disabled = true;
          if (/^https?:$/.test(location.protocol) && window.fetch) {
            fetch(asrc, { method: "HEAD" }).then(function (r) { if (r.ok) load(); else { start.remove(); missing(); } }).catch(load);
          } else load();
        });
        frame.appendChild(start);
        extra.push(ext(h("a", { class: "btn btn--ghost", href: asrc }, ["Open full screen ", arrow()])));
      } else missing();
      stage.appendChild(frame);
    }

    // ----- side info
    var side = $("#p-info");
    side.textContent = "";
    function row(k, v) { if (v) side.appendChild(h("div", { class: "row" }, [h("dt", { text: k }), h("dd", { text: v })])); }
    row("Type", TYPE_LABEL[p.type]);
    row("Series", str(p.series));
    row("Length", str(p.duration));
    row("Tools", list(p.tools).map(str).filter(Boolean).join(", "));
    row("Date", str(p.date));
    row("Status", str(p.status));
    row("Response", str(p.result));
    row("By", str(person.brand));

    var pl = $("#p-links");
    pl.textContent = "";
    [["instagramUrl", "Instagram post"], ["youtubeUrl", "YouTube post"], ["linkedinUrl", "LinkedIn post"]].forEach(function (d) {
      var u = safeUrl(p[d[0]]);
      if (u) pl.appendChild(ext(h("a", { class: "btn btn--ghost", href: u }, [d[1] + " ", arrow()])));
    });
    extra.forEach(function (b) { pl.appendChild(b); });
    pl.hidden = !pl.childNodes.length;

    var cap = $("#p-caption");
    if (str(p.caption)) cap.textContent = str(p.caption); else cap.hidden = true;
    var why = $("#p-why");
    if (why) { if (str(p.why)) { why.textContent = ""; why.appendChild(h("span", { class: "label", text: "Why I built it" })); why.appendChild(h("span", { text: str(p.why) })); why.hidden = false; } else why.hidden = true; }
    var gal = $("#p-gallery"), gs2 = list(p.gallery).filter(function (g) { return g && safeUrl(g.image); });
    if (gal) {
      gal.textContent = "";
      gs2.forEach(function (g) {
        var fig = h("figure", null, ext(h("a", { href: safeUrl(g.image), "data-cursor": "Zoom" }, h("img", { src: safeUrl(g.image), alt: str(g.alt), loading: "lazy", decoding: "async" }))));
        fig.querySelector("img").addEventListener("error", function () { fig.remove(); });
        gal.appendChild(fig);
      });
      gal.hidden = !gs2.length;
    }
    var pn = $("#p-note");
    if (pn) {
      pn.textContent = "";
      [str(p.note), str(p.credit), p.type === "tool" ? "Best on a laptop or desktop. The tool is a large file and may take a moment to load." : ""].filter(Boolean)
        .forEach(function (t) { pn.appendChild(h("p", { text: t })); });
      pn.appendChild(h("p", { text: "Educational content. Not medical advice." }));
    }

    // ----- next project
    var nx = $("#p-next");
    if (real.length > 1) {
      var n = real[(idx + 1) % real.length];
      nx.setAttribute("href", "project.html?id=" + encodeURIComponent(n.id));
      $("#p-next-title").textContent = str(n.title) || "Untitled";
      $("#p-next-type").textContent = "Next project · " + TYPE_LABEL[n.type];
    } else nx.hidden = true;
  }

  /* ------------------------------------------------------------------
     RESEARCH and ABOUT
     ------------------------------------------------------------------ */
  function researchPage() {
    var grid = $("#research-grid");
    if (grid) {
      var aside = $("#research-aside");
      grid.textContent = "";
      var cycle = [4, 2, 2, 4], used = 0;
      research.forEach(function (r, i) {
        var span = cycle[i % 4];
        grid.appendChild(researchCell(r, i, span));
        used = (used + span) % 6;
      });
      if (aside) {
        aside.className = "cell cell--accent c" + (used === 0 ? 6 : 6 - used) + " md6";
        grid.appendChild(aside);
      }
    }
    buildCerts($("#certs"));
  }

  function about() {
    var a = C.about || {};
    var bio = $("#bio"), paras = list(a.bio).map(str).filter(Boolean);
    if (bio && paras.length) {
      bio.textContent = "";
      paras.forEach(function (t, i) { bio.appendChild(h("p", { text: t, "data-reveal": "", style: "--d:" + i * 110 + "ms" })); });
    }
    var edu = $("#education"), es = list(a.education).filter(function (e) { return e && str(e.degree); });
    if (edu && es.length) {
      edu.textContent = "";
      es.forEach(function (e) {
        edu.appendChild(h("div", null, [
          h("p", { class: "cell-big", text: str(e.degree) }),
          h("p", { style: "margin-top:.7rem;font-weight:600", text: str(e.place) }),
          str(e.detail) ? h("p", { class: "muted", text: str(e.detail) }) : null,
          str(e.when) ? h("p", { class: "when", text: str(e.when) }) : null
        ]));
      });
    }
    var goals = $("#goals"), gs = list(a.goals).map(str).filter(Boolean);
    if (goals && gs.length) {
      goals.textContent = "";
      gs.forEach(function (g) { goals.appendChild(h("li", { text: g })); });
    }
    var doing = $("#doing"), ds = list(a.doing).filter(function (d) { return d && str(d.name); });
    if (doing && ds.length) {
      doing.textContent = "";
      ds.forEach(function (d, i) {
        doing.appendChild(h("li", { "data-reveal": "", style: "--d:" + i * 90 + "ms" }, [h("span", { class: "cell-num", text: pad(i + 1) }), h("h3", { class: "h3", text: str(d.name) }), h("p", { class: "muted", text: str(d.text) })]));
      });
    }
    $$("[data-about]").forEach(function (el) { var v = str(a[el.getAttribute("data-about")]); if (v) el.textContent = v; });
    var sk = $("#skills"), ss = list(a.skills).map(str).filter(Boolean);
    if (sk) {
      if (ss.length) { sk.textContent = ""; ss.forEach(function (t, i) { sk.appendChild(h("li", { class: i < 5 ? "top" : null, text: t })); }); }
      else { var sc = sk.closest("[data-skills-cell]"); if (sc) sc.hidden = true; }
    }
    var act = $("#activities"), as = list(a.activities).filter(function (x) { return x && str(x.name); });
    if (act) {
      if (as.length) {
        act.textContent = "";
        as.forEach(function (x) { act.appendChild(h("li", null, [h("strong", { text: str(x.name) }), str(x.when) ? h("span", { class: "when", text: str(x.when) }) : null, str(x.text) ? h("p", { class: "muted", text: str(x.text) }) : null])); });
      } else { var ac = act.closest("[data-activities-cell]"); if (ac) ac.hidden = true; }
    }
    heroPhoto();
    var ph = $("#portrait");
    if (ph) {
      var psrc = safeUrl(person.photo);
      if (psrc) {
        var pim = $("img", ph);
        if (pim.getAttribute("src") !== psrc) pim.setAttribute("src", psrc);
        pim.addEventListener("error", function () { ph.hidden = true; });
        ph.hidden = false;
      } else ph.hidden = true;
    }
    buildCerts($("#certs"));
  }

  /* ==================================================================
     MOTION AND INTERACTION
     ================================================================== */

  /* ---------- theme ---------- */
  function theme() {
    var btn = $("#theme");
    if (!btn) return;
    function label() {
      var light = root.getAttribute("data-theme") === "light";
      btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      btn.setAttribute("aria-pressed", String(light));
      var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", light ? "#f4f1ea" : "#0a1220");
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
      document.dispatchEvent(new Event("themechange"));
    });
    label();
  }

  /* ---------- navigation ---------- */
  function nav() {
    var bar = $(".nav"), btn = $("#menu-btn"), menu = $("#menu");
    $$("[data-nav]").forEach(function (a) {
      var k = a.getAttribute("data-nav");
      if (k === page || (k === "work" && page === "project")) a.setAttribute("aria-current", "page");
    });
    if (btn && menu) {
      var setOpen = function (open) {
        body.classList.toggle("menu-open", open);
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        if (open) menu.removeAttribute("inert"); else menu.setAttribute("inert", "");
        root.style.overflow = open ? "hidden" : "";
      };
      setOpen(false);
      btn.addEventListener("click", function () { setOpen(!body.classList.contains("menu-open")); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && body.classList.contains("menu-open")) { setOpen(false); btn.focus(); }
      });
      window.addEventListener("resize", function () { if (window.innerWidth >= 900 && body.classList.contains("menu-open")) setOpen(false); });
    }
    return bar;
  }

  /* ---------- headline word split ---------- */
  function split(el) {
    var i = 0, chars = el.getAttribute("data-split") === "chars";
    var plain = el.textContent.replace(/\s+/g, " ").trim();
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (s) {
            if (!s) return;
            if (/^\s+$/.test(s)) { frag.appendChild(document.createTextNode(" ")); return; }
            if (chars) {
              frag.appendChild(h("span", { class: "w" }, s.split("").map(function (c) { return h("span", { text: c, style: "--wi:" + i++ }); })));
            } else frag.appendChild(h("span", { class: "w" }, h("span", { text: s, style: "--wi:" + i++ })));
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    if (chars) {            // screen readers get the sentence, not single letters
      var vis = h("span", { "aria-hidden": "true" });
      while (el.firstChild) vis.appendChild(el.firstChild);
      el.appendChild(h("span", { class: "sr-only", text: plain }));
      el.appendChild(vis);
    }
  }

  /* ---------- reveal on scroll ---------- */
  var io = null;
  function reveals() {
    var els = $$("[data-reveal], [data-split], [data-grow], [data-count], [data-scramble]");
    if (RM || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var e = en.target;
        io.unobserve(e);
        e.classList.add("in");
        if (e.hasAttribute("data-count")) count(e);
        if (e.hasAttribute("data-scramble")) scramble(e);
        if (e.hasAttribute("data-split")) setTimeout(function () { e.classList.add("done"); }, 2200);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (e) {
      // everything in the opening screen appears straight away, even if it sits just below the fold
      if (e.closest(".hero") || e.closest(".page-head")) {
        e.classList.add("in");
        if (e.hasAttribute("data-count")) count(e);
        if (e.hasAttribute("data-split")) setTimeout(function () { e.classList.add("done"); }, 2600);
      } else io.observe(e);
    });
  }

  function count(el) {
    var to = parseInt(el.getAttribute("data-to"), 10);
    if (!(to > 0) || RM) return;
    var t0 = 0, dur = Math.min(1800, 900 + to * 60);
    (function step(t) {
      if (!t0) t0 = t;
      var k = clamp((t - t0) / dur, 0, 1);
      el.textContent = pad(Math.round((1 - Math.pow(1 - k, 3)) * to)) + (el.getAttribute("data-suffix") || "");
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  function scramble(el) {
    var final = el.getAttribute("data-text") || el.textContent;
    el.setAttribute("data-text", final);
    el.setAttribute("aria-label", final);
    if (RM) return;
    var glyphs = "█▓▒░▀▄▌▐";
    var t0 = 0, dur = 1100;
    var cur = h("span", { class: "cur", "aria-hidden": "true" });
    (function step(t) {
      if (!t0) t0 = t;
      var k = clamp((t - t0) / dur, 0, 1), shown = Math.floor(k * final.length), out = "";
      for (var i = 0; i < final.length; i++) {
        var ch = final.charAt(i);
        out += i < shown || ch === " " ? ch : (i < shown + 5 ? glyphs.charAt(Math.floor(Math.random() * glyphs.length)) : " ");
      }
      el.textContent = out.replace(/\s+$/, "") || " ";
      el.appendChild(cur);
      if (k < 1) setTimeout(function () { requestAnimationFrame(step); }, 34);
      else { el.textContent = final; el.appendChild(cur); }
    })(performance.now());
  }

  /* ---------- custom cursor (desktop with a mouse only) ---------- */
  function cursor() {
    if (!FINE || RM) return;
    var ring = h("div", { class: "cursor is-hidden", "aria-hidden": "true" }, [h("i"), h("b")]);
    var dot = h("div", { class: "cursor-dot is-hidden", "aria-hidden": "true" });
    var lab = ring.lastChild;
    body.appendChild(ring); body.appendChild(dot);
    root.classList.add("has-cursor");
    var x = 0, y = 0, rx = 0, ry = 0, moving = false, seen = false;
    function tick() {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      if (Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2) requestAnimationFrame(tick); else moving = false;
    }
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; rx = x; ry = y; }
      dot.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      var t = e.target && e.target.closest ? e.target : null;
      var native = t && t.closest("iframe, video, input, textarea, select");
      ring.classList.toggle("is-hidden", !!native); dot.classList.toggle("is-hidden", !!native);
      var l = t && t.closest("[data-cursor]");
      var k = !l && t && t.closest("a, button");
      if (l) lab.textContent = l.getAttribute("data-cursor");
      ring.classList.toggle("is-label", !!l);
      ring.classList.toggle("is-link", !!k);
      dot.classList.toggle("is-off", !!l);
      if (!moving) { moving = true; requestAnimationFrame(tick); }
    }, { passive: true });
    document.addEventListener("mouseleave", function () { ring.classList.add("is-hidden"); dot.classList.add("is-hidden"); });
  }

  /* ---------- magnetic buttons ---------- */
  function magnetic() {
    if (!FINE || RM) return;
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (dx * 0.22).toFixed(1) + "px," + (dy * 0.3).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- scroll work: nav state, pinned horizontal gallery, parallax ---------- */
  function scrolling(bar) {
    var hs = $(".hs"), track = hs && $(".hs-track", hs), fill = hs && $(".hs-bar i", hs);
    var pinned = false, dist = 0, hsTop = 0;
    var par = [], fills = [], fly = null;
    var lastY = window.scrollY, ticking = false;

    function measure() {
      if (hs && track) {
        var want = FINE && !RM && window.innerWidth >= 1024 && window.innerHeight >= 560;
        hs.classList.toggle("is-pinned", want);
        track.style.transform = "";
        hs.style.height = "";
        pinned = false;
        if (want) {
          var lastChild = track.lastElementChild;
          var gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0;
          var total = lastChild ? lastChild.offsetLeft + lastChild.offsetWidth + gutter : 0;
          dist = Math.max(0, total - window.innerWidth);
          if (dist > 40) {
            hs.style.height = window.innerHeight + dist + "px";
            hsTop = hs.getBoundingClientRect().top + window.scrollY;
            pinned = true;
          } else hs.classList.remove("is-pinned");
        }
      }
      par = (FINE && !RM && window.innerWidth >= 900) ? $$("[data-parallax]").map(function (el) {
        el.style.transform = "";
        var r = el.getBoundingClientRect();
        return { el: el, speed: parseFloat(el.getAttribute("data-parallax")) || 0.1, mid: r.top + window.scrollY + r.height / 2 };
      }) : [];
      // the portrait that travels from the hero into the About block.
      // It is one fixed-size layer that only moves and scales (no resizing), so phones can keep it smooth.
      (function () {
        var a = $("#hero-photo"), b = $("#intro-photo"), mainEl = $("#main");
        var old = $(".fly-photo");
        if (!a || !b || !mainEl || a.hidden || RM) {
          root.classList.remove("fly-on"); if (old) old.hidden = true; fly = null;
          if (b && a && a.hidden) b.hidden = true;
          return;
        }
        var el = old || mainEl.appendChild(h("div", { class: "fly-photo", "aria-hidden": "true" }, h("img", { src: $("img", a).getAttribute("src"), alt: "" })));
        el.hidden = false;
        var m = mainEl.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        var A = { x: ra.left - m.left, y: ra.top - m.top, s: ra.width / rb.width }, B = { x: rb.left - m.left, y: rb.top - m.top };
        var end = Math.max(260, B.y - window.innerHeight * 0.2);
        var st = el.style;
        st.width = rb.width.toFixed(1) + "px"; st.height = rb.height.toFixed(1) + "px";
        st.setProperty("--ax", A.x.toFixed(1) + "px"); st.setProperty("--ay", A.y.toFixed(1) + "px"); st.setProperty("--as", A.s.toFixed(4));
        st.setProperty("--bx", B.x.toFixed(1) + "px"); st.setProperty("--by", B.y.toFixed(1) + "px"); st.setProperty("--end", end.toFixed(0) + "px");
        var native = !!(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"));
        root.classList.toggle("fly-css", native);        // the browser animates it off the main thread
        if (native) st.transform = "";
        fly = native ? null : { el: el, A: A, B: B, end: end };
        root.classList.add("fly-on");
      })();
      fills = RM ? [] : $$("[data-fill]").map(function (el) {
        var r = el.getBoundingClientRect();
        return { words: $$(".fw", el), top: r.top + window.scrollY, h: r.height };
      });
      update();
    }

    function update() {
      ticking = false;
      var y = window.scrollY, vh = window.innerHeight;
      if (bar) {
        bar.classList.toggle("is-scrolled", y > 24);
        if (!body.classList.contains("menu-open")) {
          if (y > 700 && y > lastY + 6) bar.classList.add("is-hidden");
          else if (y < lastY - 6 || y < 700) bar.classList.remove("is-hidden");
        }
      }
      lastY = y;
      if (pinned) {
        var p = clamp((y - hsTop) / dist, 0, 1);
        track.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)";
        if (fill) fill.style.setProperty("--p", p.toFixed(4));
      }
      if (fly) {                                         // fallback for browsers without scroll-driven animations
        var k = clamp(y / fly.end, 0, 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        e = 0.5 * k + 0.5 * e;
        var A = fly.A, B = fly.B;
        fly.el.style.transform = "translate3d(" + (A.x + (B.x - A.x) * e).toFixed(1) + "px," + (A.y + (B.y - A.y) * e).toFixed(1) + "px,0) scale(" + (A.s + (1 - A.s) * e).toFixed(4) + ")";
      }
      for (var f = 0; f < fills.length; f++) {
        var fo = fills[f], prog = clamp((y + vh * 0.82 - fo.top) / (fo.h + vh * 0.32), 0, 1) * (fo.words.length + 2);
        for (var w = 0; w < fo.words.length; w++) { var base = fo.words[w].tagName === "EM" ? 0.66 : 0.42; fo.words[w].style.opacity = (base + (1 - base) * clamp(prog - w, 0, 1)).toFixed(2); }
      }
      for (var i = 0; i < par.length; i++) {
        var o = par[i], d = o.mid - (y + vh / 2);
        if (Math.abs(d) < vh * 1.2) o.el.style.transform = "translate3d(0," + (d * -o.speed).toFixed(1) + "px,0)";
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    window.addEventListener("scroll", onScroll, { passive: true });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(measure, 160); });
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();

    // horizontal gallery progress when it is a normal swipe carousel (touch)
    if (track && fill) {
      track.addEventListener("scroll", function () {
        if (pinned) return;
        var max = track.scrollWidth - track.clientWidth;
        fill.style.setProperty("--p", max > 0 ? (track.scrollLeft / max).toFixed(4) : 0);
      }, { passive: true });
    }
  }

  /* ---------- smooth scroll (desktop only, optional library) ---------- */
  var SELF = document.currentScript ? document.currentScript.src : "";
  function smooth() {
    if (!FINE || RM || !SELF) return;
    var s = document.createElement("script");
    s.src = SELF.replace(/js\/site\.js.*$/, "vendor/lenis.min.js");
    s.async = true;
    s.onload = function () {
      if (typeof window.Lenis !== "function") return;      // if the library fails, normal scrolling stays
      try {
        var lenis = new window.Lenis({ lerp: 0.11 });
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      } catch (e) {}
    };
    document.head.appendChild(s);
  }

  /* ---------- page transitions ---------- */
  function transitions() {
    window.addEventListener("pageshow", function (e) { if (e.persisted) { body.classList.remove("is-leaving"); body.classList.add("is-ready"); } });
    if (RM) return;
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto:|tel:)/i.test(href)) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin && location.protocol !== "file:") return;
      if (location.protocol === "file:" && url.protocol !== "file:") return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      body.classList.remove("menu-open");
      var wipe = $(".wipe");
      if (wipe) {                                   // curtain rises from the bottom, then we navigate
        wipe.style.transition = "none"; wipe.style.transform = "translateY(100%)";
        void wipe.offsetHeight;
        wipe.style.transition = ""; wipe.style.transform = "";
      }
      body.classList.add("is-leaving");
      setTimeout(function () { location.href = a.href; }, 640);
    });
  }

  /* ---------- preloader then reveal ---------- */
  function boot() {
    var started = false;
    function ready() {
      if (started) return; started = true;
      body.classList.add("is-ready");
      setTimeout(reveals, RM ? 0 : 260);
      setTimeout(function () { root.classList.remove("preload"); }, 1200);
    }
    var loader = $(".loader");
    if (root.classList.contains("preload") && loader && !RM) {
      var num = $(".loader-num", loader), line = $(".loader-line i", loader);
      var t0 = performance.now(), dur = 950;
      (function step(t) {
        var k = clamp((t - t0) / dur, 0, 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        if (num) num.textContent = String(Math.round(e * 100));
        if (line) line.style.transform = "scaleX(" + e.toFixed(3) + ")";
        if (k < 1) requestAnimationFrame(step); else setTimeout(ready, 180);
      })(t0);
      try { sessionStorage.setItem("seen", "1"); } catch (e) {}
    } else {
      var go = function () { requestAnimationFrame(function () { requestAnimationFrame(ready); }); };
      if (document.fonts && document.fonts.ready && !RM) {
        var done = false, once = function () { if (!done) { done = true; go(); } };
        document.fonts.ready.then(once); setTimeout(once, 500);
      } else go();
    }
    setTimeout(ready, 4000);     // safety net
  }

  /* ==================================================================
     START
     ================================================================== */
  function safe(fn, name) { try { return fn(); } catch (e) { if (window.console) console.error("[site] " + name + " failed", e); } }

  safe(bind, "bind");
  safe(function () {
    if (page === "home") home();
    else if (page === "work") work();
    else if (page === "project") project();
    else if (page === "research") researchPage();
    else if (page === "about") about();
  }, "render " + page);
  safe(buildLearning, "learning");

  safe(function () { $$("[data-split]").forEach(split); }, "split");
  safe(theme, "theme");
  var bar = safe(nav, "nav");
  safe(function () {
    P.aurora($("#aurora"), { still: RM });
    P.wire($("#wire"), { still: RM });
    // words that brighten as you scroll past them
    $$("[data-fill]").forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.textContent = "";
      el.appendChild(h("span", { class: "sr-only", text: words.join(" ").replace(/\*/g, "") }));
      words.forEach(function (w, i) {
        var star = /^\*.*\*[.,]?$/.test(w), clean = w.replace(/\*/g, "");
        el.appendChild(h(star ? "em" : "span", { class: "fw" + (star ? " hl" : ""), text: clean, "aria-hidden": "true" }));
        if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
    });
  }, "art");
  safe(smooth, "smooth scroll");
  safe(function () { scrolling(bar); }, "scroll");
  safe(cursor, "cursor");
  safe(magnetic, "magnetic");
  safe(transitions, "transitions");
  safe(boot, "boot");
})();
