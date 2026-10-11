'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

export default function HomeMotion({ children, locale }: { children: ReactNode; locale: Locale }) {
	const rootRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const root = rootRef.current
		if (!root || !('IntersectionObserver' in window)) return

		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
		const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-home-reveal]'))
		const showAll = () => targets.forEach(element => { element.dataset.homeReveal = 'shown' })
		if (motionPreference.matches) { showAll(); return }

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return
				;(entry.target as HTMLElement).dataset.homeReveal = 'shown'
				observer.unobserve(entry.target)
			})
		}, { threshold: 0.08 })

		targets.forEach(element => {
			// Server-rendered content stays visible until motion can be safely enabled.
			if (element.getBoundingClientRect().top < window.innerHeight) {
				element.dataset.homeReveal = 'shown'
			} else {
				element.dataset.homeReveal = 'pending'
				observer.observe(element)
			}
		})

		const onPreferenceChange = () => {
			if (motionPreference.matches) { observer.disconnect(); showAll() }
		}
		motionPreference.addEventListener('change', onPreferenceChange)
		return () => {
			observer.disconnect()
			motionPreference.removeEventListener('change', onPreferenceChange)
			showAll()
		}
	}, [locale])

	return <div ref={rootRef} className='home-motion flex min-h-screen flex-col'>{children}</div>
}
