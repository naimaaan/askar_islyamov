'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface MobileMenuProps {
	nav: { label: string; href: string }[]
	locale: Locale
}

export default function MobileMenu({ nav, locale }: MobileMenuProps) {
	// Client-side state for menu open/close
	const [isOpen, setIsOpen] = useState(false)
	const [isRendered, setIsRendered] = useState(false)
	const [mounted, setMounted] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const firstLinkRef = useRef<HTMLAnchorElement>(null)

	const toggleMenu = () => setIsOpen(!isOpen)
	const closeMenu = () => setIsOpen(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Handle animation mounting/unmounting
	useEffect(() => {
		if (isOpen) {
			setIsRendered(true)
		} else {
			// Wait for animation to finish before unmounting
			const timer = setTimeout(() => setIsRendered(false), 500)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	// Prevent background scroll when menu is open & handle layout shift
	useEffect(() => {
		if (isOpen) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth
			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = `${scrollbarWidth}px`
		} else {
			// Delay restoring to match animation
			const timer = setTimeout(() => {
				document.body.style.overflow = ''
				document.body.style.paddingRight = ''
			}, 500)
			return () => clearTimeout(timer)
		}
		return () => {
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		}
	}, [isOpen])

	// Handle ESC key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeMenu()
			}
		}

		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown)
			// Focus first link when opened for accessibility
			setTimeout(() => {
				firstLinkRef.current?.focus()
			}, 100)
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				closeMenu()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	return (
		<div className='md:hidden'>
			<button
				onClick={toggleMenu}
				className='p-2 -mr-2 text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-full transition-colors'
				aria-label='Toggle menu'
				aria-expanded={isOpen}
			>
				<Menu size={24} strokeWidth={2} />
			</button>

			{mounted &&
				isRendered &&
				createPortal(
					<div
						className={`fixed inset-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
							isOpen
								? 'bg-slate-900/20 backdrop-blur-sm opacity-100'
								: 'bg-transparent backdrop-blur-none opacity-0'
						}`}
						aria-hidden='true'
					>
						<div
							id='mobile-menu'
							ref={menuRef}
							role='dialog'
							aria-modal='true'
							className={`fixed inset-y-0 right-0 w-full max-w-[320px] bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col sm:rounded-l-2xl border-l border-white/20 ${
								isOpen ? 'translate-x-0' : 'translate-x-full'
							}`}
						>
							{/* Header */}
							<div className='flex items-center justify-between p-6 pb-4 border-b border-slate-100/50'>
								<span className='text-xl font-serif font-bold text-slate-900 tracking-tight'>
									Menu
								</span>
								<button
									onClick={closeMenu}
									className='p-2 -mr-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200'
									aria-label='Close menu'
								>
									<X size={24} />
								</button>
							</div>

							{/* Navigation */}
							<nav className='flex-1 overflow-y-auto py-6 px-4 space-y-1'>
								{nav.map((item, index) => (
									<Link
										key={item.href}
										href={`/${locale}${item.href === '/' ? '' : item.href}`}
										className='group flex items-center justify-between px-4 py-3.5 text-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200'
										onClick={closeMenu}
										ref={index === 0 ? firstLinkRef : null}
									>
										<span>{item.label}</span>
										<ChevronRight
											size={18}
											className='text-slate-300 group-hover:text-slate-900 transition-colors transform group-hover:translate-x-1 duration-200'
										/>
									</Link>
								))}
							</nav>

							{/* Footer decoration */}
							<div className='p-6 border-t border-slate-100/50 bg-slate-50/50'>
								<div className='text-xs text-slate-400 text-center font-medium tracking-wider uppercase'>
									&copy; {new Date().getFullYear()} Askar
								</div>
							</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	)
}
