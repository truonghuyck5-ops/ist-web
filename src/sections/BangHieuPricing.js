import { bangHieuPricing } from '../data/bangHieuPricing'
import { Button } from '../components/Button'

export function BangHieuPricing() {
  return `
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="text-center max-w-3xl mx-auto mb-16">
          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            BÁO GIÁ THAM KHẢO
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Một số mức giá bảng hiệu phổ biến
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            Giá thực tế phụ thuộc kích thước, vật liệu, vị trí lắp đặt,
            kết cấu khung và yêu cầu thi công tại công trình.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">

          ${bangHieuPricing.map((item) => `
            <div class="
              rounded-3xl border p-8 transition duration-300
              ${item.featured
                ? 'border-orange-500 bg-orange-500/5 lg:scale-105'
                : 'border-zinc-800 bg-zinc-900'
              }
            ">

              ${item.featured
                ? `
                  <div class="inline-block bg-orange-500 text-white text-sm px-4 py-1 rounded-full mb-6">
                    Phổ biến
                  </div>
                `
                : ''
              }

              <h3 class="text-3xl font-bold mb-4">
                ${item.title}
              </h3>

              <div class="text-4xl font-black text-orange-500 mb-6">
                ${item.price}
              </div>

              <p class="text-gray-400 leading-relaxed mb-8">
                ${item.description}
              </p>

              <div class="space-y-4 mb-10">
                ${item.features.map((feature) => `
                  <div class="flex items-start gap-3">
                    <span class="text-orange-500">✓</span>
                    <p class="text-gray-300">${feature}</p>
                  </div>
                `).join('')}
              </div>

              ${Button({
                text: 'Tư vấn phương án',

                href: '#contact',

                onclick: `
                    trackEvent('click_pricing', {
                    page: 'bang_hieu',
                    product: '${item.title}'
                    })
                `,

                variant: item.featured ? 'primary' : 'outline'
                })}

            </div>
          `).join('')}

        </div>

        <p class="text-gray-500 text-sm text-center mt-10">
          * Giá trên chỉ mang tính tham khảo. IST sẽ khảo sát hoặc xem hình thực tế để báo giá chính xác.
        </p>

      </div>

    </section>
  `
}