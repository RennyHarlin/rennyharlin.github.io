import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts show up in `npm run dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Topic name -> its posts, sorted by topic name. */
export function groupByTopic(posts: Post[]) {
  const topics = new Map<string, Post[]>();
  for (const post of posts) {
    for (const topic of post.data.topics) {
      topics.set(topic, [...(topics.get(topic) ?? []), post]);
    }
  }
  return [...topics].sort(([a], [b]) => a.localeCompare(b));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const readingTime = (body = '') =>
  `${Math.max(1, Math.round(body.split(/\s+/).length / 220))} min read`;
