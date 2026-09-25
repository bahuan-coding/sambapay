import en from './en.json';
import pt from './pt.json';

export type Lang = 'en' | 'pt';
export type Messages = typeof en;

const catalogs: Record<Lang, Messages> = { en, pt };

export function t(lang: Lang): Messages {
  return catalogs[lang];
}

const pairs: [string, string][] = [
  ['/', '/pt/'],
  ['/acquirers', '/pt/adquirentes'],
  ['/what-we-do', '/pt/o-que-fazemos'],
  ['/character', '/pt/carater'],
  ['/login', '/pt/login'],
  ['/signup', '/pt/signup'],
  ['/legal/privacy', '/pt/legal/privacy'],
  ['/legal/terms', '/pt/legal/terms'],
  ['/404', '/pt/404'],
];

export function normalizePath(path: string): string {
  if (path === '' || path === '/') return '/';
  const trimmed = path.replace(/\/$/, '');
  return trimmed || '/';
}

export function pathForLang(path: string, lang: Lang): string {
  const normalized = normalizePath(path);
  const pair = pairs.find(([enPath]) => enPath === normalized);
  if (pair) return lang === 'en' ? pair[0] : pair[1];
  if (lang === 'en') return normalized;
  return `/pt${normalized}`;
}

export function alternatePath(currentPath: string, lang: Lang): string {
  const path = normalizePath(currentPath);
  const pair = pairs.find(([enPath, ptPath]) => enPath === path || ptPath === path);
  if (pair) return lang === 'en' ? pair[0] : pair[1];
  if (lang === 'en') {
    if (path === '/pt') return '/';
    if (path.startsWith('/pt/')) return path.slice(3) || '/';
    return path;
  }
  if (path === '/pt') return '/pt/';
  if (path.startsWith('/pt/')) return path;
  return path === '/' ? '/pt/' : `/pt${path}`;
}

export const navLinks = [
  { key: 'acquirers' as const, en: '/acquirers', pt: '/pt/adquirentes' },
  { key: 'what' as const, en: '/what-we-do', pt: '/pt/o-que-fazemos' },
  { key: 'character' as const, en: '/character', pt: '/pt/carater' },
];
