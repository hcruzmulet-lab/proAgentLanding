import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/request';

// Routes allowed (besides root which redirects to landing)
const allowedPaths = [
  '/landing',
  // Add other public paths here if needed (e.g., '/terms', '/privacy')
];

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions (favicon.ico, images, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if path is allowed
  const isRootPath = pathname === '/';
  const isLocalePath = locales.some(locale => pathname === `/${locale}`);
  const isAllowedPath = allowedPaths.some(path => {
    // Check exact match or with locale prefix
    return pathname === path ||
           locales.some(locale => pathname === `/${locale}${path}`);
  });

  if (isRootPath || isLocalePath || isAllowedPath) {
    // For allowed paths, use the i18n middleware
    return intlMiddleware(request);
  }

  // Redirect everything else to landing
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}/landing`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en|pt-BR)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
