import { awardsContent } from '@/content/awards'
import AwardCard from '@/components/AwardCard'

export default async function AwardsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const awards = awardsContent[validLocale]

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='text-center mb-16'>
				<h1 className='text-4xl font-serif font-bold text-slate-900 mb-4'>
					{awards.title}
				</h1>
				<p className='text-xl text-slate-600 max-w-2xl mx-auto'>
					{awards.description}
				</p>
			</div>

			<div className='space-y-8 mb-20'>
				{awards.items.map((item, index) => (
					<AwardCard key={index} item={item} />
				))}
			</div>

			<div className='bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200'>
				<h2 className='text-2xl font-serif font-bold text-slate-900 mb-6'>
					{awards.influence.title}
				</h2>
				<p className='text-lg text-slate-600 leading-relaxed'>
					{awards.influence.content}
				</p>
			</div>
		</div>
	)
}
