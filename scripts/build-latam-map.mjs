#!/usr/bin/env node
// Draw a Latin America map plate in the SambaPay palette from Natural Earth data.
// Output: app/public/maps/latam.svg
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SRC = process.argv[2] || join(process.env.TEMP || "/tmp", "ne110.geojson");
const OUT = join(ROOT, "app", "public", "maps");
mkdirSync(OUT, { recursive: true });

// ISO A3 codes for the markets we open. Mexico is North America but in our map.
const LATAM = new Set([
  "MEX", "BLZ", "GTM", "HND", "SLV", "NIC", "CRI", "PAN",
  "CUB", "DOM", "HTI", "JAM", "PRI", "TTO", "BRB", "GRD", "LCA", "VCT", "DMA", "ATG", "KNA",
  "COL", "VEN", "GUY", "SUR", "GUF",
  "ECU", "PER", "BRA", "BOL", "PRY", "URY", "ARG", "CHL",
]);

const geo = JSON.parse(readFileSync(SRC, "utf8"));

// Gather rings in lon/lat.
const rings = [];
for (const f of geo.features) {
  const iso = f.properties.ADM0_A3 || f.properties.ISO_A3;
  if (!LATAM.has(iso)) continue;
  const g = f.geometry;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  for (const poly of polys) {
    for (const ring of poly) {
      if (ring.length < 8) continue;
      rings.push(ring);
    }
  }
}

// Project with a simple Mercator trimmed to LATAM bounds.
const lonMin = -120, lonMax = -33, latMin = -58, latMax = 34;
const W = 1600, H = 1600;
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const yTop = merc(latMax), yBot = merc(latMin);
const sx = (lon) => ((lon - lonMin) / (lonMax - lonMin)) * W;
const sy = (lat) => ((yTop - merc(lat)) / (yTop - yBot)) * H;

function pathOf(ring) {
  let d = "";
  for (let i = 0; i < ring.length; i++) {
    const [lon, lat] = ring[i];
    d += `${i === 0 ? "M" : "L"}${sx(lon).toFixed(1)} ${sy(lat).toFixed(1)}`;
  }
  return d + "Z";
}

const land = `<path fill-rule="evenodd" d="${rings.map(pathOf).join("")}"/>`;

// Hubs: our market centres, lon/lat.
const hubs = [
  ["Mexico City", -99.13, 19.43],
  ["Bogota", -74.07, 4.71],
  ["Lima", -77.04, -12.05],
  ["Santiago", -70.65, -33.46],
  ["Buenos Aires", -58.38, -34.6],
  ["Sao Paulo", -46.63, -23.55],
  ["Brasilia", -47.88, -15.79],
  ["Manaus", -60.02, -3.12],
  ["Panama", -79.52, 8.98],
  ["Mexico North", -103.4, 25.5],
];

const hubDots = hubs
  .map(([, lon, lat]) => `<circle class="hub" cx="${sx(lon).toFixed(1)}" cy="${sy(lat).toFixed(1)}" r="7"/>`)
  .join("");

// Routes radiate from Panama, the hinge of the map, into each market.
const HINGE = 8; // Panama
const routes = [
  [HINGE, 0], // Panama -> Mexico City
  [HINGE, 1], // Panama -> Bogota
  [HINGE, 3], // Panama -> Santiago
  [HINGE, 4], // Panama -> Buenos Aires
  [HINGE, 6], // Panama -> Brasilia
  [1, 2],     // Bogota -> Lima
  [6, 5],     // Brasilia -> Sao Paulo
  [5, 4],     // Sao Paulo -> Buenos Aires
];
const routePaths = routes
  .map(([a, b]) => {
    const [ax, ay] = [sx(hubs[a][1]), sy(hubs[a][2])];
    const [bx, by] = [sx(hubs[b][1]), sy(hubs[b][2])];
    const mx = (ax + bx) / 2 + (ay - by) * 0.18;
    const my = (ay + by) / 2 + (bx - ax) * 0.18;
    return `<path class="route" d="M${ax.toFixed(0)} ${ay.toFixed(0)} Q${mx.toFixed(0)} ${my.toFixed(0)} ${bx.toFixed(0)} ${by.toFixed(0)}"/>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#168821"/>
      <stop offset="0.5" stop-color="#C4890A"/>
      <stop offset="1" stop-color="#1351B4"/>
    </linearGradient>
  </defs>
  <g class="land">${land}</g>
  <g class="routes">${routePaths}</g>
  <g class="hubs">${hubDots}</g>
</svg>`;

writeFileSync(join(OUT, "latam.svg"), svg);
console.log(`land rings: ${rings.length}`);
console.log(`hubs: ${hubs.length}, routes: ${routes.length}`);
console.log(`-> ${join(OUT, "latam.svg")}`);
