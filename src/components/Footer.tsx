import Link from 'next/link'
import { Locale } from '@/lib/i18n'

interface FooterProps {
	locale: Locale
	dict: {
		rights: string
		developedBy: string
		description: string
		menuTitle: string
		contactsTitle: string
	}
	nav: { label: string; href: string }[]
}

export default function Footer({ locale, dict, nav }: FooterProps) {
	return (
		<footer className='bg-slate-900 text-slate-300 border-t border-slate-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20'>
					{/* Column 1: Brand & Legacy */}
					<div className='space-y-6'>
						<h3 className='text-2xl font-serif font-bold text-white tracking-wide'>
							Asqar Islyamov
						</h3>
						<p className='text-slate-400 leading-relaxed max-w-xs text-sm'>
							{dict.description}
						</p>
					</div>

					{/* Column 2: Navigation */}
					<div>
						<h4 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-6'>
							{dict.menuTitle}
						</h4>
						<ul className='space-y-3 text-sm'>
							{nav.map(item => (
								<li key={item.href}>
									<Link
										href={`/${locale}${item.href === '/' ? '' : item.href}`}
										className='hover:text-white transition-colors duration-200 flex items-center group'
									>
										<span className='w-1.5 h-1.5 rounded-full bg-slate-700 mr-3 group-hover:bg-white transition-colors' />
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Contact / Info */}
					<div>
						<h4 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-6'>
							{dict.contactsTitle}
						</h4>
						<div className='space-y-4 text-sm'>
							<p className='text-slate-400 hover:text-white transition-colors'>
								<a href='mailto:contact@askarislyamov.kz'>
									contact@askarislyamov.kz
								</a>
							</p>
							<p className='text-slate-500 pt-4 border-t border-slate-800/50'>
								{dict.developedBy}
							</p>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600'>
					<p>
						&copy; {new Date().getFullYear()} {dict.rights}
					</p>
					<p className='mt-2 md:mt-0 opacity-60 hover:opacity-100 transition-opacity font-serif italic'>
						Ислямовтар әулеті
					</p>
				</div>
			</div>
		</footer>
	)
}
