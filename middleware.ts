import { NextResponse, type NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from './lib/auth';

// Paths that don't require auth
const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PATHS = ['/', '/login', '/api/auth', '/favicon.ico', '/_next'];

export function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    // Skip public files and known public paths
    if (PUBLIC_FILE.test(pathname) || PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))) {
      return NextResponse.next();
    }

    const token = getTokenFromRequest(req);
    if (!token) {
      // not authenticated -> redirect to login
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = verifyToken(token);
    if (!payload) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Optionally attach user info via header for downstream handlers
    const res = NextResponse.next();
    res.headers.set('x-user-id', payload.userId);
    return res;
  } catch (err) {
    // Global catch: redirect to a friendly error page
    const errorUrl = new URL('/error', req.url);
    // Optionally include a message in query (be careful with leaking secrets)
    errorUrl.searchParams.set('reason', 'middleware_failure');
    return NextResponse.redirect(errorUrl);
  }
}

export const config = {
  // Apply middleware to all routes. Adjust matcher to restrict.
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
