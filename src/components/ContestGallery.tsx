'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'
import type { Locale } from '@/lib/i18n'

interface ContestGalleryProps {
	locale: Locale
	images: readonly { src: string; alt: string }[]
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
				<div className='relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 aspect-video group'>
					<video
						src={videoSrc}
						controls
						preload='metadata'
						className='w-full h-full object-cover'
						poster={images[0]?.src} // Use first image as poster if needed
					/>
				</div>
			)}

			{/* Photo Grid */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{images.map((img, idx) => (
					<button
						type='button'
						aria-label={img.alt}
						key={idx}
						onClick={() => openLightbox(idx)}
						className='relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300'
					>
						<Image
							src={img.src}
							alt={img.alt}
							fill
							sizes='(max-width: 768px) 50vw, 25vw'
							className='object-cover group-hover:scale-110 transition-transform duration-500'
						/>
						<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
							<Maximize2 className='text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 w-8 h-8 drop-shadow-lg' />
						</div>
					</button>
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
