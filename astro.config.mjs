import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDisplayMath from './src/remark-display-math.mjs';

// Old Hugo URLs -> new ones, so existing links and search results keep working.
const oldTopics = {
  'series/introduction-to-machine-learning': 'introduction-to-machine-learning',
  'series/math-for-machine-learning': 'math-for-machine-learning',
  'categories/artificial-intelligence': 'artificial-intelligence',
  'categories/big-data': 'big-data',
  'categories/computer-science': 'computer-science',
  'categories/computer-security': 'computer-security',
  'categories/hugo': 'hugo',
  'categories/robotics': 'robotics',
  'categories/statistics': 'statistics',
};

// Post URL path -> last modified date (`updated`, else `date`), for <lastmod> in the sitemap.
// Slugs mirror Astro's: each path segment lowercased with punctuation dropped (ax=b.md -> axb).
function postLastModified() {
  const dir = 'src/content/posts';
  const dates = new Map();
  for (const file of fs.readdirSync(dir, { recursive: true })) {
    const rel = String(file).replaceAll('\\', '/');
    if (!rel.endsWith('.md') || rel.split('/').pop().startsWith('_')) continue;
    const frontmatter = fs.readFileSync(path.join(dir, rel), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const field = (key) => frontmatter.match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+)`, 'm'))?.[1];
    if (field('draft') === 'true') continue;
    const slug = rel
      .replace(/\.md$/, '')
      .split('/')
      .map((s) => s.toLowerCase().replace(/[^\w\- ]/g, '').replace(/ /g, '-'))
      .join('/');
    dates.set(`/posts/${slug}/`, new Date(field('updated') ?? field('date')));
  }
  return dates;
}
const lastModified = postLastModified();
const newestPost = new Date(Math.max(...lastModified.values()));

export default defineConfig({
  site: 'https://rennyharlin.github.io',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const { pathname } = new URL(item.url);
        const date = lastModified.get(pathname) ?? (['/', '/posts/'].includes(pathname) ? newestPost : undefined);
        if (date) item.lastmod = date.toISOString();
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    // Math is rendered to HTML at build time by KaTeX, so pages ship no math JavaScript.
    processor: unified({ remarkPlugins: [remarkMath, remarkDisplayMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  redirects: {
    '/archives': '/posts/',
    '/categories': '/topics/',
    '/series': '/topics/',
    ...Object.fromEntries(Object.entries(oldTopics).map(([from, to]) => [`/${from}`, `/topics/${to}/`])),
  },
});
