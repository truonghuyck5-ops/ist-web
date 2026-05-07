import { Button } from '../components/Button'

export function TemNhanHero() {

  return `
    <section class="relative overflow-hidden fade-in">

      <!-- Glow -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>

      <div class="max-w-7xl mx-auto px-6 py-24 relative z-10">

        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <!-- Left -->
          <div>

            <p class="text-orange-500 font-semibold mb-5 tracking-widest">
              TEM NHÃN - STICKER
            </p>

            <h1 class="text-5xl md:text-7xl font-black leading-tight mb-8">
              In tem nhãn
              <br>
              chuyên nghiệp
            </h1>

            <p class="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl">
              Tem nhãn sản phẩm, sticker thương hiệu,
              decal dán bao bì với chất lượng sắc nét,
              sản xuất nhanh và giá tốt.
            </p>

            <div class="flex flex-wrap gap-4">

              ${Button({
                text: 'Nhận báo giá',
                variant: 'primary'
              })}

              ${Button({
                text: 'Xem mẫu thực tế',
                variant: 'outline'
              })}

            </div>

            <!-- Features -->
            <div class="grid grid-cols-2 gap-6 mt-16">

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                <h3 class="text-3xl font-bold text-orange-500 mb-3">
                  24h
                </h3>

                <p class="text-gray-400">
                  Hỗ trợ sản xuất nhanh
                </p>

              </div>

              <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                <h3 class="text-3xl font-bold text-orange-500 mb-3">
                  100+
                </h3>

                <p class="text-gray-400">
                  Mẫu tem đa dạng
                </p>

              </div>

            </div>

          </div>

          <!-- Right -->
          <div>

            <div class="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">

              <img
                src="/images/projects/tem-nhan-001.jpg"
                alt="Tem nhãn"
                class="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  `
}