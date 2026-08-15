import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const expectedRedirects = new Map([
  ['/index.html', '/'],
  ['/bang-hieu.html', '/bang-hieu/'],
  ['/bang-hieu', '/bang-hieu/'],
  ['/tem-nhan.html', '/tem-nhan/'],
  ['/tem-nhan', '/tem-nhan/'],
  ['/combo-mo-quan.html', '/combo-mo-quan/'],
  ['/combo-mo-quan', '/combo-mo-quan/'],
  ['/hoa-don.html', '/hoa-don/'],
  ['/hoa-don', '/hoa-don/'],
  ['/blog/index.html', '/blog/'],
  ['/blog', '/blog/'],
  ['/blog/gia-bang-hieu-alu.html', '/blog/gia-bang-hieu-alu/'],
  ['/blog/in-tem-nhan-so-luong-it.html', '/blog/in-tem-nhan-so-luong-it/'],
])

const rules = readFileSync('public/_redirects', 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [source, target, status, ...rest] = line.split(/\s+/)
    assert.equal(rest.length, 0, `unexpected redirect tokens: ${line}`)
    return { source, target, status }
  })

assert.equal(rules.length, expectedRedirects.size, 'redirect rule count')
assert.equal(new Set(rules.map((rule) => rule.source)).size, rules.length, 'no duplicate redirect sources')

for (const rule of rules) {
  assert.equal(rule.status, '301', `${rule.source}: status`)
  assert.equal(rule.target, expectedRedirects.get(rule.source), `${rule.source}: canonical target`)
  assert.ok(!rule.target.includes('.html'), `${rule.source}: target is clean`)
  assert.ok(!rule.source.startsWith('/kinh-doanh'), `${rule.source}: no kinh-doanh rule`)
  assert.ok(!expectedRedirects.has(rule.target), `${rule.source}: one-hop target`)
}

for (const [source, target] of expectedRedirects) {
  assert.ok(rules.some((rule) => rule.source === source && rule.target === target), `${source}: expected rule`)
}

assert.ok(!rules.some((rule) => rule.source === '/*' && rule.status === '200'), 'no SPA fallback')
assert.ok(!rules.some((rule) => rule.status === '200'), 'no rewrite masquerading as redirect')

console.log(`CLEAN URL REDIRECT MATRIX: PASS (${rules.length}/${rules.length} rules)`)
console.log('REDIRECT CHAINS: NONE')
console.log('REDIRECT LOOPS: NONE')
