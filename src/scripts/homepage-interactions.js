const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initCounters() {
  const counters = [...document.querySelectorAll('[data-counter]')]

  if (!counters.length || reduceMotion || !('IntersectionObserver' in window)) return

  const animate = (counter) => {
    const target = Number(counter.dataset.target)
    const suffix = counter.dataset.suffix || ''
    const duration = 2000
    const startTime = performance.now()

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const currentValue = Math.floor((1 - Math.pow(1 - progress, 3)) * target)

      counter.textContent = `${currentValue.toLocaleString('vi-VN')}${suffix}`

      if (progress < 1) {
        window.requestAnimationFrame(update)
      } else {
        counter.textContent = `${target.toLocaleString('vi-VN')}${suffix}`
      }
    }

    window.requestAnimationFrame(update)
  }

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target)
        observerInstance.unobserve(entry.target)
      }
    })
  }, { threshold: 0.4 })

  counters.forEach((counter) => observer.observe(counter))
}

function initLightbox() {
  const triggers = [...document.querySelectorAll('[data-lightbox]')]

  if (!triggers.length) return

  const dialog = document.createElement('div')
  dialog.className = 'fixed inset-0 z-[9999] hidden items-center justify-center bg-black/90 px-4 py-6'
  dialog.setAttribute('role', 'dialog')
  dialog.setAttribute('aria-modal', 'true')
  dialog.setAttribute('aria-label', 'Xem ảnh lớn')
  dialog.innerHTML = `
    <button type="button" data-lightbox-close class="absolute top-5 right-5 rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20" aria-label="Đóng hình ảnh">✕</button>
    <button type="button" data-lightbox-prev class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white transition hover:bg-white/20" aria-label="Ảnh trước">‹</button>
    <img data-lightbox-image src="" alt="" class="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" />
    <button type="button" data-lightbox-next class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white transition hover:bg-white/20" aria-label="Ảnh tiếp theo">›</button>
    <p data-lightbox-caption class="absolute bottom-5 left-1/2 max-w-[90vw] -translate-x-1/2 text-center text-sm text-gray-300"></p>
  `
  document.body.append(dialog)

  const image = dialog.querySelector('[data-lightbox-image]')
  const caption = dialog.querySelector('[data-lightbox-caption]')
  const closeButton = dialog.querySelector('[data-lightbox-close]')
  let currentIndex = 0
  let lastTrigger = null

  const show = (index) => {
    currentIndex = (index + triggers.length) % triggers.length
    const trigger = triggers[currentIndex]
    const source = trigger.dataset.lightbox
    const alt = trigger.querySelector('img')?.alt || trigger.getAttribute('aria-label') || ''

    image.src = source
    image.alt = alt
    caption.textContent = trigger.dataset.caption || alt
  }

  const open = (index) => {
    lastTrigger = triggers[index]
    show(index)
    dialog.classList.remove('hidden')
    dialog.classList.add('flex')
    document.body.classList.add('overflow-hidden')
    closeButton.focus()
  }

  const close = () => {
    dialog.classList.add('hidden')
    dialog.classList.remove('flex')
    document.body.classList.remove('overflow-hidden')
    image.removeAttribute('src')
    lastTrigger?.focus()
  }

  triggers.forEach((trigger, index) => trigger.addEventListener('click', () => open(index)))
  document.querySelectorAll('[data-lightbox-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const index = triggers.findIndex((imageTrigger) => imageTrigger.dataset.lightbox === trigger.dataset.lightboxTrigger)

      if (index >= 0) open(index)
    })
  })
  closeButton.addEventListener('click', close)
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(currentIndex - 1))
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(currentIndex + 1))
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close()
  })
  document.addEventListener('keydown', (event) => {
    if (dialog.classList.contains('hidden')) return

    if (event.key === 'Escape') close()
    if (event.key === 'ArrowLeft') show(currentIndex - 1)
    if (event.key === 'ArrowRight') show(currentIndex + 1)
  })
}

function initReveal() {
  const sections = [...document.querySelectorAll('[data-reveal]')]

  if (!sections.length || reduceMotion || !('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-enhanced')
        window.requestAnimationFrame(() => entry.target.classList.add('reveal-visible'))
        observerInstance.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  sections.forEach((section) => observer.observe(section))
}

initCounters()
initLightbox()
initReveal()
