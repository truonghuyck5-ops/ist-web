import { Button } from '../components/Button'

export function Hero() {
  return `
    <section id="hero" class="relative overflow-hidden fade-in">

      <div class="absolute top-0 right-0 w-[520px] h-[520px] bg-orange-500/20 blur-3xl rounded-full"></div>
      <div class="absolute bottom-0 left-0 w-[360px] h-[360px] bg-orange-500/10 blur-3xl rounded-full"></div>

      <div class="max-w-7xl mx-auto px-6 py-24 md:py-28 relative z-10">

        <div class="grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <p class="text-orange-500 font-semibold mb-5 tracking-widest uppercase">
              Hồ sơ năng lực IST
            </p>

            <h2 class="text-4xl md:text-6xl font-black leading-tight mb-8">
              Thiết kế, in ấn &
              <br>
              thi công quảng cáo
            </h2>

            <p class="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Công ty TNHH MTV Quảng Cáo In Sáng Tạo cung cấp giải pháp thiết kế,
              in ấn, sản xuất và thi công bảng hiệu quảng cáo cho cửa hàng,
              doanh nghiệp, cơ quan và tổ chức tại Trà Vinh, Vĩnh Long và khu vực lân cận.
            </p>

            <div class="flex flex-wrap gap-4">

              ${Button({
                text: 'Xem năng lực IST',
                href: '#capabilities',
                onclick: `
                  trackEvent('click_cta', {
                    page: 'home',
                    button: 'xem_nang_luc_ist'
                  })
                `,
                variant: 'primary'
              })}

              ${Button({
                text: 'Gửi yêu cầu báo giá',
                href: '#contact',
                onclick: `
                  trackEvent('click_cta', {
                    page: 'home',
                    button: 'gui_yeu_cau_bao_gia'
                  })
                `,
                variant: 'outline'
              })}

            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

                <div>
                    <h3
                    class="counter-number text-3xl font-bold text-orange-500 mb-1"
                    data-target="10"
                    data-suffix="+"
                    >
                    0
                    </h3>
                    <p class="text-gray-400 text-sm">Năm kinh nghiệm</p>
                </div>

                <div>
                    <h3
                    class="counter-number text-3xl font-bold text-orange-500 mb-1"
                    data-target="500"
                    data-suffix="m²+"
                    >
                    0
                    </h3>
                    <p class="text-gray-400 text-sm">Nhà xưởng</p>
                </div>

                <div>
                    <h3
                    class="counter-number text-3xl font-bold text-orange-500 mb-1"
                    data-target="15"
                    data-suffix="+"
                    >
                    0
                    </h3>
                    <p class="text-gray-400 text-sm">Nhân sự</p>
                </div>

                <div>
                    <h3
                    class="counter-number text-3xl font-bold text-orange-500 mb-1"
                    data-target="1000"
                    data-suffix="+"
                    >
                    0
                    </h3>
                    <p class="text-gray-400 text-sm">Đơn hàng & công trình</p>
                </div>

            </div>

          </div>

          <div>
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="images/home/home-hero-001.webp"
                alt="Xưởng sản xuất và thi công quảng cáo IST"
                data-lightbox="images/home/home-hero-001.webp"
                data-caption="Xưởng sản xuất và thi công quảng cáo IST"
                class="w-full h-full object-cover"
                />
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-orange-500 font-bold mb-1">Sản xuất thật</p>
                <p class="text-gray-400 text-sm">Máy móc, xưởng và đội ngũ trực tiếp vận hành.</p>
              </div>

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-orange-500 font-bold mb-1">Thi công thật</p>
                <p class="text-gray-400 text-sm">Trực tiếp lắp đặt bảng hiệu, công trình quảng cáo.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  `
}