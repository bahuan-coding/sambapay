#!/usr/bin/env node
// SambaPay Welcome Kit: check and build.
// Usage: node scripts/build-kit.mjs check | build
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const KIT = join(ROOT, "welcome-kit");
const DIST = join(ROOT, "dist");
const CHROME = process.env.CHROME || "/usr/bin/google-chrome";

const TITLE_WORDS_KIT = /\b(CEO|Chief|Founder|Director|Head|Manager|Owner|President)\b/;
const TITLE_WORDS_OS = /\b(CEO|Chief|Founder|Director|Head|Manager|President)\b/;
const NAME = /André Silva/;
// A corrupted name defeats the NAME test above, so it must fail on its own.
// Covers: mojibake (AndrÃ©), hex-as-text (AndrC3A9), stripped accent (Andre Silva),
// replacement character, and the loose bytes that came with them.
const NAME_BROKEN = /AndrÃ©|AndrC3A9|AndrAc|Andr\uFFFD|\bAndre Silva\b/;
const MOJIBAKE = /â€|\uFFFD|\u0000/;
const WORD_LIMIT_DEFAULT = 780; // raised for the evolution register in 01 and 03; never cut a fact to fit // 06 holds eight titled roles plus named processes; raised separately
const WORD_LIMIT_ROLES = 900; // 06: eight roles, named processes, and how André Silva participates
const WORD_LIMIT_LONG = 2700; // 04 and 09; 09 is the full glossary — do not cut entries to fit
const PT_LEAK = [" não ", " você ", " também ", " então ", " porque ", " para "];
// Board view that must never appear in the Welcome Kit.
const BOARD_ONLY = [/\bSPA\b/, /Side Letter/i, /Exhibit E/, /\bUnits\b/, /Group Holdings/, /180,680/, /1,905,924/, /1\.70M/, /680[–-]710K/];

// [glossary term, regex that finds the term in the documents]
const JARGON = [
  ["2D", /\b2D\b/], ["3DS", /\b3DS\b/], ["2-step verification", /\b2-step verification\b/i],
  ["acquirer", /\bacquirers?\b/i], ["AML", /\bAML\b/], ["anticipation", /\banticipation\b/i],
  ["always-on", /\balways-on\b/i], ["aggregated volume", /\baggregated volume\b/i], ["approval rate", /\bapproval rate\b/i], ["Asaas", /\bAsaas\b/], ["barrier to entry", /\bbarrier to entry\b/i], ["BIN", /\bBINs?\b/], ["boleto", /\bboletos?\b/i],
  ["Break Even", /\bBreak Even\b/i], ["breakeven", /\bbreakeven\b/i], ["CAID", /\bCAIDs?\b/], ["capture channel", /\bcapture channels?\b/i], ["card corridor", /\bcard corridors?\b/i], ["cardholder", /\bcardholders?\b/i], ["Central Bank of Brazil", /\bCentral Bank of Brazil\b/],
  ["chargeback", /\bchargebacks?\b/i], ["Chargeblast", /\bChargeblast\b/],   ["checkout", /\bcheckout\b/i], ["Cielo", /\bCielo\b/], ["client", /\bclients?\b/i], ["CNPJ", /\bCNPJ\b/], ["conflict of interest", /\bconflict of interest\b/i], ["core team", /\bcore team\b/i], ["corridor", /\bcorridors?\b/i], ["cross-border", /\bcross-border\b/i],
  ["cut-off", /\bcut-off\b/i], ["D+n", /\bD\+n\b/], ["DD1", /\bDD1\b/], ["DD2", /\bDD2\b/], ["decision log", /\bdecision log\b/i],
  ["direct connection", /\bdirect connections?\b/i], ["digitisation", /\bdigitisation\b/i],
  ["Double Diamond", /\bDouble Diamond\b/], ["DPO", /\bDPO\b|dpo@/], ["EFI", /\bEFI\b/], ["factoring", /\bfactoring\b/i],
  ["Finnera", /\bFinnera\b/], ["FX", /\bFX\b/], ["G2", /\bG2\b/],
  ["Global Pass", /\bGlobal Pass\b/], ["Hansraj", /\bHansraj\b/],
  ["infrastructure", /\binfrastructure\b/i], ["ICC++", /ICC\+\+/], ["interchange", /\binterchange\b/i],
  ["Jumio", /\bJumio\b/], ["Key Vault", /\bKey Vault\b/], ["KYB", /\bKYB\b/], ["KYC", /\bKYC\b/],
  ["LGPD", /\bLGPD\b/], ["local commercial policy", /\blocal commercial policy\b/i],
  ["local entity", /\blocal entit(y|ies)\b/i], ["local merchant", /\blocal merchants?\b/i], ["market enabler", /\bmarket enabler\b/i], ["online enabler", /\bonline enablers?\b/i],
  ["MCC", /\bMCC\b|merchant category code/i], ["MDR", /\bMDR\b/], ["merchant", /\bmerchants?\b/i],
  ["Merchant of Record", /\bMerchant of Record\b/], ["MID", /\bMIDs?\b/], ["on-ramp", /\bon-ramp\b/i],
  ["OTC", /\bOTC\b/], ["orchestration", /\borchestration\b/i], ["orchestration swarm", /\borchestration swarm\b/i], ["PayFac", /\bPayFac\b/], ["payment facilitator", /\bpayment facilitator\b/i],
  ["payment institution", /\bpayment[- ]institution\b/i], ["PaySecure", /\bPaySecure\b/],
  ["paytech", /\bpaytech\b/i], ["payout", /\bpayouts?\b/i], ["PCI DSS", /\bPCI DSS\b|\bPCI\b/], ["PEP", /\bPEP\b/], ["PIX", /\bPIX\b/],
  ["Power of Attorney", /\bPower of Attorney\b/], ["production API keys", /\bproduction API keys\b/i],
  ["rail", /\brails?\b/i], ["reconciliation", /\breconciliation\b/i], ["remittance", /\bremittances?\b/i],
  ["rolling reserve", /\brolling reserve\b/i], ["sanctions", /\bsanction(s|ed)\b/i], ["SAQ-D", /\bSAQ-D\b/],
  ["scheme", /\bschemes?\b/i], ["settlement", /\bsettlements?\b/i], ["SimilarWeb", /\bSimilarWeb\b/],
  ["sub-acquirer", /\bsub-acquir/i], ["Sridhar", /\bSridhar\b/],
  ["take rate", /\btake rate\b/i], ["The Map", /\bThe Map\b/], ["Transfero", /\bTransfero\b/],
  ["tokenisation", /\btokenis(ed|ation)\b/i], ["tokenized-PIX rail", /\btokenized-PIX rail\b/i],
  ["USDC", /\bUSDC\b/], ["Viktoria", /\bViktoria\b/], ["Website Factory", /\bWebsite Factory\b/], ["Welcome Kit", /\bWelcome Kit\b/], ["white label", /\bwhite[- ]label\b/i], ["Zoho Mail", /\bZoho Mail\b/],
  ["PTAX", /\bPTAX\b/], ["wallet", /\bwallets?\b/i], ["horizontal scaling", /\bhorizontal(ly)? scal/i],
  ["payment institution", /\bpayment[- ]institution\b/i],
];

const CSS = `
@page { size: A4; margin: 20mm 22mm; }
body { font-family: Inter, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111; max-width: 720px; margin: 0 auto; }
h1 { font-size: 20pt; margin: 0 0 4pt; letter-spacing: -0.2px; }
h2 { font-size: 13pt; margin: 18pt 0 6pt; }
p, li { margin: 0 0 6pt; }
ul, ol { padding-left: 20px; }
code { font-family: "JetBrains Mono", Menlo, Consolas, monospace; font-size: 9.5pt; background: #f3f3f3; padding: 0 3px; }
p.status { color: #666; font-size: 9.5pt; margin-bottom: 14pt; }
.page-break { page-break-after: always; }
`;

function kitFiles() {
  return readdirSync(KIT).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
}

function normalizeTerm(t) {
  return t.toLowerCase().replace(/-/g, " ").trim();
}

function words(text) {
  return text.replace(/[#*_`>|]/g, " ").split(/\s+/).filter(Boolean).length;
}

function check() {
  const failures = [];
  const ok = (msg) => console.log(`ok    ${msg}`);
  const fail = (msg) => { failures.push(msg); console.log(`FAIL  ${msg}`); };

  const files = kitFiles();
  if (files.length !== 10) fail(`expected 10 kit files, found ${files.length}`); else ok("10 kit files");

  const glossaryText = existsSync(join(KIT, "09-glossary.md")) ? readFileSync(join(KIT, "09-glossary.md"), "utf8") : "";
  const glossaryTerms = new Set(
    [...glossaryText.matchAll(/^- \*\*(.+?)\*\*/gm)].map((m) => normalizeTerm(m[1]))
  );
  if (glossaryTerms.size < 60) fail(`glossary has ${glossaryTerms.size} entries, expected at least 60`); else ok(`glossary entries: ${glossaryTerms.size}`);

  const bodyTexts = [];
  for (const f of files) {
    const before = failures.length;
    const text = readFileSync(join(KIT, f), "utf8");
    const lines = text.split(/\r?\n/);
    const num = f.slice(0, 2);
    if (!/^# \d\d · .+$/.test(lines[0])) fail(`${f}: line 1 must be "# NN · Title"`);
    if (lines[1] !== "") fail(`${f}: line 2 must be blank`);
    if (!/^Status: (Settled|In discussion|Open)$/.test(lines[2])) fail(`${f}: line 3 must be a Status line`);
    lines.forEach((line, i) => {
      if (NAME.test(line) && TITLE_WORDS_KIT.test(line)) fail(`${f}:${i + 1}: title word next to André Silva`);
      if (NAME_BROKEN.test(line)) fail(`${f}:${i + 1}: André Silva written with broken encoding`);
      if (MOJIBAKE.test(line)) fail(`${f}:${i + 1}: mojibake or NUL byte`);
    });
    const limit = num === "04" || num === "09" ? WORD_LIMIT_LONG : num === "06" ? WORD_LIMIT_ROLES : WORD_LIMIT_DEFAULT;
    const w = words(text);
    if (w > limit) fail(`${f}: ${w} words, limit ${limit}`);
    if (/\p{Extended_Pictographic}/u.test(text)) fail(`${f}: emoji found`);
    if (text.includes("!")) fail(`${f}: exclamation mark found`);
    const lower = ` ${text.toLowerCase().replace(/\n/g, " ")} `;
    for (const leak of PT_LEAK) if (lower.includes(leak)) fail(`${f}: Portuguese word "${leak.trim()}" found`);
    for (const re of BOARD_ONLY) if (re.test(text)) fail(`${f}: board-view content (${re}) must not appear in the Welcome Kit`);
    if (num >= "01" && num <= "08") bodyTexts.push(text);
    if (failures.length === before) ok(`${f}: structure, words ${w}/${limit}`);
  }

  const body = bodyTexts.join("\n");
  const missing = [];
  for (const [term, re] of JARGON) {
    if (re.test(body) && !glossaryTerms.has(normalizeTerm(term))) missing.push(term);
  }
  if (missing.length) fail(`glossary missing: ${missing.join(", ")}`); else ok("glossary covers every jargon term used in 01–08");

  // Encoding integrity. A BOM hides line 1 from every line-based tool, and a
  // corrupted name slips past the NAME test below. Both must fail the build.
  let scanned = 0;
  for (const dir of ["welcome-kit", "company-os", ".cursor", "scripts", "site"]) {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) continue;
    for (const file of walk(abs, /\.(md|mdc|mjs|css|json)$/)) {
      const rel = file.replace(ROOT + "/", "");
      const raw = readFileSync(file);
      if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) fail(`${rel}: UTF-8 BOM at byte 0`);
      if (raw.includes(0x00)) fail(`${rel}: NUL byte`);
      scanned += 1;
    }
  }
  ok(`encoding integrity: ${scanned} files scanned for BOM and NUL`);

  // Company OS and skills: name never next to a title word. The rule file is excluded on purpose.
  for (const dir of ["company-os", ".cursor/skills"]) {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) continue;
    for (const file of walk(abs)) {
      const text = readFileSync(file, "utf8");
      text.split(/\r?\n/).forEach((line, i) => {
        const where = `${file.replace(ROOT + "/", "")}:${i + 1}`;
        if (NAME.test(line) && TITLE_WORDS_OS.test(line)) fail(`${where}: title word next to André Silva`);
        if (NAME_BROKEN.test(line)) fail(`${where}: André Silva written with broken encoding`);
        if (MOJIBAKE.test(line)) fail(`${where}: mojibake or NUL byte`);
      });
    }
  }

  if (failures.length) {
    console.log(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log("\nall checks passed");
}

function walk(dir, match = /\.(md|mdc)$/) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.name === "node_modules") continue;
    if (entry.isDirectory()) out.push(...walk(p, match));
    else if (match.test(entry.name)) out.push(p);
  }
  return out;
}

async function build() {
  check();
  const { marked } = await import("marked");
  mkdirSync(DIST, { recursive: true });
  const files = kitFiles();
  const bodies = [];
  for (const f of files) {
    const md = readFileSync(join(KIT, f), "utf8").replace(/^Status: (.+)$/m, '<p class="status">Status: $1</p>');
    const html = marked.parse(md);
    bodies.push(html);
    const page = wrap(html, f.replace(/\.md$/, ""));
    const htmlPath = join(DIST, f.replace(/\.md$/, ".html"));
    writeFileSync(htmlPath, page);
    toPdf(htmlPath, join(DIST, f.replace(/\.md$/, ".pdf")));
    console.log(`pdf   ${basename(htmlPath, ".html")}.pdf`);
  }
  const bundle = wrap(bodies.map((b) => `<section class="page-break">${b}</section>`).join("\n"), "SambaPay Welcome Kit");
  const bundlePath = join(DIST, "SambaPay-Welcome-Kit.html");
  writeFileSync(bundlePath, bundle);
  toPdf(bundlePath, join(DIST, "SambaPay-Welcome-Kit.pdf"));
  console.log("pdf   SambaPay-Welcome-Kit.pdf");
}

function wrap(inner, title) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><style>${CSS}</style></head><body>${inner}</body></html>`;
}

function toPdf(htmlPath, pdfPath) {
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`,
  ], { stdio: "ignore" });
}

const cmd = process.argv[2];
if (cmd === "check") check();
else if (cmd === "build") await build();
else { console.error("usage: node scripts/build-kit.mjs check | build"); process.exit(2); }
