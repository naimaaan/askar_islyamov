import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { getNewsArticles, newsLabels } from '@/content/news'
import NewsCard from './NewsCard'

export default function LatestNews({ locale }: { locale: Locale }) {
  const labels = newsLabels[locale]
  return <section className='mt-16 border-y border-slate-200 bg-white py-14 sm:py-16'>
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-5'>
        <div><p className='mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-800'>{labels.eyebrow}</p><h2 className='text-3xl font-serif font-bold text-slate-900'>{labels.title}</h2></div>
        <Link href={`/${locale}/news/`} className='inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-amber-800'>{labels.back}<ArrowRight size={16} aria-hidden='true' /></Link>
      </div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>{getNewsArticles().filter(article => article.category === 'school' || article.category === 'college').slice(0, 3).map(article => <NewsCard key={article.slug} article={article} locale={locale} />)}</div>
    </div>
  </section>
}
