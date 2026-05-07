import './style.css'

import { Navbar } from './components/Navbar'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { FloatingContact } from './components/FloatingContact'
import { initFadeIn } from './animation'

import { ComboMoQuanHero } from './sections/ComboMoQuanHero'
import { ComboItems } from './sections/ComboItems'
import { ComboPackages } from './sections/ComboPackages'
import { ComboProcess } from './sections/ComboProcess'
import { ComboFAQ } from './sections/ComboFAQ'
import { initLightbox } from './components/Lightbox'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    ${Navbar()}
    ${ComboMoQuanHero()}
    ${ComboItems()}
    ${ComboPackages()}
    ${ComboProcess()}
    ${ComboFAQ()}
    ${CTA()}
    ${Footer()}
    ${FloatingContact()}

  </div>
`

initFadeIn()
initLightbox()