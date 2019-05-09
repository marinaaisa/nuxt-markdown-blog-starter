<template>
	<section id="about">
		<h2>{{ $t('about.title') }}</h2>
		<span class="emoji-title emoji--thinking"/>
		<p v-html="$t('about.content')" class="about__content"/>
	</section>
</template>
<style lang="scss">
.about {
	&__content {
		font-size: 21px;
		line-height: 1.7;
    letter-spacing: -.2px;
	}

	&__highlight {
		color: $secondary;
	}
}
</style>

