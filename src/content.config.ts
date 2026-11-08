import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // Files starting with _ are ignored. The path becomes the URL: ai/prompt-engineering.md -> /posts/ai/prompt-engineering/
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    topics: z.array(z.string()).default([]),
    toc: z.boolean().default(false),
  }),
});

export const collections = { posts };
