import { calculateQuote as calculateTemNhanQuoteBase } from '../utils/temNhanCalculatorLogic'

export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

/* =========================================================
   HÓA ĐƠN - BIỂU MẪU
========================================================= */

export const hoaDonInternalPriceTable = {
  A5: {
    '1': [
      { qty: 5, unitPrice: 30000 },
      { qty: 10, unitPrice: 20000 },
      { qty: 20, unitPrice: 17000 },
      { qty: 50, unitPrice: 15000 },
      { qty: 100, unitPrice: 14000 },
    ],
    '2': [
      { qty: 10, unitPrice: 35000 },
      { qty: 20, unitPrice: 22000 },
      { qty: 50, unitPrice: 20000 },
      { qty: 100, unitPrice: 18000 },
    ],
  },

  A6: {
    '1': [
      { qty: 10, unitPrice: 17000 },
      { qty: 20, unitPrice: 12000 },
      { qty: 40, unitPrice: 10000 },
      { qty: 80, unitPrice: 9000 },
      { qty: 120, unitPrice: 8000 },
    ],
    '2': [
      { qty: 20, unitPrice: 20000 },
      { qty: 40, unitPrice: 15000 },
      { qty: 80, unitPrice: 12000 },
      { qty: 120, unitPrice: 11000 },
    ],
  },

  A4: {
    '1': [
      { qty: 5, unitPrice: 40000 },
      { qty: 10, unitPrice: 34000 },
      { qty: 20, unitPrice: 32000 },
      { qty: 50, unitPrice: 30000 },
      { qty: 100, unitPrice: 28000 },
    ],
    '2': [
      { qty: 5, unitPrice: 70000 },
      { qty: 10, unitPrice: 45000 },
      { qty: 30, unitPrice: 40000 },
      { qty: 50, unitPrice: 36000 },
    ],
  },
}

export function calculateHoaDonInternalQuote({
  size,
  ply,
  quantity,
}) {
  const table =
    hoaDonInternalPriceTable[size]?.[ply]

  if (!table) {
    return null
  }

  const selected =
    table.find((item) => item.qty === Number(quantity))

  if (!selected) {
    return null
  }

  const totalPrice =
    selected.qty * selected.unitPrice

  return {
    size,
    ply,
    quantity: selected.qty,
    unitPrice: selected.unitPrice,
    totalPrice,
    unitPriceText: formatCurrency(selected.unitPrice),
    totalPriceText: formatCurrency(totalPrice),
    table,
  }
}

/* =========================================================
   TEM NHÃN
========================================================= */

export const temNhanMaterialOptions = [
  {
    value: 'paper',
    label: 'Decal giấy',
  },
  {
    value: 'plastic',
    label: 'Decal nhựa',
  },
  {
    value: 'clear',
    label: 'Decal nhựa trong',
  },
]

export const temNhanLaminationOptions = [
  {
    value: 'none',
    label: 'Không cán màng',
  },
  {
    value: 'glossy',
    label: 'Cán màng bóng',
  },
  {
    value: 'matte',
    label: 'Cán màng mờ',
  },
]

export function getTemNhanMaterialLabel(value) {
  return (
    temNhanMaterialOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function getTemNhanLaminationLabel(value) {
  return (
    temNhanLaminationOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function calculateTemNhanInternalQuote({
  width,
  height,
  quantity,
  decalType,
  lamination,
}) {
  return calculateTemNhanQuoteBase({
    width: Number(width),
    height: Number(height),
    quantity: Number(quantity),
    decalType,
    lamination,
  })
}

/* =========================================================
   TÚI XỐP
========================================================= */

export const tuiXopCustomerTypes = [
  {
    value: 'normal',
    label: 'Khách lẻ',
    pricePerKg: 75000,
  },
  {
    value: 'shop',
    label: 'Khách shop / tiềm năng',
    pricePerKg: 70000,
  },
  {
    value: 'large',
    label: 'Khách lớn / tái sử dụng cao',
    pricePerKg: 65000,
  },
]

export const tuiXopPrintColorOptions = [
  {
    value: '1',
    label: 'In 1 màu',
    extraPerKg: 0,
  },
  {
    value: '2',
    label: 'In 2 màu',
    extraPerKg: 15000,
  },
  {
    value: '2-hard',
    label: 'In 2 màu - mẫu khó',
    extraPerKg: 20000,
  },
]

export const tuiXopOrderTypes = [
  {
    value: 'full',
    label: 'Bao gồm túi + in ấn',
  },
  {
    value: 'printing-only',
    label: 'Gia công in ấn (túi khách cung cấp)',
  },
]

export function getTuiXopCustomerTypeLabel(value) {
  return (
    tuiXopCustomerTypes.find((item) => item.value === value)?.label ||
    value
  )
}

export function getTuiXopPrintColorLabel(value) {
  return (
    tuiXopPrintColorOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function getTuiXopOrderTypeLabel(value) {
  return (
    tuiXopOrderTypes.find((item) => item.value === value)?.label ||
    value
  )
}

export function calculateTuiXopInternalQuote({
  kg,
  customerType,
  printColors,
  orderType,
  printingOnlyPricePerKg,
}) {
  const quantityKg =
    Number(kg)

  if (!quantityKg || quantityKg <= 0) {
    return null
  }

  const colorOption =
    tuiXopPrintColorOptions.find((item) => item.value === printColors)

  if (orderType === 'printing-only') {
    const unitPrice =
      Number(printingOnlyPricePerKg) || 15000

    const totalPrice =
      quantityKg * unitPrice

    return {
      kg: quantityKg,
      orderType,
      customerType,
      printColors,
      basePricePerKg: unitPrice,
      extraPerKg: 0,
      surcharge: 0,
      unitPrice,
      totalPrice,
      unitPriceText: formatCurrency(unitPrice),
      totalPriceText: formatCurrency(totalPrice),
      surchargeText: formatCurrency(0),
      note: 'Giá in gia công tham khảo, cần xem túi thực tế và số lượng túi/kg trước khi chốt.',
    }
  }

  const customer =
    tuiXopCustomerTypes.find((item) => item.value === customerType)

  const basePricePerKg =
    customer?.pricePerKg || 75000

  const extraPerKg =
    colorOption?.extraPerKg || 0

  let surcharge = 0

  if (quantityKg >= 1 && quantityKg < 5) {
    surcharge = 100000
  } else if (quantityKg >= 5 && quantityKg < 10) {
    surcharge = 50000
  }

  const unitPrice =
    basePricePerKg + extraPerKg

  const totalPrice =
    quantityKg * unitPrice + surcharge

  return {
    kg: quantityKg,
    orderType,
    customerType,
    printColors,
    basePricePerKg,
    extraPerKg,
    surcharge,
    unitPrice,
    totalPrice,
    unitPriceText: formatCurrency(unitPrice),
    totalPriceText: formatCurrency(totalPrice),
    surchargeText: formatCurrency(surcharge),
    note:
      surcharge > 0
        ? 'Đơn số lượng ít có cộng phụ phí setup in.'
        : 'Giá tham khảo theo kg, áp dụng cho quy cách thông thường.',
  }
}

/* =========================================================
   IN ẤN DECAL - PP - HIFLEX
========================================================= */

export const largeFormatMaterialOptions = [
  {
    value: 'hiflex',
    label: 'Bạt hiflex thường',
    group: 'hiflex',
    basePricePerM2: 35000,
    allowFinishing: false,
  },
  {
    value: 'hiflex-gray',
    label: 'Bạt xám 2 da',
    group: 'hiflex',
    basePricePerM2: 45000,
    allowFinishing: false,
  },
  {
    value: 'backlit-hiflex',
    label: 'Bạt không gân xuyên đèn',
    group: 'hiflex',
    basePricePerM2: 100000,
    allowFinishing: false,
  },
  {
    value: 'decal-milk',
    label: 'Decal sữa',
    group: 'decal',
    basePricePerM2: 60000,
    allowFinishing: true,
  },
  {
    value: 'decal-clear',
    label: 'Decal trong',
    group: 'decal',
    basePricePerM2: 65000,
    allowFinishing: true,
  },
  {
    value: 'decal-black-base',
    label: 'Decal đế đen',
    group: 'decal',
    basePricePerM2: 70000,
    allowFinishing: true,
  },
  {
    value: 'pp-adhesive',
    label: 'PP có keo',
    group: 'decal',
    basePricePerM2: 60000,
    allowFinishing: true,
  },
  {
    value: 'pp-no-adhesive',
    label: 'PP không keo',
    group: 'decal',
    basePricePerM2: 60000,
    allowFinishing: true,
  },
]

export const largeFormatCustomerTypes = [
  {
    value: 'retail',
    label: 'Khách lẻ',
  },
  {
    value: 'trade',
    label: 'Gia công',
  },
  {
    value: 'event',
    label: 'Nhà rạp / sự kiện',
  },
]

export const largeFormatDesignLevels = [
  {
    value: 'file-ready',
    label: 'Có file sẵn',
  },
  {
    value: 'basic',
    label: 'Hỗ trợ thiết kế cơ bản',
  },
  {
    value: 'hard',
    label: 'Hỗ trợ thiết kế khó',
  },
]

export const largeFormatFinishingOptions = [
  {
    value: 'none',
    label: 'Không gia công',
    pricePoints: [
      { area: 0, price: 0 },
      { area: 100, price: 0 },
    ],
  },
  {
    value: 'standard-lamination',
    label: 'Cán màng tiêu chuẩn',
    pricePoints: [
      { area: 0, price: 25000 },
      { area: 1, price: 25000 },
      { area: 5, price: 22000 },
      { area: 10, price: 20000 },
      { area: 50, price: 20000 },
      { area: 100, price: 20000 },
    ],
  },
  {
    value: 'hard-lamination',
    label: 'Cán màng đơn ít / khó',
    pricePoints: [
      { area: 0, price: 50000 },
      { area: 1, price: 50000 },
      { area: 5, price: 45000 },
      { area: 10, price: 40000 },
      { area: 50, price: 35000 },
      { area: 100, price: 30000 },
    ],
  },
  {
    value: 'die-cut',
    label: 'Cắt bế',
    pricePoints: [
      { area: 0, price: 40000 },
      { area: 1, price: 40000 },
      { area: 5, price: 35000 },
      { area: 10, price: 30000 },
      { area: 50, price: 30000 },
      { area: 100, price: 30000 },
    ],
  },
]

export const largeFormatInstallOptions = [
  {
    value: 'none',
    label: 'Không thi công',
    type: 'none',
    price: 0,
  },

  {
    value: 'decal-easy',
    label: 'Dán decal dễ',
    type: 'm2',
    pricePoints: [
      { area: 0, price: 60000 },
      { area: 1, price: 60000 },
      { area: 5, price: 50000 },
      { area: 10, price: 40000 },
      { area: 50, price: 40000 },
    ],
  },
  {
    value: 'decal-normal',
    label: 'Dán decal trung bình',
    type: 'm2',
    pricePoints: [
      { area: 0, price: 80000 },
      { area: 1, price: 80000 },
      { area: 5, price: 70000 },
      { area: 10, price: 60000 },
      { area: 50, price: 50000 },
    ],
  },
  {
    value: 'decal-hard',
    label: 'Dán decal khó / đi xa',
    type: 'm2',
    pricePoints: [
      { area: 0, price: 100000 },
      { area: 1, price: 100000 },
      { area: 5, price: 90000 },
      { area: 10, price: 80000 },
      { area: 50, price: 70000 },
    ],
  },

  {
    value: 'banner-easy',
    label: 'Treo băng rôn dễ',
    type: 'piece',
    price: 50000,
  },
  {
    value: 'banner-normal',
    label: 'Treo băng rôn trung bình',
    type: 'piece',
    price: 100000,
  },
  {
    value: 'banner-hard',
    label: 'Treo băng rôn khó / đi xa',
    type: 'piece',
    price: 200000,
  },

  {
    value: 'frame-easy',
    label: 'Căn bạt vào khung dễ',
    type: 'm2',
    pricePoints: [
      { area: 0, price: 50000 },
      { area: 1, price: 50000 },
      { area: 5, price: 40000 },
      { area: 10, price: 30000 },
      { area: 50, price: 30000 },
    ],
  },
  {
    value: 'frame-normal',
    label: 'Căn bạt vào khung trung bình',
    type: 'm2',
    pricePoints: [
      { area: 0, price: 70000 },
      { area: 1, price: 70000 },
      { area: 5, price: 60000 },
      { area: 10, price: 50000 },
      { area: 50, price: 40000 },
    ],
  },
  {
    value: 'frame-hard',
    label: 'Căn bạt vào khung khó',
    type: 'm2',
    pricePoints: [
      { area: 0, price: 90000 },
      { area: 1, price: 90000 },
      { area: 5, price: 80000 },
      { area: 10, price: 70000 },
      { area: 50, price: 60000 },
    ],
  },
]

export function getLargeFormatMaterialLabel(value) {
  return (
    largeFormatMaterialOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function getLargeFormatCustomerTypeLabel(value) {
  return (
    largeFormatCustomerTypes.find((item) => item.value === value)?.label ||
    value
  )
}

export function getLargeFormatDesignLevelLabel(value) {
  return (
    largeFormatDesignLevels.find((item) => item.value === value)?.label ||
    value
  )
}

export function getLargeFormatFinishingLabel(value) {
  return (
    largeFormatFinishingOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function getLargeFormatInstallLabel(value) {
  return (
    largeFormatInstallOptions.find((item) => item.value === value)?.label ||
    value
  )
}

function interpolateByArea(totalArea, points) {
  if (!points || !points.length) {
    return 0
  }

  const sortedPoints =
    [...points].sort((a, b) => a.area - b.area)

  if (totalArea <= sortedPoints[0].area) {
    return sortedPoints[0].price
  }

  if (totalArea >= sortedPoints[sortedPoints.length - 1].area) {
    return sortedPoints[sortedPoints.length - 1].price
  }

  for (let i = 0; i < sortedPoints.length - 1; i++) {
    const lower = sortedPoints[i]
    const upper = sortedPoints[i + 1]

    if (
      totalArea >= lower.area &&
      totalArea <= upper.area
    ) {
      const progress =
        (totalArea - lower.area) /
        (upper.area - lower.area)

      const price =
        lower.price +
        (upper.price - lower.price) * progress

      return Math.round(price / 1000) * 1000
    }
  }

  return sortedPoints[sortedPoints.length - 1].price
}

const largeFormatCustomerExtraTable = {
  retail: {
    'file-ready': [
      { area: 0, price: 50000 },
      { area: 1, price: 50000 },
      { area: 5, price: 40000 },
      { area: 10, price: 30000 },
      { area: 50, price: 20000 },
      { area: 100, price: 10000 },
    ],

    basic: [
      { area: 0, price: 70000 },
      { area: 1, price: 70000 },
      { area: 5, price: 50000 },
      { area: 10, price: 40000 },
      { area: 50, price: 30000 },
      { area: 100, price: 20000 },
    ],

    hard: [
      { area: 0, price: 100000 },
      { area: 1, price: 100000 },
      { area: 5, price: 80000 },
      { area: 10, price: 60000 },
      { area: 50, price: 40000 },
      { area: 100, price: 30000 },
    ],
  },

  trade: {
    'file-ready': [
      { area: 0, price: 0 },
      { area: 100, price: 0 },
    ],
  },

  event: {
    'file-ready': [
      { area: 0, price: 40000 },
      { area: 1, price: 40000 },
      { area: 5, price: 30000 },
      { area: 10, price: 25000 },
      { area: 50, price: 20000 },
      { area: 100, price: 15000 },
    ],

    basic: [
      { area: 0, price: 50000 },
      { area: 1, price: 50000 },
      { area: 5, price: 40000 },
      { area: 10, price: 30000 },
      { area: 50, price: 20000 },
      { area: 100, price: 15000 },
    ],

    hard: [
      { area: 0, price: 60000 },
      { area: 1, price: 60000 },
      { area: 5, price: 50000 },
      { area: 10, price: 40000 },
      { area: 50, price: 30000 },
      { area: 100, price: 20000 },
    ],
  },
}

function getLargeFormatCustomerExtraPerM2({
  customerType,
  designLevel,
  totalArea,
}) {
  const points =
    largeFormatCustomerExtraTable?.[customerType]?.[designLevel]

  return interpolateByArea(totalArea, points)
}

export function calculateLargeFormatInternalQuote({
  width,
  height,
  quantity,
  material,
  customerType,
  designLevel,
  finishing,
  eyelets,
  install,
}) {
  const widthCm =
    Number(width)

  const heightCm =
    Number(height)

  const qty =
    Number(quantity)

  if (
    !widthCm ||
    !heightCm ||
    !qty ||
    widthCm <= 0 ||
    heightCm <= 0 ||
    qty <= 0
  ) {
    return null
  }

  const materialData =
    largeFormatMaterialOptions.find((item) => item.value === material)

  if (!materialData) {
    return null
  }

  const widthM =
    widthCm / 100

  const heightM =
    heightCm / 100

  const areaPerPiece =
    widthM * heightM

  const totalArea =
    areaPerPiece * qty

  const normalizedCustomerType =
    customerType === 'trade'
      ? 'trade'
      : customerType

  const normalizedDesignLevel =
    customerType === 'trade'
      ? 'file-ready'
      : designLevel

  const normalizedInstall =
    customerType === 'trade'
      ? 'none'
      : install

  const normalizedFinishing =
    materialData.allowFinishing
      ? finishing
      : 'none'

  const finishingData =
    largeFormatFinishingOptions.find((item) => item.value === normalizedFinishing)

  const installData =
    largeFormatInstallOptions.find((item) => item.value === normalizedInstall)

  const basePricePerM2 =
    materialData.basePricePerM2

  const customerExtraPerM2 =
    getLargeFormatCustomerExtraPerM2({
      customerType: normalizedCustomerType,
      designLevel: normalizedDesignLevel,
      totalArea,
    })

  const finishingExtraPerM2 =
    materialData.allowFinishing
      ? interpolateByArea(totalArea, finishingData?.pricePoints)
      : 0

  const unitPricePerM2 =
    basePricePerM2 +
    customerExtraPerM2 +
    finishingExtraPerM2

  const printTotal =
    totalArea * unitPricePerM2

  const eyeletCount =
    Number(eyelets) || 0

  const eyeletFee =
    eyeletCount * 4000

  let installFee = 0
  let installPricePerM2 = 0

  if (installData && normalizedInstall !== 'none') {
    if (installData.type === 'm2') {
      installPricePerM2 =
        interpolateByArea(totalArea, installData.pricePoints)

      installFee =
        totalArea * installPricePerM2
    }

    if (installData.type === 'piece') {
      installFee =
        qty * installData.price
    }
  }

  const minimumOrder =
    normalizedCustomerType === 'trade'
      ? 35000
      : 100000

  const beforeMinimum =
    printTotal + eyeletFee + installFee

  const totalPrice =
    Math.max(beforeMinimum, minimumOrder)

  return {
    width: widthM,
    height: heightM,
    widthCm,
    heightCm,
    quantity: qty,
    areaPerPiece,
    totalArea,

    material,
    customerType: normalizedCustomerType,
    designLevel: normalizedDesignLevel,
    finishing: normalizedFinishing,
    install: normalizedInstall,

    basePricePerM2,
    customerExtraPerM2,
    finishingExtraPerM2,
    unitPricePerM2,
    installPricePerM2,

    printTotal,
    eyeletCount,
    eyeletFee,
    installFee,
    minimumOrder,
    totalPrice,

    basePriceText: formatCurrency(basePricePerM2),
    customerExtraText: formatCurrency(customerExtraPerM2),
    finishingExtraText: formatCurrency(finishingExtraPerM2),
    unitPriceText: formatCurrency(unitPricePerM2),
    installPricePerM2Text: formatCurrency(installPricePerM2),
    printTotalText: formatCurrency(printTotal),
    eyeletFeeText: formatCurrency(eyeletFee),
    installFeeText: formatCurrency(installFee),
    totalPriceText: formatCurrency(totalPrice),

    note:
      totalPrice === minimumOrder && beforeMinimum < minimumOrder
        ? 'Đơn này đang áp dụng giá tối thiểu.'
        : 'Giá tham khảo theo m² và các phụ phí đã chọn.',
  }
}

// ==============================
// NHÀ RẠP CALCULATOR V2
// ==============================

function interpolateNhaRapByArea(totalArea, points) {
  if (!points || !points.length) {
    return 0
  }

  const sortedPoints =
    [...points].sort((a, b) => a.area - b.area)

  if (totalArea <= sortedPoints[0].area) {
    return sortedPoints[0].price
  }

  if (totalArea >= sortedPoints[sortedPoints.length - 1].area) {
    return sortedPoints[sortedPoints.length - 1].price
  }

  for (let i = 0; i < sortedPoints.length - 1; i++) {
    const lower = sortedPoints[i]
    const upper = sortedPoints[i + 1]

    if (
      totalArea >= lower.area &&
      totalArea <= upper.area
    ) {
      const progress =
        (totalArea - lower.area) /
        (upper.area - lower.area)

      const price =
        lower.price +
        (upper.price - lower.price) * progress

      return Math.round(price / 1000) * 1000
    }
  }

  return sortedPoints[sortedPoints.length - 1].price
}

export const nhaRapQuoteModes = [
  {
    value: 'print',
    label: 'In ấn',
  },
  {
    value: 'material',
    label: 'Bán vật tư',
  },
  {
    value: 'cut',
    label: 'Cắt / gia công',
  },
]

export const nhaRapDesignLevels = [
  {
    value: 'file-ready',
    label: 'Có file sẵn',
    pricePoints: [
      { area: 0, price: 0 },
      { area: 100, price: 0 },
    ],
  },
  {
    value: 'simple',
    label: 'Thiết kế đơn giản',
    pricePoints: [
      { area: 0, price: 40000 },
      { area: 100, price: 40000 },
    ],
  },
  {
    value: 'hard',
    label: 'Thiết kế khó',
    pricePoints: [
      { area: 0, price: 80000 },
      { area: 100, price: 80000 },
    ],
  },
]

export const nhaRapPrintProducts = [
  {
    value: 'hiflex-white',
    label: 'In bạt hiflex thường',
    pricePoints: [
      { area: 0, price: 80000 },
      { area: 1, price: 80000 },
      { area: 2, price: 75000 },
      { area: 5, price: 70000 },
      { area: 10, price: 65000 },
      { area: 50, price: 60000 },
    ],
  },
  {
    value: 'hiflex-gray',
    label: 'In bạt xám 2 da',
    pricePoints: [
      { area: 0, price: 100000 },
      { area: 1, price: 100000 },
      { area: 2, price: 95000 },
      { area: 5, price: 90000 },
      { area: 10, price: 80000 },
      { area: 50, price: 70000 },
    ],
  },
  {
    value: 'decal-pp',
    label: 'In decal / PP',
    pricePoints: [
      { area: 0, price: 150000 },
      { area: 1, price: 150000 },
      { area: 2, price: 130000 },
      { area: 5, price: 110000 },
      { area: 10, price: 90000 },
      { area: 50, price: 70000 },
    ],
  },
]

export const nhaRapPrintFinishingOptions = [
  {
    value: 'none',
    label: 'Không gia công',
    pricePoints: [
      { area: 0, price: 0 },
      { area: 100, price: 0 },
    ],
  },
  {
    value: 'lamination',
    label: 'Cán màng decal / PP',
    pricePoints: [
      { area: 0, price: 50000 },
      { area: 1, price: 50000 },
      { area: 2, price: 45000 },
      { area: 5, price: 40000 },
      { area: 10, price: 35000 },
      { area: 50, price: 30000 },
    ],
  },
  {
    value: 'apply-decal-pp',
    label: 'Công dán decal / PP',
    pricePoints: [
      { area: 0, price: 60000 },
      { area: 1, price: 60000 },
      { area: 2, price: 55000 },
      { area: 5, price: 50000 },
      { area: 10, price: 45000 },
      { area: 50, price: 40000 },
    ],
  },
  {
    value: 'fit-hiflex-frame',
    label: 'Công căn bạt vào khung',
    pricePoints: [
      { area: 0, price: 60000 },
      { area: 1, price: 60000 },
      { area: 2, price: 55000 },
      { area: 5, price: 50000 },
      { area: 10, price: 45000 },
      { area: 50, price: 40000 },
    ],
  },
]

export const nhaRapMaterialProducts = [
  {
    value: 'hiflex-white',
    label: 'Bạt hiflex thường',
    type: 'm2',
    retailPricePerM2: 25000,
  },
  {
    value: 'hiflex-gray',
    label: 'Bạt xám 2 da',
    type: 'm2',
    retailPricePerM2: 25000,
  },
  {
    value: 'decal-color',
    label: 'Decal màu',
    type: 'm2',
    retailPricePerM2: 70000,
  },
  {
    value: 'fomex-3mm',
    label: 'Fomex 3li',
    type: 'sheet',
    sheetPrice: 150000,
    retailPricePerM2: 100000,
  },
  {
    value: 'fomex-5mm',
    label: 'Fomex 5li',
    type: 'sheet',
    sheetPrice: 180000,
    retailPricePerM2: 120000,
  },
  {
    value: 'fomex-8mm',
    label: 'Fomex 8li',
    type: 'sheet',
    sheetPrice: 300000,
    retailPricePerM2: 150000,
  },
  {
    value: 'alu-3li05',
    label: 'Alu 3li05',
    type: 'sheet',
    sheetPrice: 350000,
    retailPricePerM2: 150000,
  },
  {
    value: 'alu-3li06',
    label: 'Alu 3li06',
    type: 'sheet',
    sheetPrice: 450000,
    retailPricePerM2: 200000,
  },
  {
    value: 'alu-mirror',
    label: 'Alu gương',
    type: 'sheet',
    sheetPrice: 1200000,
    retailPricePerM2: 550000,
  },
  {
    value: 'mica-2mm',
    label: 'Mica 2mm',
    type: 'sheet',
    sheetPrice: 900000,
    retailPricePerM2: 350000,
  },
]

export const nhaRapMaterialSaleModes = [
  {
    value: 'm2',
    label: 'Tính theo m²',
  },
  {
    value: 'sheet',
    label: 'Tính nguyên tấm',
  },
]

export const nhaRapCutProducts = [
  {
    value: 'cut-decal-color',
    label: 'Cắt decal màu',
    materialPricePerM2: 70000,
    laborPricePoints: {
      easy: [
        { area: 0, price: 60000 },
        { area: 1, price: 60000 },
        { area: 2, price: 55000 },
        { area: 5, price: 50000 },
        { area: 10, price: 45000 },
        { area: 50, price: 40000 },
      ],
      normal: [
        { area: 0, price: 70000 },
        { area: 1, price: 70000 },
        { area: 2, price: 65000 },
        { area: 5, price: 60000 },
        { area: 10, price: 55000 },
        { area: 50, price: 50000 },
      ],
      hard: [
        { area: 0, price: 80000 },
        { area: 1, price: 80000 },
        { area: 2, price: 75000 },
        { area: 5, price: 70000 },
        { area: 10, price: 65000 },
        { area: 50, price: 60000 },
      ],
    },
  },
  {
    value: 'cnc-fomex-3mm',
    label: 'CNC Fomex 3li',
    materialPricePerM2: 100000,
    laborPricePoints: null,
  },
  {
    value: 'cnc-fomex-5mm',
    label: 'CNC Fomex 5li',
    materialPricePerM2: 120000,
    laborPricePoints: null,
  },
  {
    value: 'cnc-fomex-8mm',
    label: 'CNC Fomex 8li',
    materialPricePerM2: 150000,
    laborPricePoints: null,
  },
  {
    value: 'cnc-alu-3li05',
    label: 'CNC Alu 3li05',
    materialPricePerM2: 150000,
    laborPricePoints: null,
  },
  {
    value: 'cnc-alu-3li06',
    label: 'CNC Alu 3li06',
    materialPricePerM2: 200000,
    laborPricePoints: null,
  },
  {
    value: 'laser-mica-2mm',
    label: 'Laser Mica 2mm',
    materialPricePerM2: 350000,
    laborPricePoints: null,
  },
  {
    value: 'mica-name-demi',
    label: 'Bảng mica tên dâu rể - cắt demi',
    fixedPricePerM2: 450000,
  },
  {
    value: 'mica-name-demi-paint-decal',
    label: 'Bảng mica tên dâu rể - demi + sơn chữ/dán decal',
    fixedPricePerM2: 500000,
  },
  {
    value: 'mica-name-mica-letter',
    label: 'Bảng mica tên dâu rể - dán chữ mica',
    fixedPricePerM2: 600000,
  },
]

export const nhaRapCutDifficultyOptions = [
  {
    value: 'easy',
    label: 'Dễ',
  },
  {
    value: 'normal',
    label: 'Trung bình',
  },
  {
    value: 'hard',
    label: 'Khó',
  },
]

function getDefaultCncLaborPricePoints() {
  return {
    easy: [
      { area: 0, price: 120000 },
      { area: 1, price: 120000 },
      { area: 2, price: 110000 },
      { area: 5, price: 100000 },
      { area: 10, price: 90000 },
      { area: 50, price: 80000 },
    ],
    normal: [
      { area: 0, price: 150000 },
      { area: 1, price: 150000 },
      { area: 2, price: 140000 },
      { area: 5, price: 120000 },
      { area: 10, price: 100000 },
      { area: 50, price: 90000 },
    ],
    hard: [
      { area: 0, price: 180000 },
      { area: 1, price: 180000 },
      { area: 2, price: 160000 },
      { area: 5, price: 140000 },
      { area: 10, price: 120000 },
      { area: 50, price: 100000 },
    ],
  }
}

export function getNhaRapQuoteModeLabel(value) {
  return (
    nhaRapQuoteModes.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapDesignLabel(value) {
  return (
    nhaRapDesignLevels.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapPrintProductLabel(value) {
  return (
    nhaRapPrintProducts.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapPrintFinishingLabel(value) {
  return (
    nhaRapPrintFinishingOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapMaterialProductLabel(value) {
  return (
    nhaRapMaterialProducts.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapMaterialSaleModeLabel(value) {
  return (
    nhaRapMaterialSaleModes.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapCutProductLabel(value) {
  return (
    nhaRapCutProducts.find((item) => item.value === value)?.label ||
    value
  )
}

export function getNhaRapCutDifficultyLabel(value) {
  return (
    nhaRapCutDifficultyOptions.find((item) => item.value === value)?.label ||
    value
  )
}

export function calculateNhaRapInternalQuote({
  quoteMode,
  width,
  height,
  quantity,
  designLevel,
  printProduct,
  printFinishing,
  materialProduct,
  materialSaleMode,
  cutProduct,
  cutDifficulty,
}) {
  const widthCm =
    Number(width)

  const heightCm =
    Number(height)

  const qty =
    Number(quantity)

  if (
    !widthCm ||
    !heightCm ||
    !qty ||
    widthCm <= 0 ||
    heightCm <= 0 ||
    qty <= 0
  ) {
    return null
  }

  const widthM =
    widthCm / 100

  const heightM =
    heightCm / 100

  const areaPerPiece =
    widthM * heightM

  const totalArea =
    areaPerPiece * qty

  let basePricePerM2 = 0
  let designExtraPerM2 = 0
  let finishingExtraPerM2 = 0
  let laborPricePerM2 = 0
  let totalPrice = 0
  let unitPricePerM2 = 0
  let calculationMode = quoteMode
  let note = ''

  if (quoteMode === 'print') {
    const product =
      nhaRapPrintProducts.find((item) => item.value === printProduct)

    const design =
      nhaRapDesignLevels.find((item) => item.value === designLevel)

    const finishing =
      nhaRapPrintFinishingOptions.find((item) => item.value === printFinishing)

    if (!product) {
      return null
    }

    basePricePerM2 =
      interpolateNhaRapByArea(totalArea, product.pricePoints)

    designExtraPerM2 =
      interpolateNhaRapByArea(totalArea, design?.pricePoints)

    finishingExtraPerM2 =
      interpolateNhaRapByArea(totalArea, finishing?.pricePoints)

    unitPricePerM2 =
      basePricePerM2 +
      designExtraPerM2 +
      finishingExtraPerM2

    totalPrice =
      totalArea * unitPricePerM2

    note =
      'Đang tính theo giá in, thiết kế/file và gia công sau in.'
  }

  if (quoteMode === 'material') {
    const product =
      nhaRapMaterialProducts.find((item) => item.value === materialProduct)

    if (!product) {
      return null
    }

    if (
      product.type === 'sheet' &&
      materialSaleMode === 'sheet'
    ) {
      calculationMode = 'material-sheet'
      totalPrice =
        product.sheetPrice * qty

      note =
        'Đang tính theo giá nguyên tấm.'
    } else {
      calculationMode = 'material-m2'
      basePricePerM2 =
        product.retailPricePerM2

      unitPricePerM2 =
        basePricePerM2

      totalPrice =
        totalArea * unitPricePerM2

      note =
        'Đang tính theo giá vật tư/m².'
    }
  }

  if (quoteMode === 'cut') {
    const product =
      nhaRapCutProducts.find((item) => item.value === cutProduct)

    if (!product) {
      return null
    }

    if (product.fixedPricePerM2) {
      calculationMode = 'cut-fixed'
      unitPricePerM2 =
        product.fixedPricePerM2

      totalPrice =
        totalArea * unitPricePerM2

      note =
        'Đang tính theo giá cố định/m² đã gồm vật tư và gia công.'
    } else {
      calculationMode = 'cut-material-labor'

      const laborPoints =
        product.laborPricePoints ||
        getDefaultCncLaborPricePoints()

      basePricePerM2 =
        product.materialPricePerM2 || 0

      laborPricePerM2 =
        interpolateNhaRapByArea(
          totalArea,
          laborPoints?.[cutDifficulty]
        )

      unitPricePerM2 =
        basePricePerM2 +
        laborPricePerM2

      totalPrice =
        totalArea * unitPricePerM2

      note =
        'Đang tính theo vật tư + công cắt/gia công.'
    }
  }

  return {
    quoteMode,
    calculationMode,

    widthCm,
    heightCm,
    width: widthM,
    height: heightM,
    quantity: qty,
    areaPerPiece,
    totalArea,

    designLevel,
    printProduct,
    printFinishing,
    materialProduct,
    materialSaleMode,
    cutProduct,
    cutDifficulty,

    basePricePerM2,
    designExtraPerM2,
    finishingExtraPerM2,
    laborPricePerM2,
    unitPricePerM2,
    totalPrice,

    basePriceText: formatCurrency(basePricePerM2),
    designExtraText: formatCurrency(designExtraPerM2),
    finishingExtraText: formatCurrency(finishingExtraPerM2),
    laborPriceText: formatCurrency(laborPricePerM2),
    unitPriceText: formatCurrency(unitPricePerM2),
    totalPriceText: formatCurrency(totalPrice),

    note,
  }
}