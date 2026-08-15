const triggers = [...document.querySelectorAll('[data-lightbox]')]

if (triggers.length) {
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
    const alt = trigger.querySelector('img')?.alt || trigger.getAttribute('aria-label') || ''
    image.src = trigger.dataset.lightbox
    image.alt = alt
    caption.textContent = trigger.dataset.caption || alt
  }

  const close = () => {
    dialog.classList.add('hidden')
    dialog.classList.remove('flex')
    document.body.classList.remove('overflow-hidden')
    image.removeAttribute('src')
    lastTrigger?.focus()
  }

  triggers.forEach((trigger, index) => trigger.addEventListener('click', () => {
    lastTrigger = trigger
    show(index)
    dialog.classList.remove('hidden')
    dialog.classList.add('flex')
    document.body.classList.add('overflow-hidden')
    closeButton.focus()
  }))
  closeButton.addEventListener('click', close)
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(currentIndex - 1))
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(currentIndex + 1))
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close() })
  document.addEventListener('keydown', (event) => {
    if (dialog.classList.contains('hidden')) return
    if (event.key === 'Escape') close()
    if (event.key === 'ArrowLeft') show(currentIndex - 1)
    if (event.key === 'ArrowRight') show(currentIndex + 1)
  })
}
