'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import { uiText } from '@/lib/ui-text'
import type { Locale } from '@/lib/i18n'

interface GalleryImage {
	src: string
	albumId: string
	alt: string
}

interface GalleryGridProps {
	locale: Locale
	images: GalleryImage[]
	albums: { id: string; title: string }[]
	allLabel: string
}

export default function GalleryGrid({
	locale,
	images,
	albums,
	allLabel,
}: GalleryGridProps) {
	const [selectedAlbum, setSelectedAlbum] = useState<string>('all')
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
	const filteredImages = useMemo(
		() => selectedAlbum === 'all' ? images : images.filter(image => image.albumId === selectedAlbum),
		[selectedAlbum, images]
	)
	const labels = uiText[locale]

	const openLightbox = (index: number) => setLightboxIndex(index)
	const closeLightbox = () => setLightboxIndex(null)

	// Find the global index in the full filtered list for navigation
	const nextImage = () =>
		setLightboxIndex(prev =>
			prev !== null && prev < filteredImages.length - 1 ? prev + 1 : prev
		)
	const prevImage = () =>
		setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev))

	return (
		<div>
			{/* Filter Buttons */}
			<div className='mb-8 flex flex-wrap gap-2'>
				<button
					onClick={() => { setLightboxIndex(null); setSelectedAlbum('all') }}
					aria-pressed={selectedAlbum === 'all'}
					className='filter-chip'
				>
					{allLabel}
				</button>
				{albums.map(album => (
					<button
						key={album.id}
						aria-pressed={selectedAlbum === album.id}
						onClick={() => { setLightboxIndex(null); setSelectedAlbum(album.id) }}
						className='filter-chip'
					>
						{album.title}
					</button>
				))}
			</div>

			{/* Masonry Grid */}
			<div
				className='columns-1 gap-6 space-y-8 sm:columns-2 lg:columns-3'
			>
				{filteredImages.map((image, index) => (
					<button
						type='button'
						aria-label={image.alt || `${labels.photo} ${index + 1}`}
						key={`${image.src}-${index}`}
						onClick={() => openLightbox(index)}
						className='group block w-full break-inside-avoid cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'
					>
						<div className='media-frame w-full'>
							<Image
								src={image.src}
								alt={image.alt}
								width={800}
								height={600}
								className='h-auto w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]'
								sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
							/>
							<span className='image-zoom-control'><Expand size={16} aria-hidden='true' /></span>
						</div>
						{image.alt && <p className='text-caption mt-3 transition-colors group-hover:text-blue-700'>{image.alt}</p>}
					</button>
				))}
			</div>

			{/* Empty State */}
			{filteredImages.length === 0 && (
				<div className='text-center py-20 text-slate-400'>
					<p>{labels.emptyGallery}</p>
				</div>
			)}

			<Lightbox
				locale={locale}
				isOpen={lightboxIndex !== null}
				onClose={closeLightbox}
				imageSrc={
					lightboxIndex !== null ? filteredImages[lightboxIndex]?.src : ''
				}
				imageAlt={
					lightboxIndex !== null ? filteredImages[lightboxIndex]?.alt : ''
				}
				onNext={nextImage}
				onPrev={prevImage}
				hasNext={
					lightboxIndex !== null && lightboxIndex < filteredImages.length - 1
				}
				hasPrev={lightboxIndex !== null && lightboxIndex > 0}
			/>
		</div>
	)
}
