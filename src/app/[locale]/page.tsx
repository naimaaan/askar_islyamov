import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { personContent } from '@/content/person'
import { booksContent } from '@/content/books'
import { galleryContent } from '@/content/gallery'
import { siteContent } from '@/content/site'
import BookCard from '@/components/BookCard'
import Image from 'next/image' // Убедитесь, что этот импорт есть вверху файла

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

	return (
		<div className='space-y-20 pb-20'>
			{/* Hero Section */}
			<section className='relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden'>
				<div className='absolute inset-0 bg-slate-800/50 z-0' />
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12'>
					<div className='flex-1 space-y-6 text-center md:text-left'>
						<h1 className='text-4xl md:text-6xl font-serif font-bold leading-tight'>
							{person.name}
						</h1>
						<p className='text-xl md:text-2xl text-slate-200 font-light'>
							{person.role}
						</p>
						<p className='text-lg text-slate-300 max-w-2xl mx-auto md:mx-0 leading-relaxed'>
							{person.intro}
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4'>
							<Link
								href={`/${validLocale}/biography`}
								className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors'
							>
								{site.common.readMore}
								<ArrowRight className='ml-2 h-5 w-5' />
							</Link>
							<Link
								href={`/${validLocale}/books`}
								className='inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors'
							>
								{site.header.nav.find(n => n.href === '/books')?.label}
							</Link>
						</div>
					</div>
					<div className='w-64 h-64 md:w-80 md:h-80 rounded-full bg-slate-700 border-4 border-white/20 flex-shrink-0 overflow-hidden relative'>
						{/* УДАЛИТЕ ИЛИ ЗАКОММЕНТИРУЙТЕ ЭТОТ БЛОК (Заглушка АИ): */}
						{/* <div className='absolute inset-0 flex items-center justify-center text-slate-500 bg-slate-200'>
							<span className='text-4xl font-serif'>АИ</span>
						</div> */}

						{/* РАСКОММЕНТИРУЙТЕ И ОТРЕДАКТИРУЙТЕ ЭТОТ БЛОК: */}
						<Image
							src='/images/image2.png'
							alt={person.name}
							fill
							className='object-cover'
							style={{
								// 1. Сдвиг: 70% по горизонтали (вправо), 0% по вертикали (верх)
								objectPosition: '50% 10%',
								// 2. Приближение: масштаб 1.2 (увеличить на 20%)
								transform: 'scale(1)',
							}}
							priority
						/>
					</div>
				</div>
			</section>

			{/* Key Facts */}
			<section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{person.keyFacts.map((fact, index) => (
						<div
							key={index}
							className='bg-white p-8 rounded-lg border border-slate-200 text-center shadow-sm'
						>
							<div className='text-4xl font-bold text-slate-900 mb-2'>
								{fact.value}
							</div>
							<div className='text-slate-600 font-medium'>{fact.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* Featured Books */}
			<section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-end mb-10'>
					<h2 className='text-3xl font-serif font-bold text-slate-900'>
						{books.title}
					</h2>
					<Link
						href={`/${validLocale}/books`}
						className='text-slate-600 hover:text-slate-900 font-medium flex items-center'
					>
						{site.common.readMore} <ArrowRight className='ml-1 h-4 w-4' />
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

			{/* Gallery Preview */}
			<section className='bg-slate-100 py-20'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-end mb-10'>
						<h2 className='text-3xl font-serif font-bold text-slate-900'>
							{gallery.title}
						</h2>
						<Link
							href={`/${validLocale}/gallery`}
							className='text-slate-600 hover:text-slate-900 font-medium flex items-center'
						>
							{site.common.readMore} <ArrowRight className='ml-1 h-4 w-4' />
						</Link>
					</div>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{gallery.images.slice(0, 4).map((image, index) => (
							<div
								key={index}
								className='aspect-square bg-slate-300 rounded-lg overflow-hidden relative'
							>
								{/* Замените блок с текстом на Image */}
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className='object-cover'
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
