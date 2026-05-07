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

import { TemNhanHero } from './sections/TemNhanHero'
import { TemNhanBenefits } from './sections/TemNhanBenefits'
import { TemNhanGallery } from './sections/TemNhanGallery'
import { TemNhanCalculator } from './sections/TemNhanCalculator'


document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    <!-- Navbar -->
    ${Navbar()}

    <!-- Hero -->
    ${TemNhanHero()}

    <!-- Benefits -->
    ${TemNhanBenefits()}

    <!-- Gallery -->
    ${TemNhanGallery()}

    <!-- Tính Giá -->
    ${TemNhanCalculator()}

    <!-- CTA -->
    ${CTA()}

    <!-- Footer -->
    ${Footer()}

    <!-- Liên hệ -->
    ${FloatingContact()}

  </div>
`

    initFadeIn()