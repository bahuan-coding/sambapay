/** Country to language. Keep the paths in step with the route table in index.ts. */

export const LANG_COOKIE = 'sp_lang';

export type GeoLang = 'pt' | 'es';

/** Official Spanish. Haiti, Belize and the Guianas stay off this list. */
const SPANISH = new Set([
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ', 'GT', 'HN',
  'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE',
]);

const routes: Record<string, { pt: string; es: string }> = {
  '/': { pt: '/pt/', es: '/es/' },
  '/markets': { pt: '/pt/mercados', es: '/es/mercados' },
  '/product': { pt: '/pt/produto', es: '/es/producto' },
  '/acquirers': { pt: '/pt/adquirentes', es: '/es/adquirentes' },
  '/character': { pt: '/pt/carater', es: '/es/caracter' },
  '/login': { pt: '/pt/login', es: '/es/login' },
  '/signup': { pt: '/pt/signup', es: '/es/signup' },
  '/account': { pt: '/pt/conta', es: '/es/cuenta' },
  '/legal/privacy': { pt: '/pt/legal/privacy', es: '/es/legal/privacy' },
  '/legal/terms': { pt: '/pt/legal/terms', es: '/es/legal/terms' },
  '/404': { pt: '/pt/404', es: '/es/404' },
};

export function langForCountry(code: string | null | undefined): GeoLang | null {
  const country = code?.trim().toUpperCase();
  if (!country || country === 'MOCK') return null;
  if (country === 'BR') return 'pt';
  if (SPANISH.has(country)) return 'es';
  return null;
}

export function languageForVisit(chosen: string | undefined, country: string | undefined): GeoLang | null {
  if (chosen === 'en') return null;
  if (chosen === 'pt' || chosen === 'es') return chosen;
  return langForCountry(country);
}

function normalize(pathname: string): string {
  if (pathname === '' || pathname === '/') return '/';
  return pathname.replace(/\/$/, '') || '/';
}

/** English page to the same page in Portuguese or Spanish. Null for anything that is not a page we publish. */
export function redirectTarget(pathname: string, lang: GeoLang): string | null {
  const path = normalize(pathname);
  if (path === '/pt' || path.startsWith('/pt/') || path === '/es' || path.startsWith('/es/')) return null;
  return routes[path]?.[lang] ?? null;
}
