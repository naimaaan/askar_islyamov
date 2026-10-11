'use client'

import { useEffect, useEffectEvent, type RefObject } from 'react'

export function useModal(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
	const close = useEffectEvent(onClose)
	useEffect(() => {
		if (!open || !ref.current) return
		const dialog = ref.current
		const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
		const overflow = document.body.style.overflow
		const padding = document.body.style.paddingRight
		document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
		document.body.style.overflow = 'hidden'
		const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]'))
		focusable()[0]?.focus()
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') { event.preventDefault(); close() }
			if (event.key !== 'Tab') return
			const items = focusable()
			const first = items[0]
			const last = items.at(-1)
			if (!first) { event.preventDefault(); dialog.focus(); return }
			if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
				event.preventDefault(); last?.focus()
			} else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
				event.preventDefault(); first.focus()
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = overflow
			document.body.style.paddingRight = padding
			previousFocus?.focus()
		}
	}, [open, ref])
}
