import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { booksContent } from '@/content/books'
import { siteUrl, localizedPath, languageAlternates } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {

	// Define your main routes here
	const routes = [
		'',
		'/biography',
		'/books',
		'/gallery',
		'/awards',
		'/contest',
		'/memories',
		'/contacts',
	]

	return locales.flatMap(locale => {
		return [...routes, ...booksContent[locale].items.map(book => `/books/${book.id}`)].map(route => ({
			url: `${siteUrl}${localizedPath(locale, route)}`,
			alternates: { languages: languageAlternates(route) },
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
		}))
	})
}
