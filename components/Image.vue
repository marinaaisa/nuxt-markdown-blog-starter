<template lang="html">
  <div
    v-lazy-container="{ selector: 'img' }"
    :class="`image-placeholder ${isRounded}`"
  >
    <img
      :data-src="imageRequired"
      :data-loading="imageRequired.placeholder"
      :width="width"
      :height="height"
      :class="classes"
      :alt="alt"
    />
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
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageRequired () {
      return require(`../assets/images/${this.imageURL}`)
    },
    isRounded () {
      return this.rounded ? 'image-placeholder--rounded' : ''
    }
  }
}
</script>

<style scoped lang="scss">

.image-placeholder {
  overflow: hidden;
  line-height: 0;

  &--rounded {
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
