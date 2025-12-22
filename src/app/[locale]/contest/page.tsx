import { contestContent } from '@/content/contest'
import ContestTimeline from '@/components/ContestTimeline'
import ContestGallery from '@/components/ContestGallery' // Импортируем новый компонент
import { FileText, Trophy, ExternalLink, Award, Quote } from 'lucide-react'

export default async function ContestPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const contest = contestContent[validLocale]

	// Group winners by year
	const winnersByYear = contest.winners.reduce<
		Record<string, (typeof contest.winners)[number][]>
	>((acc, w) => {
		acc[w.year] = acc[w.year] || []
		acc[w.year].push(w)
		return acc
	}, {})

	// Sort years descending
	const winnersYears = Object.keys(winnersByYear).sort(
		(a, b) => Number(b) - Number(a)
	)

	// Helper to determine rank styling
	const getRankColor = (place: string) => {
		const p = place.toLowerCase()
		if (p.includes('i ') || p.includes('1'))
			return 'text-yellow-600 bg-yellow-400'
		if (p.includes('ii ') || p.includes('2'))
			return 'text-slate-500 bg-slate-300'
		if (p.includes('iii ') || p.includes('3'))
			return 'text-amber-700 bg-amber-600'
		return 'text-slate-500 bg-slate-200'
	}

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<div className='relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl' />

				<div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<div className='inline-flex items-center justify-center px-4 py-1.5 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/10'>
						<Trophy className='w-4 h-4 text-yellow-400 mr-2' />
						<span className='text-xs font-bold text-slate-200 uppercase tracking-widest'>
							{validLocale === 'ru'
								? 'Республиканский конкурс'
								: validLocale === 'kz'
								? 'Республикалық байқау'
								: 'Republican Contest'}
						</span>
					</div>
					<h1 className='text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight tracking-tight'>
						{contest.title}
					</h1>
					<p className='text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed'>
						{contest.description}
					</p>
				</div>
			</div>

			{/* Mission & Timeline Card */}
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10'>
				<div className='bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12'>
					<div className='flex flex-col lg:flex-row gap-12 items-center'>
						<div className='flex-1'>
							<h3 className='text-lg font-serif font-bold text-slate-900 mb-4 flex items-center'>
								<Quote className='w-5 h-5 text-blue-600 mr-3' />
								{validLocale === 'ru'
									? 'Миссия конкурса'
									: validLocale === 'kz'
									? 'Байқау мақсаты'
									: 'Contest Mission'}
							</h3>
							<p className='text-slate-600 italic leading-relaxed text-lg'>
								{contest.goals}
							</p>
						</div>
						<div className='w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 lg:pl-12'>
							<ContestTimeline events={contest.timeline} />
						</div>
					</div>
				</div>
			</div>

			{/* Media Section: Video & Gallery */}
			{/* @ts-ignore - игнорируем проверку типов пока не обновите contest.ts полностью */}
			{(contest.gallery || contest.video) && (
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='mb-8 flex items-center gap-4'>
						<div className='h-px bg-slate-200 flex-1' />
						<h2 className='text-2xl font-serif font-bold text-slate-800'>
							{validLocale === 'ru'
								? 'Галерея событий'
								: validLocale === 'kz'
								? 'Іс-шара галереясы'
								: 'Event Gallery'}
						</h2>
						<div className='h-px bg-slate-200 flex-1' />
					</div>

					<ContestGallery
						// @ts-ignore
						images={contest.gallery || []}
						// @ts-ignore
						videoSrc={contest.video}
					/>
				</div>
			)}

			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
					{/* Main Content: Winners */}
					<div className='lg:col-span-2 space-y-20'>
						{winnersYears.map(year => (
							<div key={year}>
								<div className='flex items-center gap-4 mb-8'>
									<span className='text-5xl font-serif font-bold text-slate-200'>
										{year}
									</span>
									<div className='h-px bg-slate-100 flex-1' />
									<span className='text-sm font-bold text-slate-400 uppercase tracking-widest'>
										{validLocale === 'ru' ? 'Победители' : 'Жеңімпаздар'}
									</span>
								</div>

								<div className='grid gap-4'>
									{winnersByYear[year].map((winner, idx) => {
										const rankColors = getRankColor(winner.place)
										const [textColor, bgColor] = rankColors.split(' ')

										return (
											<div
												key={idx}
												className='relative p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden'
											>
												{/* Rank Indicator Strip */}
												<div
													className={`absolute left-0 top-0 bottom-0 w-1.5 ${bgColor}`}
												/>

												<div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-3'>
													<div className='flex-1'>
														<div className='flex items-center gap-2 mb-2'>
															<Award className={`w-4 h-4 ${textColor}`} />
															<span
																className={`text-xs font-bold uppercase tracking-wider ${textColor}`}
															>
																{winner.place}
															</span>
														</div>
														<h3 className='text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors'>
															{winner.name}
														</h3>
														<p className='text-sm text-slate-500 mb-3 font-medium'>
															{winner.org}
														</p>
														{winner.work && (
															<p className='text-slate-600 text-sm italic border-l-2 border-slate-200 pl-3 py-1 mt-2'>
																&ldquo;{winner.work}&rdquo;
															</p>
														)}
													</div>
													{winner.prize && (
														<div className='shrink-0 mt-2 sm:mt-0'>
															<span className='inline-flex items-center px-3 py-1 rounded-md bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-100'>
																{winner.prize}
															</span>
														</div>
													)}
												</div>
											</div>
										)
									})}
								</div>
							</div>
						))}
					</div>

					{/* Sidebar: Resources & Info */}
					<div className='space-y-8'>
						<div className='bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-8'>
							<h3 className='text-xl font-serif font-bold text-slate-900 mb-6 flex items-center'>
								<FileText className='w-5 h-5 mr-3 text-slate-500' />
								{contest.resources.title}
							</h3>
							<div className='space-y-3'>
								{contest.resources.links.map((link, idx) => (
									<a
										key={idx}
										href={link.href}
										target='_blank'
										rel='noreferrer'
										className='block bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group'
									>
										<div className='flex items-start justify-between'>
											<div className='flex-1 mr-3'>
												<div className='font-medium text-slate-900 text-sm mb-2 group-hover:text-blue-700 transition-colors'>
													{link.label}
												</div>
												<div className='flex items-center gap-2'>
													<span className='text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200'>
														{link.badge}
													</span>
												</div>
											</div>
											<ExternalLink className='w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors mt-1' />
										</div>
									</a>
								))}
							</div>
							{contest.resources.note && (
								<p className='mt-6 text-xs text-slate-500 leading-relaxed border-t border-slate-200 pt-4'>
									{contest.resources.note}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
