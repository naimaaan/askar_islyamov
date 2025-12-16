'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Locale, locales } from '@/lib/i18n'
import Link from 'next/link'
import { clsx } from 'clsx'

export default function LanguageSwitcher({
	currentLocale,
}: {
	currentLocale: Locale
}) {
	const pathname = usePathname()

	const redirectedPathName = (locale: string) => {
		if (!pathname) return '/'
		const segments = pathname.split('/')
		segments[1] = locale
		return segments.join('/')
	}

	return (
		<div className='flex items-center space-x-2 text-sm font-medium'>
			{locales.map(locale => (
				<Link
					key={locale}
					href={redirectedPathName(locale)}
					className={clsx(
						'px-2 py-1 rounded transition-colors',
						currentLocale === locale
							? 'bg-slate-800 text-white'
							: 'text-slate-600 hover:bg-slate-100'
					)}
				>
					{locale.toUpperCase()}
				</Link>
			))}
		</div>
	)
}
