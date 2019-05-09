<template>
<div class="sidenav-container">
  <div
    v-if="show"
    class="sidenav-backdrop"
    @click="$emit('close')"></div>
  <transition name="slide-side">
    <div
      v-if="show"
      class="sidenav">
      <LangSwitcher v-if="altRoutes" class="lang-switcher--white"/>
      <NavItems @click="$emit('close')"/>
    </div>
  </transition>
</div>
</template>

<script>
import NavItems from '~/components/Navigation/NavItems'
import LangSwitcher from '~/components/LangSwitcher'

export default {
  name: "TheSidenav",
  components: {
    NavItems, LangSwitcher
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    altRoutes () {
      return this.$route.path === '/' || this.$route.path === '/es' || this.$route.path === '/blog' || this.$route.path === '/es/blog'
    }
  }
}
</script>


<style lang="scss">
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: auto;
  width: 100%;
  background-color: $primary;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateY(-100%);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;

  @media (min-width: $screen-sm){
    flex-direction: row;
  }
}
</style>
