import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { featuredProjects } from '../src/data/featuredProjects.js'

const expectedImages = ['projects-Ca-nhan.webp', 'projects-Cty-Nbeauty.webp', 'projects-Cty-Tongwei.webp', 'projects-Viettel.webp'].map((name) => '/images/home/' + name)
const gitPaths = new Set(execFileSync('git', ['ls-files', '-z', 'public/images'], { encoding: 'utf8' }).split('\0'))
const listing = featuredProjects.filter((item) => item.listingVisible)
const homepage = featuredProjects.filter((item) => item.homepageFeatured)
assert.equal(new Set(featuredProjects.map((item) => item.slug)).size, featuredProjects.length, 'unique slugs')
assert.equal(listing.length, 4, 'four listing items')
assert.equal(homepage.length, 4, 'four homepage items')
assert.deepEqual(homepage.map((item) => item.image), expectedImages, 'approved homepage selection and order')
assert.deepEqual(listing.map((item) => item.image), expectedImages, 'approved listing covers and order')
for (const item of featuredProjects) {
  assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'stable clean slug')
  assert.equal(item.detailEnabled, false, 'no detail publication in V1')
  assert.ok(['named-project', 'illustrative-group'].includes(item.kind), 'known kind')
  assert.equal(typeof item.listingVisible, 'boolean', 'explicit listing visibility')
}
assert.equal(featuredProjects[0].kind, 'illustrative-group')
assert.ok(featuredProjects.slice(1, 4).every((item) => item.kind === 'named-project'))
assert.ok(featuredProjects.slice(4).every((item) => !item.listingVisible && item.kind === 'illustrative-group'))
for (const item of listing) {
  for (const field of ['title', 'summary', 'service', 'image', 'imageAlt', 'serviceHref']) assert.ok(typeof item[field] === 'string' && item[field].trim(), item.slug + ': ' + field)
  for (const field of ['imageWidth', 'imageHeight']) assert.ok(Number.isInteger(item[field]) && item[field] > 0, item.slug + ': ' + field)
  assert.match(item.serviceHref, /^\/(?:[a-z0-9-]+\/)+$/, 'clean service route')
  assert.ok(existsSync('src/pages' + item.serviceHref + 'index.astro'), 'service route exists')
  assert.ok(gitPaths.has('public' + item.image), 'exact tracked image path and case: ' + item.image)
  for (const value of Object.values(item)) if (typeof value === 'string') assert.ok(!value.includes('.html'), 'no legacy HTML values')
}
const html = readFileSync('dist/du-an/index.html', 'utf8')
assert.equal((html.match(/<article\b/g) || []).length, 4, 'four rendered cards')
const assetLinks = [...html.matchAll(/<a\b[^>]*data-project-image[^>]*>/g)].map(([tag]) => tag)
assert.equal(assetLinks.length, 4, 'four progressive asset links')
for (const [index, tag] of assetLinks.entries()) assert.ok(tag.includes('href="' + expectedImages[index] + '"'), 'real image fallback')
assert.ok(!existsSync('dist/du-an/' + listing[0].slug), 'no detail route')
assert.doesNotMatch(html, /Xem chi tiết/, 'no fake detail action')
console.log('PROJECT DATA AND LISTING: PASS')
