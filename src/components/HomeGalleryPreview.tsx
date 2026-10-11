'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import type { Locale } from '@/lib/i18n'

type PreviewPhoto = { src: string; alt: string; caption: string; category: string }

export default function HomeGalleryPreview({ photos, locale }: { photos: PreviewPhoto[]; locale: Locale }) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const selected = selectedIndex === null ? null : photos[selectedIndex]

	return (
		<>
			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]'>
				{photos.map((photo, index) => (
					<button key={photo.src} data-home-reveal data-home-delay={index} type='button' onClick={() => setSelectedIndex(index)} aria-label={photo.alt} className={`home-card group flex min-w-0 flex-col overflow-hidden rounded-lg bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${index === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}>
						<span className={`media-frame w-full ${index === 0 ? 'aspect-[16/10] sm:aspect-video lg:aspect-auto lg:flex-1' : 'aspect-[16/10] lg:aspect-video'}`}>
						<Image src={photo.src} alt='' fill sizes={index === 0 ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'} className='object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]' />
						<span className='image-zoom-control'><Expand size={16} aria-hidden='true' /></span>
						</span>
						<span className='block w-full pb-2 pt-4'>
							<span className='eyebrow mb-2 block'>{photo.category}</span>
							<span className='card-title block transition-colors group-hover:text-blue-700'>{photo.caption}</span>
						</span>
					</button>
				))}
			</div>
			{selected && selectedIndex !== null && (
				<Lightbox locale={locale} isOpen onClose={() => setSelectedIndex(null)} imageSrc={selected.src} imageAlt={selected.alt} hasPrev={selectedIndex > 0} hasNext={selectedIndex < photos.length - 1} onPrev={() => setSelectedIndex(selectedIndex - 1)} onNext={() => setSelectedIndex(selectedIndex + 1)} />
			)}
		</>
	)
}
