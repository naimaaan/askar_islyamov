import assert from 'node:assert/strict'

const base = process.env.BASE_URL || 'http://localhost:3000'
const production = 'https://askarislyamov.kz'
const locales = { ru: 'ru', kz: 'kk', en: 'en' }
const sections = ['', 'biography/', 'books/', 'gallery/', 'awards/', 'contest/', 'memories/', 'contacts/']
const books = ['otken-omir', 'east-kz-toponymy', 'tarikhta-kalgan', 'cultural-heritage', 'barkytbel', 'films']
const routes = Object.keys(locales).flatMap(locale => [...sections, ...books.map(book => `books/${book}/`)].map(route => `/${locale}/${route}`))
const bookTitles = { ru: new Set(), kz: new Set(), en: new Set() }
const archiveAssets = new Set()
const unavailable = { ru: 'Электронная версия пока недоступна', kz: 'Электрондық нұсқа әзірге қолжетімсіз', en: 'Digital edition is not yet available' }

const get = path => fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000), redirect: 'manual' })
const sitemapResponse = await get('/sitemap.xml')
assert.equal(sitemapResponse.status, 200)
const sitemap = await sitemapResponse.text()
const addresses = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1])
assert.deepEqual(addresses.sort(), routes.map(route => production + route).sort(), 'Sitemap must include all 42 pages')

for (const route of routes) {
	const response = await get(route)
	assert.equal(response.status, 200, route)
	const html = await response.text()
	const locale = route.split('/')[1]
	assert.ok(html.includes(`<html lang="${locales[locale]}"`), `${route}: language`)
	assert.ok(html.includes(`rel="canonical" href="${production}${route}"`), `${route}: canonical`)
	assert.match(html, /<meta property="og:image" content="https:\/\/askarislyamov\.kz\/opengraph.png"/, `${route}: share image`)
	assert.match(html, /<meta name="description" content="[^"].*?"/, `${route}: description`)
	for (const [alternate, language] of Object.entries(locales)) {
		const alternatePath = route.replace(`/${locale}/`, `/${alternate}/`)
		assert.ok(html.includes(`hrefLang="${language}" href="${production}${alternatePath}"`), `${route}: alternate ${language}`)
	}
	assert.ok(!html.includes('noise.png'), `${route}: missing texture`)
	assert.ok(!html.includes('href=""'), `${route}: empty link`)
	if (route.endsWith('/gallery/')) {
		const assets = new Set(Array.from(html.matchAll(/\/images\/archive-2026\/[a-z0-9-]+\.webp/g), match => match[0]))
		assert.equal(assets.size, 26, `${route}: imported archive materials`)
		for (const asset of assets) archiveAssets.add(asset)
	}
	if (route.endsWith('/books/otken-omir/')) {
		assert.ok(html.includes('href="/pdf/otken-omir.pdf"'), `${route}: electronic edition`)
		assert.ok(html.includes('otken-omir-cover.webp'), `${route}: supplied cover`)
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
for (const locale of Object.keys(locales)) assert.equal(bookTitles[locale].size, 6, `${locale}: unique book titles`)
assert.equal((await get('/robots.txt')).status, 200)

const redirect = await get('/?source=smoke')
assert.ok([307, 308].includes(redirect.status))
assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/kz/')
assert.equal(new URL(redirect.headers.get('location'), base).searchParams.get('source'), 'smoke')
assert.equal((await get('/ru/books/unknown-book/')).status, 404)
assert.equal((await get('/ru/unknown-page/')).status, 404)

for (const filename of ['otken-omir.pdf', 'А. Ислямов Шығыс Қазақстан топонимикасы.pdf', 'Тарихта қалған тағылым 1-287.pdf']) {
	const response = await fetch(`${base}/pdf/${encodeURIComponent(filename)}`, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
	assert.equal(response.status, 200, filename)
	assert.match(response.headers.get('content-type'), /application\/pdf/)
	assert.equal(response.headers.get('accept-ranges'), 'bytes')
}
console.log('Passed: 42 pages, sitemap, metadata, redirects, 404s, PDF files, and unavailable editions.')
for (const asset of [...archiveAssets, '/images/books/otken-omir-cover.webp']) {
	const response = await fetch(`${base}${asset}`, { method: 'HEAD', signal: AbortSignal.timeout(30000) })
	assert.equal(response.status, 200, asset)
	assert.match(response.headers.get('content-type'), /image\/webp/)
}
const electronicEdition = await fetch(`${base}/pdf/otken-omir.pdf`, { method: 'HEAD' })
assert.ok(Number(electronicEdition.headers.get('content-length')) < 2_000_000, 'Memoir must use the new electronic edition')
console.log('Passed: 26 archive materials in three languages, the new cover and the electronic memoir.')
