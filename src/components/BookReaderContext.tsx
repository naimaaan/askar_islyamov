'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookReaderContextType {
	isReaderOpen: boolean
	toggleReader: () => void
	closeReader: () => void
}

const BookReaderContext = createContext<BookReaderContextType | undefined>(
	undefined
)

export function BookReaderProvider({ children }: { children: ReactNode }) {
	const [isReaderOpen, setIsReaderOpen] = useState(false)

	const toggleReader = () => setIsReaderOpen(prev => !prev)
	const closeReader = () => setIsReaderOpen(false)

	return (
		<BookReaderContext.Provider
			value={{ isReaderOpen, toggleReader, closeReader }}
		>
			{children}
		</BookReaderContext.Provider>
	)
}

export function useBookReader() {
	const context = useContext(BookReaderContext)
	if (context === undefined) {
		throw new Error('useBookReader must be used within a BookReaderProvider')
	}
	return context
}
