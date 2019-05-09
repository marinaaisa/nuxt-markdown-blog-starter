<template>
  <section>
    <h2>Portfolio</h2>
    <span class="emoji-title emoji--art"/>
    <ul id="works">
      <card
        v-for="work in $t('works')"
        :key="work.name"
        :work="work"
        :isWork="true" />
    </ul>
  </section>
</template>
<script>
import Card from "~/components/Card.vue";
export default {
  components: { Card }
}
</script>

