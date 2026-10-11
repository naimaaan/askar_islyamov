import Link from 'next/link'
import { ArrowRight, BookOpen, Quote } from 'lucide-react'
import { personContent } from '@/content/person'
import { galleryContent } from '@/content/gallery'
import { siteContent } from '@/content/site'
import { memoriesContent } from '@/content/memories'
import { homeContent } from '@/content/home'
import FeaturedBooks from '@/components/FeaturedBooks'
import HomeGalleryPreview from '@/components/HomeGalleryPreview'
import LatestNews from '@/components/LatestNews'
import HomeSectionHeading from '@/components/HomeSectionHeading'
import HomeMotion from '@/components/HomeMotion'
import Image from 'next/image'
import { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { uiText } from '@/lib/ui-text'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const validLocale = locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'kz'
  return pageMetadata(validLocale, '', siteContent[validLocale].metadata)
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	// Добавлена проверка для 'en'
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const person = personContent[validLocale]
	const gallery = galleryContent[validLocale]
	const site = siteContent[validLocale]
	const memories = memoriesContent[validLocale]
	const home = homeContent[validLocale]

	// Select a featured memory (e.g., the first one)
	const featuredMemory = memories.items[0]
	const previewSources = [
		'/images/archive-originals/geography-lesson.jpg',
		'/images/archive-originals/family-ensemble.jpg',
		'/images/archive-originals/teaching-dynasty-meeting.jpg',
	]
	const previewPhotos = previewSources.flatMap(src => {
		const photo = gallery.images.find(image => image.src === src)
		return photo ? [{ ...photo, caption: home.galleryCaptions[src] ?? photo.alt, category: gallery.albums.find(album => album.id === photo.albumId)?.title ?? '' }] : []
	})

	return (
		<HomeMotion locale={validLocale}>
			{/* Hero Section with Gradient and Texture */}
			<section className='relative bg-slate-900 text-white overflow-hidden'>
				{/* Background Gradient Effect */}
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0' />

				{/* Decorative elements */}
				<div className='absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl' />

				{/* Reduced padding from py-24 md:py-32 to py-12 md:py-20 */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 pb-12 md:pt-12 md:pb-20'>
					{/* Reduced gap from gap-12 md:gap-20 to gap-8 md:gap-12 */}
					<div className='flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12'>
						<div className='home-hero-copy flex-1 space-y-6 text-center md:text-left'>
							{/* Desktop Date & Name */}
							<div className='hidden md:block'>
								<div className='inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-slate-300 mb-2'>
									1928 — 2001
								</div>
								{/* Reduced text size from 5xl/7xl to 4xl/6xl */}
								<h1 className='text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tight'>
									{person.name}
								</h1>
							</div>
							{/* Reduced text size from xl/2xl to lg/xl */}
							<p className='text-lg leading-relaxed text-slate-300 md:text-xl'>
								{person.role}
							</p>
							<p className='text-base md:text-lg text-slate-400 max-w-2xl mx-auto md:mx-0 leading-relaxed border-l-2 border-slate-700 pl-6'>
								{person.intro}
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4'>
								<Link
									href={`/${validLocale}/biography`}
									className='button-secondary border-white'
								>
									{home.biographyLink}
									<ArrowRight className='ml-2 h-5 w-5' />
								</Link>
								<Link
									href={`/${validLocale}/books`}
									className='button-secondary border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white'
								>
									<BookOpen className='mr-2 h-5 w-5' />
									{site.header.nav.find(n => n.href === '/books')?.label}
								</Link>
							</div>
						</div>

						{/* Enhanced Image Container with Awards */}
						<div className='home-hero-portrait flex flex-col items-center gap-8 relative z-10'>
							<div className='relative group'>
								<div className='absolute inset-0 bg-gradient-to-tr from-slate-200/20 to-blue-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
								{/* Profile Image - Optimized Size */}
								<div className='w-48 h-48 md:w-72 md:h-72 rounded-full border-8 border-slate-800/50 shadow-2xl overflow-hidden relative z-10 ring-1 ring-white/10'>
									<Image
										src='/images/image2.png'
										alt={person.name}
										fill
										className='object-cover transition-transform duration-700 motion-safe:group-hover:scale-105'
										style={{
											objectPosition: '50% 10%',
										}}
										priority
									/>
								</div>
							</div>

							{/* Mobile Date & Name */}
							<div className='block md:hidden text-center space-y-4 -mt-2'>
								<div className='inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-slate-300'>
									1928 — 2001
								</div>
								<h1 className='text-3xl font-serif font-bold leading-tight tracking-tight px-2'>
									{person.name}
								</h1>
							</div>

							{/* Awards List - Professional & Visual Appeal */}
							<div className='w-full max-w-md space-y-3 text-center animate-fade-in-up'>
								{person.awards.map((award: string, index: number) => (
									<div
										key={index}
										className='flex items-center justify-center gap-3 group'
									>
										<div className='h-px w-0 group-hover:w-8 bg-gradient-to-r from-transparent to-slate-500/50 transition-all duration-500' />
										<span className='text-sm md:text-base font-serif text-slate-200/90 tracking-wide leading-relaxed drop-shadow-sm group-hover:text-white transition-colors duration-300'>
											{award}
										</span>
										<div className='h-px w-0 group-hover:w-8 bg-gradient-to-l from-transparent to-slate-500/50 transition-all duration-500' />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Quote and key facts share one compact editorial section. */}
			<section className='border-b border-slate-200 bg-white'>
				<div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8'>
					<div data-home-reveal className='mx-auto max-w-3xl text-center'>
						<Quote className='mx-auto mb-4 size-7 text-slate-400' aria-hidden='true' />
						<blockquote className='mb-4 font-serif text-2xl italic leading-relaxed text-slate-800 sm:text-3xl'>
							{validLocale === 'ru'
								? '«Школа - вершина воспитания, где труд является благородным делом»'
								: validLocale === 'kz'
								? '«Мектеп - тәрбие биігі, онда еңбек ету ұлағатты іс»'
								: '“School is the pinnacle of upbringing, where labor is a noble deed”'}
						</blockquote>
						<cite className='text-slate-500 font-medium not-italic'>
							— {person.name}
						</cite>
					</div>
					<dl className='mt-9 grid divide-y divide-slate-200 border-t border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:pt-8'>
						{person.keyFacts.map((fact, index) => (
							<div key={fact.label} data-home-reveal data-home-delay={index} className='grid grid-cols-[5.5rem_1fr] items-center gap-x-5 gap-y-1 py-5 sm:flex sm:flex-col sm:gap-0 sm:px-5 sm:py-0 sm:text-center'>
								<dt className='order-2 text-sm font-semibold text-slate-800 sm:mt-3'>{fact.label}</dt>
								<dd className='order-1 row-span-2 font-serif text-5xl font-medium tabular-nums tracking-tight text-slate-900'>{fact.value}</dd>
								<dd className='order-3 col-start-2 text-sm leading-relaxed text-slate-500 sm:mt-1'>{fact.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<LatestNews locale={validLocale} />

			<FeaturedBooks locale={validLocale} />

			{/* Memories Teaser - Emotional Connection */}
			<section aria-labelledby='home-memories-title' className='bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden'>
				<div className='absolute inset-0 bg-slate-800/50 mix-blend-overlay' />
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<HomeSectionHeading id='home-memories-title' title={memories.title} href={`/${validLocale}/memories/`} linkLabel={home.memoriesLink} dark />
					<div data-home-reveal className='mx-auto max-w-4xl bg-white/5 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-lg border border-white/10 text-center'>
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
				</div>
			</section>

			{/* Curated photographs from the teaching, family and public archives. */}
			<section aria-labelledby='home-gallery-title' className='border-t border-slate-200 bg-white py-14 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<HomeSectionHeading id='home-gallery-title' title={gallery.title} href={`/${validLocale}/gallery/`} linkLabel={uiText[validLocale].viewAll} />
					<HomeGalleryPreview locale={validLocale} photos={previewPhotos} />
				</div>
			</section>
		</HomeMotion>
	)
}
