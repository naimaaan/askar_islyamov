import { pageMetadata } from '@/lib/metadata'
import { memoriesContent } from '@/content/memories'
import { Quote, Send } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
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
		<div className='site-page'>
			<div className='site-container'>
				<PageHeader title={memories.title} description={memories.description} />
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
			<div className='site-container mt-14 sm:mt-16'>
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
