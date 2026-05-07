export function BangHieuFAQ() {
  const faqs = [
    {
      question: 'Làm bảng hiệu cần cung cấp thông tin gì?',
      answer:
        'Khách hàng nên cung cấp kích thước dự kiến, vị trí lắp đặt, hình ảnh mặt tiền, mẫu tham khảo và ngân sách mong muốn để IST tư vấn phương án phù hợp.'
    },
    {
      question: 'IST có khảo sát công trình không?',
      answer:
        'Có. Với các công trình cần thi công thực tế, IST có thể khảo sát vị trí, đo đạc và đánh giá kết cấu để báo giá chính xác hơn.'
    },
    {
      question: 'Bảng hiệu alu, hiflex và hộp đèn khác nhau thế nào?',
      answer:
        'Hiflex phù hợp nhu cầu tiết kiệm hoặc ngắn hạn. Alu và tol dán decal phù hợp mặt tiền shop cần hình ảnh đẹp. Hộp đèn giúp bảng hiệu nổi bật vào ban đêm.'
    },
    {
      question: 'Thời gian thi công bảng hiệu mất bao lâu?',
      answer:
        'Tùy kích thước và độ phức tạp, thông thường IST cần vài ngày để thiết kế, sản xuất và sắp xếp thi công. Công trình lớn sẽ có tiến độ riêng.'
    },
    {
      question: 'IST có hỗ trợ thiết kế bảng hiệu không?',
      answer:
        'Có. IST hỗ trợ thiết kế bảng hiệu theo ngành nghề, mặt tiền thực tế và phong cách thương hiệu của khách hàng.'
    },
    {
      question: 'Báo giá bảng hiệu phụ thuộc vào yếu tố nào?',
      answer:
        'Giá phụ thuộc vào kích thước, vật liệu, kết cấu khung, độ cao thi công, vị trí lắp đặt, đèn LED, chữ nổi và yêu cầu hoàn thiện.'
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
            Những điều khách thường hỏi
            trước khi làm bảng hiệu
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