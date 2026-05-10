import { trackEvent } from '../utils/tracking'
import { calculateQuote } from '../utils/temNhanCalculatorLogic'

export function TemNhanCalculator() {

  setTimeout(() => {

  // ELEMENTS
  const calculateBtn =
    document.querySelector('#calculate-btn')

  const referencePriceBtn =
    document.querySelector('#reference-price-btn')

  const popup =
    document.querySelector('#quote-popup')

  const closePopup =
    document.querySelector('#close-popup')

  const closePopupBottom =
    document.querySelector('#close-popup-bottom')

  const copyQuoteBtn = document.querySelector('#copy-quote-btn')
    let latestQuoteText = ''


  // GET FORM DATA
  function getFormData() {
  return {
    width: Number(document.querySelector('#width').value),
    height: Number(document.querySelector('#height').value),
    quantity: Number(document.querySelector('#quantity').value),
    decalType: document.querySelector('#decal-type').value,
    shape: 'round',
    lamination: document.querySelector('#lamination').value,
    customerType: 'regular',
  }
}

function getDecalLabel(value) {
  const labels = {
    paper: 'Decal giấy',
    plastic: 'Decal nhựa',
    'clear-plastic': 'Decal nhựa trong',
  }

  return labels[value] || value
}

function getLaminationLabel(value) {
  const labels = {
    none: 'Không cán màng',
    glossy: 'Màng bóng',
    matte: 'Màng mờ',
  }

  return labels[value] || value
}

  // UPDATE RESULT UI
  function updateResult(result) {
    const formData = getFormData()

    document
      .querySelector('#quote-result')
      .classList.remove('hidden')

    document
      .querySelector('#quote-size')
      .textContent = `${formData.width} x ${formData.height} mm`

    document
      .querySelector('#quote-decal')
      .textContent = getDecalLabel(formData.decalType)

    document
      .querySelector('#quote-lamination')
      .textContent = getLaminationLabel(formData.lamination)

    document
      .querySelector('#quote-quantity')
      .textContent = `${formData.quantity.toLocaleString('vi-VN')} tem`

    document
      .querySelector('#quote-unit')
      .textContent = result.unitPrice

    document
      .querySelector('#quote-total')
      .textContent = result.totalPrice

    latestQuoteText = `
  BÁO GIÁ TEM NHÃN THAM KHẢO - IST
  Kích thước tem: ${formData.width} x ${formData.height} mm
  Loại decal: ${getDecalLabel(formData.decalType)}
  Cán màng: ${getLaminationLabel(formData.lamination)}
  Số lượng: ${formData.quantity.toLocaleString('vi-VN')} tem
  Đơn giá 1 tem: ${result.unitPrice}
  Tổng tiền: ${result.totalPrice}
  `.trim()
  }

  // CALCULATE BUTTON
  if (calculateBtn) {

    calculateBtn.addEventListener('click', () => {

      trackEvent('calculate_quote', {
        page: 'tem_nhan',
        tool: 'tem_nhan_calculator'
      })

      const formData = getFormData()

      if (
        formData.width < 20 ||
        formData.width > 300 ||
        formData.height < 20 ||
        formData.height > 300
      ) {
        alert('Kích thước không nhỏ hơn 2cm, không lớn hơn 30cm. Kích thước đặc biệt vui lòng liên hệ IST để được tư vấn.').innerHTML = ''
        return
      }

      const result = calculateQuote(formData)

      if (!result) {

        alert('Vui lòng nhập đầy đủ thông tin')

        return

      }

      updateResult(result)

    })

  }

 // REFERENCE PRICE BUTTON
    if (referencePriceBtn) {
      referencePriceBtn.addEventListener('click', () => {
      const formData = getFormData()

      if (
        formData.width < 20 ||
        formData.width > 300 ||
        formData.height < 20 ||
        formData.height > 300
      ) {
        alert('Kích thước không nhỏ hơn 2cm, không lớn hơn 30cm. Kích thước đặc biệt vui lòng liên hệ IST để được tư vấn.').innerHTML = ''
        return
      }

      const result = calculateQuote(formData)

        if (!result) {
          alert('Vui lòng nhập đầy đủ thông tin')
          return
        }

        popup.classList.remove('hidden')
        popup.classList.add('flex')

        // SUMMARY
        const summary = document.querySelector('#popup-summary')

          summary.innerHTML = `
            <div class="bg-black border border-zinc-800 rounded-2xl p-5">
              <p class="text-gray-400 mb-2">
                Kích thước
              </p>

              <h4 class="text-xl md:text-2xl font-bold">
                ${formData.width} x ${formData.height} mm
              </h4>
            </div>

            <div class="bg-black border border-zinc-800 rounded-2xl p-5">
              <p class="text-gray-400 mb-2">
                Loại decal
              </p>

              <h4 class="text-xl md:text-2xl font-bold">
                ${getDecalLabel(formData.decalType)}
              </h4>
            </div>

            <div class="bg-black border border-zinc-800 rounded-2xl p-5">
              <p class="text-gray-400 mb-2">
                Cán màng
              </p>

              <h4 class="text-xl md:text-2xl font-bold">
                ${getLaminationLabel(formData.lamination)}
              </h4>
            </div>
          `

        // TABLE
        const table = document.querySelector('#reference-table-body')
        table.innerHTML = ''

        const quantities = [
          100,
          200,
          500,
          1000,
          2000,
          3000,
          5000
        ]

        quantities.forEach((q) => {
          const tempResult = calculateQuote({
            ...formData,
            quantity: q
          })

          table.innerHTML += `
            <tr class="hover:bg-zinc-800/50 transition">
              <td class="p-4 font-semibold">
                ${q.toLocaleString()} tem
              </td>

              <td class="p-4 text-orange-500 font-bold">
                ${tempResult.unitPrice}
              </td>

              <td class="p-4 font-bold">
                ${tempResult.totalPrice}
              </td>
            </tr>
          `
        })

        trackEvent('view_reference_price', {
          page: 'tem_nhan',
          tool: 'tem_nhan_calculator'
        })
      })
    }

    // COPY QUOTE BUTTON
copyQuoteBtn?.addEventListener('click', async () => {
  if (!latestQuoteText) {
    alert('Vui lòng tính giá trước khi sao chép')
    return
  }

  try {
    await navigator.clipboard.writeText(latestQuoteText)

    copyQuoteBtn.textContent = 'Đã sao chép ✓'

    setTimeout(() => {
      copyQuoteBtn.textContent = 'Sao chép báo giá'
    }, 1800)

    trackEvent('copy_quote', {
      page: 'tem_nhan',
      tool: 'tem_nhan_calculator'
    })
  } catch (error) {
    alert('Không thể sao chép tự động. Bạn vui lòng chụp màn hình hoặc thử lại.')
  }
})

  // CLOSE POPUP
  function hidePopup() {

    popup.classList.add('hidden')
    popup.classList.remove('flex')

  }

  closePopup?.addEventListener(
    'click',
    hidePopup
  )

  closePopupBottom?.addEventListener(
    'click',
    hidePopup
  )

  popup?.addEventListener('click', (e) => {

    if (e.target === popup) {

      hidePopup()

    }

  })

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

        <!-- Form -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">

          <div class="grid md:grid-cols-2 gap-6 mb-6">

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
                placeholder="Ví dụ: 80"
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

            <div class="md:col-span-2">
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

          <div class="grid gap-4">

            <button
              id="calculate-btn"
              class="bg-orange-500 hover:bg-orange-600 transition rounded-xl py-5 text-lg font-bold"
            >
              Tính giá tham khảo
            </button>

          </div>

          <!-- Result -->
          <div
            id="quote-result"
            class="hidden mt-10 bg-black rounded-2xl p-8 border border-zinc-800"
          >

            <div class="mb-8">
              <p class="text-orange-500 font-semibold mb-3 tracking-widest uppercase">
                KẾT QUẢ BÁO GIÁ
              </p>

              <h3 class="text-2xl md:text-3xl font-black">
                Thông tin báo giá tem nhãn
              </h3>

              <p class="mt-3 text-gray-500 text-sm leading-relaxed">
                Vui lòng kiểm tra lại thông tin bên dưới trước khi nhắn Zalo đặt tem.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-8">

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p class="text-gray-500 text-sm mb-2">
                  Kích thước tem
                </p>

                <p
                  id="quote-size"
                  class="text-white text-lg font-bold"
                >
                  -
                </p>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p class="text-gray-500 text-sm mb-2">
                  Loại decal
                </p>

                <p
                  id="quote-decal"
                  class="text-white text-lg font-bold"
                >
                  -
                </p>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p class="text-gray-500 text-sm mb-2">
                  Cán màng
                </p>

                <p
                  id="quote-lamination"
                  class="text-white text-lg font-bold"
                >
                  -
                </p>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p class="text-gray-500 text-sm mb-2">
                  Số lượng
                </p>

                <p
                  id="quote-quantity"
                  class="text-white text-lg font-bold"
                >
                  -
                </p>
              </div>

            </div>

            <div class="grid md:grid-cols-2 gap-5">

              <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
                <p class="text-orange-300 mb-3">
                  Đơn giá 1 tem
                </p>

                <p
                  id="quote-unit"
                  class="text-orange-500 text-3xl md:text-4xl font-black"
                >
                  0đ
                </p>
              </div>

              <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-6">
                <p class="text-gray-400 mb-3">
                  Tổng tiền
                </p>

                <p
                  id="quote-total"
                  class="text-white text-3xl md:text-4xl font-black"
                >
                  0đ
                </p>
              </div>

            </div>

            <div class="mt-8 grid md:grid-cols-3 gap-4">

              <a
                href="https://zalo.me/0974313230"
                target="_blank"
                onclick="
                  trackEvent('click_contact', {
                    page: 'tem_nhan',
                    button: 'zalo_from_calculator'
                  })
                "
                class="flex items-center justify-center rounded-xl bg-orange-500 px-5 py-4 font-bold text-white hover:bg-orange-600 transition"
              >
                Nhắn Zalo đặt tem
              </a>

              <button
                id="copy-quote-btn"
                class="rounded-xl border border-zinc-700 px-5 py-4 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
              >
                Sao chép báo giá
              </button>

              <button
                id="reference-price-btn"
                class="rounded-xl border border-zinc-700 px-5 py-4 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
              >
                Xem giá theo số lượng
              </button>

            </div>

            <p class="mt-4 text-sm text-gray-500 leading-relaxed">
              Giá chỉ mang tính tham khảo. Giá thực tế có thể thay đổi theo file thiết kế, chất liệu, kiểu bế, cán màng và tiến độ cần giao.
            </p>

          </div>


    <!-- Popup -->
        <div
        id="quote-popup"
        class="fixed inset-0 bg-black/70 backdrop-blur hidden items-center justify-center z-[999]"
        >

        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">

            <!-- Close -->
            <button
            id="close-popup"
            class="absolute top-5 right-5 text-3xl text-gray-400 hover:text-orange-500 transition"
            >
            ×
            </button>

            <!-- Title -->
            <div class="mb-10">

            <p class="text-orange-500 font-semibold mb-3 tracking-wide">
                BÁO GIÁ TEM NHÃN
            </p>

            <h3 class="text-4xl font-black leading-tight">
                Báo giá tham khảo
            </h3>

            </div>

            <!-- Quote Info -->
            <div
              id="popup-summary"
              class="grid md:grid-cols-3 gap-4 mb-10"
            ></div>

            <!-- Reference Table -->
            <div class="overflow-x-auto">

            <table class="w-full border border-zinc-800 rounded-2xl overflow-hidden">

                <thead class="bg-orange-500 text-white">

                <tr>

                    <th class="p-4 text-left">
                    Số lượng
                    </th>

                    <th class="p-4 text-left">
                    Giá / tem
                    </th>

                    <th class="p-4 text-left">
                    Tổng tiền
                    </th>

                </tr>

                </thead>

                <tbody
                id="reference-table-body"
                class="divide-y divide-zinc-800"
                ></tbody>

            </table>

            </div>

            <!-- Footer -->
            <div class="mt-10 flex justify-end">

            <button
                id="close-popup-bottom"
                class="border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition px-8 py-4 rounded-xl font-bold"
            >
                Đóng
            </button>

            </div>

        </div>

        </div>

    </section>
  `
}