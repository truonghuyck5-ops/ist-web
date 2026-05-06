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
<section class="relative overflow-hidden">

  <!-- Background glow -->
  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>

  <div class="max-w-7xl mx-auto px-6 py-28 relative z-10">

    <div class="grid lg:grid-cols-2 gap-16 items-center">

      <!-- Left -->
      <div>

        <p class="text-orange-500 font-semibold mb-5 tracking-widest">
          IN SÁNG TẠO
        </p>

        <h2 class="text-5xl md:text-7xl font-black leading-tight mb-8">
          Thiết kế,
          <br>
          In ấn &
          <br>
          Quảng cáo
        </h2>

        <p class="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl">
          Giải pháp thiết kế, in ấn và thi công quảng cáo
          chuyên nghiệp cho doanh nghiệp, cửa hàng
          và cơ quan tại Trà Vinh và khu vực lân cận.
        </p>

        <div class="flex flex-wrap gap-4">

          <button class="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold text-lg">
            Xem sản phẩm
          </button>

          <button class="border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition px-8 py-4 rounded-xl font-semibold text-lg">
            Liên hệ tư vấn
          </button>

        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 mt-16">

          <div>
            <h3 class="text-3xl font-bold text-orange-500 mb-2">
              10+
            </h3>

            <p class="text-gray-400 text-sm">
              Năm kinh nghiệm
            </p>
          </div>

          <div>
            <h3 class="text-3xl font-bold text-orange-500 mb-2">
              1000+
            </h3>

            <p class="text-gray-400 text-sm">
              Công trình
            </p>
          </div>

          <div>
            <h3 class="text-3xl font-bold text-orange-500 mb-2">
              500m²
            </h3>

            <p class="text-gray-400 text-sm">
              Xưởng sản xuất
            </p>
          </div>

        </div>

      </div>

      <!-- Right -->
      <div>

        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

          <div class="aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">

            <div class="text-center">

              <div class="text-orange-500 text-7xl mb-6">
                IST
              </div>

              <p class="text-gray-400">
                Hình ảnh công trình / xưởng sản xuất
              </p>

            </div>

          </div>

        </div>

      </div>

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

          <div class="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition duration-300 hover:-translate-y-2">
            <div class="h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">

               <p class="text-orange-500 text-3xl font-bold opacity-30 group-hover:opacity-100 transition">
                 IST
                </p>

            </div>

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

          <div class="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition duration-300 hover:-translate-y-2">
            <div class="h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">

              <p class="text-orange-500 text-3xl font-bold opacity-30 group-hover:opacity-100 transition">
                 IST
             </p>

            </div>

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

          <div class="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition duration-300 hover:-translate-y-2">
            <div class="h-56 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">

              <p class="text-orange-500 text-3xl font-bold opacity-30 group-hover:opacity-100 transition">
                IST
              </p>

              </div>

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