'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { NewsPhoto } from '@/content/news'
import Lightbox from './Lightbox'

export default function NewsPhotoView({ photo, locale, showCaption = true, preload = false }: { photo: NewsPhoto; locale: Locale; showCaption?: boolean; preload?: boolean }) {
  const [open, setOpen] = useState(false)
  return <figure>
    <button type='button' aria-label={photo.caption[locale]} onClick={() => setOpen(true)} style={{ aspectRatio: photo.aspectRatio || 16 / 9 }} className='group relative block w-full overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700'>
      <Image src={photo.src} alt={photo.caption[locale]} fill preload={preload} sizes='(max-width: 1024px) 100vw, 960px' className={photo.document ? 'object-contain' : 'object-cover'} style={{ objectPosition: photo.position || 'center' }} />
      <span className='absolute bottom-3 right-3 rounded-full bg-slate-950/70 p-2 text-white'><Maximize2 size={16} aria-hidden='true' /></span>
    </button>
    {showCaption && <figcaption className='mt-3 text-sm leading-relaxed text-slate-500'>{photo.caption[locale]}</figcaption>}
    {open && createPortal(<Lightbox locale={locale} isOpen onClose={() => setOpen(false)} imageSrc={photo.src} imageAlt={photo.caption[locale]} showCaption={showCaption} />, document.body)}
  </figure>
}
