'use client'

import { BookOpen, X } from 'lucide-react'
import { useBookReader } from './BookReaderContext'

interface ReadOnlineButtonProps {
	label: string
	activeLabel?: string
}

export default function ReadOnlineButton({
	label,
	activeLabel,
}: ReadOnlineButtonProps) {
	const { toggleReader, isReaderOpen } = useBookReader()

	return (
		<button
			onClick={toggleReader}
			className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group ${
				isReaderOpen
					? 'bg-slate-100 text-slate-900 ring-2 ring-slate-200'
					: 'bg-slate-900 text-white hover:bg-slate-800'
			}`}
		>
			{isReaderOpen ? (
				<>
					<X className='mr-3 h-5 w-5 group-hover:scale-110 transition-transform' />
					{activeLabel || 'Закрыть'}
				</>
			) : (
				<>
					<BookOpen className='mr-3 h-5 w-5 group-hover:scale-110 transition-transform' />
					{label}
				</>
			)}
		</button>
	)
}
