// UI-only modal keyboard integration. No pricing, field or tracking mutations.
const popup = document.querySelector('#quote-popup')
const exportButton = document.querySelector('#export-quote-btn')
if (popup && exportButton) {
  const background = [...document.querySelectorAll('body > header, body > footer, .hv3-floating-contact, main > section:not(#calculator), #tem-nhan-calculator-form, [data-tv3-calculator-heading]')].map(element => ({ element, inert: element.inert }))
  let wasOpen = false
  const syncModal = () => {
    const open = popup.getAttribute('aria-hidden') === 'false'
    document.documentElement.classList.toggle('tv3-quote-open', open)
    background.forEach(({ element, inert }) => { element.inert = open || inert })
    if (wasOpen && !open) exportButton.focus({ preventScroll: true })
    wasOpen = open
  }
  new MutationObserver(syncModal).observe(popup, { attributes: true, attributeFilter: ['aria-hidden'] })
  popup.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || popup.getAttribute('aria-hidden') !== 'false') return
    const controls = [...popup.querySelectorAll('button:not([disabled]), a[href]')]
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  })
  syncModal()
}
