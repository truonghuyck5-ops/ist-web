import { comboItems } from '../data/comboItems'

export function ComboItems() {
  return `
    <section id="combo-items" class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-16">
          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            HẠNG MỤC TRONG COMBO
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Một bộ nhận diện cơ bản
            cho quán mới
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            IST giúp chủ quán chuẩn bị các hạng mục thiết yếu để khai trương chuyên nghiệp, đồng bộ và dễ bán hàng hơn.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">

          ${comboItems.map((item) => `
            <div class="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500 transition duration-300 hover:-translate-y-2">

              <div class="h-56 overflow-hidden">
                <img
                  src="${item.image}"
                  alt="${item.title}"
                  loading="lazy"
                    data-lightbox
                  class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div class="p-8">
                <h3 class="text-2xl font-bold mb-4">
                  ${item.title}
                </h3>

                <p class="text-gray-400 leading-relaxed">
                  ${item.description}
                </p>
              </div>

            </div>
          `).join('')}

        </div>

      </div>

    </section>
  `
}