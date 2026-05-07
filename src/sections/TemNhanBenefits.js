export function TemNhanBenefits() {

  const benefits = [
    'In số lượng ít đến lớn',
    'Sản xuất nhanh tại xưởng',
    'Màu sắc sắc nét',
    'Hỗ trợ thiết kế',
    'Nhiều chất liệu decal',
    'Giá tốt cho shop & doanh nghiệp'
  ]

  return `
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-16">

          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            LỢI ÍCH
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Tem nhãn đẹp giúp
            sản phẩm chuyên nghiệp hơn
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            Tem nhãn không chỉ để dán sản phẩm,
            mà còn giúp thương hiệu nổi bật,
            tăng độ tin cậy và chuyên nghiệp.
          </p>

        </div>

        <div class="grid md:grid-cols-3 gap-6">

          ${benefits.map((item) => `
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-orange-500 transition duration-300">

              <div class="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl mb-6">
                ✓
              </div>

              <h3 class="text-xl font-bold leading-relaxed">
                ${item}
              </h3>

            </div>
          `).join('')}

        </div>

      </div>

    </section>
  `
}