export const defaultLocale = 'kz'
export const locales = ['ru', 'kz', 'en'] as const
export type Locale = (typeof locales)[number]

export const dictionaries = {
	ru: () => import('@/content/site').then(module => module.siteContent.ru),
	kz: () => import('@/content/site').then(module => module.siteContent.kz),
	en: () => import('@/content/site').then(module => module.siteContent.en),
}

export const getDictionary = async (locale: Locale) => {
	// In a real app with separate files per locale, we would import them here.
	// For this project, we'll use the structure requested where content is in TS files.
	// We'll assume the content files export an object with keys for 'ru' and 'kz'.
	return dictionaries[locale as keyof typeof dictionaries]
		? dictionaries[locale as keyof typeof dictionaries]()
		: dictionaries['kz']()
}
