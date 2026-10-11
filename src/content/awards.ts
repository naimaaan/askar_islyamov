import type { Locale } from '@/lib/i18n'

type Award = { title: string; date?: string; dateLabel?: string }
type AwardDocument = { src: string; title: string; caption: string }
type AwardsContent = {
	title: string
	description: string
	portraitCaption: string
	titlesHeading: string
	titles: Award[]
	documentsHeading: string
	documents: AwardDocument[]
	distinctionsHeading: string
	distinctions: Award[]
	statusHeading: string
	status: string
	zoomLabel: string
}

// Dates and document captions come from the original photographs in the archive.
export const awardsContent: Record<Locale, AwardsContent> = {
	ru: {
		title: 'Награды и признание',
		description: 'Многолетний труд Асқара Ислямова в школе и общественной жизни отмечен почётными званиями, медалями и грамотами.',
		portraitCaption: 'Асқар Ислямов с медалями и нагрудными знаками.',
		titlesHeading: 'Почётные звания',
		titles: [
			{ title: 'Заслуженный учитель Казахской ССР', date: '1983-10-05', dateLabel: '5 октября 1983 года' },
			{ title: 'Отличник просвещения СССР' },
			{ title: 'Отличник народного просвещения Казахской ССР' },
		],
		documentsHeading: 'Грамота и удостоверения',
		documents: [
			{ src: '/images/почетная грамота.jpg', title: 'Почётная грамота · 1984', caption: 'За успехи в воспитании подрастающего поколения и активное участие в профсоюзной работе. Президиум Тарбагатайского райкома профсоюза работников просвещения, Ақжар, 17 ноября 1984 года.' },
			{ src: '/images/archive-2026/p27-i01.webp', title: 'Удостоверения к почётным званиям', caption: 'Документы о присвоении звания заслуженного учителя Казахской ССР, знаках отличника просвещения СССР и Казахской ССР, а также особых заслугах перед Республикой Казахстан.' },
			{ src: '/images/archive-2026/p28-page.webp', title: 'Трудовые награды', caption: 'Удостоверения к медали «Ветеран труда», знаку «Победитель социалистического соревнования 1974 года» и пенсионная книжка.' },
		],
		distinctionsHeading: 'Медали и другие награды',
		distinctions: [
			{ title: 'Медаль «Ветеран труда»' },
			{ title: 'Медаль «За доблестный труд в Великой Отечественной войне»' },
			{ title: 'Знак «Отличник гражданской обороны СССР»' },
			{ title: 'Диплом «Лучший лектор» областного партийного комитета' },
		],
		statusHeading: 'Особое признание',
		status: 'Пенсионер за особые заслуги перед Республикой Казахстан.',
		zoomLabel: 'Увеличить фотографию',
	},
	kz: {
		title: 'Марапаттар мен құрмет',
		description: 'Асқар Ислямовтың мектептегі көп жылғы еңбегі мен қоғамдық қызметі құрметті атақтармен, медальдармен және грамоталармен бағаланды.',
		portraitCaption: 'Асқар Ислямов медальдары мен төсбелгілерін тағып түскен портрет.',
		titlesHeading: 'Құрметті атақтар',
		titles: [
			{ title: 'Қазақ КСР-інің еңбек сіңірген мұғалімі', date: '1983-10-05', dateLabel: '1983 жылғы 5 қазан' },
			{ title: 'КСРО Халық ағарту ісінің үздігі' },
			{ title: 'Қазақ КСР халық ағарту ісінің үздігі' },
		],
		documentsHeading: 'Грамота мен куәліктер',
		documents: [
			{ src: '/images/почетная грамота.jpg', title: 'Құрмет грамотасы · 1984', caption: 'Жас ұрпақты тәрбиелеудегі жетістіктері және кәсіподақ жұмысына белсенді қатысқаны үшін. Тарбағатай аудандық ағарту қызметкерлері кәсіподағы комитетінің президиумы, Ақжар, 1984 жылғы 17 қараша.' },
			{ src: '/images/archive-2026/p27-i01.webp', title: 'Құрметті атақтардың куәліктері', caption: 'Қазақ КСР-інің еңбек сіңірген мұғалімі атағын, КСРО және Қазақ КСР халық ағарту ісінің үздігі белгілерін, сондай-ақ Қазақстан Республикасына сіңірген ерекше еңбегін растайтын құжаттар.' },
			{ src: '/images/archive-2026/p28-page.webp', title: 'Еңбек марапаттары', caption: '«Ветеран труда» медалінің, «Победитель социалистического соревнования 1974 года» белгісінің куәліктері және зейнетақы кітапшасы.' },
		],
		distinctionsHeading: 'Медальдар мен өзге марапаттар',
		distinctions: [
			{ title: '«Еңбек ардагері» медалі' },
			{ title: '«Отан соғысы кезіндегі тылдағы үздік еңбегі үшін» медалі' },
			{ title: '«КСРО Азаматтық қорғаныс ісінің үздігі» белгісі' },
			{ title: 'Облыстық партия комитетінің «Үздік лектор» дипломы' },
		],
		statusHeading: 'Ерекше құрмет',
		status: 'Қазақстан Республикасына ерекше сіңірген еңбегі үшін зейнетақы иесі.',
		zoomLabel: 'Фотосуретті үлкейту',
	},
	en: {
		title: 'Awards and Recognition',
		description: 'Askar Islyamov’s years of work in schools and public life were recognised with honorary titles, medals and certificates.',
		portraitCaption: 'Askar Islyamov wearing his medals and badges.',
		titlesHeading: 'Honorary titles',
		titles: [
			{ title: 'Honoured Teacher of the Kazakh SSR', date: '1983-10-05', dateLabel: '5 October 1983' },
			{ title: 'Excellence in Education of the USSR' },
			{ title: 'Excellence in Public Education of the Kazakh SSR' },
		],
		documentsHeading: 'Certificates and award documents',
		documents: [
			{ src: '/images/почетная грамота.jpg', title: 'Certificate of Honour · 1984', caption: 'For achievements in educating the younger generation and active participation in trade union work. Issued by the Tarbagatai district education workers’ trade union committee, Akzhar, 17 November 1984.' },
			{ src: '/images/archive-2026/p27-i01.webp', title: 'Certificates of honorary titles', caption: 'Documents for the title of Honoured Teacher of the Kazakh SSR, the USSR and Kazakh SSR education awards, and special merits to the Republic of Kazakhstan.' },
			{ src: '/images/archive-2026/p28-page.webp', title: 'Awards for service', caption: 'Certificates for the Veteran of Labour medal and the Winner of Socialist Competition 1974 badge, alongside a pension book.' },
		],
		distinctionsHeading: 'Medals and other awards',
		distinctions: [
			{ title: 'Veteran of Labour medal' },
			{ title: 'Medal for Valiant Labour in the Great Patriotic War' },
			{ title: 'Excellence in Civil Defence of the USSR badge' },
			{ title: 'Best Lecturer diploma from the regional party committee' },
		],
		statusHeading: 'Special recognition',
		status: 'Pensioner for special merits to the Republic of Kazakhstan.',
		zoomLabel: 'Enlarge photograph',
	},
}