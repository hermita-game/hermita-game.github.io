declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		typeof entryMap[C][keyof typeof entryMap[C]] & Render;

	type BaseCollectionConfig<S extends import('astro/zod').ZodRawShape> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<import('astro/zod').ZodObject<S>>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends import('astro/zod').ZodRawShape>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof typeof entryMap[C]>(
		collection: C,
		entryKey: E
	): Promise<typeof entryMap[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof typeof entryMap[C]
	>(
		collection: C,
		filter?: (data: typeof entryMap[C][E]) => boolean
	): Promise<(typeof entryMap[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		import('astro/zod').ZodObject<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			injectedFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"posts": {
"blog.md": {
  id: "blog.md",
  slug: "blog",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"inventaire.md": {
  id: "inventaire.md",
  slug: "inventaire",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"leveldesign.md": {
  id: "leveldesign.md",
  slug: "leveldesign",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"multijoueur.md": {
  id: "multijoueur.md",
  slug: "multijoueur",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"naissance.md": {
  id: "naissance.md",
  slug: "naissance",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
"site.md": {
  id: "site.md",
  slug: "site",
  body: string,
  collection: "posts",
  data: InferEntrySchema<"posts">
},
},

	};

	type ContentConfig = typeof import("./config");
}
