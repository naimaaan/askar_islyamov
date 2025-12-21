import { galleryContent } from '@/content/gallery'
import GalleryGrid from '@/components/GalleryGrid'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const gallery = galleryContent[validLocale]

	return {
		title: gallery.title,
		description: gallery.description,
	}
}

export default async function GalleryPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const gallery = galleryContent[validLocale]

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Decorative background element */}
			<div className='absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-200/50 to-transparent -z-10' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				<div className='text-center mb-16 relative'>
					<span className='text-slate-400 font-serif italic text-lg mb-2 block'>
						{validLocale === 'ru' ? 'Архив памяти' : 'Естелік мұрағаты'}
					</span>
					<h1 className='text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight'>
						{gallery.title}
					</h1>
					<div className='w-24 h-1 bg-slate-800 mx-auto mb-6 rounded-full opacity-80' />
					<p className='text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light'>
						{gallery.description}
					</p>
				</div>

				<GalleryGrid
					images={gallery.images}
					albums={gallery.albums}
					allLabel={gallery.allText}
				/>
			</div>
		</div>
	)
}
