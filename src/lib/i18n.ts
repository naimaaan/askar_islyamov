export const defaultLocale = 'kz'
export const locales = ['ru', 'kz', 'en'] as const
export type Locale = (typeof locales)[number]

// Keep the public /kz URLs; language tags use the ISO code for Kazakh.
export const languageTags: Record<Locale, string> = { ru: 'ru', kz: 'kk', en: 'en' }

export function isLocale(value: string): value is Locale {
	return locales.some(locale => locale === value)
}

export const dictionaries = {
	ru: () => import('@/content/site').then(module => module.siteContent.ru),
	kz: () => import('@/content/site').then(module => module.siteContent.kz),
	en: () => import('@/content/site').then(module => module.siteContent.en),
}

export const getDictionary = async (locale: Locale) => {
	return dictionaries[locale]()
}
