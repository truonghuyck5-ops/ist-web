import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    <!-- Navbar -->
    <header class="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur z-50">
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
          <a href="#" class="hover:text-orange-500 transition">Trang chủ</a>
          <a href="#" class="hover:text-orange-500 transition">Sản phẩm</a>
          <a href="#" class="hover:text-orange-500 transition">Công trình</a>
          <a href="#" class="hover:text-orange-500 transition">Liên hệ</a>
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
          Giải pháp thiết kế, in ấn và thi công quảng cáo chuyên nghiệp
          cho doanh nghiệp, cửa hàng và cơ quan tại Trà Vinh và khu vực lân cận.
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

    <!-- Năng lực -->
    <section class="border-t border-gray-900">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="mb-14">
          <p class="text-orange-500 font-semibold mb-3">
            NĂNG LỰC IST
          </p>

          <h3 class="text-4xl font-bold">
            Chủ động sản xuất
            <br>
            & thi công thực tế
          </h3>
        </div>

        <div class="grid md:grid-cols-4 gap-6">

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              500+
            </h4>

            <p class="text-gray-300">
              m² nhà xưởng sản xuất
            </p>
          </div>

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              15+
            </h4>

            <p class="text-gray-300">
              nhân sự chuyên môn
            </p>
          </div>

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              10+
            </h4>

            <p class="text-gray-300">
              năm kinh nghiệm
            </p>
          </div>

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              1000+
            </h4>

            <p class="text-gray-300">
              công trình & đơn hàng
            </p>
          </div>

        </div>

      </div>

    </section>

    <!-- Sản phẩm -->
    <section class="border-t border-gray-900">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="mb-14">
          <p class="text-orange-500 font-semibold mb-3">
            SẢN PHẨM & DỊCH VỤ
          </p>

          <h3 class="text-4xl font-bold">
            Các sản phẩm
            <br>
            chủ lực của IST
          </h3>
        </div>

        <div class="grid md:grid-cols-3 gap-6">

          <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition">
            <div class="h-56 bg-zinc-800"></div>

            <div class="p-8">
              <h4 class="text-2xl font-bold mb-4">
                Tem nhãn
              </h4>

              <p class="text-gray-400 leading-relaxed">
                In tem nhãn số lượng ít đến lớn,
                chủ động sản xuất nhanh bằng hệ thống máy công nghiệp.
              </p>
            </div>
          </div>

          <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition">
            <div class="h-56 bg-zinc-800"></div>

            <div class="p-8">
              <h4 class="text-2xl font-bold mb-4">
                Bảng hiệu quảng cáo
              </h4>

              <p class="text-gray-400 leading-relaxed">
                Thi công bảng hiệu, hộp đèn,
                mặt dựng alu cho shop và doanh nghiệp.
              </p>
            </div>
          </div>

          <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition">
            <div class="h-56 bg-zinc-800"></div>

            <div class="p-8">
              <h4 class="text-2xl font-bold mb-4">
                In túi xốp
              </h4>

              <p class="text-gray-400 leading-relaxed">
                Sản xuất túi xốp in lụa
                cho cửa hàng và hộ kinh doanh.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>

    <!-- CTA -->
    <section class="border-t border-gray-900">

      <div class="max-w-5xl mx-auto px-6 py-24 text-center">

        <p class="text-orange-500 font-semibold mb-4">
          LIÊN HỆ IST
        </p>

        <h3 class="text-5xl font-bold mb-8 leading-tight">
          Cần báo giá nhanh
          <br>
          cho công trình hoặc sản phẩm?
        </h3>

        <p class="text-gray-400 text-lg mb-10 leading-relaxed">
          IST hỗ trợ tư vấn, thiết kế và báo giá nhanh
          cho doanh nghiệp, cửa hàng và cơ quan.
        </p>

        <div class="flex flex-wrap justify-center gap-4">

          <button class="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold">
            Gọi ngay
          </button>

          <button class="border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition px-8 py-4 rounded-xl font-semibold">
            Chat Zalo
          </button>

        </div>

      </div>

    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-900">

      <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">

        <div>
          <h4 class="text-2xl font-bold text-orange-500 mb-3">
            IST
          </h4>

          <p class="text-gray-400 leading-relaxed">
            Thiết kế - In ấn - Quảng cáo
            <br>
            Trà Vinh
          </p>
        </div>

        <div class="text-gray-400 text-sm leading-relaxed">
          93 Trần Thành Đại, TT. Cầu Ngang
          <br>
          0974 31 32 30
          <br>
          insangtao.net
        </div>

      </div>

    </footer>

  </div>
`