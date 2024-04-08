import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { AppConfig, LOCAL_TOKEN } from './utils';
import { verifyJwtToken } from './helpers/auth';
import { removePrefix } from './utils';

// Add whatever paths you want to PROTECT here
const authRoutes = [
	'/admin/*',

	// '/api/slides/get-by-id/*'
];

// Function to match the * wildcard character
function matchesWildcard(path: string, pattern: string): boolean {
	if (pattern.endsWith('/*')) {
		const basePattern = pattern.slice(0, -2);
		return path.startsWith(basePattern);
	}
	return path === pattern;
}

const nextIntlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: AppConfig.locales,

	// Used when no locale matches
	defaultLocale: AppConfig.defaultLocale,

	localePrefix: AppConfig.localePrefix,
});

export default async function middleware(req: NextRequest) {
	const BASE_URL = removePrefix(process.env.NEXT_PUBLIC_BASE_URL, '/api');
	const LOGIN = `${BASE_URL}/login?redirect=${
		req.nextUrl.pathname + req.nextUrl.search
	}`;

	if (
		authRoutes.some((pattern) => matchesWildcard(req.nextUrl.pathname, pattern))
	) {
		const token = req.cookies.get(LOCAL_TOKEN);
		// console.log(token);

		// For API routes, we want to return unauthorized instead of
		// redirecting to login
		if (req.nextUrl.pathname.startsWith('/api')) {
			if (!token) {
				const response = {
					success: false,
					message: 'Bạn không có quyền truy cập',
				};
				return NextResponse.json(response, { status: 401 });
			}
		}

		// If no token exists, redirect to login
		if (!token) {
			return NextResponse.redirect(LOGIN);
		}

		try {
			// Decode and verify JWT cookie
			const payload = await verifyJwtToken(token.value);

			if (!payload) {
				// Delete token
				req.cookies.delete(LOCAL_TOKEN);
				return NextResponse.redirect(LOGIN);
			}

			// If you have an admin role and path, secure it here
			if (req.nextUrl.pathname.startsWith('/admin')) {
				if (payload.role !== 'admin') {
					return NextResponse.redirect(`${BASE_URL}/access-denied`);
				}
			}
		} catch (error) {
			// Delete token if authentication fails
			req.cookies.delete(LOCAL_TOKEN);
			return NextResponse.redirect(LOGIN);
		}
	}

	let redirectToApp = false;
	// Redirect login to app if already logged in
	if (req.nextUrl.pathname === '/login') {
		const token = req.cookies.get(LOCAL_TOKEN);

		if (token) {
			try {
				const payload = await verifyJwtToken(token.value);

				if (payload) {
					redirectToApp = true;
				} else {
					// Delete token
					req.cookies.delete(LOCAL_TOKEN);
				}
			} catch (error) {
				// Delete token
				req.cookies.delete(LOCAL_TOKEN);
			}
		}
	}

	if (redirectToApp) {
		// Redirect to app dashboard
		return NextResponse.redirect(`${BASE_URL}`);
	} else {
		return nextIntlMiddleware(req);
		// Return the original response unaltered
	}
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
