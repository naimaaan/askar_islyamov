import { booksContent } from '@/content/books'
import { siteContent } from '@/content/site'
import BookCard from '@/components/BookCard'
import { BookOpen, Film, Library } from 'lucide-react'

export default async function BooksPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const books = booksContent[validLocale]
	const site = siteContent[validLocale]

	// Separate content types for better organization
	const filmItems = books.items.filter(item => item.id === 'films')
	const bookItems = books.items.filter(item => item.id !== 'films')

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Hero Section with Atmospheric Background */}
			<div className='relative bg-slate-900 pt-24 pb-20 overflow-hidden'>
				{/* Background Effects */}
				<div className='absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900' />
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl' />

				{/* Hero Content */}
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<div className='inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-2xl mb-8 ring-1 ring-white/10 shadow-2xl'>
						<Library className='w-8 h-8 text-blue-200' />
					</div>
					<h1 className='text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight'>
						{books.title}
					</h1>
					<p className='text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light'>
						{books.description}
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12'>
				{/* Books Section */}
				<div className='mb-24'>
					<div className='flex items-center gap-4 mb-10 border-b border-slate-200 pb-4'>
						<div className='p-2.5 bg-blue-50 rounded-xl text-blue-700'>
							<BookOpen size={24} />
						</div>
						<h2 className='text-2xl md:text-3xl font-serif font-bold text-slate-900'>
							{validLocale === 'ru'
								? 'Книги и монографии'
								: 'Кітаптар мен монографиялар'}
						</h2>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						{bookItems.map(book => (
							<div
								key={book.id}
								className='transform hover:-translate-y-2 transition-transform duration-500'
							>
								<BookCard book={book} locale={validLocale} dict={site.common} />
							</div>
						))}
					</div>
				</div>

				{/* Films Section */}
				{filmItems.length > 0 && (
					<div>
						<div className='flex items-center gap-4 mb-10 border-b border-slate-200 pb-4'>
							<div className='p-2.5 bg-amber-50 rounded-xl text-amber-700'>
								<Film size={24} />
							</div>
							<h2 className='text-2xl md:text-3xl font-serif font-bold text-slate-900'>
								{validLocale === 'ru' ? 'Видеоархив' : 'Бейне мұрағат'}
							</h2>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
							{filmItems.map(book => (
								<div
									key={book.id}
									className='transform hover:-translate-y-2 transition-transform duration-500'
								>
									<BookCard
										book={book}
										locale={validLocale}
										dict={site.common}
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
