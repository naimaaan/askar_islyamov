'use client'

import dynamic from 'next/dynamic'
import { useBookReader } from './BookReaderContext'
import type { Locale } from '@/lib/i18n'

const PdfReader = dynamic(() => import('./PdfReader'), {
	ssr: false,
	loading: () => (
		<div className='flex justify-center py-12'>
			<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900'></div>
		</div>
	),
})

interface BookPdfReaderSectionProps {
	pdf: string
	locale: Locale
}

export default function BookPdfReaderSection({
	pdf,
	locale,
}: BookPdfReaderSectionProps) {
	const { isReaderOpen } = useBookReader()

	if (!isReaderOpen || !pdf) return null

	return (
		<div className='w-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm animate-fade-in-up'>
			<style jsx global>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-up {
					animation: fadeInUp 0.5s ease-out forwards;
				}
			`}</style>

			<div className='mt-0'>
				<PdfReader key={pdf} file={pdf} locale={locale} />
			</div>
		</div>
	)
}
