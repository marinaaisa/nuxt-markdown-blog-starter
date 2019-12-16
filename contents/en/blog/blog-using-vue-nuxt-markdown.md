---
name: 'blog-using-vue-nuxt-markdown'
title: Website with blog and portfolio using Vue.js + Nuxt + Markdown
year: 1 January 2019
color: '#8e7964'
trans: 'blog-usando-vue-nuxt-markdown'
id: 'vue-nuxt-blog'
description: |
  How I created my new website with portfolio and blog in two languages. What technology I used and why.
---

## Why did I re-do my website with Nuxt?

Although some of you already know me, I am [Marina Aísa](https://twitter.com/MarinaAisa), UX Engineer (design and front-end) and I currently work at [Holaluz](https://www.holaluz.com/en).

Last year, 2018, I was very focused on learning more about JavaScript, which was a pending subject and at the same time I learnt [Vue.js](https://vuejs.org/). Meanwhile at my workplace, we started using [Nuxt.js](https://nuxtjs.org/) a framework on VueJS to remake both company's static and dynamic (SPA) webapps into components and create a design system with it.

My previous website was made with [Middleman](https://middlemanapp.com/) a static pages generator based on Ruby, so I took the opportunity to redo my website with Nuxt and Vue, in order to:
- To learn
- Improve performance
- Add functionality as a blog and portfolio system
- Add two languages, Spanish and English, **also in blog posts** but independently, since I guess I won't translate every post in both languages.

What attracts me the most of Nuxt is the philosophy *serverless* (Nuxt can also be SSR tho) and the static prerendering it provides to SPA applications. Briefly, with this stack you can combine the best of a static website: compiled HTML -> what leads to a better SEO, plus the best of a *single page application*: Webpack, cache optimizations, lazy-loading, functions and asynchronous data...

## But where do I get the content if I don't have a server?

Nuxt, by following the architecture [JAMStack](https://jamstack.org/) is built to get content through APIs, so many people use headless CMSs like [Contentful](https://www.contentful.com/) or [Prismic](https://prismic.io/). At first I thought they were interesting options but I realized that it wasn't necessary for a website like mine since CMSs are oriented to be used by people without technical knowledge, besides they are expensive, they save assets on their own servers and they aren't the best option if I wanted to have the best performance.

**Therefore, I decided to use a Markdowns system that I store in Github and call dynamically.**

### Importing posts on the main page depending on the language

Using the asynchronous function `asyncData` that Nuxt provides only in its pages (it is not avalaible in its components) I import the Markdowns that I have saved in the folder `content` of the project. Later I return them in the form of a promise as an array of objects. As you can see below, this import depends on the constant `blogs` which will be the array `blogsEs` or `blogsEn` depending on the language of the page stored on the Vuex's state.

```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsEs from '~/contents/es/blogsEs.js'

async asyncData ({app}) {
  const blogs = app.i18n.locale === 'en' ? blogsEn : blogsEs
  
  async function asyncImport (blogName) {
    const wholeMD = await import(`~/content/${app.i18n.locale}/blog/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog)))
  .then((res) => {
    return {
      blogs: res
    }
  })
}
```

The reason why I'm importing the arrays containing the blogs names is because I want to use it also to generate the static pages through the object [generate](https://nuxtjs.org/api/configuration-generate/) in the Nuxt configuration, file `nuxt.config.js`.

```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsEs from '~/contents/es/blogsEs.js'

generate: {
  routes: [
    '/es', '404'
  ]
  .concat(blogsEn.map(blog => `/blog/${blog}`))
  .concat(blogsEs.map(blog => `es/blog/${blog}`))
}
```

### Generating dynamic pages from Markdown files

Nuxt has a very interesting functionality, the creation of [dynamic routes](https://nuxtjs.org/guide/routing/#dynamic-routes).

In the next import I use the function `asyncData` instead of `data` as it's usual in Vue, to first import each Markdown and then return a new object with the information I want to use in the template of the page.
**The URL will be equal to each markdown file's name.**
In the case that the md file doesn't exist it will simply go to error page 404.

```javascript
async asyncData ({params, app}) {
  const fileContent = await import(`~/contents/${app.i18n.locale}/blog/${params.slug}.md`)
  const attr = fileContent.attributes
  return {
    colors: attr.colors,
    date: attr.date,
    description: attr.description,
    id: attr.id,
    name: params.slug,
    related: attr.related,
    renderFunc: fileContent.vue.render,
    staticRenderFuncs: fileContent.vue.staticRenderFns,
    title: attr.title,
    urlTranslation: attr.urlTranslation
  }
}
```

If we wanted to create a portfolio in the future, it would be exactly the same as the blog. We would create within `contents` a folder called `portfolio` and we would do the same process that we have done with `blogs`.

The loader for Webpack Markdown files that I use is: [frontmatter-markdown-loader](https://www.npmjs.com/package/frontmatter-markdown-loader) that allows me to put Vue components inside markdown files, as well as extract the `frontmatter` attributes as they do static generators like Jekyll. For making the code look pretty I apply: [HighlightJS](https://highlightjs.org/)

## Let's talk about performance

Do you remember that before I told you that one of my motivations for creating this website was to have a blog that had a good performance?
With Nuxt I have achieved it, and I still have a lot to optimize.

If you have arrived here, you have probably thought: *"OMG Marina, you could just have made a blog in [Medium](https://medium.com/) and save you all this crazy work"* and right now you're going to understand why I don't like Medium.

While writing in Medium **you don't have control over your blog** such as CSS, SEO, adding functionalities, **Medium owns your content**, you have a limit of articles read for free... and **their performance seems quite bad**

Thanks to Google's tool [Lighthouse](https://developers.google.com/web/fundamentals/performance/audit/) we can analyze and compare Medium with my website.

<image-responsive
    imageURL="blog/vue-nuxt-blog/performance.jpg"
    :width="'952'"
    :height="'509'"
    alt="performance" />

As you can see, Medium does a lot of things well, but performance is not one of them. This translates into user experience as a very slow load, especially on mobile devices. **Because performance is user experience.** We'll talk more about it another day.
The interesting thing here is that with Nuxt I managed to reach a **94%** performance compared to 40% offered by Medium in the first load, but the best thing is that since using cache systems, **the second load on my website the performance is 100%** while Medium scores 60%.

## Web in two languages

To translate the web in English and Spanish I use [nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n). It is a layer above [vue-i18n](https://github.com/kazupon/vue-i18n) which has lazy-loading translations. *Nuxt-i18n* automates how translations are worked on the Vue router, simplifying it for Nuxt. I recommend it for the router, although it has some things that I couldn't managed to make it work as the redirection cookie based on the browser language. But it's a problem that you have to accept if you use a new framework like Nuxt is.

## Features and improvements I want to add in the future

- I am not very happy with the amount of JS that I am putting into the web, I have more than 100k of synchronous JS and I want to reduce it. I still have to figure out how. My relationship with JS is love/hate. On the one hand I love everything you can do with it and on the other I hate it because it has a terrible cost on the performance of the page.

- Adding a portfolio system with dynamic pages like the blog.

- Improvements in design and usability.

- Making the web totally accessible from the design to the code.

- Cleaning CSS that I don't use and try to reduce it.

- I criticize a lot Medium but I really like its design and some of its features, in fact I would like to add its famous *clap* button to my website.

- Add comments to each post.

- Add similar posts to the one you've read.

## Things about the webapp that I'll write another day

- Lazy loading of components and images in Nuxt, I will tell you which packages I use and the component I did to render a first image as a *placeholder* in base64 and afterwards asynchronously the final image.

- How to use `analyze` of Nuxt to analyze the JS generated by Webpack in our app and to optimize it.

- The big mistake I made along the way: Vuex. <nuxt-link to="/blog/vuex-what-is-when-use-it">You can read it here</nuxt-link>

- How to put emojis on your website through a sprite made in SCSS so that they always look the same regardless of the browser or device.

- Loading Vue asynchronous components with the practical example of the travel map that is in the home page.

I thought about publishing a starter about it but being realist, I wouldn't have enough time to maintain it. I think this post explains how to do it very well, but if you have any doubt left, you can always contact me at my email: [marina@marinaaisa](mailto:marina@marinaaisa.com).

Since I don't have a comments section on each post, I would love to continue the conversation on [Twitter](https://twitter.com/MarinaAisa). All feedback is welcome! If you think there is something that it can be improved, you would help me a lot.