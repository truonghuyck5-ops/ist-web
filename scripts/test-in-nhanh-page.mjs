import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { inNhanhHero, inNhanhGroups, inNhanhGallery, inNhanhProduction, inNhanhRelated, inNhanhCopy } from '../src/data/inNhanh.js'
import { portalItems, productGroups } from '../src/components/home-v3/content.js'
import { productFamilies } from '../src/components/product-v3/content.js'
const read = file => readFileSync(file, 'utf8')
const html = read('dist/in-nhanh/index.html')
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const region = id => html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))?.[0]
assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'IN NHANH')
assert.match(html, /<body[^>]*class="hv3 pv3 qv3"/)
for (const landmark of ['main', 'nav', 'footer']) assert.ok(html.includes('<' + landmark))
assert.ok(html.includes(inNhanhCopy.introduction))
assert.match(html, /href="#contact"[^>]*>Nhận tư vấn \/ Báo giá/)
assert.match(html, /href="#products"[^>]*>Xem sản phẩm/)
const flow = ['products', 'samples', 'production', 'uses', 'related', 'process', 'contact'].map(id => html.indexOf(`id="${id}"`))
assert.ok(flow.every((value, index) => value >= 0 && (!index || value > flow[index - 1])), 'approved page flow')
const names = ['Danh thiếp', 'Tag giấy', 'Voucher / Thẻ tích điểm', 'Tờ rơi / Tờ gấp', 'Menu giấy']
assert.deepEqual(inNhanhGroups.map(item => item.title), names)
assert.deepEqual([...region('products').matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(([,value]) => text(value)), names, 'exactly five rendered groups')
assert.doesNotMatch(region('products'), /Catalogue|Thiệp|Tài liệu|Letterhead|Envelope|Tem nhãn|Hóa đơn|In khổ lớn/i)
assert.ok(inNhanhGroups.every(item => item.href === '#contact' && item.service === 'in_nhanh' && item.action === 'quote_request'))
assert.equal(inNhanhGallery.length, 5)
assert.equal([...region('samples').matchAll(/<figure\b/g)].length, 5)
assert.equal(new Set(inNhanhGallery.map(item => item.src)).size, 5)
assert.deepEqual(inNhanhRelated.map(item => item.href), ['/tem-nhan/', '/hoa-don/', '/in-kho-lon/', '/combo-mo-quan/'])
const related = [...region('related').matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag)
assert.deepEqual(related.map(tag => attr(tag, 'href')), inNhanhRelated.map(item => item.href))
assert.ok(related.every(tag => attr(tag, 'data-track-action') === 'view_service'))
assert.match(region('related'), /nhãn dán|sticker/)
assert.match(region('related'), /Menu dạng bảng, PP trưng bày, standee/)
assert.equal(inNhanhProduction.src, '/images/home/may-in-nhanh-konica.webp')
assert.deepEqual([inNhanhProduction.width, inNhanhProduction.height], [810,1080])
assert.match(region('production'), /Konica C2060L/)
assert.ok(read('src/data/homeProfile.js').includes('Máy in nhanh Konica C2060L'))
assert.equal(inNhanhCopy.steps.length, 4)
const visibleCopy = text(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ''))
assert.doesNotMatch(visibleCopy, /lấy ngay|lấy liền|trong ngày|cùng ngày|chờ lấy|cam kết.*(?:giờ|ngày)|SLA|gsm|phút|dpi|thành viên nhựa|100k|giảm 50%|giảm 1%/i, 'no SLA, machine specs, plastic-card or artwork promotion claim')
assert.doesNotMatch(html, /id="(?:calculator|pricing|faq)"|calculator\.client|<input\b|<select\b|<table\b|₫|FAQPage|"@type":"Product"|aggregateRating|<video\b|carousel|data-lightbox/i)
const media = [inNhanhHero, ...inNhanhGroups.map(item => item.media), ...inNhanhGallery, inNhanhProduction]
for (const item of media) {
 assert.ok(existsSync('public' + item.src))
 assert.ok(item.alt && item.width > 0 && item.height > 0)
 assert.ok(html.includes(item.src))
}
assert.deepEqual(readdirSync('public/images/in-nhanh').sort(), ['danh-thiep.webp','menu-giay.webp','the-tich-diem.webp','to-roi.webp'], 'only four selected derivatives; approved tag/machine reused')
const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag)
assert.equal(images.length, 12)
assert.equal(images.filter(tag => attr(tag, 'fetchpriority') === 'high').length, 1)
assert.equal(images.filter(tag => attr(tag, 'loading') === 'lazy').length, 11)
assert.equal(attr(images[0], 'src'), inNhanhHero.src)
for (const tag of images) for (const name of ['src','alt','width','height']) assert.ok(attr(tag, name))
assert.match(html, /rel="canonical" href="https:\/\/insangtao.net\/in-nhanh\/"/)
assert.ok(html.includes('In nhanh — Danh thiếp, Tag &amp; Ấn phẩm giấy | IST'))
for (const [data, file, cls, detail] of [[portalItems, 'dist/index.html', 'hv3-portal-item', 'Danh thiếp · tag · voucher'], [productGroups, 'dist/index.html', 'hv3-product-row', 'Danh thiếp · tag · voucher · tờ rơi'], [productFamilies, 'dist/san-pham/index.html', 'pv3-index-row', 'Danh thiếp · tag · voucher · tờ rơi']]) {
 const item = data.find(item => item.service === 'in_nhanh')
 assert.equal(item.title, 'In nhanh'); assert.equal(item.detail, detail); assert.equal(item.href, '/in-nhanh/'); assert.equal(item.action, 'view_service')
 const row = [...read(file).matchAll(new RegExp(`<a\\b[^>]*class="${cls}"[^>]*>[\\s\\S]*?</a>`, 'g'))].map(([row]) => row).find(row => row.includes('data-track-service="in_nhanh"'))
 assert.ok(row?.includes('href="/in-nhanh/"') && row.includes(detail))
 assert.doesNotMatch(text(row), /catalogue|thiệp|Card/i)
}
assert.match(read('dist/san-pham/index.html'), /href="\/in-nhanh\/"[^>]*>[\s\S]*?Khám phá sản phẩm/)
const sitemap = read('dist/sitemap.xml')
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 15)
assert.equal([...sitemap.matchAll(/<loc>https:\/\/insangtao.net\/in-nhanh\/<\/loc>/g)].length, 1)
assert.deepEqual(readdirSync('dist/in-nhanh'), ['index.html'], 'no nested routes')
for (const route of ['__portal-v3','in-nhanh/danh-thiep','in-nhanh/tag','in-nhanh/voucher','in-nhanh/menu','san-pham/in-nhanh']) assert.ok(!existsSync('dist/' + route))
assert.ok(!read('public/_redirects').includes('/in-nhanh'), 'no invented historical redirect')
assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length, 1)
assert.equal([...html.matchAll(/<dialog\b/g)].length, 1)
for (const contact of ['https://zalo.me/0974313230','tel:0974313230','mailto:quangcao.insangtao@gmail.com']) assert.ok(html.includes(contact))
for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
 const href = attr(tag, 'href')
 if (href?.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`))
 if (attr(tag, 'data-track-event')) assert.doesNotMatch(tag, /data-track-(?:customer|name|title|price|quantity|artwork|brand)=/)
}
console.log('IN NHANH V3 / FIVE LOCKED PAPER GROUPS / REAL MEDIA / DISCOVERY / SITEMAP15 / PRIVACY: PASS')
