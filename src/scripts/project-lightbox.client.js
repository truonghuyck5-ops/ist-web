// Enhance real asset links; unsupported browsers keep ordinary navigation.
const triggers = [...document.querySelectorAll('a[data-project-image]')]

if (triggers.length && typeof HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal === 'function') {
  const dialog = document.createElement('dialog')
  dialog.className = 'm-auto max-h-[95dvh] w-[calc(100%-2rem)] max-w-6xl overflow-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white backdrop:bg-black/90'
  dialog.setAttribute('aria-label', 'Xem ảnh lớn')
  dialog.setAttribute('aria-describedby', 'project-image-caption')
  dialog.innerHTML = `
    <div class="mb-3 flex justify-end">
      <button type="button" autofocus class="min-h-12 min-w-12 rounded-xl border border-zinc-600 px-4 py-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400" aria-label="Đóng ảnh lớn">Đóng <span aria-hidden="true">×</span></button>
    </div>
    <img class="mx-auto max-h-[65dvh] max-w-full object-contain" alt="" />
    <p id="project-image-caption" class="mt-4 text-center text-sm leading-relaxed text-zinc-300"></p>
  `
  document.body.append(dialog)
  const closeButton = dialog.querySelector('button')
  const image = dialog.querySelector('img')
  const caption = dialog.querySelector('p')
  let lastTrigger = null
  let previousOverflow = ''

  triggers.forEach((trigger) => trigger.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const thumbnail = trigger.querySelector('img')
    image.src = trigger.href
    image.alt = thumbnail?.alt || ''
    caption.textContent = trigger.dataset.caption || image.alt
    // Only suppress the asset link once opening the native modal succeeds.
    try {
      dialog.showModal()
    } catch {
      return
    }
    event.preventDefault()
    lastTrigger = trigger
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.focus()
  }))

  closeButton.addEventListener('click', () => dialog.close())
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault()
    dialog.close()
  })
  // One image per project: no carousel and no cross-project navigation.
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      closeButton.focus()
    }
  })
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow
    image.removeAttribute('src')
    lastTrigger?.focus({ preventScroll: true })
  })
}
