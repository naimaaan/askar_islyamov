import { pageMetadata } from '@/lib/metadata'
import { booksContent } from '@/content/books'
import { siteContent } from '@/content/site'
import BookCard from '@/components/BookCard'
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
	const books = booksContent[validLocale]

	return pageMetadata(validLocale, '/books', {
		title: books.title,
		description: books.description,
	})
}

export default async function BooksPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const books = booksContent[validLocale]
	const site = siteContent[validLocale]

	// Separate content types for better organization
	const filmItems = books.items.filter(item => item.id === 'films')
	const bookItems = books.items.filter(item => item.id !== 'films')

	return (
		<div className='site-page'>
			<div className='site-container'>
				<PageHeader title={books.title} description={books.description} />
				{/* Books Section */}
				<div className='mb-14 sm:mb-16'>
					<div className='mb-8 border-b border-slate-200 pb-5'>
						<h2 className='section-title'>
							{validLocale === 'ru'
								? 'Книги и монографии'
								: validLocale === 'kz'
								? 'Кітаптар мен монографиялар'
								: 'Books and Monographs'}
						</h2>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						{bookItems.map(book => (
							<div
								key={book.id}
								className='min-w-0'
							>
								<BookCard book={book} locale={validLocale} dict={site.common} />
							</div>
						))}
					</div>
				</div>

				{/* Films Section */}
				{filmItems.length > 0 && (
					<div>
						<div className='mb-8 border-b border-slate-200 pb-5'>
							<h2 className='section-title'>
								{validLocale === 'ru'
									? 'Видеоархив'
									: validLocale === 'kz'
									? 'Бейне мұрағат'
									: 'Video Archive'}
							</h2>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
							{filmItems.map(book => (
								<div
									key={book.id}
									className='min-w-0'
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
