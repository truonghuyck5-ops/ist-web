import { Button } from '../components/Button'

export function TemNhanHero() {
  return `
    <section id="tem-nhan-hero" class="relative overflow-hidden fade-in">

      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>
      <div class="absolute bottom-0 left-0 w-[320px] h-[320px] bg-orange-500/10 blur-3xl rounded-full"></div>

      <div class="max-w-7xl mx-auto px-6 py-24 md:py-28 relative z-10">

        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p class="text-orange-500 font-semibold mb-5 tracking-widest uppercase">
              IN TEM NHÃN - STICKER - DECAL
            </p>

            <h1 class="text-5xl md:text-7xl font-black leading-tight mb-8">
              In tem nhãn
              <br>
              cho sản phẩm
            </h1>

            <p class="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl">
              IST nhận in tem nhãn decal giấy, decal nhựa, sticker thương hiệu,
              tem sản phẩm và tem dán bao bì. Phù hợp shop, cơ sở sản xuất,
              thương hiệu nhỏ và khách cần in nhanh số lượng ít đến lớn.
            </p>

            <div class="flex flex-wrap gap-4">

              ${Button({
                text: 'Nhận báo giá tem nhãn',
                href: '#contact',
                onclick: `
                  trackEvent('click_cta', {
                    page: 'tem_nhan',
                    button: 'nhan_bao_gia_tem_nhan'
                  })
                `,
                variant: 'primary'
              })}

              ${Button({
                text: 'Xem mẫu thực tế',
                href: '#tem-nhan-gallery',
                onclick: `
                  trackEvent('click_cta', {
                    page: 'tem_nhan',
                    button: 'xem_mau_thuc_te'
                  })
                `,
                variant: 'outline'
              })}

            </div>

            <div class="grid grid-cols-2 gap-5 mt-14">

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 class="text-3xl font-bold text-orange-500 mb-3">
                  Ít vẫn in
                </h3>

                <p class="text-gray-400">
                  Phù hợp shop mới, sản phẩm test mẫu, đơn hàng nhỏ.
                </p>
              </div>

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 class="text-3xl font-bold text-orange-500 mb-3">
                  Nhiều giá tốt
                </h3>

                <p class="text-gray-400">
                  Tối ưu chi phí cho khách đặt định kỳ, số lượng lớn.
                </p>
              </div>

            </div>

          </div>

          <div>

            <div class="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl h-[360px] md:h-[480px]">
              <img
                src="/images/projects/tem-nhan-001.jpg"
                alt="In tem nhãn sản phẩm tại IST"
                data-lightbox="/images/projects/tem-nhan-001.jpg"
                data-caption="In tem nhãn sản phẩm tại IST"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-orange-500 font-bold mb-1">
                  Bế theo mẫu
                </p>
                <p class="text-gray-400 text-sm">
                  Cắt bế tem tròn, vuông, oval hoặc theo hình dạng riêng.
                </p>
              </div>

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p class="text-orange-500 font-bold mb-1">
                  Hỗ trợ thiết kế
                </p>
                <p class="text-gray-400 text-sm">
                  Tư vấn bố cục tem nhãn phù hợp sản phẩm và bao bì.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  `
}