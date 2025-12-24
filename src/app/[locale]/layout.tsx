import { Inter, Playfair_Display } from 'next/font/google'
import { locales } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDictionary } from '@/lib/i18n'
import '@/app/globals.css'
import { Metadata } from 'next'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
})
const playfair = Playfair_Display({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-playfair',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://askarislyamov.kz'),
	title: {
		template: '%s | Asqar Islyamov',
		default: 'Asqar Islyamov',
	},
	description:
		'Memorial website dedicated to the life and work of Asqar Islyamov.',
	openGraph: {
		type: 'website',
		url: 'https://askarislyamov.kz',
		siteName: 'Asqar Islyamov Memorial',
	},
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

	return (
		<html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
			<body className='font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col overflow-x-hidden'>
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
