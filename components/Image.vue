<template lang="html">
  <div v-lazy-container="{ selector: 'img' }" :class="`image-placeholder ${hasRadius}`">
    <img :data-src="imageRequired" :data-loading="imageRequired.placeholder" :width="width" :height="height" :class="classes" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String
    },
    alt: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    classes: {
      type: String
    },
    alt: {
      type: String
    },
    radius: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageRequired () {
      return require(`../assets/images/${this.imageURL}`)
    },
    hasRadius () {
      return this.radius ? 'image-placeholder--radius' : ''
    }
  }
}
</script>

<style scoped lang="scss">

.image-placeholder {
  overflow: hidden;
  line-height: 0;

  &--radius {
    border-radius: 100%;
  }
}

img {
  transition: all ease .3s;
  opacity: 0;

  &[lazy='loading'] {
    opacity: 1;
    filter: blur(15px);
  }
  &[lazy='loaded'] {
    opacity: 1;
  }
}

</style>
