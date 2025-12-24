import { ImageResponse } from 'next/og'
import { siteContent } from '@/content/site'
import { join } from 'path'
import { readFileSync } from 'fs'

export const runtime = 'nodejs'

export const alt = 'Askar Islyamov'
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = 'image/png'

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const content =
		siteContent[locale as keyof typeof siteContent] || siteContent.ru

	// Load image
	const imagePath = join(process.cwd(), 'public', 'images', 'port.png')
	const imageBuffer = readFileSync(imagePath)
	const imageBase64 = imageBuffer.toString('base64')
	const imageSrc = `data:image/png;base64,${imageBase64}`

	// Attempt to load font
	let fontData: ArrayBuffer | null = null
	try {
		// Playfair Display Bold
		const response = await fetch(
			'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2'
		)
		if (response.ok) {
			fontData = await response.arrayBuffer()
		}
	} catch (e) {
		console.error('Font load failed', e)
	}

	return new ImageResponse(
		(
			<div
				style={{
					background: '#0f172a', // slate-900
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '80px',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						maxWidth: '60%',
						height: '100%',
					}}
				>
					<div
						style={{
							fontSize: 64,
							fontWeight: 900,
							color: '#f8fafc',
							marginBottom: 20,
							lineHeight: 1.1,
							fontFamily: '"Playfair Display", serif',
						}}
					>
						{content.metadata.title}
					</div>
					<div
						style={{
							fontSize: 32,
							color: '#cbd5e1',
							lineHeight: 1.4,
							marginBottom: 40,
							fontFamily: '"Playfair Display", serif',
							opacity: 0.9,
						}}
					>
						{content.metadata.description}
					</div>
					<div
						style={{
							fontSize: 24,
							color: '#94a3b8',
							display: 'flex',
							alignItems: 'center',
							fontFamily: 'sans-serif',
						}}
					>
						askarislyamov.kz
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						width: 400,
						height: 400,
						borderRadius: '50%',
						overflow: 'hidden',
						border: '8px solid rgba(255,255,255,0.1)',
						boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#1e293b',
					}}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={imageSrc}
						width='400'
						height='400'
						style={{ objectFit: 'cover', width: '100%', height: '100%' }}
						alt={content.header.title}
					/>
				</div>
			</div>
		),
		{
			...size,
			fonts: fontData
				? [
						{
							name: 'Playfair Display',
							data: fontData,
							style: 'normal',
							weight: 700,
						},
				  ]
				: undefined,
		}
	)
}
