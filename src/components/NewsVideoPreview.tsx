'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { homeContent } from '@/content/home'

type Props = { src: string; title: string; locale: Locale; children: ReactNode }

export default function NewsVideoPreview({ src, title, locale, children }: Props) {
	const videoRef = useRef<HTMLVideoElement>(null)
	const manuallyPaused = useRef(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [hasFrame, setHasFrame] = useState(false)
	const labels = homeContent[locale]

	useEffect(() => {
		const video = videoRef.current
		if (!video || !('IntersectionObserver' in window)) return

		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
		const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
		let visible = false
		const syncPlayback = () => {
			if (visible && !document.hidden && !motionPreference.matches && !connection?.saveData && !manuallyPaused.current) {
				void video.play().catch(() => { /* Keep the poster and manual play control if autoplay is unavailable. */ })
			} else {
				video.pause()
			}
		}

		const observer = new IntersectionObserver(entries => {
			visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.35
			syncPlayback()
		}, { threshold: [0, 0.35] })
		observer.observe(video)
		document.addEventListener('visibilitychange', syncPlayback)
		motionPreference.addEventListener('change', syncPlayback)
		return () => {
			observer.disconnect()
			document.removeEventListener('visibilitychange', syncPlayback)
			motionPreference.removeEventListener('change', syncPlayback)
			video.pause()
		}
	}, [src])

	const togglePlayback = () => {
		const video = videoRef.current
		if (!video) return
		if (video.paused) {
			manuallyPaused.current = false
			if (video.error) video.load()
			void video.play().catch(() => { /* The still image remains available. */ })
		} else {
			manuallyPaused.current = true
			video.pause()
		}
	}

	return (
		<div className='relative' data-video-preview data-preview-state={isPlaying ? 'playing' : hasFrame ? 'paused' : 'poster'}>
			<button type='button' onClick={togglePlayback} aria-label={`${isPlaying ? labels.pausePreview : labels.playPreview}: ${title}`} className='relative block w-full overflow-hidden rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'>
				{children}
				<video
					ref={videoRef}
					src={src}
					muted
					loop
					playsInline
					preload='none'
					aria-hidden='true'
					onPlaying={() => { setIsPlaying(true); setHasFrame(true) }}
					onPause={() => setIsPlaying(false)}
					onError={() => { setIsPlaying(false); setHasFrame(false) }}
					className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${hasFrame ? 'opacity-100' : 'opacity-0'}`}
				/>
			</button>
		</div>
	)
}
