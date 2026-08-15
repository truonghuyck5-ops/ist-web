const gallery = window.__hoaDonGallery || []
const filters = window.__hoaDonGalleryFilters || []
const galleryImage = document.querySelector('#hoa-don-gallery-image')

if (galleryImage && gallery.length) {
  const galleryTitle = document.querySelector('#hoa-don-gallery-title')
  const galleryGroup = document.querySelector('#hoa-don-gallery-group')
  const counter = document.querySelector('#hoa-don-gallery-counter')
  const previous = document.querySelector('#hoa-don-gallery-prev')
  const next = document.querySelector('#hoa-don-gallery-next')
  const openButton = document.querySelector('#hoa-don-gallery-open')
  const filterButtons = [...document.querySelectorAll('[data-invoice-gallery-filter]')]
  const emptyMessage = document.querySelector('#hoa-don-gallery-empty')
  const lightbox = document.querySelector('#hoa-don-lightbox')
  const lightboxOverlay = document.querySelector('#hoa-don-lightbox-overlay')
  const lightboxImage = document.querySelector('#hoa-don-lightbox-image')
  const lightboxTitle = document.querySelector('#hoa-don-lightbox-title')
  const closeButton = document.querySelector('#hoa-don-lightbox-close')
  let activeFilter = 'all'
  let filteredImages = gallery
  let currentIndex = 0

  const filterLabel = (value) => filters.find((filter) => filter.value === value)?.label || 'Tất cả mẫu'
  const filterImages = (value) => value === 'all' ? gallery : gallery.filter((item) => item.size === value || item.ink === value)
  const updateButtons = () => filterButtons.forEach((button) => {
    const active = button.dataset.invoiceGalleryFilter === activeFilter
    button.setAttribute('aria-pressed', String(active))
    button.classList.toggle('bg-orange-500', active)
    button.classList.toggle('text-white', active)
    button.classList.toggle('border-orange-500', active)
    button.classList.toggle('bg-black', !active)
    button.classList.toggle('text-gray-300', !active)
    button.classList.toggle('border-zinc-700', !active)
  })

  const render = () => {
    const current = filteredImages[currentIndex]
    const hasImages = Boolean(current)
    galleryImage.classList.toggle('invisible', !hasImages)
    openButton.disabled = !hasImages
    previous.disabled = !hasImages
    next.disabled = !hasImages
    emptyMessage.classList.toggle('hidden', hasImages)
    emptyMessage.textContent = hasImages ? '' : `Chưa có mẫu ${filterLabel(activeFilter).toLowerCase()} trong gallery hiện tại.`
    galleryGroup.textContent = `Đang xem: ${filterLabel(activeFilter)}`
    counter.textContent = hasImages ? `${currentIndex + 1}/${filteredImages.length}` : '0/0'
    if (!hasImages) return
    galleryImage.src = current.src
    galleryImage.alt = current.title
    galleryTitle.textContent = current.title
    openButton.setAttribute('aria-label', `Xem ảnh lớn: ${current.title}`)
  }

  const changeImage = (offset) => {
    if (!filteredImages.length) return
    currentIndex = (currentIndex + offset + filteredImages.length) % filteredImages.length
    render()
  }

  const closeLightbox = () => {
    lightbox.classList.add('hidden')
    lightbox.classList.remove('flex')
    lightbox.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('overflow-hidden')
    openButton.focus()
  }

  filterButtons.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.invoiceGalleryFilter
    filteredImages = filterImages(activeFilter)
    currentIndex = 0
    updateButtons()
    render()
  }))
  previous.addEventListener('click', () => changeImage(-1))
  next.addEventListener('click', () => changeImage(1))
  openButton.addEventListener('click', () => {
    const current = filteredImages[currentIndex]
    if (!current) return
    lightboxImage.src = current.src
    lightboxImage.alt = current.title
    lightboxTitle.textContent = current.title
    lightbox.classList.remove('hidden')
    lightbox.classList.add('flex')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.classList.add('overflow-hidden')
    closeButton.focus()
  })
  closeButton.addEventListener('click', closeLightbox)
  lightboxOverlay.addEventListener('click', closeLightbox)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox()
    if (event.key === 'ArrowLeft' && !lightbox.classList.contains('hidden')) changeImage(-1)
    if (event.key === 'ArrowRight' && !lightbox.classList.contains('hidden')) changeImage(1)
  })
  updateButtons()
  render()
}
