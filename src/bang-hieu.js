import './style.css'

import { Navbar } from './components/Navbar'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { FloatingContact } from './components/FloatingContact'

import { initFadeIn } from './animation'

import { BangHieuHero } from './sections/BangHieuHero'
import { BangHieuTypes } from './sections/BangHieuTypes'
import { BangHieuProcess } from './sections/BangHieuProcess'
import { BangHieuPricing } from './sections/BangHieuPricing'
import { BangHieuFAQ } from './sections/BangHieuFAQ'
import { initLightbox } from './components/Lightbox'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    ${Navbar()}
    ${BangHieuHero()}
    ${BangHieuTypes()}
    ${BangHieuProcess()}
    ${BangHieuPricing()}
    ${BangHieuFAQ()}
    ${CTA()}
    ${Footer()}
    ${FloatingContact()}

  </div>
`

initFadeIn()
initLightbox()