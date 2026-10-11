'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { awardsContent } from '@/content/awards'
import Lightbox from './Lightbox'

export default function AwardPhoto({ src, caption, locale, portrait = false, wide = false, documentImage = false }: { src: string; caption: string; locale: Locale; portrait?: boolean; wide?: boolean; documentImage?: boolean }) {
	const [open, setOpen] = useState(false)
	return <>
		<button type='button' onClick={() => setOpen(true)} aria-label={`${awardsContent[locale].zoomLabel}: ${caption}`} className={`media-frame group w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${portrait ? 'aspect-[4/5]' : wide ? 'aspect-[2/1]' : 'aspect-[3/2]'}`}>
			<Image src={src} alt={caption} fill sizes={portrait ? '(max-width: 768px) 100vw, 400px' : '(max-width: 768px) 100vw, 600px'} preload={portrait} unoptimized={documentImage} className='object-contain' />
			<span className='image-zoom-control'><Expand size={16} aria-hidden='true' /></span>
		</button>
		{open && <Lightbox locale={locale} isOpen onClose={() => setOpen(false)} imageSrc={src} imageAlt={caption} documentImage={documentImage} />}
	</>
}
