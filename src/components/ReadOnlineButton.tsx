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
			className={isReaderOpen ? 'button-secondary' : 'button-primary'}
		>
			{isReaderOpen ? (
				<>
					<X className='size-4' />
					{activeLabel || 'Закрыть'}
				</>
			) : (
				<>
					<BookOpen className='size-4' />
					{label}
				</>
			)}
		</button>
	)
}
