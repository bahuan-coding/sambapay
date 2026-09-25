#!/usr/bin/env node
// SambaPay institutional site: check and static build for Netlify.
// Usage: node scripts/build-site.mjs check | build
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SITE = join(ROOT, "site");
const CONTENT = join(SITE, "content");
const ASSETS = join(SITE, "assets");
const DIST = join(ROOT, "dist", "site");

function contentFiles(lang) {
  const dir = join(CONTENT, lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /^\d\d-.*\.md$/.test(f))
    .sort();
}

function parsePage(md, file) {
  const lines = md.split("\n");
  if (!/^# .+/.test(lines[0])) {
    throw new Error(`${file}: line 1 must be "# Title"`);
  }
  const title = lines[0].replace(/^# /, "");
  let bodyStart = 1;
  if (lines[1] === "") bodyStart = 2;
  const bodyMd = lines.slice(bodyStart).join("\n").trim();
  return { title, bodyMd, slug: file.replace(/^\d\d-/, "").replace(/\.md$/, "") };
}

function urlFor(lang, slug) {
  if (slug === "home") return lang === "pt" ? "/pt/" : "/";
  return lang === "pt" ? `/pt/${slug}/` : `/${slug}/`;
}

function wrapPage({ lang, title, innerHtml, altLang, altUrl, canonical }) {
  const otherLabel = lang === "en" ? "PT" : "EN";
  const otherHref = altUrl;
  const homeHref = lang === "pt" ? "/pt/" : "/";
  const enHref = lang === "en" ? canonical : altUrl;
  const ptHref = lang === "pt" ? canonical : altUrl;
  const assetPrefix = lang === "pt" ? "/pt" : "";
  const enNav = lang === "en" ? ' aria-current="page"' : "";
  const ptNav = lang === "pt" ? ' aria-current="page"' : "";
  return `<!doctype html>
<html lang="${lang === "pt" ? "pt-BR" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title === "SambaPay" ? "SambaPay" : `${escapeHtml(title)} · SambaPay`}</title>
  <link rel="canonical" href="https://sambapay.tech${canonical}">
  <link rel="alternate" hreflang="en" href="https://sambapay.tech${enHref}">
  <link rel="alternate" hreflang="pt-BR" href="https://sambapay.tech${ptHref}">
  <link rel="stylesheet" href="${assetPrefix}/assets/site.css">
</head>
<body>
  <header class="site">
    <a class="brand" href="${homeHref}">SambaPay</a>
    <nav class="lang" aria-label="Language">
      <a href="${enHref}"${enNav}>EN</a>
      <a href="${ptHref}"${ptNav}>${otherLabel}</a>
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

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function check() {
  const failures = [];
  const ok = (msg) => console.log(`ok    ${msg}`);
  const fail = (msg) => {
    failures.push(msg);
    console.log(`FAIL  ${msg}`);
  };

  if (!existsSync(CONTENT)) fail("site/content/ missing");
  else ok("site/content/");

  const en = contentFiles("en");
  const pt = contentFiles("pt");
  if (!en.length) fail("no pages in site/content/en");
  else ok(`en pages: ${en.length}`);
  if (!pt.length) fail("no pages in site/content/pt");
  else ok(`pt pages: ${pt.length}`);

  if (en.join() !== pt.join()) {
    fail(`en/pt file mismatch: en=[${en.join()}] pt=[${pt.join()}]`);
  } else ok("en/pt parity");

  for (const lang of ["en", "pt"]) {
    for (const f of contentFiles(lang)) {
      const text = readFileSync(join(CONTENT, lang, f), "utf8");
      if (text.includes("\uFFFD")) fail(`${lang}/${f}: replacement character found`);
      if (/\p{Extended_Pictographic}/u.test(text)) fail(`${lang}/${f}: emoji found`);
      try {
        parsePage(text, `${lang}/${f}`);
      } catch (e) {
        fail(e.message);
      }
    }
  }
  if (!failures.length) ok("page structure");

  if (!existsSync(join(ASSETS, "site.css"))) fail("site/assets/site.css missing");
  else ok("site.css");

  if (failures.length) {
    console.log(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log("\nall site checks passed");
}

async function build() {
  check();
  const { marked } = await import("marked");
  mkdirSync(DIST, { recursive: true });

  const pages = {};
  for (const lang of ["en", "pt"]) {
    pages[lang] = [];
    for (const f of contentFiles(lang)) {
      const text = readFileSync(join(CONTENT, lang, f), "utf8");
      const parsed = parsePage(text, f);
      pages[lang].push({ ...parsed, file: f });
    }
  }

  const assetOutEn = join(DIST, "assets");
  const assetOutPt = join(DIST, "pt", "assets");
  mkdirSync(assetOutEn, { recursive: true });
  mkdirSync(assetOutPt, { recursive: true });
  writeFileSync(join(assetOutEn, "site.css"), readFileSync(join(ASSETS, "site.css"), "utf8"));
  writeFileSync(join(assetOutPt, "site.css"), readFileSync(join(assetOutEn, "site.css"), "utf8"));

  const urls = [];
  for (const lang of ["en", "pt"]) {
    for (const page of pages[lang]) {
      const otherLang = lang === "en" ? "pt" : "en";
      const other = pages[otherLang].find((p) => p.slug === page.slug);
      const canonical = urlFor(lang, page.slug);
      const altUrl = other ? urlFor(otherLang, other.slug) : canonical;
      const inner = `<h1>${escapeHtml(page.title)}</h1>\n${marked.parse(page.bodyMd)}`;
      const html = wrapPage({
        lang,
        title: page.title,
        innerHtml: inner,
        altLang: otherLang,
        altUrl,
        canonical,
      });
      const outPath =
        page.slug === "home"
          ? join(DIST, lang === "pt" ? "pt" : "", "index.html")
          : join(DIST, lang === "pt" ? "pt" : "", page.slug, "index.html");
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
      urls.push(`https://sambapay.tech${canonical}`);
      console.log(`html  ${canonical}`);
    }
  }

  const notFound = wrapPage({
    lang: "en",
    title: "Not found",
    innerHtml: "<h1>Not found</h1><p>This page is not published.</p>",
    altLang: "pt",
    altUrl: "/pt/",
    canonical: "/404.html",
  });
  writeFileSync(join(DIST, "404.html"), notFound);

  // Serve the Portuguese index as a rewrite (200), never a redirect. A 301 from
  // /pt/ to /pt/ matches its own target and loops; _redirects wins over that.
  writeFileSync(
    join(DIST, "_redirects"),
    "/pt      /pt/index.html   200\n/pt/     /pt/index.html   200\n"
  );

  writeFileSync(
    join(DIST, "robots.txt"),
    "User-agent: *\nAllow: /\nSitemap: https://sambapay.tech/sitemap.xml\n"
  );
  writeFileSync(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>\n`
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
