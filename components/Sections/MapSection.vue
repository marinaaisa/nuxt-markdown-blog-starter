<template>
  <section class="map">
    <div class="map__container">
      <h2 v-html="$t('map.title')"/>
      <div class="map__content">
        <div class="map__text">
          <p v-html="$t('map.content')"/>
        </div>
        <div class="map__map">
          <Map :visited="this.visited" :lived="this.lived"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Map from "~/components/Map.vue";
export default {
  components: { Map },
  data () {
    return {
      visited: [
        'AT', 'PL', 'KH', 'DK', 'BG', 'CZ', 'EE', 'FR', 'DE', 'EE',
        'FR', 'DE', 'HU', 'IE', 'IT', 'NL', 'NO', 'RU', 'SE', 'CH',
        'UA', 'US', 'GB', 'ID', 'MY', 'TH', 'VN'
      ],
      lived: [
        'ES', 'FI', 'CN', 'BE'
      ]
    }
  }
}
</script>
<style lang="scss">
.map {
  position: relative;

  &__content {
    display: flex;
    flex-direction: column;

    @media (min-width: $screen-sm){
      align-items: center;
      flex-direction: row;
    }
  }

  &__text {
    width: 100%;
    @media (min-width: $screen-sm){
      padding-right: 4rem;
      width: 30%;
    }
  	&--visited {
      color: $primary;
    }
    &--lived {
      color: $secondary;
    }
  }
  &__map {
    width: 100%;
    @media (min-width: $screen-md){
      width: 70%;
    }
  }
}
</style>


