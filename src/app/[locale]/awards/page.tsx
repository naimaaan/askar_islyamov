import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { awardsContent } from '@/content/awards'
import AwardPhoto from '@/components/AwardPhoto'
import PageHeader from '@/components/PageHeader'

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

	const [honorCertificate, ...certificates] = awards.documents

	return <div className='site-page'>
		<div className='site-container'>
			<PageHeader title={awards.title} description={awards.description} />

			<section aria-labelledby='honorary-titles' className='grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:gap-20'>
				<figure className='max-w-md'>
					<AwardPhoto src='/images/портрет.jpeg' caption={awards.portraitCaption} locale={validLocale} portrait />
					<figcaption className='mt-3 text-sm leading-relaxed text-slate-500'>{awards.portraitCaption}</figcaption>
				</figure>
				<div className='self-center'>
					<h2 id='honorary-titles' className='eyebrow mb-5'>{awards.titlesHeading}</h2>
					<ul className='divide-y divide-slate-200 border-y border-slate-200'>
						{awards.titles.map(item => <li key={item.title} className='py-6 sm:py-7'>
							<h3 className='card-title max-w-xl text-2xl sm:text-3xl'>{item.title}</h3>
							{item.date && <time dateTime={item.date} className='mt-3 block text-sm text-slate-500'>{item.dateLabel}</time>}
						</li>)}
					</ul>
				</div>
			</section>

			<section aria-labelledby='award-documents' className='mt-14 sm:mt-16'>
				<h2 id='award-documents' className='section-title mb-8 border-b border-slate-200 pb-5'>{awards.documentsHeading}</h2>
				{honorCertificate && <figure className='mb-12 grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:gap-20'>
					<div className='max-w-sm'>
						<AwardPhoto src={honorCertificate.src} caption={honorCertificate.title} locale={validLocale} portrait />
					</div>
					<figcaption className='self-center'>
						<h3 className='card-title text-2xl'>{honorCertificate.title}</h3>
						<p className='text-copy mt-3 max-w-xl'>{honorCertificate.caption}</p>
					</figcaption>
				</figure>}
				<div className='grid gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-10'>
					{certificates.map(document => <figure key={document.src} className='min-w-0'>
						<AwardPhoto src={document.src} caption={document.title} locale={validLocale} wide={document.wide} documentImage />
						<figcaption className='pt-4'>
							<h3 className='card-title'>{document.title}</h3>
							<p className='text-caption mt-2'>{document.caption}</p>
						</figcaption>
					</figure>)}
				</div>
			</section>

			<section aria-labelledby='other-awards' className='mt-14 border-t border-slate-200 pt-8 sm:mt-16 sm:pt-10'>
				<h2 id='other-awards' className='section-title'>{awards.distinctionsHeading}</h2>
				<ul className='mt-6 grid gap-x-12 md:grid-cols-2'>
					{awards.distinctions.map(item => <li key={item.title} className='border-b border-slate-200 py-5 text-lg leading-relaxed text-slate-800'>{item.title}</li>)}
				</ul>
				<div className='mt-8 border-l-2 border-slate-300 pl-5'>
					<h3 className='eyebrow'>{awards.statusHeading}</h3>
					<p className='mt-2 max-w-2xl text-base leading-relaxed text-slate-700'>{awards.status}</p>
				</div>
			</section>
		</div>
	</div>
}
