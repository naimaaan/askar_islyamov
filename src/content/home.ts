import type { Locale } from '@/lib/i18n'

type HomeContent = {
	biographyLink: string
	memoriesLink: string
	bookLink: string
	playPreview: string
	pausePreview: string
	newsEyebrow: string
	bookSummaries: Record<string, string>
	galleryCaptions: Record<string, string>
}

// Short homepage introductions; full descriptions remain in the book and photo archives.
export const homeContent: Record<Locale, HomeContent> = {
	ru: {
		biographyLink: 'Биография',
		memoriesLink: 'Все воспоминания',
		bookLink: 'О книге',
		playPreview: 'Воспроизвести видеопревью',
		pausePreview: 'Приостановить видеопревью',
		newsEyebrow: 'Мероприятия',
		bookSummaries: {
			'otken-omir': 'Воспоминания о жизни и работе учителя на родной земле.',
			'east-kz-toponymy': 'Исследование географических названий Восточного Казахстана.',
			'tarikhta-kalgan': 'Очерки о краеведении, природе и воспитании учеников.',
		},
		galleryCaptions: { '/images/archive-originals/family-ensemble.jpg': 'Семейный ансамбль Ислямовых' },
	},
	kz: {
		biographyLink: 'Өмірбаян',
		memoriesLink: 'Барлық естеліктер',
		bookLink: 'Кітап туралы',
		playPreview: 'Бейнеүзіндіні ойнату',
		pausePreview: 'Бейнеүзіндіні тоқтату',
		newsEyebrow: 'Іс шаралар',
		bookSummaries: {
			'otken-omir': 'Ұстаздың өмір жолы мен туған жердегі еңбегі туралы естеліктер.',
			'east-kz-toponymy': 'Шығыс Қазақстанның жер-су атауларына арналған зерттеу.',
			'tarikhta-kalgan': 'Өлкетану, табиғат және шәкірт тәрбиесі туралы очерктер.',
		},
		galleryCaptions: { '/images/archive-originals/family-ensemble.jpg': 'Ислямовтардың отбасылық ансамблі' },
	},
	en: {
		biographyLink: 'Biography',
		memoriesLink: 'All memories',
		bookLink: 'About the book',
		playPreview: 'Play video preview',
		pausePreview: 'Pause video preview',
		newsEyebrow: 'Events',
		bookSummaries: {
			'otken-omir': 'Memories of the educator’s life and work in his home region.',
			'east-kz-toponymy': 'A study of the geographical names of East Kazakhstan.',
			'tarikhta-kalgan': 'Essays on local history, nature and the upbringing of pupils.',
		},
		galleryCaptions: { '/images/archive-originals/family-ensemble.jpg': 'The Islyamov family ensemble' },
	},
}
