import './style.css'

import { Navbar } from './components/Navbar'
import { Footer } from './sections/Footer'

import { HoaDonHero } from './sections/HoaDonHero'
import { HoaDonCalculator } from './sections/HoaDonCalculator'
import { HoaDonBenefits } from './sections/HoaDonBenefits'
import { HoaDonFAQ } from './sections/HoaDonFAQ'

document.querySelector('#app').innerHTML = `
  <div class="bg-black text-white min-h-screen">
    ${Navbar()}
    ${HoaDonHero()}
    ${HoaDonCalculator()}
    ${HoaDonBenefits()}
    ${HoaDonFAQ()}
    ${Footer()}
  </div>
`