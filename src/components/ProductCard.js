export function ProductCard({
  image,
  title,
  description
}) {
  return `
    <div class="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition duration-300 hover:-translate-y-2">

      <!-- Image -->
      <div class="h-56 overflow-hidden">

        <img
          src="${image}"
          alt="${title}"
          class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

      </div>

      <!-- Content -->
      <div class="p-8">

        <h4 class="text-2xl font-bold mb-4">
          ${title}
        </h4>

        <p class="text-gray-400 leading-relaxed">
          ${description}
        </p>

      </div>

    </div>
  `
}