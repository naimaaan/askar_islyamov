'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { awardsContent } from '@/content/awards'
import Lightbox from './Lightbox'

export default function AwardPhoto({ src, caption, locale, portrait = false }: { src: string; caption: string; locale: Locale; portrait?: boolean }) {
	const [open, setOpen] = useState(false)
	return <>
		<button type='button' onClick={() => setOpen(true)} aria-label={`${awardsContent[locale].zoomLabel}: ${caption}`} className={`group relative block w-full overflow-hidden bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${portrait ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
			<Image src={src} alt={caption} fill sizes={portrait ? '(max-width: 768px) 100vw, 400px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'} preload={portrait} className='object-contain' />
			<span className='absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-slate-600 transition-colors group-hover:text-blue-700'><Expand size={17} aria-hidden='true' /></span>
		</button>
		{open && <Lightbox locale={locale} isOpen onClose={() => setOpen(false)} imageSrc={src} imageAlt={caption} />}
	</>
}
