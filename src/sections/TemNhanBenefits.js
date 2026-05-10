export function TemNhanBenefits() {
  const benefits = [
    {
      title: 'In số lượng ít vẫn nhận',
      desc: 'Phù hợp shop mới, sản phẩm test mẫu, khách cần in nhanh số lượng nhỏ trước khi sản xuất nhiều.',
    },
    {
      title: 'Số lượng nhiều giá tốt hơn',
      desc: 'Khách đặt định kỳ hoặc in số lượng lớn sẽ được tư vấn quy cách tối ưu để giảm chi phí trên từng tem.',
    },
    {
      title: 'Hỗ trợ thiết kế cơ bản',
      desc: 'IST hỗ trợ chỉnh file, bố cục thông tin, logo, mã QR, thành phần, hướng dẫn sử dụng và thông tin liên hệ.',
    },
    {
      title: 'Có thể bế theo hình',
      desc: 'Tem có thể cắt bế tròn, vuông, bo góc, oval hoặc theo hình dạng riêng phù hợp với logo và bao bì.',
    },
    {
      title: 'Nhiều chất liệu decal',
      desc: 'Tư vấn decal giấy, decal nhựa, decal trong, decal sữa hoặc cán màng tùy theo nhu cầu sử dụng.',
    },
    {
      title: 'Sản xuất chủ động tại IST',
      desc: 'IST chủ động máy in nhanh và máy bế tem nhãn, giúp xử lý đơn hàng linh hoạt, nhanh và dễ kiểm soát chất lượng.',
    },
  ]

  return `
    <section id="tem-nhan-benefits" class="border-t border-zinc-900 bg-zinc-950 fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="grid lg:grid-cols-12 gap-12">

          <div class="lg:col-span-4">
            <p class="text-orange-500 font-semibold mb-4 tracking-widest uppercase">
              VÌ SAO CHỌN IN SÁNG TẠO?
            </p>

            <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
              In tem nhãn nhanh,<br>
              đúng nhu cầu sử dụng
            </h2>

            <p class="text-gray-400 text-lg leading-relaxed">
              Tem nhãn không chỉ để dán lên sản phẩm. Một mẫu tem rõ ràng, đẹp và đúng chất liệu
              giúp sản phẩm chuyên nghiệp hơn, dễ bán hơn và tạo niềm tin với khách hàng.
            </p>

            <a
              href="#contact"
              onclick="
                trackEvent('click_tem_nhan_benefits', {
                  page: 'tem_nhan',
                  button: 'tu_van_chat_lieu_tem'
                })
              "
              class="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-4 font-bold text-white hover:bg-orange-600 transition"
            >
              Tư vấn chất liệu tem
            </a>
          </div>

          <div class="lg:col-span-8">
            <div class="grid md:grid-cols-2 gap-5">

              ${benefits.map((item, index) => `
                <article class="group rounded-3xl border border-zinc-800 bg-black p-7 hover:border-orange-500/70 transition">

                  <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 font-black">
                    ${String(index + 1).padStart(2, '0')}
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

        </div>

      </div>

    </section>
  `
}