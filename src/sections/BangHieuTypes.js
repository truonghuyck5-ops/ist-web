import { bangHieuTypes } from '../data/bangHieuTypes'

export function BangHieuTypes() {
  return `
    <section id="bang-hieu-types" class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-16">
          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            HẠNG MỤC THI CÔNG
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Các loại bảng hiệu
            IST nhận sản xuất & thi công
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            Tùy vị trí, ngân sách và mục tiêu nhận diện, IST tư vấn giải pháp bảng hiệu phù hợp cho từng cửa hàng, doanh nghiệp và cơ quan.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">

          ${bangHieuTypes.map((item) => `
            <div class="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500 transition duration-300 hover:-translate-y-2">

              <div class="h-72 overflow-hidden">
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