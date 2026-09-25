import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// Netlify publishes this app. Build output is dist/app, not dist/site.
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
