import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const configSource = readFileSync('src/data/hoaDonPricingConfig.js', 'utf8')
  .replace('export const hoaDonPricingConfig =', 'return')
const config = Function(configSource)()

const logicSource = readFileSync('src/utils/hoaDonCalculatorLogic.js', 'utf8')
  .replace(/import\s+\{[\s\S]*?\}\s+from\s+'\.\.\/data\/hoaDonPricingConfig'\s*/, '')
  .replaceAll('export ', '')
const {
  formatCurrency,
  getSizeOptions,
  getPlyOptions,
  getQuantityOptions,
  calculateHoaDonQuote,
} = Function('config', `${logicSource}; return { formatCurrency, getSizeOptions, getPlyOptions, getQuantityOptions, calculateHoaDonQuote }`)(config)

const pricingVectors = [
  ['A5', '1', 5, 30000, 150000],
  ['A5', '1', 10, 20000, 200000],
  ['A5', '1', 20, 17000, 340000],
  ['A5', '1', 50, 15000, 750000],
  ['A5', '1', 100, 14000, 1400000],
  ['A5', '2', 10, 35000, 350000],
  ['A5', '2', 20, 22000, 440000],
  ['A5', '2', 50, 20000, 1000000],
  ['A5', '2', 100, 18000, 1800000],
  ['A6', '1', 10, 17000, 170000],
  ['A6', '1', 20, 12000, 240000],
  ['A6', '1', 40, 10000, 400000],
  ['A6', '1', 80, 9000, 720000],
  ['A6', '1', 120, 8000, 960000],
  ['A6', '2', 20, 20000, 400000],
  ['A6', '2', 40, 15000, 600000],
  ['A6', '2', 80, 12000, 960000],
  ['A6', '2', 120, 11000, 1320000],
  ['A4', '1', 5, 40000, 200000],
  ['A4', '1', 10, 34000, 340000],
  ['A4', '1', 20, 32000, 640000],
  ['A4', '1', 50, 30000, 1500000],
  ['A4', '1', 100, 28000, 2800000],
  ['A4', '2', 5, 70000, 350000],
  ['A4', '2', 10, 45000, 450000],
  ['A4', '2', 30, 40000, 1200000],
  ['A4', '2', 50, 36000, 1800000],
]

const invalidVectors = [
  { size: 'A7', ply: '1', quantity: 5 },
  { size: 'A5', ply: '3', quantity: 5 },
  { size: 'A5', ply: '1', quantity: 6 },
  { size: 'A5', ply: '1', quantity: 0 },
]

assert.deepEqual(getSizeOptions(), [
  { value: 'A5', label: 'A5 - phổ biến nhất' },
  { value: 'A6', label: 'A6 - nhỏ gọn' },
  { value: 'A4', label: 'A4 - nhiều thông tin' },
])
assert.deepEqual(getPlyOptions(), [
  { value: '1', label: '1 liên' },
  { value: '2', label: '2 liên' },
])
assert.deepEqual(config.default, { size: 'A5', ply: '1' })

for (const [size, ply, quantity, unitPrice, totalPrice] of pricingVectors) {
  const name = `${size}-${ply}-lien-${quantity}-cuon`
  const quote = calculateHoaDonQuote({ size, ply, quantity })

  assert.ok(quote, name)
  assert.equal(quote.unitPrice, unitPrice, `${name}: unitPrice`)
  assert.equal(quote.totalPrice, totalPrice, `${name}: totalPrice`)
  assert.equal(quote.unitPriceText, formatCurrency(unitPrice), `${name}: unitPriceText`)
  assert.equal(quote.totalPriceText, formatCurrency(totalPrice), `${name}: totalPriceText`)
  assert.equal(quote.quantity, quantity, `${name}: quantity`)
  assert.equal(quote.size, size, `${name}: size`)
  assert.equal(quote.ply, ply, `${name}: ply`)
}

for (const input of invalidVectors) {
  assert.equal(calculateHoaDonQuote(input), null, `invalid-${input.size}-${input.ply}-${input.quantity}`)
}

assert.deepEqual(
  getQuantityOptions('A5', '1'),
  [5, 10, 20, 50, 100].map((value) => ({ value, label: `${value.toLocaleString('vi-VN')} cuốn` })),
)
assert.deepEqual(getQuantityOptions('A7', '1'), [])

const defaultQuantity = getQuantityOptions(config.default.size, config.default.ply)[0].value
const defaultQuote = calculateHoaDonQuote({ ...config.default, quantity: defaultQuantity })
assert.equal(defaultQuote.unitPriceText, '30.000\u00a0₫')
assert.equal(defaultQuote.totalPriceText, '150.000\u00a0₫')

const vectorCount = pricingVectors.length + invalidVectors.length
console.log(`HOA DON LEGACY PRICING BASELINE: PASS (${vectorCount}/${vectorCount} vectors)`)
console.log(`HOA DON PRICING PARITY: PASS (${vectorCount}/${vectorCount} vectors)`)
