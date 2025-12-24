import { awardsContent } from '@/content/awards'
import { Award, Star, Trophy, Medal, Quote, Sparkles } from 'lucide-react'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const awards = awardsContent[validLocale]

	return {
		title: awards.title,
		description: awards.description,
		openGraph: {
			title: awards.title,
			description: awards.description,
		},
	}
}

export default async function AwardsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const awards = awardsContent[validLocale]

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Hero Section with Atmospheric Background */}
			<div className='relative bg-slate-900 pt-24 pb-32 overflow-hidden'>
				{/* Background Effects */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900' />
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl' />

				{/* Pattern Overlay */}
				<div className='absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]' />

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10'>
					<div className='inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-8 backdrop-blur-sm border border-white/10 ring-1 ring-white/5 shadow-2xl'>
						<Trophy className='w-6 h-6 text-blue-200' />
					</div>
					<h1 className='text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight'>
						{awards.title}
					</h1>
					<p className='text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light'>
						{awards.description}
					</p>
				</div>
			</div>

			{/* Awards Grid - Floating over the hero */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{awards.items.map((item, index) => (
						<div
							key={index}
							className='bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl border border-slate-100 hover:border-blue-100 transition-all duration-500 group flex flex-col relative overflow-hidden'
						>
							{/* Decorative background gradient on hover */}
							<div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

							{/* Icon & Header */}
							<div className='relative flex items-start justify-between mb-6'>
								<div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-blue-200 group-hover:shadow-lg group-hover:rotate-3'>
									{index === 0 ? (
										<Star className='w-7 h-7 text-slate-400 group-hover:text-white transition-colors' />
									) : (
										<Medal className='w-7 h-7 text-slate-400 group-hover:text-white transition-colors' />
									)}
								</div>
								{item.year && (
									<span className='text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200'>
										{item.year}
									</span>
								)}
							</div>

							{/* Content */}
							<div className='relative flex-grow'>
								<h3 className='text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition-colors leading-tight'>
									{item.title}
								</h3>
								<p className='text-slate-600 leading-relaxed text-sm'>
									{item.description}
								</p>
							</div>

							{/* Decorative line */}
							<div className='relative mt-8 pt-6 border-t border-slate-100 flex items-center justify-between'>
								<div className='flex gap-1'>
									<div className='w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors delay-75' />
									<div className='w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors delay-150' />
									<div className='w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors delay-200' />
								</div>
								<Award className='w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors transform group-hover:scale-110' />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Influence / Legacy Section */}
			{awards.influence && (
				<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24'>
					<div className='bg-white rounded-3xl p-8 md:p-16 border border-slate-200 shadow-xl relative overflow-hidden group'>
						{/* Top accent line */}
						<div className='absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300' />

						{/* Background decoration */}
						<Quote className='absolute top-8 right-8 text-slate-50 w-32 h-32 -rotate-12 transform group-hover:scale-110 transition-transform duration-700' />
						<div className='absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -ml-20 -mb-20 opacity-50' />

						<div className='relative z-10 text-center md:text-left'>
							<div className='inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-wider border border-blue-100'>
								<Sparkles className='w-4 h-4' />
								<span>{awards.influence.title}</span>
							</div>

							<div className='flex flex-col md:flex-row gap-8 items-center'>
								<div className='flex-1'>
									<p className='text-xl md:text-2xl text-slate-800 leading-relaxed font-serif italic'>
										&ldquo;{awards.influence.content}&rdquo;
									</p>
								</div>

								{/* Visual separator for desktop */}
								<div className='hidden md:block w-px h-24 bg-slate-200' />

								<div className='shrink-0 text-center md:text-left'>
									<div className='text-sm text-slate-500 font-medium uppercase tracking-widest mb-1'>
										{validLocale === 'ru'
											? 'Наследие'
											: validLocale === 'kz'
											? 'Мұра'
											: 'Legacy'}
									</div>
									<div className='text-slate-900 font-bold font-serif text-lg'>
										Asqar Islyamov
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
