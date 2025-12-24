import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://askarislyamov.kz'

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

	const urls = locales.flatMap(locale => {
		return routes.map(route => ({
			url: `${baseUrl}/${locale}${route}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
		}))
	})

	return urls
}
