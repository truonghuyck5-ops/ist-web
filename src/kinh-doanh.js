import './style.css'

import { SalesPortal } from './sales/SalesPortal'

document.querySelector('#app').innerHTML = `
  ${SalesPortal()}
`