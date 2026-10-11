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
		<section aria-labelledby='home-books-title' className='site-container py-14 sm:py-16'>
			<HomeSectionHeading id='home-books-title' title={books.title} description={books.description} href={`/${locale}/books/`} linkLabel={uiText[locale].allBooks} />
			<div className='grid gap-4 lg:grid-cols-3'>
				{books.items.slice(0, 3).map((book, index) => (
					<Link key={book.id} data-home-reveal data-home-delay={index} href={`/${locale}/books/${book.id}/`} className='home-card group flex min-w-0 items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 sm:gap-5 sm:p-5'>
						<div className='relative h-40 w-24 shrink-0 sm:h-44 sm:w-28'>
							<Image src={book.cover} alt='' fill sizes='(max-width: 640px) 96px, 112px' className='object-contain transition-transform duration-300 motion-safe:group-hover:-translate-y-1' />
						</div>
						<div className='min-w-0 flex-1'>
							<p className='mb-2 text-xs font-medium tracking-wide text-slate-600'>{book.year}</p>
							<h3 className='card-title mb-2 transition-colors group-hover:text-blue-700'>{book.title}</h3>
							<p className='text-caption'>{home.bookSummaries[book.id] ?? book.description}</p>
							<span className='text-link mt-4 group-hover:text-blue-700'>
								{home.bookLink}<ArrowRight size={15} aria-hidden='true' className='transition-transform motion-safe:group-hover:translate-x-1' />
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
