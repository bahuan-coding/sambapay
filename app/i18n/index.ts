import en from './en.json';
import es from './es.json';
import pt from './pt.json';

export type Lang = 'en' | 'pt' | 'es';
export type Messages = typeof en;

const catalogs: Record<Lang, Messages> = { en, pt, es };

export function t(lang: Lang): Messages {
  return catalogs[lang];
}

export function asLang(value: string | null | undefined): Lang {
  if (value === 'pt' || value === 'es' || value === 'en') return value;
  return 'en';
}

export function htmlLang(lang: Lang): string {
  if (lang === 'pt') return 'pt-BR';
  if (lang === 'es') return 'es';
  return 'en';
}

export function ogLocale(lang: Lang): string {
  if (lang === 'pt') return 'pt_BR';
  if (lang === 'es') return 'es_ES';
  return 'en_US';
}

/** Empty on English. `/pt` or `/es` on the other two. */
export function langPrefix(lang: Lang): string {
  return lang === 'en' ? '' : `/${lang}`;
}

type Route = Record<Lang, string>;

const routes: Route[] = [
  { en: '/', pt: '/pt', es: '/es' },
  { en: '/product', pt: '/pt/produto', es: '/es/producto' },
  { en: '/acquirers', pt: '/pt/adquirentes', es: '/es/adquirentes' },
  { en: '/what-we-do', pt: '/pt/o-que-fazemos', es: '/es/que-hacemos' },
  { en: '/character', pt: '/pt/carater', es: '/es/caracter' },
  { en: '/login', pt: '/pt/login', es: '/es/login' },
  { en: '/signup', pt: '/pt/signup', es: '/es/signup' },
  { en: '/account', pt: '/pt/conta', es: '/es/cuenta' },
  { en: '/legal/privacy', pt: '/pt/legal/privacy', es: '/es/legal/privacy' },
  { en: '/legal/terms', pt: '/pt/legal/terms', es: '/es/legal/terms' },
  { en: '/404', pt: '/pt/404', es: '/es/404' },
];

export function normalizePath(path: string): string {
  if (path === '' || path === '/') return '/';
  const trimmed = path.replace(/\/$/, '');
  return trimmed || '/';
}

function publish(path: string): string {
  if (path === '/pt' || path === '/es') return `${path}/`;
  return path;
}

function stripLang(path: string): string {
  if (path === '/pt' || path === '/es') return '/';
  if (path.startsWith('/pt/')) return path.slice(3) || '/';
  if (path.startsWith('/es/')) return path.slice(3) || '/';
  return path;
}

function findRoute(path: string): Route | undefined {
  const normalized = normalizePath(path);
  return routes.find((route) => route.en === normalized || route.pt === normalized || route.es === normalized);
}

export function pathForLang(path: string, lang: Lang): string {
  const route = findRoute(path);
  if (route) return publish(route[lang]);
  const stripped = stripLang(normalizePath(path));
  if (lang === 'en') return stripped;
  return stripped === '/' ? `/${lang}/` : `/${lang}${stripped}`;
}

export function alternatePath(currentPath: string, lang: Lang): string {
  return pathForLang(currentPath, lang);
}

export const navLinks = [
  { key: 'product' as const, en: '/product', pt: '/pt/produto', es: '/es/producto' },
  { key: 'acquirers' as const, en: '/acquirers', pt: '/pt/adquirentes', es: '/es/adquirentes' },
  { key: 'what' as const, en: '/what-we-do', pt: '/pt/o-que-fazemos', es: '/es/que-hacemos' },
];
