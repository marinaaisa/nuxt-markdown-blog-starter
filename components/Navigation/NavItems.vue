<template>
  <ul class="nav-list">
    <li class="nav-item"><nuxt-link :to="localePath('index')" class="ani"><span>{{ $t('home') }}</span></nuxt-link></li>
  </ul>
</template>
<style lang="scss">
.nav-item {
  @media (max-width: $screen-sm) {
    margin-bottom: 2rem;

    a {
      color: white;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
