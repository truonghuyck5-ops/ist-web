import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = route => readFileSync('dist' + route + 'index.html', 'utf8')
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const bang = read('/bang-hieu/')
const checklist = bang.match(/<section\b[^>]*id="quote-preparation"[^>]*>([\s\S]*?)<\/section>/)?.[1]
assert.ok(checklist, 'quote checklist section exists')
assert.match(checklist, /<h2[^>]*id="quote-preparation-heading"[^>]*>GỬI GÌ ĐỂ IST BÁO GIÁ\?<\/h2>/)
assert.ok(text(checklist).includes('Để IST tư vấn và báo giá nhanh hơn, bạn có thể gửi:'))
assert.deepEqual([...checklist.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(([, item]) => text(item)), [
  'Hình mặt tiền hoặc vị trí cần làm bảng hiệu',
  'Kích thước dự kiến',
  'Nội dung / logo cần thể hiện',
  'Mẫu bảng hiệu bạn thích nếu có',
  'Địa điểm thi công và yêu cầu thời gian nếu có',
])
assert.ok(text(checklist).includes('Chưa có đủ thông tin cũng không sao. IST có thể tư vấn từ hình ảnh hiện trạng trước.'))
assert.match(checklist, /href="#contact"[^>]*>Gửi hình để IST tư vấn/)
assert.doesNotMatch(checklist, /<(?:form|input)\b/, 'no upload form or inputs')
assert.ok(bang.indexOf('id="pricing"') < bang.indexOf('id="quote-preparation"'))
assert.ok(bang.indexOf('id="quote-preparation"') < bang.indexOf('id="faq-heading"'))

for (const [html, route, label] of [
  [checklist, '/blog/gia-bang-hieu-alu/', 'Giá bảng hiệu alu phụ thuộc vào những gì?'],
  [read('/tem-nhan/'), '/blog/in-tem-nhan-so-luong-it/', 'In tem nhãn số lượng ít có được không?'],
]) {
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
  const links = anchors.filter(([, attributes]) => attributes.includes('href="' + route + '"'))
  assert.equal(links.length, 1, 'one contextual link: ' + route)
  assert.ok(text(links[0][2]).startsWith(label), 'approved editorial label')
  assert.ok(links[0][1].includes('class="hv3-text-link"'), 'existing V3 link primitive')
  assert.doesNotMatch(links[0][1], /data-track-/, 'editorial links remain untracked')
  assert.match(read(route), /<h1\b/, 'article destination exists')
}
const tem = read('/tem-nhan/')
const smallUse = tem.match(/<li><span>03<\/span><div><h3>Mẫu mới &amp; đơn hàng nhỏ<\/h3>([\s\S]*?)<\/li>/)?.[1]
assert.ok(smallUse?.includes('href="/blog/in-tem-nhan-so-luong-it/"'), 'link is contextual to small orders')
console.log('GROWTH-LITE-03: PASS — approved checklist, contact CTA, placement and two existing knowledge links')
