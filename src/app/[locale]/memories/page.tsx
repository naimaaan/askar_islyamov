import { memoriesContent } from '@/content/memories'
import { Quote, PenTool, Send, MessageCircle } from 'lucide-react'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const memories = memoriesContent[validLocale]

	return {
		title: memories.title,
		description: memories.description,
		openGraph: {
			title: memories.title,
			description: memories.description,
		},
	}
}

export default async function MemoriesPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const memories = memoriesContent[validLocale]

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Hero Section */}
			<div className='relative bg-slate-900 py-24 md:py-32 overflow-hidden'>
				{/* Background Effects */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900' />
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl' />
				<div className='absolute inset-0 bg-[url("/images/noise.png")] opacity-[0.03] mix-blend-overlay' />

				<div className='relative max-w-4xl mx-auto px-4 text-center z-10'>
					<div className='inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-8 backdrop-blur-sm border border-white/10 shadow-2xl'>
						<MessageCircle className='w-6 h-6 text-blue-200' />
					</div>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 tracking-tight leading-tight'>
						{memories.title}
					</h1>
					<p className='text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed'>
						{memories.description}
					</p>
				</div>
			</div>

			{/* Memories Grid - Masonry Layout */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20'>
				<div className='columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'>
					{memories.items.map((item, index) => (
						<div
							key={item.id}
							className='break-inside-avoid bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-500 group flex flex-col relative overflow-hidden'
						>
							{/* Decorative top accent */}
							<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-100 via-blue-100 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

							{/* Quote Icon */}
							<Quote className='w-8 h-8 text-slate-200 mb-6 group-hover:text-blue-200 transition-colors duration-300' />

							<div className='relative z-10'>
								<p className='text-lg text-slate-700 italic mb-8 leading-relaxed font-serif'>
									&ldquo;{item.text}&rdquo;
								</p>

								<div className='flex items-center gap-4 pt-6 border-t border-slate-50'>
									<div className='shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-serif font-bold text-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300'>
										{item.author.charAt(0)}
									</div>
									<div>
										<div className='font-bold text-slate-900 text-sm leading-tight mb-1'>
											{item.author}
										</div>
										<div className='text-xs text-slate-500 uppercase tracking-wider font-medium'>
											{item.role}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className='max-w-4xl mx-auto px-4 pb-24'>
				<div className='bg-white rounded-3xl p-8 md:p-16 border border-slate-200 shadow-xl text-center relative overflow-hidden group'>
					{/* Decorative background */}
					<div className='absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400' />
					<div className='absolute -right-10 -bottom-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700' />

					<div className='relative z-10'>
						<div className='w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-sm'>
							<PenTool size={32} />
						</div>
						<h3 className='text-2xl md:text-3xl font-serif font-bold mb-6 text-slate-900'>
							{memories.cta.title}
						</h3>
						<p className='text-slate-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed'>
							{memories.cta.description}
						</p>
						<a
							href='mailto:contact@askar-islyamov.kz'
							className='inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1 group'
						>
							<Send className='w-4 h-4 mr-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform' />
							{memories.cta.button}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
