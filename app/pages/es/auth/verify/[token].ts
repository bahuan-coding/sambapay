import type { APIRoute } from 'astro';
import { verifyMagicLink } from '../../../../lib/verify-link';

export const prerender = false;

export const GET: APIRoute = ({ request, params }) => verifyMagicLink(request, params.token);
