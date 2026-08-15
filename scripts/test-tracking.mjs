import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const measurementId = 'G-77XN8YE2ZY'
const publicPages = [
  'dist/index.html',
  'dist/bang-hieu/index.html',
  'dist/combo-mo-quan/index.html',
  'dist/tem-nhan/index.html',
  'dist/hoa-don/index.html',
  'dist/blog/index.html',
  'dist/blog/gia-bang-hieu-alu/index.html',
  'dist/blog/in-tem-nhan-so-luong-it/index.html',
]

const read = (file) => readFileSync(file, 'utf8')
const filesIn = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const file = join(directory, entry.name)
  return entry.isDirectory() ? filesIn(file) : [file]
})

const baseLayout = read('src/layouts/BaseLayout.astro')
const siteConfig = read('src/data/site.js')
const trackingClient = read('src/scripts/tracking.client.js')
const sourceFiles = filesIn('src').filter((file) => /\.(astro|js)$/.test(file))
const source = sourceFiles.map(read).join('\n')

assert.equal((baseLayout.match(/tracking\.client\.js/g) ?? []).length, 1, 'BaseLayout loads tracking client once')
assert.ok(siteConfig.includes(measurementId), 'uses the legacy GA4 measurement ID')
assert.ok(trackingClient.includes('window.location.hostname === productionHost'), 'tracking is production-host gated')
assert.ok(trackingClient.includes('script.async = true'), 'GA4 loader is async')
assert.ok(trackingClient.includes('window.__istGa4Initialized'), 'GA4 init has a duplicate guard')
assert.ok(trackingClient.includes('data-ist-ga4-script'), 'GA4 script has a duplicate guard')
assert.ok(trackingClient.includes("document.addEventListener('ist:track'"), 'calculator tracking uses a document event bridge')
assert.ok(trackingClient.includes("document.addEventListener('click'"), 'CTA tracking uses a delegated listener')
assert.ok(trackingClient.includes('page_path: window.location.pathname'), 'events include page_path')
assert.ok(!source.includes('window.trackEvent'), 'Astro source has no legacy global trackEvent dependency')
assert.ok(!sourceFiles.filter((file) => file.endsWith('.astro')).some((file) => read(file).includes('onclick=')), 'Astro markup has no inline onclick handlers')

for (const marker of ['navbar_desktop', 'floating_contact', 'contact_cta', 'home_service_card', 'bang_hieu_hero', 'combo_hero', 'tem_nhan_hero', 'hoa_don_hero', 'hoa_don_calculator']) {
  assert.ok(source.includes(marker), `required CTA tracking marker: ${marker}`)
}

assert.ok(read('src/scripts/tem-nhan-calculator.client.js').includes("trackEvent('calculator_interaction'"), 'Tem calculator tracks a valid engagement once')
assert.ok(read('src/scripts/tem-nhan-calculator.client.js').includes("trackEvent('calculator_quote'"), 'Tem calculator tracks quote open')
assert.ok(read('src/scripts/tem-nhan-calculator.client.js').includes("trackEvent('quote_export'"), 'Tem calculator tracks quote export')
assert.ok(read('src/scripts/hoa-don-calculator.client.js').includes("trackEvent('calculator_interaction'"), 'Hoa Don calculator tracks a valid engagement once')
assert.ok(read('src/scripts/hoa-don-calculator.client.js').includes("trackEvent('calculator_quote'"), 'Hoa Don calculator tracks price-table open')

for (const page of publicPages) {
  assert.ok(existsSync(page), `built public page exists: ${page}`)
  const html = read(page)
  assert.ok(html.includes('data-track-event'), `built CTA attributes exist: ${page}`)
  assert.ok(!html.includes('onclick='), `no inline tracking handler: ${page}`)
  assert.ok(!html.includes('/kinh-doanh'), `no Sales portal artifact: ${page}`)
  assert.equal((html.match(/data-ist-ga4-script/g) ?? []).length, 1, `GA4 loader appears once: ${page}`)
  assert.ok(html.includes(measurementId), `legacy GA4 ID is present: ${page}`)
}

console.log('GA4 BASE TRACKING: PASS')
console.log('CONVERSION EVENT TRACKING: PASS')
