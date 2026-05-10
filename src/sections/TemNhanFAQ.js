export function TemNhanFAQ() {
  const faqs = [
    {
      question: 'IST có nhận in tem nhãn số lượng ít không?',
      answer:
        'Có. IST nhận in tem nhãn số lượng ít cho shop mới, khách test sản phẩm hoặc khách cần in nhanh. Tuy nhiên số lượng càng nhiều thì đơn giá sẽ tốt hơn.',
    },
    {
      question: 'Tôi chưa có file thiết kế thì có in được không?',
      answer:
        'Được. Bạn có thể gửi logo, nội dung cần đưa lên tem, kích thước mong muốn hoặc hình mẫu tham khảo. IST sẽ hỗ trợ bố cục và chỉnh file cơ bản.',
    },
    {
      question: 'Tem nhãn nên dùng decal giấy hay decal nhựa?',
      answer:
        'Decal giấy phù hợp sản phẩm khô, dùng trong môi trường bình thường và có chi phí tốt. Decal nhựa bền hơn, phù hợp chai lọ, mỹ phẩm, thực phẩm hoặc sản phẩm cần độ dai và chống rách tốt hơn.',
    },
    {
      question: 'IST có bế tem theo hình logo được không?',
      answer:
        'Có. IST có thể bế tem tròn, vuông, bo góc, oval hoặc theo hình dạng riêng tùy theo file thiết kế và quy cách sản phẩm.',
    },
    {
      question: 'Thời gian in tem nhãn mất bao lâu?',
      answer:
        'Tùy số lượng, chất liệu và lịch sản xuất. Với đơn đơn giản, file sẵn, IST có thể xử lý nhanh. Với đơn cần thiết kế, bế theo mẫu hoặc số lượng lớn, thời gian sẽ được báo cụ thể khi chốt đơn.',
    },
    {
      question: 'Làm sao để được báo giá chính xác?',
      answer:
        'Bạn nên gửi kích thước tem, số lượng, chất liệu mong muốn, hình mẫu hoặc file thiết kế. Nếu chưa rõ, chỉ cần gửi sản phẩm hoặc bao bì, IST sẽ tư vấn phương án phù hợp.',
    },
  ]

  return `
    <section id="tem-nhan-faq" class="border-t border-zinc-900 bg-zinc-950 fade-in">

      <div class="max-w-4xl mx-auto px-6 py-24">

        <div class="text-center mb-12">
          <p class="text-orange-500 font-semibold mb-4 tracking-widest uppercase">
            CÂU HỎI THƯỜNG GẶP
          </p>

          <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
            Khách thường hỏi gì<br>
            khi in tem nhãn?
          </h2>

          <p class="text-gray-400 text-lg leading-relaxed">
            Một số thông tin giúp bạn chuẩn bị nhanh hơn trước khi gửi yêu cầu báo giá.
          </p>
        </div>

        <div class="space-y-4">

          ${faqs.map((item) => `
            <details class="group rounded-3xl border border-zinc-800 bg-black p-6 open:border-orange-500/70 transition">

              <summary class="flex cursor-pointer list-none items-center justify-between gap-5">

                <span class="text-lg font-bold text-white">
                  ${item.question}
                </span>

                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 group-open:rotate-45 transition">
                  +
                </span>

              </summary>

              <p class="mt-5 text-gray-400 leading-relaxed">
                ${item.answer}
              </p>

            </details>
          `).join('')}

        </div>

      </div>

    </section>
  `
}