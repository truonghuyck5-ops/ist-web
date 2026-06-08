import {
  salesGroups,
  salesProducts,
} from './salesData'

import {
  loginSalesPortal,
  logoutSalesPortal,
  isLoggedIn,
} from './salesAuth'

import {
  calculateHoaDonInternalQuote,
  calculateTemNhanInternalQuote,
  calculateTuiXopInternalQuote,
  calculateLargeFormatInternalQuote,
  formatCurrency,
  hoaDonInternalPriceTable,

  temNhanMaterialOptions,
  temNhanLaminationOptions,
  getTemNhanMaterialLabel,
  getTemNhanLaminationLabel,

  tuiXopCustomerTypes,
  tuiXopPrintColorOptions,
  tuiXopOrderTypes,
  getTuiXopCustomerTypeLabel,
  getTuiXopPrintColorLabel,
  getTuiXopOrderTypeLabel,

  largeFormatMaterialOptions,
  largeFormatCustomerTypes,
  largeFormatDesignLevels,
  largeFormatFinishingOptions,
  largeFormatInstallOptions,
  getLargeFormatMaterialLabel,
  getLargeFormatCustomerTypeLabel,
  getLargeFormatDesignLevelLabel,
  getLargeFormatFinishingLabel,
  getLargeFormatInstallLabel,

  calculateNhaRapInternalQuote,
  nhaRapQuoteModes,
  nhaRapDesignLevels,
  nhaRapPrintProducts,
  nhaRapPrintFinishingOptions,
  nhaRapMaterialProducts,
  nhaRapMaterialSaleModes,
  nhaRapCutProducts,
  nhaRapCutDifficultyOptions,
  getNhaRapQuoteModeLabel,
  getNhaRapDesignLabel,
  getNhaRapPrintProductLabel,
  getNhaRapPrintFinishingLabel,
  getNhaRapMaterialProductLabel,
  getNhaRapMaterialSaleModeLabel,
  getNhaRapCutProductLabel,
  getNhaRapCutDifficultyLabel,
} from './salesCalculators'

function renderProductList() {
  return salesProducts.map((product) => `
    <button
      type="button"
      data-product-id="${product.id}"
      data-group="${product.group}"
      data-search="${[
        product.name,
        product.shortDesc,
        ...(product.tags || []),
      ].join(' ').toLowerCase()}"
      class="sales-product-item w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left hover:border-orange-500 transition"
    >
      <p class="text-white font-black">
        ${product.name}
      </p>

      <p class="text-gray-500 text-sm mt-1 leading-relaxed">
        ${product.shortDesc}
      </p>
    </button>
  `).join('')
}

function renderDriveButtons(product) {
  const links =
    product.driveLinks || {
      main: product.driveFolder,
    }

  return `
    <div class="flex flex-wrap gap-3 mt-6">
      ${
        links.main
          ? `
            <a
              href="${links.main}"
              target="_blank"
              class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
            >
              Mở Drive chính
            </a>
          `
          : ''
      }

      ${
        links.bestImages
          ? `
            <a
              href="${links.bestImages}"
              target="_blank"
              class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 transition"
            >
              Ảnh chọn lọc gửi khách
            </a>
          `
          : ''
      }

      ${
        links.priceImages
          ? `
            <a
              href="${links.priceImages}"
              target="_blank"
              class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
            >
              Bảng giá / ảnh giá
            </a>
          `
          : ''
      }
    </div>
  `
}

function renderPricingRules(product) {
  if (!product.pricingRules || !product.pricingRules.length) {
    return ''
  }

  return `
    <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 mt-6">
      <h3 class="text-orange-300 font-black mb-4">
        Quy định báo giá nội bộ
      </h3>

      <ul class="grid gap-2 text-gray-300 text-sm leading-relaxed">
        ${product.pricingRules.map((item) => `
          <li>• ${item}</li>
        `).join('')}
      </ul>
    </div>
  `
}

function renderProductDetail(product) {
  if (!product) {
    return `
      <div class="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <p class="text-gray-400">
          Chọn một sản phẩm để xem thông tin.
        </p>
      </div>
    `
  }

  return `
    <div class="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">

      <div class="mb-6">
        <p class="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Sản phẩm kinh doanh
        </p>

        <h2 class="text-3xl md:text-4xl font-black text-white">
          ${product.name}
        </h2>

        <p class="text-gray-400 mt-3 leading-relaxed">
          ${product.shortDesc}
        </p>
      </div>

      ${renderCalculator(product)}
      ${renderPricingRules(product)}

      <div class="grid md:grid-cols-2 gap-5 mt-6">

        <div class="rounded-2xl border border-zinc-800 bg-black p-5">
          <h3 class="text-white font-black mb-4">
            Cần hỏi khách
          </h3>

          <ul class="grid gap-2 text-gray-400 text-sm">
            ${product.questions.map((item) => `
              <li>• ${item}</li>
            `).join('')}
          </ul>
        </div>

        <div class="rounded-2xl border border-zinc-800 bg-black p-5">
          <h3 class="text-white font-black mb-4">
            Lưu ý tư vấn
          </h3>

          <ul class="grid gap-2 text-gray-400 text-sm">
            ${product.notes.map((item) => `
              <li>✓ ${item}</li>
            `).join('')}
          </ul>
        </div>

      </div>

      <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 mt-6">
        <h3 class="text-orange-300 font-black mb-4">
          Mẫu tin nhắn Zalo
        </h3>

        <div class="grid gap-3">
          ${product.scripts.map((script, index) => {
            const scriptTitle =
              typeof script === 'string'
                ? `Mẫu ${index + 1}`
                : script.title

            const scriptContent =
              typeof script === 'string'
                ? script
                : script.content

            return `
              <div class="rounded-xl border border-zinc-800 bg-black p-4">
                <p class="text-orange-300 text-sm font-bold mb-2">
                  ${scriptTitle}
                </p>

                <p
                  id="script-${product.id}-${index}"
                  class="text-gray-300 text-sm leading-relaxed"
                >
                  ${scriptContent}
                </p>

                <button
                  type="button"
                  data-copy-target="script-${product.id}-${index}"
                  class="copy-script-btn mt-3 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
                >
                  Copy tin nhắn
                </button>
              </div>
            `
          }).join('')}
        </div>
      </div>

      ${renderDriveButtons(product)}

    </div>
  `
}

function renderNhaRapCalculator() {
  return `
    <div class="rounded-2xl border border-zinc-800 bg-black p-5">

      <div class="mb-5">
        <h3 class="text-white font-black text-xl">
          Tính giá Nhà Rạp
        </h3>

        <p class="text-gray-500 text-sm mt-1">
          Tính nhanh theo 3 nhóm: in ấn, bán vật tư, cắt/gia công.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-4">

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Loại báo giá
          </label>

          <select
            id="sales-tent-quote-mode"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapQuoteModes.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chiều ngang (cm)
          </label>

          <input
            id="sales-tent-width"
            type="number"
            min="1"
            placeholder="Ví dụ: 200"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chiều cao (cm)
          </label>

          <input
            id="sales-tent-height"
            type="number"
            min="1"
            placeholder="Ví dụ: 100"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số lượng
          </label>

          <input
            id="sales-tent-quantity"
            type="number"
            min="1"
            value="1"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
        </div>

        <!-- Group: In ấn -->
        <div
          id="sales-tent-print-product-wrap"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Loại in
          </label>

          <select
            id="sales-tent-print-product"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapPrintProducts.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div
          id="sales-tent-design-wrap"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Thiết kế / file
          </label>

          <select
            id="sales-tent-design-level"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapDesignLevels.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div
          id="sales-tent-print-finishing-wrap"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Gia công sau in
          </label>

          <select
            id="sales-tent-print-finishing"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapPrintFinishingOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Group: Bán vật tư -->
        <div
          id="sales-tent-material-product-wrap"
          class="hidden"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Loại vật tư
          </label>

          <select
            id="sales-tent-material-product"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapMaterialProducts.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div
          id="sales-tent-material-sale-mode-wrap"
          class="hidden"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Cách tính vật tư
          </label>

          <select
            id="sales-tent-material-sale-mode"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapMaterialSaleModes.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Group: Cắt / gia công -->
        <div
          id="sales-tent-cut-product-wrap"
          class="hidden"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Hạng mục cắt / gia công
          </label>

          <select
            id="sales-tent-cut-product"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapCutProducts.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div
          id="sales-tent-cut-difficulty-wrap"
          class="hidden"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Độ khó
          </label>

          <select
            id="sales-tent-cut-difficulty"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${nhaRapCutDifficultyOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

      </div>

      <div
        id="sales-tent-warning"
        class="hidden mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
      ></div>

      <div class="grid md:grid-cols-2 gap-4 mt-5">

        <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
          <p class="text-orange-300 text-sm mb-2">
            Đơn giá / m²
          </p>

          <p
            id="sales-tent-unit"
            class="text-orange-500 text-3xl font-black break-words"
          >
            -
          </p>
        </div>

        <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
          <p class="text-gray-400 text-sm mb-2">
            Tổng tiền
          </p>

          <p
            id="sales-tent-total"
            class="text-white text-3xl font-black break-words"
          >
            -
          </p>
        </div>

      </div>

      <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 mt-5">
        <h4 class="text-white font-black mb-3">
          Thông tin báo giá
        </h4>

        <div
          id="sales-tent-summary"
          class="grid gap-2 text-sm text-gray-400"
        ></div>
      </div>

      <div class="flex flex-wrap gap-3 mt-5">
        <button
          id="sales-tent-copy-quote"
          type="button"
          class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 transition"
        >
          Copy báo giá
        </button>

        <button
          id="sales-tent-reset"
          type="button"
          class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
        >
          Làm mới
        </button>
      </div>

    </div>
  `
}

function renderCalculator(product) {
  if (product.calculatorType === 'hoa-don') {
    return renderHoaDonCalculator()
  }

  if (product.calculatorType === 'tem-nhan') {
    return renderTemNhanCalculator()
  }

  if (product.calculatorType === 'tui-xop') {
    return renderTuiXopCalculator()
  }

  if (product.calculatorType === 'large-format') {
    return renderLargeFormatCalculator()
  }

  if (product.calculatorType === 'nha-rap') {
    return renderNhaRapCalculator()
  }


  return `
    <div class="rounded-2xl border border-zinc-800 bg-black p-5">
      <h3 class="text-white font-black mb-3">
        Báo giá thủ công
      </h3>

      <p class="text-gray-400 text-sm leading-relaxed">
        Sản phẩm này cần kiểm tra thông tin thực tế trước khi báo giá. Hãy hỏi đủ thông tin khách hàng trước khi gửi giá.
      </p>
    </div>
  `
}

function getTemNhanReferenceQuantities(currentQuantity) {
  const baseQuantities = [
    100,
    200,
    500,
    1000,
    2000,
    3000,
    5000,
    10000,
  ]

  const quantity =
    Number(currentQuantity)

  if (
    quantity > 0 &&
    !baseQuantities.includes(quantity)
  ) {
    baseQuantities.push(quantity)
  }

  return baseQuantities.sort((a, b) => a - b)
}


function renderLargeFormatCalculator() {
  return `
    <div class="rounded-2xl border border-zinc-800 bg-black p-5">

      <div class="mb-5">
        <h3 class="text-white font-black text-xl">
          Tính giá Decal - PP - Hiflex
        </h3>

        <p class="text-gray-500 text-sm mt-1">
          Tính nhanh theo kích thước, chất liệu, nhóm khách, gia công và thi công.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-4">

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chiều ngang (cm)
          </label>

          <input
            id="sales-large-width"
            type="number"
            min="1"
            step="1"
            placeholder="Ví dụ: 200"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chiều cao (cm)
          </label>

          <input
            id="sales-large-height"
            type="number"
            min="1"
            step="1"
            placeholder="Ví dụ: 100"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số lượng
          </label>

          <input
            id="sales-large-quantity"
            type="number"
            min="1"
            value="1"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chất liệu
          </label>

          <select
            id="sales-large-material"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${largeFormatMaterialOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Nhóm khách / tình huống
          </label>

          <select
            id="sales-large-customer-type"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${largeFormatCustomerTypes.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Thiết kế / xử lý file
          </label>

          <select
            id="sales-large-design-level"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${largeFormatDesignLevels.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Gia công
          </label>

          <select
            id="sales-large-finishing"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${largeFormatFinishingOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số khoen
          </label>

          <input
            id="sales-large-eyelets"
            type="number"
            min="0"
            value="0"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Thi công
          </label>

          <select
            id="sales-large-install"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${largeFormatInstallOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

      </div>

      <div
        id="sales-large-warning"
        class="hidden mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
      ></div>

      <div class="grid md:grid-cols-2 gap-4 mt-5">

        <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
          <p class="text-orange-300 text-sm mb-2">
            Đơn giá / m²
          </p>

          <p
            id="sales-large-unit"
            class="text-orange-500 text-3xl font-black break-words"
          >
            -
          </p>
        </div>

        <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
          <p class="text-gray-400 text-sm mb-2">
            Tổng tiền
          </p>

          <p
            id="sales-large-total"
            class="text-white text-3xl font-black break-words"
          >
            -
          </p>
        </div>

      </div>

      <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 mt-5">
        <h4 class="text-white font-black mb-3">
          Thông tin báo giá
        </h4>

        <div
          id="sales-large-summary"
          class="grid gap-2 text-sm text-gray-400"
        ></div>
      </div>

      <div class="flex flex-wrap gap-3 mt-5">
        <button
          id="sales-large-copy-quote"
          type="button"
          class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 transition"
        >
          Copy báo giá
        </button>

        <button
          id="sales-large-reset"
          type="button"
          class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
        >
          Làm mới
        </button>
      </div>

    </div>
  `
}

function renderTuiXopCalculator() {
  return `
    <div class="rounded-2xl border border-zinc-800 bg-black p-5">

      <div class="mb-5">
        <h3 class="text-white font-black text-xl">
          Tính giá túi xốp
        </h3>

        <p class="text-gray-500 text-sm mt-1">
          Tính nhanh theo số kg, nhóm khách, số màu in và hình thức đơn hàng.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số kg túi
          </label>

          <input
            id="sales-bag-kg"
            type="number"
            min="1"
            placeholder="Ví dụ: 10"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Hình thức đơn hàng
          </label>

          <select
            id="sales-bag-order-type"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${tuiXopOrderTypes.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Nhóm khách
          </label>

          <select
            id="sales-bag-customer-type"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${tuiXopCustomerTypes.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số màu in
          </label>

          <select
            id="sales-bag-print-colors"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${tuiXopPrintColorOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div
          id="sales-bag-printing-only-price-wrap"
          class="hidden md:col-span-2"
        >
          <label class="block text-sm text-gray-400 mb-2">
            Giá in gia công / kg
          </label>

          <select
            id="sales-bag-printing-only-price"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            <option value="15000">15.000đ/kg</option>
            <option value="20000">20.000đ/kg</option>
            <option value="25000">25.000đ/kg</option>
            <option value="30000">30.000đ/kg</option>
          </select>
        </div>

      </div>

      <div
        id="sales-bag-warning"
        class="hidden mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
      ></div>

      <div class="grid md:grid-cols-2 gap-4 mt-5">

        <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
          <p class="text-orange-300 text-sm mb-2">
            Đơn giá / kg
          </p>

          <p
            id="sales-bag-unit"
            class="text-orange-500 text-3xl font-black break-words"
          >
            -
          </p>
        </div>

        <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
          <p class="text-gray-400 text-sm mb-2">
            Tổng tiền
          </p>

          <p
            id="sales-bag-total"
            class="text-white text-3xl font-black break-words"
          >
            -
          </p>
        </div>

      </div>

      <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 mt-5">
        <h4 class="text-white font-black mb-3">
          Thông tin báo giá
        </h4>

        <div
          id="sales-bag-summary"
          class="grid gap-2 text-sm text-gray-400"
        ></div>
      </div>

      <div class="flex flex-wrap gap-3 mt-5">
        <button
          id="sales-bag-copy-quote"
          type="button"
          class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 transition"
        >
          Copy báo giá
        </button>

        <button
          id="sales-bag-reset"
          type="button"
          class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
        >
          Làm mới
        </button>
      </div>

    </div>
  `
}

function renderTemNhanCalculator() {
  return `
    <div class="rounded-2xl border border-zinc-800 bg-black p-5">

      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h3 class="text-white font-black text-xl">
            Tính giá tem nhãn
          </h3>

          <p class="text-gray-500 text-sm mt-1">
            Nhập kích thước, chất liệu, cán màng và số lượng để tính giá nhanh.
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chiều ngang tem (mm)
          </label>

          <input
            id="sales-label-width"
            type="number"
            min="20"
            max="300"
            placeholder="Ví dụ: 50"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Chiều cao tem (mm)
          </label>

          <input
            id="sales-label-height"
            type="number"
            min="20"
            max="300"
            placeholder="Ví dụ: 50"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Loại decal
          </label>

          <select
            id="sales-label-material"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${temNhanMaterialOptions.map((item) => `
              <option
                value="${item.value}"
                ${item.value === 'plastic' ? 'selected' : ''}
              >
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Cán màng
          </label>

          <select
            id="sales-label-lamination"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            ${temNhanLaminationOptions.map((item) => `
              <option value="${item.value}">
                ${item.label}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-2">
            Số lượng tem
          </label>

          <input
            id="sales-label-quantity"
            type="number"
            min="1"
            placeholder="Ví dụ: 1000"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-orange-500"
          >
        </div>

      </div>

      <div
        id="sales-label-warning"
        class="hidden mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
      ></div>

      <div class="grid md:grid-cols-2 gap-4 mt-5">

        <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
          <p class="text-orange-300 text-sm mb-2">
            Đơn giá / tem
          </p>

          <p
            id="sales-label-unit"
            class="text-orange-500 text-3xl font-black break-words"
          >
            -
          </p>
        </div>

        <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
          <p class="text-gray-400 text-sm mb-2">
            Tổng tiền
          </p>

          <p
            id="sales-label-total"
            class="text-white text-3xl font-black break-words"
          >
            -
          </p>
        </div>

      </div>

      <p
        id="sales-label-note"
        class="mt-4 text-sm text-gray-500 leading-relaxed"
      >
        Giá thực tế có thể thay đổi theo file thiết kế, kiểu bế, chất liệu, cán màng và tiến độ cần giao.
      </p>

      <div class="flex flex-wrap gap-3 mt-5">
        <button
          id="sales-label-open-quote"
          type="button"
          class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 transition"
        >
          Xuất báo giá theo số lượng
        </button>

        <button
          id="sales-label-copy-quote"
          type="button"
          class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
        >
          Copy báo giá nhanh
        </button>

        <button
          id="sales-label-reset"
          type="button"
          class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
        >
          Làm mới
        </button>
      </div>

      <div
        id="sales-label-quote-popup"
        class="fixed inset-0 z-[999] hidden items-center justify-center bg-black/80 p-4"
      >
        <div
          id="sales-label-quote-overlay"
          class="absolute inset-0"
        ></div>

        <div class="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">

          <div class="flex items-start justify-between gap-5 border-b border-zinc-800 px-6 py-5">
            <div>
              <p class="text-orange-500 text-xs font-bold tracking-[0.18em] uppercase mb-2">
                Báo giá tem nhãn
              </p>

              <h3 class="text-2xl md:text-3xl font-black">
                Giá tham khảo theo số lượng
              </h3>

              <p
                id="sales-label-popup-info"
                class="mt-2 text-sm text-gray-400"
              >
                -
              </p>
            </div>

            <button
              id="sales-label-quote-close"
              type="button"
              class="shrink-0 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
            >
              Đóng
            </button>
          </div>

          <div class="p-5 md:p-6">

            <div class="grid grid-cols-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-black text-white mb-3">
              <div>Số lượng</div>
              <div class="text-center">Giá / tem</div>
              <div class="text-right">Thành tiền</div>
            </div>

            <div
              id="sales-label-popup-table"
              class="grid gap-2"
            ></div>

            <p class="mt-5 text-sm text-gray-500 leading-relaxed">
              Giá chỉ mang tính tham khảo nội bộ. Giá thực tế có thể thay đổi theo file thiết kế, kiểu bế, chất liệu, cán màng và tiến độ cần giao.
            </p>

            <div class="flex flex-wrap justify-end gap-3 mt-6">
              <button
                id="sales-label-popup-copy"
                type="button"
                class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 transition"
              >
                Copy bảng giá
              </button>

              <button
                id="sales-label-popup-close-bottom"
                type="button"
                class="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
              >
                Đóng
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  `
}

function renderHoaDonCalculator() {
  return `
    <div class="rounded-2xl border border-zinc-800 bg-black p-5">

      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h3 class="text-white font-black text-xl">
            Tính giá hóa đơn
          </h3>

          <p class="text-gray-500 text-sm mt-1">
            Chọn đúng khổ, số liên và số lượng theo bảng giá nội bộ.
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4">

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Khổ giấy
          </label>

          <select
            id="sales-invoice-size"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            <option value="A5">A5</option>
            <option value="A6">A6</option>
            <option value="A4">A4</option>
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số liên
          </label>

          <select
            id="sales-invoice-ply"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          >
            <option value="1">1 liên</option>
            <option value="2">2 liên</option>
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Số lượng
          </label>

          <select
            id="sales-invoice-quantity"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-orange-500"
          ></select>
        </div>

      </div>

      <div class="grid md:grid-cols-2 gap-4 mt-5">

        <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
          <p class="text-orange-300 text-sm mb-2">
            Đơn giá / cuốn
          </p>

          <p
            id="sales-invoice-unit"
            class="text-orange-500 text-3xl font-black"
          >
            -
          </p>
        </div>

        <div class="rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
          <p class="text-gray-400 text-sm mb-2">
            Tổng tiền
          </p>

          <p
            id="sales-invoice-total"
            class="text-white text-3xl font-black"
          >
            -
          </p>
        </div>

      </div>

      <div
        id="sales-invoice-table"
        class="grid gap-2 mt-5"
      ></div>

    </div>
  `
}

function initNhaRapCalculator() {
  const quoteModeSelect =
    document.querySelector('#sales-tent-quote-mode')

  const widthInput =
    document.querySelector('#sales-tent-width')

  const heightInput =
    document.querySelector('#sales-tent-height')

  const quantityInput =
    document.querySelector('#sales-tent-quantity')

  const printProductWrap =
    document.querySelector('#sales-tent-print-product-wrap')

  const printProductSelect =
    document.querySelector('#sales-tent-print-product')

  const designWrap =
    document.querySelector('#sales-tent-design-wrap')

  const designLevelSelect =
    document.querySelector('#sales-tent-design-level')

  const printFinishingWrap =
    document.querySelector('#sales-tent-print-finishing-wrap')

  const printFinishingSelect =
    document.querySelector('#sales-tent-print-finishing')

  const materialProductWrap =
    document.querySelector('#sales-tent-material-product-wrap')

  const materialProductSelect =
    document.querySelector('#sales-tent-material-product')

  const materialSaleModeWrap =
    document.querySelector('#sales-tent-material-sale-mode-wrap')

  const materialSaleModeSelect =
    document.querySelector('#sales-tent-material-sale-mode')

  const cutProductWrap =
    document.querySelector('#sales-tent-cut-product-wrap')

  const cutProductSelect =
    document.querySelector('#sales-tent-cut-product')

  const cutDifficultyWrap =
    document.querySelector('#sales-tent-cut-difficulty-wrap')

  const cutDifficultySelect =
    document.querySelector('#sales-tent-cut-difficulty')

  const unitEl =
    document.querySelector('#sales-tent-unit')

  const totalEl =
    document.querySelector('#sales-tent-total')

  const summaryEl =
    document.querySelector('#sales-tent-summary')

  const warningEl =
    document.querySelector('#sales-tent-warning')

  const copyBtn =
    document.querySelector('#sales-tent-copy-quote')

  const resetBtn =
    document.querySelector('#sales-tent-reset')

  if (
    !quoteModeSelect ||
    !widthInput ||
    !heightInput ||
    !quantityInput ||
    !printProductSelect ||
    !designLevelSelect ||
    !printFinishingSelect ||
    !materialProductSelect ||
    !materialSaleModeSelect ||
    !cutProductSelect ||
    !cutDifficultySelect
  ) {
    return
  }

  let latestQuoteText = ''

  function showWarning(message) {
    warningEl.textContent = message
    warningEl.classList.remove('hidden')
  }

  function hideWarning() {
    warningEl.textContent = ''
    warningEl.classList.add('hidden')
  }

  function getCurrentMode() {
    return quoteModeSelect.value
  }

  function updateVisibility() {
    const mode =
      getCurrentMode()

    printProductWrap.classList.toggle('hidden', mode !== 'print')
    designWrap.classList.toggle('hidden', mode !== 'print')
    printFinishingWrap.classList.toggle('hidden', mode !== 'print')

    materialProductWrap.classList.toggle('hidden', mode !== 'material')
    materialSaleModeWrap.classList.toggle('hidden', mode !== 'material')

    cutProductWrap.classList.toggle('hidden', mode !== 'cut')
    cutDifficultyWrap.classList.toggle('hidden', mode !== 'cut')

    const materialProduct =
      nhaRapMaterialProducts.find((item) => item.value === materialProductSelect.value)

    if (mode === 'material') {
      const isSheet =
        materialProduct?.type === 'sheet'

      materialSaleModeWrap.classList.toggle('hidden', !isSheet)

      if (!isSheet) {
        materialSaleModeSelect.value = 'm2'
      }
    }
  }

  function renderSummary({
    quote,
    modeLabel,
    mainLabel,
    designLabel,
    finishingLabel,
    materialSaleModeLabel,
    cutDifficultyLabel,
  }) {
    if (quote.quoteMode === 'print') {
      summaryEl.innerHTML = `
        <p>• Loại báo giá: <strong class="text-white">${modeLabel}</strong></p>
        <p>• Kích thước: <strong class="text-white">${quote.widthCm}cm x ${quote.heightCm}cm</strong></p>
        <p>• Số lượng: <strong class="text-white">${quote.quantity.toLocaleString('vi-VN')}</strong></p>
        <p>• Tổng diện tích: <strong class="text-white">${quote.totalArea.toFixed(2)} m²</strong></p>
        <p>• Loại in: <strong class="text-white">${mainLabel}</strong></p>
        <p>• Thiết kế/file: <strong class="text-white">${designLabel}</strong></p>
        <p>• Gia công: <strong class="text-white">${finishingLabel}</strong></p>
        <p>• Giá nền in: <strong class="text-white">${quote.basePriceText}/m²</strong></p>
        <p>• Phụ phí thiết kế: <strong class="text-white">${quote.designExtraText}/m²</strong></p>
        <p>• Phụ phí gia công: <strong class="text-white">${quote.finishingExtraText}/m²</strong></p>
        <p>• Đơn giá: <strong class="text-orange-500">${quote.unitPriceText}/m²</strong></p>
        <p>• Tổng tiền: <strong class="text-orange-500">${quote.totalPriceText}</strong></p>
        <p class="text-gray-500">• ${quote.note}</p>
      `
      return
    }

    if (quote.quoteMode === 'material') {
      summaryEl.innerHTML = `
        <p>• Loại báo giá: <strong class="text-white">${modeLabel}</strong></p>
        <p>• Vật tư: <strong class="text-white">${mainLabel}</strong></p>
        <p>• Cách tính: <strong class="text-white">${materialSaleModeLabel}</strong></p>
        <p>• Kích thước: <strong class="text-white">${quote.widthCm}cm x ${quote.heightCm}cm</strong></p>
        <p>• Số lượng: <strong class="text-white">${quote.quantity.toLocaleString('vi-VN')}</strong></p>
        <p>• Tổng diện tích: <strong class="text-white">${quote.totalArea.toFixed(2)} m²</strong></p>
        <p>• Đơn giá: <strong class="text-orange-500">${quote.unitPriceText}/m²</strong></p>
        <p>• Tổng tiền: <strong class="text-orange-500">${quote.totalPriceText}</strong></p>
        <p class="text-gray-500">• ${quote.note}</p>
      `
      return
    }

    if (quote.quoteMode === 'cut') {
      summaryEl.innerHTML = `
        <p>• Loại báo giá: <strong class="text-white">${modeLabel}</strong></p>
        <p>• Hạng mục: <strong class="text-white">${mainLabel}</strong></p>
        <p>• Độ khó: <strong class="text-white">${cutDifficultyLabel}</strong></p>
        <p>• Kích thước: <strong class="text-white">${quote.widthCm}cm x ${quote.heightCm}cm</strong></p>
        <p>• Số lượng: <strong class="text-white">${quote.quantity.toLocaleString('vi-VN')}</strong></p>
        <p>• Tổng diện tích: <strong class="text-white">${quote.totalArea.toFixed(2)} m²</strong></p>
        <p>• Giá vật tư: <strong class="text-white">${quote.basePriceText}/m²</strong></p>
        <p>• Công cắt/gia công: <strong class="text-white">${quote.laborPriceText}/m²</strong></p>
        <p>• Đơn giá: <strong class="text-orange-500">${quote.unitPriceText}/m²</strong></p>
        <p>• Tổng tiền: <strong class="text-orange-500">${quote.totalPriceText}</strong></p>
        <p class="text-gray-500">• ${quote.note}</p>
      `
    }
  }

  function updateQuote() {
    const width =
      Number(widthInput.value)

    const height =
      Number(heightInput.value)

    const quantity =
      Number(quantityInput.value)

    hideWarning()
    updateVisibility()

    if (!width || !height || !quantity) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      summaryEl.innerHTML = ''
      latestQuoteText = ''

      showWarning('Nhập kích thước và số lượng để hệ thống tính giá.')

      return
    }

    const quote =
      calculateNhaRapInternalQuote({
        quoteMode: quoteModeSelect.value,
        width,
        height,
        quantity,
        designLevel: designLevelSelect.value,
        printProduct: printProductSelect.value,
        printFinishing: printFinishingSelect.value,
        materialProduct: materialProductSelect.value,
        materialSaleMode: materialSaleModeSelect.value,
        cutProduct: cutProductSelect.value,
        cutDifficulty: cutDifficultySelect.value,
      })

    if (!quote) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      summaryEl.innerHTML = ''
      latestQuoteText = ''

      showWarning('Không tính được giá. Vui lòng kiểm tra lại thông tin.')

      return
    }

    const modeLabel =
      getNhaRapQuoteModeLabel(quoteModeSelect.value)

    const designLabel =
      getNhaRapDesignLabel(designLevelSelect.value)

    const printProductLabel =
      getNhaRapPrintProductLabel(printProductSelect.value)

    const printFinishingLabel =
      getNhaRapPrintFinishingLabel(printFinishingSelect.value)

    const materialProductLabel =
      getNhaRapMaterialProductLabel(materialProductSelect.value)

    const materialSaleModeLabel =
      getNhaRapMaterialSaleModeLabel(materialSaleModeSelect.value)

    const cutProductLabel =
      getNhaRapCutProductLabel(cutProductSelect.value)

    const cutDifficultyLabel =
      getNhaRapCutDifficultyLabel(cutDifficultySelect.value)

    const mainLabel =
      quote.quoteMode === 'print'
        ? printProductLabel
        : quote.quoteMode === 'material'
          ? materialProductLabel
          : cutProductLabel

    const finishingLabel =
      quote.quoteMode === 'print'
        ? printFinishingLabel
        : ''

    unitEl.textContent =
      quote.calculationMode === 'material-sheet'
        ? 'Theo tấm'
        : quote.unitPriceText

    totalEl.textContent =
      quote.totalPriceText

    renderSummary({
      quote,
      modeLabel,
      mainLabel,
      designLabel,
      finishingLabel,
      materialSaleModeLabel,
      cutDifficultyLabel,
    })

    latestQuoteText =
      `Báo giá nhà rạp tham khảo:\n` +
      `- Loại báo giá: ${modeLabel}\n` +
      `- Hạng mục: ${mainLabel}\n` +
      `- Kích thước: ${quote.widthCm}cm x ${quote.heightCm}cm\n` +
      `- Số lượng: ${quote.quantity.toLocaleString('vi-VN')}\n` +
      `- Tổng diện tích: ${quote.totalArea.toFixed(2)} m²\n` +
      (
        quote.quoteMode === 'print'
          ? `- Thiết kế/file: ${designLabel}\n` +
            `- Gia công: ${finishingLabel}\n`
          : ''
      ) +
      (
        quote.quoteMode === 'cut'
          ? `- Độ khó: ${cutDifficultyLabel}\n`
          : ''
      ) +
      `- Đơn giá: ${quote.unitPriceText}/m²\n` +
      `- Tổng tiền: ${quote.totalPriceText}\n` +
      `Giá tham khảo, có thể thay đổi theo file thực tế, độ khó gia công và tiến độ cần lấy.`
  }

  quoteModeSelect.addEventListener('change', updateQuote)
  widthInput.addEventListener('input', updateQuote)
  heightInput.addEventListener('input', updateQuote)
  quantityInput.addEventListener('input', updateQuote)
  printProductSelect.addEventListener('change', updateQuote)
  designLevelSelect.addEventListener('change', updateQuote)
  printFinishingSelect.addEventListener('change', updateQuote)
  materialProductSelect.addEventListener('change', updateQuote)
  materialSaleModeSelect.addEventListener('change', updateQuote)
  cutProductSelect.addEventListener('change', updateQuote)
  cutDifficultySelect.addEventListener('change', updateQuote)

  copyBtn.addEventListener('click', async () => {
    if (!latestQuoteText) {
      return
    }

    try {
      await navigator.clipboard.writeText(latestQuoteText)

      copyBtn.textContent = 'Đã copy ✓'

      setTimeout(() => {
        copyBtn.textContent = 'Copy báo giá'
      }, 1500)
    } catch {
      alert('Không thể copy tự động. Vui lòng copy thủ công.')
    }
  })

  resetBtn.addEventListener('click', () => {
    quoteModeSelect.value = 'print'
    widthInput.value = ''
    heightInput.value = ''
    quantityInput.value = 1
    designLevelSelect.value = 'file-ready'
    printProductSelect.value = 'hiflex-white'
    printFinishingSelect.value = 'none'
    materialProductSelect.value = 'hiflex-white'
    materialSaleModeSelect.value = 'm2'
    cutProductSelect.value = 'cut-decal-color'
    cutDifficultySelect.value = 'easy'

    updateQuote()
  })

  updateQuote()
}

function initLargeFormatCalculator() {
  const widthInput =
    document.querySelector('#sales-large-width')

  const heightInput =
    document.querySelector('#sales-large-height')

  const quantityInput =
    document.querySelector('#sales-large-quantity')

  const materialSelect =
    document.querySelector('#sales-large-material')

  const customerTypeSelect =
    document.querySelector('#sales-large-customer-type')

  const designLevelSelect =
    document.querySelector('#sales-large-design-level')

  const finishingSelect =
    document.querySelector('#sales-large-finishing')

  const eyeletsInput =
    document.querySelector('#sales-large-eyelets')

  const installSelect =
    document.querySelector('#sales-large-install')

  const unitEl =
    document.querySelector('#sales-large-unit')

  const totalEl =
    document.querySelector('#sales-large-total')

  const summaryEl =
    document.querySelector('#sales-large-summary')

  const warningEl =
    document.querySelector('#sales-large-warning')

  const copyBtn =
    document.querySelector('#sales-large-copy-quote')

  const resetBtn =
    document.querySelector('#sales-large-reset')

  if (
    !widthInput ||
    !heightInput ||
    !quantityInput ||
    !materialSelect ||
    !customerTypeSelect ||
    !designLevelSelect ||
    !finishingSelect ||
    !eyeletsInput ||
    !installSelect
  ) {
    return
  }

  let latestQuoteText = ''

  function showWarning(message) {
    warningEl.textContent = message
    warningEl.classList.remove('hidden')
  }

  function hideWarning() {
    warningEl.textContent = ''
    warningEl.classList.add('hidden')
  }

  function updateLargeFormatFieldRules() {
    const material =
      largeFormatMaterialOptions.find((item) => item.value === materialSelect.value)

    const isHiflex =
      material?.group === 'hiflex'

    const isTrade =
      customerTypeSelect.value === 'trade'

    if (isHiflex) {
      finishingSelect.value = 'none'
      finishingSelect.disabled = true
    } else {
      finishingSelect.disabled = false
    }

    if (isTrade) {
      designLevelSelect.value = 'file-ready'
      installSelect.value = 'none'

      designLevelSelect.disabled = true
      installSelect.disabled = true
    } else {
      designLevelSelect.disabled = false
      installSelect.disabled = false
    }
  }

  function updateQuote() {
    const width =
      Number(widthInput.value)

    const height =
      Number(heightInput.value)

    const quantity =
      Number(quantityInput.value)

    hideWarning()
    updateLargeFormatFieldRules()

    if (!width || !height || !quantity) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      summaryEl.innerHTML = ''
      latestQuoteText = ''

      showWarning('Nhập kích thước và số lượng để hệ thống tính giá.')

      return
    }

    const quote =
      calculateLargeFormatInternalQuote({
        width,
        height,
        quantity,
        material: materialSelect.value,
        customerType: customerTypeSelect.value,
        designLevel: designLevelSelect.value,
        finishing: finishingSelect.value,
        eyelets: eyeletsInput.value,
        install: installSelect.value,
      })

    if (!quote) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      summaryEl.innerHTML = ''
      latestQuoteText = ''

      showWarning('Không tính được giá. Vui lòng kiểm tra lại thông tin.')

      return
    }

    const materialLabel =
      getLargeFormatMaterialLabel(quote.material)

    const customerTypeLabel =
      getLargeFormatCustomerTypeLabel(quote.customerType)

    const designLevelLabel =
      getLargeFormatDesignLevelLabel(quote.designLevel)

    const finishingLabel =
      getLargeFormatFinishingLabel(quote.finishing)

    const installLabel =
      getLargeFormatInstallLabel(quote.install)

    unitEl.textContent =
      quote.unitPriceText

    totalEl.textContent =
      quote.totalPriceText

    summaryEl.innerHTML = `
      <p>• Kích thước: <strong class="text-white">${width}cm x ${height}cm</strong></p>
      <p>• Số lượng: <strong class="text-white">${quantity.toLocaleString('vi-VN')} tấm</strong></p>
      <p>• Tổng diện tích: <strong class="text-white">${quote.totalArea.toFixed(2)} m²</strong></p>
      <p>• Chất liệu: <strong class="text-white">${materialLabel}</strong></p>
      <p>• Nhóm/tình huống: <strong class="text-white">${customerTypeLabel}</strong></p>
      <p>• Thiết kế/file: <strong class="text-white">${designLevelLabel}</strong></p>
      <p>• Gia công: <strong class="text-white">${finishingLabel}</strong></p>
      <p>• Thi công: <strong class="text-white">${installLabel}</strong></p>
      <p>• Số khoen: <strong class="text-white">${quote.eyeletCount.toLocaleString('vi-VN')} khoen</strong></p>
      <p>• Giá nền vật liệu: <strong class="text-white">${quote.basePriceText}/m²</strong></p>
      <p>• Phụ phí nhóm khách/file: <strong class="text-white">${quote.customerExtraText}/m²</strong></p>
      <p>• Phụ phí gia công: <strong class="text-white">${quote.finishingExtraText}/m²</strong></p>
      <p>• Đơn giá in: <strong class="text-orange-500">${quote.unitPriceText}/m²</strong></p>
      <p>• Tiền in: <strong class="text-white">${quote.printTotalText}</strong></p>
      <p>• Tiền khoen: <strong class="text-white">${quote.eyeletFeeText}</strong></p>
      <p>• Tiền thi công: <strong class="text-white">${quote.installFeeText}</strong></p>
      <p>• Tổng tiền: <strong class="text-orange-500">${quote.totalPriceText}</strong></p>
      <p class="text-gray-500">• ${quote.note}</p>
    `

    latestQuoteText =
      `Báo giá in ấn Decal - PP - Hiflex tham khảo:\n` +
      `- Kích thước: ${width}cm x ${height}cm\n` +
      `- Số lượng: ${quantity.toLocaleString('vi-VN')} tấm\n` +
      `- Tổng diện tích: ${quote.totalArea.toFixed(2)} m²\n` +
      `- Chất liệu: ${materialLabel}\n` +
      `- Thiết kế/file: ${designLevelLabel}\n` +
      `- Gia công: ${finishingLabel}\n` +
      `- Thi công: ${installLabel}\n` +
      `- Số khoen: ${quote.eyeletCount.toLocaleString('vi-VN')} khoen\n` +
      `- Đơn giá in: ${quote.unitPriceText}/m²\n` +
      `- Tổng tiền: ${quote.totalPriceText}\n` +
      `Giá tham khảo, có thể thay đổi theo file thiết kế, chất liệu, gia công, hiện trạng thi công và tiến độ cần lấy.`
  }

  widthInput.addEventListener('input', updateQuote)
  heightInput.addEventListener('input', updateQuote)
  quantityInput.addEventListener('input', updateQuote)
  materialSelect.addEventListener('change', updateQuote)
  customerTypeSelect.addEventListener('change', updateQuote)
  designLevelSelect.addEventListener('change', updateQuote)
  finishingSelect.addEventListener('change', updateQuote)
  eyeletsInput.addEventListener('input', updateQuote)
  installSelect.addEventListener('change', updateQuote)

  copyBtn.addEventListener('click', async () => {
    if (!latestQuoteText) {
      return
    }

    try {
      await navigator.clipboard.writeText(latestQuoteText)

      copyBtn.textContent = 'Đã copy ✓'

      setTimeout(() => {
        copyBtn.textContent = 'Copy báo giá'
      }, 1500)
    } catch {
      alert('Không thể copy tự động. Vui lòng copy thủ công.')
    }
  })

  resetBtn.addEventListener('click', () => {
    widthInput.value = ''
    heightInput.value = ''
    quantityInput.value = 1
    materialSelect.value = 'hiflex'
    customerTypeSelect.value = 'retail'
    designLevelSelect.value = 'basic'
    finishingSelect.value = 'none'
    eyeletsInput.value = 0
    installSelect.value = 'none'

    updateQuote()
  })

  updateQuote()
}

function initTuiXopCalculator() {
  const kgInput =
    document.querySelector('#sales-bag-kg')

  const orderTypeSelect =
    document.querySelector('#sales-bag-order-type')

  const customerTypeSelect =
    document.querySelector('#sales-bag-customer-type')

  const printColorsSelect =
    document.querySelector('#sales-bag-print-colors')

  const printingOnlyPriceWrap =
    document.querySelector('#sales-bag-printing-only-price-wrap')

  const printingOnlyPriceSelect =
    document.querySelector('#sales-bag-printing-only-price')

  const unitEl =
    document.querySelector('#sales-bag-unit')

  const totalEl =
    document.querySelector('#sales-bag-total')

  const summaryEl =
    document.querySelector('#sales-bag-summary')

  const warningEl =
    document.querySelector('#sales-bag-warning')

  const copyBtn =
    document.querySelector('#sales-bag-copy-quote')

  const resetBtn =
    document.querySelector('#sales-bag-reset')

  if (
    !kgInput ||
    !orderTypeSelect ||
    !customerTypeSelect ||
    !printColorsSelect
  ) {
    return
  }

  let latestQuoteText = ''

  function showWarning(message) {
    warningEl.textContent = message
    warningEl.classList.remove('hidden')
  }

  function hideWarning() {
    warningEl.textContent = ''
    warningEl.classList.add('hidden')
  }

  function updateVisibility() {
    const isPrintingOnly =
      orderTypeSelect.value === 'printing-only'

    printingOnlyPriceWrap.classList.toggle('hidden', !isPrintingOnly)
    customerTypeSelect.disabled = isPrintingOnly
    printColorsSelect.disabled = isPrintingOnly
  }

  function updateQuote() {
    const kg =
      Number(kgInput.value)

    hideWarning()
    updateVisibility()

    if (!kg || kg <= 0) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      summaryEl.innerHTML = ''
      latestQuoteText = ''

      showWarning('Nhập số kg túi để hệ thống tính giá.')

      return
    }

    const quote =
      calculateTuiXopInternalQuote({
        kg,
        customerType: customerTypeSelect.value,
        printColors: printColorsSelect.value,
        orderType: orderTypeSelect.value,
        printingOnlyPricePerKg: printingOnlyPriceSelect?.value,
      })

    if (!quote) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      summaryEl.innerHTML = ''
      latestQuoteText = ''

      showWarning('Không tính được giá túi xốp. Vui lòng kiểm tra lại thông tin.')

      return
    }

    const orderTypeLabel =
      getTuiXopOrderTypeLabel(orderTypeSelect.value)

    const customerTypeLabel =
      getTuiXopCustomerTypeLabel(customerTypeSelect.value)

    const printColorLabel =
      getTuiXopPrintColorLabel(printColorsSelect.value)

    unitEl.textContent =
      quote.unitPriceText

    totalEl.textContent =
      quote.totalPriceText

    summaryEl.innerHTML = `
      <p>• Số lượng: <strong class="text-white">${kg.toLocaleString('vi-VN')} kg</strong></p>
      <p>• Hình thức: <strong class="text-white">${orderTypeLabel}</strong></p>
      ${
        orderTypeSelect.value === 'printing-only'
          ? `<p>• Giá in gia công: <strong class="text-orange-500">${quote.unitPriceText}/kg</strong></p>`
          : `
            <p>• Số màu in: <strong class="text-white">${printColorLabel}</strong></p>
            <p>• Giá nền: <strong class="text-white">${formatCurrency(quote.basePricePerKg)}/kg</strong></p>
            <p>• Phụ thu màu in: <strong class="text-white">${formatCurrency(quote.extraPerKg)}/kg</strong></p>
            <p>• Phụ phí đơn ít: <strong class="text-white">${formatCurrency(quote.surcharge)}</strong></p>
          `
      }
      <p>• Đơn giá: <strong class="text-orange-500">${quote.unitPriceText}/kg</strong></p>
      <p>• Tổng tiền: <strong class="text-orange-500">${quote.totalPriceText}</strong></p>
      <p class="text-gray-500">• ${quote.note}</p>
    `

    latestQuoteText =
      `Báo giá in túi xốp tham khảo:\n` +
      `- Số lượng: ${kg.toLocaleString('vi-VN')} kg\n` +
      `- Hình thức: ${orderTypeLabel}\n` +
      (
        orderTypeSelect.value === 'printing-only'
          ? `- Giá in gia công: ${quote.unitPriceText}/kg\n`
          : `- Nhóm khách: ${customerTypeLabel}\n` +
            `- Số màu in: ${printColorLabel}\n` +
            `- Giá nền: ${formatCurrency(quote.basePricePerKg)}/kg\n` +
            `- Phụ thu màu in: ${formatCurrency(quote.extraPerKg)}/kg\n` +
            `- Phụ phí đơn ít: ${formatCurrency(quote.surcharge)}\n`
      ) +
      `- Đơn giá: ${quote.unitPriceText}/kg\n` +
      `- Tổng tiền: ${quote.totalPriceText}\n` +
      `Giá tham khảo, cần kiểm tra lại size túi, màu túi, file in và số lượng thực tế trước khi chốt.`
  }

  kgInput.addEventListener('input', updateQuote)
  orderTypeSelect.addEventListener('change', updateQuote)
  customerTypeSelect.addEventListener('change', updateQuote)
  printColorsSelect.addEventListener('change', updateQuote)
  printingOnlyPriceSelect?.addEventListener('change', updateQuote)

  copyBtn.addEventListener('click', async () => {
    if (!latestQuoteText) {
      return
    }

    try {
      await navigator.clipboard.writeText(latestQuoteText)

      copyBtn.textContent = 'Đã copy ✓'

      setTimeout(() => {
        copyBtn.textContent = 'Copy báo giá'
      }, 1500)
    } catch {
      alert('Không thể copy tự động. Vui lòng copy thủ công.')
    }
  })

  resetBtn.addEventListener('click', () => {
    kgInput.value = ''
    orderTypeSelect.value = 'full'
    customerTypeSelect.value = 'normal'
    printColorsSelect.value = '1'

    if (printingOnlyPriceSelect) {
      printingOnlyPriceSelect.value = '15000'
    }

    updateQuote()
  })

  updateQuote()
}

function initTemNhanCalculator() {
  const widthInput =
    document.querySelector('#sales-label-width')

  const heightInput =
    document.querySelector('#sales-label-height')

  const quantityInput =
    document.querySelector('#sales-label-quantity')

  const materialSelect =
    document.querySelector('#sales-label-material')

  const laminationSelect =
    document.querySelector('#sales-label-lamination')

  const unitEl =
    document.querySelector('#sales-label-unit')

  const totalEl =
    document.querySelector('#sales-label-total')

  const warningEl =
    document.querySelector('#sales-label-warning')

  const copyBtn =
    document.querySelector('#sales-label-copy-quote')

  const resetBtn =
    document.querySelector('#sales-label-reset')

  const openQuoteBtn =
    document.querySelector('#sales-label-open-quote')

  const popup =
    document.querySelector('#sales-label-quote-popup')

  const popupOverlay =
    document.querySelector('#sales-label-quote-overlay')

  const popupClose =
    document.querySelector('#sales-label-quote-close')

  const popupCloseBottom =
    document.querySelector('#sales-label-popup-close-bottom')

  const popupInfo =
    document.querySelector('#sales-label-popup-info')

  const popupTable =
    document.querySelector('#sales-label-popup-table')

  const popupCopy =
    document.querySelector('#sales-label-popup-copy')

  if (
    !widthInput ||
    !heightInput ||
    !quantityInput ||
    !materialSelect ||
    !laminationSelect
  ) {
    return
  }

  let latestQuoteText = ''
  let latestPopupText = ''

  function getCurrentInput() {
    return {
      width: Number(widthInput.value),
      height: Number(heightInput.value),
      quantity: Number(quantityInput.value),
      decalType: materialSelect.value,
      lamination: laminationSelect.value,
    }
  }

  function showWarning(message) {
    warningEl.textContent = message
    warningEl.classList.remove('hidden')
  }

  function hideWarning() {
    warningEl.textContent = ''
    warningEl.classList.add('hidden')
  }

  function validateInput({
    width,
    height,
    quantity,
  }) {
    if (!width || !height || !quantity) {
      return 'Nhập kích thước và số lượng để hệ thống tính giá.'
    }

    if (
      width < 20 ||
      width > 300 ||
      height < 20 ||
      height > 300
    ) {
      return 'Kích thước tem hợp lệ từ 20mm đến 300mm.'
    }

    if (quantity <= 0) {
      return 'Vui lòng nhập số lượng tem hợp lệ.'
    }

    return ''
  }

  function updateQuote() {
    const input =
      getCurrentInput()

    const error =
      validateInput(input)

    hideWarning()

    if (error) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      latestQuoteText = ''

      showWarning(error)

      return null
    }

    const quote =
      calculateTemNhanInternalQuote(input)

    if (!quote) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      latestQuoteText = ''

      showWarning('Không tính được giá. Kiểm tra lại cấu hình vật liệu/cán màng trong temNhanPricingConfig.js.')

      return null
    }

    const materialLabel =
      getTemNhanMaterialLabel(input.decalType)

    const laminationLabel =
      getTemNhanLaminationLabel(input.lamination)

    unitEl.textContent =
      quote.unitPrice

    totalEl.textContent =
      quote.totalPrice

    latestQuoteText =
      `Báo giá tem nhãn tham khảo:\n` +
      `- Kích thước: ${input.width} x ${input.height} mm\n` +
      `- Chất liệu: ${materialLabel}\n` +
      `- Cán màng: ${laminationLabel}\n` +
      `- Số lượng: ${input.quantity.toLocaleString('vi-VN')} tem\n` +
      `- Đơn giá: ${quote.unitPrice}/tem\n` +
      `- Tổng tiền: ${quote.totalPrice}\n` +
      `Giá tham khảo, có thể thay đổi nhẹ theo file thiết kế, kiểu bế và tiến độ cần giao.`

    return quote
  }

  function openQuotePopup() {
    const input =
      getCurrentInput()

    const error =
      validateInput(input)

    hideWarning()

    if (error) {
      showWarning(error)
      return
    }

    const materialLabel =
      getTemNhanMaterialLabel(input.decalType)

    const laminationLabel =
      getTemNhanLaminationLabel(input.lamination)

    const quantities =
      getTemNhanReferenceQuantities(input.quantity)

    const rows =
      quantities
        .map((qty) => {
          const quote =
            calculateTemNhanInternalQuote({
              ...input,
              quantity: qty,
            })

          if (!quote) {
            return null
          }

          return {
            qty,
            quote,
            isActive: qty === input.quantity,
          }
        })
        .filter(Boolean)

    if (!rows.length) {
      showWarning('Không tạo được bảng giá theo số lượng.')
      return
    }

    popupInfo.textContent =
      `${input.width} x ${input.height} mm - ${materialLabel} - ${laminationLabel}`

    popupTable.innerHTML =
      rows.map((row) => `
        <div class="
          grid grid-cols-3 items-center rounded-xl border px-4 py-3 text-sm md:text-base
          ${row.isActive
            ? 'border-orange-500 bg-orange-500/10'
            : 'border-zinc-800 bg-black'}
        ">
          <div class="font-bold ${row.isActive ? 'text-orange-500' : 'text-gray-300'}">
            ${row.isActive ? '▶ ' : ''}${row.qty.toLocaleString('vi-VN')} tem
          </div>

          <div class="text-center font-black ${row.isActive ? 'text-orange-500' : 'text-white'}">
            ${row.quote.unitPrice}
          </div>

          <div class="text-right font-black ${row.isActive ? 'text-orange-500' : 'text-white'}">
            ${row.quote.totalPrice}
          </div>
        </div>
      `).join('')

    latestPopupText =
      `Bảng giá tem nhãn tham khảo\n` +
      `Kích thước: ${input.width} x ${input.height} mm\n` +
      `Chất liệu: ${materialLabel}\n` +
      `Cán màng: ${laminationLabel}\n\n` +
      rows.map((row) => {
        return `- ${row.qty.toLocaleString('vi-VN')} tem: ${row.quote.unitPrice}/tem - Tổng ${row.quote.totalPrice}`
      }).join('\n') +
      `\n\nGiá tham khảo, có thể thay đổi theo file thiết kế, kiểu bế và tiến độ cần giao.`

    popup.classList.remove('hidden')
    popup.classList.add('flex')
  }

  function closeQuotePopup() {
    popup.classList.add('hidden')
    popup.classList.remove('flex')
  }

  widthInput.addEventListener('input', updateQuote)
  heightInput.addEventListener('input', updateQuote)
  quantityInput.addEventListener('input', updateQuote)
  materialSelect.addEventListener('change', updateQuote)
  laminationSelect.addEventListener('change', updateQuote)

  copyBtn.addEventListener('click', async () => {
    if (!latestQuoteText) {
      return
    }

    try {
      await navigator.clipboard.writeText(latestQuoteText)

      copyBtn.textContent = 'Đã copy ✓'

      setTimeout(() => {
        copyBtn.textContent = 'Copy báo giá nhanh'
      }, 1500)
    } catch {
      alert('Không thể copy tự động. Vui lòng copy thủ công.')
    }
  })

  openQuoteBtn.addEventListener('click', openQuotePopup)

  popupOverlay.addEventListener('click', closeQuotePopup)
  popupClose.addEventListener('click', closeQuotePopup)
  popupCloseBottom.addEventListener('click', closeQuotePopup)

  popupCopy.addEventListener('click', async () => {
    if (!latestPopupText) {
      return
    }

    try {
      await navigator.clipboard.writeText(latestPopupText)

      popupCopy.textContent = 'Đã copy ✓'

      setTimeout(() => {
        popupCopy.textContent = 'Copy bảng giá'
      }, 1500)
    } catch {
      alert('Không thể copy tự động. Vui lòng copy thủ công.')
    }
  })

  resetBtn.addEventListener('click', () => {
    widthInput.value = ''
    heightInput.value = ''
    quantityInput.value = ''
    materialSelect.value = 'plastic'
    laminationSelect.value = 'none'

    updateQuote()
  })

  updateQuote()
}

function initHoaDonCalculator() {
  const sizeSelect =
    document.querySelector('#sales-invoice-size')

  const plySelect =
    document.querySelector('#sales-invoice-ply')

  const quantitySelect =
    document.querySelector('#sales-invoice-quantity')

  const unitEl =
    document.querySelector('#sales-invoice-unit')

  const totalEl =
    document.querySelector('#sales-invoice-total')

  const tableEl =
    document.querySelector('#sales-invoice-table')

  if (!sizeSelect || !plySelect || !quantitySelect) {
    return
  }

  function renderQuantityOptions() {
    const table =
      hoaDonInternalPriceTable[sizeSelect.value]?.[plySelect.value] || []

    quantitySelect.innerHTML =
      table.map((item) => `
        <option value="${item.qty}">
          ${item.qty.toLocaleString('vi-VN')} cuốn
        </option>
      `).join('')

    updateQuote()
  }

  function updateQuote() {
    const quote =
      calculateHoaDonInternalQuote({
        size: sizeSelect.value,
        ply: plySelect.value,
        quantity: Number(quantitySelect.value),
      })

    if (!quote) {
      unitEl.textContent = '-'
      totalEl.textContent = '-'
      tableEl.innerHTML = ''
      return
    }

    unitEl.textContent =
      quote.unitPriceText

    totalEl.textContent =
      quote.totalPriceText

    tableEl.innerHTML =
      quote.table.map((item) => {
        const isActive =
          item.qty === quote.quantity

        return `
          <div class="
            grid grid-cols-3 items-center rounded-xl border px-4 py-3 text-sm
            ${isActive
              ? 'border-orange-500 bg-orange-500/10'
              : 'border-zinc-800 bg-zinc-950'}
          ">
            <div class="${isActive ? 'text-orange-500' : 'text-gray-300'} font-bold">
              ${isActive ? '▶ ' : ''}${item.qty.toLocaleString('vi-VN')} cuốn
            </div>

            <div class="text-center ${isActive ? 'text-orange-500' : 'text-white'} font-black">
              ${formatCurrency(item.unitPrice)}
            </div>

            <div class="text-right ${isActive ? 'text-orange-500' : 'text-white'} font-black">
              ${formatCurrency(item.qty * item.unitPrice)}
            </div>
          </div>
        `
      }).join('')
  }

  sizeSelect.addEventListener('change', renderQuantityOptions)
  plySelect.addEventListener('change', renderQuantityOptions)
  quantitySelect.addEventListener('change', updateQuote)

  renderQuantityOptions()
}

export function SalesPortal() {
  setTimeout(() => {
    const loginScreen =
      document.querySelector('#sales-login-screen')

    const portalScreen =
      document.querySelector('#sales-portal-screen')

    const passwordInput =
      document.querySelector('#sales-password')

    const loginBtn =
      document.querySelector('#sales-login-btn')

    const loginError =
      document.querySelector('#sales-login-error')

    const logoutBtn =
      document.querySelector('#sales-logout-btn')

    const searchInput =
      document.querySelector('#sales-search')

    const groupButtons =
      document.querySelectorAll('[data-sales-group]')

    const productList =
      document.querySelector('#sales-product-list')

    const productDetail =
      document.querySelector('#sales-product-detail')

    let activeGroup = 'all'
    let activeProductId = salesProducts[0]?.id

    function showPortal() {
      loginScreen.classList.add('hidden')
      portalScreen.classList.remove('hidden')
    }

    function showLogin() {
      loginScreen.classList.remove('hidden')
      portalScreen.classList.add('hidden')
    }

    function renderDetail() {
      const product =
        salesProducts.find((item) => item.id === activeProductId)

      productDetail.innerHTML =
        renderProductDetail(product)

      initHoaDonCalculator()
      initTemNhanCalculator()
      initTuiXopCalculator()
      initLargeFormatCalculator()
      initNhaRapCalculator()
      initCopyButtons()
      updateActiveProductButtons()
    }

    function updateActiveProductButtons() {
      document
        .querySelectorAll('[data-product-id]')
        .forEach((button) => {
          const isActive =
            button.dataset.productId === activeProductId

          button.classList.toggle('border-orange-500', isActive)
          button.classList.toggle('bg-orange-500/10', isActive)
        })
    }

    function filterProductList() {
      const keyword =
        searchInput.value.trim().toLowerCase()

      document
        .querySelectorAll('.sales-product-item')
        .forEach((item) => {
          const matchGroup =
            activeGroup === 'all' || item.dataset.group === activeGroup

          const matchSearch =
            !keyword || item.dataset.search.includes(keyword)

          item.classList.toggle('hidden', !(matchGroup && matchSearch))
        })

      groupButtons.forEach((button) => {
        const isActive =
          button.dataset.salesGroup === activeGroup

        button.classList.toggle('bg-orange-500', isActive)
        button.classList.toggle('text-white', isActive)
        button.classList.toggle('border-orange-500', isActive)

        button.classList.toggle('bg-black', !isActive)
        button.classList.toggle('text-gray-300', !isActive)
        button.classList.toggle('border-zinc-700', !isActive)
      })
    }

    function initCopyButtons() {
      document
        .querySelectorAll('.copy-script-btn')
        .forEach((button) => {
          button.addEventListener('click', async () => {
            const target =
              document.querySelector(`#${button.dataset.copyTarget}`)

            if (!target) {
              return
            }

            try {
              await navigator.clipboard.writeText(target.textContent.trim())

              button.textContent = 'Đã copy ✓'

              setTimeout(() => {
                button.textContent = 'Copy tin nhắn'
              }, 1500)
            } catch {
              alert('Không thể copy tự động. Vui lòng copy thủ công.')
            }
          })
        })
    }

    function bindProductButtons() {
      document
        .querySelectorAll('[data-product-id]')
        .forEach((button) => {
          button.addEventListener('click', () => {
            activeProductId =
              button.dataset.productId

            renderDetail()
          })
        })
    }

    function login() {
      const success =
        loginSalesPortal(passwordInput.value.trim())

      if (success) {
        loginError.textContent = ''
        showPortal()
        return
      }

      loginError.textContent =
        'Sai mật khẩu. Vui lòng thử lại.'
    }

    loginBtn.addEventListener('click', login)

    passwordInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        login()
      }
    })

    logoutBtn.addEventListener('click', () => {
      logoutSalesPortal()
      showLogin()
    })

    searchInput.addEventListener('input', filterProductList)

    groupButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeGroup =
          button.dataset.salesGroup

        filterProductList()
      })
    })

    productList.innerHTML =
      renderProductList()

    bindProductButtons()
    renderDetail()
    filterProductList()

    if (isLoggedIn()) {
      showPortal()
    }
  }, 0)

  return `
    <main class="min-h-screen bg-black text-white">

      <section
        id="sales-login-screen"
        class="min-h-screen flex items-center justify-center px-6"
      >
        <div class="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <div class="text-center mb-8">
            <img
              src="/images/logo-ist.png"
              alt="IST"
              class="h-16 mx-auto mb-5 object-contain"
            >

            <p class="text-orange-500 font-bold tracking-[0.2em] uppercase mb-3">
              IST Sales Portal
            </p>

            <h1 class="text-3xl font-black">
              Cổng kinh doanh nội bộ
            </h1>

            <p class="text-gray-400 mt-3 leading-relaxed">
              Nhập mật khẩu để truy cập bảng giá, thông tin sản phẩm và tài liệu tư vấn.
            </p>
          </div>

          <input
            id="sales-password"
            type="password"
            placeholder="Nhập mật khẩu"
            class="w-full rounded-xl border border-zinc-700 bg-black px-4 py-4 text-white outline-none focus:border-orange-500"
          >

          <p
            id="sales-login-error"
            class="mt-3 text-sm text-red-400"
          ></p>

          <button
            id="sales-login-btn"
            type="button"
            class="mt-5 w-full rounded-xl bg-orange-500 px-5 py-4 font-bold text-white hover:bg-orange-600 transition"
          >
            Đăng nhập
          </button>
        </div>
      </section>

      <section
        id="sales-portal-screen"
        class="hidden min-h-screen"
      >

        <header class="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
          <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-5">

            <div>
              <p class="text-orange-500 font-black text-xl">
                IST Sales Portal
              </p>

              <p class="text-gray-400 text-sm">
                Tra cứu sản phẩm, giá và tư vấn
              </p>
            </div>

            <button
              id="sales-logout-btn"
              type="button"
              class="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
            >
              Đăng xuất
            </button>

          </div>
        </header>

        <section class="py-8">
          <div class="max-w-7xl mx-auto px-6">

            <div class="mb-6">
              <input
                id="sales-search"
                type="text"
                placeholder="Tìm nhanh: tem nhãn, hóa đơn, bảng hiệu, túi xốp..."
                class="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white outline-none focus:border-orange-500"
              >
            </div>

            <div class="flex flex-wrap gap-3 mb-6">
              ${salesGroups.map((group) => `
                <button
                  type="button"
                  data-sales-group="${group.id}"
                  class="rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    group.id === 'all'
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-zinc-700 bg-black text-gray-300 hover:border-orange-500 hover:text-orange-500'
                  }"
                >
                  ${group.label}
                </button>
              `).join('')}
            </div>

            <div class="grid lg:grid-cols-[360px_1fr] gap-6 items-start">

              <aside class="grid gap-3 lg:sticky lg:top-28">
                <div id="sales-product-list" class="grid gap-3"></div>
              </aside>

              <section id="sales-product-detail"></section>

            </div>

          </div>
        </section>

      </section>

    </main>
  `
}
