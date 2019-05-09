<template>
  <section class="call-to-action">
    <div class="call-to-action__container">
      <div class="call-to-action__image">
        <ImageResponsive
          imageURL="professionals.png"
          classes="cardThumbnail"
          width="952"
          height="509"
          alt="Profesionales"
        />
      </div>
      <div class="call-to-action__text">
        <p v-html="$t('callAction')"/>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.call-to-action {
  background: $background-primary-darker;

  &__container {
    @extend .container;
    position: relative;
    @media (min-width: $screen-sm){
      display: flex;
      align-items: center;
    }
  }
  &__image {
    display: table-cell;
    padding: 2rem 0;
    text-align: center;
    @media (min-width: $screen-sm){
      display: table-cell;
      text-align: left;
      padding: 5rem 5rem 5rem 0;
    }
    img {
      width: 50%;
    }
  }
  &__text {
    width: 100%;
    vertical-align: middle;
    text-align: center;
    position: relative;
    padding-bottom: 2rem;
    p {
      margin: 0;
    }
    @media (min-width: $screen-sm){
      width: 40%;
      display: table-cell;
      text-align: right;
      padding-bottom: 0rem;
    }
  }
}
</style>

