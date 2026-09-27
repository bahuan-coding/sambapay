/**
 * Two thin guards for the public write endpoints: a best-effort rate limit and
 * a same-origin check. The limiter is in-memory, so on serverless it only
 * counts within one warm instance — enough to blunt rapid abuse, not a hard
 * quota. The origin check is the real CSRF wall for cookie-authenticated posts.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

export interface RateLimit {
  /** How many hits are allowed inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** True when the caller is still under the limit; the window slides per key. */
export function allowRequest(request: Request, key: string, rule: RateLimit): boolean {
  const id = `${key}:${clientIp(request)}`;
  const now = Date.now();
  const bucket = buckets.get(id);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(id, { count: 1, resetAt: now + rule.windowMs });
    return true;
  }

  if (bucket.count >= rule.limit) return false;
  bucket.count += 1;
  return true;
}

/**
 * Reject a cross-site write. A browser sends `Origin` on every CORS-relevant
 * POST; when it disagrees with the host, it is not our form.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // non-browser or same-origin fetches omit it
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

export function tooMany(): Response {
  return Response.json({ error: 'rate_limited' }, { status: 429 });
}

export function forbiddenOrigin(): Response {
  return Response.json({ error: 'forbidden' }, { status: 403 });
}
