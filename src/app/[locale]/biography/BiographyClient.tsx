'use client'

import { useState, useEffect, useRef } from 'react'
import { personContent } from '@/content/person'
import Timeline from '@/components/Timeline'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'
import { Quote } from 'lucide-react'

// --- Simple FadeIn Component ---
function FadeIn({
	children,
	delay = 0,
}: {
	children: React.ReactNode
	delay?: number
}) {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.unobserve(entry.target)
				}
			},
			{ threshold: 0.1 }
		)
		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className={`transition-all duration-1000 ease-out transform ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
			}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	)
}

// Images to cycle through for biography sections
const sectionImages = [
	'/images/port.png', // Portrait / Early years
	'/images/Шығыс Қазақстан мемлекеттік институтының алғашқы түлектерінің бірі Асқар Ислямов.jpeg', // Education / University
	// Early career / Journalism
	'/images/сабак беру.png', // Teaching / School
	'/images/1967-1970 жж. Асқар Ислямов Абай орта мектебінде парбюро секретары.jpeg',
	'/images/Журналистермен кездесу сәті.jpeg', // Public service
	'/images/1988ж. Абай орта мектебіне 60 жыл..jpeg', // Later years / Family
	'/images/мұғалімдер съезі.jpeg',
]

// Family images for the grid
const familyImages = [
	'/images/Семья фото.jpeg',
	'/images/дерево.jpeg',
	'/images/семья3.jpeg',
]

export default function BiographyClient({ locale }: { locale: string }) {
	const validLocale =
		locale === 'ru' || locale === 'kz' || locale === 'en' ? locale : 'ru'
	const { biography, family, intro, name } = personContent[validLocale]

	// Lightbox state
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [allImages, setAllImages] = useState<string[]>([])

	const openLightbox = (imageSrc: string) => {
		// Collect all images currently on the page for navigation
		const images = [...sectionImages, ...familyImages]
		setAllImages(images)
		const index = images.indexOf(imageSrc)
		setCurrentImageIndex(index >= 0 ? index : 0)
		setLightboxOpen(true)
	}

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<div className='relative bg-slate-900 text-white py-24 overflow-hidden'>
				<div className='absolute inset-0 opacity-20'>
					<Image
						src='/images/image2.png'
						alt='Background'
						fill
						className='object-cover blur-sm'
					/>
				</div>
				<div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<FadeIn>
						<h1 className='text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight'>
							{biography.title}
						</h1>
					</FadeIn>
					<FadeIn delay={200}>
						<p className='text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light italic'>
							&ldquo;{intro}&rdquo;
						</p>
					</FadeIn>
				</div>
			</div>

			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24'>
				{/* Biography Sections */}
				<div className='space-y-24'>
					{biography.sections.map((section, index) => {
						const imageSrc = sectionImages[index % sectionImages.length]
						const isReversed = index % 2 !== 0

						return (
							<FadeIn key={index}>
								<section
									className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
										isReversed ? 'md:flex-row-reverse' : ''
									}`}
								>
									<div className='flex-1'>
										<div className='flex items-center gap-4 mb-4'>
											<span className='text-6xl font-serif text-slate-200 font-bold select-none'>
												{index + 1}
											</span>
											<h2 className='text-3xl font-serif font-semibold text-slate-900 pt-4'>
												{section.title}
											</h2>
										</div>
										<p className='text-lg text-slate-600 leading-relaxed text-justify'>
											{section.content}
										</p>
									</div>
									<div className='flex-1 w-full'>
										<div
											className='relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-100 cursor-zoom-in group'
											onClick={() => openLightbox(imageSrc)}
										>
											<Image
												src={imageSrc}
												alt={section.title}
												fill
												className='object-cover group-hover:scale-105 transition-transform duration-700'
											/>
											<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center'>
												<span className='opacity-0 group-hover:opacity-100 text-white bg-black/50 px-4 py-2 rounded-full text-sm transition-opacity duration-300 backdrop-blur-sm'>
													{validLocale === 'ru'
														? 'Увеличить'
														: validLocale === 'kz'
														? 'Үлкейту'
														: 'Zoom'}
												</span>
											</div>
										</div>
									</div>
								</section>
							</FadeIn>
						)
					})}
				</div>

				{/* Quote Break */}
				<FadeIn>
					<div className='max-w-4xl mx-auto text-center py-12'>
						<Quote className='w-12 h-12 text-slate-300 mx-auto mb-6' />
						<p className='text-2xl md:text-3xl font-serif text-slate-800 italic leading-relaxed'>
							{validLocale === 'ru'
								? '«Я не жалею о том, что посвятил себя воспитанию молодого поколения, напротив — радуюсь тому, что по воле Всевышнего стал учителем…»'
								: validLocale === 'kz'
								? '«Мен өзім жас ұрпақты тәрбиелеу жұмысымен айналысқаныма өкінбеймін, қайта Құдайдың құдіретімен мұғалім болғаныма қуанамын…»'
								: '«I do not regret dedicating myself to educating the younger generation; on the contrary, I rejoice that by the will of the Almighty I became a teacher…»'}
						</p>
						<p className='mt-4 text-slate-500 font-medium'>— {name}</p>
					</div>
				</FadeIn>

				{/* Family Section */}
				<FadeIn>
					<section className='bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm'>
						<div className='flex flex-col xl:flex-row gap-12 items-start'>
							<div className='flex-1'>
								<h2 className='text-3xl font-serif font-semibold text-slate-900 mb-6 flex items-center gap-3'>
									{family.title}
								</h2>
								<p className='text-xl text-slate-800 font-medium mb-6 italic border-l-4 border-slate-300 pl-4'>
									{family.lead}
								</p>
								<p className='text-lg text-slate-600 leading-relaxed'>
									{family.content}
								</p>
							</div>
							<div className='w-full xl:w-1/2 flex-shrink-0'>
								<div className='grid grid-cols-2 gap-4'>
									<div
										className='relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 col-span-2 cursor-zoom-in group'
										onClick={() => openLightbox(familyImages[0])}
									>
										<Image
											src={familyImages[0]}
											alt={family.title}
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-500'
										/>
									</div>
									<div
										className='relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in group'
										onClick={() => openLightbox(familyImages[1])}
									>
										<Image
											src={familyImages[1]}
											alt='Family photo 2'
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-500'
										/>
									</div>
									<div
										className='relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in group'
										onClick={() => openLightbox(familyImages[2])}
									>
										<Image
											src={familyImages[2]}
											alt='Family photo 3'
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-500'
										/>
									</div>
								</div>
								<p className='text-sm text-slate-500 mt-4 text-center italic'>
									{validLocale === 'ru'
										? 'Семейный архив'
										: validLocale === 'kz'
										? 'Отбасылық мұрағат'
										: 'Family Archive'}
								</p>
							</div>
						</div>
					</section>
				</FadeIn>

				{/* Timeline Section */}
				<FadeIn>
					<section className='max-w-4xl mx-auto pt-8 border-t border-slate-100'>
						<h2 className='text-3xl font-serif font-semibold text-slate-900 mb-12 text-center'>
							{validLocale === 'ru'
								? 'Хронология жизни'
								: validLocale === 'kz'
								? 'Өмір жолының хронологиясы'
								: 'Life Timeline'}
						</h2>
						<Timeline items={biography.timeline} />
					</section>
				</FadeIn>
			</div>

			{/* Lightbox Component */}
			<Lightbox
				isOpen={lightboxOpen}
				onClose={() => setLightboxOpen(false)}
				imageSrc={allImages[currentImageIndex]}
				imageAlt='Biography image'
				onNext={() =>
					setCurrentImageIndex(prev => (prev + 1) % allImages.length)
				}
				onPrev={() =>
					setCurrentImageIndex(
						prev => (prev - 1 + allImages.length) % allImages.length
					)
				}
				hasNext={allImages.length > 1}
				hasPrev={allImages.length > 1}
			/>
		</div>
	)
}
