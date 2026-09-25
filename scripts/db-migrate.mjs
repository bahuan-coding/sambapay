import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

if (!process.env.DATABASE_URL) {
  try {
    const text = readFileSync(new URL('../.env', import.meta.url), 'utf8');
    for (const line of text.split('\n')) {
      const match = line.match(/^DATABASE_URL=(.*)$/);
      if (match) process.env.DATABASE_URL = match[1].replace(/^["']|["']$/g, '');
    }
  } catch {
    // No local env file. CI may skip below.
  }
}

if (!process.env.DATABASE_URL) {
  if (process.env.CI) {
    console.log('Skipping db:migrate — no DATABASE_URL in CI. The static site does not need the database.');
    process.exit(0);
  }
  console.error('Missing DATABASE_URL');
  process.exit(1);
}

const drizzleKit = fileURLToPath(new URL('../node_modules/.bin/drizzle-kit', import.meta.url));
execSync(`"${drizzleKit}" migrate`, { stdio: 'inherit', env: process.env });
