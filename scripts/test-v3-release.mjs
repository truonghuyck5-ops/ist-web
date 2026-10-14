import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { siteConfig } from '../src/data/site.js'
import { featuredProjects } from '../src/data/featuredProjects.js'
const read = p => readFileSync(p, 'utf8')
const routes = ['/', '/san-pham/', '/giai-phap/', '/ve-ist/', '/bang-hieu/', '/in-nhanh/', '/tem-nhan/', '/hoa-don/', '/in-kho-lon/', '/tui-xop/', '/combo-mo-quan/', '/du-an/', '/blog/', '/blog/gia-bang-hieu-alu/', '/blog/in-tem-nhan-so-luong-it/']
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`])
const outputs = files('dist').filter(p => p.endsWith('.html'))
assert.deepEqual(outputs.map(p => p.slice(4).replace(/index\.html$/, '')).sort(), [...routes].sort(), 'exact public HTML set')
const htmls = new Map(routes.map(route => [route, read(`dist${route}index.html`)]))
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const cleanText = s => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const destinations = ['/san-pham/', '/giai-phap/', '/du-an/', '/ve-ist/']
const footerLinks = new Map([['Bảng hiệu','/bang-hieu/'],['In ấn','/in-nhanh/'],['Tem nhãn','/tem-nhan/'],['In khổ lớn','/in-kho-lon/'],['Giải pháp','/giai-phap/'],['Combo mở quán','/combo-mo-quan/'],['Biểu mẫu kinh doanh','/hoa-don/'],['Xưởng sản xuất','/ve-ist/#production'],['Công trình','/du-an/'],['Kiến thức','/blog/']])
const ids = new Map([...htmls].map(([r,h]) => [r, new Set([...h.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]))]))
let linkCount = 0
for (const [route, html] of htmls) {
 assert.match(html, /<html\b[^>]*lang="vi"/, route)
 assert.match(html, /<body\b[^>]*class="hv3(?: |")/, route)
 for (const marker of ['hv3-header','hv3-footer','hv3-contact-toggle','hv3-contact-dialog','id="main"','id="contact"']) assert.ok(html.includes(marker), `${route}: ${marker}`)
 assert.equal([...html.matchAll(/<h1\b/g)].length,1,route)
 assert.doesNotMatch(html, /class="(?:legacy-navbar|legacy-footer)|id="(?:zalo-float|phone-float)"/)
 for (const label of ['Điều hướng chính','Điều hướng di động']) {
  const nav = html.match(new RegExp(`<nav\\b[^>]*aria-label="${label}"[^>]*>([\\s\\S]*?)<\\/nav>`))?.[1]
  assert.ok(nav, `${route}: ${label}`)
  assert.deepEqual([...nav.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attr(tag,'href')), destinations, `${route}: ${label}`)
 }
 const footer = html.match(/<footer\b[^>]*class="hv3-footer"[^>]*>([\s\S]*?)<\/footer>/)?.[1]
 const links = [...footer.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
 for (const [label,href] of footerLinks) assert.ok(links.some(m => cleanText(m[2])===label && attr(m[0],'href')===href), `${route}: footer ${label}`)
 for (const fact of [siteConfig.legalName,siteConfig.contact.address,siteConfig.contact.phoneDisplay,siteConfig.contact.email]) assert.ok(footer.includes(fact),`${route}: shared NAP`)
 for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
  const href=attr(tag,'href'); assert.ok(href,`${route}: anchor href`);linkCount++
  assert.doesNotMatch(href,/localhost|127\.0\.0\.1|deploy-preview|__portal-v3|__home-v3|file:|[A-Za-z]:\\|drive\.google\.com/i,`${route}: private/future href`)
  const url=new URL(href,siteConfig.url+route)
  if (url.origin!==siteConfig.url) continue
  assert.ok(href.startsWith('/') || href.startsWith('#') || href.startsWith(siteConfig.url+'/'),`${route}: root-relative convention`)
  assert.doesNotMatch(url.pathname,/\.html$/,`${route}: HTML navigation`)
  assert.ok(routes.includes(url.pathname) || existsSync('dist'+url.pathname),`${route}: missing ${href}`)
  assert.ok(!url.search,`${route}: unexpected query`)
  if(url.hash) assert.ok(ids.get(url.pathname).has(decodeURIComponent(url.hash.slice(1))),`${route}: missing hash ${href}`)
 }
 const canonical=[...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)]
 assert.equal(canonical.length,1);assert.equal(attr(canonical[0][0],'href'),siteConfig.url+route)
 assert.doesNotMatch(html,/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i)
 for(const [tag] of html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').matchAll(/<img\b[^>]*>/g)) {
  const src=attr(tag,'src'); assert.ok(src?.startsWith('/') && existsSync('dist'+src), `${route}: image ${src}`)
  assert.ok(Number(attr(tag,'width'))>0 && Number(attr(tag,'height'))>0,`${route}: image dimensions`)
  assert.ok(attr(tag,'alt')?.trim(),`${route}: meaningful image alt`)
 }
 for(const [tag] of html.matchAll(/<(?:link|script)\b[^>]*>/g)) {
  const src=attr(tag,'src') || (attr(tag,'rel')==='stylesheet'?attr(tag,'href'):undefined)
  if(src?.startsWith('/')) assert.ok(existsSync('dist'+src),`${route}: asset ${src}`)
 }
 assert.doesNotMatch(html,/<script[^>]*src="[^"]*googletagmanager/)
}
const urls=[...read('dist/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])
assert.deepEqual(urls.sort(),routes.map(r=>siteConfig.url+r).sort())
for(const forbidden of ['__portal-v3','__home-v3','nang-luc','kien-thuc','bai-viet','kinh-doanh','san-pham/bang-hieu','san-pham/tem-nhan','giai-phap/mo-quan']) assert.ok(!existsSync(`dist/${forbidden}`), forbidden)
assert.deepEqual(readdirSync('dist/du-an'),['index.html'])
assert.equal(featuredProjects.filter(p=>p.listingVisible).length,4)
assert.ok(featuredProjects.every(p=>p.detailEnabled===false))
assert.doesNotMatch(htmls.get('/ve-ist/'),/500\s*m[²2]|15\+|1000\+/)
assert.doesNotMatch(htmls.get('/combo-mo-quan/'),/1\.990K|4\.990K/)
assert.doesNotMatch(htmls.get('/blog/gia-bang-hieu-alu/'),/1[.,]200[.,]000|hiện nay/)
assert.ok(htmls.get('/tem-nhan/').includes('id="calculator"'))
console.log(`V3 RELEASE: PASS — exact15 routes, desktop/mobile navigation, footer/NAP, ${linkCount} internal/external links, hashes, assets, sitemap, privacy and factual guards`)
