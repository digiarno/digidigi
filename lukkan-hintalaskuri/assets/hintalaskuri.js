(function () {
  "use strict";

  var PRICES = {
    aava: { min: 400, max: 600, unit: "jm", label: "Pystypuitteellinen liukulasitus, Lukkan Aava" },
    gl: { min: 400, max: 600, unit: "jm", label: "Pystypuitteellinen liukulasitus, Lukkan GL" },
    termo: { min: 800, max: 1000, unit: "jm", label: "Pystypuitteellinen eristyslasitus, Lukkan Termo" },
    tyyni: { min: 500, max: 700, unit: "jm", label: "Pystypuitteeton liukulasitus, Lukkan Tyyni" },
    parveke: { min: 400, max: 600, unit: "jm", label: "Parvekelasitus" },
    korkea: { min: 500, max: 700, unit: "jm", label: "Korkea lasitus" },
    kaide: { min: 550, max: 750, unit: "jm", label: "Lasikaide" },
    lasiterassi: { min: 700, max: 1100, unit: "m2", label: "Lasiterassikokonaisuus sisältäen liukulasit" },
    perustukset: { min: 200, max: 300, unit: "m2", label: "Perustukset" }
  };

  var MODEL_NAMES = {
    aava: "Lukkan Aava",
    gl: "Lukkan GL",
    termo: "Lukkan Termo",
    tyyni: "Lukkan Tyyni"
  };

  var PROJECT_NAMES = {
    lasiterassi: "Lasiterassikokonaisuus",
    terassilasitus: "Terassin lasitus",
    parveke: "Parvekelasitus",
    kaide: "Lasikaide"
  };

  function qs(root, sel) {
    return root.querySelector(sel);
  }

  function qsa(root, sel) {
    return Array.prototype.slice.call(root.querySelectorAll(sel));
  }

  function toNumber(value) {
    if (value == null) return NaN;
    var n = parseFloat(String(value).replace(",", "."));
    return n;
  }

  function formatInt(n) {
    return Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  }

  function formatEuroRange(min, max) {
    if (min === max) return formatInt(min) + "\u00a0€";
    return formatInt(min) + "–" + formatInt(max) + "\u00a0€";
  }

  function formatQty(n, unit) {
    var value = Math.round(n * 10) / 10;
    var text = String(value).replace(".", ",");
    if (unit === "m2") return text + " m²";
    if (unit === "jm") return text + " jm";
    return text + " m";
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function openSidesLength(width, depth, sides) {
    if (sides <= 1) return width;
    if (sides === 2) return width + depth;
    return width + 2 * depth;
  }

  function roundMoney(n) {
    return Math.round(n / 10) * 10;
  }

  function line(key, qty) {
    var price = PRICES[key];
    return {
      key: key,
      label: price.label,
      qty: qty,
      unit: price.unit,
      min: roundMoney(price.min * qty),
      max: roundMoney(price.max * qty)
    };
  }

  function selectedValue(root, name) {
    var el = qs(root, 'input[name="' + name + '"]:checked');
    return el ? el.value : "";
  }

  function buildQuoteMessage(state) {
    var parts = [
      "Hei, pyydän tarkempaa tarjousta Lukkan-lasituksesta.",
      "",
      "Hintalaskurin suuntaa-antava arvio: " + formatEuroRange(state.min, state.max) + " (asennus ja ALV 25,5 % sisältyvät).",
      "Kohde: " + state.projectLabel + "."
    ];
    if (state.modelLabel) parts.push("Malli: " + state.modelLabel + ".");
    if (state.dims) parts.push("Mitat: " + state.dims + ".");
    if (state.extras.length) parts.push("Lisävalinnat: " + state.extras.join(", ") + ".");
    parts.push("", "Hinta on laskurin arvio. Toivon ilmaista suunnittelukäyntiä ja sitovaa tarjousta.");
    return parts.join("\n");
  }

  function updateDiagram(root, width, depth, sides) {
    var svg = qs(root, "[data-lhk-diagram]");
    if (!svg) return;
    var w = Math.max(width || 4, 1);
    var d = Math.max(depth || 3, 1);
    var max = Math.max(w, d);
    var boxW = 220;
    var boxH = 140;
    var scale = Math.min((boxW - 56) / w, (boxH - 40) / d);
    var rw = w * scale;
    var rh = d * scale;
    var x = (boxW - rw) / 2 - 8;
    var y = 18;
    var house = qs(svg, "[data-house]");
    var glass = qs(svg, "[data-glass]");
    var labelW = qs(svg, "[data-label-w]");
    var labelD = qs(svg, "[data-label-d]");
    house.setAttribute("x", String(x));
    house.setAttribute("y", String(y));
    house.setAttribute("width", String(rw));
    house.setAttribute("height", "10");
    glass.setAttribute("x", String(x));
    glass.setAttribute("y", String(y + 10));
    glass.setAttribute("width", String(rw));
    glass.setAttribute("height", String(Math.max(rh - 10, 16)));
    labelW.textContent = formatQty(w, "m");
    labelD.textContent = formatQty(d, "m");
    labelW.setAttribute("x", String(boxW / 2));
    labelW.setAttribute("y", String(y + rh + 16));
    labelD.setAttribute("x", String(x + rw + 8));
    labelD.setAttribute("y", String(y + 10 + (rh - 10) / 2));
    svg.setAttribute("data-sides", String(sides || 3));
  }

  function collectState(root) {
    var project = selectedValue(root, "lhk-project") || "lasiterassi";
    var model = selectedValue(root, "lhk-model") || "aava";
    var width = toNumber(qs(root, '[name="lhk-width"]').value);
    var depth = toNumber(qs(root, '[name="lhk-depth"]').value);
    var length = toNumber(qs(root, '[name="lhk-length"]').value);
    var height = toNumber(qs(root, '[name="lhk-height"]').value);
    var sides = toNumber(qs(root, '[name="lhk-sides"]').value) || 3;
    var kaideLength = toNumber(qs(root, '[name="lhk-kaide-length"]').value);
    var hasFoundations = qs(root, '[name="lhk-foundations"]').checked;
    var hasKaide = qs(root, '[name="lhk-kaide"]').checked;
    var isHigh = qs(root, '[name="lhk-high"]').checked || height >= 2.5;

    if (!isFinite(width) || width <= 0) width = 0;
    if (!isFinite(depth) || depth <= 0) depth = 0;
    if (!isFinite(length) || length <= 0) length = 0;
    if (!isFinite(height) || height <= 0) height = 0;
    if (!isFinite(kaideLength) || kaideLength <= 0) kaideLength = 0;

    width = clamp(width, 0, 40);
    depth = clamp(depth, 0, 20);
    length = clamp(length, 0, 80);
    height = clamp(height, 0, 4);
    kaideLength = clamp(kaideLength, 0, 80);

    var area = Math.round(width * depth * 10) / 10;
    var glazingJm = 0;
    if (project === "terassilasitus") {
      glazingJm = Math.round(openSidesLength(width, depth, sides) * 10) / 10;
    } else if (project === "parveke" || project === "kaide") {
      glazingJm = Math.round((length || width) * 10) / 10;
    }

    var lines = [];
    var extras = [];
    var dims = "";
    var modelLabel = "";

    if (project === "lasiterassi") {
      if (area > 0) {
        lines.push(line("lasiterassi", area));
        dims = formatQty(width, "m").replace(" m", "") + " × " + formatQty(depth, "m") + " (" + formatQty(area, "m2") + ")";
      }
      modelLabel = MODEL_NAMES[model];
      if (hasFoundations && area > 0) {
        lines.push(line("perustukset", area));
        extras.push("perustukset");
      }
      if (hasKaide) {
        var kaideJm = kaideLength || width || 0;
        if (kaideJm > 0) {
          lines.push(line("kaide", kaideJm));
          extras.push("lasikaide " + formatQty(kaideJm, "jm"));
        }
      }
    } else if (project === "terassilasitus") {
      var glazingKey = model;
      if (isHigh && (model === "aava" || model === "gl")) {
        glazingKey = "korkea";
        extras.push("korkea lasitus");
      }
      if (glazingJm > 0) lines.push(line(glazingKey, glazingJm));
      modelLabel = MODEL_NAMES[model];
      dims = formatQty(width, "m").replace(" m", "") + " × " + formatQty(depth, "m") + ", " + sides + " avointa sivua (" + formatQty(glazingJm, "jm") + ")";
      if (hasKaide) {
        var tKaide = kaideLength || glazingJm;
        if (tKaide > 0) {
          lines.push(line("kaide", tKaide));
          extras.push("lasikaide " + formatQty(tKaide, "jm"));
        }
      }
    } else if (project === "parveke") {
      var pJm = glazingJm;
      var pKey = isHigh ? "korkea" : "parveke";
      if (pJm > 0) lines.push(line(pKey, pJm));
      dims = formatQty(pJm, "jm");
      if (isHigh) extras.push("korkea lasitus");
      if (hasKaide) {
        var pKaide = kaideLength || pJm;
        if (pKaide > 0) {
          lines.push(line("kaide", pKaide));
          extras.push("lasikaide " + formatQty(pKaide, "jm"));
        }
      }
    } else if (project === "kaide") {
      var kJm = glazingJm;
      if (kJm > 0) lines.push(line("kaide", kJm));
      dims = formatQty(kJm, "jm");
    }

    var min = 0;
    var max = 0;
    lines.forEach(function (item) {
      min += item.min;
      max += item.max;
    });

    return {
      project: project,
      projectLabel: PROJECT_NAMES[project],
      model: model,
      modelLabel: modelLabel,
      width: width,
      depth: depth,
      length: length,
      height: height,
      sides: sides,
      area: area,
      lines: lines,
      extras: extras,
      dims: dims,
      min: min,
      max: max,
      hasFoundations: hasFoundations,
      hasKaide: hasKaide,
      isHigh: isHigh
    };
  }

  function render(root, cfg) {
    var state = collectState(root);
    var priceEl = qs(root, "[data-lhk-price]");
    var metaEl = qs(root, "[data-lhk-price-meta]");
    var listEl = qs(root, "[data-lhk-breakdown]");
    var emptyEl = qs(root, "[data-lhk-empty]");
    var quoteBtn = qs(root, "[data-lhk-quote]");
    var mailBtn = qs(root, "[data-lhk-mail]");

    var showDims = state.project === "lasiterassi" || state.project === "terassilasitus";
    var showLength = state.project === "parveke" || state.project === "kaide";
    var showModel = state.project === "lasiterassi" || state.project === "terassilasitus";
    var showSides = state.project === "terassilasitus";
    var showFoundations = state.project === "lasiterassi";
    var showKaide = state.project !== "kaide";
    var showHigh = state.project === "terassilasitus" || state.project === "parveke";
    var showDiagram = showDims;
    var showExtras = showFoundations || showKaide || showHigh;

    qs(root, "[data-panel-dims]").classList.toggle("lhk-hidden", !showDims);
    qs(root, "[data-panel-length]").classList.toggle("lhk-hidden", !showLength);
    qs(root, "[data-panel-model]").classList.toggle("lhk-hidden", !showModel);
    qs(root, "[data-panel-sides]").classList.toggle("lhk-hidden", !showSides);
    qs(root, "[data-panel-foundations]").classList.toggle("lhk-hidden", !showFoundations);
    qs(root, "[data-panel-kaide]").classList.toggle("lhk-hidden", !showKaide);
    qs(root, "[data-panel-high]").classList.toggle("lhk-hidden", !showHigh);
    qs(root, "[data-panel-diagram]").classList.toggle("lhk-hidden", !showDiagram);
    qs(root, "[data-panel-extras]").classList.toggle("lhk-hidden", !showExtras);

    var kaideExtras = qs(root, "[data-kaide-extras]");
    kaideExtras.classList.toggle("is-open", showKaide && qs(root, '[name="lhk-kaide"]').checked);

    if (showDiagram) updateDiagram(root, state.width, state.depth, state.sides);

    if (!state.lines.length) {
      priceEl.textContent = "–";
      metaEl.textContent = "Täytä mitat, niin näet suuntaa-antavan hinta-arvion.";
      listEl.innerHTML = "";
      emptyEl.classList.remove("lhk-hidden");
      quoteBtn.setAttribute("href", cfg.quoteUrl);
      if (mailBtn) mailBtn.setAttribute("href", cfg.mailUrl);
      notifyHeight(root);
      return;
    }

    emptyEl.classList.add("lhk-hidden");
    priceEl.textContent = formatEuroRange(state.min, state.max);
    metaEl.textContent = "Suuntaa-antava arvio. Asennus ja ALV 25,5 % sisältyvät hintoihin.";

    listEl.innerHTML = state.lines
      .map(function (item) {
        return (
          "<li>" +
          '<span class="lhk-breakdown-name">' +
          item.label +
          '<span class="lhk-breakdown-qty">' +
          formatQty(item.qty, item.unit) +
          " × " +
          formatEuroRange(PRICES[item.key].min, PRICES[item.key].max).replace("\u00a0€", "") +
          " €/" +
          (item.unit === "m2" ? "m²" : "jm") +
          "</span></span>" +
          '<span class="lhk-breakdown-sum">' +
          formatEuroRange(item.min, item.max) +
          "</span></li>"
        );
      })
      .join("");

    var message = buildQuoteMessage(state);
    var quoteUrl = cfg.quoteUrl;
    var joiner = quoteUrl.indexOf("?") >= 0 ? "&" : "?";
    quoteBtn.setAttribute(
      "href",
      quoteUrl +
        joiner +
        "laskuri=" +
        encodeURIComponent(formatEuroRange(state.min, state.max)) +
        "#contacti"
    );
    quoteBtn.setAttribute("data-summary", message);

    if (mailBtn) {
      var subject = "Tarjouspyyntö: " + state.projectLabel + " " + formatEuroRange(state.min, state.max);
      mailBtn.setAttribute(
        "href",
        "mailto:asiakaspalvelu@lukkan.fi?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(message)
      );
    }

    notifyHeight(root);
  }

  function notifyHeight(root) {
    var height = Math.ceil(root.getBoundingClientRect().height + 8);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "lukkan-hintalaskuri-height", height: height }, "*");
    }
  }

  function bind(root) {
    var cfg = {
      quoteUrl: root.getAttribute("data-quote-url") || "https://lukkan.fi/yhteystiedot/",
      dealersUrl: root.getAttribute("data-dealers-url") || "https://lukkan.fi/jalleenmyyjat/",
      mailUrl: "mailto:asiakaspalvelu@lukkan.fi"
    };

    qsa(root, "input, select").forEach(function (el) {
      el.addEventListener("input", function () {
        render(root, cfg);
      });
      el.addEventListener("change", function () {
        render(root, cfg);
      });
    });

    var quoteBtn = qs(root, "[data-lhk-quote]");
    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        try {
          var summary = quoteBtn.getAttribute("data-summary");
          if (summary && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summary);
          }
        } catch (err) {
          /* ignore clipboard errors */
        }
      });
    }

    window.addEventListener("resize", function () {
      notifyHeight(root);
    });

    render(root, cfg);
  }

  function init() {
    qsa(document, "[data-lhk-root]").forEach(bind);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
