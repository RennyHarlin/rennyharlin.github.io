import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  const posts = await getCollection("blogs", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
