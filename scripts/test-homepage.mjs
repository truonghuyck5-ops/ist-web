import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { portalItems, productGroups } from '../src/components/home-v3/content.js'
import { featuredProjects } from '../src/data/featuredProjects.js'

const html = readFileSync('dist/index.html', 'utf8')
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const tags = (pattern) => [...html.matchAll(pattern)].map(([tag]) => tag)
const anchors = tags(/<a\b[^>]*>/g)
const supportedRoutes = new Set(['/', '/san-pham/', '/bang-hieu/', '/tem-nhan/', '/combo-mo-quan/', '/hoa-don/', '/du-an/', '/blog/'])
assert.equal(tags(/<h1\b/g).length, 1, 'one homepage H1')
assert.match(html, /<h1[^>]*><span>THIẾT KẾ\.<\/span><span>IN ẤN\.<\/span><span>QUẢNG CÁO\.<\/span><\/h1>/, 'approved H1 statement')
assert.match(html, /Từ ý tưởng đến sản phẩm hoàn thiện\./, 'approved support')
assert.match(html, /<body[^>]*>\s*<a[^>]*class="hv3-skip-link"/, 'skip link is first keyboard destination')
assert.match(html, /<a href="#production">SẢN XUẤT TRỰC TIẾP/, 'caption has real production destination')
assert.doesNotMatch(html, /Về IST|Bản mẫu giao diện|quick-needs|floating-pulse|data-lightbox|data-reveal/, 'old homepage/prototype presentation is detached')
assert.equal(tags(/<a\b[^>]*class="hv3-portal-item"[^>]*>/g).length, 6, 'six rendered Quick Portal entries')
assert.equal(tags(/<a\b[^>]*class="hv3-project"[^>]*>/g).length, 4, 'four rendered approved projects')
assert.equal(featuredProjects.filter(p => p.homepageFeatured).length, 4, 'shared project data is source of truth')
assert.equal(tags(/<button\b[^>]*id="hv3-contact-toggle"[^>]*>/g).length, 1, 'single floating consultation trigger')
assert.equal(tags(/<dialog\b/g).length, 1, 'single native consultation dialog')
assert.doesNotMatch(html, /aria-label="(?:Nhắn Zalo cho In Sáng Tạo|Gọi In Sáng Tạo)"/, 'old floating pair is absent')
const quickLinks = tags(/<a\b[^>]*class="hv3-portal-item"[^>]*>/g)
assert.deepEqual(quickLinks.map(tag => attribute(tag, 'href')), ['/bang-hieu/', '#contact', '/tem-nhan/', '/combo-mo-quan/', '#contact', '/hoa-don/'], 'Portal uses only real routes/contact')
const productLinks = tags(/<a\b[^>]*class="hv3-product-row"[^>]*>/g)
assert.deepEqual(productLinks.map(tag => attribute(tag, 'href')), ['/bang-hieu/', '#contact', '/tem-nhan/', '#contact', '/hoa-don/', '#contact'], 'Explorer routes/contact')
for (const [links, data, location] of [[quickLinks, portalItems, 'home_quick_need'], [productLinks, productGroups, 'home_service_card']]) {
  for (const [i, tag] of links.entries()) {
    assert.equal(attribute(tag, 'data-track-event'), 'service_cta_click', 'existing service event')
    assert.equal(attribute(tag, 'data-track-location'), location, 'existing placement')
    assert.equal(attribute(tag, 'data-track-service'), data[i].service, 'verified generic service')
    assert.equal(attribute(tag, 'data-track-action'), data[i].href.startsWith('/') ? 'view_service' : 'quote_request', 'action matches destination')
  }
}
for (const tag of anchors) {
  const href = attribute(tag, 'href')
  if (href?.startsWith('/')) assert.ok(supportedRoutes.has(href), 'existing route: ' + href)
  if (href?.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`), 'existing anchor: ' + href)
  if (attribute(tag, 'data-track-event')) assert.doesNotMatch(tag, /data-track-(?:title|customer|project|caption|name)=/, 'no identifying/free-text tracking payload')
}
assert.ok(anchors.some(tag => attribute(tag, 'href') === '/du-an/'), 'real projects listing link')
assert.doesNotMatch(html, /__portal-v3|\/images\/portal-v3\/|\/san-pham\/bang-hieu\/|\/giai-phap\//, 'no prototype or future route artifacts')
assert.ok(!existsSync('dist/__portal-v3'), 'prototype route absent')
const files = (dir) => readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)])
assert.equal(files('dist').filter(f => f.endsWith('.html')).length, 10, 'exactly ten public HTML pages')
assert.equal(tags(/<img\b[^>]*fetchpriority="high"[^>]*>/g).length, 1, 'hero only high-priority image')
const images = tags(/<img\b[^>]*>/g)
assert.equal(images.length, 13, 'approved image instances')
assert.equal(images.filter(tag => attribute(tag, 'loading') === 'lazy').length, 12, 'below-fold images lazy')
for (const tag of images) for (const field of ['alt', 'width', 'height']) assert.ok(attribute(tag, field), 'image ' + field)
assert.match(html, /<link rel="canonical" href="https:\/\/insangtao.net\/"/, 'production Homepage canonical')
assert.match(html, /"@type":"Organization"/, 'verified Organization JSON-LD')
assert.doesNotMatch(html, /<meta name="robots" content="noindex/, 'candidate preserves indexable production SEO')
console.log('HOMEPAGE CANDIDATE CONTRACT: PASS')
