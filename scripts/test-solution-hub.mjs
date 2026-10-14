import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { solutionStorefront, solutionConsultationNeeds } from '../src/data/solutions.js'
const read = p => readFileSync(p, 'utf8')
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const text = s => s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()
const html = read('dist/giai-phap/index.html')
assert.equal([...html.matchAll(/<h1\b/g)].length,1)
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]),'GIẢI PHÁP')
assert.match(html, /class="hv3 pv3 sv3 sv3-hub"/)
assert.ok(read('src/layouts/SolutionLayout.astro').includes('ProductLayout'))
assert.ok(html.includes('Chọn nhu cầu của bạn.') && html.includes('IST sẽ kết nối các sản phẩm và hạng mục phù hợp.'))
assert.match(html, /href="\/combo-mo-quan\/"[^>]*data-track-location="solution_hub_need"[^>]*data-track-service="combo_mo_quan"[^>]*data-track-action="view_service"/)
assert.equal(solutionConsultationNeeds.length,2)
assert.ok(solutionConsultationNeeds.every(item => item.href==='#contact' && item.action==='quote_request'))
assert.equal([...html.matchAll(/data-track-location="solution_hub_consultation"/g)].length,2)
assert.ok(!html.includes('class="pv3-index"'), 'scenario presentation differs from product catalogue')
const real = new Set(['/', '/san-pham/', '/giai-phap/', '/combo-mo-quan/', '/bang-hieu/', '/in-nhanh/', '/tem-nhan/', '/hoa-don/', '/in-kho-lon/', '/tui-xop/', '/du-an/', '/blog/'])
for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
 const href=attr(tag,'href')
 if (href?.startsWith('/')) assert.ok(real.has(href.split('#')[0]),href)
 if (href?.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`))
}
for (const route of ['', 'san-pham', 'giai-phap', 'combo-mo-quan', 'bang-hieu', 'in-nhanh', 'tem-nhan', 'hoa-don', 'in-kho-lon', 'tui-xop']) {
 const page=read('dist/'+(route?route+'/':'')+'index.html')
 const nav=page.match(/<header\b[\s\S]*?<\/header>/)[0]
 const links=[...nav.matchAll(/<a\b[^>]*>/g)].map(([tag])=>tag).filter(tag=>attr(tag,'data-track-location')==='navbar_solution')
 assert.equal(links.length,2,route+' desktop/mobile solution links')
 assert.ok(links.every(tag=>attr(tag,'href')==='/giai-phap/' && attr(tag,'data-track-action')==='view_service'))
 const footer=page.match(/<footer\b[\s\S]*?<\/footer>/)[0]
 assert.match(footer,/href="\/giai-phap\/"[^>]*>Giải pháp/)
 assert.match(footer,/href="\/combo-mo-quan\/"[^>]*>Combo mở quán/)
}
assert.match(read('dist/index.html'), /class="hv3-portal-item" href="\/combo-mo-quan\/"/)
const images=[...html.matchAll(/<img\b[^>]*>/g)].map(([tag])=>tag)
assert.equal(images.length,1);assert.equal(attr(images[0],'src'),solutionStorefront.src)
assert.equal(attr(images[0],'fetchpriority'),'high')
for(const key of ['alt','width','height']) assert.ok(attr(images[0],key))
assert.match(html,/rel="canonical" href="https:\/\/insangtao.net\/giai-phap\/"/)
assert.doesNotMatch(html,/\/giai-phap\/mo-quan\/|"@type":"(?:Product|Offer)"|aggregateRating|<video\b|carousel|data-lightbox|<input\b|<select\b/)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>/g)].length,14)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>https:\/\/insangtao.net\/giai-phap\/<\/loc>/g)].length,1)
assert.deepEqual(readdirSync('dist/giai-phap'),['index.html'])
for(const route of ['giai-phap/mo-quan','giai-phap/lam-moi-cua-hang','giai-phap/su-kien','__portal-v3'])assert.ok(!existsSync('dist/'+route))
console.log('SOLUTION HUB / REAL NEEDS / REAL TARGETS / SHARED NAV / SITEMAP14: PASS')
