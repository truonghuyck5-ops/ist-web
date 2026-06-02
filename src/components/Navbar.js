import { productMenu } from '../data/productMenu'

function ProductDropdownDesktop() {
  return `
    <div class="relative group">

      <button
        type="button"
        onclick="
          trackEvent('click_nav', {
            menu: 'san_pham_dropdown',
            type: 'desktop'
          })
        "
        class="flex items-center gap-1 hover:text-orange-500 transition"
      >
        Sản phẩm
        <span class="text-xs">▾</span>
      </button>

      <div
        class="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-0 top-full pt-4 z-50"
      >
        <div class="w-80 rounded-2xl border border-zinc-800 bg-black shadow-2xl overflow-hidden">

          ${productMenu.map((item) => `
            <a
              href="${item.href}"
              onclick="
                trackEvent('click_nav_product', {
                  product: '${item.key}',
                  type: 'desktop'
                })
              "
              class="block px-5 py-4 hover:bg-zinc-900 transition"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <span class="block text-sm font-semibold text-white">
                    ${item.label}
                  </span>

                  <span class="block mt-1 text-xs leading-relaxed text-gray-500">
                    ${item.description}
                  </span>
                </div>

                ${
                  item.status === 'coming'
                    ? `<span class="shrink-0 rounded-full border border-zinc-700 px-2 py-1 text-[10px] text-gray-500">
                        Sắp có
                      </span>`
                    : ''
                }
              </div>
            </a>
          `).join('')}

        </div>
      </div>

    </div>
  `
}

function ProductDropdownMobile() {
  return `
    <div class="border-b border-zinc-800 py-3">

      <p class="mb-3 font-semibold text-white">
        Sản phẩm
      </p>

      <div class="grid gap-2 pl-4">
        ${productMenu.map((item) => `
          <a
            href="${item.href}"
            onclick="
              trackEvent('click_nav_product', {
                product: '${item.key}',
                type: 'mobile'
              })
            "
            class="block py-2 text-gray-400 hover:text-orange-500 transition"
          >
            <span class="block">
              ${item.label}
              ${
                item.status === 'coming'
                  ? `<span class="ml-2 text-xs text-gray-600">(sắp có)</span>`
                  : ''
              }
            </span>

            <span class="block mt-1 text-xs text-gray-600">
              ${item.description}
            </span>
          </a>
        `).join('')}
      </div>

    </div>
  `
}

export function Navbar() {

  setTimeout(() => {

    const menuButton = document.querySelector('#mobile-menu-button')
    const mobileMenu = document.querySelector('#mobile-menu')

    if (menuButton && mobileMenu) {

      menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden')
      })

    }

  }, 0)

  return `
    <header class="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur z-50">

      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <!-- Logo -->
        <a
          href="/"
          onclick="
            trackEvent('click_nav', {
              menu: 'logo_home',
              type: 'desktop'
            })
          "
          class="flex items-center gap-4"
        >

          <img
            src="/images/logo-ist.png"
            alt="IST Logo"
            class="w-14 h-14 object-contain"
          >

          <div>

            <h1 class="text-2xl font-bold text-orange-500">
              IN SÁNG TẠO
            </h1>

            <p class="text-sm text-gray-400">
              Thiết kế - In ấn - Quảng cáo
            </p>

          </div>

        </a>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex gap-8 text-sm">

          <a
            href="/"
            onclick="
              trackEvent('click_nav', {
                menu: 'trang_chu',
                type: 'desktop'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Trang chủ
          </a>

          <a
            href="/#capabilities"
            onclick="
              trackEvent('click_nav', {
                menu: 'nang_luc',
                type: 'desktop'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Năng lực
          </a>

          ${ProductDropdownDesktop()}

          <a
            href="/#projects"
            onclick="
              trackEvent('click_nav', {
                menu: 'cong_trinh',
                type: 'desktop'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Công trình
          </a>

          <a
            href="/blog/"
            onclick="
              trackEvent('click_nav', {
                menu: 'blog',
                type: 'desktop'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Blog
          </a>

          <a
            href="#contact"
            onclick="
              trackEvent('click_nav', {
                menu: 'lien_he',
                type: 'desktop'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Liên hệ
          </a>

        </nav>

        <!-- Right -->
        <div class="flex items-center gap-4">

          <a
            href="#contact"

            onclick="
              trackEvent('click_cta', {
                page: 'global',
                button: 'bao_gia_nhanh_navbar'
              })
            "

            class="hidden md:block bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg font-medium"
          >
            Báo giá nhanh
          </a>

          <!-- Mobile Button -->
          <button
            id="mobile-menu-button"
            class="md:hidden text-3xl"
          >
            ☰
          </button>

        </div>

      </div>

      <!-- Mobile Menu -->
      <div
        id="mobile-menu"
        class="hidden md:hidden border-t border-gray-800"
      >

        <div class="px-6 py-6 flex flex-col gap-5 text-lg">

          <a
            href="/"
            onclick="
              trackEvent('click_nav', {
                menu: 'trang_chu',
                type: 'mobile'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Trang chủ
          </a>

          <a
            href="/#capabilities"
            onclick="
              trackEvent('click_nav', {
                menu: 'nang_luc',
                type: 'mobile'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Năng lực
          </a>

          ${ProductDropdownMobile()}

          <a
            href="/#projects"
            onclick="
              trackEvent('click_nav', {
                menu: 'cong_trinh',
                type: 'mobile'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Công trình
          </a>

          <a
            href="/blog/"
            onclick="
              trackEvent('click_nav', {
                menu: 'blog',
                type: 'mobile'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Blog
          </a>

          <a
            href="#contact"
            onclick="
              trackEvent('click_nav', {
                menu: 'lien_he',
                type: 'mobile'
              })
            "
            class="hover:text-orange-500 transition"
          >
            Liên hệ
          </a>

          <a
            href="#contact"

            onclick="
              trackEvent('click_cta', {
                page: 'global',
                button: 'bao_gia_nhanh_navbar_mobile'
              })
            "

            class="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-xl font-medium mt-2 text-center"
          >
            Báo giá nhanh
          </a>

        </div>

      </div>

    </header>
  `
}