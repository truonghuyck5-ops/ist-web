import './style.css'

import { initFadeIn } from './animation'

import { Navbar } from './components/Navbar'
import { FloatingContact } from './components/FloatingContact'
import { initLightbox } from './components/Lightbox'

import { Hero } from './sections/Hero'
import { AboutIST } from './sections/AboutIST'
import { Capabilities } from './sections/Capabilities'
import { ProductionCapacity } from './sections/ProductionCapacity'
import { Products } from './sections/Products'
import { Gallery } from './sections/Gallery'
import { CTA } from './sections/CTA'
import { Footer } from './sections/Footer'
import { FeaturedProjects } from './sections/FeaturedProjects'

import { initCounterAnimation } from './components/CounterAnimation'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white">

    ${Navbar()}

    ${Hero()}

    ${AboutIST()}

    ${Capabilities()}

    ${ProductionCapacity()}

    ${Products()}

    ${FeaturedProjects()}

    ${CTA()}

    ${Footer()}

    ${FloatingContact()}

  </div>
`

initFadeIn()
initLightbox()
initCounterAnimation()