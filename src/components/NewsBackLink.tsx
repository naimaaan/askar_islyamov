'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { newsLabels } from '@/content/news'

function BackLink({ locale }: { locale: Locale }) {
  const params = useSearchParams()
  const value = params.get('category')
  const category = value && Object.hasOwn(newsLabels[locale].categories, value) ? value : undefined
  return <Link href={`/${locale}/news/${category ? `?category=${category}` : ''}`} className='mb-7 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-amber-800'><ArrowLeft size={16} aria-hidden='true' />{newsLabels[locale].back}</Link>
}

export default function NewsBackLink({ locale }: { locale: Locale }) {
  return <Suspense fallback={<Link href={`/${locale}/news/`} className='mb-7 inline-flex items-center gap-2 text-sm text-slate-600'><ArrowLeft size={16} aria-hidden='true' />{newsLabels[locale].back}</Link>}><BackLink locale={locale} /></Suspense>
}
