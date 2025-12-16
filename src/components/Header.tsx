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
		<header className='border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				<div className='flex-shrink-0'>
					<Link
						href={`/${locale}`}
						className='text-xl font-serif font-bold text-slate-900'
					>
						{dict.title}
					</Link>
				</div>

				<nav className='hidden md:flex space-x-6'>
					{dict.nav.map(item => (
						<Link
							key={item.href}
							href={`/${locale}${item.href === '/' ? '' : item.href}`}
							className='text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors'
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className='flex items-center space-x-4'>
					<LanguageSwitcher currentLocale={locale} />
					<MobileMenu nav={dict.nav} locale={locale} />
				</div>
			</div>
		</header>
	)
}
