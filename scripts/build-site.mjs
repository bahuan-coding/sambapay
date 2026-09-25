#!/usr/bin/env node
// SambaPay institutional site: check and static build for Netlify.
// The check is the gate. Doctrine it enforces:
//   .cursor/skills/sambapay-ceo/references/site-committee.md
// Usage: node scripts/build-site.mjs check | build
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, copyFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SITE = join(ROOT, "site");
const CONTENT = join(SITE, "content");
const ASSETS = join(SITE, "assets");
const DIST = join(ROOT, "dist", "site");
const LANGS = ["en", "pt"];

const FORBIDDEN = JSON.parse(readFileSync(join(SITE, "lib", "forbidden.json"), "utf8"));

// Inherited from the kit checker so the two gates never disagree.
const TITLE_WORDS = /\b(CEO|Chief|Founder|Director|Head|Manager|Owner|President)\b/;
const NAME = /André Silva/;
const NAME_BROKEN = /AndrÃ©|AndrC3A9|AndrAc|Andr\uFFFD|\bAndre Silva\b/;
const MOJIBAKE = /â€|\uFFFD|\u0000/;

const SRC_RE = /<!--\s*src:\s*(.+?)\s*-->/g;

function contentFiles(lang) {
  const dir = join(CONTENT, lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
}

function parsePage(raw, label) {
  const errors = [];
  if (!raw.startsWith("---\n")) {
    errors.push(`${label}: must start with a front-matter block`);
    return { errors };
  }
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    errors.push(`${label}: front-matter block is not closed`);
    return { errors };
  }
  const meta = {};
  for (const line of raw.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const m = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!m) { errors.push(`${label}: bad front-matter line "${line}"`); continue; }
    meta[m[1]] = m[2].trim();
  }
  const body = raw.slice(end + 5).trim();
  for (const key of ["id", "title"]) {
    if (!meta[key]) errors.push(`${label}: front-matter needs "${key}"`);
  }
  const sources = [...body.matchAll(SRC_RE)].map((m) => m[1]);
  return { meta, body, sources, errors };
}

// "welcome-kit/01-why-we-exist.md § Two niches" -> file must exist, heading must be in it.
function resolveSource(src) {
  const [rawPath, heading] = src.split("§").map((s) => s.trim());
  const abs = join(ROOT, rawPath);
  if (!existsSync(abs)) return `source file not found: ${rawPath}`;
  if (heading) {
    const text = readFileSync(abs, "utf8");
    if (!text.includes(heading)) return `source section not found in ${rawPath}: "${heading}"`;
  }
  return null;
}

function compile(group) {
  return (group.patterns || []).map((p) => new RegExp(p, group.flags || ""));
}

function checkForbidden(label, text, fail, { allowName = false } = {}) {
  const groups = ["goals", "counterparties", "people", "aiSubstance", "aiSubstanceLoose", "aiTexture", "superiority", "licence", "conflict"];
  for (const name of groups) {
    const group = FORBIDDEN[name];
    if (!group) continue;
    for (const re of compile(group)) {
      const hit = text.match(re);
      if (hit) fail(`${label}: [${name}] forbidden "${hit[0]}" — ${group.reason}`);
    }
  }

  // Figures.
  for (const p of FORBIDDEN.figures.banned) {
    const hit = text.match(new RegExp(p, "i"));
    if (hit) fail(`${label}: [figures] "${hit[0]}" never goes public — ${FORBIDDEN.figures.reason}`);
  }
  // The learning frame must sit in the same paragraph as the figure. A frame
  // elsewhere on the page does not license a bare credential sentence.
  const cond = FORBIDDEN.figures.conditional;
  const figureRe = new RegExp(cond.pattern, "i");
  text.split(/\n\s*\n/).forEach((para) => {
    if (!figureRe.test(para)) return;
    const framed = cond.requiresOneOf.some((w) => para.toLowerCase().includes(w.toLowerCase()));
    if (!framed) {
      fail(`${label}: [figures] the figure appears without the learning frame in its own paragraph (needs one of: ${cond.requiresOneOf.join(", ")})`);
    }
  });

  // Co-required lines.
  for (const rule of FORBIDDEN.coRequired.rules) {
    if (new RegExp(rule.trigger, "i").test(text)) {
      const ok = rule.requiresOneOf.some((w) => text.toLowerCase().includes(w.toLowerCase()));
      if (!ok) fail(`${label}: [conflict] page speaks of merchants without the two-niche line — ${FORBIDDEN.coRequired.reason}`);
    }
  }

  // The name.
  text.split("\n").forEach((line, i) => {
    if (NAME_BROKEN.test(line)) fail(`${label}:${i + 1}: André Silva written with broken encoding`);
    if (MOJIBAKE.test(line)) fail(`${label}:${i + 1}: mojibake or NUL byte`);
    if (NAME.test(line)) {
      if (!allowName) fail(`${label}:${i + 1}: André Silva appears outside the character page`);
      if (TITLE_WORDS.test(line)) fail(`${label}:${i + 1}: rank word on the same line as André Silva`);
    }
  });
}

function generateGlossary() {
  const kit = readFileSync(join(ROOT, "welcome-kit/09-glossary.md"), "utf8");
  const pairs = JSON.parse(readFileSync(join(SITE, "lib/glossary-bilingue.json"), "utf8"));
  const drop = ["counterparties", "goals", "people", "aiSubstance", "aiSubstanceLoose", "licence"].flatMap((name) =>
    compile(FORBIDDEN[name] || {})
  );
  drop.push(...(FORBIDDEN.figures?.banned || []).map((p) => new RegExp(p, "i")));
  const corpus = LANGS.flatMap((lang) =>
    contentFiles(lang)
      .filter((f) => f !== "11-glossary.md")
      .map((f) => readFileSync(join(CONTENT, lang, f), "utf8"))
  ).join("\n");
  const entries = [];
  for (const m of kit.matchAll(/^- \*\*(.+?)\*\* — (.+)$/gm)) {
    const term = m[1];
    const def = m[2];
    if (drop.some((re) => re.test(def)) || NAME.test(def)) continue;
    if (/\b(Taina|Thiago|Leandro|Hansraj|Sridhar|Viktoria|Abner|Renato|Sheila|Clayton|Rafaela|Govinda|Daniella)\b/.test(def)) continue;
    if (/\b20\d{2}\b/.test(def)) continue;
    const needle = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!new RegExp(`\\b${needle}\\b`, "i").test(corpus)) continue;
    entries.push({ term, def });
  }
  const items = entries
    .map(({ term, def }) => `<dt>${term}</dt>\n<dd>${def}</dd>`)
    .join("\n");
  const en = `---
id: glossary
title: Glossary
---

<!-- src: welcome-kit/09-glossary.md § Glossary -->

<!-- src: welcome-kit/01-why-we-exist.md § Two niches, no conflict of interest -->

<section class="beat beat-refuse">
<h2>What we refuse</h2>
<p>We do not take our clients' merchants. Two niches, no conflict of interest.</p>
</section>

<section class="beat beat-craft">
<dl class="ledger">
${items}
</dl>
</section>
`;
  const ptItems = entries
    .map(({ term, def }) => `<dt>${pairs[term] || term}</dt>\n<dd>${def}</dd>`)
    .join("\n");
  const pt = `---
id: glossary
title: Glossário
---

<!-- src: welcome-kit/09-glossary.md § Glossary -->

<!-- src: welcome-kit/01-why-we-exist.md § Two niches, no conflict of interest -->

<section class="beat beat-refuse">
<h2>O que recusamos</h2>
<p>Não pegamos os merchants dos nossos clientes. Dois nichos, sem conflito de interesse.</p>
</section>

<section class="beat beat-craft">
<dl class="ledger">
${ptItems}
</dl>
</section>
`;
  writeFileSync(join(CONTENT, "en/11-glossary.md"), en);
  writeFileSync(join(CONTENT, "pt/11-glossary.md"), pt);
}

function check() {
  generateGlossary();
  const failures = [];
  const ok = (msg) => console.log(`ok    ${msg}`);
  const fail = (msg) => { failures.push(msg); console.log(`FAIL  ${msg}`); };

  if (!existsSync(CONTENT)) { fail("site/content/ missing"); }
  for (const asset of ["site.css", "carimbo.svg", "rule.svg"]) {
    if (!existsSync(join(ASSETS, asset))) fail(`site/assets/${asset} missing`);
  }

  const pages = {};
  for (const lang of LANGS) {
    pages[lang] = [];
    for (const f of contentFiles(lang)) {
      const label = `${lang}/${f}`;
      const raw = readFileSync(join(CONTENT, lang, f), "utf8");
      const page = parsePage(raw, label);
      for (const e of page.errors) fail(e);
      if (page.errors.length) continue;

      if (!page.sources.length) fail(`${label}: no "<!-- src: ... -->" marker; nothing on the site may be unsourced`);
      for (const src of page.sources) {
        const problem = resolveSource(src);
        if (problem) fail(`${label}: ${problem}`);
      }

      const allowName = page.meta.id === "character";
      checkForbidden(label, `${page.meta.title}\n${page.body}`, fail, { allowName });

      pages[lang].push({ ...page, file: f, lang });
    }
  }

  const enIds = pages.en.map((p) => p.meta.id);
  const ptIds = pages.pt.map((p) => p.meta.id);
  if (enIds.join() !== ptIds.join()) fail(`en/pt page ids differ: en=[${enIds}] pt=[${ptIds}]`);
  else ok(`en/pt parity on ${enIds.length} page id(s): ${enIds.join(", ")}`);

  for (const en of pages.en) {
    const pt = pages.pt.find((p) => p.meta.id === en.meta.id);
    if (!pt) continue;
    if (en.sources.join("|") !== pt.sources.join("|")) {
      fail(`${en.meta.id}: en and pt cite different sources; Portuguese may not carry a claim English does not`);
    }
  }
  if (!failures.length) ok("provenance: every page sourced, en and pt cite the same sections");

  const total = pages.en.length + pages.pt.length;
  ok(`${total} page file(s) scanned against ${Object.keys(FORBIDDEN).length - 1} refusal groups`);

  if (failures.length) {
    console.log(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log("\nall site checks passed");
  return pages;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function urlFor(lang, id) {
  const slug = SLUGS[id]?.[lang];
  // The home slug is the empty string, so test for absence, not falsiness.
  if (slug === undefined) throw new Error(`no slug for page id "${id}" in ${lang}`);
  return lang === "pt" ? `/pt/${slug}` : `/${slug}`;
}

// Page id -> path per language. Home is the language root.
const SLUGS = {
  home: { en: "", pt: "" },
  character: { en: "character/", pt: "carater/" },
  why: { en: "why/", pt: "por-que/" },
  "the-system": { en: "the-system/", pt: "o-sistema/" },
  "how-we-win": { en: "how-we-win/", pt: "como-ganhamos/" },
  rails: { en: "rails/", pt: "trilhos/" },
  settlement: { en: "settlement/", pt: "liquidacao/" },
  what: { en: "what/", pt: "o-que-fazemos/" },
  "website-factory": { en: "website-factory/", pt: "website-factory/" },
  "how-we-work": { en: "how-we-work/", pt: "como-trabalhamos/" },
  rules: { en: "rules/", pt: "regras/" },
  glossary: { en: "glossary/", pt: "glossario/" },
};

function wrapPage({ lang, title, innerHtml, canonical, altUrl }) {
  const enHref = lang === "en" ? canonical : altUrl;
  const ptHref = lang === "pt" ? canonical : altUrl;
  const homeHref = lang === "pt" ? "/pt/" : "/";
  const enNav = lang === "en" ? ' aria-current="page"' : "";
  const ptNav = lang === "pt" ? ' aria-current="page"' : "";
  const head = lang === "pt" ? "SambaPay" : "SambaPay";
  return `<!doctype html>
<html lang="${lang === "pt" ? "pt-BR" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title === head ? head : `${escapeHtml(title)} · SambaPay`}</title>
  <link rel="canonical" href="https://sambapay.tech${canonical}">
  <link rel="alternate" hreflang="en" href="https://sambapay.tech${enHref}">
  <link rel="alternate" hreflang="pt-BR" href="https://sambapay.tech${ptHref}">
  <link rel="stylesheet" href="/assets/site.css">
</head>
<body>
  <header class="site">
    <a class="brand" href="${homeHref}">SambaPay</a>
    <nav class="lang" aria-label="Language">
      <a href="${enHref}"${enNav}>EN</a>
      <a href="${ptHref}"${ptNav}>PT</a>
    </nav>
  </header>
  <main>${innerHtml}</main>
  <footer class="site">
    <span class="mono">sambapay.tech</span>
    · <a href="mailto:dpo@sambapay.tech">dpo@sambapay.tech</a>
  </footer>
</body>
</html>`;
}

async function build() {
  const pages = check();
  const { marked } = await import("marked");
  // Start clean so a renamed page never lingers in the published output.
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  mkdirSync(join(DIST, "assets"), { recursive: true });
  for (const name of readdirSync(ASSETS)) {
    copyFileSync(join(ASSETS, name), join(DIST, "assets", name));
  }

  const urls = [];
  const provenance = [];
  for (const lang of LANGS) {
    for (const page of pages[lang]) {
      const id = page.meta.id;
      const canonical = urlFor(lang, id);
      const altUrl = urlFor(lang === "en" ? "pt" : "en", id);
      const bodyMd = page.body.replace(SRC_RE, "");
      const inner = `<h1>${escapeHtml(page.meta.title)}</h1>\n${marked.parse(bodyMd)}`;
      const html = wrapPage({ lang, title: page.meta.title, innerHtml: inner, canonical, altUrl });
      const outPath = join(DIST, canonical.replace(/^\//, ""), "index.html");
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
      urls.push(`https://sambapay.tech${canonical}`);
      provenance.push(`| \`${canonical}\` | ${lang} | ${page.sources.map((s) => `\`${s}\``).join("<br>")} |`);
      console.log(`html  ${canonical}`);
    }
  }

  writeFileSync(
    join(DIST, "404.html"),
    wrapPage({
      lang: "en",
      title: "Not found",
      innerHtml: "<h1>Not found</h1>\n<p>This page is not published.</p>",
      canonical: "/404.html",
      altUrl: "/pt/",
    })
  );

  // Serve the Portuguese index as a rewrite (200), never a redirect. A 301 from
  // /pt/ to /pt/ matches its own target and loops.
  writeFileSync(join(DIST, "_redirects"), "/pt      /pt/index.html   200\n/pt/     /pt/index.html   200\n");

  writeFileSync(join(DIST, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://sambapay.tech/sitemap.xml\n");
  writeFileSync(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${u}</loc></url>`)
      .join("\n")}\n</urlset>\n`
  );

  writeFileSync(
    join(SITE, "PROVENANCE.md"),
    `# Provenance\n\nGenerated by \`scripts/build-site.mjs build\`. Every public page and the house sections it translates. The site never invents.\n\n| Page | Language | Source |\n|---|---|---|\n${provenance.join(
      "\n"
    )}\n`
  );

  console.log("done  dist/site/");
}

const cmd = process.argv[2];
if (cmd === "check") check();
else if (cmd === "build") await build();
else {
  console.error("usage: node scripts/build-site.mjs check | build");
  process.exit(2);
}
