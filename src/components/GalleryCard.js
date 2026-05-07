export function GalleryCard({
  image,
  title,
  description
}) {
  return `
    <div class="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 hover:border-orange-500 transition duration-300 hover:-translate-y-2">

      <!-- Image -->
      <div class="aspect-[4/5] overflow-hidden">

        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          data-lightbox
          decoding="async"
          class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

      </div>

      <!-- Content -->
      <div class="p-6">

        <h4 class="text-2xl font-bold mb-3">
          ${title}
        </h4>

        <p class="text-gray-400 leading-relaxed">
          ${description}
        </p>

      </div>

    </div>
  `
}