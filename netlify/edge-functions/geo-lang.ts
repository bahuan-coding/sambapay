import type { Config, Context } from '@netlify/edge-functions';
import { LANG_COOKIE, languageForVisit, redirectTarget } from '../../app/i18n/geo.ts';

function cookieValue(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return undefined;
}

function skip(pathname: string): boolean {
  if (pathname.startsWith('/@') || pathname.startsWith('/_') || pathname.startsWith('/.')) return true;
  const last = pathname.split('/').pop() ?? '';
  return last.includes('.');
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  if (skip(url.pathname)) return context.next();

  const header = req.headers.get('cookie');
  const country = cookieValue(header, 'nf_country') ?? context.geo?.country?.code;
  const lang = languageForVisit(cookieValue(header, LANG_COOKIE), country);
  if (!lang) return context.next();

  const target = redirectTarget(url.pathname, lang);
  if (!target) return context.next();

  const dest = new URL(target, url.origin);
  dest.search = url.search;
  return new Response(null, {
    status: 302,
    headers: {
      Location: dest.toString(),
      'Cache-Control': 'private, no-store',
    },
  });
};

export const config: Config = {
  path: ['/', '/*'],
  excludedPath: [
    '/api/*',
    '/assets/*',
    '/.netlify/*',
    '/_astro/*',
    '/methods/*',
    '/places/*',
    '/maps/*',
    '/og/*',
    '/process/*',
    '/pt',
    '/pt/*',
    '/es',
    '/es/*',
  ],
  method: ['GET', 'HEAD'],
  onError: 'bypass',
};
