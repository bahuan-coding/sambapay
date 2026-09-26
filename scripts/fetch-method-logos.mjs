#!/usr/bin/env node
// Download official LATAM payment-method logos into app/public/methods/.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUT = join(ROOT, "app", "public", "methods");
mkdirSync(OUT, { recursive: true });

const MO = "https://monnetpayments.com/wp-content/uploads/2026/09/";
const targets = [
  // Cards
  ["card-visa", MO + "Visa-150x150.png"],
  ["card-mastercard", MO + "Mastercard-150x150.png"],
  ["card-amex", MO + "American-Express-150x150.png"],
  ["card-diners", MO + "Diners-Club-150x150.png"],
  ["card-elo", MO + "Elo-Card-150x150.png"],
  ["card-hipercard", MO + "Hipercard-150x150.png"],
  ["card-redcompra", MO + "Red-Compra-150x150.png"],
  ["card-webpay", MO + "Web-Pay-150x150.png"],
  ["card-magna", MO + "Magna-150x150.png"],
  // Wallets
  ["wallet-yape", MO + "Yape.png"],
  ["wallet-plin", MO + "Plin.png"],
  ["wallet-mercadopago", MO + "Mercado-Pago-150x150.png"],
  ["wallet-mach", MO + "MACH-150x150.png"],
  ["wallet-modo", MO + "MODO-150x150.png"],
  // Instant / bank transfer
  ["bank-bcp", MO + "BCP-1.png"],
  ["bank-bbva", MO + "BBVA-1.png"],
  ["bank-interbank", MO + "Interbank.png"],
  ["bank-scotiabank", MO + "Scotiabank.png"],
  ["bank-bancoestado", MO + "BancoEstado-150x150.png"],
  ["bank-bci", MO + "BCI-1.png"],
  // QR
  ["qr-plin", MO + "Plin.png"],
  ["qr-yape", MO + "Yape.png"],
  // Cash
  ["cash-pagoefectivo", MO + "kasnet-150x150.png"],
  ["cash-efecty", MO + "Efecty-150x150.png"],
  ["cash-redpagos", MO + "Redpagos-150x150.png"],
];

async function download(url, file) {
  const res = await fetch(url, { headers: { "User-Agent": "SambaPaySite/1.0 (contact@example.com)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) throw new Error(`too small (${buf.length}b)`);
  writeFileSync(file, buf);
  return buf.length;
}

for (const [name, url] of targets) {
  const file = join(OUT, `${name}.png`);
  if (existsSync(file)) {
    console.log(`${name}: exists, skip`);
    continue;
  }
  try {
    const size = await download(url, file);
    console.log(`${name}: ${Math.round(size / 1024)}kb`);
  } catch (err) {
    console.log(`${name}: ERROR ${err.message}`);
  }
}
