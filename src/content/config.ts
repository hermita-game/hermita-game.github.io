import { z, defineCollection } from 'astro:content';

const engineeringBlog = defineCollection({
  schema: {
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  },
});

export const collections = {
  posts: engineeringBlog,
};