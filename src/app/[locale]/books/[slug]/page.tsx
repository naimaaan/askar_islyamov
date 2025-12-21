import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { booksContent } from '@/content/books'
import { siteContent } from '@/content/site'
import {
	FileText,
	Download,
	ArrowLeft,
	Play,
	BookOpen,
	Calendar,
} from 'lucide-react'

export async function generateStaticParams({
	params: { locale },
}: {
	params: { locale: string }
}) {
	return []
}

export default async function BookPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}) {
	const { locale, slug } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const books = booksContent[validLocale]
	const site = siteContent[validLocale]
	const book = books.items.find(b => b.id === slug)

	if (!book) {
		notFound()
	}

	const isFilm = book.id === 'films'
	const otherBooks = books.items.filter(b => b.id !== slug).slice(0, 3)

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Navigation Bar */}
			<div className='bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
					<Link
						href={`/${locale}/books`}
						className='inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group'
					>
						<ArrowLeft className='mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform' />
						{site.common.back}
					</Link>
					<div className='text-sm font-serif font-bold text-slate-900 truncate max-w-[200px] md:max-w-md opacity-0 md:opacity-100 transition-opacity'>
						{book.title}
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<div className='relative overflow-hidden bg-slate-900'>
				{/* Ambient Background */}
				<div className='absolute inset-0 overflow-hidden'>
					<Image
						src={book.cover}
						alt=''
						fill
						className='object-cover opacity-30 blur-3xl scale-110 mix-blend-overlay'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/95 to-slate-900/50' />
				</div>

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
					<div className='flex flex-col md:flex-row gap-12 lg:gap-20 items-start'>
						{/* Book Cover */}
						<div className='w-full md:w-1/3 lg:w-[320px] flex-shrink-0 relative z-10 mx-auto md:mx-0 max-w-sm'>
							<div className='transform transition-transform hover:scale-[1.02] duration-500'>
								<Image
									src={book.cover}
									alt={book.title}
									width={600}
									height={900}
									className='w-full h-auto drop-shadow-2xl'
									priority
								/>
							</div>
						</div>

						{/* Content */}
						<div className='flex-1 pt-2 md:pt-4 text-center md:text-left'>
							<div className='flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6'>
								<span className='inline-flex items-center px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-600/20'>
									{isFilm
										? validLocale === 'ru'
											? 'Видеоархив'
											: 'Бейне мұрағат'
										: validLocale === 'ru'
										? 'Книга'
										: 'Кітап'}
								</span>
								{book.year && (
									<span className='inline-flex items-center text-slate-600 text-sm font-medium bg-white/50 px-3 py-1 rounded-full border border-slate-200'>
										<Calendar className='w-3.5 h-3.5 mr-1.5 text-slate-400' />
										{book.year}
									</span>
								)}
							</div>

							<h1 className='text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight tracking-tight'>
								{book.title}
							</h1>

							<div className='prose prose-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0'>
								{book.description}
							</div>

							<div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
								<a
									href={book.pdf}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group'
								>
									{isFilm ? (
										<>
											<Play className='mr-3 h-5 w-5 fill-current group-hover:scale-110 transition-transform' />
											{site.common.watch}
										</>
									) : (
										<>
											<BookOpen className='mr-3 h-5 w-5 group-hover:scale-110 transition-transform' />
											{site.common.openPdf}
										</>
									)}
								</a>

								{!isFilm && (
									<a
										href={book.pdf}
										download
										className='inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md group'
									>
										<Download className='mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors' />
										{site.common.download}
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Related Books Section */}
			{otherBooks.length > 0 && (
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-200'>
					<div className='flex items-center justify-between mb-12'>
						<h2 className='text-2xl md:text-3xl font-serif font-bold text-slate-900'>
							{validLocale === 'ru' ? 'Другие материалы' : 'Басқа материалдар'}
						</h2>
						<Link
							href={`/${locale}/books`}
							className='hidden sm:flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors'
						>
							{validLocale === 'ru' ? 'Все книги' : 'Барлық кітаптар'}
							<ArrowLeft className='ml-2 h-4 w-4 rotate-180' />
						</Link>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
						{otherBooks.map(otherBook => (
							<Link
								key={otherBook.id}
								href={`/${locale}/books/${otherBook.id}`}
								className='group block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full'
							>
								<div className='aspect-[3/4] relative bg-slate-100 overflow-hidden'>
									<Image
										src={otherBook.cover}
										alt={otherBook.title}
										fill
										className='object-cover group-hover:scale-105 transition-transform duration-700'
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300' />
								</div>
								<div className='p-6 flex flex-col flex-grow'>
									<div className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>
										{otherBook.year}
									</div>
									<h3 className='font-serif font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-3'>
										{otherBook.title}
									</h3>
									<p className='text-slate-500 text-sm line-clamp-2 leading-relaxed'>
										{otherBook.description}
									</p>
								</div>
							</Link>
						))}
					</div>

					<div className='mt-8 text-center sm:hidden'>
						<Link
							href={`/${locale}/books`}
							className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors'
						>
							{validLocale === 'ru' ? 'Смотреть все' : 'Барлығын көру'}
							<ArrowLeft className='ml-2 h-4 w-4 rotate-180' />
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}
