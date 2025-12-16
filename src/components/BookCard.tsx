import Link from 'next/link'
import Image from 'next/image'
import { FileText, Download } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface Book {
	id: string
	title: string
	year: string
	description: string
	cover: string
	pdf: string
}

interface BookCardProps {
	book: Book
	locale: Locale
	dict: {
		openPdf: string
		download: string
	}
}

export default function BookCard({ book, locale, dict }: BookCardProps) {
	return (
		<div className='bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full'>
			<div className='aspect-[3/4] bg-slate-100 relative'>
				<Image
					src={book.cover}
					alt={book.title}
					fill
					className='object-cover'
				/>
			</div>
			<div className='p-6 flex flex-col flex-grow'>
				<div className='text-sm text-slate-500 mb-2'>{book.year}</div>
				<h3 className='text-xl font-serif font-semibold text-slate-900 mb-3 line-clamp-2'>
					<Link
						href={`/${locale}/books/${book.id}`}
						className='hover:underline'
					>
						{book.title}
					</Link>
				</h3>
				<p className='text-slate-600 text-sm mb-6 line-clamp-3 flex-grow'>
					{book.description}
				</p>

				<div className='flex gap-3 mt-auto'>
					<a
						href={book.pdf}
						target='_blank'
						rel='noopener noreferrer'
						className='flex-1 inline-flex justify-center items-center px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50'
					>
						<FileText size={16} className='mr-2' />
						{dict.openPdf}
					</a>
					<a
						href={book.pdf}
						download
						className='inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-slate-800 hover:bg-slate-900'
					>
						<Download size={16} />
					</a>
				</div>
			</div>
		</div>
	)
}
