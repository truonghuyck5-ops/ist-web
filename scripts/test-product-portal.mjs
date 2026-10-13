import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { productFamilies, signageOptions } from '../src/components/product-v3/content.js'
import { bangHieuTypes } from '../src/data/bangHieuTypes.js'
import { featuredProjects } from '../src/data/featuredProjects.js'

const read = path => readFileSync(path, 'utf8')
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const hub = read('dist/san-pham/index.html')
const signs = read('dist/bang-hieu/index.html')
const home = read('dist/index.html')
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const paths = new Set(['/', '/san-pham/', '/bang-hieu/', '/tem-nhan/', '/hoa-don/', '/combo-mo-quan/', '/du-an/', '/blog/'])

assert.equal(text(hub.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'SẢN PHẨM & DỊCH VỤ')
assert.equal(text(signs.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'BẢNG HIỆU QUẢNG CÁO')
assert.deepEqual(productFamilies.map(item => item.title), ['Bảng hiệu', 'In nhanh', 'Tem nhãn', 'In khổ lớn', 'Hóa đơn & biểu mẫu', 'Túi xốp'])
const familyLinks = [...hub.matchAll(/<a\b[^>]*class="pv3-index-row"[^>]*>/g)].map(([tag]) => tag)
assert.equal(familyLinks.length, 6, 'six editorial catalogue entries')
assert.deepEqual(familyLinks.map(tag => attribute(tag, 'href')), ['/bang-hieu/', '#contact', '/tem-nhan/', '#contact', '/hoa-don/', '#contact'])
assert.equal(new Set(productFamilies.map(item => item.media.src)).size, 6, 'distinct family images')
for (const family of productFamilies) assert.ok(text(hub).includes(family.title) && text(hub).includes(family.detail), 'rendered family copy')
const rows = [...hub.matchAll(/<a\b[^>]*class="pv3-index-row"[^>]*>[\s\S]*?<\/a>/g)].map(([row]) => row)
for (const [index, row] of rows.entries()) if (productFamilies[index].href === '#contact') {
  assert.ok(row.includes('Nhận tư vấn'), 'unavailable family consultation label')
  assert.doesNotMatch(row, /Xem chi tiết|Khám phá sản phẩm/, 'no misleading detail CTA')
}
assert.equal(signageOptions.length, bangHieuTypes.length, 'existing type data only')
for (const type of bangHieuTypes) assert.ok(signs.includes(type.title) && signs.includes(type.description), 'verified type copy preserved')
const listed = featuredProjects.filter(project => project.listingVisible && project.serviceHref === '/bang-hieu/')
assert.equal([...signs.matchAll(/<a\b[^>]*class="hv3-project"/g)].length, listed.length, 'shared listing-visible signage proof')
for (const project of listed) assert.ok(signs.includes(project.title) && signs.includes(project.image), 'shared project content')
assert.match(signs, /href="\/du-an\/"[^>]*data-track-location="bang_hieu_projects"/, 'real project listing CTA')
assert.ok(!signs.includes('bang-hieu-interactions'), 'old lightbox behavior detached')
for (const [path, html] of [['/san-pham/', hub], ['/bang-hieu/', signs]]) {
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'one product H1')
  for (const landmark of ['main', 'nav', 'footer']) assert.ok(html.includes(`<${landmark}`), 'semantic ' + landmark)
  assert.match(html, /<body[^>]*class="hv3 pv3"/, 'V3 product layout')
  assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length, 1, 'single consultation trigger')
  assert.equal([...html.matchAll(/<dialog\b/g)].length, 1, 'shared contact dialog')
  assert.doesNotMatch(html, /\/san-pham\/bang-hieu\/|\/in-nhanh\/|\/in-kho-lon\/|\/tui-xop\/|data-lightbox|"@type":"Product"|aggregateRating/, 'no fake future routes or schema')
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag)
  assert.equal(images.filter(tag => attribute(tag, 'fetchpriority') === 'high').length, 1, 'one priority visual per route')
  for (const [index, tag] of images.entries()) {
    for (const field of ['alt', 'width', 'height']) assert.ok(attribute(tag, field), 'image ' + field)
    assert.ok(existsSync('public' + attribute(tag, 'src')), 'local verified image')
    if (index > 0) assert.equal(attribute(tag, 'loading'), 'lazy', 'below-fold lazy')
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attribute(tag, 'href')
    if (href?.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`), 'existing local anchor')
    if (href?.startsWith('/')) {
      const [route, anchor] = href.split('#')
      assert.ok(paths.has(route), 'real route: ' + href)
      if (anchor) assert.ok(home.includes(`id="${anchor}"`), 'cross-page home anchor')
    }
    if (attribute(tag, 'data-track-event')) assert.doesNotMatch(tag, /data-track-(?:customer|title|project|name)=/, 'generic tracking only')
  }
}
for (const label of ['Khám phá sản phẩm', 'Xem tất cả sản phẩm']) assert.match(home, new RegExp(`href="/san-pham/"[^>]*>${label}`), 'Homepage hub integration')
assert.equal([...home.matchAll(/href="\/san-pham\/"[^>]*data-track-location="navbar_product"/g)].length, 2, 'desktop/mobile product navigation')
assert.match(read('dist/sitemap.xml'), /<loc>https:\/\/insangtao.net\/san-pham\/<\/loc>/, 'candidate sitemap hub')
for (const path of ['in-nhanh', 'in-kho-lon', 'tui-xop', 'san-pham/bang-hieu']) assert.ok(!existsSync('dist/' + path), 'no future route')
console.log('PRODUCT PORTAL / SIGNAGE / V3 INTEGRATION: PASS')
