<template>
  <div class="subscribe">
    <div class="subscribe__box container">
      <h2>{{ $t('subscribe.title') }}</h2>
      <span class="emoji-title emoji--girl-coding"/>
      <div class="subscribe__box-content">
        <p class="subscribe__description" v-html="$t('subscribe.description')" />
        <div class="subscribe__box-form">
          <div>
            <form
              action="https://marinaaisa.us20.list-manage.com/subscribe/post?u=ddbf597cc86cdeed954e208df&amp;id=0b58667c47"
              method="post"
              name="mc-embedded-subscribe-form"
              target="_blank"
              class="newsletter__form"
              novalidate
            >
              <div class="text-input">
                <label for="mce-EMAIL" class="text-input__label">{{ $t('subscribe.form_title') }}  <span class="asterisk">*</span></label>
                <input type="email" value="" name="EMAIL" class="text-input__field">
              </div>
              <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input type="text" name="b_ddbf597cc86cdeed954e208df_0b58667c47" tabindex="-1" value="">
              </div>
              <input style="display:none;" type="checkbox" :value="$t('subscribe.groups.value')" :name="$t('subscribe.groups.name')" :id="$t('subscribe.groups.id')" checked>
              <button type="submit" name="subscribe">{{ $t('subscribe.button') }}</button>
            </form>
          </div>
          <p v-html="$t('subscribe.twitter')" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .subscribe {
    width: 100%;
    background-color: $secondary;
    margin-top: 16rem;
    padding-top: 5rem;

    &__box {
      padding: 3rem;
      margin-top: -16rem;
      background-color: white;
      box-shadow: rgba(0, 37, 49, 0.16) 0px 0px 20px 10px;
      border-radius: 1rem;

      h2 {
        font-family: 'Tiempos Headline', Arial, sans-serif;
        padding-bottom: 0;
        display: inline;
      }
    }

    &__box-content {
      display: flex;
      align-items: center;

      > * {
        width: 100%;
        @media (min-width: $screen-sm){
          width: 50%;
        }
      }
    }

    &__box-form {

      p {
        padding-top: 5px;
        width: 100% !important;
        margin: 0;
      }
      
      form {
        display: flex;
        align-items: flex-end;
        width: 100%;

        .text-input {
          margin-right: 2rem;
          width: 100%;
        }
      }
    }

    &__box-content {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;

      @media (min-width: $screen-sm){
        flex-direction: row;
      }
    }

    &__description {
      width: 100%;
      margin: 0 0 2.4rem 0;
      color: $secondary;
      @media (min-width: $screen-sm){
        width: 50%;
        margin: 0 2.4rem 0 0;
      }
    }
  }
</style>