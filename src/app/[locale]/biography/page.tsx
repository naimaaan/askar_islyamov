import { pageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { personContent } from '@/content/person'
import BiographyClient from './BiographyClient'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const person = personContent[validLocale]

	return pageMetadata(validLocale, '/biography', {
		title: person.biography.title,
		description: person.intro,
	})
}

export default async function BiographyPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	return <BiographyClient locale={locale} />
}
