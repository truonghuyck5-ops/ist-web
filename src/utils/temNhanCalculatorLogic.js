import { temNhanPricingConfig as config } from '../data/temNhanPricingConfig'

export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}

function roundToNearest(value, step = 100) {
  return Math.round(value / step) * step
}

function calculateOptimalLayout(
  labelWidth,
  labelHeight,
  sheetWidth,
  sheetHeight
) {
  const normalCols = Math.floor(sheetWidth / labelWidth)
  const normalRows = Math.floor(sheetHeight / labelHeight)
  const normal = normalCols * normalRows

  const rotatedCols = Math.floor(sheetWidth / labelHeight)
  const rotatedRows = Math.floor(sheetHeight / labelWidth)
  const rotated = rotatedCols * rotatedRows

  return Math.max(normal, rotated)
}

function getInterpolatedSheetPrice(sheetsNeeded) {
  const table = config.baseSheetPriceTable

  if (sheetsNeeded <= table[0].sheets) {
    return table[0].price
  }

  if (sheetsNeeded >= table[table.length - 1].sheets) {
    return table[table.length - 1].price
  }

  for (let i = 0; i < table.length - 1; i++) {
    const lower = table[i]
    const upper = table[i + 1]

    if (
      sheetsNeeded >= lower.sheets &&
      sheetsNeeded <= upper.sheets
    ) {
      const progress =
        (sheetsNeeded - lower.sheets) /
        (upper.sheets - lower.sheets)

      const interpolatedPrice =
        lower.price +
        (upper.price - lower.price) * progress

      return roundToNearest(interpolatedPrice, 100)
    }
  }

  return table[table.length - 1].price
}

function calculateLaminationFee(lamination, sheetsNeeded) {
  const laminationConfig = config.laminationFees[lamination]

  if (!laminationConfig) {
    return 0
  }

  const fee =
    laminationConfig.feePerSheet * sheetsNeeded

  return Math.max(fee, laminationConfig.minFee)
}

function getSmallLabelSurchargeRate(width, height) {
  const area = width * height

  const rules = [
    { area: 2500, rate: 0 },
    { area: 1600, rate: 0.1 },
    { area: 900, rate: 0.3 },
    { area: 400, rate: 0.5 },
  ]

  if (area >= rules[0].area) {
    return 0
  }

  if (area <= rules[rules.length - 1].area) {
    return rules[rules.length - 1].rate
  }

  for (let i = 0; i < rules.length - 1; i++) {
    const upper = rules[i]
    const lower = rules[i + 1]

    if (
      area <= upper.area &&
      area >= lower.area
    ) {
      const progress =
        (upper.area - area) /
        (upper.area - lower.area)

      const interpolatedRate =
        upper.rate +
        (lower.rate - upper.rate) * progress

      return interpolatedRate
    }
  }

  return 0
}

export function calculateQuote({
  width,
  height,
  quantity,
  decalType,
  lamination,
}) {
  if (!width || !height || !quantity) {
    return null
  }

  if (
    width < config.minSize ||
    width > config.maxSize ||
    height < config.minSize ||
    height > config.maxSize
  ) {
    return null
  }

  const material = config.materials[decalType]

  if (!material) {
    return null
  }

  const adjustedWidth =
    width + config.bleedForCutting

  const adjustedHeight =
    height + config.bleedForCutting

  const labelsPerSheet =
    calculateOptimalLayout(
      adjustedWidth,
      adjustedHeight,
      material.sheetWidth,
      material.sheetHeight
    )

  if (!labelsPerSheet || labelsPerSheet <= 0) {
    return null
  }

  const sheetsNeeded =
    Math.ceil(quantity / labelsPerSheet)

  const sheetPrice =
    getInterpolatedSheetPrice(sheetsNeeded)

  const basePrintFee =
    sheetPrice * sheetsNeeded

  const materialFee =
    material.extraFeePerSheet * sheetsNeeded

  const laminationFee =
    calculateLaminationFee(lamination, sheetsNeeded)

let totalPrice =
  basePrintFee +
  materialFee +
  laminationFee

const smallLabelSurchargeRate =
  getSmallLabelSurchargeRate(width, height)

const smallLabelSurchargeFee =
  totalPrice * smallLabelSurchargeRate

totalPrice =
  totalPrice + smallLabelSurchargeFee

if (totalPrice < config.minimumOrder) {
  totalPrice = config.minimumOrder
}

const unitPrice =
  Math.round(totalPrice / quantity)

  return {
    unitPrice: formatCurrency(unitPrice),
    totalPrice: formatCurrency(totalPrice),

    labelsPerSheet,
    sheetsNeeded,

    sheetPrice: formatCurrency(sheetPrice),
    basePrintFee: formatCurrency(basePrintFee),
    materialFee: formatCurrency(materialFee),
    laminationFee: formatCurrency(laminationFee),

    raw: {
      unitPrice,
      totalPrice,
      labelsPerSheet,
      sheetsNeeded,
      sheetPrice,
      basePrintFee,
      materialFee,
      laminationFee,
      smallLabelSurchargeRate,
      smallLabelSurchargeFee: formatCurrency(smallLabelSurchargeFee),
    },
  }
}