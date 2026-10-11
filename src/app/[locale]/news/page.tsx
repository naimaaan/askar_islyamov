import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'
import { getNewsArticles, newsDocuments, newsLabels } from '@/content/news'
import NewsFeed from '@/components/NewsFeed'
import PageHeader from '@/components/PageHeader'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return pageMetadata(locale, '/news', newsLabels[locale])
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const labels = newsLabels[locale]
  return <div className='site-page'>
    <div className='site-container'>
      <PageHeader title={labels.title} description={labels.description} />
      <NewsFeed articles={getNewsArticles()} documents={newsDocuments} locale={locale} />
    </div>
  </div>
}
