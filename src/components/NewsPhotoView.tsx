'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { NewsPhoto } from '@/content/news'
import Lightbox from './Lightbox'

export default function NewsPhotoView({ photo, locale, showCaption = true, preload = false }: { photo: NewsPhoto; locale: Locale; showCaption?: boolean; preload?: boolean }) {
  const [open, setOpen] = useState(false)
  return <figure>
    <button type='button' aria-label={photo.caption[locale]} onClick={() => setOpen(true)} style={{ aspectRatio: photo.aspectRatio || 16 / 9 }} className='media-frame group w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'>
      <Image src={photo.src} alt={photo.caption[locale]} fill preload={preload} sizes='(max-width: 1024px) 100vw, 960px' className={photo.document ? 'object-contain' : 'object-cover'} style={{ objectPosition: photo.position || 'center' }} />
      <span className='image-zoom-control'><Expand size={16} aria-hidden='true' /></span>
    </button>
    {showCaption && <figcaption className='text-caption mt-3'>{photo.caption[locale]}</figcaption>}
    {open && createPortal(<Lightbox locale={locale} isOpen onClose={() => setOpen(false)} imageSrc={photo.src} imageAlt={photo.caption[locale]} showCaption={showCaption} />, document.body)}
  </figure>
}
