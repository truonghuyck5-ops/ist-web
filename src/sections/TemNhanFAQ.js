export function TemNhanFAQ() {
  const faqs = [
    {
      question: 'IST có nhận in tem nhãn số lượng ít không?',
      answer:
        'Có. IST nhận in tem nhãn từ số lượng ít đến số lượng lớn, phù hợp cho shop mới mở, sản phẩm thử nghiệm và doanh nghiệp cần in nhanh.'
    },
    {
      question: 'Thời gian sản xuất tem nhãn mất bao lâu?',
      answer:
        'Tùy số lượng và chất liệu, đơn hàng thông thường có thể hoàn thành nhanh trong 1–3 ngày. Một số đơn gấp có thể được ưu tiên xử lý theo lịch sản xuất.'
    },
    {
      question: 'IST có hỗ trợ thiết kế tem nhãn không?',
      answer:
        'Có. IST hỗ trợ thiết kế cơ bản cho khách in tem nhãn. Với các yêu cầu nhận diện thương hiệu chuyên sâu, IST sẽ tư vấn phương án riêng.'
    },
    {
      question: 'Có những loại decal nào?',
      answer:
        'IST có thể tư vấn nhiều loại decal như decal giấy, decal nhựa, decal trong, decal kraft, decal xi bạc, tem bể và các chất liệu phù hợp theo nhu cầu sử dụng.'
    },
    {
      question: 'Giá tem nhãn phụ thuộc vào yếu tố nào?',
      answer:
        'Giá phụ thuộc vào kích thước, số lượng, chất liệu decal, cán màng, hình dạng tem và yêu cầu gia công thêm như bế demi, ép kim hoặc dữ liệu biến đổi.'
    }
  ]

  return `
    <section class="border-t border-zinc-900 fade-in">

      <div class="max-w-5xl mx-auto px-6 py-24">

        <div class="text-center mb-16">

          <p class="text-orange-500 font-semibold mb-4 tracking-wide">
            CÂU HỎI THƯỜNG GẶP
          </p>

          <h2 class="text-4xl md:text-5xl font-bold leading-tight">
            Những điều khách hàng thường hỏi
          </h2>

        </div>

        <div class="space-y-5">

          ${faqs.map((faq) => `
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500 transition">

              <h3 class="text-xl font-bold mb-3">
                ${faq.question}
              </h3>

              <p class="text-gray-400 leading-relaxed">
                ${faq.answer}
              </p>

            </div>
          `).join('')}

        </div>

      </div>

    </section>
  `
}