#!/usr/bin/env node
// Normalise every payment-method logo to a 160x160 transparent square.
import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIR = join(ROOT, "app", "public", "methods");
const OUT = join(ROOT, "scripts", "methods-out");
mkdirSync(OUT, { recursive: true });

const files = readdirSync(DIR).filter((f) => /^(card|wallet|bank|cash|qr)-.*\.png$/.test(f));
const SIZE = 160;

for (const f of files) {
  const p = join(DIR, f);
  const trimmed = await sharp(p)
    .trim({ threshold: 10 })
    .resize({ width: SIZE - 24, height: SIZE - 24, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const canvas = await sharp({
    create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: trimmed, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(join(OUT, f), canvas);
}
console.log(`normalised ${files.length} logos -> ${OUT}`);
