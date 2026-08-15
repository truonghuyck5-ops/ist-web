import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const configSource = readFileSync('src/data/temNhanPricingConfig.js', 'utf8')
  .replace('export const temNhanPricingConfig =', 'return')
const config = Function(configSource)()

const logicSource = readFileSync('src/utils/temNhanCalculatorLogic.js', 'utf8')
  .replace(/^import[^\n]+\n/, '')
  .replaceAll('export ', '')
const calculateQuote = Function('config', `${logicSource}; return calculateQuote`)(config)

const vectors = [
  {
    name: 'minimum-order-small-paper-none',
    input: { width: 20, height: 20, quantity: 10, decalType: 'paper', lamination: 'none' },
    expected: { unitPrice: 8000, totalPrice: 80000, labelsPerSheet: 210, sheetsNeeded: 1, sheetPrice: 30000, materialFee: 0, laminationFee: 0 },
  },
  {
    name: 'medium-paper-none',
    input: { width: 50, height: 50, quantity: 1000, decalType: 'paper', lamination: 'none' },
    expected: { unitPrice: 313, totalPrice: 312800, labelsPerSheet: 30, sheetsNeeded: 34, sheetPrice: 9200, materialFee: 0, laminationFee: 0 },
  },
  {
    name: 'exact-sheet-price-tier',
    input: { width: 300, height: 300, quantity: 50, decalType: 'paper', lamination: 'none' },
    expected: { unitPrice: 7000, totalPrice: 350000, labelsPerSheet: 1, sheetsNeeded: 50, sheetPrice: 7000, materialFee: 0, laminationFee: 0 },
  },
  {
    name: 'between-sheet-price-tiers',
    input: { width: 300, height: 300, quantity: 75, decalType: 'paper', lamination: 'none' },
    expected: { unitPrice: 6500, totalPrice: 487500, labelsPerSheet: 1, sheetsNeeded: 75, sheetPrice: 6500, materialFee: 0, laminationFee: 0 },
  },
  {
    name: 'high-quantity-tier',
    input: { width: 300, height: 300, quantity: 1000, decalType: 'paper', lamination: 'none' },
    expected: { unitPrice: 4000, totalPrice: 4000000, labelsPerSheet: 1, sheetsNeeded: 1000, sheetPrice: 4000, materialFee: 0, laminationFee: 0 },
  },
  {
    name: 'plastic-glossy-lamination',
    input: { width: 45, height: 30, quantity: 750, decalType: 'plastic', lamination: 'glossy' },
    expected: { unitPrice: 320, totalPrice: 239908.57142857142, labelsPerSheet: 63, sheetsNeeded: 12, sheetPrice: 14400, materialFee: 12000, laminationFee: 20000 },
  },
  {
    name: 'clear-plastic-matte-lamination',
    input: { width: 40, height: 60, quantity: 1600, decalType: 'clear-plastic', lamination: 'matte' },
    expected: { unitPrice: 296, totalPrice: 473200, labelsPerSheet: 40, sheetsNeeded: 40, sheetPrice: 8000, materialFee: 120000, laminationFee: 28000 },
  },
  {
    name: 'near-maximum-dimensions',
    input: { width: 299, height: 299, quantity: 5, decalType: 'clear-plastic', lamination: 'none' },
    expected: { unitPrice: 23000, totalPrice: 115000, labelsPerSheet: 1, sheetsNeeded: 5, sheetPrice: 20000, materialFee: 15000, laminationFee: 0 },
  },
  {
    name: 'interpolation-and-rounding',
    input: { width: 37, height: 43, quantity: 777, decalType: 'paper', lamination: 'glossy' },
    expected: { unitPrice: 328, totalPrice: 254914.51428571428, labelsPerSheet: 49, sheetsNeeded: 16, sheetPrice: 13200, materialFee: 0, laminationFee: 20000 },
  },
  {
    name: 'invalid-below-minimum-dimension',
    input: { width: 19, height: 50, quantity: 100, decalType: 'paper', lamination: 'none' },
    expected: null,
  },
  {
    name: 'invalid-above-maximum-dimension',
    input: { width: 301, height: 50, quantity: 100, decalType: 'paper', lamination: 'none' },
    expected: null,
  },
]

for (const vector of vectors) {
  const result = calculateQuote(vector.input)

  if (vector.expected === null) {
    assert.equal(result, null, vector.name)
    continue
  }

  assert.ok(result, vector.name)
  assert.equal(result.raw.unitPrice, vector.expected.unitPrice, `${vector.name}: unitPrice`)
  assert.ok(Math.abs(result.raw.totalPrice - vector.expected.totalPrice) < 0.000001, `${vector.name}: totalPrice`)
  assert.equal(result.labelsPerSheet, vector.expected.labelsPerSheet, `${vector.name}: labelsPerSheet`)
  assert.equal(result.sheetsNeeded, vector.expected.sheetsNeeded, `${vector.name}: sheetsNeeded`)
  assert.equal(result.raw.sheetPrice, vector.expected.sheetPrice, `${vector.name}: sheetPrice`)
  assert.equal(result.raw.materialFee, vector.expected.materialFee, `${vector.name}: materialFee`)
  assert.equal(result.raw.laminationFee, vector.expected.laminationFee, `${vector.name}: laminationFee`)
}

console.log(`LEGACY BUSINESS LOGIC BASELINE: PASS (${vectors.length}/${vectors.length} vectors)`)
console.log(`TEM PRICING PARITY: PASS (${vectors.length}/${vectors.length} vectors)`)
