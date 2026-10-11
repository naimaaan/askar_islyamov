import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { booksContent } from '@/content/books'
import { homeContent } from '@/content/home'
import { uiText } from '@/lib/ui-text'
import type { Locale } from '@/lib/i18n'
import HomeSectionHeading from './HomeSectionHeading'

export default function FeaturedBooks({ locale }: { locale: Locale }) {
	const books = booksContent[locale]
	const home = homeContent[locale]
	return (
		<section aria-labelledby='home-books-title' className='mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8'>
			<HomeSectionHeading id='home-books-title' title={books.title} description={books.description} href={`/${locale}/books/`} linkLabel={uiText[locale].allBooks} />
			<div className='grid gap-4 lg:grid-cols-3'>
				{books.items.slice(0, 3).map(book => (
					<Link key={book.id} href={`/${locale}/books/${book.id}/`} className='group flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 sm:gap-5 sm:p-5'>
						<div className='relative h-40 w-24 shrink-0 sm:h-44 sm:w-28'>
							<Image src={book.cover} alt='' fill sizes='(max-width: 640px) 96px, 112px' className='object-contain transition-transform duration-300 motion-safe:group-hover:-translate-y-1' />
						</div>
						<div className='min-w-0 flex-1'>
							<p className='mb-2 text-xs font-medium tracking-wide text-slate-600'>{book.year}</p>
							<h3 className='mb-2 font-serif text-lg font-semibold leading-snug text-slate-900'>{book.title}</h3>
							<p className='text-sm leading-relaxed text-slate-600'>{home.bookSummaries[book.id] ?? book.description}</p>
							<span className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-800 group-hover:text-blue-700'>
								{home.bookLink}<ArrowRight size={15} aria-hidden='true' className='transition-transform motion-safe:group-hover:translate-x-1' />
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
