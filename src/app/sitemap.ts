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

	// Use a fixed date or dynamic date.
	// Using new Date() updates the lastModified on every request, which is fine for dynamic sites.
	const currentDate = new Date()

	return locales.flatMap(locale => {
		return routes.map(route => ({
			url: `${baseUrl}/${locale}${route}/`,
			lastModified: currentDate,
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
		}))
	})
}
