import { Award, ExternalLink } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { contestContent } from '@/content/contest'
import ContestGallery from './ContestGallery'
import ContestTimeline from './ContestTimeline'

const labels = {
  ru: { history: 'История конкурса: 2023–2025', gallery: 'Фотохроника и видео', winners: 'Победители', results: 'Официальные итоги' },
  kz: { history: 'Байқау тарихы: 2023–2025', gallery: 'Фотошежіре және бейне', winners: 'Жеңімпаздар', results: 'Ресми қорытынды' },
  en: { history: 'Contest history: 2023–2025', gallery: 'Photo journal and video', winners: 'Winners', results: 'Official results' },
}

export default function ContestReport({ locale }: { locale: Locale }) {
  const contest = contestContent[locale]
  const text = labels[locale]
  const years = [...new Set(contest.winners.map(winner => winner.year))].sort().reverse()
  return <div className='space-y-12'>
    <section aria-labelledby='contest-winners-title' className='border-t border-slate-200 pt-6'>
      <h2 id='contest-winners-title' className='mb-6 text-2xl font-serif font-bold text-slate-900'>{text.winners}</h2>
      {years.map(year => <div key={year}>
        <h3 className='mb-5 font-serif text-3xl text-amber-800'>{year}</h3>
        <ul className='divide-y divide-slate-200'>
          {contest.winners.filter(winner => winner.year === year).map(winner => <li key={`${winner.year}-${winner.name}`} className='py-5 first:pt-0'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div className='min-w-0 flex-1'>
                <p className='mb-2 inline-flex items-center gap-2 text-sm font-medium text-amber-800'><Award size={16} aria-hidden='true' />{winner.place}</p>
                <h4 className='text-lg font-semibold text-slate-900'>{winner.name}</h4>
                <p className='mt-2 text-sm leading-relaxed text-slate-600'>{winner.org}</p>
                <p className='mt-1 text-sm leading-relaxed text-slate-500'>{winner.work}</p>
              </div>
              <span className='rounded-md bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900'>{winner.prize}</span>
            </div>
          </li>)}
        </ul>
      </div>)}
    </section>
    <section aria-labelledby='contest-results-title' className='border-t border-slate-200 pt-6'>
      <h2 id='contest-results-title' className='mb-5 text-2xl font-serif font-bold text-slate-900'>{text.results}</h2>
      <ul className='space-y-3'>
        {contest.resources.links.map(resource => <li key={resource.href}>
          <a href={resource.href} target='_blank' rel='noopener noreferrer' className='flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-5 py-4 text-sm font-medium text-slate-700 transition-colors hover:border-amber-700 hover:text-amber-800'>
            <span>{resource.label}</span><ExternalLink size={18} className='shrink-0' aria-hidden='true' />
          </a>
        </li>)}
      </ul>
      {contest.resources.note && <p className='mt-4 text-sm text-slate-500'>{contest.resources.note}</p>}
    </section>
    <section aria-labelledby='contest-gallery-title'>
      <h2 id='contest-gallery-title' className='mb-6 text-2xl font-serif font-bold text-slate-900'>{text.gallery}</h2>
      <ContestGallery locale={locale} images={contest.gallery.slice(1)} videoSrc={contest.video} />
    </section>
    <section aria-labelledby='contest-history-title' className='border-t border-slate-200 pt-6'>
      <h2 id='contest-history-title' className='text-2xl font-serif font-bold text-slate-900'>{text.history}</h2>
      <ContestTimeline events={contest.timeline} />
    </section>
  </div>
}
