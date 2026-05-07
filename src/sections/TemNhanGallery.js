import { temNhanGallery } from '../data/temNhanGallery'

export function TemNhanGallery() {

  return `
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="mb-14">

          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            MẪU THỰC TẾ
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight">
            Một số mẫu tem nhãn
            đã sản xuất tại IST
          </h2>

        </div>

        <div class="grid md:grid-cols-3 gap-6">

          ${temNhanGallery.map((item) => `
            <div class="group overflow-hidden rounded-3xl border border-zinc-800">

              <div class="aspect-square overflow-hidden">

                <img
                  src="${item.image}"
                  alt="Tem nhãn"
                  loading="lazy"
                  data-lightbox
                  class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

            </div>
          `).join('')}

        </div>

      </div>

    </section>
  `
}