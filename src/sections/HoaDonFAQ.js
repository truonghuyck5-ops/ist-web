export function HoaDonFAQ() {
  const faqs = [
    {
      q: 'Vì sao không nhập số lượng tự do?',
      a: 'Hóa đơn và biểu mẫu cần tối ưu theo giấy, liên giấy và quy trình đóng cuốn. Nếu làm số lượng lẻ ngoài bảng, chi phí sản xuất có thể cao hơn nên IST chỉ hiển thị các mốc phù hợp.',
    },
    {
      q: 'Hóa đơn này có phải hóa đơn VAT không?',
      a: 'Không. Đây là hóa đơn bán hàng nội bộ, phiếu thu, phiếu chi, biên nhận, biểu mẫu ghi chép. Nếu cần hóa đơn VAT điện tử, khách hàng cần dùng dịch vụ hóa đơn điện tử theo quy định.',
    },
    {
      q: 'Có thiết kế mẫu hóa đơn không?',
      a: 'Có. IST có thể hỗ trợ bố cục mẫu hóa đơn cơ bản theo tên cửa hàng, logo, số điện thoại, địa chỉ và các cột thông tin cần ghi.',
    },
    {
      q: 'Có thể in màu khác ngoài xanh, đỏ, đen không?',
      a: 'Bảng giá tham khảo áp dụng cho in 1 màu xanh, đỏ hoặc đen. Nếu cần quy cách khác, IST sẽ báo giá riêng.',
    },
  ]

  return `
    <section
      id="faq"
      class="bg-black text-white py-20"
    >
      <div class="max-w-4xl mx-auto px-6">

        <div class="text-center mb-10">
          <p class="text-orange-500 font-semibold tracking-[0.2em] uppercase mb-4">
            FAQ
          </p>

          <h2 class="text-white text-4xl md:text-5xl font-black">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div class="grid gap-4">
          ${faqs.map((item) => `
            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <h3 class="text-white font-black text-xl mb-3">
                ${item.q}
              </h3>

              <p class="text-gray-400 leading-relaxed">
                ${item.a}
              </p>
            </div>
          `).join('')}
        </div>

      </div>
    </section>
  `
}