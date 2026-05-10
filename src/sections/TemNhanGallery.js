import { temNhanGallery } from '../data/temNhanGallery'

export function TemNhanGallery() {
  return `
    <section id="tem-nhan-gallery" class="border-t border-zinc-900 bg-black fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-14">

          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            MẪU TEM NHÃN THỰC TẾ
          </p>

          <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
            Một số mẫu tem nhãn<br>
            IST có thể sản xuất
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            IST nhận in tem nhãn decal cho shop, cơ sở sản xuất, sản phẩm handmade,
            mỹ phẩm, thực phẩm, nông sản và nhiều nhóm hàng kinh doanh khác.
          </p>

        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          ${temNhanGallery.map((item) => `
            <article class="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 hover:border-orange-500/70 transition">

              <div class="aspect-square overflow-hidden">
                <img
                  src="${item.image}"
                  alt="${item.title}"
                  loading="lazy"
                  data-lightbox="${item.image}"
                  data-caption="${item.title}"
                  decoding="async"
                  class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div class="p-6">
                <h3 class="text-xl font-bold mb-3">
                  ${item.title}
                </h3>

                <p class="text-gray-400 leading-relaxed">
                  ${item.desc}
                </p>
              </div>

            </article>
          `).join('')}

        </div>

      </div>

    </section>
  `
}