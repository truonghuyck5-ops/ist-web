import { blogPosts } from '../data/blogPosts'

export function RelatedPosts(currentSlug) {

  const relatedPosts =
    blogPosts.filter(
      post => post.slug !== currentSlug
    )

  if (!relatedPosts.length) {
    return ''
  }

  return `
    <section class="mt-24 border-t border-zinc-800 pt-16">

      <div class="flex items-end justify-between mb-10">

        <div>

          <p class="text-orange-500 font-semibold tracking-widest mb-4">
            BLOG IST
          </p>

          <h2 class="text-4xl font-black">
            Bài viết liên quan
          </h2>

        </div>

      </div>

      <div class="grid md:grid-cols-2 gap-10">

        ${relatedPosts
          .map(post => `

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

                  class="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div class="p-8">

                <p class="text-orange-500 text-sm font-semibold mb-4">
                  ${post.category}
                </p>

                <h3 class="text-2xl font-bold mb-4 group-hover:text-orange-500 transition">
                  ${post.title}
                </h3>

                <p class="text-gray-400 leading-relaxed">
                  ${post.description}
                </p>

              </div>

            </a>

          `)
          .join('')}

      </div>

    </section>
  `
}