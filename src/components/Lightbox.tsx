'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { useModal } from '@/lib/use-modal'
import { uiText } from '@/lib/ui-text'
import type { Locale } from '@/lib/i18n'
import type { PhotoFrame } from '@/lib/photo-frame'
import FramedPhoto from './FramedPhoto'

interface LightboxProps {
	locale?: Locale
	isOpen: boolean
	onClose: () => void
	imageSrc: string
	imageAlt: string
	showCaption?: boolean
	documentImage?: boolean
	imageFrame?: PhotoFrame
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
	showCaption = true,
	documentImage = false,
	imageFrame,
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
					className='absolute left-1 sm:left-4 md:left-8 text-white/60 hover:text-white transition-all z-20 p-2 hover:bg-white/10 rounded-full'
				>
					<ChevronLeft className='size-6 sm:size-10' strokeWidth={1.5} />
				</button>
			)}

			{/* Image Container */}
			<div className={clsx('relative flex h-[calc(100dvh-112px)] w-full max-w-7xl flex-col items-center gap-3 z-10 pointer-events-none', documentImage ? 'px-3 sm:px-6' : 'px-12 sm:px-20 md:px-24')}>
				<div
					className={clsx(
						'relative min-h-0 w-full flex-1 transition-opacity duration-500 ease-out pointer-events-auto',
						isLoaded ? 'opacity-100' : 'opacity-0'
					)}
				>
					{imageFrame ? <FramedPhoto key={imageSrc} src={imageSrc} alt={imageAlt} frame={imageFrame} sizes='100vw' preload onLoad={() => setLoadedSrc(imageSrc)} /> : <Image
						key={imageSrc}
						src={imageSrc}
						unoptimized={documentImage}
						alt={imageAlt}
						fill
						className='object-contain drop-shadow-2xl'
						sizes='100vw'
						preload
						onLoad={() => setLoadedSrc(imageSrc)}
					/>}
				</div>

				{/* Caption */}
				<div
					className={clsx(
						'max-h-[25dvh] w-full shrink-0 overflow-y-auto text-center transition-opacity duration-500 pointer-events-auto',
						isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
					)}
				>
					<div className='inline-block max-w-3xl px-2 py-1'>
						{showCaption && <p className='text-white/90 text-sm leading-relaxed sm:text-base'>
							{imageAlt}
						</p>}
						<a href={imageSrc} target='_blank' rel='noopener noreferrer' className={clsx('pointer-events-auto inline-block text-sm text-white/80 underline underline-offset-4 hover:text-white', showCaption && 'mt-2')}>
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
					className='absolute right-1 sm:right-4 md:right-8 text-white/60 hover:text-white transition-all z-20 p-2 hover:bg-white/10 rounded-full'
				>
					<ChevronRight className='size-6 sm:size-10' strokeWidth={1.5} />
				</button>
			)}
		</div>
	)
}
