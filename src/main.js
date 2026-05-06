import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white min-h-screen">

    <!-- Navbar -->
    <header class="border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>
          <h1 class="text-2xl font-bold text-orange-500">
            IST
          </h1>

          <p class="text-sm text-gray-400">
            Thiết kế - In ấn - Quảng cáo
          </p>
        </div>

        <nav class="hidden md:flex gap-8 text-sm">
          <a href="#" class="hover:text-orange-500 transition">
            Trang chủ
          </a>

          <a href="#" class="hover:text-orange-500 transition">
            Sản phẩm
          </a>

          <a href="#" class="hover:text-orange-500 transition">
            Công trình
          </a>

          <a href="#" class="hover:text-orange-500 transition">
            Liên hệ
          </a>
        </nav>

        <button class="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg font-medium">
          Báo giá nhanh
        </button>

      </div>
    </header>

    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-6 py-24">

      <div class="max-w-3xl">

        <p class="text-orange-500 font-semibold mb-4">
          IN SÁNG TẠO
        </p>

        <h2 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
          Thiết kế,
          <br>
          In ấn &
          <br>
          Quảng cáo
        </h2>

        <p class="text-gray-400 text-lg leading-relaxed mb-10">
          Giải pháp thiết kế, in ấn và thi công quảng cáo
          chuyên nghiệp cho doanh nghiệp, cửa hàng
          và cơ quan tại Trà Vinh và khu vực lân cận.
        </p>

        <div class="flex flex-wrap gap-4">

          <button class="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold">
            Xem sản phẩm
          </button>

          <button class="border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition px-8 py-4 rounded-xl font-semibold">
            Liên hệ tư vấn
          </button>

        </div>

      </div>

    </section>

  </div>
`