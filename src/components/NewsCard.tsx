import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsDate, newsLabels, type NewsArticle } from '@/content/news'
import NewsVideoPreview from './NewsVideoPreview'

export default function NewsCard({ article, locale, featured = false, horizontal = false, compact = false, headingLevel = 'h2', revealDelay, fromCategory }: { article: NewsArticle; locale: Locale; featured?: boolean; horizontal?: boolean; compact?: boolean; headingLevel?: 'h2' | 'h3'; revealDelay?: number; fromCategory?: NewsArticle['category'] }) {
  const labels = newsLabels[locale]
  const Heading = headingLevel
  const homeLead = headingLevel === 'h3' && !compact
  const preview = homeLead ? article.video?.preview : undefined
  const duration = article.video?.duration || article.videoDuration
  const href = `/${locale}/news/${article.slug}/${fromCategory ? `?category=${fromCategory}` : ''}`
  const linkClass = `${compact ? 'grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[9rem_minmax(0,1fr)]' : horizontal ? 'grid items-center gap-6 md:grid-cols-2 md:gap-10' : 'block'} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700`
  const media = (
        <span className={`relative block overflow-hidden bg-slate-100 ${compact ? 'aspect-[4/3] rounded-md' : 'aspect-[16/9]'} ${homeLead ? 'rounded-lg' : ''}`}>
          <Image src={article.cover} alt='' fill sizes={compact ? '(max-width: 640px) 96px, (max-width: 1024px) 160px, 144px' : homeLead ? '(max-width: 1024px) 100vw, 700px' : featured ? '(max-width: 1024px) 100vw, 800px' : horizontal ? '(max-width: 768px) 100vw, 600px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'} preload={featured} className='object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]' style={{ objectPosition: article.coverPosition || 'center' }} />
          {duration && !preview && <span aria-label={`${labels.video} · ${duration}`} className={`absolute z-10 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 text-xs font-medium text-white ${compact ? 'bottom-2 left-2 px-2 py-1' : 'bottom-4 left-4 px-3 py-1.5'}`}><Play size={13} fill='currentColor' aria-hidden='true' /> {compact ? duration : `${labels.video} · ${duration}`}</span>}
        </span>
  )
  const text = (
        <div className={horizontal || compact ? 'min-w-0' : featured ? 'pt-6' : 'pt-4'}>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium'>
            <span className='text-slate-600'>{labels.categories[article.category]}</span>
            <span className='text-slate-400' aria-hidden='true'>/</span>
            {article.date ? <time dateTime={article.date} className='text-slate-500'>{newsDate(article, locale)}</time> : <span className='text-slate-500'>{labels.archive}</span>}
          </div>
          <Heading className={`font-serif font-bold leading-tight tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors ${compact ? 'mt-2 text-lg sm:text-xl' : homeLead ? 'mt-3 text-2xl sm:text-3xl' : featured ? 'mt-3 text-3xl sm:text-4xl' : 'mt-3 text-xl sm:text-2xl'}`}>{article.title[locale]}</Heading>
          {!compact && <p className={`mt-3 leading-relaxed text-slate-600 ${featured ? 'text-base sm:text-lg max-w-3xl' : homeLead ? 'text-base' : 'text-sm'}`}>{article.summary[locale]}</p>}
          <span className={`${compact ? 'mt-3' : 'mt-5'} inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-800`}>{labels.read}<ArrowUpRight size={16} aria-hidden='true' /></span>
        </div>
  )
  return (
    <article data-home-reveal={headingLevel === 'h3' ? '' : undefined} data-home-delay={revealDelay} className='group min-w-0'>
      {preview ? <>
        <NewsVideoPreview src={preview} title={article.title[locale]} locale={locale}>{media}</NewsVideoPreview>
        <Link href={href} className={linkClass}>{text}</Link>
      </> : <Link href={href} className={linkClass}>{media}{text}</Link>}
    </article>
  )
}
