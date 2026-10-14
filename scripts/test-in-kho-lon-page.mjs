import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { inKhoLonTypes, inKhoLonHero, inKhoLonGallery } from '../src/data/inKhoLon.js'
import { portalItems, productGroups } from '../src/components/home-v3/content.js'
import { productFamilies } from '../src/components/product-v3/content.js'
import { homeServices } from '../src/data/homeServices.js'
const read = file => readFileSync(file, 'utf8')
const html = read('dist/in-kho-lon/index.html')
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const attr = (tag,key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
assert.equal([...html.matchAll(/<h1\b/g)].length,1,'one H1')
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]),'IN KHỔ LỚN')
assert.match(html,/<body[^>]*class="hv3 pv3 kv3"/,'shared V3 product shell')
for (const tag of ['main','nav','footer']) assert.ok(html.includes('<'+tag),'landmark '+tag)
assert.match(html,/href="#contact"[^>]*>Nhận tư vấn \/ Báo giá/)
assert.match(html,/href="#products"[^>]*>Xem sản phẩm/)
const ids=['id="products"','id="outputs"','id="production"','id="uses-heading"','id="process-heading"','id="contact"'].map(id=>html.indexOf(id))
assert.ok(ids.every((position,index)=>position>=0 && (!index||position>ids[index-1])),'requested flow')
assert.deepEqual(inKhoLonTypes.map(item=>item.title),['Bạt / Hiflex','Decal','PP & standee'])
const verified = [read('src/data/homeProfile.js'),read('src/data/homeServices.js'),read('src/data/comboItems.js'),read('src/components/sections/home/Capabilities.astro')].join('\n')
for (const token of ['hiflex','decal','PP','standee','banner','backdrop']) assert.ok(verified.toLowerCase().includes(token.toLowerCase()),'verified range '+token)
for (const type of inKhoLonTypes) {assert.ok(text(html).includes(type.title));assert.equal(type.href,'#contact');assert.equal(type.service,'in_kho_lon');assert.equal(type.action,'quote_request')}
assert.equal([...html.matchAll(/class="pv3-index-row pv3-index-text"/g)].length,3,'editorial types without generic cards')
assert.equal(inKhoLonGallery.length,4,'four curated examples')
const images=[...html.matchAll(/<img\b[^>]*>/g)].map(([tag])=>tag)
assert.equal(images.length,6,'hero, four outputs, one production proof')
assert.equal(images.filter(tag=>attr(tag,'fetchpriority')==='high').length,1)
assert.equal(images.filter(tag=>attr(tag,'loading')==='lazy').length,5)
assert.ok(html.includes(inKhoLonHero.src),'real finished application hero')
assert.notEqual(inKhoLonHero.src,'/images/home/may-in-bat-kho-lon.webp','machine reserved for proof')
for (const tag of images) {for(const key of ['alt','width','height']) assert.ok(attr(tag,key),'image '+key);assert.ok(existsSync('public'+attr(tag,'src')),'local real asset')}
assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length,1)
assert.equal([...html.matchAll(/<dialog\b/g)].length,1)
for(const token of ['https://zalo.me/0974313230','tel:0974313230','mailto:quangcao.insangtao@gmail.com']) assert.ok(html.includes(token),'verified contact')
assert.doesNotMatch(html,/id="calculator"|calculator\.client|<input\b|₫|aggregateRating|"@type":"Product"|<video\b|data-lightbox/,'no invented calculator, prices, schema, video or carousel')
assert.match(html,/rel="canonical" href="https:\/\/insangtao.net\/in-kho-lon\/"/)
assert.ok(html.includes('In khổ lớn — Bạt, Decal, PP &amp; Standee | IST'))
for (const data of [portalItems,productGroups,productFamilies]) {const item=data.find(item=>item.service==='in_kho_lon');assert.equal(item.href,'/in-kho-lon/');assert.equal(item.action,'view_service')}
assert.equal(homeServices.find(item=>item.trackingService==='in_kho_lon').astroRouteAvailable,true)
const home=read('dist/index.html'), hub=read('dist/san-pham/index.html')
for (const marker of ['home_quick_need','home_service_card']) assert.match(home,new RegExp(`href="/in-kho-lon/"[^>]*data-track-location="${marker}"[^>]*data-track-service="in_kho_lon"[^>]*data-track-action="view_service"`))
assert.match(hub,/href="\/in-kho-lon\/"[^>]*data-track-location="product_hub_catalogue"/)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>/g)].length,15)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>https:\/\/insangtao.net\/in-kho-lon\/<\/loc>/g)].length,1)
for(const route of ['in-kho-lon/bat','in-kho-lon/decal']) assert.ok(!existsSync('dist/'+route))
assert.ok(!read('public/_redirects').includes('/in-kho-lon'),'no invented historical redirect')
for(const [tag] of html.matchAll(/<a\b[^>]*>/g)) {const href=attr(tag,'href');if(href?.startsWith('#'))assert.ok(html.includes(`id="${href.slice(1)}"`));if(attr(tag,'data-track-event'))assert.doesNotMatch(tag,/data-track-(?:customer|name|title|price)=/)}
const pages = readdirSync('dist',{withFileTypes:true}).filter(item=>item.isDirectory() && existsSync('dist/'+item.name+'/index.html')).map(item=>item.name)
assert.ok(pages.includes('in-kho-lon'))
console.log('IN KHO LON V3 / VERIFIED RANGE / REAL MEDIA / DISCOVERY / SITEMAP15 / PRIVACY: PASS')
