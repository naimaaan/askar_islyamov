'use client'

import { useState, useEffect } from 'react'
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
	allLabel: string
}

export default function GalleryGrid({
	images,
	albums,
	allLabel,
}: GalleryGridProps) {
	const [selectedAlbum, setSelectedAlbum] = useState<string>('all')
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
	const [isAnimating, setIsAnimating] = useState(false)
	const [filteredImages, setFilteredImages] = useState(images)

	// Handle filtering with animation
	useEffect(() => {
		setIsAnimating(true)
		const timeout = setTimeout(() => {
			const newImages =
				selectedAlbum === 'all'
					? images
					: images.filter(img => img.albumId === selectedAlbum)
			setFilteredImages(newImages)
			setIsAnimating(false)
		}, 300) // Wait for fade out

		return () => clearTimeout(timeout)
	}, [selectedAlbum, images])

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
			<div className='flex flex-wrap gap-3 mb-12 justify-center'>
				<button
					onClick={() => setSelectedAlbum('all')}
					className={clsx(
						'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border',
						selectedAlbum === 'all'
							? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
							: 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
					)}
				>
					{allLabel}
				</button>
				{albums.map(album => (
					<button
						key={album.id}
						onClick={() => setSelectedAlbum(album.id)}
						className={clsx(
							'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border',
							selectedAlbum === album.id
								? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
								: 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
						)}
					>
						{album.title}
					</button>
				))}
			</div>

			{/* Masonry Grid */}
			<div
				className={clsx(
					'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 transition-opacity duration-300 ease-in-out',
					isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
				)}
			>
				{filteredImages.map((image, index) => (
					<div
						key={`${image.src}-${index}`}
						onClick={() => openLightbox(index)}
						className='break-inside-avoid group relative cursor-zoom-in rounded-xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1'
					>
						<div className='relative w-full'>
							{/* We use width/height auto for masonry effect, but Next/Image needs dimensions or fill. 
                                Since we don't know dimensions, 'fill' with a parent aspect ratio is tricky in masonry.
                                For masonry with Next.js Image without known dimensions, we usually need "width: 100%, height: auto".
                                To do this properly with Next/Image "fill", we need the wrapper to have a ratio.
                                BUT, since we want natural height, we can use a regular img tag OR Next/Image with width/height if known.
                                Assuming we don't know exact dimensions, we'll use a trick: 
                                Render as standard img for layout, but that loses optimization.
                                Better: Use Next/Image with 'width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}'
                            */}
							<Image
								src={image.src}
								alt={image.alt}
								width={800}
								height={600}
								className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105'
								sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
							/>
						</div>

						{/* Overlay */}
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6'>
							<p className='text-white text-sm font-medium leading-snug transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
								{image.alt}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Empty State */}
			{!isAnimating && filteredImages.length === 0 && (
				<div className='text-center py-20 text-slate-400'>
					<p>No images found in this category.</p>
				</div>
			)}

			<Lightbox
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
