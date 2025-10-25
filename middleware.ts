// middleware.ts (Place this file in the root of your Next.js project, e.g., frontend/middleware.ts)
// This middleware handles authentication for protected routes using cookies (as per your setup).
// It checks for a valid token in cookies and redirects unauthenticated users to /login.
// Public routes (/login, /register, /) are allowed without auth.

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';  // For JWT verification (install: npm install jose @types/jose if needed)

const JWT_SECRET = process.env.JWT_SECRET;  // Match backend .env

// Protected routes (extend as needed)
const protectedRoutes = ['/chat'];

// Public routes (extend as needed)
const publicRoutes = ['/login', '/register', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect protected routes if no token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify token (optional: decode and check expiry)
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      // Invalid token: clear cookie and redirect
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // For other routes, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};