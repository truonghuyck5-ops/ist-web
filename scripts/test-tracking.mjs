import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const measurementId = 'G-77XN8YE2ZY'
const publicPages = [
  'dist/index.html',
  'dist/san-pham/index.html',
  'dist/bang-hieu/index.html',
  'dist/combo-mo-quan/index.html',
  'dist/tem-nhan/index.html',
  'dist/hoa-don/index.html',
  'dist/du-an/index.html',
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

for (const marker of ['navbar_desktop', 'floating_contact', 'contact_cta', 'home_service_card', 'project_card', 'bang_hieu_hero', 'combo_hero', 'tem_nhan_hero', 'hoa_don_hero', 'hoa_don_calculator']) {
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

const projectsHtml = read('dist/du-an/index.html')
const serviceLinks = [...projectsHtml.matchAll(/<a\b[^>]*data-track-location="project_card"[^>]*>/g)].map(([tag]) => tag)
assert.equal(serviceLinks.length, 4, 'four project service tracking links')
for (const tag of serviceLinks) {
  for (const marker of ['href="/bang-hieu/"', 'data-track-event="service_cta_click"', 'data-track-service="bang_hieu"', 'data-track-action="view_service"']) assert.ok(tag.includes(marker), marker)
  assert.doesNotMatch(tag, /data-track-(?:title|customer|project)/, 'no project or customer payload')
}
for (const [tag] of projectsHtml.matchAll(/<a\b[^>]*data-project-image[^>]*>/g)) assert.ok(!tag.includes('data-track-event'), 'no lightbox tracking')
console.log('PROJECT CTA TRACKING: PASS')

const homeProjectLinks = [...read('dist/index.html').matchAll(/<a\b[^>]*data-track-location="home_featured_projects"[^>]*>/g)].map(([tag]) => tag)
assert.equal(homeProjectLinks.length, 1, 'one homepage projects CTA')
for (const marker of ['href="/du-an/"', 'data-track-event="service_cta_click"', 'data-track-action="view_projects"']) assert.ok(homeProjectLinks[0].includes(marker), marker)
assert.doesNotMatch(homeProjectLinks[0], /data-track-(?:title|customer|caption|service)=/, 'no inferred service or customer payload')
console.log('HOMEPAGE PROJECTS CTA TRACKING: PASS')

// Exercise the real delegated tracking client without sending analytics requests.
// Preview gating and payload allow-list apply to all three rendered V3 routes.
const { runInNewContext } = await import('node:vm')
const { siteConfig: liveSiteConfig } = await import('../src/data/site.js')
const tagAttribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const homeTrackedTags = [...read('dist/index.html').matchAll(/<(?:a|button)\b[^>]*data-track-event=[^>]*>/g)].map(([tag]) => tag)
assert.ok(homeTrackedTags.some(tag => tagAttribute(tag, 'data-track-location') === 'home_hero'), 'Hero tracked')
assert.equal(homeTrackedTags.filter(tag => tagAttribute(tag, 'data-track-location') === 'home_quick_need').length, 6, 'six Portal CTAs tracked')
assert.ok(homeTrackedTags.some(tag => tagAttribute(tag, 'data-track-location') === 'contact_cta' && tagAttribute(tag, 'data-track-event') === 'zalo_click'), 'final Zalo tracked')
assert.ok(homeTrackedTags.some(tag => tagAttribute(tag, 'data-track-location') === 'contact_cta' && tagAttribute(tag, 'data-track-event') === 'phone_click'), 'final phone tracked')

class TrackedElement {
  constructor(tag) {
    this.href = tagAttribute(tag, 'href')
    this.dataset = Object.fromEntries([...tag.matchAll(/data-([a-z-]+)="([^"]*)"/g)].map(([,key,value]) => [key.replace(/-([a-z])/g, (_,c) => c.toUpperCase()), value]))
  }
  closest() { return this }
  getAttribute(name) { return name === 'href' ? this.href : null }
}

const productTrackedPages = [['/', homeTrackedTags], ...['san-pham', 'bang-hieu'].map(route => [`/${route}/`, [...read(`dist/${route}/index.html`).matchAll(/<(?:a|button)\b[^>]*data-track-event=[^>]*>/g)].map(([tag]) => tag)])]
for (const [pagePath, trackedTags] of productTrackedPages) {
  for (const host of ['insangtao.net', 'deploy-preview-7--insangtao.netlify.app']) {
    const calls = []
    const scripts = []
    const listeners = new Map()
    const document = {
      querySelector: () => scripts[0] ?? null,
      createElement: () => ({dataset: {}}),
      head: {append: script => scripts.push(script)},
      addEventListener: (name, listener) => listeners.set(name, listener),
    }
    const window = {
      location: {hostname: host, origin: `https://${host}`, pathname: pagePath},
      gtag: (...args) => calls.push(args),
    }
    runInNewContext(trackingClient.replace(/^import[^\n]+\n/, ''), {window, document, URL, Element: TrackedElement, siteConfig: liveSiteConfig})
    for (const tag of trackedTags) listeners.get('click')({target: new TrackedElement(tag)})
    listeners.get('click')({target: new TrackedElement('<a href="tel:0974313230" data-track-event="phone_click" data-track-location="floating_contact" data-track-customer="PRIVATE_CUSTOMER" data-track-title="PRIVATE_TITLE">')})
    const events = calls.filter(([command]) => command === 'event')
    if (host !== 'insangtao.net') {
      assert.equal(scripts.length, 0, 'preview never loads GA4')
      assert.equal(calls.length, 0, 'preview sends no GA4 calls')
      continue
    }
    assert.equal(scripts.length, 1, 'one production GA4 loader')
    assert.equal(scripts[0].async, true, 'production GA4 async')
    assert.equal(events.length, trackedTags.length + 1, 'rendered CTAs dispatch through shared listener')
    for (const [,name,params] of events) {
      assert.ok(['service_cta_click', 'zalo_click', 'phone_click'].includes(name), 'existing event names only')
      assert.ok(Object.keys(params).every(key => ['location', 'service', 'action', 'destination', 'page_path'].includes(key)), 'tracking parameter allow-list')
      assert.equal(params.page_path, pagePath, 'current page_path')
      assert.doesNotMatch(JSON.stringify(params), /PRIVATE_CUSTOMER|PRIVATE_TITLE|0974313230|@|z253652/, 'no customer/title/contact/image data leakage')
    }
    assert.equal(events.at(-1)[2].destination, 'phone', 'phone destination is categorical')
  }
}
console.log('V3 CTA RUNTIME / PREVIEW GATING / PRIVACY: PASS')
