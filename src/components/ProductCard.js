export function ProductCard({
  image,
  title,
  description,
  link = '#'
}) {
  return `
    <a
      href="${link}"
      class="group block bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition duration-300 hover:-translate-y-2"
    >

      <div class="h-56 overflow-hidden">
        <img
          src="${image}"
          alt="${title}"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div class="p-8">

        <h4 class="text-2xl font-bold mb-4">
          ${title}
        </h4>

        <p class="text-gray-400 leading-relaxed mb-6">
          ${description}
        </p>

        <span class="text-orange-500 font-semibold">
          Xem chi tiết →
        </span>

      </div>

    </a>
  `
}