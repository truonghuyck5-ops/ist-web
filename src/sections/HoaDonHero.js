const hoaDonGalleryImages = [
  {
    type: 'overview',
    size: 'all',
    ink: 'all',
    title: 'In hóa đơn - Phiếu thu - Biểu mẫu IST',
    src: '/images/hoa-don/og-hoa-don.webp',
  },

  {
    type: 'sample',
    size: 'A4',
    ink: 'red',
    title: 'Hóa đơn A4 - mực đỏ 01',
    src: '/images/hoa-don/hoa-don-a4-do-01.webp',
  },
  {
    type: 'sample',
    size: 'A4',
    ink: 'red',
    title: 'Hóa đơn A4 - mực đỏ 02',
    src: '/images/hoa-don/hoa-don-a4-do-02.webp',
  },
  {
    type: 'sample',
    size: 'A4',
    ink: 'color',
    title: 'Hóa đơn A4 - in màu 01',
    src: '/images/hoa-don/hoa-don-a4-mau-01.webp',
  },

  {
    type: 'sample',
    size: 'A5',
    ink: 'red',
    title: 'Hóa đơn A5 - mực đỏ 01',
    src: '/images/hoa-don/hoa-don-a5-do-01.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'red',
    title: 'Hóa đơn A5 - mực đỏ 02',
    src: '/images/hoa-don/hoa-don-a5-do-02.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'red',
    title: 'Hóa đơn A5 - mực đỏ 03',
    src: '/images/hoa-don/hoa-don-a5-do-03.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'red',
    title: 'Hóa đơn A5 - mực đỏ 04',
    src: '/images/hoa-don/hoa-don-a5-do-04.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'blue',
    title: 'Hóa đơn A5 - mực xanh 01',
    src: '/images/hoa-don/hoa-don-a5-xanh-01.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'blue',
    title: 'Hóa đơn A5 - mực xanh 02',
    src: '/images/hoa-don/hoa-don-a5-xanh-02.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'blue',
    title: 'Hóa đơn A5 - mực xanh 03',
    src: '/images/hoa-don/hoa-don-a5-xanh-03.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'blue',
    title: 'Hóa đơn A5 - mực xanh 04',
    src: '/images/hoa-don/hoa-don-a5-xanh-04.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'blue',
    title: 'Hóa đơn A5 - mực xanh 05',
    src: '/images/hoa-don/hoa-don-a5-xanh-05.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'blue',
    title: 'Hóa đơn A5 - mực xanh 06',
    src: '/images/hoa-don/hoa-don-a5-xanh-06.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'color',
    title: 'Hóa đơn A5 - in màu 01',
    src: '/images/hoa-don/hoa-don-a5-mau-01.webp',
  },
  {
    type: 'sample',
    size: 'A5',
    ink: 'color',
    title: 'Hóa đơn A5 - in màu 02',
    src: '/images/hoa-don/hoa-don-a5-mau-02.webp',
  },

  {
    type: 'sample',
    size: 'A6',
    ink: 'red',
    title: 'Hóa đơn A6 - mực đỏ 01',
    src: '/images/hoa-don/hoa-don-a6-do-01.webp',
  },
  {
    type: 'sample',
    size: 'A6',
    ink: 'red',
    title: 'Hóa đơn A6 - mực đỏ 02',
    src: '/images/hoa-don/hoa-don-a6-do-02.webp',
  },
  {
    type: 'sample',
    size: 'A6',
    ink: 'blue',
    title: 'Hóa đơn A6 - mực xanh 01',
    src: '/images/hoa-don/hoa-don-a6-xanh-01.webp',
  },
  {
    type: 'sample',
    size: 'A6',
    ink: 'blue',
    title: 'Hóa đơn A6 - mực xanh 02',
    src: '/images/hoa-don/hoa-don-a6-xanh-02.webp',
  },
  {
    type: 'sample',
    size: 'A6',
    ink: 'color',
    title: 'Hóa đơn A6 - in màu 01',
    src: '/images/hoa-don/hoa-don-a6-mau-01.webp',
  },
  {
    type: 'sample',
    size: 'A6',
    ink: 'color',
    title: 'Hóa đơn A6 - in màu 02',
    src: '/images/hoa-don/hoa-don-a6-mau-02.webp',
  },
]

const filterLabels = {
  all: 'Tất cả mẫu',
  A4: 'A4',
  A5: 'A5',
  A6: 'A6',
  red: 'Mực đỏ',
  blue: 'Mực xanh',
  black: 'Mực đen',
  color: 'In màu',
}

function getFirstIndexByFilter(filter) {
  if (filter === 'all') {
    return 0
  }

  const matchedIndex =
    hoaDonGalleryImages.findIndex((item) => {
      return item.size === filter || item.ink === filter
    })

  return matchedIndex >= 0 ? matchedIndex : 0
}

export function HoaDonHero() {
  setTimeout(() => {
    const imageEl =
      document.querySelector('#hoa-don-gallery-image')

    const titleEl =
      document.querySelector('#hoa-don-gallery-title')

    const groupEl =
      document.querySelector('#hoa-don-gallery-group')

    const counterEl =
      document.querySelector('#hoa-don-gallery-counter')

    const prevBtn =
      document.querySelector('#hoa-don-gallery-prev')

    const nextBtn =
      document.querySelector('#hoa-don-gallery-next')

    const filterButtons =
      document.querySelectorAll('[data-invoice-gallery-filter]')

    const lightbox =
      document.querySelector('#hoa-don-lightbox')

    const lightboxOverlay =
      document.querySelector('#hoa-don-lightbox-overlay')

    const lightboxImage =
      document.querySelector('#hoa-don-lightbox-image')

    const lightboxTitle =
      document.querySelector('#hoa-don-lightbox-title')

    const lightboxClose =
      document.querySelector('#hoa-don-lightbox-close')

    let currentIndex = 0
    let activeFilter = 'all'

    function updateActiveButtons() {
      filterButtons.forEach((button) => {
        const isActive =
          button.dataset.invoiceGalleryFilter === activeFilter

        button.classList.toggle('bg-orange-500', isActive)
        button.classList.toggle('text-white', isActive)
        button.classList.toggle('border-orange-500', isActive)

        button.classList.toggle('bg-black', !isActive)
        button.classList.toggle('text-gray-300', !isActive)
        button.classList.toggle('border-zinc-700', !isActive)
      })
    }

    function renderGallery() {
      if (currentIndex >= hoaDonGalleryImages.length) {
        currentIndex = 0
      }

      if (currentIndex < 0) {
        currentIndex = hoaDonGalleryImages.length - 1
      }

      const currentImage =
        hoaDonGalleryImages[currentIndex]

      imageEl.src =
        currentImage.src

      imageEl.alt =
        currentImage.title

      titleEl.textContent =
        currentImage.title

      groupEl.textContent =
        `Đang xem: ${filterLabels[activeFilter] || 'Tất cả mẫu'}`

      counterEl.textContent =
        `${currentIndex + 1}/${hoaDonGalleryImages.length}`

      updateActiveButtons()
    }

    function openLightbox() {
      const currentImage =
        hoaDonGalleryImages[currentIndex]

      lightboxImage.src =
        currentImage.src

      lightboxImage.alt =
        currentImage.title

      lightboxTitle.textContent =
        currentImage.title

      lightbox.classList.remove('hidden')
      lightbox.classList.add('flex')

      trackEvent('open_invoice_gallery_lightbox', {
        page: 'hoa_don',
        image: currentImage.src,
      })
    }

    function closeLightbox() {
      lightbox.classList.add('hidden')
      lightbox.classList.remove('flex')
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter =
          button.dataset.invoiceGalleryFilter

        currentIndex =
          getFirstIndexByFilter(activeFilter)

        renderGallery()

        trackEvent('click_invoice_gallery_filter', {
          page: 'hoa_don',
          filter: activeFilter,
        })
      })
    })

    prevBtn.addEventListener('click', () => {
      currentIndex -= 1
      renderGallery()
    })

    nextBtn.addEventListener('click', () => {
      currentIndex += 1
      renderGallery()
    })

    imageEl.addEventListener('click', openLightbox)
    lightboxOverlay.addEventListener('click', closeLightbox)
    lightboxClose.addEventListener('click', closeLightbox)

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
    })

    renderGallery()
  }, 0)

  return `
    <section class="relative overflow-hidden bg-black text-white pt-28 pb-20">

      <div class="absolute top-0 right-0 w-[520px] h-[520px] bg-orange-500/20 blur-[140px]"></div>
      <div class="absolute bottom-0 left-0 w-[360px] h-[360px] bg-orange-500/10 blur-[120px]"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">

        <div class="grid lg:grid-cols-2 gap-14 items-center">

          <!-- Left Content -->
          <div>
            <p class="text-orange-500 font-semibold tracking-[0.2em] uppercase mb-5">
              In hóa đơn - Phiếu thu - Biểu mẫu
            </p>

            <h1 class="text-white text-5xl md:text-7xl font-black leading-tight mb-8">
              In hóa đơn,
              <br>
              biểu mẫu cho
              <br>
              cửa hàng
            </h1>

            <p class="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              IST nhận in hóa đơn bán hàng, phiếu thu, phiếu chi, biên nhận,
              phiếu giao hàng và các loại biểu mẫu ghi chép cho shop, quán ăn,
              cơ sở kinh doanh và doanh nghiệp nhỏ.
            </p>

            <div class="flex flex-wrap gap-4">
              <a
                href="#calculator"
                onclick="
                  trackEvent('click_cta', {
                    page: 'hoa_don',
                    button: 'xem_bang_gia'
                  })
                "
                class="bg-orange-500 text-white hover:bg-orange-600 transition px-7 py-4 rounded-xl font-bold"
              >
                Xem giá tham khảo
              </a>

              <a
                href="#faq"
                class="text-white border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition px-7 py-4 rounded-xl font-bold"
              >
                Câu hỏi thường gặp
              </a>
            </div>
          </div>

          <!-- Right Gallery -->
          <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-6">

            <!-- Main Image -->
            <div class="relative overflow-hidden rounded-2xl bg-black border border-zinc-800">

              <img
                id="hoa-don-gallery-image"
                src="/images/hoa-don/og-hoa-don.webp"
                alt="Mẫu hóa đơn IST"
                class="w-full aspect-[4/3] object-cover cursor-zoom-in"
              >

              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                <div class="flex items-end justify-between gap-4">
                  <div>
                    <p
                      id="hoa-don-gallery-title"
                      class="text-white font-bold"
                    >
                      In hóa đơn - Phiếu thu - Biểu mẫu IST
                    </p>

                    <p
                      id="hoa-don-gallery-group"
                      class="text-gray-400 text-sm mt-1"
                    >
                      Đang xem: Tất cả mẫu
                    </p>
                  </div>

                  <p
                    id="hoa-don-gallery-counter"
                    class="shrink-0 rounded-full bg-black/70 border border-zinc-700 px-3 py-1 text-xs text-gray-300"
                  >
                    1/1
                  </p>
                </div>
              </div>

              <button
                id="hoa-don-gallery-prev"
                type="button"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-zinc-700 text-white hover:bg-orange-500 hover:border-orange-500 transition"
              >
                ‹
              </button>

              <button
                id="hoa-don-gallery-next"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-zinc-700 text-white hover:bg-orange-500 hover:border-orange-500 transition"
              >
                ›
              </button>

            </div>

            <!-- Size Buttons -->
            <div class="grid grid-cols-4 gap-3 mt-5">

              <button
                type="button"
                data-invoice-gallery-filter="all"
                class="rounded-2xl border border-orange-500 bg-orange-500 p-4 text-left text-white hover:border-orange-500 transition"
              >
                <span class="block font-black text-xl">
                  Tất cả
                </span>

                <span class="block text-sm mt-1">
                  mẫu hóa đơn
                </span>
              </button>

              <button
                type="button"
                data-invoice-gallery-filter="A4"
                class="rounded-2xl border border-zinc-700 bg-black p-4 text-left text-gray-300 hover:border-orange-500 transition"
              >
                <span class="block font-black text-2xl">
                  A4
                </span>

                <span class="block text-sm mt-1">
                  nhiều thông tin
                </span>
              </button>

              <button
                type="button"
                data-invoice-gallery-filter="A5"
                class="rounded-2xl border border-zinc-700 bg-black p-4 text-left text-gray-300 hover:border-orange-500 transition"
              >
                <span class="block font-black text-2xl">
                  A5
                </span>

                <span class="block text-sm mt-1">
                  phổ biến
                </span>
              </button>

              <button
                type="button"
                data-invoice-gallery-filter="A6"
                class="rounded-2xl border border-zinc-700 bg-black p-4 text-left text-gray-300 hover:border-orange-500 transition"
              >
                <span class="block font-black text-2xl">
                  A6
                </span>

                <span class="block text-sm mt-1">
                  nhỏ gọn
                </span>
              </button>

            </div>

            <!-- Ink Buttons -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">

              <button
                type="button"
                data-invoice-gallery-filter="red"
                class="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
              >
                Mực đỏ
              </button>

              <button
                type="button"
                data-invoice-gallery-filter="blue"
                class="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
              >
                Mực xanh
              </button>

              <button
                type="button"
                data-invoice-gallery-filter="black"
                class="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
              >
                Mực đen
              </button>

              <button
                type="button"
                data-invoice-gallery-filter="color"
                class="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-500 transition"
              >
                In màu
              </button>

            </div>

          </div>

        </div>

      </div>

      <!-- Image Lightbox -->
      <div
        id="hoa-don-lightbox"
        class="fixed inset-0 z-[999] hidden items-center justify-center bg-black/85 p-4"
      >
        <div
          id="hoa-don-lightbox-overlay"
          class="absolute inset-0"
        ></div>

        <div class="relative z-10 w-full max-w-5xl">
          <button
            id="hoa-don-lightbox-close"
            type="button"
            class="absolute -top-12 right-0 rounded-xl border border-zinc-700 bg-black px-4 py-2 text-sm font-bold text-white hover:border-orange-500 hover:text-orange-500 transition"
          >
            Đóng
          </button>

          <img
            id="hoa-don-lightbox-image"
            src="/images/hoa-don/og-hoa-don.webp"
            alt="Xem mẫu hóa đơn lớn"
            class="w-full max-h-[82vh] object-contain rounded-2xl border border-zinc-800 bg-black"
          >

          <p
            id="hoa-don-lightbox-title"
            class="mt-3 text-center text-white font-bold"
          >
            In hóa đơn - Phiếu thu - Biểu mẫu IST
          </p>
        </div>
      </div>

    </section>
  `
}