<template>
  <div class="layout">
    <nuxt class="nuxt-content"/>
    <Footer/>
  </div>
</template>
<script>
  import TheSidenav from '~/components/Navigation/TheSideNav'
  import Footer from '~/components/Sections/Footer'

  export default {
    components: {
      Footer
    },
    data() {
      return {
        displaySidenav: false
      }
    }
  }
</script>
<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nuxt-content {
  flex-grow: 1;
}
</style>
