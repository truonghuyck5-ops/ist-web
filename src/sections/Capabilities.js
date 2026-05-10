import { SectionTitle } from '../components/SectionTitle'

const capabilities = [
  {
    number: '01',
    title: 'Thiết kế & tư vấn',
    desc: 'Tư vấn giải pháp phù hợp theo nhu cầu thực tế của khách hàng. Hỗ trợ thiết kế cơ bản cho in ấn, bảng hiệu, tem nhãn, menu, banner và các ấn phẩm quảng cáo.',
  },
  {
    number: '02',
    title: 'In nhanh & tem nhãn',
    desc: 'Chủ động in tem nhãn, danh thiếp, tag, voucher, thiệp mời, hóa đơn, biểu mẫu và các ấn phẩm giấy với hệ thống máy in nhanh tại xưởng.',
  },
  {
    number: '03',
    title: 'In khổ lớn',
    desc: 'In bạt hiflex, decal, PP, backdrop, banner, standee, poster và vật liệu phục vụ bảng hiệu, sự kiện, khai trương, đại hội, hội nghị.',
  },
  {
    number: '04',
    title: 'CNC - Laser - Gia công',
    desc: 'Gia công mica, alu, fomex, chữ nổi, vật liệu trang trí, chi tiết bảng hiệu và các hạng mục quảng cáo bằng hệ thống CNC, laser tại xưởng.',
  },
  {
    number: '05',
    title: 'Sản xuất bảng hiệu',
    desc: 'Sản xuất khung sắt, mặt bảng, hộp đèn, chữ nổi, bảng hiệu alu, bảng hiệu decal, bảng hiệu công trình và các hạng mục quảng cáo ngoài trời.',
  },
  {
    number: '06',
    title: 'Thi công & bàn giao',
    desc: 'Đội ngũ IST trực tiếp vận chuyển, lắp đặt, thi công và bàn giao công trình cho shop, doanh nghiệp, cơ quan, trường học và tổ chức.',
  },
]

export function Capabilities() {
  return `
    <section id="capabilities" class="border-t border-gray-900 bg-zinc-950 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="grid lg:grid-cols-12 gap-12">

          <div class="lg:col-span-4">
            ${SectionTitle({
              label: 'NĂNG LỰC IST',
              title: 'Chủ động từ thiết kế,<br>sản xuất đến thi công'
            })}

            <p class="text-gray-400 text-lg leading-relaxed mb-8">
              IST không chỉ nhận đơn hàng rồi chuyển gia công bên ngoài. Chúng tôi từng bước xây dựng năng lực sản xuất thật tại xưởng, giúp chủ động hơn về tiến độ, chất lượng và khả năng phục vụ khách hàng.
            </p>

            <a
              href="#projects"
              onclick="
                trackEvent('click_capability_cta', {
                  page: 'home',
                  button: 'xem_cong_trinh_thuc_te'
                })
              "
              class="inline-flex items-center rounded-xl bg-orange-500 px-6 py-4 font-bold text-white hover:bg-orange-600 transition"
            >
              Xem công trình thực tế
            </a>
          </div>

          <div class="lg:col-span-8">
            <div class="grid md:grid-cols-2 gap-5">

              ${capabilities
                .map(
                  (item) => `
                    <article class="group rounded-3xl border border-zinc-800 bg-black p-7 hover:border-orange-500/70 transition">

                      <div class="mb-6 flex items-center justify-between gap-4">
                        <span class="text-4xl font-black text-orange-500/30 group-hover:text-orange-500 transition">
                          ${item.number}
                        </span>

                        <span class="h-px flex-1 bg-zinc-800 group-hover:bg-orange-500/50 transition"></span>
                      </div>

                      <h3 class="text-xl font-bold mb-4">
                        ${item.title}
                      </h3>

                      <p class="text-gray-400 leading-relaxed">
                        ${item.desc}
                      </p>

                    </article>
                  `
                )
                .join('')}

            </div>
          </div>

        </div>

      </div>

    </section>
  `
}