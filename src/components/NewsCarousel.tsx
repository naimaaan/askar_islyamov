'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsLabels, type NewsPhoto } from '@/content/news'
import Lightbox from './Lightbox'
import FramedPhoto from './FramedPhoto'

export default function NewsCarousel({ photos, locale }: { photos: NewsPhoto[]; locale: Locale }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const interaction = useRef({ hovered: false, focused: false, dragging: false, until: 0 })
  const drag = useRef<{ pointerId: number; x: number; scroll: number; moved: boolean } | null>(null)
  const labels = newsLabels[locale]
  const current = expanded === null ? undefined : photos[expanded]

  useEffect(() => {
    const track = trackRef.current
    if (!track || photos.length < 2 || expanded !== null) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let direction = 1
    let position = track.scrollLeft
    let lastTime = 0
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= 0.2 }, { threshold: 0.2 })
    observer.observe(track)

    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 40) : 0
      lastTime = time
      const paused = interaction.current
      const maximum = track.scrollWidth - track.clientWidth
      if (visible && !document.hidden && !reducedMotion.matches && !paused.hovered && !paused.focused && !paused.dragging && time > paused.until && maximum > 0) {
        position = Math.max(0, Math.min(maximum, position + direction * elapsed * 0.022))
        track.scrollLeft = position
        if (position >= maximum) direction = -1
        if (position <= 0) direction = 1
      } else {
        position = track.scrollLeft
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [photos.length, expanded])

  const pauseAfterInteraction = () => { interaction.current.until = performance.now() + 5000 }
  const scrollByCard = (direction: number) => {
    const track = trackRef.current
    if (!track) return
    pauseAfterInteraction()
    const step = (track.firstElementChild as HTMLElement | null)?.offsetWidth || 320
    track.scrollBy({ left: direction * (step + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  if (photos.length === 0) return null

  return <section className='mt-10 border-t-2 border-slate-900 pt-5' aria-labelledby='news-carousel-title' aria-roledescription={labels.carousel}>
    <h2 id='news-carousel-title' className='text-2xl font-serif font-bold text-slate-900'>{labels.carouselTitle}</h2>
    <p className='mb-7 mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base'>{labels.carouselDescription}</p>
    <div className='relative'>
      <ul ref={trackRef} tabIndex={0} aria-label={labels.carouselTitle} className='flex cursor-grab gap-6 overflow-x-auto overscroll-x-contain pb-5 pt-2 select-none outline-offset-4 [scrollbar-width:none] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-blue-700 [&::-webkit-scrollbar]:hidden'
        onMouseEnter={() => { interaction.current.hovered = true }}
        onMouseLeave={() => {
          interaction.current.hovered = false
          if (!drag.current?.moved) { interaction.current.dragging = false; drag.current = null }
        }}
        onFocusCapture={() => { interaction.current.focused = true }}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) interaction.current.focused = false }}
        onWheel={pauseAfterInteraction}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); scrollByCard(-1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); scrollByCard(1) }
        }}
        onPointerDown={event => {
          if (event.button !== 0) return
          interaction.current.dragging = true
          drag.current = event.pointerType === 'mouse' ? { pointerId: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false } : null
        }}
        onPointerMove={event => {
          const gesture = drag.current
          if (!gesture || gesture.pointerId !== event.pointerId || !interaction.current.dragging) return
          const distance = event.clientX - gesture.x
          if (!gesture.moved && Math.abs(distance) > 8) {
            gesture.moved = true
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          if (gesture.moved) {
            event.preventDefault()
            event.currentTarget.scrollLeft = gesture.scroll - distance
          }
        }}
        onPointerUp={event => {
          interaction.current.dragging = false
          pauseAfterInteraction()
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={() => { interaction.current.dragging = false; drag.current = null; pauseAfterInteraction() }}
        onClickCapture={event => {
          if (drag.current?.moved) { event.preventDefault(); event.stopPropagation(); drag.current = null }
        }}>
        {photos.map((photo, photoIndex) => <li key={photo.src} style={{ '--photo-ratio': photo.frame?.aspectRatio || 1.25 } as CSSProperties} className='w-[calc(var(--photo-ratio)*280px)] max-w-[82vw] shrink-0 sm:w-[calc(var(--photo-ratio)*320px)]'>
          <button type='button' onClick={() => setExpanded(photoIndex)} aria-label={`${labels.original}: ${photo.caption[locale]}`} className='group block w-full cursor-inherit text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'>
            <span style={{ aspectRatio: photo.frame?.aspectRatio || 1.25 }} className='relative block overflow-hidden bg-stone-100 transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transform-none'>
              {photo.frame ? <FramedPhoto src={photo.src} alt={photo.caption[locale]} frame={photo.frame} sizes='(max-width: 640px) 82vw, 460px' /> : <Image src={photo.src} alt={photo.caption[locale]} fill sizes='(max-width: 640px) 82vw, 460px' draggable={false} className='object-cover' />}
              <span className='absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm transition-colors group-hover:bg-slate-900 group-hover:text-white'><ArrowUpRight size={17} aria-hidden='true' /></span>
            </span>
            <span className='mt-4 block border-t border-slate-200 pt-3 font-serif text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700'>{photo.caption[locale]}</span>
          </button>
        </li>)}
      </ul>
      <div aria-hidden='true' className='pointer-events-none absolute top-0 right-0 bottom-5 w-6 bg-gradient-to-l from-white to-transparent sm:w-10' />
    </div>
    {current && createPortal(<Lightbox locale={locale} isOpen onClose={() => setExpanded(null)} imageSrc={current.src} imageAlt={`${current.caption[locale]}${current.note ? ` ${current.note[locale]}` : ''}`} imageFrame={current.frame} hasNext={photos.length > 1} hasPrev={photos.length > 1} onNext={() => setExpanded(index => index === null ? null : (index + 1) % photos.length)} onPrev={() => setExpanded(index => index === null ? null : (index - 1 + photos.length) % photos.length)} />, document.body)}
  </section>
}
