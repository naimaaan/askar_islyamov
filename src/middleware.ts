import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// ✅ исключаем служебные и SEO-файлы от i18n редиректа
	const excludedPaths = [
		'/robots.txt',
		'/sitemap.xml',
		'/favicon.ico',
		'/manifest.webmanifest',
	]

	if (
		excludedPaths.includes(pathname) ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.includes('.') // любые файлы типа .png .jpg .css .js .xml .txt и т.д.
	) {
		return NextResponse.next()
	}

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = locales.every(
		locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = defaultLocale
		return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
	}

	const response = NextResponse.next()
	response.headers.set('x-pathname', pathname)
	return response
}

export const config = {
	matcher: [
		// ✅ matcher тоже исключает robots/sitemap и любые файлы с расширением
		'/((?!_next|api|images|pdf|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
	],
}
