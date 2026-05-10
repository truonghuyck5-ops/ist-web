export function Footer() {
  const currentYear = new Date().getFullYear()

  return `
    <footer class="border-t border-gray-900 bg-black">

      <div class="max-w-7xl mx-auto px-6 py-16">

        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <!-- Company Info -->
          <div>
            <a
              href="#hero"
              onclick="
                trackEvent('click_footer', {
                  page: 'home',
                  button: 'logo_footer'
                })
              "
              class="inline-flex items-center gap-4 mb-6"
            >
              <img
                src="/images/logo-ist.png"
                alt="Logo IST - In Sáng Tạo"
                class="h-14 w-auto"
              />

              <div>
                <p class="text-2xl font-black text-orange-500 leading-none">
                  IN SÁNG TẠO
                </p>
                <p class="text-gray-400 text-sm mt-1">
                  Thiết kế - In ấn - Quảng cáo
                </p>
              </div>
            </a>

            <p class="text-gray-400 leading-relaxed mb-6">
              <B>Công ty TNHH MTV Quảng Cáo In Sáng Tạo</B> cung cấp giải pháp thiết kế,
              in ấn, sản xuất và thi công bảng hiệu quảng cáo cho cửa hàng,
              doanh nghiệp, cơ quan và tổ chức.
            </p>

            <div class="flex flex-wrap gap-3">
              <span class="rounded-full border border-zinc-800 px-4 py-2 text-xs text-gray-400">
                In ấn
              </span>
              <span class="rounded-full border border-zinc-800 px-4 py-2 text-xs text-gray-400">
                Tem nhãn
              </span>
              <span class="rounded-full border border-zinc-800 px-4 py-2 text-xs text-gray-400">
                Bảng hiệu
              </span>
            </div>
          </div>

          <!-- Services -->
          <div>
            <h3 class="text-lg font-bold text-white mb-6">
              Dịch vụ chính
            </h3>

            <ul class="space-y-4 text-gray-400">
              <li>
                <a
                  href="/tem-nhan.html"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'tem_nhan'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  In tem nhãn
                </a>
              </li>

              <li>
                <a
                  href="/bang-hieu.html"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'bang_hieu'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Thi công bảng hiệu
                </a>
              </li>

              <li>
                <a
                  href="/combo-mo-quan.html"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'combo_mo_quan'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Combo mở quán
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'in_bat_decal'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  In bạt - decal - standee
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'hoa_don_bieu_mau'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  In hóa đơn - biểu mẫu
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'in_tui_xop'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  In túi xốp
                </a>
              </li>
            </ul>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold text-white mb-6">
              Liên kết nhanh
            </h3>

            <ul class="space-y-4 text-gray-400">
              <li>
                <a
                  href="/#about"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 've_ist'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Về In Sáng Tạo
                </a>
              </li>

              <li>
                <a
                  href="/#capabilities"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'nang_luc'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Năng lực IST
                </a>
              </li>

              <li>
                <a
                  href="/#factory"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'nha_xuong_may_moc'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Nhà xưởng & máy móc
                </a>
              </li>

              <li>
                <a
                  href="/#products"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'san_pham'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Sản phẩm & dịch vụ
                </a>
              </li>

              <li>
                <a
                  href="/#projects"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'cong_trinh'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Công trình tiêu biểu
                </a>
              </li>

              <li>
                <a
                  href="/blog/"
                  onclick="
                    trackEvent('click_footer', {
                      page: 'home',
                      link: 'blog'
                    })
                  "
                  class="hover:text-orange-500 transition"
                >
                  Blog tư vấn
                </a>
              </li>
            </ul>
          </div>

        <!-- Contact -->
        <div>
        <h3 class="text-lg font-bold text-white mb-6">
            Liên hệ In Sáng Tạo
        </h3>

        <div class="space-y-4">

            <a
            href="https://share.google/amP6wZmKCmUaGO1JT"
            target="_blank"
            rel="noopener noreferrer"
            onclick="
                trackEvent('click_footer', {
                page: 'home',
                link: 'google_maps_footer'
                })
            "
            class="flex gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/60 p-4 hover:border-orange-500/60 transition"
            >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
            </div>

            <div>
                <p class="text-sm leading-relaxed text-gray-400">
                12 Trần Thành Đại, ấp Mỹ Cẩm A, xã Cầu Ngang, tỉnh Vĩnh Long
                </p>
                <p class="mt-1 text-xs font-semibold text-orange-500">
                Xem trên Google Maps →
                </p>
            </div>
            </a>

            <a
            href="tel:0974313230"
            onclick="
                trackEvent('click_footer', {
                page: 'home',
                link: 'call_footer'
                })
            "
            class="flex gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/60 p-4 hover:border-orange-500/60 transition"
            >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h2A1.5 1.5 0 0 1 9 4.3l.6 3A1.5 1.5 0 0 1 8.8 9L7.5 9.7a12.5 12.5 0 0 0 6.8 6.8l.7-1.3a1.5 1.5 0 0 1 1.7-.8l3 .6A1.5 1.5 0 0 1 21 16.5v2A2.5 2.5 0 0 1 18.5 21h-.5C9.7 21 3 14.3 3 6v-.5z" />
                </svg>
            </div>

            <div>
                <p class="text-sm font-semibold text-white mb-1">
                Hotline / Zalo
                </p>
                <p class="text-sm font-bold text-orange-500">
                0974 31 32 30
                </p>
            </div>
            </a>

            <a
            href="mailto:quangcao.insangtao@gmail.com"
            onclick="
                trackEvent('click_footer', {
                page: 'home',
                link: 'email_footer'
                })
            "
            class="flex gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/60 p-4 hover:border-orange-500/60 transition"
            >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16v12H4z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m4 7 8 6 8-6" />
                </svg>
            </div>

            <div>

                <p class="text-sm leading-relaxed text-gray-400 break-all">
                quangcao.insangtao@gmail.com
                </p>
            </div>
            </a>

        </div>
        </div>  
         </div>  

<!-- Bottom -->
<div class="mt-14 border-t border-zinc-900 pt-8">

  <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

    <p class="text-gray-500 text-sm leading-relaxed">
      © ${currentYear} Công ty TNHH MTV Quảng Cáo In Sáng Tạo. All rights reserved.
    </p>

    <p class="text-gray-500 text-sm leading-relaxed">
      Thiết kế - In ấn - Bảng hiệu quảng cáo tại Cầu Ngang, Vĩnh Long
    </p>

  </div>

</div>

      </div>

    </footer>
  `
}