import { SectionTitle } from '../components/SectionTitle'

export function Capabilities() {
  return `
  <section class="border-t border-gray-900">

      <div class="max-w-7xl mx-auto px-6 py-24">

        ${SectionTitle({
          label: 'NĂNG LỰC IST',
          title: 'Chủ động sản xuất<br>& thi công thực tế'
        })}

        <div class="grid md:grid-cols-4 gap-6">

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              500+
            </h4>

            <p class="text-gray-300">
              m² nhà xưởng sản xuất
            </p>
          </div>

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              15+
            </h4>

            <p class="text-gray-300">
              nhân sự chuyên môn
            </p>
          </div>

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              10+
            </h4>

            <p class="text-gray-300">
              năm kinh nghiệm
            </p>
          </div>

          <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h4 class="text-5xl font-bold text-orange-500 mb-4">
              1000+
            </h4>

            <p class="text-gray-300">
              công trình & đơn hàng
            </p>
          </div>

        </div>

      </div>

    </section>
     `
}