export function initLightbox() {
  const images = document.querySelectorAll('[data-lightbox]')

  const lightbox = document.createElement('div')

  lightbox.className =
    'hidden fixed inset-0 bg-black/90 z-[9999] items-center justify-center p-6'

  lightbox.innerHTML = `
    <button
      id="lightbox-close"
      class="absolute top-6 right-6 text-white text-4xl hover:text-orange-500 transition"
    >
      ×
    </button>

    <div class="max-w-5xl w-full text-center">

      <img
        id="lightbox-image"
        src=""
        alt="IST Image"
        class="max-w-full max-h-[80vh] mx-auto object-contain rounded-2xl"
      />

      <p
        id="lightbox-caption"
        class="text-gray-300 mt-5 text-lg"
      ></p>

    </div>
  `

  document.body.appendChild(lightbox)

  const lightboxImage =
    lightbox.querySelector('#lightbox-image')

  const lightboxCaption =
    lightbox.querySelector('#lightbox-caption')

  const closeBtn =
    lightbox.querySelector('#lightbox-close')

  images.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImage.src = img.src
      lightboxCaption.textContent = img.alt || ''
      lightbox.classList.remove('hidden')
      lightbox.classList.add('flex')
      document.body.style.overflow = 'hidden'
    })
  })

  function closeLightbox() {
    lightbox.classList.add('hidden')
    lightbox.classList.remove('flex')
    lightboxImage.src = ''
    lightboxCaption.textContent = ''
    document.body.style.overflow = ''
  }

  closeBtn.addEventListener('click', closeLightbox)

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox()
    }
  })
}