<template>
  <svg class="svgIcon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="js">
  import Vue from "vue";
  // import Component from "nuxt-class-component";

  const files = require.context("assets/icons", true, /\.svg$/);
  files.keys().forEach(files);

  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss">
</style>
