import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const base = process.env.BASE_URL || 'http://localhost:3000'
const production = 'https://askarislyamov.kz'
const locales = { ru: 'ru', kz: 'kk', en: 'en' }
const sections = ['', 'biography/', 'books/', 'gallery/', 'awards/', 'memories/', 'contacts/', 'news/']
const news = Array.from(readFileSync(new URL('../src/content/news.ts', import.meta.url), 'utf8').matchAll(/slug: '([^']+)'/g), match => match[1])
const consolidatedNews = ['pedagogical-essay-collection-2025', 'school-invitation-2024', 'regional-essay-contest-2022', 'round-table-2022', 'college-teaching-hour-2025']
const books = ['otken-omir', 'east-kz-toponymy', 'tarikhta-kalgan', 'cultural-heritage', 'barkytbel', 'films']
const memoirCover = readFileSync(new URL('../src/content/books.ts', import.meta.url), 'utf8').match(/id: 'otken-omir',[\s\S]*?cover: '([^']+)'/)?.[1]
assert.ok(memoirCover, 'Memoir cover must be configured')
const routes = Object.keys(locales).flatMap(locale => [...sections, ...books.map(book => `books/${book}/`), ...news.map(slug => `news/${slug}/`)].map(route => `/${locale}/${route}`))
const bookTitles = { ru: new Set(), kz: new Set(), en: new Set() }
const archiveAssets = new Set()
const newsAssets = new Set()
const institutionNames = {
	ru: ['Восточно-Казахстанский гуманитарный колледж имени Абая', 'Средняя школа имени Абая села Ақжар Тарбагатайского района'],
	kz: ['Абай атындағы Шығыс Қазақстан гуманитарлық колледжі', 'Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебі'],
	en: ['Abai East Kazakhstan Humanitarian College', 'Abai Secondary School in Akzhar, Tarbagatai district'],
}
const unavailable = { ru: 'Электронная версия пока недоступна', kz: 'Электрондық нұсқа әзірге қолжетімсіз', en: 'Digital edition is not yet available' }

const get = path => fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000), redirect: 'manual' })
const sitemapResponse = await get('/sitemap.xml')
assert.equal(sitemapResponse.status, 200)
const sitemap = await sitemapResponse.text()
const addresses = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1])
assert.deepEqual(addresses.sort(), routes.map(route => production + route).sort(), 'Sitemap must include all localized pages and news articles')

for (const route of routes) {
	const response = await get(route)
	assert.equal(response.status, 200, route)
	const html = await response.text()
	const locale = route.split('/')[1]
	assert.ok(html.includes(`<html lang="${locales[locale]}"`), `${route}: language`)
	assert.ok(html.includes(`rel="canonical" href="${production}${route}"`), `${route}: canonical`)
	if (/\/news\/[^/]+\/$/.test(route)) {
		assert.match(html, /<meta property="og:image" content="https:\/\/askarislyamov\.kz\/images\//, `${route}: article share image`)
	} else {
		assert.match(html, /<meta property="og:image" content="https:\/\/askarislyamov\.kz\/opengraph.png"/, `${route}: share image`)
	}
	assert.match(html, /<meta name="description" content="[^"].*?"/, `${route}: description`)
	for (const [alternate, language] of Object.entries(locales)) {
		const alternatePath = route.replace(`/${locale}/`, `/${alternate}/`)
		assert.ok(html.includes(`hrefLang="${language}" href="${production}${alternatePath}"`), `${route}: alternate ${language}`)
	}
	assert.ok(!html.includes('noise.png'), `${route}: missing texture`)
	assert.ok(!html.includes('href=""'), `${route}: empty link`)
	const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1] || ''
	const headerNav = header.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/)?.[1] || ''
	const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1] || ''
	assert.ok(headerNav.includes(`href="/${locale}/news/"`), `${route}: news in header`)
	assert.ok(!headerNav.includes(`href="/${locale}/contacts`), `${route}: contacts removed from header navigation`)
	assert.ok(!header.includes(`href="/${locale}/contest`), `${route}: contest removed from header`)
	assert.ok(!footer.includes(`href="/${locale}/contest`), `${route}: no obsolete contest link in footer`)
	assert.ok(footer.includes(`href="/${locale}/contacts/"`), `${route}: contacts page linked from footer`)
	for (const asset of html.matchAll(/\/(?:images|videos)\/news\/[a-z0-9-]+\.(?:webp|mp4)/g)) newsAssets.add(asset[0])
	if (route.endsWith('/news/')) {
		for (const slug of news) assert.ok(html.includes(`href="/${locale}/news/${slug}/"`), `${route}: article ${slug}`)
		for (const slug of consolidatedNews) assert.ok(!html.includes(`href="/${locale}/news/${slug}/"`), `${route}: consolidated stories have no separate cards`)
		assert.ok(html.includes('id="news-carousel-title"'), `${route}: supporting document carousel`)
		assert.ok(html.includes('2021') && html.includes('2022'), `${route}: classroom chronology`)
		for (const name of institutionNames[locale]) assert.ok(html.includes(name), `${route}: full institution name ${name}`)
	}
	if (route.endsWith('/news/pedagogical-essay-contest/')) {
		const articleHtml = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || ''
		for (const section of ['contest-history-title', 'contest-gallery-title', 'contest-winners-title', 'contest-results-title']) assert.ok(articleHtml.includes(`id="${section}"`), `${route}: retained ${section}`)
		for (const year of ['2023', '2024', '2025']) assert.ok(articleHtml.includes(year), `${route}: retained contest history ${year}`)
		assert.equal((articleHtml.match(/<li\b/g) || []).length, 7, `${route}: six winners and the results document retained`)
		for (const filename of ['event-01.jpg', 'event-02.jpg', 'event-03.jpg']) assert.ok(articleHtml.includes(filename), `${route}: retained contest photo ${filename}`)
		assert.ok(!articleHtml.includes('event-04.jpeg'), `${route}: scholarship certificate belongs to the college story`)
		assert.ok(articleHtml.includes('2024-12-11'), `${route}: verified contest event date`)
		assert.ok(!/Нурдаулетовna|Маратовna|Participants&#x27; works|Қатысушылардың жұмыстары/.test(articleHtml), `${route}: corrected names and captions`)
		assert.ok(articleHtml.includes('<video') && articleHtml.includes('WhatsApp'), `${route}: retained contest video`)
		assert.ok(articleHtml.includes('https://www.gov.kz/memleket/entities/vko-bilim/press/news/details/901981'), `${route}: original results source`)
	}
	if (route.endsWith('/news/pedagogical-meetings/')) {
		const articleHtml = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || ''
		assert.ok(!articleHtml.includes('<figcaption'), `${route}: meeting photos have no visible captions`)
		const photoSection = articleHtml.slice(articleHtml.indexOf('aria-labelledby="news-photos-title"'))
		assert.equal((photoSection.match(/<figure\b/g) || []).length, 6, `${route}: all six existing meeting photos retained`)
	}
	if (route.endsWith('/news/college-classroom-opening/')) {
		const articleHtml = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || ''
		assert.ok(articleHtml.includes('event-04.jpeg') && articleHtml.includes('2021'), `${route}: scholarship certificate in college history`)
	}
	if (/\/news\/[^/]+\/$/.test(route)) {
		assert.match(html, new RegExp(`href="/${locale}/news/\\?category=(school|college|contest|meetings)"`), `${route}: category links to filtered news`)
		assert.ok(!html.includes('M04'), `${route}: readable Kazakh month`)
	}
	if (route === `/${locale}/`) {
		for (const slug of ['college-classroom-opening', 'school-geography-classroom', 'geography-olympiad-2025']) assert.ok(html.includes(`href="/${locale}/news/${slug}/"`), `${route}: main story ${slug}`)
		assert.ok(!html.includes(`href="/${locale}/news/pedagogical-meetings/"`), `${route}: homepage prioritizes classroom openings and olympiad`)
	}
	if (route.endsWith('/gallery/')) {
		const assets = new Set(Array.from(html.matchAll(/\/images\/archive-2026\/[a-z0-9-]+\.webp/g), match => match[0]))
		assert.equal(assets.size, 26, `${route}: imported archive materials`)
		for (const asset of assets) archiveAssets.add(asset)
	}
	if (route.endsWith('/books/otken-omir/')) {
		assert.ok(html.includes('href="/pdf/otken-omir.pdf"'), `${route}: electronic edition`)
		assert.ok(html.includes(memoirCover.split('/').at(-1)), `${route}: configured memoir cover`)
	}
	if (/\/books\/[^/]+\/$/.test(route)) {
		assert.match(html, /<title>[^<]+<\/title>/)
		bookTitles[locale].add(html.match(/<title>([^<]+)<\/title>/)[1])
		if (/\/(cultural-heritage|barkytbel)\/$/.test(route)) {
			const buttons = Array.from(html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g), match => match[1])
			assert.ok(!buttons.some(button => /Читать онлайн|Онлайн оқу|Read Online/.test(button)), `${route}: unavailable reader`)
			assert.ok(html.includes(unavailable[locale]), `${route}: availability notice`)
			assert.ok(!/<a[^>]*\sdownload(?:=|\s|>)/.test(html), `${route}: unavailable download`)
		}
	}
}
for (const locale of Object.keys(locales)) {
	assert.equal(bookTitles[locale].size, 6, `${locale}: unique book titles`)
	const oldContest = await get(`/${locale}/contest/`)
	assert.equal(oldContest.status, 308, `${locale}: permanent contest redirect`)
	assert.equal(new URL(oldContest.headers.get('location'), base).pathname, `/${locale}/news/pedagogical-essay-contest/`, `${locale}: contest publication destination`)
}
assert.equal((await get('/robots.txt')).status, 200)

const redirect = await get('/?source=smoke')
assert.ok([307, 308].includes(redirect.status))
assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/kz/')
assert.equal(new URL(redirect.headers.get('location'), base).searchParams.get('source'), 'smoke')
assert.equal((await get('/ru/books/unknown-book/')).status, 404)
assert.equal((await get('/ru/unknown-page/')).status, 404)
assert.equal((await get('/ru/news/unknown-story/')).status, 404)
for (const slug of consolidatedNews) assert.equal((await get(`/ru/news/${slug}/`)).status, 404, `${slug}: removed standalone page`)

for (const filename of ['otken-omir.pdf', 'А. Ислямов Шығыс Қазақстан топонимикасы.pdf', 'Тарихта қалған тағылым 1-287.pdf']) {
	const response = await fetch(`${base}/pdf/${encodeURIComponent(filename)}`, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
	assert.equal(response.status, 200, filename)
	assert.match(response.headers.get('content-type'), /application\/pdf/)
	assert.equal(response.headers.get('accept-ranges'), 'bytes')
}
console.log(`Passed: ${routes.length} pages, sitemap, metadata, navigation, redirects, 404s, PDF files, and unavailable editions.`)
for (const asset of [...archiveAssets, '/images/books/otken-omir-cover.webp', memoirCover]) {
	const response = await fetch(`${base}${asset}`, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
	assert.equal(response.status, 200, asset)
	assert.match(response.headers.get('content-type'), asset.endsWith('.png') ? /image\/png/ : /image\/webp/)
}
const electronicEdition = await fetch(`${base}/pdf/otken-omir.pdf`, { method: 'HEAD' })
assert.ok(Number(electronicEdition.headers.get('content-length')) < 2_000_000, 'Memoir must use the new electronic edition')
console.log('Passed: 26 archive materials in three languages, the new cover and the electronic memoir.')
for (const asset of newsAssets) {
	const response = await fetch(`${base}${asset}`, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
	assert.equal(response.status, 200, asset)
	assert.match(response.headers.get('content-type'), asset.endsWith('.mp4') ? /video\/mp4/ : /image\/webp/, asset)
	if (asset.endsWith('.mp4')) {
		assert.equal(response.headers.get('accept-ranges'), 'bytes', `${asset}: video seeking`)
		const range = await fetch(`${base}${asset}`, { headers: { Range: 'bytes=0-1023' }, signal: AbortSignal.timeout(30000) })
		assert.equal(range.status, 206, `${asset}: partial video response`)
		assert.equal((await range.arrayBuffer()).byteLength, 1024, `${asset}: range length`)
	}
}
console.log(`Passed: ${news.length} localized news stories and ${newsAssets.size} media assets, including playable video ranges.`)
for (const asset of ['/images/event-2026/event-01.jpg', '/images/event-2026/event-02.jpg', '/images/event-2026/event-03.jpg', '/images/event-2026/event-04.jpeg', '/images/WhatsApp Video 2025-12-15 at 8.39.07 PM.mp4']) {
	const response = await fetch(`${base}${encodeURI(asset)}`, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
	assert.equal(response.status, 200, `${asset}: retained contest media`)
	assert.match(response.headers.get('content-type'), asset.endsWith('.mp4') ? /video\/mp4/ : /image\/jpeg/)
}
console.log('Passed: contest migrated in all three languages, permanent redirects, all winners, documents, photographs and video retained.')
