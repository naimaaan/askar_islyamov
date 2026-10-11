import type { Locale } from '@/lib/i18n'

type Award = { title: string; date?: string; dateLabel?: string }
type AwardDocument = { src: string; title: string; caption: string; wide?: boolean }
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
			{ src: '/images/awards/honoured-teacher-1983.webp', title: 'Заслуженный учитель Казахской ССР', caption: 'Почётное звание присвоено Указом Президиума Верховного Совета Казахской ССР от 5 октября 1983 года.', wide: true },
			{ src: '/images/awards/education-ussr.webp', title: 'Отличник просвещения СССР', caption: 'Знак отличия за успехи в обучении и воспитании подрастающего поколения.', wide: true },
			{ src: '/images/awards/education-kazakh-ssr.webp', title: 'Отличник народного просвещения Казахской ССР', caption: 'Удостоверение выдано Министерством просвещения Казахской ССР.', wide: true },
			{ src: '/images/awards/special-merits-pension.webp', title: 'За особые заслуги перед Республикой Казахстан', caption: 'Удостоверение о назначении пенсии за особые заслуги перед Республикой Казахстан.', wide: true },
			{ src: '/images/awards/veteran-of-labour.webp', title: 'Медаль «Ветеран труда»', caption: 'Награда за долголетний добросовестный труд.' },
			{ src: '/images/awards/socialist-competition-1974.webp', title: 'Победитель социалистического соревнования · 1974', caption: 'Удостоверение к нагрудному знаку по итогам соревнования 1974 года.' },
			{ src: '/images/awards/pension-book.webp', title: 'Пенсионная книжка', caption: 'Асқар Ислямов, 1928 года рождения.' },
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
			{ src: '/images/awards/honoured-teacher-1983.webp', title: 'Қазақ КСР-інің еңбек сіңірген мұғалімі', caption: 'Құрметті атақ Қазақ КСР Жоғарғы Кеңесі Президиумының 1983 жылғы 5 қазандағы Жарлығымен берілген.', wide: true },
			{ src: '/images/awards/education-ussr.webp', title: 'КСРО Халық ағарту ісінің үздігі', caption: 'Жас ұрпақты оқыту мен тәрбиелеудегі жетістіктері үшін берілген төсбелгі.', wide: true },
			{ src: '/images/awards/education-kazakh-ssr.webp', title: 'Қазақ КСР халық ағарту ісінің үздігі', caption: 'Куәлікті Қазақ КСР Оқу министрлігі берген.', wide: true },
			{ src: '/images/awards/special-merits-pension.webp', title: 'Қазақстан Республикасына сіңірген ерекше еңбегі үшін', caption: 'Қазақстан Республикасына ерекше сіңірген еңбегі үшін зейнетақы тағайындау туралы куәлік.', wide: true },
			{ src: '/images/awards/veteran-of-labour.webp', title: '«Еңбек ардагері» медалі', caption: 'Көп жылғы адал еңбегі үшін берілген марапат.' },
			{ src: '/images/awards/socialist-competition-1974.webp', title: 'Социалистік жарыстың жеңімпазы · 1974', caption: '1974 жылғы жарыс қорытындысы бойынша берілген төсбелгінің куәлігі.' },
			{ src: '/images/awards/pension-book.webp', title: 'Зейнетақы кітапшасы', caption: 'Асқар Ислямов, 1928 жылы туған.' },
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
			{ src: '/images/awards/honoured-teacher-1983.webp', title: 'Honoured Teacher of the Kazakh SSR', caption: 'The honorary title was granted by decree of the Presidium of the Supreme Soviet of the Kazakh SSR on 5 October 1983.', wide: true },
			{ src: '/images/awards/education-ussr.webp', title: 'Excellence in Education of the USSR', caption: 'An award for achievements in teaching and educating the younger generation.', wide: true },
			{ src: '/images/awards/education-kazakh-ssr.webp', title: 'Excellence in Public Education of the Kazakh SSR', caption: 'Certificate issued by the Ministry of Education of the Kazakh SSR.', wide: true },
			{ src: '/images/awards/special-merits-pension.webp', title: 'Special merits to the Republic of Kazakhstan', caption: 'Certificate granting a pension for special merits to the Republic of Kazakhstan.', wide: true },
			{ src: '/images/awards/veteran-of-labour.webp', title: 'Veteran of Labour medal', caption: 'An award for many years of conscientious service.' },
			{ src: '/images/awards/socialist-competition-1974.webp', title: 'Winner of Socialist Competition · 1974', caption: 'Certificate for the badge awarded following the 1974 competition.' },
			{ src: '/images/awards/pension-book.webp', title: 'Pension book', caption: 'Askar Islyamov, born in 1928.' },
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
