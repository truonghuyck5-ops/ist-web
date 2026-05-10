export function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter-number')

  if (!counters.length) return

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target)
    const suffix = counter.dataset.suffix || ''
    const duration = 2000
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(easeOut * target)

      counter.textContent = `${currentValue.toLocaleString('vi-VN')}${suffix}`

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = `${target.toLocaleString('vi-VN')}${suffix}`
      }
    }

    requestAnimationFrame(updateCounter)
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          observerInstance.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.4,
    }
  )

  counters.forEach((counter) => observer.observe(counter))
}