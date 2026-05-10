import './style.css'

import { initFadeIn } from './animation'
import { Navbar } from './components/Navbar'
import { FloatingContact } from './components/FloatingContact'
import { Footer } from './sections/Footer'
import { initLightbox } from './components/Lightbox'

import { TemNhanHero } from './sections/TemNhanHero'
import { TemNhanBenefits } from './sections/TemNhanBenefits'
import { TemNhanGallery } from './sections/TemNhanGallery'
import { TemNhanCalculator } from './sections/TemNhanCalculator'
import { TemNhanFAQ } from './sections/TemNhanFAQ'
import { TemNhanTypes } from './sections/TemNhanTypes'


document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    <!-- Navbar -->
    ${Navbar()}

    <!-- Hero -->
    ${TemNhanHero()}

    <!-- Benefits -->
    ${TemNhanBenefits()}

    ${TemNhanTypes()}

    <!-- Gallery -->
    ${TemNhanGallery()}

    <!-- Tem nhãn FAQ -->
    ${TemNhanFAQ()}

    <!-- Tính Giá -->
    ${TemNhanCalculator()}

    <!-- Footer -->
    ${Footer()}

    <!-- Liên hệ -->
    ${FloatingContact()}

  </div>
`

    initFadeIn()
    initLightbox()