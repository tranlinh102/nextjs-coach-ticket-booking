// Lightweight auth helpers for middleware.
import { NextRequest } from 'next/server';

// Read token from cookies or Authorization header
export function getTokenFromRequest(req: NextRequest): string | null {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1] || null;

    const cookie = req.cookies.get('token');
    if (cookie) return cookie.value || null;

    return null;
  } catch (e) {
    return null;
  }
}

// Very small synchronous 'verify' placeholder. Replace with real JWT verification logic.
export function verifyToken(token: string): { userId: string } | null {
  // Example: treat token "dev-token" as valid for local development.
  if (token === 'dev-token') return { userId: 'dev' };
  // TODO: plug in a real JWT verification using a secret or public key.
  return null;
}
