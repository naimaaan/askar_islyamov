'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsLabels, type NewsInset } from '@/content/news'
import FramedPhoto from './FramedPhoto'
import Lightbox from './Lightbox'

export default function NewsArticleInset({ inset, locale }: { inset: NewsInset; locale: Locale }) {
  const [expanded, setExpanded] = useState(false)
  const { photo } = inset
  return <aside className='my-8 grid items-center gap-6 border-y border-amber-800/20 py-6 sm:grid-cols-[minmax(0,1fr)_240px]' aria-labelledby='news-inset-title'>
    <div>
      <h2 id='news-inset-title' className='mb-3 font-serif text-xl font-bold leading-snug text-amber-900'>{inset.title[locale]}</h2>
      <p className='text-sm leading-relaxed text-slate-600'>{inset.text[locale]}</p>
    </div>
    <button type='button' onClick={() => setExpanded(true)} aria-label={`${newsLabels[locale].original}: ${photo.caption[locale]}`} style={{ aspectRatio: photo.frame?.aspectRatio || 4 / 3 }} className='group relative mx-auto block w-full max-w-[280px] overflow-hidden shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700'>
      {photo.frame ? <FramedPhoto src={photo.src} alt={photo.caption[locale]} frame={photo.frame} sizes='280px' /> : <Image src={photo.src} alt={photo.caption[locale]} fill sizes='280px' className='object-contain' />}
      <span className='absolute right-2 bottom-2 rounded-full bg-black/65 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'><Maximize2 size={14} aria-hidden='true' /></span>
    </button>
    {expanded && createPortal(<Lightbox locale={locale} isOpen onClose={() => setExpanded(false)} imageSrc={photo.src} imageAlt={photo.caption[locale]} imageFrame={photo.frame} showCaption={false} />, document.body)}
  </aside>
}
