import { Inter, Playfair_Display } from 'next/font/google'
import { locales, defaultLocale } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonJsonLd from '@/components/PersonJsonLd'
import { personContent } from '@/content/person'
import { getDictionary } from '@/lib/i18n'
import '@/app/globals.css'
import { Metadata } from 'next'
import { headers } from 'next/headers'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
})
const playfair = Playfair_Display({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-playfair',
})

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale as any)

	const headersList = await headers()
	const pathname = headersList.get('x-pathname') || ''
	let slug = pathname
	const prefix = `/${locale}`
	if (slug.startsWith(prefix + '/')) {
		slug = slug.slice(prefix.length)
	} else if (slug === prefix) {
		slug = ''
	}

	const languages: Record<string, string> = {}
	locales.forEach(l => {
		languages[l] = `/${l}${slug}`
	})
	languages['x-default'] = `/${defaultLocale}${slug}`

	return {
		metadataBase: new URL('https://askarislyamov.kz'),
		title: {
			template: `%s | ${dict.header.title}`,
			default: dict.metadata.title,
		},
		openGraph: {
			type: 'website',
			url: 'https://askarislyamov.kz',
			siteName: dict.header.title,
		},
		alternates: {
			canonical: `/${locale}${slug}`,
			languages,
		},
		icons: {
			icon: '/favicon.ico',
			shortcut: '/favicon.ico',
			apple: '/apple-touch-icon.png',
			other: [
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					url: '/favicon-16x16.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					url: '/favicon-32x32.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '192x192',
					url: '/android-chrome-192x192.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '512x512',
					url: '/android-chrome-512x512.png',
				},
			],
		},
		manifest: '/site.webmanifest',
	}
}

export async function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale as any)
	const pContent =
		personContent[locale as keyof typeof personContent] || personContent.ru

	return (
		<html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
			<body className='font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col overflow-x-hidden'>
				<PersonJsonLd
					name={pContent.name}
					description={dict.metadata.description}
					url={`https://askarislyamov.kz/${locale}`}
					image='https://askarislyamov.kz/images/port.png'
				/>
				<Header locale={locale as any} dict={dict.header} />
				<main className='flex-grow'>{children}</main>
				<Footer
					locale={locale as any}
					dict={dict.footer}
					nav={dict.header.nav}
				/>
			</body>
		</html>
	)
}
