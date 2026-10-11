import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Props = {
	id: string
	title: string
	href: string
	linkLabel: string
	description?: string
	eyebrow?: string
	dark?: boolean
}

export default function HomeSectionHeading({ id, title, href, linkLabel, description, eyebrow, dark = false }: Props) {
	return (
		<div data-home-reveal className={`mb-8 flex flex-wrap items-end justify-between gap-5 border-b pb-6 ${dark ? 'border-white/15' : 'border-slate-200'}`}>
			<div className='min-w-0'>
				{eyebrow && <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{eyebrow}</p>}
				<h2 id={id} className={`font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
				{description && <p className={`mt-3 max-w-2xl leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>}
			</div>
			<Link href={href} className={`inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? 'text-slate-200 hover:text-white focus-visible:outline-white' : 'text-slate-700 hover:text-blue-700 focus-visible:outline-blue-700'}`}>
				{linkLabel}<ArrowRight size={16} aria-hidden='true' />
			</Link>
		</div>
	)
}
