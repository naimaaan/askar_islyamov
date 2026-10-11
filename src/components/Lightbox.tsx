'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { useModal } from '@/lib/use-modal'
import { uiText } from '@/lib/ui-text'
import type { Locale } from '@/lib/i18n'

interface LightboxProps {
	locale?: Locale
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
	locale = 'ru',
	isOpen,
	onClose,
	imageSrc,
	imageAlt,
	onNext,
	onPrev,
	hasNext,
	hasPrev,
}: LightboxProps) {
	const [loadedSrc, setLoadedSrc] = useState('')
	const isLoaded = loadedSrc === imageSrc
	const dialogRef = useRef<HTMLDivElement>(null)
	const labels = uiText[locale]
	useModal(dialogRef, isOpen, onClose)

	if (!isOpen) return null

	return (
		<div ref={dialogRef} role='dialog' aria-modal='true' aria-label={imageAlt || labels.photo} tabIndex={-1} className='fixed inset-0 z-[100] flex items-center justify-center' onKeyDown={event => {
			if (event.key === 'ArrowRight' && hasNext) { event.preventDefault(); onNext?.() }
			if (event.key === 'ArrowLeft' && hasPrev) { event.preventDefault(); onPrev?.() }
		}}>
			{/* Backdrop with blur */}
			<div
				className='absolute inset-0 bg-slate-900/95 backdrop-blur-md transition-opacity duration-300'
				onClick={onClose}
			/>

			{/* Close button */}
			<button
				aria-label={labels.close}
				onClick={onClose}
				className='absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-20 p-2 hover:bg-white/10 rounded-full'
			>
				<X size={32} strokeWidth={1.5} />
			</button>

			{/* Navigation - Left */}
			{hasPrev && (
				<button
					aria-label={labels.previous}
					onClick={e => {
						e.stopPropagation()
						onPrev?.()
					}}
					className='absolute left-4 md:left-8 text-white/60 hover:text-white transition-all z-20 p-3 hover:bg-white/10 rounded-full hover:scale-110'
				>
					<ChevronLeft size={40} strokeWidth={1.5} />
				</button>
			)}

			{/* Image Container */}
			<div className='relative w-full h-full max-w-7xl max-h-[85vh] p-4 md:p-8 flex flex-col items-center justify-center z-10 pointer-events-none'>
				<div
					className={clsx(
						'relative w-full h-full transition-opacity duration-500 ease-out pointer-events-auto',
						isLoaded ? 'opacity-100' : 'opacity-0'
					)}
				>
					<Image
						key={imageSrc}
						src={imageSrc}
						alt={imageAlt}
						fill
						className='object-contain drop-shadow-2xl'
						sizes='100vw'
						priority
						onLoad={() => setLoadedSrc(imageSrc)}
					/>
				</div>

				{/* Caption */}
				<div
					className={clsx(
						'absolute bottom-8 left-0 right-0 text-center transition-all duration-500 delay-100',
						isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
					)}
				>
					<div className='inline-block bg-black/50 backdrop-blur-md px-8 py-4 rounded-2xl max-w-[90vw] border border-white/10'>
						<p className='text-white/90 text-lg font-light tracking-wide'>
							{imageAlt}
						</p>
						<a href={imageSrc} target='_blank' rel='noopener noreferrer' className='pointer-events-auto inline-block mt-2 text-sm text-white/80 underline underline-offset-4 hover:text-white'>
							{labels.openOriginal}
						</a>
					</div>
				</div>
			</div>

			{/* Navigation - Right */}
			{hasNext && (
				<button
					aria-label={labels.next}
					onClick={e => {
						e.stopPropagation()
						onNext?.()
					}}
					className='absolute right-4 md:right-8 text-white/60 hover:text-white transition-all z-20 p-3 hover:bg-white/10 rounded-full hover:scale-110'
				>
					<ChevronRight size={40} strokeWidth={1.5} />
				</button>
			)}
		</div>
	)
}
