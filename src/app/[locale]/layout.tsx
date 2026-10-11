import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { locales, isLocale, languageTags } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonJsonLd from '@/components/PersonJsonLd'
import { personContent } from '@/content/person'
import { getDictionary } from '@/lib/i18n'
import '@/app/globals.css'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const inter = Inter({
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	variable: '--font-inter',
})
// Full font files include Kazakh glyphs omitted by the Google Fonts web subsets.
const playfair = localFont({
	src: [
		{ path: '../fonts/playfair-display.ttf', weight: '400 900', style: 'normal' },
		{ path: '../fonts/playfair-display-italic.ttf', weight: '400 900', style: 'italic' },
	],
	variable: '--font-playfair',
	adjustFontFallback: 'Times New Roman',
})

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	if (!isLocale(locale)) notFound()
	const dict = await getDictionary(locale)

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
			images: [
				{
					url: '/opengraph.png',
					width: 1200,
					height: 630,
					alt: dict.metadata.title,
				},
			],
		},
		icons: {
			icon: [
				{ url: '/favicon.ico' },
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
				{
					url: '/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					url: '/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
			shortcut: '/favicon.ico',
			apple: '/apple-touch-icon.png',
		},
		manifest: '/site.webmanifest',
	}
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	if (!isLocale(locale)) notFound()
	const dict = await getDictionary(locale)
	const pContent = personContent[locale]

	const birthPlace =
		locale === 'kz'
			? 'Семей облысы, Ақсуат ауданы, Қызылкесік совхозы'
			: locale === 'en'
			? 'Kyzylkesik, Aksuat district, Semey region'
			: 'Семипалатинская область, Аксуатский район, совхоз Кызылкесик'

	const spouseName = 'Нағима Сүлейменқызы Сатыбалдина'

	const alumni =
		locale === 'kz'
			? [
					'Семей мұғалімдер техникумы',
					'Өскемен педагогикалық институты',
					'Абай атындағы Қазақ педагогикалық институты',
			  ]
			: locale === 'en'
			? ['Semey Teacher Training College', 'Ust-Kamenogorsk Pedagogical Institute', 'Abai Kazakh Pedagogical Institute']
			: [
					'Семипалатинский учительский техникум',
					'Усть-Каменогорский педагогический институт',
					'Казахский педагогический институт имени Абая',
			  ]

	// 🔹 Один канонический URL сущности для всех локалей
	const personUrl = 'https://askarislyamov.kz'

	return (
		<html lang={languageTags[locale]} className={`${inter.variable} ${playfair.variable}`}>
			<body className='font-sans bg-white text-slate-900 min-h-screen flex flex-col overflow-x-hidden'>
				<PersonJsonLd
					name={pContent.name}
					description={dict.metadata.description}
					url={personUrl}
					// 🔹 Реальная фотка
					image='https://askarislyamov.kz/images/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82.jpeg'
					birthDate='1928-03-04'
					deathDate='2001-10-30'
					jobTitle={pContent.role}
					birthPlace={birthPlace}
					spouse={spouseName}
					alumniOf={alumni}
					awards={[...pContent.awards]}
					// 🔹 Самое важное – связка с wiki + Wikidata
					sameAs={[
						'https://kk.wikipedia.org/wiki/Ислямов_Асқар_Жұмағұлұлы',
						'https://www.wikidata.org/wiki/Q137571264',
					]}
				/>
				<Header locale={locale} dict={dict.header} />
				<main className='flex-grow'>{children}</main>
				<Footer
					locale={locale}
					dict={dict.footer}
					nav={dict.header.nav}
				/>
			</body>
		</html>
	)
}
