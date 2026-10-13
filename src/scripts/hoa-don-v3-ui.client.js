// UI-only integration for the original price-table popup. Pricing and tracking stay in the original client.
const popup = document.querySelector('#invoice-price-popup')
const closeButton = document.querySelector('#invoice-price-popup-close')
const trigger = document.querySelector('#invoice-price-table-btn')
if (popup && closeButton && trigger) {
  const background = [...document.querySelectorAll('body > header, body > footer, .hv3-skip-link, .hv3-floating-contact, main > section:not(#calculator), #invoice-calculator-form, #invoice-result, [data-iv3-calculator-heading], .iv3-calculator-note')].map(element => ({ element, inert: element.inert }))
  let wasOpen = false
  const syncModal = () => {
    const open = popup.getAttribute('aria-hidden') === 'false'
    document.documentElement.classList.toggle('iv3-price-open', open)
    background.forEach(({ element, inert }) => { element.inert = open || inert })
    if (open && !wasOpen) closeButton.focus({ preventScroll: true })
    if (!open && wasOpen) trigger.focus({ preventScroll: true })
    wasOpen = open
  }
  new MutationObserver(syncModal).observe(popup, { attributes: true, attributeFilter: ['aria-hidden'] })
  popup.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeButton.click() }
    if (event.key === 'Tab') { event.preventDefault(); closeButton.focus() }
  })
  syncModal()
}
