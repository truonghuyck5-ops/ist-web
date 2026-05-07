export function ComboMoQuanHero() {
  return `
    <section class="relative overflow-hidden fade-in">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>

      <div class="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p class="text-orange-500 font-semibold mb-5 tracking-widest">
              COMBO MỞ QUÁN
            </p>

            <h1 class="text-5xl md:text-7xl font-black leading-tight mb-8">
              Bộ nhận diện
              <br>
              cho quán mới
            </h1>

            <p class="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl">
              Giải pháp trọn gói cho cửa hàng, quán ăn, cafe, trà sữa, spa, shop thời trang:
              bảng hiệu, menu, tem nhãn, voucher, decal kính và vật phẩm khai trương.
            </p>

            <div class="flex flex-wrap gap-4">
              <a href="#contact" class="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold text-lg">
                Tư vấn combo
              </a>

              <a href="#combo-items" class="border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition px-8 py-4 rounded-xl font-semibold text-lg">
                Xem hạng mục
              </a>
            </div>
          </div>

          <div class="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="/images/projects/bang-hieu-001.jpg"
              alt="Combo mở quán IST"
              class="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  `
}