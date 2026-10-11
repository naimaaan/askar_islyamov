import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { pageMetadata, localizedPath, siteUrl } from '@/lib/metadata'
import { getNewsArticles, newsArticles, newsDate, newsLabels } from '@/content/news'
import NewsMedia from '@/components/NewsMedia'
import NewsCard from '@/components/NewsCard'
import NewsArticleInset from '@/components/NewsArticleInset'
import ContestReport from '@/components/ContestReport'
import NewsBackLink from '@/components/NewsBackLink'
import NewsPhotoView from '@/components/NewsPhotoView'

export function generateStaticParams() {
  return newsArticles.map(article => ({ slug: article.slug }))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const article = newsArticles.find(item => item.slug === slug)
  if (!article) notFound()
  const metadata = pageMetadata(locale, `/news/${slug}`, { title: article.title[locale], description: article.summary[locale] })
  const images = [{ url: article.cover, alt: article.title[locale] }]
  return { ...metadata, openGraph: { ...metadata.openGraph, type: 'article', images }, twitter: { ...metadata.twitter, images: [article.cover] } }
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const article = newsArticles.find(item => item.slug === slug)
  if (!article) notFound()
  const labels = newsLabels[locale]
  const others = getNewsArticles().filter(item => item.slug !== slug)
  const related = [...others.filter(item => item.category === article.category), ...others.filter(item => item.category !== article.category)].slice(0, 3)
  const structured = {
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title[locale], description: article.summary[locale],
    image: `${siteUrl}${article.cover}`, mainEntityOfPage: `${siteUrl}${localizedPath(locale, `/news/${slug}`)}`,
    inLanguage: locale === 'kz' ? 'kk' : locale, articleSection: labels.categories[article.category],
  }
  return <div className='bg-white'>
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
    <article className='mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8'>
      <NewsBackLink locale={locale} />
      <header className='max-w-4xl'>
        <div className='flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium'>
          <Link href={`/${locale}/news/?category=${article.category}`} className='text-slate-600 hover:underline underline-offset-4'>{labels.categories[article.category]}</Link><span className='text-slate-300' aria-hidden='true'>/</span>
          <span className='text-slate-500'>{article.date ? <time dateTime={article.date}>{newsDate(article, locale)}</time> : labels.archive}</span>
        </div>
        <h1 className='mt-5 text-3xl font-serif font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl'>{article.title[locale]}</h1>
        <p className='mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl'>{article.summary[locale]}</p>
      </header>
      <div className='my-8'>
        <NewsPhotoView locale={locale} photo={{ src: article.cover, caption: article.title, position: article.coverPosition }} showCaption={false} preload />
      </div>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-10 space-y-5 text-base leading-[1.85] text-slate-700 sm:text-lg'>{article.body[locale].map((paragraph, index) => <Fragment key={paragraph}>
          {article.bodyHeadings?.[locale][index] && <h2 className='pt-3 font-serif text-2xl font-bold leading-snug text-slate-900'>{article.bodyHeadings[locale][index]}</h2>}
          <p>{paragraph}</p>
          {index === 0 && article.inset && <NewsArticleInset inset={article.inset} locale={locale} />}
          {article.inlinePhotos?.filter(item => item.after === index).map(item => <div key={item.photo.src} className='mx-auto max-w-lg py-3'><NewsPhotoView photo={item.photo} locale={locale} /></div>)}
        </Fragment>)}</div>
        {article.report === 'contest'
          ? <ContestReport locale={locale} />
          : <NewsMedia locale={locale} photos={article.photos.filter(photo => article.showPhotoCaptions === false || photo.src !== article.cover)} video={article.video} showPhotoCaptions={article.showPhotoCaptions} />}
      </div>
    </article>
    <section className='border-t border-slate-200 bg-slate-50 py-14' aria-labelledby='related-news-title'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 id='related-news-title' className='mb-8 text-2xl font-serif font-bold'>{labels.related}</h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>{related.map(item => <NewsCard key={item.slug} article={item} locale={locale} />)}</div>
      </div>
    </section>
  </div>
}
