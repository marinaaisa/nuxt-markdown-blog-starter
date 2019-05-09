<template>
  <div class="layout">
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false" />
    <nuxt class="nuxt-content"/>
    <Footer/>
  </div>
</template>
<script>
  import TheHeader from '~/components/TheHeader'
  import TheSidenav from '~/components/Navigation/TheSideNav'
  import Footer from '~/components/Sections/Footer'

  export default {
    components: {
      Footer,
      TheHeader,
      TheSidenav
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
