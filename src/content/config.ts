import { defineCollection, z } from 'astro:content';

// Products Collection
const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    urlSlug: z.string(), // renamed from 'slug' to avoid conflict with Astro's reserved slug
    category: z.enum(['medical', 'cosmetic']),
    tagline: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string().optional(),
      positionX: z.number().default(50),
      positionY: z.number().default(50),
      scale: z.number().default(100),
    }),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })).optional(),
    specs: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    order: z.number().default(0),
  }),
});

// News Collection
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    thumbnail: z.string().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
  }),
});

// Pages Collection (for CMS-editable content)
const pagesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Will be flexible based on page type
  }).passthrough(),
});

export const collections = {
  products: productsCollection,
  news: newsCollection,
  pages: pagesCollection,
};
