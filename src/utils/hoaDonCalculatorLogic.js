import { hoaDonPricingConfig as config } from '../data/hoaDonPricingConfig'

export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getSizeOptions() {
  return Object.entries(config.sizes).map(([value, item]) => ({
    value,
    label: item.label,
  }))
}

export function getPlyOptions() {
  return config.plyOptions
}

export function getQuantityOptions(size, ply) {
  const plyData = config.sizes[size]?.plies[ply]

  if (!plyData) {
    return []
  }

  return plyData.quantities.map((item) => ({
    value: item.qty,
    label: `${item.qty.toLocaleString('vi-VN')} cuốn`,
  }))
}

export function calculateHoaDonQuote({
  size,
  ply,
  quantity,
}) {
  const sizeData = config.sizes[size]
  const plyData = sizeData?.plies[ply]

  if (!sizeData || !plyData || !quantity) {
    return null
  }

  const matchedQuantity =
    plyData.quantities.find((item) => item.qty === Number(quantity))

  if (!matchedQuantity) {
    return null
  }

  const unitPrice =
    matchedQuantity.unitPrice

  const totalPrice =
    unitPrice * matchedQuantity.qty

  return {
    size,
    sizeLabel: sizeData.label,
    finishedSize: sizeData.finishedSize,
    sizeDescription: sizeData.description,

    ply,
    plyLabel: plyData.label,
    note: plyData.note,

    quantity: matchedQuantity.qty,
    unitPrice,
    totalPrice,

    unitPriceText: formatCurrency(unitPrice),
    totalPriceText: formatCurrency(totalPrice),
  }
}