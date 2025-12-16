import { galleryContent } from '@/content/gallery'
import GalleryGrid from '@/components/GalleryGrid'

export default async function GalleryPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale = locale === 'ru' || locale === 'kz' ? locale : 'ru'
	const gallery = galleryContent[validLocale]

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-serif font-bold text-slate-900 mb-4'>
					{gallery.title}
				</h1>
				<p className='text-xl text-slate-600 max-w-2xl mx-auto'>
					{gallery.description}
				</p>
			</div>

			<GalleryGrid images={gallery.images} albums={gallery.albums} />
		</div>
	)
}
