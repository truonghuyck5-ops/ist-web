import '../style.css'

import { BlogLayout } from '../components/BlogLayout'
import { RelatedPosts } from '../components/RelatedPosts'

import { initFadeIn } from '../animation'
import { initLightbox } from '../components/Lightbox'

document.querySelector('#app').innerHTML =
  BlogLayout(`

    <p class="text-orange-500 font-semibold mb-5 tracking-widest">
      KIẾN THỨC BẢNG HIỆU
    </p>

    <h1 class="text-4xl md:text-6xl font-black leading-tight mb-8">
      Giá bảng hiệu alu hiện nay bao nhiêu?
    </h1>

    <p class="text-gray-400 text-xl leading-relaxed mb-12">
      Bảng hiệu alu là lựa chọn phổ biến cho cửa hàng, showroom, spa, nha khoa và doanh nghiệp cần mặt tiền đẹp, hiện đại và bền hơn bảng hiflex thông thường.
    </p>

    <img
      src="/images/projects/bang-hieu-001.jpg"
      alt="Bảng hiệu alu IST"
      class="w-full rounded-3xl border border-zinc-800 mb-12"
      data-lightbox
    />

    <article class="prose prose-invert prose-lg max-w-none">

      <h2>Bảng hiệu alu là gì?</h2>

      <p>
        Bảng hiệu alu thường sử dụng khung sắt bên trong, bề mặt ốp tấm alu,
        kết hợp chữ nổi mica, inox, decal hoặc hệ thống đèn LED tùy nhu cầu nhận diện.
      </p>

      <h2>Giá bảng hiệu alu phụ thuộc vào yếu tố nào?</h2>

      <ul>
        <li>Kích thước bảng hiệu.</li>
        <li>Kết cấu khung sắt.</li>
        <li>Loại alu sử dụng.</li>
        <li>Chữ nổi mica, inox hoặc decal.</li>
        <li>Có đèn LED hay không.</li>
        <li>Độ cao và độ khó khi thi công.</li>
      </ul>

      <h2>Giá tham khảo bảng hiệu alu</h2>

      <p>
        Với các công trình phổ biến, bảng hiệu alu thường có giá từ khoảng
        <strong>1.200.000đ/m² trở lên</strong>, tùy vật liệu, thiết kế và điều kiện thi công.
      </p>

      <h2>Khi nào nên chọn bảng hiệu alu?</h2>

      <p>
        Bảng hiệu alu phù hợp khi khách hàng cần hình ảnh chuyên nghiệp,
        sử dụng lâu dài, mặt tiền đẹp và có khả năng kết hợp thêm chữ nổi hoặc đèn LED.
      </p>

      <h2>IST có nhận thiết kế và thi công bảng hiệu alu không?</h2>

      <p>
        Có. IST nhận tư vấn, thiết kế, sản xuất và thi công bảng hiệu alu,
        bảng hiệu mặt tiền, hộp đèn và chữ nổi cho cửa hàng, doanh nghiệp và cơ quan.
      </p>

    </article>

    ${RelatedPosts('gia-bang-hieu-alu')}

  `)

initFadeIn()
initLightbox()