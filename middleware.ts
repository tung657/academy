import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { AppConfig } from './utils';

const nextIntlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: AppConfig.locales,

	// Used when no locale matches
	defaultLocale: AppConfig.defaultLocale,

	localePrefix: AppConfig.localePrefix,
});

export default function middleware(req: NextRequest): NextResponse {
	return nextIntlMiddleware(req);
}

// only applies this middleware to files in the app directory
export const config = {
	matcher: [
		'/',
		'/(vi|en)/:path*',
		// Enable redirects that add missing locales
		// (e.g. `/pathnames` -> `/en/pathnames`)
		'/((?!_next|_vercel|.*\\..*).*)',
	],
};
