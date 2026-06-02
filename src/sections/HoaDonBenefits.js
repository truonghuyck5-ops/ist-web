export function HoaDonBenefits() {
  const benefits = [
    {
      title: 'Ghi chép rõ ràng',
      desc: 'Biểu mẫu được trình bày dễ ghi, dễ kiểm tra thông tin bán hàng, giao nhận và thanh toán.',
    },
    {
      title: 'Nhiều khổ thông dụng',
      desc: 'Có A4, A5, A6 phù hợp nhiều nhu cầu từ shop nhỏ, quán ăn đến doanh nghiệp.',
    },
    {
      title: 'Có 1 liên và 2 liên',
      desc: 'Phù hợp nhu cầu lưu nội bộ, giao khách hoặc quản lý đối soát đơn hàng.',
    },
    {
      title: 'Sản xuất tại xưởng',
      desc: 'IST chủ động in, cán răng cưa, đóng cuốn và hoàn thiện thành phẩm tại xưởng.',
    },
  ]

  return `
    <section class="bg-black text-white py-20">
      <div class="max-w-7xl mx-auto px-6">

        <div class="mb-10">
          <p class="text-orange-500 font-semibold tracking-[0.2em] uppercase mb-4">
            Ưu điểm
          </p>

          <h2 class="text-white text-4xl md:text-5xl font-black leading-tight">
            Vì sao nên in hóa đơn
            <br>
            tại IST?
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          ${benefits.map((item) => `
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500/50 transition">
              <h3 class="text-xl font-black text-orange-500 mb-4">
                ${item.title}
              </h3>

              <p class="text-gray-400 leading-relaxed">
                ${item.desc}
              </p>
            </div>
          `).join('')}
        </div>

      </div>
    </section>
  `
}