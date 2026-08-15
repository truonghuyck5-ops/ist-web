import { hoaDonPricingConfig as config } from '../data/hoaDonPricingConfig'
import {
  calculateHoaDonQuote,
  formatCurrency,
  getPlyOptions,
  getQuantityOptions,
  getSizeOptions,
} from '../utils/hoaDonCalculatorLogic'
import { trackEvent } from '../utils/tracking.js'

const calculator = document.querySelector('#calculator')

if (calculator) {
  const sizeSelect = calculator.querySelector('#invoice-size')
  const plySelect = calculator.querySelector('#invoice-ply')
  const quantitySelect = calculator.querySelector('#invoice-quantity')
  const resultBox = calculator.querySelector('#invoice-result')
  const resultUnit = calculator.querySelector('#invoice-unit-price')
  const resultTotal = calculator.querySelector('#invoice-total-price')
  const resultInfo = calculator.querySelector('#invoice-info')
  const resultNote = calculator.querySelector('#invoice-note')
  const zaloButton = calculator.querySelector('#invoice-zalo-btn')
  const priceTableButton = calculator.querySelector('#invoice-price-table-btn')
  const pricePopup = calculator.querySelector('#invoice-price-popup')
  const pricePopupOverlay = calculator.querySelector('#invoice-price-popup-overlay')
  const pricePopupClose = calculator.querySelector('#invoice-price-popup-close')
  const pricePopupTitle = calculator.querySelector('#invoice-popup-title')
  const pricePopupSubtitle = calculator.querySelector('#invoice-popup-subtitle')
  const pricePopupNote = calculator.querySelector('#invoice-popup-note')
  const priceTableBody = calculator.querySelector('#invoice-price-table-body')

  const renderOptions = (select, options, placeholder = '') => {
    select.replaceChildren(...(
      options.length
        ? options.map((item) => new Option(item.label, String(item.value)))
        : [new Option(placeholder || 'Liên hệ báo giá', '')]
    ))
  }

  const updateQuote = () => {
    const quote = calculateHoaDonQuote({
      size: sizeSelect.value,
      ply: plySelect.value,
      quantity: Number(quantitySelect.value),
    })

    if (!quote) {
      resultBox.classList.add('opacity-80')
      resultUnit.textContent = '-'
      resultTotal.textContent = '-'
      resultInfo.textContent = 'Quy cách này chưa có bảng giá tự động. Vui lòng liên hệ IST để được tư vấn chính xác.'
      resultNote.textContent = 'Một số quy cách như A7 hoặc 3 liên cần kiểm tra mẫu, loại giấy và số lượng thực tế trước khi báo giá.'
      zaloButton.href = 'https://zalo.me/0974313230'
      return
    }

    resultBox.classList.remove('opacity-80')
    resultUnit.textContent = quote.unitPriceText
    resultTotal.textContent = quote.totalPriceText
    resultInfo.innerHTML = `<strong class="text-white">${quote.quantity.toLocaleString('vi-VN')} cuốn</strong><span class="text-gray-400"> - ${quote.size} / ${quote.plyLabel} - Thành phẩm khoảng ${quote.finishedSize}</span>`
    resultNote.textContent = quote.note

    const zaloText = `Tôi cần báo giá in hóa đơn ${quote.size} ${quote.plyLabel}, số lượng ${quote.quantity} cuốn. Giá tham khảo trên web: ${quote.totalPriceText}`
    zaloButton.href = `https://zalo.me/0974313230?text=${encodeURIComponent(zaloText)}`
  }

  const updateQuantityOptions = () => {
    renderOptions(quantitySelect, getQuantityOptions(sizeSelect.value, plySelect.value), 'Liên hệ IST để báo giá')
    updateQuote()
  }

  const openPriceTablePopup = () => {
    const size = sizeSelect.value
    const ply = plySelect.value
    const currentQuantity = Number(quantitySelect.value)
    const sizeData = config.sizes[size]
    const plyData = sizeData?.plies[ply]

    if (!sizeData || !plyData) {
      window.alert('Quy cách này chưa có bảng giá tự động.')
      return
    }

    pricePopupTitle.textContent = `${size} / ${plyData.label}`
    pricePopupSubtitle.textContent = `${sizeData.description} - Thành phẩm khoảng ${sizeData.finishedSize}`
    pricePopupNote.textContent = plyData.note
    priceTableBody.innerHTML = plyData.quantities.map((item) => {
      const isActive = item.qty === currentQuantity
      const total = item.qty * item.unitPrice
      return `<div class="grid grid-cols-3 items-center rounded-xl border px-3 py-3 text-xs sm:px-4 sm:text-sm md:text-base ${isActive ? 'border-orange-500 bg-orange-500/10' : 'border-zinc-800 bg-black'}"><div class="font-bold ${isActive ? 'text-orange-500' : 'text-gray-300'}">${isActive ? '▶ ' : ''}${item.qty.toLocaleString('vi-VN')} cuốn</div><div class="text-center font-black ${isActive ? 'text-orange-500' : 'text-white'}">${formatCurrency(item.unitPrice)}</div><div class="text-right font-black ${isActive ? 'text-orange-500' : 'text-white'}">${formatCurrency(total)}</div></div>`
    }).join('')

    pricePopup.classList.remove('hidden')
    pricePopup.classList.add('flex')
    pricePopup.setAttribute('aria-hidden', 'false')
    trackEvent('open_invoice_price_table', { page: 'hoa_don', size, ply })
  }

  const closePriceTablePopup = () => {
    pricePopup.classList.add('hidden')
    pricePopup.classList.remove('flex')
    pricePopup.setAttribute('aria-hidden', 'true')
  }

  renderOptions(sizeSelect, getSizeOptions())
  renderOptions(plySelect, getPlyOptions())
  sizeSelect.value = config.default.size
  plySelect.value = config.default.ply
  updateQuantityOptions()

  sizeSelect.addEventListener('change', updateQuantityOptions)
  plySelect.addEventListener('change', updateQuantityOptions)
  quantitySelect.addEventListener('change', updateQuote)
  priceTableButton.addEventListener('click', openPriceTablePopup)
  pricePopupOverlay.addEventListener('click', closePriceTablePopup)
  pricePopupClose.addEventListener('click', closePriceTablePopup)
  zaloButton.addEventListener('click', () => trackEvent('click_contact', { page: 'hoa_don', button: 'zalo_from_invoice_calculator' }))
}
