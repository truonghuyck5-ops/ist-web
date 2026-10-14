import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { homeProfile } from '../src/data/homeProfile.js'
import { aboutTimeline, aboutCapabilities, aboutHero, aboutWorkshop, aboutPeople, aboutProcess } from '../src/data/about.js'
const read = p => readFileSync(p, 'utf8')
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const text = s => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const html = read('dist/ve-ist/index.html')
const section = id => html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))?.[0]
assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'VỀ IST')
assert.match(html, /class="hv3 pv3 av3"/)
assert.ok(read('src/pages/ve-ist/index.astro').includes('ProductLayout'))
assert.ok(html.includes('IST / VỀ CHÚNG TÔI') && html.includes('Thiết kế, in ấn, sản xuất và thi công trong một quy trình.'))
assert.match(html, /href="#capabilities"[^>]*>Xem năng lực/)
assert.deepEqual(aboutTimeline.map(x => x.label), ['2016', '2022', 'HIỆN TẠI'])
assert.equal([...section('story').matchAll(/<li\b/g)].length, 3)
for (const item of aboutTimeline) assert.ok(section('story').includes(item.label) && section('story').includes(item.text))
assert.ok(read('src/components/sections/home/About.astro').includes('năm 2016') && read('src/components/sections/home/About.astro').includes('Năm 2022'))
const names = ['Thiết kế & tư vấn', 'In ấn kỹ thuật số', 'In khổ lớn', 'CNC / Laser & gia công', 'Sản xuất bảng hiệu', 'Thi công thực tế']
assert.deepEqual(aboutCapabilities.map(x => x.title), names)
assert.deepEqual([...section('capabilities').matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(([,t]) => text(t)), names)
assert.deepEqual(aboutCapabilities.map(x => x.description), homeProfile.capabilities.map(x => x.description))
const links = [...section('capabilities').matchAll(/<a\b[^>]*>/g)].map(([a]) => a)
assert.deepEqual(links.map(a => attr(a, 'href')), ['/in-nhanh/', '/tem-nhan/', '/in-kho-lon/', '/bang-hieu/'])
assert.ok(links.every(a => attr(a, 'data-track-location') === 'about_capability' && attr(a, 'data-track-action') === 'view_service'))
const media = [aboutHero, ...aboutWorkshop, ...aboutPeople]
assert.equal(media.length, 6)
assert.equal(new Set(media.map(x => x.src)).size, 6)
assert.equal(aboutWorkshop.length, 3)
assert.deepEqual(aboutPeople.map(x => x.src), ['/images/home/home-teamist-002.webp', '/images/home/home-thi-cong-001.webp'])
const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([a]) => a)
assert.equal(images.length, 6)
for (const [i, image] of images.entries()) {
 const item = media[i]
 assert.equal(attr(image, 'src'), item.src); assert.equal(attr(image, 'alt'), item.alt)
 assert.equal(attr(image, 'width'), String(item.width)); assert.equal(attr(image, 'height'), String(item.height))
 assert.equal(attr(image, 'loading'), i ? 'lazy' : 'eager'); assert.equal(attr(image, 'fetchpriority'), i ? undefined : 'high')
 assert.ok(existsSync('public' + item.src))
}
assert.ok(aboutWorkshop[0].caption.includes(homeProfile.productionMachines[0]))
assert.deepEqual(aboutProcess, homeProfile.workingProcess)
assert.equal([...section('process').matchAll(/<li\b/g)].length, 6)
assert.deepEqual([...section('process').matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(([,t]) => text(t)), homeProfile.workingProcess)
const copy = text(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''))
assert.doesNotMatch(copy, /500m²\+|500m2|15\+|1000\+|hàng đầu|dẫn đầu|công suất|mỗi ngày|khách hàng đã|chứng nhận|giải thưởng|chi nhánh|DPI|uptime|nhân viên tên|tốc độ/i)
assert.doesNotMatch(html, /data-lightbox|<video\b|carousel|"@type":"(?:Review|Product|Offer)"|aggregateRating|data-track-(?:employee|serial|image|name|title|caption)=/)
assert.ok(html.includes('CẦN IST') && html.includes('TƯ VẤN?') && html.includes('IST sẽ cùng bạn chọn phương án phù hợp.'))
assert.match(html, /rel="canonical" href="https:\/\/insangtao.net\/ve-ist\/"/)
assert.ok(text(html.match(/<title>([\s\S]*?)<\/title>/)[1]).includes('Về IST — Năng lực thiết kế, in ấn & quảng cáo'))
assert.deepEqual(readdirSync('dist/ve-ist'), ['index.html'])
assert.ok(!existsSync('dist/nang-luc') && !existsSync('src/pages/nang-luc'))
const flow = ['story', 'capabilities', 'production', 'people', 'process', 'contact'].map(id => html.indexOf(`id="${id}"`))
assert.ok(flow.every((p, i) => p >= 0 && (!i || p > flow[i - 1])))
for (const route of ['', 'san-pham', 'giai-phap', 'combo-mo-quan', 'du-an', 've-ist', 'bang-hieu', 'in-nhanh', 'tem-nhan', 'hoa-don', 'in-kho-lon', 'tui-xop']) {
 const page = read('dist/' + (route ? route + '/' : '') + 'index.html')
 const nav = page.match(/<header\b[\s\S]*?<\/header>/)[0]
 const navLinks = [...nav.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(([a]) => a).filter(a => text(a).startsWith('Năng lực'))
 assert.equal(navLinks.length, 2, route + ' desktop/mobile Năng lực')
 for (const a of navLinks) { assert.equal(attr(a, 'href'), '/ve-ist/'); assert.ok(!a.includes('data-track-event')) }
 const footer = page.match(/<footer\b[\s\S]*?<\/footer>/)[0]
 assert.match(footer, /href="\/ve-ist\/#production"[^>]*>Xưởng sản xuất/)
 assert.match(footer, /href="\/du-an\/"[^>]*>Công trình/)
 assert.match(footer, /href="\/blog\/"[^>]*>Kiến thức/)
}
const home = read('dist/index.html')
assert.match(home, /id="production"/)
assert.match(home, /href="#production">SẢN XUẤT TRỰC TIẾP/)
assert.ok(home.includes('may-in-bat-kho-lon.webp'))
const sitemap = read('dist/sitemap.xml')
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 15)
assert.equal([...sitemap.matchAll(/<loc>https:\/\/insangtao.net\/ve-ist\/<\/loc>/g)].length, 1)
assert.ok(!sitemap.includes('/nang-luc/'))
for (const [a] of html.matchAll(/<a\b[^>]*>/g)) {
 const href = attr(a, 'href')
 if (href?.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`))
 if (href?.startsWith('/')) { const [path, anchor] = href.split('#'); const target = read('dist' + path + 'index.html'); if (anchor) assert.ok(target.includes(`id="${anchor}"`)) }
 if (attr(a, 'data-track-event')) assert.doesNotMatch(a, /data-track-(?:employee|serial|image|name|title|caption|customer)=/)
}
console.log('ABOUT V3 / PUBLIC TIMELINE / SIX CAPABILITIES / APPROVED MEDIA / NO METRICS / NAV12 / SITEMAP15: PASS')
