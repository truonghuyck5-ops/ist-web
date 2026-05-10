import { SectionTitle } from '../components/SectionTitle'
import { homeServices } from '../data/homeServices'

export function Products() {
  return `
    <section id="products" class="border-t border-gray-900 bg-zinc-950 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-12">
          ${SectionTitle({
            label: 'SẢN PHẨM & DỊCH VỤ',
            title: 'Nhóm dịch vụ chủ lực<br>IST đang cung cấp'
          })}

          <p class="text-gray-400 text-lg leading-relaxed">
            IST cung cấp giải pháp thiết kế, in ấn, sản xuất và thi công quảng cáo
            cho nhiều nhóm khách hàng: shop, hộ kinh doanh, doanh nghiệp, cơ quan,
            trường học và đơn vị tổ chức sự kiện.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          ${homeServices
            .map(
              (service) => `
                <article class="group overflow-hidden rounded-3xl border border-zinc-800 bg-black hover:border-orange-500/70 transition">

                  <div class="relative overflow-hidden">
                    <img
                      src="${service.image}"
                      alt="${service.title}"
                      data-lightbox="${service.image}"
                      data-caption="${service.title} - Dịch vụ tại IST"
                      class="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div class="absolute left-4 top-4 rounded-full ${
                      service.status === 'active'
                        ? 'bg-orange-500 text-white'
                        : 'bg-zinc-800 text-gray-300'
                    } px-4 py-2 text-xs font-bold">
                      ${service.tag}
                    </div>
                  </div>

                  <div class="p-6">

                    <h3 class="text-xl font-bold mb-3">
                      ${service.title}
                    </h3>

                    <p class="text-gray-400 leading-relaxed mb-6">
                      ${service.desc}
                    </p>

                    <a
                      href="${service.href}"
                      onclick="
                        trackEvent('click_service_card', {
                          service: '${service.title}',
                          page: 'home'
                        })
                      "
                      class="inline-flex items-center font-bold text-orange-500 hover:text-orange-400 transition"
                    >
                      ${
                        service.status === 'active'
                          ? 'Xem chi tiết →'
                          : 'Tư vấn báo giá →'
                      }
                    </a>

                  </div>

                </article>
              `
            )
            .join('')}

        </div>

      </div>

    </section>
  `
}