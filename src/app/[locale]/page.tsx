import Link from 'next/link'
import { ArrowRight, BookOpen, Quote, ChevronRight } from 'lucide-react'
import { personContent } from '@/content/person'
import { booksContent } from '@/content/books'
import { galleryContent } from '@/content/gallery'
import { siteContent } from '@/content/site'
import { memoriesContent } from '@/content/memories'
import BookCard from '@/components/BookCard'
import Image from 'next/image'

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const person = personContent[validLocale]
	const books = booksContent[validLocale]
	const gallery = galleryContent[validLocale]
	const site = siteContent[validLocale]
	const memories = memoriesContent[validLocale]

	// Select a featured memory (e.g., the first one)
	const featuredMemory = memories.items[0]

	return (
		<div className='flex flex-col min-h-screen'>
			{/* Hero Section with Gradient and Texture */}
			<section className='relative bg-slate-900 text-white overflow-hidden'>
				{/* Background Gradient Effect */}
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0' />

				{/* Decorative elements */}
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl' />

				{/* Reduced padding from py-24 md:py-32 to py-12 md:py-20 */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20'>
					{/* Reduced gap from gap-12 md:gap-20 to gap-8 md:gap-12 */}
					<div className='flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12'>
						<div className='flex-1 space-y-6 text-center md:text-left'>
							<div className='inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-slate-300 mb-2'>
								1928 — 2001
							</div>
							{/* Reduced text size from 5xl/7xl to 4xl/6xl */}
							<h1 className='text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tight'>
								{person.name}
							</h1>
							{/* Reduced text size from xl/2xl to lg/xl */}
							<p className='text-lg md:text-xl text-slate-300 font-light tracking-wide'>
								{person.role}
							</p>
							<p className='text-base md:text-lg text-slate-400 max-w-2xl mx-auto md:mx-0 leading-relaxed border-l-2 border-slate-700 pl-6'>
								{person.intro}
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4'>
								<Link
									href={`/${validLocale}/biography`}
									className='inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 text-base font-medium rounded-sm hover:bg-slate-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
								>
									{site.common.readMore}
									<ArrowRight className='ml-2 h-5 w-5' />
								</Link>
								<Link
									href={`/${validLocale}/books`}
									className='inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-base font-medium rounded-sm text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300'
								>
									<BookOpen className='mr-2 h-5 w-5' />
									{site.header.nav.find(n => n.href === '/books')?.label}
								</Link>
							</div>
						</div>

						{/* Enhanced Image Container - Reduced Size */}
						<div className='relative group'>
							<div className='absolute inset-0 bg-gradient-to-tr from-amber-200/20 to-blue-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
							{/* Reduced size from w-72/28rem to w-64/24rem */}
							<div className='w-64 h-64 md:w-[24rem] md:h-[24rem] rounded-full border-8 border-slate-800/50 shadow-2xl overflow-hidden relative z-10 ring-1 ring-white/10'>
								<Image
									src='/images/image2.png'
									alt={person.name}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									style={{
										objectPosition: '50% 10%',
									}}
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Quote Section - Adds "Soul" */}
			<section className='bg-slate-50 py-20 border-b border-slate-200'>
				<div className='max-w-4xl mx-auto px-4 text-center'>
					<Quote className='w-12 h-12 text-slate-300 mx-auto mb-8' />
					<blockquote className='text-2xl md:text-3xl font-serif italic text-slate-800 leading-relaxed mb-8'>
						{validLocale === 'ru'
							? '«Школа - вершина воспитания, где труд является благородным делом»'
							: '«Мектеп - тәрбие биігі, онда еңбек ету ұлағатты іс»'}
					</blockquote>
					<cite className='text-slate-500 font-medium not-italic'>
						— {person.name}
					</cite>
				</div>
			</section>

			{/* Key Facts - More Professional Look */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{person.keyFacts.map((fact, index) => (
						<div
							key={index}
							className='bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group'
						>
							<div className='text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors'>
								{fact.value}
							</div>
							<div className='h-1 w-12 bg-slate-200 my-4 rounded-full group-hover:bg-blue-200 transition-colors' />
							<div className='text-slate-600 font-medium uppercase tracking-wider text-sm'>
								{fact.label}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Featured Books */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
				<div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-4'>
					<div>
						<h2 className='text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4'>
							{books.title}
						</h2>
						<p className='text-slate-600 max-w-xl text-lg'>
							{books.description}
						</p>
					</div>
					<Link
						href={`/${validLocale}/books`}
						className='text-slate-900 hover:text-blue-700 font-medium flex items-center group transition-colors'
					>
						{site.common.readMore}{' '}
						<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
					{books.items.slice(0, 3).map(book => (
						<BookCard
							key={book.id}
							book={book}
							locale={validLocale}
							dict={site.common}
						/>
					))}
				</div>
			</section>

			{/* Memories Teaser - Emotional Connection */}
			<section className='bg-slate-900 text-white py-24 relative overflow-hidden'>
				<div className='absolute inset-0 bg-slate-800/50 mix-blend-overlay' />
				<div className='max-w-4xl mx-auto px-4 relative z-10 text-center'>
					<h2 className='text-3xl font-serif font-bold mb-12'>
						{memories.title}
					</h2>
					<div className='bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10'>
						<p className='text-xl md:text-2xl font-serif italic leading-relaxed mb-8 text-slate-200'>
							&ldquo;{featuredMemory.text}&rdquo;
						</p>
						<div className='flex items-center justify-center gap-4'>
							<div className='text-center'>
								<div className='font-bold text-white'>
									{featuredMemory.author}
								</div>
								<div className='text-slate-400 text-sm'>
									{featuredMemory.role}
								</div>
							</div>
						</div>
					</div>
					<div className='mt-10'>
						<Link
							href={`/${validLocale}/memories`}
							className='inline-flex items-center text-slate-300 hover:text-white transition-colors border-b border-slate-700 hover:border-white pb-1'
						>
							{site.common.readMore} <ChevronRight className='ml-1 w-4 h-4' />
						</Link>
					</div>
				</div>
			</section>

			{/* Gallery Preview - Masonry Style */}
			<section className='py-24 bg-slate-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4'>
							{gallery.title}
						</h2>
						<p className='text-slate-600 max-w-2xl mx-auto text-lg'>
							{gallery.description}
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]'>
						{/* Large Main Image */}
						<div className='md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group shadow-md'>
							<Image
								src={gallery.images[0].src}
								alt={gallery.images[0].alt}
								fill
								className='object-cover transition-transform duration-700 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6'>
								<span className='text-white font-medium'>
									{gallery.images[0].alt}
								</span>
							</div>
						</div>

						{/* Secondary Images */}
						{gallery.images.slice(1, 4).map((image, index) => (
							<div
								key={index}
								className='relative rounded-xl overflow-hidden group shadow-md'
							>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
								/>
								<div className='absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300' />
							</div>
						))}

						{/* View All Link Block */}
						<Link
							href={`/${validLocale}/gallery`}
							className='relative rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center group shadow-md cursor-pointer'
						>
							<div className='text-center'>
								<span className='block text-white font-serif text-xl mb-2'>
									{site.common.readMore}
								</span>
								<div className='w-8 h-8 rounded-full border border-white/30 flex items-center justify-center mx-auto group-hover:bg-white group-hover:text-slate-900 transition-all'>
									<ArrowRight className='w-4 h-4' />
								</div>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
