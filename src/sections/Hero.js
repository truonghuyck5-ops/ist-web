import { Button } from '../components/Button'

export function Hero() {
  return `
    <section id="hero" class="relative overflow-hidden fade-in">

    <!-- Background glow -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full"></div>

    <div class="max-w-7xl mx-auto px-6 py-28 relative z-10">

        <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left -->
        <div>

            <p class="text-orange-500 font-semibold mb-5 tracking-widest">
            IN SÁNG TẠO
            </p>

            <h2 class="text-5xl md:text-7xl font-black leading-tight mb-8">
            Thiết kế,
            <br>
            In ấn &
            <br>
            Quảng cáo
            </h2>

            <p class="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl">
            Giải pháp thiết kế, in ấn và thi công quảng cáo
            chuyên nghiệp cho doanh nghiệp, cửa hàng
            và cơ quan tại Trà Vinh và khu vực lân cận.
            </p>

            <div class="flex flex-wrap gap-4">

                ${Button({
                    text: 'Xem sản phẩm',

                    href: '#products',

                    onclick: `
                        trackEvent('click_cta', {
                        page: 'home',
                        button: 'xem_san_pham'
                        })
                    `,

                    variant: 'primary'
                })}

                ${Button({
                    text: 'Liên hệ tư vấn',

                    href: '#contact',

                    onclick: `
                        trackEvent('click_cta', {
                        page: 'home',
                        button: 'lien_he_tu_van'
                        })
                    `,

                    variant: 'outline'
                })}

            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-16">

            <div>
                <h3 class="text-3xl font-bold text-orange-500 mb-2">
                10+
                </h3>

                <p class="text-gray-400 text-sm">
                Năm kinh nghiệm
                </p>
            </div>

            <div>
                <h3 class="text-3xl font-bold text-orange-500 mb-2">
                1000+
                </h3>

                <p class="text-gray-400 text-sm">
                Công trình
                </p>
            </div>

            <div>
                <h3 class="text-3xl font-bold text-orange-500 mb-2">
                500m²
                </h3>

                <p class="text-gray-400 text-sm">
                Xưởng sản xuất
                </p>
            </div>

            </div>

        </div>

        <!-- Right -->
        <div>

            <div class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

            <img
                src="/images/projects/ist-hero01.jpg"
                alt="IST Factory"
                class="w-full h-full object-cover"
            />

            </div>

        </div>

        </div>

    </div>

    </section>
    `
}