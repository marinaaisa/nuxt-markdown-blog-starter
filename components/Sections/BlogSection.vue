<template>
  <section>
    <div class="blogs__top">
      <div>
        <h2>{{ $t('posts') }}</h2>
        <span class="emoji-title emoji--writing"/>
      </div>
      <LangSwitcher/>
    </div>
    <ul class="blogs">
      <blog-card
        v-for="blog in blogs"
        :key="blog.name"
        :blog="blog" />
    </ul>
  </section>
</template>
<script>
import BlogCard from "~/components/BlogCard.vue";
import LangSwitcher from '~/components/LangSwitcher'

export default {
  components: { BlogCard, LangSwitcher },
  props: {
    blogs: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
.blogs {
  margin: 0;
  
  @media (min-width: $screen-sm){
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    display: grid;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 4rem;
  }
}
</style>

