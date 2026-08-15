import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    image: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1).optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    author: z.string().trim().min(1).optional(),
    draft: z.boolean().default(false),
    canonical: z.string().trim().min(1).optional(),
  }),
})

export const collections = { blog }
