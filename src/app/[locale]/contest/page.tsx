import { contestContent } from '@/content/contest'
import ContestTimeline from '@/components/ContestTimeline'
import { FileText, Trophy } from 'lucide-react'

export default async function ContestPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const contest = contestContent[validLocale]

	return (
		<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='text-center mb-16'>
				<h1 className='text-4xl font-serif font-bold text-slate-900 mb-6'>
					{contest.title}
				</h1>
				<p className='text-xl text-slate-600 max-w-3xl mx-auto mb-8'>
					{contest.description}
				</p>
				<div className='bg-blue-50 text-blue-900 p-6 rounded-lg border border-blue-100 inline-block text-left max-w-3xl'>
					<p className='text-lg font-medium'>{contest.goals}</p>
				</div>
			</div>

			<div className='mb-20'>
				<ContestTimeline events={contest.timeline} />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-20'>
				<div>
					<h2 className='text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center'>
						<Trophy className='mr-3 text-yellow-500' />
						{locale === 'ru' ? 'Победители 2023' : '2023 Жеңімпаздары'}
					</h2>
					<div className='space-y-4'>
						{contest.winners.map((winner, index) => (
							<div
								key={index}
								className='bg-white p-6 rounded-lg border border-slate-200 shadow-sm'
							>
								<div className='flex justify-between items-start mb-2'>
									<span className='font-bold text-slate-900 text-lg'>
										{winner.name}
									</span>
									<span className='bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full uppercase'>
										{winner.place}
									</span>
								</div>
								<p className='text-slate-600 italic'>
									&ldquo;{winner.work}&rdquo;
								</p>
							</div>
						))}
					</div>
				</div>

				<div>
					<h2 className='text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center'>
						<FileText className='mr-3 text-slate-500' />
						{contest.resources.title}
					</h2>
					<div className='bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-4'>
						<a
							href='#'
							className='flex items-center p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group'
						>
							<div className='bg-red-100 p-2 rounded-md mr-4 group-hover:bg-red-200 transition-colors'>
								<FileText className='text-red-600' size={24} />
							</div>
							<span className='font-medium text-slate-700 group-hover:text-slate-900'>
								{contest.resources.rules}
							</span>
						</a>
						<a
							href='#'
							className='flex items-center p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group'
						>
							<div className='bg-blue-100 p-2 rounded-md mr-4 group-hover:bg-blue-200 transition-colors'>
								<FileText className='text-blue-600' size={24} />
							</div>
							<span className='font-medium text-slate-700 group-hover:text-slate-900'>
								{contest.resources.collection}
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
