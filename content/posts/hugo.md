---
date: '2025-12-01T06:41:43+05:30'
draft: false
title: 'Make your own site like me using Hugo with PaperMod theme'
categories: ['Hugo']
tags: ["hugo", "papermod", "github-pages"]
---

This blog will help you build your own blog site using Hugo with PaperMod theme and deploy it in github pages for $0

## 1. What is Hugo ?

Hugo is a fast static site generator. It converts Markdown files into a full HTML, CSS, and Javascript site using a theme.

### Advantages:
- Extremely fast serving after deployment
- Intuitive folder based structure
- Great for blogs and portfolios
- Works effortlessly with Github Pages

## 2. Prerequisites
- Make sure git is installed. git will help you deploy your site to Github pages as well as add themes to your hugo site
> If you don't have git, please refer to: [Git Installation](https://git-scm.com/install/windows)
- Install Go, which is one of the dependencies of hugo
> If you don't have Go, please refer to: [Go Installation](https://go.dev/doc/install)
- Install Dart Sass, this is used by hugo for converting Sass to CSS
> If you don't have Sass, please refer to: [Dart Saas Installation](https://sass-lang.com/install/)


## 3. Install Hugo
Installation of Hugo in windows can be done using Winget (Microsoft's official free and open-source package manager for Windows)

```
    winget install Hugo.Hugo.Extended
```
After the above step, hugo should be accessible in the terminal. \
Verify installation using `hugo -v`

## 4. Create a new site
Create a new hugo site using the command `hugo new site <site-name> --format yaml`
Now, cd in to the site folder and open the project in  vscode or any editor of your choice.

## 5. Add a theme
Visit [hugo themes](https://themes.gohugo.io/) and select the theme you like. I personally liked PaperMod, so I selected that. So, the rest of the blog will be based on PaperMod. \
All hugo themes are documented extensively and should be a straightforward process to follow. \
But, I personally would suggest to get started with PaperMod because of its simple design and easy to configure features. \
To add PaperMod to your site, open your project root in the terminal and execute the commands in your Windows terminal.
- Initialize git
```
git init
```
- Add PaperMod as a Sub-module
```
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)
```

## 6. Add Config to hugo.yml
Copy this [example config](https://github.com/adityatelange/hugo-PaperMod/blob/exampleSite/config.yml) and paste it in your hugo.yml \
Now, your site is ready to viewed. View your site locally using `hugo server` command. 

## 7. Add a post
Create a new post using the following command 
```
hugo new posts/<post-name>.md
``` 
Your new blog is available under the `content/posts` folder. \
Now, you can start editing the post. 

```
---
date: '2025-12-01T09:27:03+05:30'
draft: true
title: 'First Post'
---
```

The above segment of a post is called front matter. Several features of a post can be controlled using the front matter. The front matter is not visible to the viewer. It is used by hugo to control several features related to a post. \
Set draft to `false`, inorder to make a post available to the viewer. If draft is `true`, the post is not visible to the viewer and can be used when drafting a blog post without making the incomplete blog post to be visible for the viewer. 

Below the front matter, you can start writing your blog post using normal markdown.

## 8. Categories and tags

Suppose you want to group posts under categories, that is also possible with PaperMod by adding `categories: ['category-1', 'category-2']` in the front matter of the post.

PaperMod also allows you to add tags to your posts by adding `tags: ['tag-1', 'tag-2']` to the front matter of the post.

All tags and categories are available in the navbar in PaperMod.

## 9. Deployment

- After completing your post, commit your changes and push it to the Github repository with the repository name `<github-username>.github.io`
- In Github, go to pages and configure source as Github Actions
- Go to browse all workflows and select Hugo
- Github will give a workflow.yml file
- Inorder for PaperMod to work, the selected Hugo version must be the latest one
- Edit the workflow.yml file with the latest Hugo version number and commit changes
- Hola! your site is live to the world.



### That's it. Thank you for reading.





