'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'
import type { Locale } from '@/lib/i18n'

interface ContestGalleryProps {
	locale: Locale
	images: readonly { src: string; alt: string; aspectRatio?: number }[]
	videoSrc?: string
}

export default function ContestGallery({
	locale,
	images,
	videoSrc,
}: ContestGalleryProps) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	const openLightbox = (index: number) => setLightboxIndex(index)
	const closeLightbox = () => setLightboxIndex(null)
	const nextImage = () =>
		setLightboxIndex(prev =>
			prev !== null ? (prev + 1) % images.length : null
		)
	const prevImage = () =>
		setLightboxIndex(prev =>
			prev !== null ? (prev - 1 + images.length) % images.length : null
		)

	return (
		<div className='space-y-8'>
			{/* Video Section */}
			{videoSrc && (
				<div className='relative mx-auto max-w-2xl overflow-hidden rounded-lg bg-slate-950 aspect-[4/3]'>
					<video
						src={videoSrc}
						controls
						playsInline
						preload='none'
						aria-label={locale === 'kz' ? 'Байқау бейнерепортажы' : locale === 'ru' ? 'Видеорепортаж о конкурсе' : 'Contest video report'}
						className='w-full h-full object-contain'
						poster='/images/event-2026/event-01.jpg'
					/>
				</div>
			)}

			{/* Photo Grid */}
			<div className='columns-1 gap-6 sm:columns-2'>
				{images.map((img, idx) => (
					<figure key={img.src} className='mb-6 break-inside-avoid'>
					<button
						type='button'
						aria-label={img.alt}
						onClick={() => openLightbox(idx)}
						style={{ aspectRatio: img.aspectRatio || 16 / 9 }}
						className='group relative block w-full overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'
					>
						<Image
							src={img.src}
							alt={img.alt}
							fill
							sizes='(max-width: 640px) 100vw, 400px'
							className='object-contain'
						/>
						<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
							<Maximize2 className='text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 w-8 h-8 drop-shadow-lg' />
						</div>
					</button>
					<figcaption className='mt-3 text-sm leading-relaxed text-slate-500'>{img.alt}</figcaption>
					</figure>
				))}
			</div>

			{/* Lightbox */}
			{lightboxIndex !== null && (
				<Lightbox
					locale={locale}
					isOpen={true}
					onClose={closeLightbox}
					imageSrc={images[lightboxIndex].src}
					imageAlt={images[lightboxIndex].alt}
					onNext={nextImage}
					onPrev={prevImage}
					hasNext={images.length > 1}
					hasPrev={images.length > 1}
				/>
			)}
		</div>
	)
}
