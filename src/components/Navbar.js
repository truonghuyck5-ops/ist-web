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
        <div class="flex items-center gap-4">

          <img
            src="/images/logo-ist.png"
            alt="IST Logo"
            class="w-14 h-14 object-contain"
          >

          <div>

            <h1 class="text-2xl font-bold text-orange-500">
              IST
            </h1>

            <p class="text-sm text-gray-400">
              Thiết kế - In ấn - Quảng cáo
            </p>

          </div>

        </div>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex gap-8 text-sm">

          <a href="#hero" class="hover:text-orange-500 transition">
            Trang chủ
          </a>

          <a href="#products" class="hover:text-orange-500 transition">
            Sản phẩm
          </a>

          <a href="#projects" class="hover:text-orange-500 transition">
            Công trình
          </a>

          <a href="#contact" class="hover:text-orange-500 transition">
            Liên hệ
          </a>

        </nav>

        <!-- Right -->
        <div class="flex items-center gap-4">

          <button class="hidden md:block bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg font-medium">
            Báo giá nhanh
          </button>

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

          <a href="#hero" class="hover:text-orange-500 transition">
            Trang chủ
          </a>

          <a href="#products" class="hover:text-orange-500 transition">
            Sản phẩm
          </a>

          <a href="#projects" class="hover:text-orange-500 transition">
            Công trình
          </a>

          <a href="#contact" class="hover:text-orange-500 transition">
            Liên hệ
          </a>

          <button class="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-xl font-medium mt-2">
            Báo giá nhanh
          </button>

        </div>

      </div>

    </header>
  `
}