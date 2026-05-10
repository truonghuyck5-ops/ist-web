import { SectionTitle } from '../components/SectionTitle'

const machineGroups = [
  {
    title: 'In nhanh & tem nhãn',
    desc: 'Máy in nhanh Konica C2060L, máy bế tem nhãn tự động Saga, máy photo màu hỗ trợ sản xuất tem nhãn, card, tag, voucher, thiệp mời và ấn phẩm giấy.',
    items: ['Konica C2060L', 'Máy bế Saga', 'Máy photo màu', 'Máy cắt giấy'],
  },
  {
    title: 'In khổ lớn',
    desc: 'Hệ thống máy in bạt, máy in decal và máy cán màng giúp IST chủ động sản xuất banner, backdrop, decal, PP, vật liệu phục vụ bảng hiệu và sự kiện.',
    items: ['Máy in bạt 3m2', 'Máy in decal 1m6', 'Máy cán màng 1m6', 'In PP - decal - hiflex'],
  },
  {
    title: 'CNC - Laser - Gia công',
    desc: 'Máy CNC và laser hỗ trợ gia công mica, alu, fomex, chữ nổi, chi tiết trang trí và các hạng mục phục vụ bảng hiệu quảng cáo.',
    items: ['CNC 130x250', 'Laser 130x90', 'Laser 60x40', 'Gia công mica - alu - fomex'],
  },
  {
    title: 'Sản xuất & thi công',
    desc: 'Khu sản xuất bảng hiệu được trang bị máy hàn, máy cắt, dụng cụ cơ khí, xe tải phục vụ vận chuyển và thi công thực tế tại công trình.',
    items: ['Máy hàn - máy cắt', 'Dụng cụ thi công', 'Xe tải giao hàng', 'Đội thi công trực tiếp'],
  },
]

export function ProductionCapacity() {
  return `
    <section id="factory" class="border-t border-gray-900 bg-black fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            ${SectionTitle({
              label: 'NHÀ XƯỞNG & MÁY MÓC',
              title: 'Nền tảng sản xuất<br>giúp IST chủ động tiến độ'
            })}

            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              IST đầu tư nhà xưởng, máy móc và phân khu sản xuất để phục vụ đồng bộ
              từ in ấn, tem nhãn, in khổ lớn, CNC, laser đến sản xuất và thi công bảng hiệu.
              Đây là nền tảng giúp IST chủ động hơn về tiến độ, chất lượng và khả năng xử lý đơn hàng thực tế.
            </p>

            <div class="grid sm:grid-cols-2 gap-4">

              ${machineGroups
                .map(
                  (group) => `
                    <article class="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:border-orange-500/70 transition">

                      <h3 class="text-lg font-bold text-white mb-3">
                        ${group.title}
                      </h3>

                      <p class="text-gray-400 text-sm leading-relaxed mb-5">
                        ${group.desc}
                      </p>

                      <div class="space-y-2">
                        ${group.items
                          .map(
                            (item) => `
                              <div class="flex items-start gap-2 text-sm text-gray-300">
                                <span class="text-orange-500 font-bold">✓</span>
                                <span>${item}</span>
                              </div>
                            `
                          )
                          .join('')}
                      </div>

                    </article>
                  `
                )
                .join('')}

            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">

            <img
                src="/images/home/may-in-nhanh-konica.webp"
                alt="Máy in nhanh Konica tại IST"
                data-lightbox="/images/home/may-in-nhanh-konica.webp"
                data-caption="Máy in nhanh Konica C2060L tại xưởng IST"
                class="rounded-3xl border border-zinc-800 h-44 md:h-48 w-full object-cover"
            />

            <img
                src="/images/home/may-in-bat-kho-lon.webp"
                alt="Máy in bạt khổ lớn tại IST"
                data-lightbox="/images/home/may-in-bat-kho-lon.webp"
                data-caption="Máy in bạt khổ lớn phục vụ banner, backdrop và bảng hiệu"
                class="rounded-3xl border border-zinc-800 h-44 md:h-48 w-full object-cover mt-8"
            />

            <img
                src="/images/home/may-cnc-laser-ist.webp"
                alt="Máy CNC và laser tại IST"
                data-lightbox="/images/home/may-cnc-laser-ist.webp"
                data-caption="Hệ thống CNC và laser phục vụ gia công bảng hiệu, mica, alu, fomex"
                class="rounded-3xl border border-zinc-800 h-52 md:h-60 w-full object-cover col-span-2"
            />

            <img
                src="/images/home/san-xuat-hoa-don.webp"
                alt="Khu vực sản xuất hóa đơn, biểu mẩu"
                data-lightbox="/images/home/san-xuat-hoa-don.webp"
                data-caption="Khu vực sản xuất hóa đơn, biểu mẩu"
                class="rounded-3xl border border-zinc-800 h-44 md:h-48 w-full object-cover"
            />

            <img
                src="/images/home/khu-san-xuat-thi-cong-ist.webp"
                alt="Khu sản xuất và thi công bảng hiệu IST"
                data-lightbox="/images/home/khu-san-xuat-thi-cong-ist.webp"
                data-caption="Khu sản xuất, gia công và thi công bảng hiệu tại IST"
                class="rounded-3xl border border-zinc-800 h-44 md:h-48 w-full object-cover mt-8"
            />

        </div>

        </div>

      </div>

    </section>
  `
}