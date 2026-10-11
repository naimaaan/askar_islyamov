import type { Metadata } from 'next'
import { siteContent } from '@/content/site'
import { defaultLocale, languageTags, locales, type Locale } from './i18n'

export const siteUrl = 'https://askarislyamov.kz'

export function localizedPath(locale: Locale, route = '') {
	return `/${locale}${route.replace(/\/$/, '')}/`
}

export function languageAlternates(route = '') {
	return Object.fromEntries([
		...locales.map(locale => [languageTags[locale], `${siteUrl}${localizedPath(locale, route)}`]),
		['x-default', `${siteUrl}${localizedPath(defaultLocale, route)}`],
	])
}

export function pageMetadata(
	locale: Locale,
	route: string,
	content: { title: string; description: string },
): Metadata {
	const site = siteContent[locale]
	const url = `${siteUrl}${localizedPath(locale, route)}`
	const title = route ? `${content.title} | ${site.header.title}` : content.title
	return {
		title: route ? content.title : { absolute: content.title },
		description: content.description,
		alternates: { canonical: url, languages: languageAlternates(route) },
		openGraph: {
			type: 'website', url, title, description: content.description,
			siteName: site.header.title,
			locale: locale === 'kz' ? 'kk_KZ' : locale === 'ru' ? 'ru_RU' : 'en_US',
			images: [{ url: '/opengraph.png', width: 1200, height: 630, alt: site.metadata.title }],
		},
		twitter: { card: 'summary_large_image', title, description: content.description, images: ['/opengraph.png'] },
	}
}
