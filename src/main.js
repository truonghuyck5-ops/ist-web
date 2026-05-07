import './style.css'

import { initFadeIn } from './animation'

import { Navbar } from './components/Navbar'
import { FloatingContact } from './components/FloatingContact'

import { Hero } from './sections/Hero'
import { Products } from './sections/Products'
import { Capabilities } from './sections/Capabilities'
import { Gallery } from './sections/Gallery'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'

import { initLightbox } from './components/Lightbox'


document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    <!-- Navbar -->
    ${Navbar()}

    <!-- Hero -->
    ${Hero()}

    <!-- Năng lực -->
    ${Capabilities()}

    <!-- Sản phẩm -->
    ${Products()}

    <!-- Công trình -->
    ${Gallery()}  

    <!-- CTA -->
    ${CTA()}

    <!-- Footer -->
    ${Footer()}

    <!-- Liên hệ -->
    ${FloatingContact()}

  </div>
`

    initFadeIn()
    initLightbox()