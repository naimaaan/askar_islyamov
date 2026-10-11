import type { Locale } from '@/lib/i18n'
import { getNewsArticles, newsLabels } from '@/content/news'
import NewsCard from './NewsCard'
import HomeSectionHeading from './HomeSectionHeading'

export default function LatestNews({ locale }: { locale: Locale }) {
  const labels = newsLabels[locale]
  const [lead, ...otherArticles] = getNewsArticles().slice(0, 4)
  if (!lead) return null

  return <section aria-labelledby='home-news-title' className='border-b border-slate-200 bg-white py-14 sm:py-16'>
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <HomeSectionHeading id='home-news-title' title={labels.title} eyebrow={labels.eyebrow} href={`/${locale}/news/`} linkLabel={labels.back} />
      <div className='grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10'>
        <NewsCard article={lead} locale={locale} headingLevel='h3' />
        <div className='grid content-start gap-6 border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'>
          {otherArticles.map((article, index) => <NewsCard key={article.slug} article={article} locale={locale} compact headingLevel='h3' revealDelay={index + 1} />)}
        </div>
      </div>
    </div>
  </section>
}
