import React from 'react'

type Props = {
	name: string
	description: string
	url: string
	image: string
}

export default function PersonJsonLd({ name, description, url, image }: Props) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name,
		url,
		description,
		image,
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
