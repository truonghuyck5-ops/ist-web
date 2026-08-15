import { siteConfig } from '../data/site.js'

const productionHost = new URL(siteConfig.url).hostname
const trackingEnabled = window.location.hostname === productionHost

const destinationFor = (href) => {
  if (!href) return undefined

  try {
    const url = new URL(href, window.location.origin)
    if (url.protocol === 'tel:') return 'phone'
    if (url.hostname === 'zalo.me') return 'zalo'
    if (url.origin === window.location.origin) return url.pathname
    return 'external'
  } catch {
    return undefined
  }
}

const trackEvent = (eventName, params = {}) => {
  if (!trackingEnabled || typeof window.gtag !== 'function') return

  try {
    window.gtag('event', eventName, {
      ...params,
      page_path: window.location.pathname,
    })
  } catch {
    // A blocked analytics request must not affect navigation or UI behavior.
  }
}

if (trackingEnabled) {
  try {
    if (!window.__istGa4Initialized) {
      window.__istGa4Initialized = true
      window.dataLayer = window.dataLayer || []
      window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }
      window.gtag('js', new Date())
      window.gtag('config', siteConfig.analytics.measurementId)

      if (!document.querySelector('[data-ist-ga4-script]')) {
        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.measurementId}`
        script.dataset.istGa4Script = 'true'
        document.head.append(script)
      }
    }
  } catch {
    // Hardened browsers or blocked analytics must not interrupt the page.
  }
}

document.addEventListener('ist:track', (event) => {
  const { eventName, params } = event.detail ?? {}
  if (typeof eventName === 'string') trackEvent(eventName, params)
})

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest('[data-track-event]') : null
  if (!target) return

  const params = {
    location: target.dataset.trackLocation,
    service: target.dataset.trackService,
    action: target.dataset.trackAction,
    destination: destinationFor(target.getAttribute('href')),
  }

  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key])
  trackEvent(target.dataset.trackEvent, params)
})
