export function TemNhanTypes() {
  const types = [
    {
      title: 'Tem decal giấy',
      desc: 'Phù hợp sản phẩm khô, bao bì giấy, hộp, túi, nhãn dán sử dụng trong môi trường bình thường.',
      note: 'Chi phí tốt',
    },
    {
      title: 'Tem decal nhựa',
      desc: 'Bền hơn decal giấy, phù hợp sản phẩm cần độ dai, hạn chế rách, sử dụng trên chai, hũ, bao bì nhựa.',
      note: 'Bền hơn',
    },
    {
      title: 'Tem decal trong',
      desc: 'Tạo cảm giác tinh tế, hiện đại, phù hợp chai lọ, mỹ phẩm, sản phẩm cần thấy nền bao bì bên dưới.',
      note: 'Tinh tế',
    },
    {
      title: 'Tem cán màng',
      desc: 'Bảo vệ bề mặt tem, hạn chế trầy xước, tăng độ bền màu và giúp tem nhìn đẹp hơn.',
      note: 'Đẹp & bền',
    },
    {
      title: 'Tem bế theo hình',
      desc: 'Cắt theo hình logo, hình tròn, oval, bo góc hoặc hình dạng riêng để tăng nhận diện thương hiệu.',
      note: 'Theo mẫu riêng',
    },
    {
      title: 'Sticker thương hiệu',
      desc: 'Dùng làm sticker tặng kèm, dán hộp, dán túi, dán sản phẩm hoặc trang trí bao bì bán hàng.',
      note: 'Dễ ứng dụng',
    },
  ]

  return `
    <section id="tem-nhan-types" class="border-t border-zinc-900 bg-black fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-12">
          <p class="text-orange-500 font-semibold mb-4 tracking-widest uppercase">
            PHÂN LOẠI TEM NHÃN
          </p>

          <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
            Chọn loại tem phù hợp<br>
            với sản phẩm của bạn
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            Mỗi sản phẩm sẽ phù hợp với một loại tem khác nhau. IST sẽ tư vấn chất liệu,
            kích thước, kiểu bế và phương án in phù hợp với ngân sách thực tế.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          ${types.map((item) => `
            <article class="rounded-3xl border border-zinc-800 bg-zinc-950 p-7 hover:border-orange-500/70 transition">

              <div class="mb-5 inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-500">
                ${item.note}
              </div>

              <h3 class="text-xl font-bold mb-3">
                ${item.title}
              </h3>

              <p class="text-gray-400 leading-relaxed">
                ${item.desc}
              </p>

            </article>
          `).join('')}

        </div>

      </div>

    </section>
  `
}