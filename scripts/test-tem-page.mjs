import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { temNhanPricingConfig as config } from '../src/data/temNhanPricingConfig.js'
import { siteConfig } from '../src/data/site.js'

const read = file => readFileSync(file, 'utf8')
const html = read('dist/tem-nhan/index.html')
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'one Tem H1')
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'IN TEM NHÃN')
assert.match(html, /<body[^>]*class="hv3 pv3 tv3"/, 'shared V3 product shell')
for (const id of ['calculator', 'tem-nhan-calculator-form', 'width', 'height', 'quantity', 'decal-type', 'lamination', 'export-quote-btn', 'reset-quote-btn', 'quote-result', 'quote-unit', 'quote-total', 'quote-warning', 'quote-popup', 'quote-popup-card', 'popup-overlay', 'copy-image-btn', 'save-image-btn', 'close-popup-bottom', 'reference-table-body', 'popup-date', 'popup-quote-code', 'popup-order-size', 'popup-order-material', 'popup-order-lamination', 'popup-order-quantity', 'popup-unit-price', 'popup-total-price']) {
  assert.equal([...html.matchAll(new RegExp(`id="${id}"`, 'g'))].length, 1, 'unique original calculator target: ' + id)
}
const ids = ['width', 'height', 'quantity']
for (const id of ids) {
  const tag = [...html.matchAll(/<input\b[^>]*>/g)].map(([tag]) => tag).find(tag => attribute(tag, 'id') === id)
  assert.equal(attribute(tag, 'type'), 'number', 'numeric ' + id)
  assert.ok(!attribute(tag, 'value'), 'empty default ' + id)
  assert.equal(attribute(tag, 'min'), id === 'quantity' ? '1' : String(config.minSize), 'same minimum ' + id)
  if (id !== 'quantity') assert.equal(attribute(tag, 'max'), String(config.maxSize), 'same maximum ' + id)
}
for (const [id, values] of [['decal-type', Object.keys(config.materials)], ['lamination', Object.keys(config.laminationFees)]]) {
  const select = html.match(new RegExp(`<select[^>]*id="${id}"[^>]*>([\\s\\S]*?)</select>`))[1]
  assert.deepEqual([...select.matchAll(/<option[^>]*value="([^"]+)"/g)].map(([,value]) => value), values, 'same selections/order/default: ' + id)
}
assert.match(html, /href="#calculator"[^>]*>Tính giá ngay/, 'hero calculator target')
assert.match(html, /id="calculator"[^>]*data-v3-contact-area/, 'shared consultation suppression over inputs/results')
assert.ok(html.indexOf('id="calculator"') < html.indexOf('id="tem-nhan-gallery"'), 'calculator before sample gallery')
assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length, 1, 'one general consultation control')
assert.equal([...html.matchAll(/id="hv3-contact-dialog"/g)].length, 1, 'general dialog separate from original quote popup')
assert.match(html, /id="quote-popup"[^>]*role="dialog"[^>]*aria-hidden="true"/, 'original quote starts closed')
assert.doesNotMatch(html, /data-lightbox|\/san-pham\/tem-nhan\/|"@type":"Product"|aggregateRating/, 'no future route, lightbox or invented schema')
assert.match(html, /<title>In Tem Nhãn - Sticker - Decal Sản Phẩm tại Vĩnh Long \| IST<\/title>/, 'original title')
assert.match(html, /rel="canonical" href="https:\/\/insangtao.net\/tem-nhan\/"/, 'same canonical')
for (const path of ['dist/index.html', 'dist/san-pham/index.html']) assert.ok(read(path).includes('href="/tem-nhan/"'), 'existing discovery link')
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>/g)].length, 13, 'sitemap includes the approved new route')
for (const route of ['san-pham/tem-nhan']) assert.ok(!existsSync('dist/' + route), 'no new route')
const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag)
assert.equal(images.filter(tag => attribute(tag, 'fetchpriority') === 'high').length, 1, 'one priority hero')
const samples = images.filter(tag => attribute(tag, 'loading') === 'lazy')
assert.equal(samples.length, 3, 'three curated lazy samples')
for (const tag of samples) for (const field of ['alt', 'width', 'height']) assert.ok(attribute(tag, field), 'sample ' + field)
const source = read('src/pages/tem-nhan/index.astro')
assert.equal([...source.matchAll(/import '\.\.\/\.\.\/scripts\/tem-nhan-calculator\.client\.js'/g)].length, 1, 'original calculator imported once')
assert.equal([...source.matchAll(/<TemNhanCalculator\s*\/>/g)].length, 1, 'one calculator UI')
assert.doesNotMatch(source, /tem-nhan-interactions|calculateQuote/, 'no old gallery script or duplicate pricing implementation')

// CEO-locked sources from parent merge 250ac170, normalized for checkout line endings.
const lockedSources = {
  'src/data/temNhanPricingConfig.js': '0c38f568beb8eefd3c87375ceb52e420d2b2b486f751c0c9a2d189125eb3e7e3',
  'src/utils/temNhanCalculatorLogic.js': '15673208951d5b4c68e9b1f48acf7c5a3ab360daf4f8ddf8df65e74e2fdcee85',
  'src/scripts/tem-nhan-calculator.client.js': 'bc0845b2d3db317b01e8c2fa1e8a355365841212b4d0b2b96d11d1cb527fa0dd',
}
for (const [file, hash] of Object.entries(lockedSources)) assert.equal(createHash('sha256').update(read(file).replaceAll('\r\n', '\n')).digest('hex'), hash, 'locked business/runtime text: ' + file)

// Exercise the original calculator event bridge and shared host gate, without network.
for (const hostname of ['insangtao.net', 'deploy-preview-9--insangtao.netlify.app']) {
  const calls = [], scripts = [], listeners = new Map()
  const document = { querySelector: () => scripts[0] ?? null, createElement: () => ({ dataset: {} }), head: { append: element => scripts.push(element) }, addEventListener: (name, listener) => listeners.set(name, listener), dispatchEvent: event => listeners.get(event.type)?.(event) }
  const window = { location: { hostname, origin: `https://${hostname}`, pathname: '/tem-nhan/' }, gtag: (...args) => calls.push(args) }
  const CustomEvent = class { constructor(type, options) { this.type = type; this.detail = options.detail } }
  runInNewContext(read('src/scripts/tracking.client.js').replace(/^import[^\n]+\n/, ''), { window, document, URL, siteConfig })
  const bridge = runInNewContext(read('src/utils/tracking.js').replace('export function', 'function') + ';trackEvent', { document, CustomEvent })
  bridge('calculator_interaction', { calculator: 'tem_nhan' })
  bridge('calculator_quote', { calculator: 'tem_nhan' })
  bridge('quote_export', { calculator: 'tem_nhan', export_method: 'image_save' })
  const events = calls.filter(([command]) => command === 'event')
  assert.equal(events.length, hostname === 'insangtao.net' ? 3 : 0, 'calculator events host-gated')
  assert.equal(scripts.length, hostname === 'insangtao.net' ? 1 : 0, 'GA4 host-gated')
  for (const [,eventName,params] of events) {
    assert.ok(['calculator_interaction', 'calculator_quote', 'quote_export'].includes(eventName))
    assert.ok(Object.keys(params).every(key => ['calculator', 'export_method', 'page_path'].includes(key)), 'categorical payload only')
    assert.equal(params.page_path, '/tem-nhan/')
  }
}
console.log('TEM V3 PAGE / CALCULATOR DOM / LOCKED LOGIC / TRACKING PRIVACY: PASS')
