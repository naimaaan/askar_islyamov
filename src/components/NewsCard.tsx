import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsDate, newsLabels, type NewsArticle } from '@/content/news'

export default function NewsCard({ article, locale, featured = false, horizontal = false, fromCategory }: { article: NewsArticle; locale: Locale; featured?: boolean; horizontal?: boolean; fromCategory?: NewsArticle['category'] }) {
  const labels = newsLabels[locale]
  return (
    <article className='group min-w-0'>
      <Link href={`/${locale}/news/${article.slug}/${fromCategory ? `?category=${fromCategory}` : ''}`} className={`${horizontal ? 'grid items-center gap-6 md:grid-cols-2 md:gap-10' : 'block'} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700`}>
        <div className='relative aspect-[16/9] overflow-hidden bg-slate-100'>
          <Image src={article.cover} alt={article.title[locale]} fill sizes={featured ? '(max-width: 1024px) 100vw, 800px' : horizontal ? '(max-width: 768px) 100vw, 600px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'} preload={featured} className='object-cover transition-transform duration-500 group-hover:scale-[1.03]' style={{ objectPosition: article.coverPosition || 'center' }} />
          {(article.video || article.videoDuration) && <span className='absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-1.5 text-xs font-medium text-white'><Play size={13} fill='currentColor' aria-hidden='true' /> {labels.video} · {article.video?.duration || article.videoDuration}</span>}
        </div>
        <div className={horizontal ? '' : featured ? 'pt-6' : 'pt-4'}>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium'>
            <span className='text-slate-600'>{labels.categories[article.category]}</span>
            <span className='text-slate-400' aria-hidden='true'>/</span>
            {article.date ? <time dateTime={article.date} className='text-slate-500'>{newsDate(article, locale)}</time> : <span className='text-slate-500'>{labels.archive}</span>}
          </div>
          <h2 className={`mt-3 font-serif font-bold leading-tight tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors ${featured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>{article.title[locale]}</h2>
          <p className={`mt-3 leading-relaxed text-slate-600 ${featured ? 'text-base sm:text-lg max-w-3xl' : 'text-sm'}`}>{article.summary[locale]}</p>
          <span className='mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-800'>{labels.read}<ArrowUpRight size={16} aria-hidden='true' /></span>
        </div>
      </Link>
    </article>
  )
}
