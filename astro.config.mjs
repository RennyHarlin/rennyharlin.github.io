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

export default defineConfig({
  site: 'https://rennyharlin.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
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
