
import { calculateQuote }
from '../utils/temNhanCalculatorLogic'

export function TemNhanCalculator() {

  setTimeout(() => {

  // ELEMENTS
  const calculateBtn =
    document.querySelector('#calculate-btn')

  const popupBtn =
    document.querySelector('#popup-btn')

  const popup =
    document.querySelector('#quote-popup')

  const closePopup =
    document.querySelector('#close-popup')

  const closePopupBottom =
    document.querySelector('#close-popup-bottom')


  // GET FORM DATA
  function getFormData() {

    return {

      width:
        Number(document.querySelector('#width').value),

      height:
        Number(document.querySelector('#height').value),

      quantity:
        Number(document.querySelector('#quantity').value),

      decalType:
        document.querySelector('#decal-type').value,

      shape:
        document.querySelector('#shape').value,

      lamination:
        document.querySelector('#lamination').value,

      customerType:
        document.querySelector('#customer-type').value

    }

  }

  // UPDATE RESULT UI
  function updateResult(result) {

    document
      .querySelector('#quote-result')
      .classList.remove('hidden')

    document
      .querySelector('#quote-unit')
      .textContent =
        result.unitPrice

    document
      .querySelector('#quote-total')
      .textContent =
        result.totalPrice

    document
      .querySelector('#quote-labels')
      .textContent =
        result.labelsPerSheet

    document
      .querySelector('#quote-sheets')
      .textContent =
        result.sheetsNeeded

    document
      .querySelector('#quote-sheet-price')
      .textContent =
        result.sheetPrice

    document
      .querySelector('#quote-material')
      .textContent =
        result.materialFee

    document
      .querySelector('#quote-discount')
      .textContent =
        result.discount

  }

  // CALCULATE BUTTON
  if (calculateBtn) {

    calculateBtn.addEventListener('click', () => {

      const formData =
        getFormData()

      const result =
        calculateQuote(formData)

      if (!result) {

        alert('Vui lòng nhập đầy đủ thông tin')

        return

      }

      updateResult(result)

    })

  }

  // POPUP BUTTON
  if (popupBtn) {

    popupBtn.addEventListener('click', () => {

      const formData =
        getFormData()

      const result =
        calculateQuote(formData)

      if (!result) {

        alert('Vui lòng nhập đầy đủ thông tin')

        return

      }

      popup.classList.remove('hidden')
      popup.classList.add('flex')

      // SUMMARY
      const summary =
        document.querySelector('#popup-summary')

      summary.innerHTML = `
        <div class="bg-black border border-zinc-800 rounded-2xl p-5">

          <p class="text-gray-400 mb-2">
            Kích thước
          </p>

          <h4 class="text-2xl font-bold">
            ${formData.width} x ${formData.height} mm
          </h4>

        </div>

        <div class="bg-black border border-zinc-800 rounded-2xl p-5">

          <p class="text-gray-400 mb-2">
            Loại decal
          </p>

          <h4 class="text-2xl font-bold">
            ${formData.decalType}
          </h4>

        </div>
      `

      // TABLE
      const table =
        document.querySelector('#reference-table-body')

      table.innerHTML = ''

      const quantities = [
        50,
        100,
        200,
        300,
        500,
        1000,
        2000,
        3000,
        5000
      ]


      quantities.forEach((q) => {

        const tempResult =
          calculateQuote({

            ...formData,
            quantity: q

          })

        // TABLE ROW
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

    })

  }

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
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-5xl mx-auto px-6 py-24">

        <!-- Heading -->
        <div class="text-center mb-16">

          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            TÍNH GIÁ NHANH
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Công cụ tính giá
            tem nhãn IST
          </h2>

          <p class="text-gray-400 text-lg">
            Nhập kích thước và số lượng để tham khảo giá nhanh.
          </p>

        </div>

        <!-- Form -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">

          <div class="grid md:grid-cols-2 gap-6 mb-6">

            <div>
              <label class="block text-sm text-gray-400 mb-3">
                Chiều ngang (mm)
              </label>

              <input
                id="width"
                type="number"
                class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                placeholder="Ví dụ: 50"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-3">
                Chiều cao (mm)
              </label>

              <input
                id="height"
                type="number"
                class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                placeholder="Ví dụ: 80"
              />
            </div>

          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-6">

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

                <option value="kraft">
                  Decal kraft
                </option>

                <option value="matte-plastic">
                  Decal nhựa mờ
                </option>

              </select>
            </div>

            <div>
                <label class="block text-sm text-gray-400 mb-3">
                    Hình dạng tem
                </label>

                <select
                    id="shape"
                    class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                >
                    <option value="rectangle">
                    Vuông / Chữ nhật
                    </option>

                    <option value="round">
                    Tròn / Ovan
                    </option>

                    <option value="special">
                    Hình đặc biệt
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

            <div>
                <label class="block text-sm text-gray-400 mb-3">
                    Loại khách hàng
                </label>

                <select
                    id="customer-type"
                    class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                >
                    <option value="regular">
                    Khách trực tiếp
                    </option>

                    <option value="vip">
                    Khách đại lý
                    </option>
                </select>
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-3">
                Số lượng
              </label>

              <input
                id="quantity"
                type="number"
                class="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-orange-500 outline-none"
                placeholder="Ví dụ: 1000"
              />
            </div>

          </div>

          <div class="grid md:grid-cols-2 gap-4">

            <button
                id="calculate-btn"
                class="bg-orange-500 hover:bg-orange-600 transition rounded-xl py-5 text-lg font-bold"
            >
                TÍNH BÁO GIÁ
            </button>

            <button
                id="popup-btn"
                class="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-xl py-5 text-lg font-bold"
            >
                GỬI BÁO GIÁ
            </button>

        </div>

          <!-- Result -->
          <div
            id="quote-result"
            class="hidden mt-10 bg-black rounded-2xl p-8 border border-zinc-800"
          >

          <div class="border-t border-zinc-800 mt-6 pt-6 space-y-3 text-sm text-gray-400">

            <div class="flex justify-between">
                <span>Số tem / tờ</span>
                <span id="quote-labels"></span>
            </div>

            <div class="flex justify-between">
                <span>Số tờ cần in</span>
                <span id="quote-sheets"></span>
            </div>

            <div class="flex justify-between">
                <span>Giá / tờ</span>
                <span id="quote-sheet-price"></span>
            </div>

            <div class="flex justify-between">
                <span>Phụ phí vật liệu</span>
                <span id="quote-material"></span>
            </div>

            <div class="flex justify-between">
                <span>Chiết khấu đại lý</span>
                <span id="quote-discount"></span>
            </div>

            </div>

            <div class="flex items-center justify-between mb-4">

              <p class="text-gray-400">
                Giá tham khảo
              </p>

              <p
                id="quote-unit"
                class="text-orange-500 text-2xl font-bold"
              >
                0đ
              </p>

            </div>

            <div class="flex items-center justify-between">

              <p class="text-gray-400">
                Tổng tiền
              </p>

              <p
                id="quote-total"
                class="text-4xl font-black"
              >
                0đ
              </p>

            </div>

          </div>

        </div>

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
            class="grid md:grid-cols-2 gap-4 mb-10"
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