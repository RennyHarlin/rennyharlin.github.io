# rennyharlin.github.io

My blog, built with [Astro](https://astro.build) and Tailwind. Pushing to `main` deploys it to GitHub Pages.

## Writing a post

Add a Markdown file anywhere under `src/content/posts/`. Its path becomes the URL:
`src/content/posts/ai/my-post.md` → `/posts/ai/my-post/`.

```md
---
title: 'My Post'
description: 'One line for search results and link previews.' # optional
date: 2026-11-08
topics: ['Artificial Intelligence']   # one or more; each gets a page under /topics/
draft: true                           # optional; drafts only show in `npm run dev`
---

Inline math: $e^{i\pi} + 1 = 0$

$$ \hat{y} = (A^TA)^{-1}A^Ty $$
```

Images go in `public/imgs/` and are linked as `/imgs/...`.
A topic's optional blurb lives in `src/site.ts`, alongside the site title, intro and social links.

## Running locally

Needs Node 22.23.4 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```
