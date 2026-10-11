'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'
import MobileMenu from './MobileMenu'

interface HeaderProps {
	locale: Locale
	dict: {
		title: string
		nav: { label: string; href: string }[]
	}
}

export default function Header({ locale, dict }: HeaderProps) {
	const pathname = usePathname().replace(/\/$/, '')
	return (
		<>
			{/* Soulful accent line representing the timeline/lifeline */}
			<div className='h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200' />

			<header className='border-b border-slate-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 supports-[backdrop-filter]:bg-white/80 w-full left-0'>
				<div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between'>
					{/* Logo / Title */}
					<div className='flex-shrink-0'>
						<Link href={`/${locale}`} className='group flex flex-col'>
							<span className='text-lg sm:text-2xl font-serif font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors'>
								{dict.title}
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden xl:flex items-center gap-5 whitespace-nowrap'>
						{dict.nav.map(item => {
							const href = `/${locale}${item.href === '/' ? '' : item.href}`
							const target = href.replace(/\/$/, '')
							const active = pathname === target || (item.href !== '/' && pathname.startsWith(`${target}/`))
							return (
							<Link
								key={item.href}
								href={href}
								aria-current={active ? 'page' : undefined}
								className={`relative text-sm font-medium hover:text-slate-900 transition-colors py-2 group ${active ? 'text-slate-900' : 'text-slate-600'}`}
							>
								{item.label}
								<span className={`absolute inset-x-0 bottom-0 h-0.5 transform group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out ${active ? 'bg-slate-900 scale-x-100' : 'bg-slate-900 scale-x-0'}`} />
							</Link>
						)})}
					</nav>

					{/* Actions */}
					<div className='flex shrink-0 items-center space-x-2 sm:space-x-4'>
						<div className='hidden sm:block w-px h-6 bg-slate-200' />
						<LanguageSwitcher currentLocale={locale} />
						<MobileMenu nav={dict.nav} locale={locale} />
					</div>
				</div>
			</header>
		</>
	)
}
