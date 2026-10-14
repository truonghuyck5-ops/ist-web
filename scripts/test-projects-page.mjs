import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import vm from 'node:vm'
import { featuredProjects } from '../src/data/featuredProjects.js'
const read = p => readFileSync(p, 'utf8')
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const text = s => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const html = read('dist/du-an/index.html')
const approved = featuredProjects.filter(p => p.listingVisible)
assert.equal(approved.length, 4)
assert.deepEqual(approved.map(p => p.title), ['Bảng hiệu cửa hàng / hộ kinh doanh', 'Bảng hiệu Mỹ Phẩm Nbeauty', 'Hệ thống bảng hiệu Tongwei', 'Bảng hiệu Viettel Warehouse'])
assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'CÔNG TRÌNH THỰC TẾ')
assert.match(html, /class="hv3 pv3 rv3"/)
assert.match(read('src/pages/du-an/index.astro'), /ProductLayout|ProductHero|ContactCta/)
const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(([a]) => a)
assert.equal(articles.length, 4)
assert.deepEqual(articles.map(a => text(a.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)[1])), approved.map(p => p.title))
for (const [i, article] of articles.entries()) {
 const p = approved[i]
 assert.ok(article.includes(p.summary) && article.includes(p.service) && article.includes(p.caption))
 const imageTag = article.match(/<img\b[^>]*>/)[0]
 assert.equal(attr(imageTag, 'src'), p.image)
 assert.equal(attr(imageTag, 'alt'), p.imageAlt)
 assert.equal(attr(imageTag, 'width'), '1215'); assert.equal(attr(imageTag, 'height'), '911')
 assert.equal(attr(imageTag, 'loading'), i ? 'lazy' : 'eager')
 assert.equal(attr(imageTag, 'fetchpriority'), i ? undefined : 'high')
 const fallback = article.match(/<a\b[^>]*data-project-image[^>]*>/)[0]
 assert.equal(attr(fallback, 'href'), p.image)
 assert.equal(attr(fallback, 'data-caption'), p.caption)
 assert.ok(!fallback.includes('data-track-event'))
 const link = article.match(/<a\b[^>]*data-track-location="project_card"[^>]*>/)[0]
 assert.equal(attr(link, 'href'), p.serviceHref)
 assert.equal(attr(link, 'data-track-service'), 'bang_hieu')
 assert.equal(attr(link, 'data-track-action'), 'view_service')
 assert.doesNotMatch(link, /data-track-(?:title|caption|customer|project|image)/)
}
for (const p of featuredProjects.filter(p => !p.listingVisible)) assert.ok(!html.includes(p.title))
assert.doesNotMatch(html, /Xem chi tiết|href="\/du-an\/[^"#]+|listingVisible|detailEnabled|illustrative-group|named-project|<input\b|<select\b|<video\b|"@type":"(?:Project|Review)"|aggregateRating/)
assert.deepEqual(readdirSync('dist/du-an'), ['index.html'])
for (const p of featuredProjects) assert.ok(!existsSync(`dist/du-an/${p.slug}`))
assert.match(html, /<title>Công trình đã thực hiện \| In Sáng Tạo<\/title>/)
assert.match(html, /rel="canonical" href="https:\/\/insangtao.net\/du-an\/"/)
assert.ok(html.includes('Hình ảnh và phần việc IST thực hiện trong các hạng mục bảng hiệu cho cửa hàng và doanh nghiệp. Xem công trình và liên hệ tư vấn hạng mục tương tự.'))
for (const route of ['', 'san-pham', 'giai-phap', 'combo-mo-quan', 'du-an', 'bang-hieu', 'in-nhanh', 'tem-nhan', 'hoa-don', 'in-kho-lon', 'tui-xop', 've-ist']) {
 const page = read('dist/' + (route ? route + '/' : '') + 'index.html')
 const nav = page.match(/<header\b[\s\S]*?<\/header>/)[0]
 const links = [...nav.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(([a]) => a).filter(a => text(a).startsWith('Công trình'))
 assert.equal(links.length, 2, route + ' desktop/mobile Projects')
 for (const a of links) { assert.equal(attr(a, 'href'), '/du-an/'); assert.ok(!a.includes('data-track-event')) }
 assert.match(page.match(/<footer\b[\s\S]*?<\/footer>/)[0], /href="\/du-an\/"[^>]*>Công trình/)
}
const home = read('dist/index.html')
assert.match(home, /href="\/du-an\/"[^>]*data-track-action="view_projects"[^>]*>Xem tất cả công trình/)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>/g)].length, 15)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>https:\/\/insangtao.net\/du-an\/<\/loc>/g)].length, 1)

// Exercise the actual reused browser script, including unsupported native dialog.
const source = read('src/scripts/project-lightbox.client.js')
function fixture(supported = true, failOpen = false) {
 const listeners = new Map(), triggerListeners = new Map(), buttonListeners = new Map()
 const image = { src: '', alt: '', removeAttribute(name) { if (name === 'src') this.src = '' } }
 const caption = { textContent: '' }, button = { focused: 0, focus() { this.focused++ }, addEventListener(n, f) { buttonListeners.set(n, f) } }
 const dialog = { open: false, className: '', innerHTML: '', setAttribute() {}, querySelector(s) { return s === 'button' ? button : s === 'img' ? image : caption }, addEventListener(n, f) { listeners.set(n, f) }, showModal() { if (failOpen) throw Error('unavailable'); this.open = true }, close() { this.open = false; listeners.get('close')() } }
 const trigger = { href: 'https://example.test/image.webp', dataset: { caption: 'Approved caption' }, focused: 0, querySelector() { return { alt: 'Approved alt' } }, addEventListener(n, f) { triggerListeners.set(n, f) }, focus(options) { this.focused++; this.options = options } }
 const body = { style: { overflow: 'auto' }, appended: [], append(d) { this.appended.push(d) } }
 const ctx = { document: { querySelectorAll() { return [trigger] }, createElement() { return dialog }, body } }
 if (supported) ctx.HTMLDialogElement = class { showModal() {} }
 vm.runInNewContext(source, ctx)
 const click = extra => { const e = { defaultPrevented: false, button: 0, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, prevented: false, preventDefault() { this.prevented = true }, ...extra }; triggerListeners.get('click')?.(e); return e }
 return { body, dialog, image, caption, button, trigger, listeners, buttonListeners, click, triggerListeners }
}
const unsupported = fixture(false)
assert.equal(unsupported.body.appended.length, 0)
assert.equal(unsupported.triggerListeners.size, 0, 'unsupported browsers retain real href navigation')
const failed = fixture(true, true)
assert.equal(failed.click().prevented, false)
assert.equal(failed.body.style.overflow, 'auto')
assert.equal(failed.trigger.focused, 0)
const f = fixture()
assert.equal(f.body.appended.length, 1)
assert.equal((f.dialog.innerHTML.match(/<img\b/g) || []).length, 1)
assert.equal((f.dialog.innerHTML.match(/<button\b/g) || []).length, 1)
for (const extra of [{ button: 1 }, { ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { defaultPrevented: true }]) {
 assert.equal(f.click(extra).prevented, false); assert.equal(f.dialog.open, false)
}
assert.equal(f.click().prevented, true)
assert.equal(f.dialog.open, true)
assert.equal(f.body.style.overflow, 'hidden')
assert.equal(f.image.src, f.trigger.href); assert.equal(f.image.alt, 'Approved alt'); assert.equal(f.caption.textContent, 'Approved caption')
assert.equal(f.button.focused, 1)
for (const shiftKey of [false, true]) {
 const e = { key: 'Tab', shiftKey, prevented: false, preventDefault() { this.prevented = true } }
 f.listeners.get('keydown')(e); assert.equal(e.prevented, true)
}
let canceled = false
f.listeners.get('cancel')({ preventDefault() { canceled = true } })
assert.ok(canceled && !f.dialog.open)
assert.equal(f.body.style.overflow, 'auto'); assert.equal(f.image.src, ''); assert.equal(f.trigger.focused, 1); assert.equal(f.trigger.options.preventScroll, true)
f.click(); f.buttonListeners.get('click')()
assert.equal(f.body.style.overflow, 'auto'); assert.equal(f.trigger.focused, 2)
console.log('PROJECTS V3 / APPROVED FOUR / ORDER / NAV12 / SEO / SITEMAP15 / LIGHTBOX AND FALLBACK: PASS')
