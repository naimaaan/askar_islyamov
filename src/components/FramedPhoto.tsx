'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { photoFrameMatrix, type PhotoFrame } from '@/lib/photo-frame'

export default function FramedPhoto({ src, alt, frame, sizes, onLoad, preload = false }: {
  src: string
  alt: string
  frame: PhotoFrame
  sizes: string
  onLoad?: () => void
  preload?: boolean
}) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height })
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const width = Math.min(size.width, size.height * frame.aspectRatio)
  const height = width / frame.aspectRatio
  const transform = width > 0 && height > 0 ? photoFrameMatrix(frame, width, height) : undefined

  return <span ref={containerRef} className='relative block h-full w-full'>
    <span className='absolute overflow-hidden' style={transform ? { width, height, left: (size.width - width) / 2, top: (size.height - height) / 2 } : { inset: 0 }}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} draggable={false} onLoad={onLoad} className={transform ? 'object-fill' : 'object-contain'} style={{ transform, transformOrigin: '0 0' }} />
    </span>
  </span>
}
