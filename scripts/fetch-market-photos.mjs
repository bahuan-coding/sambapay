#!/usr/bin/env node
// Fetch one free photograph per market from Wikimedia Commons.
// Writes files to app/public/places/ and prints a credit table for markets.ts.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUT = join(ROOT, "app", "public", "places");
mkdirSync(OUT, { recursive: true });

const targets = [
  ["cr", "San José Costa Rica downtown"],
  ["pa", "Panama City"],
  ["py", "Asunción Paraguay"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    `&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=12` +
    "&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=2000&format=json";
  let res;
  for (let attempt = 0; attempt < 4; attempt++) {
    res = await fetch(url, { headers: { "User-Agent": "SambaPaySite/1.0 (market research)" } });
    if (res.status !== 429) break;
    await sleep(4000 * (attempt + 1));
  }
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data?.query?.pages ?? {});
  return pages
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      const meta = ii.extmetadata ?? {};
      const credit = (meta.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim();
      const licence = meta.LicenseShortName?.value ?? "";
      const page = meta.CanonicalPageName?.value ?? p.title;
      return {
        title: p.title,
        w: ii.width,
        h: ii.height,
        mime: ii.mime,
        thumb: ii.thumburl ?? ii.url,
        credit,
        licence,
        href: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(page.replace(/^File:/, ""))}`,
      };
    })
    .filter(Boolean)
    .filter((x) => x.mime === "image/jpeg" && x.w >= 1600 && x.w > x.h)
    .sort((a, b) => b.w / b.h - a.w / a.h);
}

async function download(url, file) {
  let res;
  for (let attempt = 0; attempt < 4; attempt++) {
    res = await fetch(url, { headers: { "User-Agent": "SambaPaySite/1.0" } });
    if (res.status !== 429) break;
    await sleep(4000 * (attempt + 1));
  }
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(file, buf);
  return buf.length;
}

const report = [];
for (const [code, query] of targets) {
  const file = join(OUT, `market-${code}.jpg`);
  if (existsSync(file)) {
    console.log(`${code}: exists, skip`);
    continue;
  }
  try {
    const results = await search(query);
    const pick = results[0];
    if (!pick) {
      console.log(`${code}: NO LANDSCAPE RESULT for "${query}"`);
      continue;
    }
    const size = await download(pick.thumb, file);
    console.log(`${code}: ${Math.round(size / 1024)}kb <- ${pick.title} (${pick.licence})`);
    report.push({ code, ...pick });
  } catch (err) {
    console.log(`${code}: ERROR ${err.message}`);
  }
  await sleep(1500);
}

console.log("\n--- credits ---");
for (const r of report) {
  console.log(`${r.code}\t${r.credit.replace(/\t/g, " ")}\t${r.licence}\t${r.href}`);
}
