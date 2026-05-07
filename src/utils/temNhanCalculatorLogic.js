export function formatCurrency(amount) {

  return new Intl.NumberFormat(
    'vi-VN',
    {
      style: 'currency',
      currency: 'VND'
    }
  ).format(amount)

}

function calculateOptimalLayout(
  labelWidth,
  labelHeight,
  sheetWidth,
  sheetHeight
) {

  const cols =
    Math.floor(sheetWidth / labelWidth)

  const rows =
    Math.floor(sheetHeight / labelHeight)

  const normal =
    cols * rows

  const rotatedCols =
    Math.floor(sheetWidth / labelHeight)

  const rotatedRows =
    Math.floor(sheetHeight / labelWidth)

  const rotated =
    rotatedCols * rotatedRows

  return Math.max(normal, rotated)

}

export function calculateQuote({

  width,
  height,
  quantity,
  decalType,
  shape,
  lamination,
  customerType

}) {

  if (
    !width ||
    !height ||
    !quantity
  ) {

    return null

  }

  // SHAPE EXTRA
  let adjustedWidth = width
  let adjustedHeight = height

  if (
    shape === 'round' ||
    shape === 'special'
  ) {

    adjustedWidth += 2
    adjustedHeight += 2

  }

  // SHEET SIZE
  const sheetWidth = 310
  const sheetHeight = 340

  // LABELS PER SHEET
  const labelsPerSheet =
    calculateOptimalLayout(
      adjustedWidth,
      adjustedHeight,
      sheetWidth,
      sheetHeight
    )

  // SHEETS NEEDED
  const sheetsNeeded =
    Math.ceil(
      quantity / labelsPerSheet
    )

  // SHEET PRICE
  let sheetPrice = 0

  if (sheetsNeeded < 10) {
    sheetPrice = 18000
  }

  else if (sheetsNeeded < 50) {
    sheetPrice = 12000
  }

  else if (sheetsNeeded < 200) {
    sheetPrice = 8000
  }

  else {
    sheetPrice = 6000
  }

  // MATERIAL FEE
  const materialFees = {

    kraft: 700,

    'matte-plastic': 1500,

    'glossy-plastic': 2000

  }

  let materialFee =
    (materialFees[decalType] || 0)
    * sheetsNeeded

  // LAMINATION
  if (lamination !== 'none') {

    materialFee +=
      Math.max(
        700 * sheetsNeeded,
        20000
      )

  }

  // BASE TOTAL
  let totalPrice =
    (sheetPrice * sheetsNeeded)
    + materialFee

  // VIP DISCOUNT
  let discount = 0

  if (customerType === 'vip') {

    discount = totalPrice * 0.1

    totalPrice -= discount

  }

  // UNIT PRICE
  const unitPrice =
    Math.round(
      totalPrice / quantity
    )

  return {

    unitPrice:
      formatCurrency(unitPrice),

    totalPrice:
      formatCurrency(totalPrice),

    labelsPerSheet,

    sheetsNeeded,

    sheetPrice:
      formatCurrency(sheetPrice),

    materialFee:
      formatCurrency(materialFee),

    discount:
      formatCurrency(discount)

  }

}