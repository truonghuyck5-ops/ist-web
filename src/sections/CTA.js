import { Button } from '../components/Button'
import { SectionTitle } from '../components/SectionTitle'

export function CTA() {
  return `

    <section id="contact" class="border-t border-gray-900 relative overflow-hidden fade-in">

        <div class="absolute inset-0 bg-orange-500/5 blur-3xl"></div>
        <div class="max-w-5xl mx-auto px-6 py-24 text-center relative z-10">

            ${SectionTitle({
                label: 'LIÊN HỆ IST',
                title: 'Cần báo giá nhanh<br>cho công trình hoặc sản phẩm?',
                center: true
            })}

            <p class="text-gray-400 text-lg mb-10 leading-relaxed">
            IST hỗ trợ tư vấn, thiết kế và báo giá nhanh
            cho doanh nghiệp, cửa hàng và cơ quan.
            </p>

            <div class="flex flex-wrap justify-center gap-4">

                ${Button({
                    text: 'Gọi ngay',
                    variant: 'primary'
                })}

                ${Button({
                    text: 'Chat Zalo',
                    variant: 'outline'
                })}

            </div>

        </div>

        </section>
        `
}