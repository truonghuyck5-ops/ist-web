import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
const read = p => readFileSync(p, 'utf8')
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
const text = s => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const ids = ['gia-bang-hieu-alu', 'in-tem-nhan-so-luong-it']
const titles = ['Giá bảng hiệu alu phụ thuộc vào những gì?', 'In tem nhãn số lượng ít có được không?']
const sources = ids.map(id => read(`src/content/blog/${id}.md`))
const published = readdirSync('src/content/blog').filter(p => p.endsWith('.md') && !/^draft:\s*true\s*$/m.test(read('src/content/blog/' + p))).map(p => p.slice(0, -3)).sort()
assert.deepEqual(published, ids)
for (const source of sources) {
 const metadata = source.split('---')[1]
 assert.doesNotMatch(metadata, /^(?:publishedAt|updatedAt|author):/m)
 assert.match(metadata, /^imageAlt: .+/m); assert.match(metadata, /^imageWidth: \d+/m); assert.match(metadata, /^imageHeight: \d+/m)
}
assert.ok(read('src/pages/blog/index.astro').includes("getCollection('blog'"))
assert.ok(read('src/pages/blog/[slug].astro').includes('render(post)'))
const hub = read('dist/blog/index.html')
assert.match(hub, /class="hv3 pv3 bv3 bv3-hub"/)
assert.equal(text(hub.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'KIẾN THỨC')
assert.ok(hub.includes('IST / KIẾN THỨC') && hub.includes('Kinh nghiệm thực tế về thiết kế, in ấn và quảng cáo.'))
const rows = [...hub.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(([a]) => a)
assert.equal(rows.length, 2)
assert.deepEqual(rows.map(a => text(a.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)[1])), titles)
for (const [i, row] of rows.entries()) {
 const links = [...row.matchAll(/<a\b[^>]*>/g)].map(([a]) => a)
 assert.equal(links.length, 1); assert.equal(attr(links[0], 'href'), `/blog/${ids[i]}/`)
 assert.ok(!links[0].includes('data-track-event'))
 const image = row.match(/<img\b[^>]*>/)[0]
 assert.equal(attr(image, 'loading'), i ? 'lazy' : 'eager')
 assert.equal(attr(image, 'fetchpriority'), i ? undefined : 'high')
}
const articles = ids.map(id => read(`dist/blog/${id}/index.html`))
for (const [i, html] of articles.entries()) {
 assert.match(html, /class="hv3 pv3 bv3 bv3-article"/)
 assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), titles[i])
 assert.match(html, /class="bv3-reading"/); assert.match(html, /class="bv3-prose"/)
 assert.ok([...html.matchAll(/<h2\b/g)].length >= 5)
 assert.ok(html.includes('<ul>') && html.includes('<li>'))
 assert.doesNotMatch(html, /<time\b|IST Editorial Team|Đăng ngày|Cập nhật|"(?:datePublished|dateModified|author)":|aggregateRating|"@type":"(?:FAQPage|Review)"|<video\b|carousel/)
 const image = html.match(/<img\b[^>]*>/)[0]
 const src = i ? '/images/projects/tem-nhan-001.jpg' : '/images/projects/bang-hieu-001.jpg'
 assert.equal(attr(image, 'src'), src); assert.ok(existsSync('public' + src))
 assert.equal(attr(image, 'width'), i ? '1215' : '1214'); assert.equal(attr(image, 'height'), '911')
 assert.equal(attr(image, 'alt'), i ? 'Mẫu tem nhãn tròn được cầm tại IST' : 'Bảng quảng cáo trước xưởng IST')
 assert.equal(attr(image, 'fetchpriority'), 'high'); assert.equal(attr(image, 'loading'), 'eager')
 const related = html.match(/<section class="bv3-related[\s\S]*?<\/section>/)[0]
 const links = [...related.matchAll(/<a\b[^>]*>/g)].map(([a]) => a)
 assert.deepEqual(links.map(a => attr(a, 'href')), i ? ['/tem-nhan/', '/tem-nhan/#calculator'] : ['/bang-hieu/', '/du-an/'])
 assert.ok(links.every(a => attr(a, 'data-track-service') === (i ? 'tem_nhan' : 'bang_hieu') && attr(a, 'data-track-location') === 'blog_related'))
 for (const a of links) assert.doesNotMatch(a, /data-track-(?:title|customer|date|author|caption|image|name)=/)
 const body = html.match(/<div class="bv3-prose">([\s\S]*?)<\/div>/)[1]
 assert.equal([...body.matchAll(/<a\b/g)].length, 1)
 assert.ok(body.includes(`href="/${i ? 'tem-nhan' : 'bang-hieu'}/"`))
 assert.match(html, /href="\/blog\/"[^>]*>[\s\S]*?Quay lại Kiến thức/)
 const back = html.indexOf('class="hv3-container bv3-back"')
 assert.ok(back > html.indexOf('class="bv3-related') && back < html.indexOf('id="contact"'))
 const json = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(([,s]) => JSON.parse(s)).find(x => x['@type'] === 'BlogPosting')
 assert.ok(json); assert.equal(json.mainEntityOfPage['@id'], `https://insangtao.net/blog/${ids[i]}/`)
 assert.ok(json.image.endsWith(src)); assert.ok(!json.author && !json.datePublished && !json.dateModified)
}
// Chosen freshness policy: no number and no current-time claim, rather than a new price.
assert.doesNotMatch(sources[0] + articles[0] + hub, /1[.,]200[.,]000|1\.2TR|hiện nay|bền hơn bảng hiflex/i)
assert.ok(articles[0].includes('Cách nhận báo giá phù hợp') && articles[0].includes('điều kiện thi công'))
assert.doesNotMatch(articles[1], /chống nước|waterproof|thực phẩm an toàn|chứng nhận|tối thiểu|lấy ngay|lấy liền|trong ngày|tem gấp|tổng chi phí ban đầu lại thấp|\d[.,]\d{3}.*(?:₫|đ\/)/i)
assert.ok(read('dist/tem-nhan/index.html').includes('id="calculator"'))
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(dir + '/' + e.name) : [dir + '/' + e.name])
const pages = files('dist').filter(p => p.endsWith('.html'))
assert.equal(pages.length, 15)
for (const file of pages) {
 const html = read(file)
 assert.match(html, /<body[^>]*class="hv3(?: |")/, file + ' all public routes V3')
 assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
 assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length, 1)
 const nav = html.match(/<nav class="hv3-desktop-nav"[\s\S]*?<\/nav>/)[0]
 assert.deepEqual([...nav.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/g)].map(([,s]) => text(s)), ['Sản phẩm', 'Giải pháp', 'Công trình', 'Năng lực'])
 assert.ok(!nav.includes('/blog/'))
 const footer = html.match(/<footer class="hv3-footer"[\s\S]*?<\/footer>/)[0]
 assert.match(footer, /href="\/blog\/"[^>]*>Kiến thức/)
 assert.ok(html.includes('class="hv3-contact hv3-section"'))
}
assert.deepEqual(readdirSync('dist/blog').sort(), ['gia-bang-hieu-alu', 'in-tem-nhan-so-luong-it', 'index.html'])
for (const route of ['kien-thuc', 'bai-viet', 'blog/foundation-fixture']) assert.ok(!existsSync('dist/' + route))
const sitemap = read('dist/sitemap.xml')
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 15)
for (const path of ['/blog/', ...ids.map(id => `/blog/${id}/`)]) assert.equal(sitemap.split(`<loc>https://insangtao.net${path}</loc>`).length - 1, 1)
assert.match(read('src/styles/blog-v3.css'), /max-width: 760px/)
assert.match(read('src/styles/blog-v3.css'), /min-height: 44px/)
console.log('BLOG V3 / COLLECTION2 / NEUTRAL PRICE POLICY / RELATED SERVICES / NO INVENTED METADATA / ALL15 V3 / SITEMAP15: PASS')
