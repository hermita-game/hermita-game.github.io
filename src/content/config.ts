import { z, defineCollection } from 'astro:content';

const engineeringBlog = defineCollection({
  schema: {
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    daygap: z.number().optional(),
  },
});

export const collections = {
  posts: engineeringBlog,
};