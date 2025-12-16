import { personContent } from '@/content/person'
import Timeline from '@/components/Timeline'

export default async function BiographyPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const { biography } = personContent[validLocale]

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<h1 className='text-4xl font-serif font-bold text-slate-900 mb-12 text-center'>
				{biography.title}
			</h1>

			<div className='space-y-16'>
				{biography.sections.map((section, index) => (
					<section key={index}>
						<h2 className='text-2xl font-serif font-semibold text-slate-800 mb-4'>
							{section.title}
						</h2>
						<p className='text-lg text-slate-600 leading-relaxed'>
							{section.content}
						</p>
					</section>
				))}

				<section>
					<h2 className='text-2xl font-serif font-semibold text-slate-800 mb-8'>
						Хронология
					</h2>
					<Timeline items={biography.timeline} />
				</section>
			</div>
		</div>
	)
}
