export function CTA() {
  return `
    <section id="contact" class="border-t border-gray-900 bg-zinc-950 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-black p-8 md:p-12">

          <div class="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"></div>

          <div class="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

            <div>
              <p class="text-orange-500 font-semibold mb-5 tracking-widest uppercase">
                LIÊN HỆ TƯ VẤN
              </p>

              <h2 class="text-3xl md:text-5xl font-black leading-tight mb-6">
                Cần in ấn, làm bảng hiệu<br>
                hoặc tư vấn quảng cáo?
              </h2>

              <p class="text-gray-400 text-lg leading-relaxed max-w-2xl">
                Gửi hình mẫu, kích thước, logo hoặc nhu cầu thực tế của bạn.
                IST sẽ tư vấn phương án phù hợp và báo giá nhanh qua Zalo hoặc điện thoại.
              </p>

              <div class="grid sm:grid-cols-3 gap-4 mt-8">

                <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <p class="text-orange-500 font-bold mb-2">
                    01
                  </p>
                  <p class="text-gray-300 text-sm">
                    Gửi hình mẫu hoặc ý tưởng
                  </p>
                </div>

                <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <p class="text-orange-500 font-bold mb-2">
                    02
                  </p>
                  <p class="text-gray-300 text-sm">
                    Cung cấp kích thước, số lượng
                  </p>
                </div>

                <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <p class="text-orange-500 font-bold mb-2">
                    03
                  </p>
                  <p class="text-gray-300 text-sm">
                    IST tư vấn & báo giá phù hợp
                  </p>
                </div>

              </div>
            </div>

            <div class="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 md:p-8">

              <h3 class="text-2xl font-bold mb-4">
                Nhận tư vấn nhanh
              </h3>

              <p class="text-gray-400 leading-relaxed mb-8">
                Phù hợp cho khách cần báo giá bảng hiệu, tem nhãn, in bạt, decal,
                hóa đơn, túi xốp, combo mở quán hoặc công trình quảng cáo.
              </p>

              <div class="space-y-4">

                <a
                  href="https://zalo.me/0974313230"
                  target="_blank"
                  onclick="
                    trackEvent('click_contact', {
                      page: 'home',
                      button: 'zalo_cta_bottom'
                    })
                  "
                  class="flex items-center justify-center rounded-xl bg-orange-500 px-6 py-4 font-bold text-white hover:bg-orange-600 transition"
                >
                  Nhắn Zalo báo giá
                </a>

                <a
                  href="tel:0974313230"
                  onclick="
                    trackEvent('click_contact', {
                      page: 'home',
                      button: 'call_cta_bottom'
                    })
                  "
                  class="flex items-center justify-center rounded-xl border border-zinc-700 px-6 py-4 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
                >
                  Gọi 0974 31 32 30
                </a>

              </div>

              <div class="mt-8 border-t border-zinc-800 pt-6 text-sm text-gray-400 space-y-2">
                <p>
                  <span class="text-white font-semibold">Công ty:</span>
                  TNHH MTV Quảng Cáo In Sáng Tạo
                </p>
                <p>
                  <span class="text-white font-semibold">Khu vực phục vụ:</span>
                  Cầu Ngang, Trà Vinh, Vĩnh Long và khu vực lân cận
                </p>
                <p>
                  <span class="text-white font-semibold">Dịch vụ:</span>
                  Thiết kế - In ấn - Bảng hiệu quảng cáo
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  `
}