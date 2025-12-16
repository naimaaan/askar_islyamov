'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import { clsx } from 'clsx'

interface GalleryImage {
	src: string
	albumId: string
	alt: string
}

interface GalleryGridProps {
	images: GalleryImage[]
	albums: { id: string; title: string }[]
}

export default function GalleryGrid({ images, albums }: GalleryGridProps) {
	const [selectedAlbum, setSelectedAlbum] = useState<string>('all')
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

	const filteredImages =
		selectedAlbum === 'all'
			? images
			: images.filter(img => img.albumId === selectedAlbum)

	const openLightbox = (index: number) => setLightboxIndex(index)
	const closeLightbox = () => setLightboxIndex(null)
	const nextImage = () =>
		setLightboxIndex(prev =>
			prev !== null && prev < filteredImages.length - 1 ? prev + 1 : prev
		)
	const prevImage = () =>
		setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev))

	return (
		<div>
			<div className='flex flex-wrap gap-2 mb-8 justify-center'>
				<button
					onClick={() => setSelectedAlbum('all')}
					className={clsx(
						'px-4 py-2 rounded-full text-sm font-medium transition-colors',
						selectedAlbum === 'all'
							? 'bg-slate-800 text-white'
							: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
					)}
				>
					All
				</button>
				{albums.map(album => (
					<button
						key={album.id}
						onClick={() => setSelectedAlbum(album.id)}
						className={clsx(
							'px-4 py-2 rounded-full text-sm font-medium transition-colors',
							selectedAlbum === album.id
								? 'bg-slate-800 text-white'
								: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
						)}
					>
						{album.title}
					</button>
				))}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{filteredImages.map((image, index) => (
					<div
						key={index}
						onClick={() => openLightbox(index)}
						className='aspect-square bg-slate-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group'
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors' />
					</div>
				))}
			</div>

			<Lightbox
				isOpen={lightboxIndex !== null}
				onClose={closeLightbox}
				imageSrc={
					lightboxIndex !== null ? filteredImages[lightboxIndex].src : ''
				}
				imageAlt={
					lightboxIndex !== null ? filteredImages[lightboxIndex].alt : ''
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
