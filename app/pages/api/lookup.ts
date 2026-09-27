import type { APIRoute } from 'astro';
import { lookupCompany } from '../../lib/kyb';
import { allowRequest, forbiddenOrigin, isSameOrigin, tooMany } from '../../lib/guard';
import { identityFor } from '../../data/identity';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!isSameOrigin(request)) return forbiddenOrigin();
  if (!allowRequest(request, 'lookup', { limit: 60, windowMs: 10 * 60 * 1000 })) return tooMany();

  let body: { country?: string; document?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const country = String(body.country ?? '').toUpperCase();
  const document = String(body.document ?? '').trim();

  if (country.length !== 2 || !document) {
    return Response.json({ found: false }, { status: 200 });
  }

  // Never look up a document that fails the country check digit.
  const identity = identityFor(country);
  if (identity.taxId.validate && !identity.taxId.validate(document)) {
    return Response.json({ found: false, reason: 'invalid' }, { status: 200 });
  }

  const profile = await lookupCompany(country, document);
  if (!profile) {
    return Response.json({ found: false }, { status: 200 });
  }

  return Response.json({ found: true, profile });
};
