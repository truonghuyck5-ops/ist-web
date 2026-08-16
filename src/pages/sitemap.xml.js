import { getCollection } from 'astro:content'
import { absoluteUrl } from '../utils/seo'

const staticPaths = ['/', '/bang-hieu/', '/combo-mo-quan/', '/tem-nhan/', '/hoa-don/', '/blog/']

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  const paths = [
    ...staticPaths,
    ...posts.map((post) => `/blog/${post.id}/`),
  ]
  const urls = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
