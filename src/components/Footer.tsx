import { Locale } from '@/lib/i18n'

interface FooterProps {
	locale: Locale
	dict: {
		rights: string
		developedBy: string
	}
}

export default function Footer({ dict }: FooterProps) {
	return (
		<footer className='bg-slate-50 border-t border-slate-200 py-12 mt-auto'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm'>
				<p className='mb-2'>
					&copy; {new Date().getFullYear()} {dict.rights}
				</p>
				<p>{dict.developedBy}</p>
			</div>
		</footer>
	)
}
