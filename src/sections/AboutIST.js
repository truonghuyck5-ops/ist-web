import { SectionTitle } from '../components/SectionTitle'

export function AboutIST() {
  return `
    <section id="about" class="border-t border-gray-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            ${SectionTitle({
              label: 'VỀ IN SÁNG TẠO',
              title: 'Từ một xưởng in nhỏ<br>đến hệ thống sản xuất quảng cáo'
            })}

            <p class="text-gray-300 text-lg leading-relaxed mb-6">
              IST khởi đầu từ năm 2016 với các sản phẩm dịch vụ in ấn nhỏ lẻ,
              sau đó từng bước mở rộng sang in nhanh, tem nhãn, hóa đơn,
              in khổ lớn và thi công bảng hiệu quảng cáo.
            </p>

            <p class="text-gray-400 leading-relaxed mb-6">
              Năm 2022, Công ty TNHH MTV Quảng Cáo In Sáng Tạo chính thức được thành lập,
              định hướng phát triển bền vững, chuyên nghiệp hơn và phục vụ đa dạng nhóm khách hàng:
              cá nhân, shop, doanh nghiệp, cơ quan, trường học và tổ chức.
            </p>

            <p class="text-gray-400 leading-relaxed">
              Đến nay, IST tập trung xây dựng hệ thống vận hành bài bản,
              chủ động sản xuất tại xưởng, nâng cao chất lượng tư vấn,
              thiết kế, in ấn và thi công thực tế.
            </p>
          </div>
          

          <div class="grid grid-cols-2 gap-4">

            <img
                src="/images/home/home-teamist-002.webp"
                alt="Đội ngũ nhân sự IST"
                data-lightbox="/images/home/home-teamist-002.webp"
                data-caption="Đội ngũ nhân sự IST"
                class="rounded-3xl border border-zinc-800 h-56 w-full object-cover"
            />

            <img
                src="/images/home/home-thi-cong-001.webp"
                alt="Đội ngũ IST thi công bảng hiệu"
                data-lightbox="/images/home/home-thi-cong-001.webp"
                data-caption="Đội ngũ IST thi công bảng hiệu thực tế"
                class="rounded-3xl border border-zinc-800 h-56 w-full object-cover mt-10"
            />

            <img
                src="/images/home/home-hero-02.webp"
                alt="Hành trình phát triển của In Sáng Tạo"
                data-lightbox="/images/home/home-hero-02.webp"
                data-caption="Hành trình phát triển của In Sáng Tạo từ xưởng nhỏ đến hệ thống sản xuất quảng cáo"
                class="rounded-3xl border border-zinc-800 h-56 w-full object-cover col-span-2"
            />

            </div>

        </div>

      </div>

    </section>
  `
}