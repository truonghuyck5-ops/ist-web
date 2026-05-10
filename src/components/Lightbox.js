export function initLightbox() {
  const images = document.querySelectorAll('[data-lightbox]')

  if (!images.length) return

  const overlay = document.createElement('div')
  overlay.id = 'lightboxOverlay'
  overlay.className = `
    fixed inset-0 z-[9999] hidden items-center justify-center
    bg-black/90 px-4 py-6
  `

  overlay.innerHTML = `
    <button
      id="lightboxClose"
      class="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
      aria-label="Đóng hình ảnh"
    >
      ✕
    </button>

    <button
      id="lightboxPrev"
      class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20"
      aria-label="Ảnh trước"
    >
      ‹
    </button>

    <img
      id="lightboxImage"
      src=""
      alt=""
      class="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
    />

    <button
      id="lightboxNext"
      class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20"
      aria-label="Ảnh tiếp theo"
    >
      ›
    </button>

    <p
      id="lightboxCaption"
      class="absolute bottom-5 left-1/2 max-w-[90vw] -translate-x-1/2 text-center text-sm text-gray-300"
    ></p>
  `

  document.body.appendChild(overlay)

  const lightboxImage = document.querySelector('#lightboxImage')
  const lightboxCaption = document.querySelector('#lightboxCaption')
  const closeBtn = document.querySelector('#lightboxClose')
  const prevBtn = document.querySelector('#lightboxPrev')
  const nextBtn = document.querySelector('#lightboxNext')

  const imageList = Array.from(images)
  let currentIndex = 0

  function openLightbox(index) {
    currentIndex = index
    const image = imageList[currentIndex]

    const fullImage = image.dataset.lightbox || image.src
    const caption = image.dataset.caption || image.alt || ''

    lightboxImage.src = fullImage
    lightboxImage.alt = image.alt || caption
    lightboxCaption.textContent = caption

    overlay.classList.remove('hidden')
    overlay.classList.add('flex')
    document.body.classList.add('overflow-hidden')
  }

  function closeLightbox() {
    overlay.classList.add('hidden')
    overlay.classList.remove('flex')
    document.body.classList.remove('overflow-hidden')
    lightboxImage.src = ''
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length
    openLightbox(currentIndex)
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imageList.length
    openLightbox(currentIndex)
  }

  imageList.forEach((image, index) => {
    image.classList.add('cursor-zoom-in')

    image.addEventListener('click', () => {
      openLightbox(index)
    })
  })

  closeBtn.addEventListener('click', closeLightbox)
  prevBtn.addEventListener('click', showPrev)
  nextBtn.addEventListener('click', showNext)

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeLightbox()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (overlay.classList.contains('hidden')) return

    if (event.key === 'Escape') closeLightbox()
    if (event.key === 'ArrowLeft') showPrev()
    if (event.key === 'ArrowRight') showNext()
  })
}