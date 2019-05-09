---
name: 'vuex-what-is-when-use-it'
title: How Vuex works and how I used it wrong
year: 23 January 2019
color: '#edece7'
isTextColorDark: true
trans: 'vuex-que-es-cuando-utilizarlo'
id: 'vuex-what-when'
description: |
  Vuex basics, how I make my website's performance worse using it and why
---

## What is Vuex?
In short, [Vuex](https://vuex.vuejs.org/) allows you to centralize information and features of the app that are accessible through any component.

## What problem does it solve?

When you work with a library like Vue, the component information is transported from a parent component to a child component through "props" and vice versa through emiting an event that the parent component will hear. Sometimes you need to access information from one component to another which don't have the father-son relationship. How are you going to get them to comunicate then? Technically it can be done, but it can be very complicated ending up with business logic spread all over the app which it's likely to repeat itself. This is where the centralization of that information comes in with tools such as Vuex, in Vue, or Redux, in React. You can not only centralize information but also functions.

## Its structure
Vuex is distributed as follows:

- **State** (in the code <inline-code>state</inline-code>):
  - It's an object that can contain any type of information: strings, arrays or other objects.
  - It's information stored centrally throughout the app.
- **Mutations** (in the code <inline-code>mutations</inline-code>):
  - They are functions.
  - They are the only functions that can modify the state.
  - They are called by the actions.
  - They can be initialized in the component to be used through *commit* or initialized through an action.
  - They are synchronous.
- **Actions** (in the code <inline-code>actions</inline-code>):
  - They are functions.
  - They have the business logic.
  - To change the state they must call mutations via *commit*.
  - You can call other actions through *dispatch*.
  - The way to initialize them in the component is through *dispatch* or using modules.
  - They are asynchronous.
- **Getters** (in the code <inline-code>getters</inline-code>).
  - They are functions.
  - They don't change the state but they do format it so that we can use that information in the way we need it.
  - It would be very similar to a computed property in the component.
  - An example would be a function that filtered the state. It doesn't modify it but it returns a new different object with the filtered data that you need.

## How and why I used it wrong

**The fact that Vuex exists doesn't mean that all applications need it!** Remember that Vuex makes sense if the code is reused or if there are distant components that need to communicate. It doesn't make sense to do a getter if you only use it once and it doesn't communicate with another component, instead, you should create a computed property in the same component that needs it.

But I was a rookie and I thought that this idea of ​​information centralization would be great to create this webapp with blog that I explained in this <nuxt-link to="blog-using-vue-nuxt-markdown">post</nuxt-link>. In a first step I thought about importing all the markdown files in my webapp all at once through an action that would commit a mutation to finish saving all the posts in the state. So, later I would have access from the state to all the posts or to only one, as needed in each component. For example, in the dynamic page of each post I would simply do something like that and get the post I'm looking for:

```javascript
data () {
  const blogs = this.$store.state[this.$i18n.locale].blogs
  return {
    blog: blogs[params.slug]
  }
}
```

I don't use Vuex modules in the example below to make it easier to understand. We are simply calling the state that we have configured it as an array with the languages ​​of the page, (in this case we want to only remove the current language) and the type of information we want (in this case we want blogs).
We return an object that will be the object of the post URL that matches the blogs array.

In theory the state would reuse it many times, for example, to get all the posts on the home page of the web.

SO That's what I did, it made sense until here or that's what I thought. BUT NO. I was very wrong. THINK AGAIN.

The main problem of I used Vuex was SCALABILITY. It's not a problem with Vuex, but rather how I had built it by not taking into account how it works.

I had made an import of all the markdown in Vuex where I kept and managed it from there. When saving them in Vuex, all the posts were executed in the first load in the initial JS and the more posts it had, the larger it would be the payload and the longer it would take to load the webapp. Of course, once the first load passed, the web was crazy fast... but it didn't make any sense at the level of scalability.

**I'll explain my big mistake with Vuex in a non-technical example:** Thinking that milk doesn't expire, imagine that instead of buying a box of milk in the supermarket when you need it, you buy the first time all the boxes of milk that you will consume in your whole life and keep them at home. The initial cost would be tremendous and it doesn't make sense to keep things that you won't use at that time, but you will not have to go to the supermarket ever again.

This error, like so many others that I've found in this project alone, helped me to learn a lot about Vuex, when to use it and when not.

Luckily I realized my mistake before publishing this webapp and I was able to change the import system. I wrote a post about how I made this dynamic import <nuxt-link to="blog-using-vue-nuxt-markdown">here</nuxt-link>.

Since I don't have a comments section on each post, I would love to continue the conversation on [Twitter](https://twitter.com/MarinaAisa). All feedback is welcome! If you think there is something that it can be improved, write me, you will help me a lot to learn.