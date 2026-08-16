import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const expectedRedirects = new Map([
  ['/index.html', { target: '/', status: '301!' }],
  ['/bang-hieu.html', { target: '/bang-hieu/', status: '301' }],
  ['/bang-hieu', { target: '/bang-hieu/', status: '301' }],
  ['/tem-nhan.html', { target: '/tem-nhan/', status: '301' }],
  ['/tem-nhan', { target: '/tem-nhan/', status: '301' }],
  ['/combo-mo-quan.html', { target: '/combo-mo-quan/', status: '301' }],
  ['/combo-mo-quan', { target: '/combo-mo-quan/', status: '301' }],
  ['/hoa-don.html', { target: '/hoa-don/', status: '301' }],
  ['/hoa-don', { target: '/hoa-don/', status: '301' }],
  ['/blog/index.html', { target: '/blog/', status: '301!' }],
  ['/blog', { target: '/blog/', status: '301' }],
  ['/blog/gia-bang-hieu-alu.html', { target: '/blog/gia-bang-hieu-alu/', status: '301' }],
  ['/blog/in-tem-nhan-so-luong-it.html', { target: '/blog/in-tem-nhan-so-luong-it/', status: '301' }],
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
  const expected = expectedRedirects.get(rule.source)
  assert.equal(rule.status, expected.status, `${rule.source}: status`)
  assert.equal(rule.target, expected.target, `${rule.source}: canonical target`)
  assert.ok(rule.status === '301' || rule.status === '301!', `${rule.source}: permanent redirect`)
  assert.ok(!rule.target.includes('.html'), `${rule.source}: target is clean`)
  assert.ok(!rule.source.startsWith('/kinh-doanh'), `${rule.source}: no kinh-doanh rule`)
  assert.ok(!expectedRedirects.has(rule.target), `${rule.source}: one-hop target`)
}

for (const [source, expected] of expectedRedirects) {
  assert.ok(rules.some((rule) => rule.source === source && rule.target === expected.target && rule.status === expected.status), `${source}: expected rule`)
}

assert.ok(!rules.some((rule) => rule.source === '/*' && rule.status === '200'), 'no SPA fallback')
assert.ok(!rules.some((rule) => rule.status === '200'), 'no rewrite masquerading as redirect')

console.log(`CLEAN URL REDIRECT MATRIX: PASS (${rules.length}/${rules.length} rules)`)
console.log('REDIRECT CHAINS: NONE')
console.log('REDIRECT LOOPS: NONE')
