import { notFound } from 'next/navigation'
import Image from 'next/image' // 1. Добавьте этот импорт
import { booksContent } from '@/content/books'
import { siteContent } from '@/content/site'
import { FileText, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams({
	params: { locale },
}: {
	params: { locale: string }
}) {
	// This is a bit tricky because generateStaticParams runs before middleware,
	// but we can just return params for all books in all locales if we want static export.
	// For dynamic rendering, we don't strictly need this unless we use output: export.
	// But let's implement it for completeness.
	// We need to know the locale to get the books, but generateStaticParams receives params from parent?
	// Actually, for [locale], we can just iterate over all books.
	// But here we are inside [locale], so we get the locale param.

	// Wait, generateStaticParams in [slug] receives params from parent segments?
	// Yes.

	// However, we can't easily access the parent params in generateStaticParams in the same way as props.
	// But Next.js passes params to generateStaticParams.

	// Let's just skip generateStaticParams for now as we are not doing static export explicitly.
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

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<Link
				href={`/${locale}/books`}
				className='inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors'
			>
				<ArrowLeft className='mr-2 h-4 w-4' />
				{site.common.back}
			</Link>

			<div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row'>
				<div className='md:w-1/3 bg-slate-100 aspect-[3/4] relative flex items-center justify-center text-slate-400 border-b md:border-b-0 md:border-r border-slate-200'>
					{/* 2. Замените блок с иконкой на этот код */}
					<Image
						src={book.cover}
						alt={book.title}
						fill
						className='object-cover'
					/>
				</div>

				<div className='p-8 md:p-12 flex-1 flex flex-col'>
					<div className='text-slate-500 font-medium mb-2'>{book.year}</div>
					<h1 className='text-3xl font-serif font-bold text-slate-900 mb-6'>
						{book.title}
					</h1>
					<p className='text-lg text-slate-600 leading-relaxed mb-8 flex-grow'>
						{book.description}
					</p>

					<div className='flex flex-col sm:flex-row gap-4 mt-auto'>
						<a
							href={book.pdf}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex justify-center items-center px-6 py-3 border border-slate-300 rounded-md text-base font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors'
						>
							<FileText className='mr-2 h-5 w-5' />
							{site.common.openPdf}
						</a>
						<a
							href={book.pdf}
							download
							className='inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-slate-800 hover:bg-slate-900 transition-colors'
						>
							<Download className='mr-2 h-5 w-5' />
							{site.common.download}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
