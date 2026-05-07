export function BangHieuProcess() {
  const steps = [
    {
      number: '01',
      title: 'Tiếp nhận nhu cầu',
      description:
        'IST ghi nhận vị trí lắp đặt, kích thước, hình ảnh mẫu, ngân sách và mục tiêu sử dụng của khách hàng.'
    },
    {
      number: '02',
      title: 'Tư vấn giải pháp',
      description:
        'Đề xuất vật liệu phù hợp như alu, mica, hiflex, hộp đèn, chữ nổi hoặc phương án kết hợp.'
    },
    {
      number: '03',
      title: 'Thiết kế & báo giá',
      description:
        'Lên phương án thiết kế, bóc tách hạng mục và báo giá rõ ràng trước khi sản xuất.'
    },
    {
      number: '04',
      title: 'Sản xuất tại xưởng',
      description:
        'Gia công khung sắt, in ấn, cắt CNC, laser, mica, alu và chuẩn bị vật tư thi công.'
    },
    {
      number: '05',
      title: 'Thi công lắp đặt',
      description:
        'Đội thi công IST lắp đặt tại công trình, kiểm tra độ chắc chắn, thẩm mỹ và hoàn thiện.'
    }
  ]

  return `
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="max-w-3xl mb-16">
          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            QUY TRÌNH LÀM VIỆC
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Từ tư vấn đến thi công
            đều được kiểm soát rõ ràng
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            IST chủ động từ thiết kế, sản xuất đến thi công giúp khách hàng dễ theo dõi tiến độ và kiểm soát chất lượng.
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