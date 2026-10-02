# Renny's Astro blog

A small, static Astro blog built with Markdown content collections and a reading-focused layout. The homepage lists every published post. The light/dark toggle remembers the visitor's choice and otherwise follows the system setting.

## Run locally

```sh
npm install
npm run dev
```

Use `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop` to manage the background server. Run `npm run build` to generate the static site and `npx astro check` to check Astro and TypeScript files.

## Write a post

Add a Markdown file under `src/content/blogs/`. Posts can be grouped in folders, such as `src/content/blogs/2026/my-post.md`; the folder becomes part of the URL (`/blogs/2026/my-post/`).

```md
---
title: "My post"
description: "A short summary for the post list."
date: 2026-10-02
draft: false
topics: ["web", "notes"]
---

Start the article here. Use `##` for the first section heading; the page renders
the frontmatter title as its `h1`.
```

Draft posts are excluded from the built site and homepage. The newest published posts appear first. Individual articles retain their `/blogs/` URLs; `/blogs/` itself redirects to `/`.

## Customize the design

Theme colors and typography live in `src/styles/global.css`. The shared page shell is `src/layouts/Layout.astro`. The homepage renders the post list directly in Astro; the article view is in `src/pages/blogs/[...slug].astro`. The light/dark toggle is a small Astro component in `src/components/ThemeToggle.astro`.

The site uses Tailwind CSS for layout and the typography plugin for rendered Markdown. It does not need a UI framework or client-side component runtime.
