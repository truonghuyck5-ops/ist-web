import '../style.css'

import { Navbar } from '../components/Navbar'
import { CTA } from '../sections/CTA'
import { Footer } from '../sections/Footer'
import { FloatingContact } from '../components/FloatingContact'

import { initFadeIn } from '../animation'
import { blogPosts } from '../data/blogPosts'
import { BlogCard } from '../components/BlogCard'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    ${Navbar()}

    <main class="max-w-7xl mx-auto px-6 py-24 fade-in">

      <div class="max-w-3xl mb-20">

        <p class="text-orange-500 font-semibold tracking-widest mb-5">
          BLOG IST
        </p>

        <h1 class="text-5xl md:text-7xl font-black leading-tight mb-8">
          Kiến thức thiết kế, in ấn & quảng cáo
        </h1>

        <p class="text-gray-400 text-xl leading-relaxed">
          Chia sẻ kinh nghiệm thực tế về bảng hiệu, tem nhãn,
          thiết kế và triển khai quảng cáo dành cho cửa hàng,
          doanh nghiệp và cơ quan.
        </p>

      </div>

      <div class="grid md:grid-cols-2 gap-10">

        ${blogPosts
            .map(post => BlogCard(post))
            .join('')}

        </div>

    </main>

    ${CTA()}
    ${Footer()}
    ${FloatingContact()}

  </div>
`

initFadeIn()