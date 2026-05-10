import '../style.css'

import { BlogLayout } from '../components/BlogLayout'
import { RelatedPosts } from '../components/RelatedPosts'

import { initFadeIn } from '../animation'
import { initLightbox } from '../components/Lightbox'

document.querySelector('#app').innerHTML =
  BlogLayout(`
      <p class="text-orange-500 font-semibold mb-5 tracking-widest">
        KIẾN THỨC TEM NHÃN
      </p>

      <h1 class="text-4xl md:text-6xl font-black leading-tight mb-8">
        In tem nhãn số lượng ít có được không?
      </h1>

      <p class="text-gray-400 text-xl leading-relaxed mb-12">
        Với công nghệ in kỹ thuật số, shop nhỏ và doanh nghiệp mới hoàn toàn có thể in tem nhãn số lượng ít để thử sản phẩm, ra mẫu mới hoặc bán theo từng đợt.
      </p>

      <img
        src="/images/projects/tem-nhan-001.jpg"
        alt="In tem nhãn số lượng ít tại IST"
        class="w-full rounded-3xl border border-zinc-800 mb-12"
      />

      <article class="prose prose-invert prose-lg max-w-none">

        <h2>Có nên in tem nhãn số lượng ít không?</h2>

        <p>
          Có. Với các shop mới, thương hiệu nhỏ hoặc sản phẩm đang thử nghiệm,
          in tem nhãn số lượng ít giúp giảm rủi ro tồn kho và dễ thay đổi thiết kế khi cần.
        </p>

        <h2>Khi nào nên in số lượng ít?</h2>

        <ul>
          <li>Khi mới ra mắt sản phẩm.</li>
          <li>Khi cần test mẫu bao bì.</li>
          <li>Khi sản phẩm có nhiều mùi, vị, size hoặc phiên bản.</li>
          <li>Khi chưa chắc nhu cầu thị trường.</li>
          <li>Khi cần tem gấp cho một đơn hàng nhỏ.</li>
        </ul>

        <h2>Giá in tem nhãn số lượng ít có cao hơn không?</h2>

        <p>
          Thông thường giá trên mỗi tem sẽ cao hơn so với in số lượng lớn,
          vì chi phí setup, vật liệu và gia công được chia trên số lượng ít hơn.
          Tuy nhiên, tổng chi phí ban đầu lại thấp và phù hợp để thử thị trường.
        </p>

        <h2>Nên chuẩn bị gì trước khi in?</h2>

        <ul>
          <li>Kích thước tem mong muốn.</li>
          <li>Số lượng cần in.</li>
          <li>Chất liệu decal phù hợp.</li>
          <li>File thiết kế hoặc nội dung cần đưa lên tem.</li>
          <li>Nhu cầu cán màng, bế demi hoặc chống nước.</li>
        </ul>

        <h2>IST có nhận in tem nhãn số lượng ít không?</h2>

        <p>
          Có. IST nhận in tem nhãn, sticker, decal sản phẩm từ số lượng ít đến số lượng lớn,
          hỗ trợ tư vấn chất liệu, kích thước và phương án phù hợp cho shop, cửa hàng và doanh nghiệp.
        </p>

      </article>

      ${RelatedPosts('in-tem-nhan-so-luong-it')}

  `)


initFadeIn()
initLightbox()