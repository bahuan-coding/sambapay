#!/usr/bin/env node
// Probe which Monnet logo filenames exist, then download the hits.
import { writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUT = join(ROOT, "app", "public", "methods");
const BASE = "https://monnetpayments.com/wp-content/uploads/2026/09/";

const probes = [
  ["card-cabal", ["Cabal-150x150.png", "Cabal.png"]],
  ["card-naranja", ["Naranja-150x150.png", "Naranja.png"]],
  ["card-banelco", ["Banelco-150x150.png", "Banelco.png"]],
  ["cash-rapipago", ["Rapipago-150x150.png", "Rapipago.png"]],
  ["cash-pago24", ["Pago24-150x150.png", "PAGO24-150x150.png", "Pago-24-150x150.png"]],
  ["cash-cobroexpress", ["Cobro-Express-150x150.png", "Cobroexpress-150x150.png"]],
  ["cash-efecty", ["Efecty-150x150.png", "EFECTY-150x150.png", "Efecty.png"]],
  ["cash-redpagos", ["Redpagos-150x150.png", "REDPAGOS-150x150.png", "Redpagos.png"]],
  ["cash-multicaja", ["Multicaja-150x150.png", "Multicaja.png"]],
  ["cash-gana", ["Gana-150x150.png", "GANA-150x150.png"]],
  ["cash-sured", ["SuRed-150x150.png", "Sured-150x150.png"]],
  ["cash-movilred", ["MovilRed-150x150.png", "Movilred-150x150.png"]],
  ["cash-pagatodo", ["PagaTodo-150x150.png", "Pagatodo-150x150.png"]],
  ["bank-pse", ["PSE-150x150.png", "PSE.png"]],
  ["bank-servipag", ["Servipag-150x150.png", "ServiPag-150x150.png"]],
  ["wallet-dale", ["Dale-150x150.png", "DALE-150x150.png"]],
  ["bank-ficohsa", ["Ficohsa-150x150.png", "FICOHSA-150x150.png"]],
  ["bank-atlantida", ["Banco-Atlantida-150x150.png", "Atlantida-150x150.png"]],
  ["bank-bac", ["BAC-Credomatic-150x150.png", "BAC-150x150.png"]],
  ["bank-pichincha", ["Banco-Pichincha-150x150.png", "Pichincha-150x150.png"]],
  ["bank-guayaquil", ["Banco-Guayaquil-150x150.png", "B.-GUAYAQUIL-150x150.png"]],
  ["cash-westernunion", ["WESTERN-UNION.png", "Western-Union.png"]],
  ["cash-akisi", ["Akisi-150x150.png", "AKISI-150x150.png"]],
  ["cash-genesis", ["Genesis-150x150.png"]],
  ["cash-puntoexpress", ["Punto-Express-150x150.png"]],
  ["cash-kasnet", ["kasnet-150x150.png"]],
  ["cash-tambo", ["Tambo-150x150.png"]],
  ["cash-pagaya", ["PAgaya-150x150.png"]],
];

async function tryGet(name, variants) {
  for (const v of variants) {
    try {
      const res = await fetch(BASE + v, { headers: { "User-Agent": "SambaPaySite/1.0" } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) continue;
      const file = join(OUT, `${name}.png`);
      if (!existsSync(file)) writeFileSync(file, buf);
      return `${name}: ${Math.round(buf.length / 1024)}kb <- ${v}`;
    } catch { /* try next */ }
  }
  return `${name}: none`;
}

for (const [name, variants] of probes) {
  console.log(await tryGet(name, variants));
}
