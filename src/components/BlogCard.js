export function BlogCard(post) {

  return `
    <a
      href="/blog/${post.slug}.html"
      class="group border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500 transition duration-500"
    >

      <div class="overflow-hidden">

        <img
          src="${post.image}"
          alt="${post.title}"

          loading="lazy"
          decoding="async"

          class="w-full h-72 object-cover group-hover:scale-105 transition duration-700"
        />

      </div>

      <div class="p-8">

        <p class="text-orange-500 text-sm font-semibold mb-4">
          ${post.category}
        </p>

        <h2 class="text-3xl font-bold mb-5 group-hover:text-orange-500 transition">
          ${post.title}
        </h2>

        <p class="text-gray-400 leading-relaxed">
          ${post.description}
        </p>

      </div>

    </a>
  `
}