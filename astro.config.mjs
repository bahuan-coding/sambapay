import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// The static kit site stays on Netlify until this app passes review.
// Build output is dist/app, not dist/site.
export default defineConfig({
  srcDir: './app',
  publicDir: './app/public',
  outDir: './dist/app',
  adapter: netlify(),
  site: 'https://sambapay.tech',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
});
