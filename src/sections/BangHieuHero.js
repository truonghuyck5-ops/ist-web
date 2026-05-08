export function BangHieuHero() {
  return `
    <section class="relative overflow-hidden fade-in">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>

      <div class="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p class="text-orange-500 font-semibold mb-5 tracking-widest">
              BẢNG HIỆU QUẢNG CÁO
            </p>

            <h1 class="text-5xl md:text-7xl font-black leading-tight mb-8">
              Thi công bảng hiệu
              <br>
              chuyên nghiệp
            </h1>

            <p class="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl">
              IST nhận thiết kế, sản xuất và thi công bảng hiệu, hộp đèn, mặt dựng alu,
              chữ nổi và các hạng mục quảng cáo cho cửa hàng, doanh nghiệp và cơ quan.
            </p>

            <div class="flex flex-wrap gap-4">
              <a
                href="#contact"
                onclick="
                    trackEvent('click_cta', {
                    page: 'bang_hieu',
                    button: 'nhan_tu_van'
                    })
                "
                class="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold text-lg"
                >
                Nhận tư vấn
                </a>

              <a
                href="#bang-hieu-types"
                onclick="
                    trackEvent('click_cta', {
                    page: 'bang_hieu',
                    button: 'xem_hang_muc'
                    })
                "
                class="border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition px-8 py-4 rounded-xl font-semibold text-lg"
                >
                Xem hạng mục
                </a>

            </div>
          </div>

          <div class="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="/images/projects/bang-hieu-001.jpg"
              alt="Thi công bảng hiệu IST"
              class="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  `
}