import html2canvas from 'html2canvas'
import { trackEvent } from '../utils/tracking'
import { calculateQuote } from '../utils/temNhanCalculatorLogic'
import { temNhanPricingConfig as config } from '../data/temNhanPricingConfig'

export function TemNhanCalculator() {

  setTimeout(() => {

      const form =
        document.querySelector('#tem-nhan-calculator-form')

      const exportQuoteBtn =
        document.querySelector('#export-quote-btn')

      const resetQuoteBtn =
        document.querySelector('#reset-quote-btn')

      const popup =
        document.querySelector('#quote-popup')

      const popupCard =
        document.querySelector('#quote-popup-card')

      const popupOverlay =
        document.querySelector('#popup-overlay')

      const closePopupBottom =
        document.querySelector('#close-popup-bottom')

      const copyImageBtn =
        document.querySelector('#copy-image-btn')

      const saveImageBtn =
        document.querySelector('#save-image-btn')

      const quoteWarning =
        document.querySelector('#quote-warning')

      let latestQuoteText = ''

      function getFormData() {
        return {
          width: Number(document.querySelector('#width').value),
          height: Number(document.querySelector('#height').value),
          quantity: Number(document.querySelector('#quantity').value),
          decalType: document.querySelector('#decal-type').value,
          lamination: document.querySelector('#lamination').value,
        }
      }

      function generateQuoteCode() {
        const now = new Date()

        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')

        const randomNumber =
          String(Math.floor(Math.random() * 900) + 100)

        return `IST-TEM-${year}${month}${day}-${randomNumber}`
      }

      function getDecalLabel(value) {
        return config.materials[value]?.label || value
      }

      function getLaminationLabel(value) {
        return config.laminationFees[value]?.label || value
      }

      function isFormEmpty(formData) {
        return (
          !formData.width &&
          !formData.height &&
          !formData.quantity
        )
      }

      function validateFormData(formData, silent = true) {
        if (
          !formData.width ||
          !formData.height ||
          !formData.quantity
        ) {
          if (!silent) {
            alert('Vui lòng nhập đầy đủ kích thước và số lượng tem')
          }

          return false
        }

        if (
          formData.width < config.minSize ||
          formData.width > config.maxSize ||
          formData.height < config.minSize ||
          formData.height > config.maxSize
        ) {
          if (!silent) {
            alert(`Kích thước tem phải từ ${config.minSize}mm đến ${config.maxSize}mm`)
          }

          return false
        }

        return true
      }

      function resetResult() {
        function resetResult() {
          document.querySelector('#quote-unit').textContent = '-'
          document.querySelector('#quote-total').textContent = '-'

          latestQuoteText = ''

          quoteWarning.textContent =
            'Nhập thông tin bên trái, giá sẽ tự động cập nhật tại đây.'

          quoteWarning.classList.remove('text-orange-500')
          quoteWarning.classList.add('text-gray-500')
        }
      }

      function updateResult(result, formData) {
        document.querySelector('#quote-unit').textContent =
          result.unitPrice

        document.querySelector('#quote-total').textContent =
          result.totalPrice

        latestQuoteText = `
      BÁO GIÁ TEM NHÃN THAM KHẢO - IST
      Kích thước tem: ${formData.width} x ${formData.height} mm
      Loại decal: ${getDecalLabel(formData.decalType)}
      Cán màng: ${getLaminationLabel(formData.lamination)}
      Số lượng: ${formData.quantity.toLocaleString('vi-VN')} tem
      Đơn giá 1 tem: ${result.unitPrice}
      Tổng tiền: ${result.totalPrice}
      `.trim()

        quoteWarning.textContent =
          'Giá đã được tự động cập nhật theo thông tin bạn vừa nhập.'

        quoteWarning.classList.remove('text-gray-500')
        quoteWarning.classList.add('text-orange-500')
      }

      function updateQuoteLive() {
        const formData = getFormData()

        if (isFormEmpty(formData)) {
          resetResult()
          return
        }

        if (!validateFormData(formData, true)) {
          resetResult()

          quoteWarning.textContent =
            `Kích thước tem hợp lệ từ ${config.minSize}mm đến ${config.maxSize}mm. Vui lòng kiểm tra lại.`

          quoteWarning.classList.remove('text-gray-500')
          quoteWarning.classList.add('text-orange-500')

          return
        }

        const result = calculateQuote(formData)

        if (!result) {
          resetResult()
          return
        }

        updateResult(result, formData)
      }

      function openReferencePopup() {
        const formData = getFormData()

        if (!validateFormData(formData, false)) {
          return
        }

        const result = calculateQuote(formData)

        if (!result) {
          alert('Không thể tính giá với thông tin hiện tại')
          return
        }

        popup.classList.remove('hidden')
        popup.classList.add('flex')

        const now = new Date()
        const formattedDate =
          now.toLocaleDateString('vi-VN')

        document.querySelector('#popup-date').textContent =
          formattedDate

        document.querySelector('#popup-quote-code').textContent =
          generateQuoteCode()

        document.querySelector('#popup-order-size').textContent =
          `${formData.width} x ${formData.height} mm`

        document.querySelector('#popup-order-material').textContent =
          getDecalLabel(formData.decalType)

        document.querySelector('#popup-order-lamination').textContent =
          getLaminationLabel(formData.lamination)

        document.querySelector('#popup-order-quantity').textContent =
          `${formData.quantity.toLocaleString('vi-VN')} tem`

        document.querySelector('#popup-unit-price').textContent =
          result.unitPrice

        document.querySelector('#popup-total-price').textContent =
          result.totalPrice

        const table =
          document.querySelector('#reference-table-body')

        table.innerHTML = ''

        const quantitiesSet = new Set([
          ...config.referenceQuantities,
          formData.quantity,
        ])

        const quantities =
          Array
            .from(quantitiesSet)
            .sort((a, b) => a - b)

        quantities.forEach((q) => {
          const tempResult =
            calculateQuote({
              ...formData,
              quantity: q
            })

          const isActive =
            q === formData.quantity

          table.innerHTML += `
            <div class="
              grid grid-cols-[1.05fr_0.8fr_1.15fr] items-center rounded-xl border px-3 py-2.5 text-[12px] md:grid-cols-3 md:px-4 md:text-sm
              ${isActive
                ? 'border-orange-500 bg-orange-50 shadow-sm'
                : 'border-slate-200 bg-slate-50'}
            ">
              <div class="font-bold leading-tight ${isActive ? 'text-orange-700' : 'text-slate-700'}">
                ${isActive ? '▶ ' : ''}${q.toLocaleString('vi-VN')} tem
              </div>

              <div class="text-center font-black leading-tight ${isActive ? 'text-orange-600' : 'text-slate-900'}">
                ${tempResult.unitPrice}
              </div>

              <div class="text-right font-bold leading-tight ${isActive ? 'text-orange-600' : 'text-slate-700'}">
                ${tempResult.totalPrice}
              </div>
            </div>
          `
        })

        trackEvent('export_quote', {
          page: 'tem_nhan',
          tool: 'tem_nhan_calculator'
        })
      }
      
      function hidePopup() {
        popup.classList.add('hidden')
        popup.classList.remove('flex')
      }

      async function generatePopupCanvas() {
        return await html2canvas(popupCard, {
          backgroundColor: '#f4f4f5',
          scale: 2,
          useCORS: true,
        })
      }

      async function copyPopupAsImage() {
        try {
          const canvas = await generatePopupCanvas()

          const blob = await new Promise((resolve) => {
            canvas.toBlob((blob) => {
              resolve(blob)
            }, 'image/png')
          })

          if (!blob) {
            alert('Không thể tạo ảnh báo giá.')
            return
          }

          if (
            !navigator.clipboard ||
            !window.ClipboardItem
          ) {
            alert('Trình duyệt hiện tại chưa hỗ trợ copy ảnh. Bạn vui lòng bấm "Lưu ảnh" để tải ảnh báo giá.')
            return
          }

          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ])

          copyImageBtn.textContent = 'Đã copy ✓'

          setTimeout(() => {
            copyImageBtn.textContent = 'Copy ảnh'
          }, 1800)

          trackEvent('copy_quote_image', {
            page: 'tem_nhan',
            tool: 'tem_nhan_calculator'
          })
        } catch (error) {
          console.error('Copy image failed:', error)

          alert('Trình duyệt đang chặn copy ảnh. Bạn vui lòng bấm "Lưu ảnh" để tải ảnh báo giá.')
        }
      }

      async function savePopupAsImage() {
        try {
          const canvas = await generatePopupCanvas()
          const imageUrl = canvas.toDataURL('image/png')

          const link = document.createElement('a')
          link.href = imageUrl
          link.download = `bao-gia-tem-nhan-ist-${Date.now()}.png`

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          trackEvent('save_quote_image', {
            page: 'tem_nhan',
            tool: 'tem_nhan_calculator'
          })
        } catch (error) {
          console.error('Save image failed:', error)

          alert('Không thể lưu ảnh. Vui lòng thử lại.')
        }
      }

      form
        ?.querySelectorAll('input, select')
        .forEach((field) => {
          field.addEventListener('input', updateQuoteLive)
          field.addEventListener('change', updateQuoteLive)
        })

      exportQuoteBtn?.addEventListener('click', () => {
        const formData = getFormData()

        if (!validateFormData(formData, false)) {
          return
        }

        updateQuoteLive()
        openReferencePopup()
      })

      resetQuoteBtn?.addEventListener('click', () => {
        document.querySelector('#width').value = ''
        document.querySelector('#height').value = ''
        document.querySelector('#quantity').value = ''

        document.querySelector('#decal-type').value = 'paper'
        document.querySelector('#lamination').value = 'none'

        resetResult()

        document.querySelector('#width').focus()

        trackEvent('reset_quote', {
          page: 'tem_nhan',
          tool: 'tem_nhan_calculator'
        })
      })


      closePopupBottom?.addEventListener('click', hidePopup)

      popup?.addEventListener('click', (e) => {
        if (e.target === popup) {
          hidePopup()
        }
      })

      form
        ?.querySelectorAll('input, select')
        .forEach((field) => {
          field.addEventListener('input', updateQuoteLive)
          field.addEventListener('change', updateQuoteLive)
        })

      exportQuoteBtn?.addEventListener('click', () => {
        const formData = getFormData()

        if (!validateFormData(formData, false)) {
          return
        }

        updateQuoteLive()
        openReferencePopup()

        trackEvent('export_quote', {
          page: 'tem_nhan',
          tool: 'tem_nhan_calculator'
        })
      })

      resetQuoteBtn?.addEventListener('click', () => {
        document.querySelector('#width').value = ''
        document.querySelector('#height').value = ''
        document.querySelector('#quantity').value = ''

        document.querySelector('#decal-type').value = 'paper'
        document.querySelector('#lamination').value = 'none'

        resetResult()

        document.querySelector('#width').focus()

        trackEvent('reset_quote', {
          page: 'tem_nhan',
          tool: 'tem_nhan_calculator'
        })
      })

      copyImageBtn?.addEventListener('click', copyPopupAsImage)

      saveImageBtn?.addEventListener('click', savePopupAsImage)

      closePopupBottom?.addEventListener('click', hidePopup)

      popupOverlay?.addEventListener('click', hidePopup)

      resetResult()

}, 0)

  return `
    <section id="contact" class="border-t border-zinc-900 bg-zinc-950 fade-in">

    <div class="max-w-6xl mx-auto px-6 py-24">

      <div class="grid lg:grid-cols-12 gap-10 items-end mb-12">

        <div class="lg:col-span-8">
          <p class="text-orange-500 font-semibold mb-4 tracking-widest uppercase">
            BÁO GIÁ TEM NHÃN
          </p>

          <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
            Tự tính giá tem nhãn<br>
            theo nhu cầu của bạn
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed max-w-3xl">
            Nhập kích thước, số lượng, chất liệu và kiểu gia công. Hệ thống sẽ tính giá tham khảo
            để bạn dễ hình dung chi phí trước khi nhắn Zalo đặt hàng.
          </p>
        </div>

        <div class="lg:col-span-4">
          <div class="rounded-3xl border border-zinc-800 bg-black p-6">
            <p class="text-orange-500 font-bold mb-2">
              Cần báo giá chính xác hơn?
            </p>
            <p class="text-gray-400 text-sm leading-relaxed">
              Gửi thêm hình mẫu, file thiết kế hoặc sản phẩm thực tế để IST tư vấn đúng chất liệu và quy cách.
            </p>
          </div>
        </div>

      </div>

      <!-- Calculator Box -->
      <div
        id="tem-nhan-calculator-form"
        class="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-8"
      >

        <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-start">

          <!-- Left: Form -->
          <div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Chiều ngang tem (mm)
                </label>

                <input
                  id="width"
                  type="number"
                  min="20"
                  max="300"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                  placeholder="Ví dụ: 50"
                />
              </div>

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Chiều cao tem (mm)
                </label>

                <input
                  id="height"
                  type="number"
                  min="20"
                  max="300"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                  placeholder="Ví dụ: 50"
                />
              </div>

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Loại decal
                </label>

                <select
                  id="decal-type"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                >
                  <option value="paper">
                    Decal giấy
                  </option>

                  <option value="plastic">
                    Decal nhựa
                  </option>

                  <option value="clear-plastic">
                    Decal nhựa trong
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Cán màng
                </label>

                <select
                  id="lamination"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                >
                  <option value="none">
                    Không cán màng
                  </option>

                  <option value="glossy">
                    Màng bóng
                  </option>

                  <option value="matte">
                    Màng mờ
                  </option>
                </select>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm text-gray-400 mb-3">
                  Số lượng tem
                </label>

                <input
                  id="quantity"
                  type="number"
                  min="1"
                  class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                  placeholder="Ví dụ: 1000"
                />
              </div>

            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <button
                id="export-quote-btn"
                type="button"
                class="bg-orange-500 hover:bg-orange-600 transition rounded-xl py-4 md:py-5 text-base md:text-lg font-bold"
              >
                Xuất báo giá
              </button>

              <button
                id="reset-quote-btn"
                type="button"
                class="border border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 transition rounded-xl py-4 md:py-5 text-base md:text-lg font-bold"
              >
                Làm mới
              </button>

            </div>

            <p class="mt-4 text-sm text-gray-500 leading-relaxed">
              Kích thước hợp lệ từ 20mm đến 300mm. Giá chỉ mang tính tham khảo.
            </p>

          </div>

          <!-- Right: Result -->
          <div
            id="quote-result"
            class="bg-black rounded-3xl p-5 md:p-8 border border-zinc-800 lg:sticky lg:top-28"
          >

            <div class="mb-6">
              <p class="text-orange-500 font-semibold mb-3 tracking-widest uppercase">
                KẾT QUẢ BÁO GIÁ
              </p>

              <h3 class="text-2xl md:text-3xl font-black leading-tight">
                Giá tem nhãn tham khảo
              </h3>

              <p
                id="quote-warning"
                class="mt-3 text-sm text-gray-500 leading-relaxed"
              >
                Nhập thông tin bên trái, giá sẽ tự động cập nhật tại đây.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-5">

              <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6 min-w-0">
                <p class="text-orange-300 mb-3">
                  Đơn giá 1 tem
                </p>

                <p
                  id="quote-unit"
                  class="text-orange-500 text-3xl md:text-4xl font-black break-words leading-tight"
                >
                  -
                </p>
              </div>

              <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-6 min-w-0">
                <p class="text-gray-400 mb-3">
                  Tổng tiền
                </p>

                <p
                  id="quote-total"
                  class="text-white text-3xl md:text-4xl font-black break-words leading-tight"
                >
                  -
                </p>
              </div>

            </div>

            <p class="mt-5 text-sm text-gray-500 leading-relaxed">
              Giá thực tế có thể thay đổi theo file thiết kế, kiểu bế, chất liệu, cán màng và tiến độ cần giao.
            </p>

          </div>

        </div>

      </div>

          <!-- Popup -->
          <div
            id="quote-popup"
            class="fixed inset-0 z-[999] hidden items-center justify-center bg-black/75 p-4"
          >
            <div
              id="popup-overlay"
              class="absolute inset-0"
            ></div>

            <div
              id="quote-popup-card"
              class="relative z-10 w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-[20px] md:rounded-[24px] bg-zinc-100 text-slate-800 shadow-2xl"
            >

              <!-- Header -->
              <div class="border-b border-slate-300 bg-white px-4 py-4 md:px-6">

                <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">

                  <div class="flex items-start gap-3 md:gap-4">
                    <img
                      src="/images/logo-ist.png"
                      alt="Logo IST"
                      class="h-12 w-auto shrink-0 object-contain md:h-14"
                    />

                    <div class="min-w-0">
                      <h3 class="text-lg font-black leading-tight text-slate-900 md:text-2xl">
                        BÁO GIÁ TEM NHÃN IST
                      </h3>

                      <p class="mt-1 text-xs text-slate-500 md:text-sm">
                        Công ty TNHH MTV Quảng Cáo In Sáng Tạo
                      </p>

                      <p class="mt-1 text-xs text-slate-500">
                        Thiết kế - In ấn - Quảng cáo
                      </p>
                    </div>
                  </div>

                  <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left md:shrink-0 md:text-right">
                    <p
                      id="popup-quote-code"
                      class="text-base font-black text-slate-900 md:text-xl"
                    >
                      IST-TEM-000
                    </p>

                    <p
                      id="popup-date"
                      class="mt-1 text-sm text-slate-500"
                    >
                      -
                    </p>

                    <p class="mt-1 text-xs text-slate-500">
                      Giá trị tham khảo
                    </p>
                  </div>

                </div>

              </div>

              <!-- Body -->
              <div class="grid grid-cols-1 gap-5 px-4 py-4 md:px-6 md:py-5 lg:grid-cols-[340px_1fr]">

                <!-- Left -->
                <div>

                  <!-- Order Info -->
                  <div class="mb-4 overflow-hidden rounded-2xl border border-slate-300 bg-white">

                    <div class="border-b border-slate-200 px-4 py-3">
                      <p class="text-sm font-black uppercase tracking-wide text-slate-800">
                        Thông tin đơn hàng
                      </p>
                    </div>

                    <div class="divide-y divide-slate-200 text-sm">

                      <div class="flex items-center justify-between gap-4 px-4 py-3">
                        <span class="text-slate-500">
                          Kích thước
                        </span>

                        <strong
                          id="popup-order-size"
                          class="text-right text-slate-900"
                        >
                          -
                        </strong>
                      </div>

                      <div class="flex items-center justify-between gap-4 px-4 py-3">
                        <span class="text-slate-500">
                          Vật liệu
                        </span>

                        <strong
                          id="popup-order-material"
                          class="text-right text-slate-900"
                        >
                          -
                        </strong>
                      </div>

                      <div class="flex items-center justify-between gap-4 px-4 py-3">
                        <span class="text-slate-500">
                          Cán màng
                        </span>

                        <strong
                          id="popup-order-lamination"
                          class="text-right text-slate-900"
                        >
                          -
                        </strong>
                      </div>

                      <div class="flex items-center justify-between gap-4 px-4 py-3">
                        <span class="text-slate-500">
                          Số lượng
                        </span>

                        <strong
                          id="popup-order-quantity"
                          class="text-right text-slate-900"
                        >
                          -
                        </strong>
                      </div>

                    </div>

                  </div>

                  <!-- Price Main -->
                  <div class="overflow-hidden rounded-2xl border border-orange-300 bg-orange-50">

                    <div class="flex items-center justify-between gap-4 border-b border-orange-200 px-4 py-3">
                      <span class="font-bold text-orange-700">
                        Giá / 1 tem
                      </span>

                      <strong
                        id="popup-unit-price"
                        class="text-xl font-black text-orange-600 md:text-2xl"
                      > 
                        -
                      </strong>
                    </div>

                    <div class="flex items-center justify-between gap-4 px-4 py-3">
                      <span class="font-bold text-orange-700">
                        Tổng tiền
                      </span>

                      <strong
                        id="popup-total-price"
                        class="text-2xl font-black text-orange-600 md:text-3xl"
                      >
                        -
                      </strong>
                    </div>

                  </div>

                  <!-- Note -->
                  <div class="mt-4 rounded-2xl border border-slate-300 bg-white px-4 py-3">
                    <p class="text-xs leading-relaxed text-slate-500">
                      Giá chỉ mang tính tham khảo. Giá thực tế có thể thay đổi theo file thiết kế,
                      kiểu bế, chất liệu, cán màng và tiến độ cần giao.
                    </p>
                  </div>

                </div>

                <!-- Right -->
                <div>

                  <div class="overflow-hidden rounded-2xl border border-slate-300 bg-white">

                    <div class="border-b border-slate-200 px-4 py-3">
                      <p class="text-sm font-black uppercase tracking-wide text-slate-800">
                        Giá tham khảo theo số lượng
                      </p>
                    </div>

                    <div class="px-3 py-3 md:px-4">

                      <div class="mb-2 grid grid-cols-[1.05fr_0.8fr_1.15fr] rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-bold text-white md:grid-cols-3 md:px-4 md:text-xs">
                        <div>
                          SL
                        </div>

                        <div class="text-center">
                          Giá
                        </div>

                        <div class="text-right">
                          Tổng
                        </div>
                      </div>

                      <div
                        id="reference-table-body"
                        class="space-y-1.5"
                      ></div>

                    </div>

                </div>

              </div>
            </div>
              <!-- Footer -->
              <div class="flex flex-col gap-3 border-t border-slate-300 bg-white px-4 py-3 md:flex-row md:items-center md:justify-end md:px-6 rounded-b-[20px] md:rounded-b-[24px]">

                <button
                  id="copy-image-btn"
                  type="button"
                  class="w-full rounded-xl bg-emerald-600 px-4 py-2.5 font-bold text-white hover:bg-emerald-700 transition md:w-auto"
                >
                  Copy ảnh
                </button>

                <button
                  id="save-image-btn"
                  type="button"
                  class="w-full rounded-xl bg-orange-500 px-4 py-2.5 font-bold text-white hover:bg-orange-600 transition md:w-auto"
                >
                  Lưu ảnh
                </button>

                <button
                  id="close-popup-bottom"
                  type="button"
                  class="w-full rounded-xl border border-slate-300 px-4 py-2.5 font-bold text-slate-700 hover:bg-slate-100 transition md:w-auto"
                >
                  Đóng
                </button>

              </div>

            </div>
          </div>

        </div>

    </section>
  `
}