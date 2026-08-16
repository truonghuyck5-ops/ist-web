export function trackEvent(eventName, params = {}) {
  try {
    document.dispatchEvent(new CustomEvent('ist:track', {
      detail: { eventName, params },
    }))
  } catch {
    // Tracking must never interrupt a calculator or CTA interaction.
  }
}
