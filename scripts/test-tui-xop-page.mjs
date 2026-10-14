import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, basename } from 'node:path'
import { createHash } from 'node:crypto'
import { tuiXopHero, tuiXopGallery, tuiXopWorkshop, tuiXopCopy } from '../src/data/tuiXop.js'
import { portalItems, productGroups } from '../src/components/home-v3/content.js'
import { productFamilies } from '../src/components/product-v3/content.js'
import { homeServices } from '../src/data/homeServices.js'
import { productMenu } from '../src/data/productMenu.js'
import { products } from '../src/data/products.js'
const read = file => readFileSync(file, 'utf8')
const html = read('dist/tui-xop/index.html')
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'IN TÚI XỐP')
assert.match(html, /<body[^>]*class="hv3 pv3 xv3"/)
for (const landmark of ['main', 'nav', 'footer']) assert.ok(html.includes('<' + landmark))
const ids = ['id="samples"', 'id="uses"', 'id="branding"', 'id="process"', 'id="contact"'].map(id => html.indexOf(id))
assert.ok(ids.every((position, index) => position >= 0 && (!index || position > ids[index - 1])), 'showcase/use/capability/process/contact flow')
assert.match(html, /href="#contact"[^>]*>Nhận tư vấn \/ Báo giá/)
assert.match(html, /href="#samples"[^>]*>Xem mẫu thực tế/)
const service = homeServices.find(item => item.trackingService === 'tui_xop')
assert.equal(tuiXopCopy.introduction, service.desc, 'approved bag positioning')
assert.equal(service.href, '/tui-xop/')
assert.equal(service.astroRouteAvailable, true)
const legacy = products.find(item => item.title === 'In túi xốp')
assert.equal(tuiXopCopy.capability.replace(/^IST /, '').toLowerCase(), legacy.description.toLowerCase(), 'existing screen-print source only')
assert.ok(read('src/data/homeProfile.js').includes('Máy in lụa bán tự động'), 'consistent existing equipment source')
assert.deepEqual(tuiXopCopy.uses.map(([title]) => title), ['Shop', 'Cửa hàng', 'Hộ kinh doanh'])
assert.equal(tuiXopCopy.steps.length, 4)
const copy = JSON.stringify([tuiXopCopy, tuiXopGallery.map(({title, description, alt}) => ({title, description, alt})), tuiXopHero.alt, tuiXopWorkshop.alt])
assert.doesNotMatch(copy, /\b(?:HD|PE|PP)\b|micron|độ dày|trọng lượng|\d|tối thiểu|ít nhất|thời gian|ngày|giờ|bền màu|chống nước|an toàn thực phẩm|thân thiện môi trường|tái chế|giá\s*\/|kg|kích thước/i, 'no invented specs, quantities, delivery promises or material claims')
assert.equal(tuiXopGallery.length, 4, 'four distinct finished examples')
const media = [tuiXopHero, ...tuiXopGallery, tuiXopWorkshop]
assert.equal(new Set(media.map(item => item.src)).size, 6)
assert.equal(new Set(media.map(item => createHash('sha256').update(readFileSync('public' + item.src)).digest('hex'))).size, 6)
assert.ok(media.every(item => item.src.startsWith('/images/tui-xop/')), 'selected real bag images only')
for (const item of media) {
  const path = 'public' + item.src
  assert.ok(existsSync(path))
  assert.ok(readdirSync(dirname(path)).includes(basename(path)), 'exact filename case')
  assert.ok(item.alt && item.width > 0 && item.height > 0)
  assert.ok(html.includes(item.src))
}
const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag)
assert.equal(images.length, 6)
assert.equal(images.filter(tag => attr(tag, 'fetchpriority') === 'high').length, 1)
assert.equal(images.filter(tag => attr(tag, 'loading') === 'lazy').length, 5)
assert.equal(attr(images[0], 'src'), tuiXopHero.src)
assert.match(html, /rel="canonical" href="https:\/\/insangtao.net\/tui-xop\/"/)
assert.ok(html.includes('In túi xốp logo cho shop &amp; cửa hàng | IST'))
assert.doesNotMatch(html, /id="calculator"|calculator\.client|<input\b|<select\b|₫|aggregateRating|"@type":"Product"|<video\b|data-lightbox|carousel/i)
assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length, 1)
assert.equal([...html.matchAll(/<dialog\b/g)].length, 1)
for (const contact of ['https://zalo.me/0974313230', 'tel:0974313230', 'mailto:quangcao.insangtao@gmail.com']) assert.ok(html.includes(contact))
for (const data of [productGroups, productFamilies]) {
  const item = data.find(item => item.service === 'tui_xop')
  assert.equal(item.href, '/tui-xop/')
  assert.equal(item.action, 'view_service')
}
assert.equal(portalItems.length, 6)
assert.ok(!portalItems.some(item => item.service === 'tui_xop'), 'Quick Portal unchanged')
assert.equal(legacy.link, '/tui-xop/')
assert.equal(legacy.image, '/images/projects/tui-xop-001.JPG')
assert.ok(readdirSync('public/images/projects').includes(basename(legacy.image)))
const menu = productMenu.find(item => item.key === 'in_tui_xop')
assert.equal(menu.href, '/tui-xop/'); assert.equal(menu.status, 'active'); assert.equal(menu.astroRouteAvailable, true)
assert.match(read('dist/index.html'), /id="product-bags"[^>]*href="\/tui-xop\/"[^>]*data-track-location="home_service_card"[^>]*data-track-service="tui_xop"[^>]*data-track-action="view_service"/)
const hubRow = [...read('dist/san-pham/index.html').matchAll(/<a\b[^>]*class="pv3-index-row"[^>]*>[\s\S]*?<\/a>/g)].map(([row]) => row).find(row => row.includes('data-track-service="tui_xop"'))
assert.ok(hubRow.includes('href="/tui-xop/"') && hubRow.includes('Khám phá sản phẩm'))
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>/g)].length, 14)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>https:\/\/insangtao.net\/tui-xop\/<\/loc>/g)].length, 1)
for (const route of ['tui-xop/mau', 'tui-xop/gia', '__portal-v3']) assert.ok(!existsSync('dist/' + route))
assert.ok(!read('public/_redirects').includes('/tui-xop'), 'no invented historical redirect')
for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
  const href = attr(tag, 'href')
  if (href?.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`))
  if (attr(tag, 'data-track-event')) assert.doesNotMatch(tag, /data-track-(?:customer|name|title|price|quantity)=/)
}
console.log('TUI XOP V3 / REAL FINISHED BAGS / VERIFIED COPY / DISCOVERY / SITEMAP14 / PRIVACY: PASS')
