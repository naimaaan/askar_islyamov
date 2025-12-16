import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = locales.every(
		locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = defaultLocale

		// e.g. incoming request is /products
		// The new URL is now /ru/products
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
				request.url
			)
		)
	}
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next|images|pdf|favicon.ico).*)',
	],
}
