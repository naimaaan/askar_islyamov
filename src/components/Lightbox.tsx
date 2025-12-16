'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

interface LightboxProps {
	isOpen: boolean
	onClose: () => void
	imageSrc: string
	imageAlt: string
	onNext?: () => void
	onPrev?: () => void
	hasNext?: boolean
	hasPrev?: boolean
}

export default function Lightbox({
	isOpen,
	onClose,
	imageSrc,
	imageAlt,
	onNext,
	onPrev,
	hasNext,
	hasPrev,
}: LightboxProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowRight' && onNext) onNext()
			if (e.key === 'ArrowLeft' && onPrev) onPrev()
		}

		if (isOpen) {
			document.body.style.overflow = 'hidden'
			window.addEventListener('keydown', handleKeyDown)
		}

		return () => {
			document.body.style.overflow = 'unset'
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, onClose, onNext, onPrev])

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4'>
			<button
				onClick={onClose}
				className='absolute top-4 right-4 text-white/70 hover:text-white transition-colors'
			>
				<X size={32} />
			</button>

			{hasPrev && (
				<button
					onClick={onPrev}
					className='absolute left-4 text-white/70 hover:text-white transition-colors p-2'
				>
					<ChevronLeft size={48} />
				</button>
			)}

			<div className='relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center'>
				{/* In a real app, use Next.js Image */}
				<img
					src={imageSrc}
					alt={imageAlt}
					className='max-w-full max-h-full object-contain'
				/>
			</div>

			{hasNext && (
				<button
					onClick={onNext}
					className='absolute right-4 text-white/70 hover:text-white transition-colors p-2'
				>
					<ChevronRight size={48} />
				</button>
			)}
		</div>
	)
}
