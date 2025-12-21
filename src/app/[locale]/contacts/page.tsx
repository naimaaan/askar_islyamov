import { siteContent } from '@/content/site'
import {
	Mail,
	Image as ImageIcon,
	PenTool,
	FileText,
	Send,
	Heart,
	Code,
	BookOpen,
} from 'lucide-react'

export default async function ContactsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const site = siteContent[validLocale]

	const content = {
		ru: {
			subtitle:
				'Мы будем рады вашим письмам, воспоминаниям и архивным материалам.',
			emailLabel: 'Напишите нам',
			helpTitle: 'Как вы можете помочь проекту?',
			helpItems: [
				{
					icon: ImageIcon,
					title: 'Архивные фото',
					desc: 'Если у вас сохранились редкие снимки с Асқаром Ислямовым, мы с благодарностью добавим их в галерею.',
				},
				{
					icon: PenTool,
					title: 'Воспоминания',
					desc: 'Поделитесь историей о встрече, уроке или совместной работе. Живые истории — душа этого сайта.',
				},
				{
					icon: FileText,
					title: 'Уточнения',
					desc: 'Если вы заметили неточность в датах, пожалуйста, сообщите нам, чтобы мы исправили.',
				},
			],
			aboutTitle: 'О создании сайта',
			aboutText:
				'Этот цифровой памятник создан с любовью и уважением к памяти дедушки. Мы постарались собрать воедино историю жизни, чтобы она вдохновляла новые поколения.',
			credits: [
				{
					role: 'Разработка и дизайн',
					name: 'Внук Асқара Ислямова',
					icon: Code,
				},
				{
					role: 'Архивные материалы',
					name: 'Сара Аскаровна (дочь)',
					icon: BookOpen,
				},
			],
			footer: 'Сайт поддерживается семьей Асқара Ислямова.',
		},
		kz: {
			subtitle:
				'Біз сіздің хаттарыңызға, естеліктеріңізге және мұрағаттық материалдарыңызға қуаныштымыз.',
			emailLabel: 'Бізге жазыңыз',
			helpTitle: 'Жобаға қалай көмектесе аласыз?',
			helpItems: [
				{
					icon: ImageIcon,
					title: 'Мұрағаттық суреттер',
					desc: 'Егер сізде Асқар Ислямовпен түскен сирек суреттер сақталса, біз оларды галереяға қуана қосамыз.',
				},
				{
					icon: PenTool,
					title: 'Естеліктер',
					desc: 'Кездесу, сабақ немесе бірге жұмыс істеу туралы естелікпен бөлісіңіз. Жанды оқиғалар — бұл сайттың жаны.',
				},
				{
					icon: FileText,
					title: 'Түзетулер',
					desc: 'Егер сіз даталарда қате байқасаңыз, бізге хабарлаңыз, біз түзетеміз.',
				},
			],
			aboutTitle: 'Сайттың құрылуы туралы',
			aboutText:
				'Бұл сандық ескерткіш атамыздың рухына деген сүйіспеншілікпен және құрметпен жасалған. Біз өмір тарихын жинақтап, келешек ұрпаққа үлгі етуге тырыстық.',
			credits: [
				{
					role: 'Әзірлеу және дизайн',
					name: 'Асқар Ислямовтың немересі',
					icon: Code,
				},
				{
					role: 'Мұрағаттық материалдар',
					name: 'Сара Асқарқызы (қызы)',
					icon: BookOpen,
				},
			],
			footer: 'Сайтты Асқар Ислямовтың отбасы қолдайды.',
		},
	}[validLocale]

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Hero Section */}
			<div className='relative bg-slate-900 pt-24 pb-48 overflow-hidden'>
				{/* Background Effects */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900' />
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl' />
				<div className='absolute inset-0 bg-[url("/images/noise.png")] opacity-[0.03] mix-blend-overlay' />

				<div className='relative max-w-4xl mx-auto px-4 text-center z-10'>
					<div className='inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-8 backdrop-blur-sm border border-white/10 shadow-2xl'>
						<Mail className='w-6 h-6 text-blue-200' />
					</div>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight'>
						{site.header.nav.find(n => n.href === '/contacts')?.label}
					</h1>
					<p className='text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed'>
						{content.subtitle}
					</p>
				</div>
			</div>

			{/* Main Content Card */}
			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-16'>
				<div className='bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden'>
					<div className='grid md:grid-cols-5'>
						{/* Left Side: Contact Info (Dark) */}
						<div className='md:col-span-2 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden'>
							{/* Decorative circles */}
							<div className='absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl' />
							<div className='absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl' />

							<div className='relative z-10'>
								<h3 className='text-xl font-serif font-bold mb-2 text-blue-200'>
									{content.emailLabel}
								</h3>
								<p className='text-slate-400 text-sm mb-8'>
									contact@askar-islyamov.kz
								</p>

								<a
									href='mailto:contact@askar-islyamov.kz'
									className='inline-flex items-center justify-center w-full px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors group'
								>
									<Send className='w-4 h-4 mr-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-blue-600' />
									{validLocale === 'ru' ? 'Написать письмо' : 'Хат жазу'}
								</a>
							</div>

							<div className='relative z-10 mt-12'>
								<div className='flex items-center gap-3 text-sm text-slate-400'>
									<Heart className='w-4 h-4 text-red-400' />
									<span>{content.footer}</span>
								</div>
							</div>
						</div>

						{/* Right Side: How to help (Light) */}
						<div className='md:col-span-3 p-10 bg-white'>
							<h3 className='text-2xl font-serif font-bold text-slate-900 mb-8'>
								{content.helpTitle}
							</h3>

							<div className='space-y-8'>
								{content.helpItems.map((item, index) => (
									<div key={index} className='flex gap-5 group'>
										<div className='shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300'>
											<item.icon className='w-6 h-6' />
										</div>
										<div>
											<h4 className='font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors'>
												{item.title}
											</h4>
											<p className='text-slate-500 text-sm leading-relaxed'>
												{item.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* About / Credits Section */}
			<div className='bg-white border-t border-slate-100'>
				<div className='max-w-4xl mx-auto px-4 py-16 text-center'>
					<h2 className='text-2xl font-serif font-bold text-slate-900 mb-6'>
						{content.aboutTitle}
					</h2>
					<p className='text-slate-600 text-lg mb-12 leading-relaxed max-w-2xl mx-auto'>
						{content.aboutText}
					</p>

					<div className='grid md:grid-cols-2 gap-8 max-w-2xl mx-auto'>
						{content.credits.map((credit, index) => (
							<div
								key={index}
								className='flex items-center gap-4 p-4 rounded-xl bg-slate-50 text-left'
							>
								<div className='w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400'>
									<credit.icon className='w-5 h-5' />
								</div>
								<div>
									<div className='text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5'>
										{credit.role}
									</div>
									<div className='font-bold text-slate-900'>{credit.name}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
