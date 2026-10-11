import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import sharp from 'sharp'

// Extract complete certificate spreads from the existing, lossless archive.
// Perspective correction only maps source pixels; it does not recreate text.
const outputDirectory = path.resolve('public/images/awards')
const temporaryDirectory = path.resolve('tmp/award-documents')
await mkdir(outputDirectory, { recursive: true })
await mkdir(temporaryDirectory, { recursive: true })

const certificates = [
	{ id: 'honoured-teacher-1983', source: 'p27-i01.webp', corners: [[0, 879], [875, 846], [0, 1254], [898, 1246]] },
	{ id: 'education-ussr', source: 'p27-i01.webp', corners: [[70, 570], [841, 548], [48, 858], [870, 836]] },
	{ id: 'education-kazakh-ssr', source: 'p27-i01.webp', corners: [[30, 78], [794, 22], [8, 328], [818, 272]] },
	{ id: 'special-merits-pension', source: 'p27-i01.webp', corners: [[50, 310], [814, 257], [40, 568], [842, 533]] },
	{ id: 'veteran-of-labour', source: 'p28-page.webp', crop: { left: 0, top: 0, width: 457, height: 313 } },
	{ id: 'pension-book', source: 'p28-page.webp', crop: { left: 0, top: 313, width: 457, height: 308 } },
	{ id: 'socialist-competition-1974', source: 'p28-page.webp', crop: { left: 0, top: 621, width: 457, height: 332 } },
]

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])
const manifest = []
for (const certificate of certificates) {
	const sourcePath = path.resolve('public/images/archive-2026', certificate.source)
	const sourceBuffer = await readFile(sourcePath)
	let image
	if (certificate.corners) {
		const [topLeft, topRight, bottomLeft, bottomRight] = certificate.corners
		const left = Math.floor(Math.min(...certificate.corners.map(point => point[0])))
		const top = Math.floor(Math.min(...certificate.corners.map(point => point[1])))
		const width = Math.ceil(Math.max(...certificate.corners.map(point => point[0]))) - left
		const height = Math.ceil(Math.max(...certificate.corners.map(point => point[1]))) - top
		const cropPath = path.join(temporaryDirectory, `${certificate.id}-source.png`)
		const correctedPath = path.join(temporaryDirectory, `${certificate.id}-flat.png`)
		await sharp(sourceBuffer).extract({ left, top, width, height }).png().toFile(cropPath)
		const points = certificate.corners.map(([x, y], index) => `x${index}=${x - left}:y${index}=${y - top}`).join(':')
		const flatWidth = Math.round(Math.max(distance(topLeft, topRight), distance(bottomLeft, bottomRight)))
		const flatHeight = Math.round((distance(topLeft, bottomLeft) + distance(topRight, bottomRight)) / 2)
		execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', cropPath, '-vf', `perspective=${points}:interpolation=cubic,scale=${flatWidth}:${flatHeight}`, '-frames:v', '1', correctedPath], { stdio: 'pipe' })
		image = sharp(await readFile(correctedPath))
	} else {
		image = sharp(sourceBuffer).extract(certificate.crop)
	}
	const targetPath = path.join(outputDirectory, `${certificate.id}.webp`)
	const metadata = await image.webp({ lossless: true, effort: 6 }).toFile(targetPath)
	manifest.push({ id: certificate.id, source: certificate.source, corners: certificate.corners, crop: certificate.crop, width: metadata.width, height: metadata.height, bytes: metadata.size })
}
await writeFile(path.join(temporaryDirectory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(JSON.stringify(manifest, null, 2))
