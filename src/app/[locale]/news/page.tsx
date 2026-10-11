import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'
import { getNewsArticles, newsDocuments, newsLabels } from '@/content/news'
import NewsFeed from '@/components/NewsFeed'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return pageMetadata(locale, '/news', newsLabels[locale])
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const labels = newsLabels[locale]
  return <div className='min-h-screen bg-white'>
    <div className='mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8'>
      <header className='mb-6 border-t-2 border-slate-900 pb-4 pt-5'>
        <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-800'>{labels.eyebrow}</p>
        <h1 className='mt-3 text-5xl font-serif font-bold tracking-tight text-slate-900 sm:text-6xl'>{labels.title}</h1>
        <p className='mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg'>{labels.description}</p>
      </header>
      <NewsFeed articles={getNewsArticles()} documents={newsDocuments} locale={locale} />
    </div>
  </div>
}
