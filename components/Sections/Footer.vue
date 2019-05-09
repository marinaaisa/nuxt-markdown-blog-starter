<template>
  <footer>
    <div class="footer__main">
      <div class="container">
        <div class="footer__contact" v-html="$t('footer.content')"/>
      </div>
    </div>
    <div class="footer__info">
      <div class="container footer__info-container">
        <div class="footer__copyright">
          © {{ year }} — <span v-html="$t('footer.credits')"/>
        </div>
        <a href="#top" class="footer__top-page">
          ^
        </a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    },
    copyright () {
      return $t('footer.content')
    }
  }
}
</script>

<style lang="scss">
.footer {
	&__main {
		padding: 50px 0;
		background-color: $background-secondary;
		border-bottom: 1px solid darken($grey-1,40%);
  }
  
	&__contact {
		text-align: center;
  }
  
	&__logo {
		height: 5rem;
		width: 18rem;
		display: inline-block;
		margin-bottom: 1em;
	}

	&__info {
		background-color: $background-secondary;
		padding: 1.5em 0;
  }
  
  &__info-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;

    @media (min-width: $screen-sm){
      flex-direction: row;
    }
  }

	&__copyright {
		text-align: center;
		@media (min-width: $screen-sm) {
			text-align: inherit;
		}
	}

	&__top-page {
		color: $text-negative;
		display: block;
		text-align: center;
		line-height: 1;
		-webkit-transition: 1s;
		-moz-transition: 1s;
    transition: 1s;
    
		@media (min-width: $screen-sm){
			text-align: right;
		}
	}
}
</style>

