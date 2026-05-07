export function trackEvent(eventName, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params)
  }
}

window.trackEvent = trackEvent