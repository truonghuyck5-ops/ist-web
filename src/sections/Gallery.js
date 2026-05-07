import { GalleryCard } from '../components/GalleryCard'
import { gallery } from '../data/gallery'

export function Gallery() {
  return `
  
    <section id="projects" class="border-t border-gray-900 fade-in">

        <div class="max-w-7xl mx-auto px-6 py-24">

            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">

            <div>
                <p class="text-orange-500 font-semibold mb-3">
                CÔNG TRÌNH THỰC TẾ
                </p>

                <h3 class="text-4xl font-bold leading-tight">
                Năng lực thực tế
                <br>
                từ xưởng sản xuất IST
                </h3>
            </div>

            <p class="text-gray-400 max-w-xl leading-relaxed">
                Các công trình bảng hiệu, in ấn và thi công
                được thực hiện trực tiếp bởi đội ngũ IST.
            </p>

            </div>

            <div class="grid md:grid-cols-3 gap-6">

                ${gallery
                    .map((item) =>
                        GalleryCard(item)
                    )
                    .join('')}  

            </div>

        </div>

        </section>
        `
}