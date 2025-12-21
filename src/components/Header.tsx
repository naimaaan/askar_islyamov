import Link from 'next/link'
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
	return (
		<>
			{/* Soulful accent line representing the timeline/lifeline */}
			<div className='h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200' />

			<header className='border-b border-slate-200/60 bg-white/90 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 supports-[backdrop-filter]:bg-white/80'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between'>
					{/* Logo / Title */}
					<div className='flex-shrink-0'>
						<Link href={`/${locale}`} className='group flex flex-col'>
							<span className='text-2xl font-serif font-bold text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors'>
								{dict.title}
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						{dict.nav.map(item => (
							<Link
								key={item.href}
								href={`/${locale}${item.href === '/' ? '' : item.href}`}
								className='relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2 group'
							>
								{item.label}
								<span className='absolute inset-x-0 bottom-0 h-0.5 bg-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out' />
							</Link>
						))}
					</nav>

					{/* Actions */}
					<div className='flex items-center space-x-6'>
						<div className='hidden sm:block w-px h-6 bg-slate-200' />
						<LanguageSwitcher currentLocale={locale} />
						<MobileMenu nav={dict.nav} locale={locale} />
					</div>
				</div>
			</header>
		</>
	)
}
