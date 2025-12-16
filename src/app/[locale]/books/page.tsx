import { booksContent } from '@/content/books'
import { siteContent } from '@/content/site'
import BookCard from '@/components/BookCard'

export default async function BooksPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const books = booksContent[validLocale]
	const site = siteContent[validLocale]

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='text-center mb-16'>
				<h1 className='text-4xl font-serif font-bold text-slate-900 mb-4'>
					{books.title}
				</h1>
				<p className='text-xl text-slate-600 max-w-2xl mx-auto'>
					{books.description}
				</p>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				{books.items.map(book => (
					<BookCard
						key={book.id}
						book={book}
						locale={validLocale}
						dict={site.common}
					/>
				))}
			</div>
		</div>
	)
}
