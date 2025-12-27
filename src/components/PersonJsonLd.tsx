import React from 'react'

type Props = {
	name: string
	description: string
	url: string
	image: string
	birthDate?: string
	deathDate?: string
	jobTitle?: string
	worksFor?: string
	birthPlace?: string
	alumniOf?: string[]
	awards?: string[]
	spouse?: string
	sameAs?: string[]
}

export default function PersonJsonLd({
	name,
	description,
	url,
	image,
	birthDate,
	deathDate,
	jobTitle,
	worksFor,
	birthPlace,
	alumniOf,
	awards,
	spouse,
	sameAs,
}: Props) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name,
		url,
		description,
		image,
		birthDate,
		deathDate,
		jobTitle,
		worksFor: worksFor
			? {
					'@type': 'Organization',
					name: worksFor,
			  }
			: undefined,
		birthPlace: birthPlace
			? {
					'@type': 'Place',
					name: birthPlace,
			  }
			: undefined,
		alumniOf: alumniOf?.map(org => ({
			'@type': 'EducationalOrganization',
			name: org,
		})),
		award: awards,
		spouse: spouse
			? {
					'@type': 'Person',
					name: spouse,
			  }
			: undefined,
		sameAs,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
