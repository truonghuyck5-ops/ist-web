import { SectionTitle } from '../components/SectionTitle'
import { featuredProjects } from '../data/featuredProjects'

export function FeaturedProjects() {
  return `
    <section id="projects" class="border-t border-gray-900 bg-black fade-in">

      <div class="max-w-7xl mx-auto px-6 py-24">

        <div class="grid lg:grid-cols-12 gap-10 items-end mb-12">

          <div class="lg:col-span-8">
            ${SectionTitle({
              label: 'CÔNG TRÌNH TIÊU BIỂU',
              title: 'Sản phẩm & dự án<br>IST đã thực hiện'
            })}

            <p class="text-gray-400 text-lg leading-relaxed max-w-3xl">
              Một số sản phẩm, bảng hiệu và hạng mục quảng cáo thực tế do IST trực tiếp
              thiết kế, sản xuất và thi công cho shop, doanh nghiệp, cơ quan và tổ chức.
            </p>
          </div>

          <div class="lg:col-span-4 lg:text-right">
            <a
              href="#contact"
              onclick="
                trackEvent('click_projects_cta', {
                  page: 'home',
                  button: 'tu_van_cong_trinh_tuong_tu'
                })
              "
              class="inline-flex items-center rounded-xl border border-zinc-700 px-6 py-4 font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
            >
              Tư vấn công trình tương tự →
            </a>
          </div>

        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          ${featuredProjects
            .map(
              (project) => `
                <article class="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 hover:border-orange-500/70 transition">

                  <div class="relative overflow-hidden">
                    <img
                      src="${project.image}"
                      alt="${project.title}"
                      data-lightbox="${project.image}"
                      data-caption="${project.caption}"
                      class="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div class="absolute left-4 top-4 rounded-full bg-black/75 backdrop-blur px-4 py-2 text-xs font-bold text-white">
                      ${project.category}
                    </div>
                  </div>

                  <div class="p-6">

                    <h3 class="text-xl font-bold mb-3">
                      ${project.title}
                    </h3>

                    <p class="text-gray-400 leading-relaxed mb-5">
                      ${project.service}
                    </p>

                    <button
                      onclick="this.closest('article').querySelector('img').click()"
                      class="font-bold text-orange-500 hover:text-orange-400 transition"
                    >
                      Xem ảnh lớn →
                    </button>

                  </div>

                </article>
              `
            )
            .join('')}

        </div>

      </div>

    </section>
  `
}