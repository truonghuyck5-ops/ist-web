import { Navbar } from '../components/Navbar'
import { CTA } from '../sections/CTA'
import { Footer } from '../sections/Footer'
import { FloatingContact } from '../components/FloatingContact'

export function BlogLayout(content) {

  return `
    <div class="bg-black text-white">

      ${Navbar()}

      <main class="max-w-4xl mx-auto px-6 py-24 fade-in">

        ${content}

      </main>

      ${CTA()}
      ${Footer()}
      ${FloatingContact()}

    </div>
  `
}