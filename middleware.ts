import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get the user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define protected routes - more specific patterns
  const isProtectedPath =
    req.nextUrl.pathname.startsWith('/dashboard') &&
    !req.nextUrl.pathname.startsWith('/dashboard/api');

  // If the route is protected and there's no session, redirect to login
  if (isProtectedPath && !session) {
    // For API routes, return a 401 instead of redirecting
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // If user is trying to access auth pages but is already logged in, redirect to dashboard
  // EXCEPT when accessing the signout or logout routes
  if (req.nextUrl.pathname.startsWith('/auth') && session) {
    // Special handling for signout - don't redirect, let the signout process happen
    if (req.nextUrl.pathname === '/auth/signout' || req.nextUrl.pathname === '/auth/logout') {
      return res;
    }

    // Check if the user has a complete profile
    // Check if the user is already on the complete-profile page to avoid infinite redirects
    const isCompletingProfile = req.nextUrl.pathname.startsWith('/auth/complete-profile');

    if (!isCompletingProfile && session) {
      // Check if the user has a profile in the users table
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', session.user.id)
        .single();

      // If no profile exists, redirect to complete profile page
      if (!userProfile && !error) {
        return NextResponse.redirect(new URL('/auth/complete-profile', req.url));
      }
    }

    // Only redirect to dashboard if not trying to complete profile
    if (!isCompletingProfile) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Check if the user has a session but no profile and is trying to access dashboard
  if (isProtectedPath && session) {
    // Check if the user has a profile in the users table
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', session.user.id)
      .single();

    // If no profile exists, redirect to complete profile page
    if (!userProfile && !error) {
      return NextResponse.redirect(new URL('/auth/complete-profile', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/auth/:path*', '/api/:path*'],
};