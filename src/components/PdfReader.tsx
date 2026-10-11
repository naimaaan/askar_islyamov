'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, RotateCw, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize, ArrowLeftRight, RefreshCw, Columns, Moon, Sun } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { uiText } from '@/lib/ui-text'

// Bundle a worker with exactly the same PDF.js version as React-PDF.
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

interface PdfReaderProps { file: string; locale: Locale }

class ReaderErrorBoundary extends React.Component<{ children: React.ReactNode; message: string }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: unknown) { console.error('PDF reader error:', error) }
  render() {
    return this.state.hasError ? <div role='alert' className='mt-4 text-sm text-red-600 text-center p-4 border border-red-200 rounded bg-red-50'>{this.props.message}</div> : this.props.children
  }
}

function readSavedState(file: string) {
  const defaults = { page: 1, scale: 1, rotation: 0, splitMode: false, splitSide: 'left' as 'left' | 'right', isNightMode: false }
  try {
    const saved = JSON.parse(localStorage.getItem('pdfReader:' + file) || 'null')
    if (!saved || typeof saved !== 'object') return defaults
    const number = (value: unknown, fallback: number) => typeof value === 'number' && Number.isFinite(value) ? value : fallback
    return {
      page: Math.max(1, Math.floor(number(saved.page, 1))),
      scale: Math.min(2.5, Math.max(0.7, number(saved.scale, 1))),
      rotation: ((Math.round(number(saved.rotation, 0) / 90) * 90) % 360 + 360) % 360,
      splitMode: saved.splitMode === true && window.innerWidth >= 1024,
      splitSide: saved.splitSide === 'right' ? 'right' as const : 'left' as const,
      isNightMode: saved.isNightMode === true,
    }
  } catch { return defaults }
}

function PdfReaderContent({ file, locale }: PdfReaderProps) {
  const labels = uiText[locale]
  const containerRef = useRef<HTMLDivElement>(null)
  const pageAreaRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const [saved] = useState(() => readSavedState(file))
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(saved.page)
  const [containerWidth, setContainerWidth] = useState(600)
  const [rotation, setRotation] = useState(saved.rotation)
  const [scale, setScale] = useState(saved.scale)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [splitMode, setSplitMode] = useState(saved.splitMode)
  const [splitSide, setSplitSide] = useState<'left' | 'right'>(saved.splitSide)
  const [isNightMode, setIsNightMode] = useState(saved.isNightMode)
  const [pageDraft, setPageDraft] = useState<string | null>(null)
  const pageInput = pageDraft ?? String(pageNumber)

  useEffect(() => {
    // Validate the restored page before overwriting storage.
    if (!numPages) return
    try { localStorage.setItem('pdfReader:' + file, JSON.stringify({ page: pageNumber, splitMode, splitSide, scale, isNightMode, rotation })) } catch { /* Storage may be unavailable. */ }
  }, [numPages, pageNumber, splitMode, splitSide, scale, isNightMode, rotation, file])

  useEffect(() => {
    const area = pageAreaRef.current
    if (!area) return
    function updateWidth() {
      if (area) setContainerWidth(Math.max(160, area.clientWidth - 2))
      if (window.innerWidth < 1024) setSplitMode(false)
    }
    const observer = new ResizeObserver(updateWidth)
    observer.observe(area)
    window.addEventListener('resize', updateWidth)
    return () => { observer.disconnect(); window.removeEventListener('resize', updateWidth) }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  function toggleFullscreen() {
    const action = document.fullscreenElement ? document.exitFullscreen() : containerRef.current?.requestFullscreen()
    action?.catch(error => console.error('Fullscreen unavailable:', error))
  }
  function onDocumentLoadSuccess({ numPages: total }: { numPages: number }) {
    setPageNumber(page => Math.min(total, Math.max(1, page)))
    setNumPages(total)
  }
  function goToPrevStep() {
    setPageDraft(null)
    if (splitMode && splitSide === 'right') setSplitSide('left')
    else if (pageNumber > 1) { setPageNumber(page => page - 1); if (splitMode) setSplitSide('right') }
  }
  function goToNextStep() {
    setPageDraft(null)
    if (splitMode && splitSide === 'left') setSplitSide('right')
    else if (numPages && pageNumber < numPages) { setPageNumber(page => page + 1); if (splitMode) setSplitSide('left') }
  }
  function rotateLeft() { setRotation(value => (value + 270) % 360) }
  function rotateRight() { setRotation(value => (value + 90) % 360) }
  function resetRotation() { setRotation(0) }
  function zoomOut() { setScale(value => Math.max(0.7, value - 0.1)) }
  function zoomIn() { setScale(value => Math.min(2.5, value + 0.1)) }
  function fitWidth() { setScale(1) }
  function handlePageInputChange(event: React.ChangeEvent<HTMLInputElement>) { setPageDraft(event.target.value) }
  function handlePageInputCommit() {
    if (!numPages || pageDraft === null) return
    const requested = parseInt(pageDraft, 10)
    if (Number.isFinite(requested)) setPageNumber(Math.min(numPages, Math.max(1, requested)))
    setPageDraft(null)
    setSplitSide('left')
  }
  function handlePageInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') { event.preventDefault(); event.currentTarget.blur() }
  }
  function handleReaderKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // Shortcuts apply only inside the reader and never steal button or input keys.
    if ((event.target as HTMLElement).closest('input, textarea, select, button, a, [contenteditable="true"]')) return
    const actions: Record<string, () => void> = { ArrowRight: goToNextStep, ArrowDown: goToNextStep, ' ': goToNextStep, ArrowLeft: goToPrevStep, ArrowUp: goToPrevStep, '+': zoomIn, '=': zoomIn, '-': zoomOut, '0': fitWidth, f: toggleFullscreen, F: toggleFullscreen }
    if (actions[event.key]) { event.preventDefault(); actions[event.key]() }
  }
  function onTouchStart(event: React.TouchEvent) { touchStartX.current = event.touches.length === 1 ? event.touches[0].clientX : null }
  function onTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null || !event.changedTouches.length) return
    const distance = touchStartX.current - event.changedTouches[0].clientX
    if (Math.abs(distance) > 50) { if (distance > 0) goToNextStep(); else goToPrevStep() }
    touchStartX.current = null
  }
  const isFirstPage = pageNumber <= 1 && (!splitMode || splitSide === 'left')
  const isLastPage = numPages !== null && pageNumber >= numPages && (!splitMode || splitSide === 'right')
  const options = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@' + pdfjs.version + '/cmaps/', cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@' + pdfjs.version + '/standard_fonts/',
  }), [])

	return (
		<div
			ref={containerRef}
			tabIndex={0}
			role='region'
			aria-label={labels.reader}
			onKeyDown={handleReaderKeyDown}
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
					ref={pageAreaRef}
					className='w-full min-w-0 lg:flex-1 flex overflow-x-auto touch-pan-y'
					onMouseDown={() => containerRef.current?.focus({ preventScroll: true })}
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					<Document
						file={file}
						onLoadSuccess={onDocumentLoadSuccess}
						onLoadError={error => console.error('Document load error:', error)}
						options={options}
						loading={
							<div className='text-center py-10 text-gray-500'>
								{labels.loading}
							</div>
						}
						error={
							<div className='text-center py-10 text-red-500'>
								{labels.loadError}
							</div>
						}
						className={`mx-auto shrink-0 shadow-lg border transition-colors duration-300 ${
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
											loading={<p className='p-4 text-sm text-slate-500'>{labels.loading}</p>}
											error={<p role='alert' className='p-4 text-sm text-red-600'>{labels.loadError}</p>}
											pageNumber={pageNumber}
											renderTextLayer={false}
											renderAnnotationLayer={false}
											width={containerWidth * scale * 2} // Double width for split mode
											rotate={rotation}
											className='bg-white'
											onRenderError={error =>
												console.error('Page render error (split):', error)
											}
										/>
									</div>
								</div>
							</div>
						) : (
							<div className={isNightMode ? 'invert brightness-90' : ''}>
								<Page
									loading={<p className='p-4 text-sm text-slate-500'>{labels.loading}</p>}
									error={<p role='alert' className='p-4 text-sm text-red-600'>{labels.loadError}</p>}
									pageNumber={pageNumber}
									renderTextLayer={false}
									renderAnnotationLayer={false}
									width={containerWidth * scale}
									rotate={rotation}
									className='bg-white'
									onRenderError={error =>
										console.error('Page render error:', error)
									}
								/>
							</div>
						)}
					</Document>
				</div>

				{numPages && (
					<div className='flex flex-col gap-6 mt-8 lg:mt-0 w-full max-w-3xl lg:w-72 lg:shrink-0 lg:sticky lg:top-32'>
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
									aria-label={labels.previousPage}
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
											aria-label={labels.goToPage}
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
											{splitSide === 'left' ? labels.left : labels.right}
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
									aria-label={labels.nextPage}
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
									title={labels.rotateLeft} aria-label={labels.rotateLeft}
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
									title={labels.resetRotation} aria-label={labels.resetRotation}
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
									title={labels.rotateRight} aria-label={labels.rotateRight}
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
									title={labels.zoomOut} aria-label={labels.zoomOut}
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
									title={labels.zoomIn} aria-label={labels.zoomIn}
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
									title={labels.fitWidth} aria-label={labels.fitWidth}
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
									title={isFullscreen ? labels.exitFullscreen : labels.fullscreen} aria-label={isFullscreen ? labels.exitFullscreen : labels.fullscreen}
								>
									{isFullscreen ? (
										<Minimize className='w-5 h-5' />
									) : (
										<Maximize className='w-5 h-5' />
									)}
								</button>

								<button
									onClick={() => { setSplitMode(value => !value); setSplitSide('left') }}
									aria-pressed={splitMode}
									className={`hidden lg:inline-flex p-2 rounded-lg transition-colors ${
										splitMode
											? 'bg-blue-100 text-blue-600'
											: isNightMode
											? 'text-slate-300 hover:bg-slate-700 hover:text-blue-400'
											: 'text-gray-700 hover:bg-white hover:text-blue-600'
									}`}
									title={labels.split} aria-label={labels.split}
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
									title={isNightMode ? labels.day : labels.night} aria-label={isNightMode ? labels.day : labels.night} aria-pressed={isNightMode}
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

export default function PdfReader(props: PdfReaderProps) {
  if (!props.file) return null
  return <ReaderErrorBoundary key={props.file} message={uiText[props.locale].loadError}><PdfReaderContent key={props.file} {...props} /></ReaderErrorBoundary>
}
