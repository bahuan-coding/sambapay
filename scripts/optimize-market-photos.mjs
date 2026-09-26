#!/usr/bin/env node
// Recompress the market photographs: max 1200px wide, quality 74, progressive.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIR = join(ROOT, "app", "public", "places");
const OUT = join(ROOT, "scripts", "market-out");
import { mkdirSync } from "node:fs";
mkdirSync(OUT, { recursive: true });

const files = readdirSync(DIR).filter((f) => f.startsWith("market-") && f.endsWith(".jpg"));

let before = 0;
let after = 0;
for (const f of files) {
  const p = join(DIR, f);
  const size = statSync(p).size;
  before += size;
  const buf = await sharp(p).rotate().resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 74, progressive: true, mozjpeg: true }).toBuffer();
  const dest = join(OUT, f);
  writeFileSync(dest, buf);
  after += buf.length;
  console.log(`${f}: ${Math.round(size / 1024)} -> ${Math.round(buf.length / 1024)} kb`);
}
console.log(`total: ${Math.round(before / 1024)} -> ${Math.round(after / 1024)} kb`);
console.log(`out: ${OUT}`);
