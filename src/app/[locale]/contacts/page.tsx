import { siteContent } from '@/content/site'
import { Mail } from 'lucide-react'

export default async function ContactsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const site = siteContent[validLocale]

	return (
		<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<h1 className='text-4xl font-serif font-bold text-slate-900 mb-12 text-center'>
				{site.header.nav.find(n => n.href === '/contacts')?.label}
			</h1>

			<div className='bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm text-center'>
				<p className='text-lg text-slate-600 mb-8'>
					{locale === 'ru'
						? 'Этот сайт создан для сохранения педагогического наследия Асқара Ислямова. Если у вас есть материалы, фотографии или воспоминания, которыми вы хотели бы поделиться, пожалуйста, свяжитесь с нами.'
						: 'Бұл сайт Асқар Ислямовтың педагогикалық мұрасын сақтау үшін құрылған. Егер сізде бөліскіңіз келетін материалдар, фотосуреттер немесе естеліктер болса, бізбен хабарласыңыз.'}
				</p>

				<div className='inline-flex items-center justify-center space-x-3 text-xl font-medium text-slate-900 bg-slate-50 px-6 py-4 rounded-lg border border-slate-200'>
					<Mail className='text-slate-500' />
					<a
						href='mailto:contact@askar-islyamov.kz'
						className='hover:text-blue-600 transition-colors'
					>
						contact@askar-islyamov.kz
					</a>
				</div>

				<p className='text-sm text-slate-400 mt-8'>
					{locale === 'ru'
						? 'Сайт поддерживается семьей и учениками.'
						: 'Сайтты отбасы мен шәкірттері қолдайды.'}
				</p>
			</div>
		</div>
	)
}
