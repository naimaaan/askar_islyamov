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
				{eyebrow && <p className={`eyebrow mb-2 ${dark ? 'text-slate-300' : ''}`}>{eyebrow}</p>}
				<h2 id={id} className={`section-title ${dark ? 'text-white' : ''}`}>{title}</h2>
				{description && <p className={`text-copy mt-3 max-w-2xl ${dark ? 'text-slate-300' : ''}`}>{description}</p>}
			</div>
			<Link href={href} className={`text-link shrink-0 ${dark ? 'text-slate-200 hover:text-white focus-visible:outline-white' : ''}`}>
				{linkLabel}<ArrowRight size={16} aria-hidden='true' />
			</Link>
		</div>
	)
}
