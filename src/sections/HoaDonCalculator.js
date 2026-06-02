import {
  getSizeOptions,
  getPlyOptions,
  getQuantityOptions,
  calculateHoaDonQuote,
  formatCurrency,
} from '../utils/hoaDonCalculatorLogic'

import { hoaDonPricingConfig as config } from '../data/hoaDonPricingConfig'

export function HoaDonCalculator() {
  setTimeout(() => {
    const sizeSelect =
      document.querySelector('#invoice-size')

    const plySelect =
      document.querySelector('#invoice-ply')

    const quantitySelect =
      document.querySelector('#invoice-quantity')

    const resultBox =
      document.querySelector('#invoice-result')

    const resultUnit =
      document.querySelector('#invoice-unit-price')

    const resultTotal =
      document.querySelector('#invoice-total-price')

    const resultInfo =
      document.querySelector('#invoice-info')

    const resultNote =
      document.querySelector('#invoice-note')

    const zaloBtn =
      document.querySelector('#invoice-zalo-btn')

    const priceTableBtn =
        document.querySelector('#invoice-price-table-btn')

    const pricePopup =
        document.querySelector('#invoice-price-popup')

    const pricePopupOverlay =
        document.querySelector('#invoice-price-popup-overlay')

    const pricePopupClose =
        document.querySelector('#invoice-price-popup-close')

    const pricePopupTitle =
        document.querySelector('#invoice-popup-title')

    const pricePopupSubtitle =
        document.querySelector('#invoice-popup-subtitle')

    const pricePopupNote =
        document.querySelector('#invoice-popup-note')

    const priceTableBody =
        document.querySelector('#invoice-price-table-body')

    function renderOptions(select, options, placeholder = '') {
      if (!select) {
        return
      }

      if (!options.length) {
        select.innerHTML =
          `<option value="">${placeholder || 'Liên hệ báo giá'}</option>`
        return
      }

      select.innerHTML =
        options.map((item) => `
          <option value="${item.value}">
            ${item.label}
          </option>
        `).join('')
    }

    function updateQuantityOptions() {
      const size = sizeSelect.value
      const ply = plySelect.value

      const quantities =
        getQuantityOptions(size, ply)

      renderOptions(
        quantitySelect,
        quantities,
        'Liên hệ IST để báo giá'
      )

      updateQuote()
    }

    function updateQuote() {
      const quote = calculateHoaDonQuote({
        size: sizeSelect.value,
        ply: plySelect.value,
        quantity: Number(quantitySelect.value),
      })

      if (!quote) {
        resultBox.classList.add('opacity-80')

        resultUnit.textContent = '-'
        resultTotal.textContent = '-'

        resultInfo.innerHTML =
          'Quy cách này chưa có bảng giá tự động. Vui lòng liên hệ IST để được tư vấn chính xác.'

        resultNote.textContent =
          'Một số quy cách như A7 hoặc 3 liên cần kiểm tra mẫu, loại giấy và số lượng thực tế trước khi báo giá.'

        zaloBtn.href =
          'https://zalo.me/0974313230'

        return
      }

      resultBox.classList.remove('opacity-80')

      resultUnit.textContent =
        quote.unitPriceText

      resultTotal.textContent =
        quote.totalPriceText

      resultInfo.innerHTML = `
        <strong class="text-white">${quote.quantity.toLocaleString('vi-VN')} cuốn</strong>
        <span class="text-gray-400"> - ${quote.size} / ${quote.plyLabel} - Thành phẩm khoảng ${quote.finishedSize}</span>
      `

      resultNote.textContent =
        quote.note

      const zaloText =
        `Tôi cần báo giá in hóa đơn ${quote.size} ${quote.plyLabel}, số lượng ${quote.quantity} cuốn. Giá tham khảo trên web: ${quote.totalPriceText}`

      zaloBtn.href =
        `https://zalo.me/0974313230?text=${encodeURIComponent(zaloText)}`
    }

    function openPriceTablePopup() {
        const size = sizeSelect.value
        const ply = plySelect.value
        const currentQuantity = Number(quantitySelect.value)

        const sizeData = config.sizes[size]
        const plyData = sizeData?.plies[ply]

        if (!sizeData || !plyData) {
            alert('Quy cách này chưa có bảng giá tự động.')
            return
        }

        pricePopupTitle.textContent =
            `${size} / ${plyData.label}`

        pricePopupSubtitle.textContent =
            `${sizeData.description} - Thành phẩm khoảng ${sizeData.finishedSize}`

        pricePopupNote.textContent =
            plyData.note

        priceTableBody.innerHTML =
            plyData.quantities.map((item) => {
            const isActive =
                item.qty === currentQuantity

            const total =
                item.qty * item.unitPrice

            return `
                <div class="
                grid grid-cols-3 items-center rounded-xl border px-4 py-3 text-sm md:text-base
                ${isActive
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-zinc-800 bg-black'}
                ">
                <div class="font-bold ${isActive ? 'text-orange-500' : 'text-gray-300'}">
                    ${isActive ? '▶ ' : ''}${item.qty.toLocaleString('vi-VN')} cuốn
                </div>

                <div class="text-center font-black ${isActive ? 'text-orange-500' : 'text-white'}">
                    ${formatCurrency(item.unitPrice)}
                </div>

                <div class="text-right font-black ${isActive ? 'text-orange-500' : 'text-white'}">
                    ${formatCurrency(total)}
                </div>
                </div>
            `
            }).join('')

        pricePopup.classList.remove('hidden')
        pricePopup.classList.add('flex')

        trackEvent('open_invoice_price_table', {
            page: 'hoa_don',
            size,
            ply,
        })
        }

        function closePriceTablePopup() {
        pricePopup.classList.add('hidden')
        pricePopup.classList.remove('flex')
        }

    renderOptions(sizeSelect, getSizeOptions())
    renderOptions(plySelect, getPlyOptions())

    sizeSelect.value = config.default.size
    plySelect.value = config.default.ply

    updateQuantityOptions()

    sizeSelect.addEventListener('change', updateQuantityOptions)
    plySelect.addEventListener('change', updateQuantityOptions)
    quantitySelect.addEventListener('change', updateQuote)
    
    priceTableBtn.addEventListener('click', openPriceTablePopup)
    pricePopupOverlay.addEventListener('click', closePriceTablePopup)
    pricePopupClose.addEventListener('click', closePriceTablePopup)


  }, 0)

  return `
    <section
      id="calculator"
      class="bg-black text-white py-20"
    >
      <div class="max-w-7xl mx-auto px-6">

        <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">

          <div>
            <p class="text-orange-500 font-semibold tracking-[0.2em] uppercase mb-4">
              Bảng giá tham khảo
            </p>

            <h2 class="text-white text-4xl md:text-5xl font-black leading-tight mb-6">
              Chọn đúng quy cách,
              <br>
              xem giá nhanh
            </h2>

            <p class="text-gray-400 leading-relaxed mb-6">
              Hóa đơn và biểu mẫu được tính theo các mốc số lượng tối ưu để
              chẵn giấy, dễ sản xuất và có giá tốt hơn. Khách hàng chỉ cần chọn
              đúng khổ, số liên và số lượng phù hợp.
            </p>

            <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
              <p class="text-orange-300 font-semibold mb-2">
                Lưu ý sản xuất
              </p>

              <p class="text-gray-300 text-sm leading-relaxed">
                Các mốc số lượng được thiết kế để hạn chế lẻ ream giấy.
                Nếu cần số lượng khác bảng, IST sẽ tư vấn riêng để tối ưu chi phí.
              </p>
            </div>
          </div>

          <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">

            <div class="grid md:grid-cols-3 gap-5 mb-6">

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Kích thước
                </label>

                <select
                  id="invoice-size"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500"
                ></select>
              </div>

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Loại hóa đơn
                </label>

                <select
                  id="invoice-ply"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500"
                ></select>
              </div>

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Số lượng
                </label>

                <select
                  id="invoice-quantity"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500"
                ></select>
              </div>

            </div>

            <div
              id="invoice-result"
              class="bg-black rounded-3xl border border-zinc-800 p-6 md:p-8"
            >

              <p class="text-orange-500 font-semibold tracking-[0.2em] uppercase mb-4">
                Kết quả báo giá
              </p>

              <div class="grid md:grid-cols-2 gap-5 mb-6">

                <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
                  <p class="text-orange-300 mb-3">
                    Đơn giá / cuốn
                  </p>

                  <p
                    id="invoice-unit-price"
                    class="text-3xl md:text-4xl font-black text-orange-500 break-words"
                  >
                    -
                  </p>
                </div>

                <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-6">
                  <p class="text-gray-400 mb-3">
                    Tổng tiền
                  </p>

                  <p
                    id="invoice-total-price"
                    class="text-3xl md:text-4xl font-black text-white break-words"
                  >
                    -
                  </p>
                </div>

              </div>

              <p
                id="invoice-info"
                class="text-gray-300 leading-relaxed mb-3"
              ></p>

              <p
                id="invoice-note"
                class="text-gray-500 text-sm leading-relaxed mb-6"
              ></p>

              <div class="grid md:grid-cols-2 gap-4">
                <a
                  id="invoice-zalo-btn"
                  href="https://zalo.me/0974313230"
                  target="_blank"
                  onclick="
                    trackEvent('click_contact', {
                      page: 'hoa_don',
                      button: 'zalo_from_invoice_calculator'
                    })
                  "
                  class="bg-orange-500 text-white hover:bg-orange-600 transition rounded-xl px-5 py-4 text-center font-bold"
                >
                  Nhắn Zalo đặt in
                </a>

                <button
                id="invoice-price-table-btn"
                type="button"
                class="text-white border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition rounded-xl px-5 py-4 text-center font-bold"
                >
                Xem giá theo số lượng
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      <!-- Price Table Popup -->
      <div
        id="invoice-price-popup"
        class="fixed inset-0 z-[999] hidden items-center justify-center bg-black/75 p-4"
      >
        <div
          id="invoice-price-popup-overlay"
          class="absolute inset-0"
        ></div>

        <div class="relative z-10 w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl overflow-hidden">

          <div class="flex items-start justify-between gap-5 border-b border-zinc-800 px-6 py-5">
            <div>
              <p class="text-orange-500 font-semibold tracking-[0.18em] uppercase mb-2">
                Bảng giá theo số lượng
              </p>

              <h3
                id="invoice-popup-title"
                class="text-2xl md:text-3xl font-black"
              >
                -
              </h3>

              <p
                id="invoice-popup-subtitle"
                class="mt-2 text-sm text-gray-400"
              >
                -
              </p>
            </div>

            <button
              id="invoice-price-popup-close"
              type="button"
              class="shrink-0 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
            >
              Đóng
            </button>
          </div>

          <div class="p-5 md:p-6">
            <div class="grid grid-cols-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-black text-white mb-3">
              <div>Số lượng</div>
              <div class="text-center">Đơn giá</div>
              <div class="text-right">Thành tiền</div>
            </div>

            <div
              id="invoice-price-table-body"
              class="grid gap-2"
            ></div>

            <p
              id="invoice-popup-note"
              class="mt-5 text-sm text-gray-500 leading-relaxed"
            >
              -
            </p>
          </div>

        </div>
      </div>

    </section>
  `
}