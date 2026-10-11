import { pageMetadata } from '@/lib/metadata'
import { memoriesContent } from '@/content/memories'
import { Quote, Send, MessageCircle } from 'lucide-react'
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

	return pageMetadata(validLocale, '/memories', {
		title: memories.title,
		description: memories.description,
	})
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
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl' />

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
					{memories.items.map(item => (
						<div
							key={item.id}
							className='break-inside-avoid rounded-lg border border-slate-200 bg-white p-6 sm:p-8'
						>
							<Quote className='mb-5 size-6 text-slate-400' aria-hidden='true' />
							<div className='relative z-10'>
								<p className='mb-6 font-serif text-xl italic leading-relaxed text-slate-800'>
									&ldquo;{item.text}&rdquo;
								</p>

								<div className='border-t border-slate-200 pt-5'>
									<div>
										<div className='mb-1 text-sm font-semibold leading-snug text-slate-900'>
											{item.author}
										</div>
										<div className='text-caption'>
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
			<div className='site-container mt-14 pb-24 sm:mt-16'>
				<div className='rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-10'>
					<div>
						<h2 className='section-title mb-5'>
							{memories.cta.title}
						</h2>
						<p className='text-copy mb-6 max-w-2xl'>
							{memories.cta.description}
						</p>
						<a
							href='mailto:contact@askarislyamov.kz'
							className='button-primary'
						>
							<Send className='size-4' />
							{memories.cta.button}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
