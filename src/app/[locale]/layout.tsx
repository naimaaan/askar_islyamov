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
			images: [
				{
					url: '/opengraph.png',
					width: 1200,
					height: 630,
					alt: dict.metadata.title,
				},
			],
		},
		alternates: {
			canonical: `/${locale}${slug}`,
			languages,
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
	const dict = await getDictionary(locale as any)
	const pContent =
		personContent[locale as keyof typeof personContent] || personContent.ru

	// Данные, зависящие от языка (можно вынести в person.ts, если хотите)
	const birthPlace =
		locale === 'kz'
			? 'Семей облысы, Ақсуат ауданы, Қызылкесік совхозы'
			: 'Семейская область, Аксуатский район, совхоз Кызылкесик'

	const spouseName = 'Нағима Сүлейменқызы Сатыбалдина'

	const alumni =
		locale === 'kz'
			? [
					'Семей мұғалімдер техникумы',
					'Өскемен педагогикалық институты',
					'Абай атындағы Қазақ педагогикалық институты',
			  ]
			: [
					'Семипалатинский учительский техникум',
					'Усть-Каменогорский педагогический институт',
					'Казахский педагогический институт имени Абая',
			  ]

	return (
		<html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
			<body className='font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col overflow-x-hidden'>
				<PersonJsonLd
					name={pContent.name}
					description={dict.metadata.description}
					url={`https://askarislyamov.kz/${locale}`}
					image='https://askarislyamov.kz/images/port.png'
					birthDate='1928-03-04'
					deathDate='2001-10-30'
					jobTitle={pContent.role}
					birthPlace={birthPlace}
					spouse={spouseName}
					alumniOf={alumni}
					awards={[
						'Заслуженный учитель Казахской ССР',
						'Отличник народного просвещения СССР',
						'Отличник народного просвещения Казахской ССР',
					]}
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
