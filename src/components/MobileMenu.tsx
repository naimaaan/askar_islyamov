'use client'

import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { uiText } from '@/lib/ui-text'
import { useModal } from '@/lib/use-modal'

interface MobileMenuProps { nav: { label: string; href: string }[]; locale: Locale }

export default function MobileMenu({ nav, locale }: MobileMenuProps) {
  const pathname = usePathname().replace(/\/$/, '')
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeMenu = () => setIsOpen(false)
  const labels = uiText[locale]
  useModal(menuRef, isOpen, closeMenu)
  return (
    <div className='xl:hidden'>
      <button type='button' onClick={() => setIsOpen(true)} className='p-2 -mr-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-full transition-colors' aria-label={labels.openMenu} aria-expanded={isOpen} aria-controls='mobile-menu'>
        <Menu size={24} strokeWidth={2} />
      </button>
      {isOpen && createPortal(
        <div className='fixed inset-0 z-[100] bg-slate-900/20 backdrop-blur-sm' onClick={event => { if (event.target === event.currentTarget) closeMenu() }}>
          <div id='mobile-menu' ref={menuRef} role='dialog' aria-modal='true' aria-label={labels.menu} tabIndex={-1} className='fixed inset-y-0 right-0 w-full max-w-[320px] bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col sm:rounded-l-2xl border-l border-white/20'>
            <div className='flex items-center justify-between p-6 pb-4 border-b border-slate-100/50'>
              <span className='text-xl font-serif font-bold text-slate-900 tracking-tight'>{labels.menu}</span>
              <button type='button' onClick={closeMenu} className='p-2 -mr-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200' aria-label={labels.closeMenu}><X size={24} /></button>
            </div>
            <nav className='flex-1 overflow-y-auto py-6 px-4 space-y-1'>
              {nav.map(item => {
                const href = '/' + locale + (item.href === '/' ? '' : item.href)
                const target = href.replace(/\/$/, '')
                const active = pathname === target || (item.href !== '/' && pathname.startsWith(`${target}/`))
                return <Link key={item.href} href={href} aria-current={active ? 'page' : undefined} className={`group flex items-center justify-between px-4 py-3.5 text-lg font-medium hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`} onClick={closeMenu}>
                <span>{item.label}</span><ChevronRight size={18} className='text-slate-300 group-hover:text-slate-900' />
              </Link>})}
            </nav>
            <div className='p-6 border-t border-slate-100/50 bg-slate-50/50'><div className='text-xs text-slate-400 text-center font-medium tracking-wider uppercase'>&copy; {new Date().getFullYear()} Askar Islyamov</div></div>
          </div>
        </div>, document.body,
      )}
    </div>
  )
}
