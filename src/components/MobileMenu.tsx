'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface MobileMenuProps {
	nav: { label: string; href: string }[]
	locale: Locale
}

export default function MobileMenu({ nav, locale }: MobileMenuProps) {
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

	useEffect(() => {
		if (isOpen) {
			setIsRendered(true)
		} else {
			const timer = setTimeout(() => setIsRendered(false), 300)
			return () => clearTimeout(timer)
		}
	}, [isOpen])

	// Prevent background scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
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
			// Focus first link when opened
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
				className='p-2 text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md transition-colors'
				aria-label='Toggle menu'
				aria-expanded={isOpen}
			>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{mounted &&
				isRendered &&
				createPortal(
					<div
						className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
							isOpen ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<div
							ref={menuRef}
							className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
								isOpen ? 'translate-x-0' : 'translate-x-full'
							}`}
						>
							<div className='flex items-center justify-end p-4 border-b border-slate-100'>
								<button
									onClick={closeMenu}
									className='p-2 text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-md transition-colors'
									aria-label='Close menu'
								>
									<X size={28} />
								</button>
							</div>
							<nav className='flex-1 overflow-y-auto py-6 px-4 space-y-2'>
								{nav.map((item, index) => (
									<Link
										key={item.href}
										href={`/${locale}${item.href === '/' ? '' : item.href}`}
										className='block px-4 py-3 text-lg font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors'
										onClick={closeMenu}
										ref={index === 0 ? firstLinkRef : null}
									>
										{item.label}
									</Link>
								))}
							</nav>
						</div>
					</div>,
					document.body
				)}
		</div>
	)
}
