'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsLabels, type NewsPhoto, type NewsVideo } from '@/content/news'
import Lightbox from './Lightbox'

export default function NewsMedia({ locale, photos, video, showPhotoCaptions = true }: { locale: Locale; photos: NewsPhoto[]; video?: NewsVideo; showPhotoCaptions?: boolean }) {
  const [index, setIndex] = useState<number | null>(null)
  const labels = newsLabels[locale]
  return <div className='space-y-12'>
    {video && <section aria-labelledby='news-video-title'>
      <h2 id='news-video-title' className='mb-5 text-2xl font-serif font-bold'>{labels.video}</h2>
      <figure>
        <div className={`overflow-hidden rounded-lg bg-slate-950 ${video.portrait ? 'mx-auto max-w-sm' : ''}`}>
          <video controls playsInline preload='none' poster={video.poster} aria-label={video.caption[locale]} className={`mx-auto block w-full object-contain ${video.portrait ? 'max-h-[70vh] aspect-[9/16]' : 'aspect-video'}`}>
            <source src={video.src} type='video/mp4' />
            <a href={video.src}>{labels.video}</a>
          </video>
        </div>
        <figcaption className='mt-3 text-sm leading-relaxed text-slate-500'>{video.caption[locale]} <span className='whitespace-nowrap'>· {video.duration}</span></figcaption>
      </figure>
    </section>}
    {photos.length > 0 && <section aria-labelledby='news-photos-title'>
      <h2 id='news-photos-title' className='mb-5 text-2xl font-serif font-bold'>{labels.photos}</h2>
      <div className={`gap-6 ${photos.length > 1 ? 'columns-1 sm:columns-2' : ''}`}>
        {photos.map((photo, photoIndex) => <figure key={photo.src} className='mb-6 break-inside-avoid'>
          <button type='button' onClick={() => setIndex(photoIndex)} aria-label={photo.caption[locale]} style={{ aspectRatio: photo.aspectRatio || (photo.document ? 4 / 3 : 16 / 9) }} className='group relative block w-full overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700'>
            <Image src={photo.src} alt={photo.caption[locale]} fill sizes='(max-width: 640px) 100vw, 50vw' className={photo.document ? 'object-contain p-3' : 'object-contain'} />
            <span className='absolute bottom-3 right-3 rounded-full bg-slate-950/70 p-2 text-white'><Maximize2 size={16} aria-hidden='true' /></span>
          </button>
          {showPhotoCaptions && <figcaption className='mt-3 text-sm leading-relaxed text-slate-500'>{photo.caption[locale]}</figcaption>}
        </figure>)}
      </div>
    </section>}
    {index !== null && createPortal(<Lightbox locale={locale} isOpen onClose={() => setIndex(null)} imageSrc={photos[index].src} imageAlt={photos[index].caption[locale]} showCaption={showPhotoCaptions} hasNext={photos.length > 1} hasPrev={photos.length > 1} onNext={() => setIndex((index + 1) % photos.length)} onPrev={() => setIndex((index - 1 + photos.length) % photos.length)} />, document.body)}
  </div>
}
