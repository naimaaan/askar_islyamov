import { pageMetadata } from '@/lib/metadata'
import { galleryContent } from '@/content/gallery'
import { sortGalleryImages } from '@/content/gallery-sequence'
import GalleryGrid from '@/components/GalleryGrid'
import PageHeader from '@/components/PageHeader'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const gallery = galleryContent[validLocale]

	return pageMetadata(validLocale, '/gallery', {
		title: gallery.title,
		description: gallery.description,
	})
}

export default async function GalleryPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const gallery = galleryContent[validLocale]

	return (
		<div className='site-page'>
			<div className='site-container'>
				<PageHeader title={gallery.title} description={gallery.description} />

				<GalleryGrid
					locale={validLocale}
					images={sortGalleryImages(gallery.images)}
					albums={gallery.albums}
					allLabel={gallery.allText}
				/>
			</div>
		</div>
	)
}
