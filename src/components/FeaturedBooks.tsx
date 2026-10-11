import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { booksContent } from '@/content/books'
import { siteContent } from '@/content/site'
import { uiText } from '@/lib/ui-text'
import type { Locale } from '@/lib/i18n'

export default function FeaturedBooks({ locale }: { locale: Locale }) {
	const books = booksContent[locale]
	return (
		<section className='mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8'>
			<div className='mb-8 flex flex-wrap items-end justify-between gap-5'>
				<div>
					<h2 className='mb-3 font-serif text-3xl font-bold text-slate-900 sm:text-4xl'>{books.title}</h2>
					<p className='max-w-xl leading-relaxed text-slate-600'>{books.description}</p>
				</div>
				<Link href={`/${locale}/books/`} className='inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-amber-800'>
					{uiText[locale].allBooks}<ArrowRight size={16} aria-hidden='true' />
				</Link>
			</div>
			<div className='grid gap-4 lg:grid-cols-3'>
				{books.items.slice(0, 3).map(book => (
					<Link key={book.id} href={`/${locale}/books/${book.id}/`} className='group flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700 sm:gap-5 sm:p-5'>
						<div className='relative h-40 w-24 shrink-0 sm:h-44 sm:w-28'>
							<Image src={book.cover} alt='' fill sizes='(max-width: 640px) 96px, 112px' className='object-contain transition-transform duration-300 motion-safe:group-hover:-translate-y-1' />
						</div>
						<div className='min-w-0 flex-1'>
							<p className='mb-2 text-xs font-medium tracking-wide text-amber-800'>{book.year}</p>
							<h3 className='mb-2 font-serif text-lg font-semibold leading-snug text-slate-900'>{book.title}</h3>
							<p className='line-clamp-3 text-sm leading-relaxed text-slate-600'>{book.description}</p>
							<span className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-800 group-hover:text-amber-800'>
								{siteContent[locale].common.readMore}<ArrowRight size={15} aria-hidden='true' className='transition-transform motion-safe:group-hover:translate-x-1' />
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
