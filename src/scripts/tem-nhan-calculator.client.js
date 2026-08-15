import { calculateQuote } from '../utils/temNhanCalculatorLogic.js'
import { temNhanPricingConfig as config } from '../data/temNhanPricingConfig.js'
import { trackEvent } from '../utils/tracking.js'

const form = document.querySelector('#tem-nhan-calculator-form')

if (form) {
  const widthInput = form.querySelector('#width')
  const heightInput = form.querySelector('#height')
  const quantityInput = form.querySelector('#quantity')
  const decalTypeInput = form.querySelector('#decal-type')
  const laminationInput = form.querySelector('#lamination')
  const exportQuoteButton = form.querySelector('#export-quote-btn')
  const resetQuoteButton = form.querySelector('#reset-quote-btn')
  const quoteUnit = document.querySelector('#quote-unit')
  const quoteTotal = document.querySelector('#quote-total')
  const quoteWarning = document.querySelector('#quote-warning')
  const quoteResult = document.querySelector('#quote-result')
  const popup = document.querySelector('#quote-popup')
  const popupCard = document.querySelector('#quote-popup-card')
  const popupOverlay = document.querySelector('#popup-overlay')
  const closePopupButton = document.querySelector('#close-popup-bottom')
  const copyImageButton = document.querySelector('#copy-image-btn')
  const saveImageButton = document.querySelector('#save-image-btn')
  let hasTrackedValidCalculation = false

  const getFormData = () => ({
    width: Number(widthInput.value),
    height: Number(heightInput.value),
    quantity: Number(quantityInput.value),
    decalType: decalTypeInput.value,
    lamination: laminationInput.value,
  })

  const generateQuoteCode = () => {
    const now = new Date()
    const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('')
    const randomNumber = String(Math.floor(Math.random() * 900) + 100)
    return `IST-TEM-${date}-${randomNumber}`
  }

  const getDecalLabel = (value) => config.materials[value]?.label || value
  const getLaminationLabel = (value) => config.laminationFees[value]?.label || value
  const isFormEmpty = (data) => !data.width && !data.height && !data.quantity

  const validateFormData = (data, silent = true) => {
    if (!data.width || !data.height || !data.quantity) {
      if (!silent) window.alert('Vui lòng nhập đầy đủ kích thước và số lượng tem')
      return false
    }

    if (data.width < config.minSize || data.width > config.maxSize || data.height < config.minSize || data.height > config.maxSize) {
      if (!silent) window.alert(`Kích thước tem phải từ ${config.minSize}mm đến ${config.maxSize}mm`)
      return false
    }

    return true
  }

  const resetResult = () => {
    quoteUnit.textContent = '-'
    quoteTotal.textContent = '-'
    quoteWarning.textContent = 'Nhập thông tin bên trái, giá sẽ tự động cập nhật tại đây.'
    quoteWarning.classList.remove('text-orange-500')
    quoteWarning.classList.add('text-gray-500')
    delete quoteResult.dataset.labelsPerSheet
    delete quoteResult.dataset.sheetsNeeded
  }

  const updateResult = (result) => {
    quoteUnit.textContent = result.unitPrice
    quoteTotal.textContent = result.totalPrice
    quoteWarning.textContent = 'Giá đã được tự động cập nhật theo thông tin bạn vừa nhập.'
    quoteWarning.classList.remove('text-gray-500')
    quoteWarning.classList.add('text-orange-500')
    quoteResult.dataset.labelsPerSheet = result.labelsPerSheet
    quoteResult.dataset.sheetsNeeded = result.sheetsNeeded
    if (!hasTrackedValidCalculation) {
      hasTrackedValidCalculation = true
      trackEvent('calculator_interaction', { calculator: 'tem_nhan' })
    }
  }

  const updateQuoteLive = () => {
    const data = getFormData()

    if (isFormEmpty(data)) {
      resetResult()
      return
    }

    if (!validateFormData(data, true)) {
      resetResult()
      quoteWarning.textContent = `Kích thước tem hợp lệ từ ${config.minSize}mm đến ${config.maxSize}mm. Vui lòng kiểm tra lại.`
      quoteWarning.classList.remove('text-gray-500')
      quoteWarning.classList.add('text-orange-500')
      return
    }

    const result = calculateQuote(data)
    if (result) updateResult(result)
    else resetResult()
  }

  const hidePopup = () => {
    popup.classList.add('hidden')
    popup.classList.remove('flex')
    popup.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('overflow-hidden')
    exportQuoteButton.focus()
  }

  const openReferencePopup = () => {
    const data = getFormData()
    if (!validateFormData(data, false)) return

    const result = calculateQuote(data)
    if (!result) {
      window.alert('Không thể tính giá với thông tin hiện tại')
      return
    }

    document.querySelector('#popup-date').textContent = new Date().toLocaleDateString('vi-VN')
    document.querySelector('#popup-quote-code').textContent = generateQuoteCode()
    document.querySelector('#popup-order-size').textContent = `${data.width} x ${data.height} mm`
    document.querySelector('#popup-order-material').textContent = getDecalLabel(data.decalType)
    document.querySelector('#popup-order-lamination').textContent = getLaminationLabel(data.lamination)
    document.querySelector('#popup-order-quantity').textContent = `${data.quantity.toLocaleString('vi-VN')} tem`
    document.querySelector('#popup-unit-price').textContent = result.unitPrice
    document.querySelector('#popup-total-price').textContent = result.totalPrice

    const table = document.querySelector('#reference-table-body')
    const quantities = [...new Set([...config.referenceQuantities, data.quantity])].sort((a, b) => a - b)
    table.innerHTML = quantities.map((quantity) => {
      const reference = calculateQuote({ ...data, quantity })
      const active = quantity === data.quantity
      return `<div class="reference-table-row grid grid-cols-[1.05fr_0.8fr_1.15fr] items-center rounded-xl border px-3 py-2.5 text-[12px] md:grid-cols-3 md:px-4 md:text-sm ${active ? 'active-row border-orange-500 bg-orange-50 shadow-sm' : 'border-slate-200 bg-slate-50'}"><div class="font-bold leading-tight ${active ? 'text-orange-700' : 'text-slate-700'}">${active ? '▶ ' : ''}${quantity.toLocaleString('vi-VN')} tem</div><div class="text-center font-black leading-tight ${active ? 'text-orange-600' : 'text-slate-900'}">${reference.unitPrice}</div><div class="text-right font-bold leading-tight ${active ? 'text-orange-600' : 'text-slate-700'}">${reference.totalPrice}</div></div>`
    }).join('')

    popup.classList.remove('hidden')
    popup.classList.add('flex')
    popup.setAttribute('aria-hidden', 'false')
    document.body.classList.add('overflow-hidden')
    closePopupButton.focus()
    trackEvent('calculator_quote', { calculator: 'tem_nhan' })
  }

  const generatePopupCanvas = async () => {
    if (!popupCard) throw new Error('Không tìm thấy #quote-popup-card')
    const { default: html2canvas } = await import('html2canvas')

    popupCard.classList.add('capture-safe', 'export-desktop', 'export-image')
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    try {
      return await html2canvas(popupCard, {
        backgroundColor: '#f4f4f5',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        width: 1120,
        windowWidth: 1120,
        onclone: (clonedDocument) => clonedDocument.querySelector('#quote-popup-card')?.classList.add('capture-safe', 'export-desktop', 'export-image'),
      })
    } finally {
      popupCard.classList.remove('capture-safe', 'export-desktop', 'export-image')
    }
  }

  const generatePopupBlob = async () => {
    const canvas = await generatePopupCanvas()
    return await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Không thể tạo blob từ canvas')), 'image/png'))
  }

  const savePopupAsImage = async () => {
    saveImageButton.dataset.exportStatus = 'pending'

    try {
      const blob = await generatePopupBlob()
      const imageUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `bao-gia-tem-nhan-ist-${Date.now()}.png`
      document.body.append(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
      saveImageButton.textContent = 'Đã lưu ✓'
      saveImageButton.dataset.exportStatus = 'success'
      setTimeout(() => { saveImageButton.textContent = 'Lưu ảnh' }, 1800)
      trackEvent('quote_export', { calculator: 'tem_nhan', export_method: 'image_save' })
    } catch (error) {
      saveImageButton.dataset.exportStatus = 'error'
      console.error('Save image failed:', error)
      window.alert('Không thể lưu ảnh. Vui lòng kiểm tra console để xem lỗi chi tiết.')
    }
  }

  const copyPopupAsImage = async () => {
    copyImageButton.dataset.exportStatus = 'pending'

    try {
      const blob = await generatePopupBlob()
      if (!navigator.clipboard || !window.ClipboardItem) {
        copyImageButton.dataset.exportStatus = 'fallback'
        window.alert('Trình duyệt chưa hỗ trợ copy ảnh. Hệ thống sẽ chuyển sang lưu ảnh.')
        await savePopupAsImage()
        return
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      copyImageButton.textContent = 'Đã copy ✓'
      copyImageButton.dataset.exportStatus = 'success'
      setTimeout(() => { copyImageButton.textContent = 'Copy ảnh' }, 1800)
      trackEvent('quote_export', { calculator: 'tem_nhan', export_method: 'image_copy' })
    } catch (error) {
      copyImageButton.dataset.exportStatus = 'fallback'
      console.error('Copy image failed:', error)
      window.alert('Trình duyệt đang chặn copy ảnh. Hệ thống sẽ chuyển sang lưu ảnh.')
      await savePopupAsImage()
    }
  }

  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('input', updateQuoteLive)
    field.addEventListener('change', updateQuoteLive)
  })
  exportQuoteButton.addEventListener('click', () => { updateQuoteLive(); openReferencePopup() })
  resetQuoteButton.addEventListener('click', () => {
    widthInput.value = ''
    heightInput.value = ''
    quantityInput.value = ''
    decalTypeInput.value = 'paper'
    laminationInput.value = 'none'
    resetResult()
    widthInput.focus()
  })
  copyImageButton.addEventListener('click', copyPopupAsImage)
  saveImageButton.addEventListener('click', savePopupAsImage)
  closePopupButton.addEventListener('click', hidePopup)
  popupOverlay.addEventListener('click', hidePopup)
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !popup.classList.contains('hidden')) hidePopup() })
  resetResult()
}
