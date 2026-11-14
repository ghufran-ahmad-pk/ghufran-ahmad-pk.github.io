/* =====================================================================
   art.js  |  small drawn-by-code visuals (no image files needed)
   - placeholder(): calm stand-in when a media file is missing
   - icon(): thin line icons
   - aurora(): the soft light behind the hero that drifts with the pointer
   You should not need to edit this file.
   ===================================================================== */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  function rng(seedStr) {
    var s = String(seedStr), h = 1779033703 ^ s.length;
    for (var i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    var a = h >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  var ICONS = {
    certificate: "M12 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm-3.2 9.9L7.5 20.5l4.5-2.4 4.5 2.4-1.3-7.1M9.8 9l1.5 1.5L14.4 7.4",
    play: "M8 5.5v13l10.5-6.5L8 5.5Z"
  };
  function icon(name, cls) {
    var svg = el("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.3", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", focusable: "false" });
    if (cls) svg.setAttribute("class", cls);
    el("path", { d: ICONS[name] || ICONS.certificate }, svg);
    if (name === "play") { svg.setAttribute("fill", "currentColor"); svg.setAttribute("stroke", "none"); }
    return svg;
  }

  var TYPE_WORD = { infographic: "Infographic", animation: "Animation", video: "Short video", external: "Post", certificate: "Certificate" };

  /* placeholder(type, seed, tagText) -> <div class="ph"> : quiet rings on a gradient, same every visit */
  function placeholder(type, seed, tagText) {
    var rand = rng((seed || "x") + type);
    var wrap = document.createElement("div");
    wrap.className = "ph";
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", "Preview image not added yet");
    wrap.style.setProperty("--ph-x", Math.round(20 + rand() * 60) + "%");
    wrap.style.setProperty("--ph-y", Math.round(15 + rand() * 50) + "%");

    var svg = el("svg", { viewBox: "0 0 400 500", preserveAspectRatio: "xMidYMid slice", fill: "none", "aria-hidden": "true" });
    var cx = 120 + rand() * 160, cy = 170 + rand() * 160;
    for (var i = 0; i < 6; i++) {
      el("circle", { cx: cx, cy: cy, r: 46 + i * 44, stroke: "currentColor", "stroke-width": "1", opacity: (0.34 - i * 0.045).toFixed(2) }, svg);
    }
    for (var d = 0; d < 3; d++) {
      var ang = rand() * 6.283, rr = 46 + Math.floor(rand() * 5) * 44;
      el("circle", { cx: cx + Math.cos(ang) * rr, cy: cy + Math.sin(ang) * rr, r: d === 0 ? 5 : 3, fill: "currentColor", opacity: d === 0 ? 0.95 : 0.55 }, svg);
    }
    wrap.appendChild(svg);

    var cap = document.createElement("span");
    cap.className = "ph-tag";
    var a = document.createElement("i"); a.textContent = TYPE_WORD[type] || "Preview";
    var b = document.createElement("span"); b.textContent = tagText || "Preview coming soon";
    cap.appendChild(a); cap.appendChild(b);
    wrap.appendChild(cap);
    return wrap;
  }

  /* aurora(host): eases the hero light toward the pointer. CSS does the drawing. */
  function aurora(host, opts) {
    if (!host || (opts && opts.still)) return;
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    var tx = 0, ty = 0, x = 0, y = 0, running = false;
    function tick() {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      host.style.setProperty("--mx", x.toFixed(3));
      host.style.setProperty("--my", y.toFixed(3));
      if (Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002) requestAnimationFrame(tick); else running = false;
    }
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX / window.innerWidth * 2 - 1;
      ty = e.clientY / window.innerHeight * 2 - 1;
      if (!running && window.scrollY < window.innerHeight) { running = true; requestAnimationFrame(tick); }
    }, { passive: true });
  }

  /* wire(canvas): a slowly turning wireframe capsule that leans toward the pointer.
     Plain 2D canvas with hand-written 3D maths, so no 3D library is needed. */
  function wire(canvas, opts) {
    if (!canvas || !canvas.getContext) return;
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var small = window.innerWidth < 900;
    var SEG = small ? 16 : 24, CAP = small ? 5 : 7, CYL = small ? 5 : 7;
    var R = 1, HALF = 1.25, rows = [], seamRow = 0;

    // rows of rings from the top pole to the bottom pole
    var r, k;
    for (r = 1; r <= CAP; r++) { var a = (r / CAP) * Math.PI / 2; rows.push({ y: HALF + Math.cos(a) * R, rad: Math.sin(a) * R }); }
    for (r = 1; r <= CYL; r++) { rows.push({ y: HALF - (r / CYL) * 2 * HALF, rad: R }); if (r === Math.round(CYL / 2)) seamRow = rows.length - 1; }
    for (r = 1; r < CAP; r++) { var b = (r / CAP) * Math.PI / 2; rows.push({ y: -HALF - Math.sin(b) * R, rad: Math.cos(b) * R }); }
    var verts = [[0, HALF + R, 0]];
    rows.forEach(function (row) { for (k = 0; k < SEG; k++) { var t = (k / SEG) * 6.2832; verts.push([Math.cos(t) * row.rad, row.y, Math.sin(t) * row.rad]); } });
    verts.push([0, -HALF - R, 0]);
    var last = verts.length - 1, edges = [], seam = [];
    function idx(row, seg) { return 1 + row * SEG + (seg % SEG); }
    for (k = 0; k < SEG; k++) { edges.push([0, idx(0, k)]); edges.push([last, idx(rows.length - 1, k)]); }
    for (r = 0; r < rows.length; r++) for (k = 0; k < SEG; k++) {
      (r === seamRow ? seam : edges).push([idx(r, k), idx(r, k + 1)]);
      if (r < rows.length - 1) { edges.push([idx(r, k), idx(r + 1, k)]); edges.push([idx(r, k), idx(r + 1, k + 1)]); }
    }

    var W = 0, H = 0, dpr = 1, px = new Float32Array(verts.length), py = new Float32Array(verts.length), pz = new Float32Array(verts.length);
    var ink = "243,240,233", acc = "143,220,234";
    function theme() {
      var light = document.documentElement.getAttribute("data-theme") === "light";
      ink = light ? "11,21,38" : "243,240,233"; acc = light ? "15,108,126" : "143,220,234";
    }
    function size() {
      var b = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      W = Math.max(1, b.width); H = Math.max(1, b.height);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    var spin = 0.6, tx = 0, ty = 0, lx = 0, ly = 0;
    function draw() {
      var cs = Math.cos(spin), sn = Math.sin(spin);
      var tilt = -0.62 + lx * 0.25, cz = Math.cos(tilt), sz = Math.sin(tilt);
      var pitch = 0.32 + ly * 0.3, cp = Math.cos(pitch), sp = Math.sin(pitch);
      var yaw = lx * 0.5, cy = Math.cos(yaw), sy = Math.sin(yaw);
      var scale = Math.min(W, H) * 0.185, D = 6.5, i;
      for (i = 0; i < verts.length; i++) {
        var v = verts[i];
        var x = v[0] * cs + v[2] * sn, z = -v[0] * sn + v[2] * cs, y = v[1];       // spin on its own axis
        var x2 = x * cz - y * sz, y2 = x * sz + y * cz;                              // lean
        var y3 = y2 * cp - z * sp, z3 = y2 * sp + z * cp;                            // pitch
        var x4 = x2 * cy + z3 * sy, z4 = -x2 * sy + z3 * cy;                         // yaw (pointer)
        var f = D / (D + z4);
        px[i] = W / 2 + x4 * scale * f; py[i] = H / 2 - y3 * scale * f; pz[i] = z4;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      var alphas = [0.5, 0.26, 0.1];                  // front, middle, back
      for (var bk = 2; bk >= 0; bk--) {
        ctx.beginPath();
        for (i = 0; i < edges.length; i++) {
          var e = edges[i], zz = (pz[e[0]] + pz[e[1]]) / 2;
          var band = zz < -0.45 ? 0 : zz < 0.45 ? 1 : 2;
          if (band !== bk) continue;
          ctx.moveTo(px[e[0]], py[e[0]]); ctx.lineTo(px[e[1]], py[e[1]]);
        }
        ctx.strokeStyle = "rgba(" + ink + "," + alphas[bk] + ")";
        ctx.stroke();
      }
      for (bk = 1; bk >= 0; bk--) {                   // the seam ring, in the accent colour
        ctx.beginPath();
        for (i = 0; i < seam.length; i++) {
          var s2 = seam[i], front = (pz[s2[0]] + pz[s2[1]]) / 2 < 0;
          if ((bk === 0) !== front) continue;
          ctx.moveTo(px[s2[0]], py[s2[0]]); ctx.lineTo(px[s2[1]], py[s2[1]]);
        }
        ctx.lineWidth = bk === 0 ? 2 : 1;
        ctx.strokeStyle = "rgba(" + acc + "," + (bk === 0 ? 0.95 : 0.35) + ")";
        ctx.stroke();
      }
    }

    theme(); size(); draw();
    document.addEventListener("themechange", function () { theme(); draw(); });
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); draw(); }, 150); });
    if (opts.still) return;

    var visible = true, running = false, prev = 0;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; kick(); }).observe(canvas);
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      tx = e.clientX / window.innerWidth * 2 - 1; ty = e.clientY / window.innerHeight * 2 - 1;
    }, { passive: true });
    function loop(t) {
      if (!visible || document.hidden) { running = false; return; }
      var dt = Math.min(0.05, (t - prev) / 1000 || 0.016); prev = t;
      spin += dt * 0.28;
      lx += (tx - lx) * 0.05; ly += (ty - ly) * 0.05;
      draw();
      requestAnimationFrame(loop);
    }
    function kick() { if (!running && visible && !document.hidden) { running = true; prev = performance.now(); requestAnimationFrame(loop); } }
    document.addEventListener("visibilitychange", kick);
    kick();
  }

  window.Art = { placeholder: placeholder, icon: icon, aurora: aurora, wire: wire };
})();
