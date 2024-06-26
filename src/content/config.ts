import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().refine(
        (img) => img.width === 1024 && img.height === 512
      ),
      heroImageAlt: z.string(),
      wip: z.boolean().optional(),
    }),
});

const problem = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({}) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { blog, problem };
