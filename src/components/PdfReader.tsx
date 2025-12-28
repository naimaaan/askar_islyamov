'use client'

import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {
	ChevronLeft,
	ChevronRight,
	RotateCw,
	RotateCcw,
	ZoomIn,
	ZoomOut,
	Maximize,
	Minimize,
	ArrowLeftRight,
	RefreshCw,
	Columns,
	Moon,
	Sun,
} from 'lucide-react'

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfReaderProps {
	file: string
}

export default function PdfReader({ file }: PdfReaderProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [numPages, setNumPages] = useState<number | null>(null)
	const [pageNumber, setPageNumber] = useState<number>(1)
	const [containerWidth, setContainerWidth] = useState<number>(600)
	const [rotation, setRotation] = useState<number>(0)
	const [scale, setScale] = useState<number>(1.0)

	// New features state
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [splitMode, setSplitMode] = useState(false)
	const [splitSide, setSplitSide] = useState<'left' | 'right'>('left')
	const [touchStartX, setTouchStartX] = useState<number | null>(null)
	const [isNightMode, setIsNightMode] = useState(false)
	const [pageInput, setPageInput] = useState<string>('1')

	// Autosave & Restore
	useEffect(() => {
		if (typeof window === 'undefined') return

		const storageKey = `pdfReader:${file}`
		const saved = localStorage.getItem(storageKey)

		if (saved) {
			try {
				const data = JSON.parse(saved)
				if (data.page) {
					setPageNumber(data.page)
					setPageInput(String(data.page))
				}
				if (data.splitMode !== undefined) setSplitMode(data.splitMode)
				if (data.splitSide) setSplitSide(data.splitSide)
				if (data.scale) setScale(data.scale)
				if (data.isNightMode !== undefined) setIsNightMode(data.isNightMode)
				if (data.rotation !== undefined) setRotation(data.rotation)
			} catch (e) {
				console.error('Failed to restore PDF state', e)
			}
		}
	}, [file])

	// Sync pageInput when pageNumber changes
	useEffect(() => {
		setPageInput(String(pageNumber))
	}, [pageNumber])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const storageKey = `pdfReader:${file}`
		const stateToSave = {
			page: pageNumber,
			splitMode,
			splitSide,
			scale,
			isNightMode,
			rotation,
		}
		localStorage.setItem(storageKey, JSON.stringify(stateToSave))
	}, [pageNumber, splitMode, splitSide, scale, isNightMode, rotation, file])

	// Handle window resize to make PDF responsive
	useEffect(() => {
		function updateWidth() {
			if (!containerRef.current) return
			const width = containerRef.current.clientWidth
			// On desktop (lg), we have a sidebar of approx 320px (w-72 + gap-8)
			// Max container width is 1200px unless fullscreen
			const isDesktop = window.innerWidth >= 1024
			const sidebarWidth = isDesktop ? 320 : 0
			const padding = 48 // px-6 * 2

			const availableWidth = width - sidebarWidth - padding
			setContainerWidth(availableWidth)
		}

		// Initial set
		updateWidth()

		window.addEventListener('resize', updateWidth)
		// Also update when fullscreen changes
		window.addEventListener('fullscreenchange', updateWidth)

		return () => {
			window.removeEventListener('resize', updateWidth)
			window.removeEventListener('fullscreenchange', updateWidth)
		}
	}, [])

	// Fullscreen toggle
	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			containerRef.current?.requestFullscreen().catch(err => {
				console.error(`Error attempting to enable fullscreen: ${err.message}`)
			})
		} else {
			document.exitFullscreen()
		}
	}

	useEffect(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement))
		}
		document.addEventListener('fullscreenchange', onFullscreenChange)
		return () =>
			document.removeEventListener('fullscreenchange', onFullscreenChange)
	}, [])

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// If focus is in input, ignore
			if (document.activeElement instanceof HTMLInputElement) return

			switch (e.key) {
				case 'ArrowRight':
				case 'ArrowDown':
				case ' ':
					e.preventDefault()
					goToNextStep()
					break
				case 'ArrowLeft':
				case 'ArrowUp':
					e.preventDefault()
					goToPrevStep()
					break
				case '+':
				case '=':
					e.preventDefault()
					zoomIn()
					break
				case '-':
					e.preventDefault()
					zoomOut()
					break
				case '0':
					e.preventDefault()
					fitWidth()
					break
				case 'f':
				case 'F':
					e.preventDefault()
					toggleFullscreen()
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [pageNumber, splitMode, splitSide, numPages]) // Add dependencies for closure capture

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages)
		// Do NOT reset pageNumber here to allow restore from localStorage
	}

	function goToPrevStep() {
		if (splitMode) {
			if (splitSide === 'right') {
				setSplitSide('left')
			} else {
				// Currently on left side, go to previous page's right side
				if (pageNumber > 1) {
					setPageNumber(prev => prev - 1)
					setSplitSide('right')
				}
			}
		} else {
			if (pageNumber > 1) {
				setPageNumber(prev => prev - 1)
			}
		}
	}

	function goToNextStep() {
		if (splitMode) {
			if (splitSide === 'left') {
				setSplitSide('right')
			} else {
				// Currently on right side, go to next page's left side
				if (numPages && pageNumber < numPages) {
					setPageNumber(prev => prev + 1)
					setSplitSide('left')
				}
			}
		} else {
			if (numPages && pageNumber < numPages) {
				setPageNumber(prev => prev + 1)
			}
		}
	}

	// Rotation controls
	function rotateLeft() {
		setRotation(prev => (prev - 90) % 360)
	}

	function rotateRight() {
		setRotation(prev => (prev + 90) % 360)
	}

	function resetRotation() {
		setRotation(0)
	}

	// Zoom controls
	function zoomOut() {
		setScale(prev => Math.max(0.7, prev - 0.1))
	}

	function zoomIn() {
		setScale(prev => Math.min(2.5, prev + 0.1))
	}

	function fitWidth() {
		setScale(1.0)
	}

	function handlePageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPageInput(e.target.value)
	}

	function handlePageInputCommit() {
		if (!numPages) return

		let newPage = parseInt(pageInput, 10)
		if (isNaN(newPage)) {
			setPageInput(String(pageNumber))
			return
		}

		// Clamp value
		if (newPage < 1) newPage = 1
		if (newPage > numPages) newPage = numPages

		setPageNumber(newPage)
		setPageInput(String(newPage))

		// Reset split side if in split mode
		if (splitMode) {
			setSplitSide('left')
		}
	}

	function handlePageInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			handlePageInputCommit()
			;(e.target as HTMLInputElement).blur()
		}
	}

	// Swipe handlers
	function onTouchStart(e: React.TouchEvent) {
		setTouchStartX(e.touches[0].clientX)
	}

	function onTouchEnd(e: React.TouchEvent) {
		if (touchStartX === null) return

		const touchEndX = e.changedTouches[0].clientX
		const diff = touchStartX - touchEndX

		// Threshold for swipe
		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				// Swipe Left -> Next
				goToNextStep()
			} else {
				// Swipe Right -> Prev
				goToPrevStep()
			}
		}
		setTouchStartX(null)
	}

	const isFirstPage = pageNumber <= 1 && (!splitMode || splitSide === 'left')
	const isLastPage =
		numPages !== null &&
		pageNumber >= numPages &&
		(!splitMode || splitSide === 'right')

	return (
		<div
			ref={containerRef}
			className={`w-full flex justify-center ${
				isFullscreen ? 'bg-white dark:bg-slate-900 overflow-y-auto' : ''
			}`}
		>
			<div
				className={`flex flex-col lg:flex-row-reverse lg:items-start lg:justify-center w-full py-4 px-2 md:px-6 gap-6 lg:gap-8 transition-colors duration-300 rounded-xl ${
					isFullscreen ? 'max-w-none min-h-screen' : 'max-w-[1200px]'
				} ${isNightMode ? 'bg-slate-900 text-slate-100' : ''}`}
			>
				<div
					className='w-full lg:flex-1 flex justify-center overflow-hidden touch-pan-y'
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					<Document
						file={file}
						onLoadSuccess={onDocumentLoadSuccess}
						loading={
							<div className='text-center py-10 text-gray-500'>
								Загрузка документа...
							</div>
						}
						error={
							<div className='text-center py-10 text-red-500'>
								Не удалось загрузить документ.
							</div>
						}
						className={`shadow-lg border transition-colors duration-300 ${
							isNightMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200'
						}`}
					>
						{splitMode ? (
							<div
								className='relative overflow-hidden'
								style={{
									width: containerWidth * scale,
									// Height will be determined by the aspect ratio of the page
								}}
							>
								<div
									style={{
										width: '200%',
										transform:
											splitSide === 'left'
												? 'translateX(0)'
												: 'translateX(-50%)',
										transition: 'transform 0.3s ease-in-out',
										display: 'flex',
									}}
								>
									<div className={isNightMode ? 'invert brightness-90' : ''}>
										<Page
											pageNumber={pageNumber}
											renderTextLayer={false}
											renderAnnotationLayer={false}
											width={containerWidth * scale * 2} // Double width for split mode
											rotate={rotation}
											className='bg-white'
										/>
									</div>
								</div>
							</div>
						) : (
							<div className={isNightMode ? 'invert brightness-90' : ''}>
								<Page
									pageNumber={pageNumber}
									renderTextLayer={false}
									renderAnnotationLayer={false}
									width={containerWidth * scale}
									rotate={rotation}
									className='bg-white'
								/>
							</div>
						)}
					</Document>
				</div>

				{numPages && (
					<div className='flex flex-col gap-6 mt-8 lg:mt-0 w-full max-w-3xl lg:w-72 lg:shrink-0 lg:sticky lg:top-24'>
						{/* Row 1: Page Navigation */}
						<div
							className={`flex items-center justify-center gap-4 md:gap-8 lg:flex-col lg:gap-4 lg:p-4 lg:rounded-xl lg:border ${
								isNightMode
									? 'lg:bg-slate-800 lg:border-slate-700'
									: 'lg:bg-gray-50 lg:border-gray-100'
							}`}
						>
							<div className='flex items-center gap-4 w-full justify-between lg:justify-center'>
								<button
									type='button'
									disabled={isFirstPage}
									onClick={goToPrevStep}
									className={`p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
										isNightMode
											? 'bg-slate-700 text-white hover:bg-slate-600'
											: 'bg-gray-900 text-white hover:bg-gray-800'
									}`}
									aria-label='Previous page'
								>
									<ChevronLeft className='w-5 h-5' />
								</button>

								<div className='flex flex-col items-center'>
									<div className='flex items-center gap-2'>
										<input
											type='number'
											min={1}
											max={numPages || undefined}
											value={pageInput}
											onChange={handlePageInputChange}
											onBlur={handlePageInputCommit}
											onKeyDown={handlePageInputKeyDown}
											className={`w-16 text-center rounded border px-1 py-0.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
												isNightMode
													? 'bg-slate-800 border-slate-600 text-slate-200'
													: 'bg-white border-gray-300 text-gray-900'
											}`}
											aria-label='Go to page'
										/>
										<span
											className={`font-medium text-sm ${
												isNightMode ? 'text-slate-400' : 'text-gray-500'
											}`}
										>
											/ {numPages}
										</span>
									</div>
									{splitMode && (
										<span className='text-xs text-blue-500 font-medium mt-1'>
											{splitSide === 'left' ? 'Левая' : 'Правая'}
										</span>
									)}
								</div>

								<button
									type='button'
									disabled={isLastPage}
									onClick={goToNextStep}
									className={`p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
										isNightMode
											? 'bg-slate-700 text-white hover:bg-slate-600'
											: 'bg-gray-900 text-white hover:bg-gray-800'
									}`}
									aria-label='Next page'
								>
									<ChevronRight className='w-5 h-5' />
								</button>
							</div>
						</div>

						{/* Row 2: Tools (Rotation & Zoom & Modes) */}
						<div
							className={`flex flex-wrap items-center justify-center gap-4 p-4 rounded-xl transition-colors shadow-sm lg:flex-col lg:items-stretch ${
								isNightMode
									? 'bg-slate-800'
									: 'bg-gray-50 border border-gray-100'
							}`}
						>
							{/* Rotation Group */}
							<div className='flex items-center justify-center gap-2'>
								<button
									onClick={rotateLeft}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Rotate Left'
								>
									<RotateCcw className='w-5 h-5' />
								</button>
								<button
									onClick={resetRotation}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Reset Rotation'
								>
									<RefreshCw className='w-5 h-5' />
								</button>
								<button
									onClick={rotateRight}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Rotate Right'
								>
									<RotateCw className='w-5 h-5' />
								</button>
							</div>

							<div
								className={`w-px h-6 hidden sm:block lg:hidden ${
									isNightMode ? 'bg-slate-600' : 'bg-gray-300'
								}`}
							></div>
							<div
								className={`hidden lg:block w-full h-px ${
									isNightMode ? 'bg-slate-700' : 'bg-gray-200'
								}`}
							></div>

							{/* Zoom Group */}
							<div className='flex items-center justify-center gap-2'>
								<button
									onClick={zoomOut}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Zoom Out'
								>
									<ZoomOut className='w-5 h-5' />
								</button>
								<span
									className={`text-xs font-medium w-8 text-center ${
										isNightMode ? 'text-slate-400' : 'text-gray-500'
									}`}
								>
									{Math.round(scale * 100)}%
								</span>
								<button
									onClick={zoomIn}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Zoom In'
								>
									<ZoomIn className='w-5 h-5' />
								</button>
								<button
									onClick={fitWidth}
									className={`p-2 rounded-lg transition-colors ml-1 ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Fit Width'
								>
									<ArrowLeftRight className='w-5 h-5' />
								</button>
							</div>

							<div
								className={`w-px h-6 hidden sm:block lg:hidden ${
									isNightMode ? 'bg-slate-600' : 'bg-gray-300'
								}`}
							></div>
							<div
								className={`hidden lg:block w-full h-px ${
									isNightMode ? 'bg-slate-700' : 'bg-gray-200'
								}`}
							></div>

							{/* Mode Toggles */}
							<div className='flex items-center justify-center gap-2'>
								<button
									onClick={toggleFullscreen}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
								>
									{isFullscreen ? (
										<Minimize className='w-5 h-5' />
									) : (
										<Maximize className='w-5 h-5' />
									)}
								</button>

								<button
									onClick={() => setSplitMode(!splitMode)}
									className={`p-2 rounded-lg transition-colors ${
										splitMode
											? 'bg-blue-100 text-blue-600'
											: isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title='Режим разворота'
								>
									<Columns className='w-5 h-5' />
								</button>

								<button
									onClick={() => setIsNightMode(!isNightMode)}
									className={`p-2 rounded-lg transition-colors ${
										isNightMode
											? 'text-yellow-400 hover:bg-slate-700'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title={isNightMode ? 'Дневной режим' : 'Ночной режим'}
								>
									{isNightMode ? (
										<Sun className='w-5 h-5' />
									) : (
										<Moon className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
