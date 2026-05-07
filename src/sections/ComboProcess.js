export function ComboProcess() {
  const steps = [
    {
      number: '01',
      title: 'Tư vấn nhu cầu',
      description:
        'IST tìm hiểu ngành nghề, phong cách quán, ngân sách và các hạng mục cần chuẩn bị trước khai trương.'
    },
    {
      number: '02',
      title: 'Chốt danh sách hạng mục',
      description:
        'Lựa chọn bảng hiệu, menu, tem nhãn, voucher, decal kính, standee hoặc các vật phẩm phù hợp.'
    },
    {
      number: '03',
      title: 'Thiết kế đồng bộ',
      description:
        'Thiết kế theo màu sắc, logo, phong cách thương hiệu để các hạng mục nhìn thống nhất và chuyên nghiệp.'
    },
    {
      number: '04',
      title: 'Sản xuất tại IST',
      description:
        'IST chủ động in ấn, gia công, cắt bế, làm bảng hiệu và chuẩn bị các vật phẩm cần thiết.'
    },
    {
      number: '05',
      title: 'Bàn giao & thi công',
      description:
        'Bàn giao sản phẩm, hỗ trợ lắp đặt bảng hiệu, decal, vật phẩm trưng bày và hoàn thiện trước ngày khai trương.'
    }
  ]

  return `
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-16">
          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            QUY TRÌNH TRIỂN KHAI
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Từ ý tưởng mở quán
            đến bộ nhận diện hoàn chỉnh
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            IST giúp chủ quán đi từng bước rõ ràng, tránh thiếu sót các hạng mục quan trọng trước ngày khai trương.
          </p>
        </div>

        <div class="grid md:grid-cols-5 gap-5">

          ${steps.map((step) => `
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition">

              <div class="text-orange-500 text-4xl font-black mb-6">
                ${step.number}
              </div>

              <h3 class="text-xl font-bold mb-4">
                ${step.title}
              </h3>

              <p class="text-gray-400 leading-relaxed text-sm">
                ${step.description}
              </p>

            </div>
          `).join('')}

        </div>

      </div>

    </section>
  `
}