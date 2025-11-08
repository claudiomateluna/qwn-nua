import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get the user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define protected routes
  const protectedPaths = [
    /^\/dashboard/,
    /^\/api\/dashboard/,
    // Add other protected routes as needed
  ];

  const isProtectedPath = protectedPaths.some(path => path.test(req.nextUrl.pathname));

  // If the route is protected and there's no session, redirect to login
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // If user is trying to access auth pages but is already logged in, redirect to dashboard
  if (req.nextUrl.pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/api/:path*'],
};