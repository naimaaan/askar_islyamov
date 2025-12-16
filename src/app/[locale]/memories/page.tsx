import { memoriesContent } from '@/content/memories'
import { Quote } from 'lucide-react'

export default async function MemoriesPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const memories = memoriesContent[validLocale]

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='text-center mb-16'>
				<h1 className='text-4xl font-serif font-bold text-slate-900 mb-4'>
					{memories.title}
				</h1>
				<p className='text-xl text-slate-600 max-w-2xl mx-auto'>
					{memories.description}
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
				{memories.items.map(item => (
					<div
						key={item.id}
						className='bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative'
					>
						<Quote className='absolute top-6 left-6 text-slate-200' size={48} />
						<div className='relative z-10 pt-8'>
							<p className='text-lg text-slate-700 italic mb-6 leading-relaxed'>
								&ldquo;{item.text}&rdquo;
							</p>
							<div>
								<div className='font-bold text-slate-900'>{item.author}</div>
								<div className='text-sm text-slate-500'>{item.role}</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className='text-center bg-slate-900/5 py-16 px-6 rounded-sm max-w-3xl mx-auto'>
				<h3 className='text-2xl font-serif mb-4 text-slate-900'>
					{memories.cta.title}
				</h3>
				<p className='text-slate-600 mb-8 max-w-md mx-auto'>
					{memories.cta.description}
				</p>
				<button className='px-10 py-4 bg-white border border-slate-900/20 text-slate-900 hover:border-slate-900 hover:text-slate-900 transition-all rounded-sm font-medium tracking-widest shadow-sm hover:shadow-md uppercase text-sm'>
					{memories.cta.button}
				</button>
			</div>
		</div>
	)
}
