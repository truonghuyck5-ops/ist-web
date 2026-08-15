import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const siteUrl = 'https://insangtao.net'
const publicRoutes = new Map([
  ['dist/index.html', { path: '/', type: 'website' }],
  ['dist/bang-hieu/index.html', { path: '/bang-hieu/', type: 'website' }],
  ['dist/combo-mo-quan/index.html', { path: '/combo-mo-quan/', type: 'website' }],
  ['dist/tem-nhan/index.html', { path: '/tem-nhan/', type: 'website' }],
  ['dist/hoa-don/index.html', { path: '/hoa-don/', type: 'website' }],
  ['dist/blog/index.html', { path: '/blog/', type: 'website' }],
  ['dist/blog/gia-bang-hieu-alu/index.html', { path: '/blog/gia-bang-hieu-alu/', type: 'article' }],
  ['dist/blog/in-tem-nhan-so-luong-it/index.html', { path: '/blog/in-tem-nhan-so-luong-it/', type: 'article' }],
])

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1]
}

function metaContent(html, key, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => attribute(tag, key) === value)
  return tag && attribute(tag, 'content')
}

const descriptions = new Set()

for (const [file, route] of publicRoutes) {
  const html = readFileSync(file, 'utf8')
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim()
  const description = metaContent(html, 'name', 'description')
  const canonicalTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]).filter((tag) => attribute(tag, 'rel') === 'canonical')
  const canonical = canonicalTags[0] && attribute(canonicalTags[0], 'href')

  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${file}: exactly one H1`)
  assert.ok(/<html\b[^>]*\blang=["']vi["']/i.test(html), `${file}: lang=vi`)
  assert.ok(title, `${file}: title`)
  assert.ok(description, `${file}: description`)
  assert.equal(canonicalTags.length, 1, `${file}: one canonical`)
  assert.equal(canonical, `${siteUrl}${route.path}`, `${file}: production canonical`)
  assert.equal(metaContent(html, 'property', 'og:title'), title, `${file}: og title`)
  assert.equal(metaContent(html, 'property', 'og:description'), description, `${file}: og description`)
  assert.equal(metaContent(html, 'property', 'og:url'), canonical, `${file}: og url`)
  assert.equal(metaContent(html, 'property', 'og:type'), route.type, `${file}: og type`)
  assert.ok(metaContent(html, 'property', 'og:image')?.startsWith(siteUrl), `${file}: og image`)
  assert.equal(metaContent(html, 'name', 'twitter:title'), title, `${file}: twitter title`)
  assert.equal(metaContent(html, 'name', 'twitter:description'), description, `${file}: twitter description`)
  assert.ok(metaContent(html, 'name', 'twitter:image')?.startsWith(siteUrl), `${file}: twitter image`)
  assert.ok(!/href=["'][^"']+\.html(?:["'#?])/i.test(html), `${file}: no internal .html links`)
  assert.ok(!descriptions.has(description), `${file}: duplicate description`)
  descriptions.add(description)

  for (const script of [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]) {
    assert.doesNotThrow(() => JSON.parse(script[1]), `${file}: valid JSON-LD`)
  }
}

const homeHtml = readFileSync('dist/index.html', 'utf8')
assert.match(homeHtml, /"@type":"Organization"/, 'homepage organization JSON-LD')

for (const articleFile of ['dist/blog/gia-bang-hieu-alu/index.html', 'dist/blog/in-tem-nhan-so-luong-it/index.html']) {
  const html = readFileSync(articleFile, 'utf8')
  assert.match(html, /"@type":"BlogPosting"/, `${articleFile}: BlogPosting JSON-LD`)
  assert.doesNotMatch(html, /"(?:author|datePublished|dateModified)":/, `${articleFile}: no invented author/date`)
}

const sitemap = readFileSync('dist/sitemap.xml', 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const expectedSitemapUrls = [...publicRoutes.values()].map((route) => `${siteUrl}${route.path}`)
assert.deepEqual(sitemapUrls, expectedSitemapUrls, 'sitemap routes')
assert.ok(!sitemap.includes('foundation-fixture'), 'sitemap excludes draft fixture')
assert.ok(!sitemap.includes('/kinh-doanh'), 'sitemap excludes kinh-doanh')
assert.ok(!sitemap.includes('.html'), 'sitemap excludes legacy html')

const robots = readFileSync('dist/robots.txt', 'utf8')
assert.match(robots, /^User-agent: \*/m, 'robots allows public crawl')
assert.match(robots, new RegExp(`Sitemap: ${siteUrl}/sitemap\\.xml`), 'robots points to production sitemap')

console.log(`SEO ARCHITECTURE: PASS (${publicRoutes.size} public routes)`)
