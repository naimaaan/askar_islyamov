'use client'

import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsLabels, type NewsArticle, type NewsCategory, type NewsPhoto } from '@/content/news'
import NewsCard from './NewsCard'
import NewsCarousel from './NewsCarousel'

type Props = { articles: NewsArticle[]; documents: NewsPhoto[]; locale: Locale }
type Category = NewsCategory | 'all'

function FeedContent({ articles, documents, locale, category, onCategory }: Props & { category: Category; onCategory?: (value: Category) => void }) {
  const labels = newsLabels[locale]
  const filtered = category === 'all' ? articles : articles.filter(article => article.category === category)
  const primary = category === 'all' ? filtered.filter(article => article.category !== 'meetings' && article.category !== 'contest') : filtered
  const meetings = category === 'all' ? filtered.filter(article => article.category === 'meetings') : []
  const contests = category === 'all' ? filtered.filter(article => article.category === 'contest') : []
  const [featured, ...remaining] = primary
  const fromCategory = category === 'all' ? undefined : category
  return <>
    <div className='mb-7 flex flex-wrap gap-2 border-b border-slate-200 pb-4' role='group' aria-label={labels.feed}>
      {(['all', ...Object.keys(labels.categories)] as Category[]).map(value => <button key={value} type='button' aria-pressed={category === value} onClick={() => onCategory?.(value)} className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${category === value ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'}`}>{value === 'all' ? labels.all : labels.categories[value]}</button>)}
    </div>
    <div className={`grid gap-x-12 ${category === 'all' ? 'lg:grid-cols-[minmax(0,2.2fr)_minmax(260px,1fr)]' : ''}`}>
      <div className={category === 'all' ? 'lg:col-start-1' : 'max-w-4xl'}>
        <p className='mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500'><span className='h-1.5 w-1.5 rounded-full bg-slate-500' aria-hidden='true' />{category === 'all' ? labels.featured : labels.categories[category]}</p>
        {featured && <NewsCard article={featured} locale={locale} featured fromCategory={fromCategory} />}
      </div>
      {remaining.length > 0 && <section className='mt-10 border-t-2 border-slate-900 pt-5 lg:col-span-2' aria-labelledby='news-feed-title'>
        <h2 id='news-feed-title' className='mb-6 text-2xl font-serif font-bold text-slate-900'>{labels.feed}</h2>
        <div className='grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2'>{remaining.map(article => <NewsCard key={article.slug} article={article} locale={locale} fromCategory={fromCategory} />)}</div>
      </section>}
      {contests.length > 0 && <section className='mt-10 border-t border-slate-200 pt-5 lg:col-span-2' aria-labelledby='news-contests-title'>
        <h2 id='news-contests-title' className='mb-6 text-2xl font-serif font-bold text-slate-900'>{labels.contestsTitle}</h2>
        {contests.map(article => <NewsCard key={article.slug} article={article} locale={locale} horizontal />)}
      </section>}
      {meetings.length > 0 && <section className='mt-10 border-t border-slate-200 pt-5 lg:col-span-2' aria-labelledby='news-meetings-title'>
        <h2 id='news-meetings-title' className='mb-6 text-2xl font-serif font-bold text-slate-900'>{labels.meetingsTitle}</h2>
        {meetings.map(article => <NewsCard key={article.slug} article={article} locale={locale} horizontal />)}
      </section>}
      {category === 'all' && <aside className='mt-10 self-start border-t border-slate-200 pt-5 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0'>
        <h2 className='text-2xl font-serif font-bold text-slate-900'>{labels.history}</h2>
        <div className='mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1'>
          {([
            { year: '2021', slug: 'college-classroom-opening', name: labels.college, place: labels.collegePlace, text: labels.collegeText },
            { year: '2022', slug: 'school-geography-classroom', name: labels.school, place: labels.schoolPlace, text: labels.schoolText },
          ]).map(item => <div key={item.slug} className='border-b border-slate-200 pb-5'>
            <span className='font-serif text-3xl text-slate-600'>{item.year}</span>
            <h3 className='mt-2 text-base font-semibold text-slate-900'><Link href={`/${locale}/news/${item.slug}/`} className='hover:text-blue-700 hover:underline underline-offset-4'>{item.name}</Link></h3>
            <p className='mt-1 text-xs uppercase tracking-wider text-slate-500'>{item.place}</p>
            <p className='mt-2 text-sm leading-relaxed text-slate-600'>{item.text}</p>
          </div>)}
        </div>
        <Link href={`/${locale}/biography/`} className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-800'>{labels.biography}<ArrowRight size={15} aria-hidden='true' /></Link>
      </aside>}
    </div>
    {category === 'all' && <NewsCarousel photos={documents} locale={locale} />}
  </>
}

function FilteredFeed(props: Props) {
  const params = useSearchParams()
  const pathname = usePathname()
  const value = params.get('category')
  const category: Category = value && Object.hasOwn(newsLabels[props.locale].categories, value) ? value as NewsCategory : 'all'
  const select = (next: Category) => {
    const query = new URLSearchParams(params.toString())
    if (next === 'all') query.delete('category')
    else query.set('category', next)
    window.history.pushState(null, '', `${pathname}${query.size ? `?${query}` : ''}`)
  }
  return <FeedContent {...props} category={category} onCategory={select} />
}

export default function NewsFeed(props: Props) {
  return <Suspense fallback={<FeedContent {...props} category='all' />}><FilteredFeed {...props} /></Suspense>
}
