'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import type { Locale } from '@/lib/i18n'

type PreviewPhoto = { src: string; alt: string; category: string }

export default function HomeGalleryPreview({ photos, locale }: { photos: PreviewPhoto[]; locale: Locale }) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const selected = selectedIndex === null ? null : photos[selectedIndex]

	return (
		<>
			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]'>
				{photos.map((photo, index) => (
					<button key={photo.src} type='button' onClick={() => setSelectedIndex(index)} aria-label={photo.alt} className={`group relative isolate overflow-hidden rounded-lg bg-slate-200 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${index === 0 ? 'aspect-[16/10] sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:aspect-auto' : 'aspect-[16/10] lg:aspect-video'}`}>
						<Image src={photo.src} alt='' fill sizes={index === 0 ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'} className='object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]' />
						<span className='absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent' />
						<span className='absolute right-3 top-3 rounded-full bg-slate-950/40 p-2 text-white backdrop-blur-sm transition-colors group-hover:bg-slate-950/70'><Expand size={16} aria-hidden='true' /></span>
						<span className={`absolute inset-x-0 bottom-0 block p-4 ${index === 0 ? 'sm:p-6' : ''}`}>
							<span className='mb-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-slate-200'>{photo.category}</span>
							<span className={`block font-serif leading-snug text-white ${index === 0 ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>{photo.alt}</span>
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
