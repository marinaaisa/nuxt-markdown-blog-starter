<template>
  <header
    class="the-header"
  >
    <div class="container">
      <nuxt-link :to="localePath('index')" class="the-header__link-logo">
        <img src="~/assets/images/logo-marina.svg" alt="Logo Marina" class="the-header__logo">
      </nuxt-link>
      <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
      <div class="navigation-items">
        <LangSwitcher v-if="altRoutes"/>
        <NavItems/>
      </div>
    </div>
  </header>
</template>

<script>
import NavItems from '~/components/Navigation/NavItems'
import LangSwitcher from '~/components/LangSwitcher'
import TheSideNavToggle from "~/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle, LangSwitcher, NavItems
  },
  computed: {
    altRoutes () {
      return this.$route.path === '/' || this.$route.path === '/es' || this.$route.path === '/blog' || this.$route.path === '/es/blog'
    }
  }
};
</script>


<style lang="scss">

.the-header {
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0,0,0,.05);
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.05);
  background-color: white;

  @media (min-width: $screen-sm){
    height: 8rem;
  }

  &__logo {
    height: 100%;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__link-logo {
    line-height: 0;
  }

  a {
    color: $grey-1;
  }
}

.logo {
  font-size: 1.3rem;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item ~ .nav-item{
  @media (min-width: $screen-sm){
    margin-left: 2rem;
  }
}

</style>
