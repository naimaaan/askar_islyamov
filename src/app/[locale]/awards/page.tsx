import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { awardsContent } from '@/content/awards'
import AwardPhoto from '@/components/AwardPhoto'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const awards = awardsContent[validLocale]
	return pageMetadata(validLocale, '/awards', { title: awards.title, description: awards.description })
}

export default async function AwardsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const awards = awardsContent[validLocale]

	return <div className='min-h-screen bg-slate-50'>
		<div className='absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-200/50 to-transparent -z-10' />
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
			<header className='text-center mb-16 relative'>
				<span className='text-slate-400 font-serif italic text-lg mb-2 block'>
					{validLocale === 'ru' ? 'Архив памяти' : validLocale === 'kz' ? 'Естелік мұрағаты' : 'Memory Archive'}
				</span>
				<h1 className='text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight'>{awards.title}</h1>
				<div className='w-24 h-1 bg-slate-800 mx-auto mb-6 rounded-full opacity-80' />
				<p className='text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light'>{awards.description}</p>
			</header>

			<section aria-labelledby='honorary-titles' className='grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:gap-20'>
				<figure className='max-w-md'>
					<AwardPhoto src='/images/портрет.jpeg' caption={awards.portraitCaption} locale={validLocale} portrait />
				</figure>
				<div className='self-center'>
					<h2 id='honorary-titles' className='mb-5 text-sm font-medium uppercase tracking-wide text-slate-500'>{awards.titlesHeading}</h2>
					<ul className='divide-y divide-slate-200 border-y border-slate-200'>
						{awards.titles.map(item => <li key={item.title} className='py-6 sm:py-7'>
							<h3 className='max-w-xl text-xl font-medium leading-snug text-slate-900 sm:text-2xl'>{item.title}</h3>
							{item.date && <time dateTime={item.date} className='mt-3 block text-sm text-slate-500'>{item.dateLabel}</time>}
						</li>)}
					</ul>
				</div>
			</section>

			<section aria-labelledby='award-documents' className='mt-14 sm:mt-16'>
				<h2 id='award-documents' className='mb-8 border-b border-slate-200 pb-5 text-3xl font-serif font-bold text-slate-900'>{awards.documentsHeading}</h2>
				<div className='grid items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-10'>
					{awards.documents.map((document, index) => <figure key={document.src} className={`min-w-0 ${index === 0 ? 'md:row-span-2' : ''}`}>
						<AwardPhoto src={document.src} caption={document.year ? `${document.title}, ${document.year}` : document.title} locale={validLocale} portrait={index === 0} wide={document.wide} documentImage />
						<figcaption className='pt-4'>
							<div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
								<h3 className='text-lg font-medium leading-snug text-slate-900'>{document.title}</h3>
								{document.year && <time dateTime={String(document.year)} className='text-sm font-medium tabular-nums text-slate-500'>{document.year}</time>}
							</div>
						</figcaption>
					</figure>)}
				</div>
			</section>

			<section aria-labelledby='other-awards' className='mt-14 border-t border-slate-200 pt-8 sm:mt-16 sm:pt-10'>
				<h2 id='other-awards' className='text-3xl font-serif font-bold text-slate-900'>{awards.distinctionsHeading}</h2>
				<ul className='mt-6 grid gap-x-12 md:grid-cols-2'>
					{awards.distinctions.map(item => <li key={item.title} className='border-b border-slate-200 py-5 text-lg leading-relaxed text-slate-800'>{item.title}</li>)}
				</ul>
				<div className='mt-8 border-l-2 border-slate-300 pl-5'>
					<h3 className='text-sm font-medium uppercase tracking-wide text-slate-500'>{awards.statusHeading}</h3>
					<p className='mt-2 max-w-2xl text-base leading-relaxed text-slate-700'>{awards.status}</p>
				</div>
			</section>
		</div>
	</div>
}
