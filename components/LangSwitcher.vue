<template>
  <select v-model="selected" @change="changeLocale()" class="lang-switcher">
    <option :value="selected" selected>{{ $i18n.locale }}</option>
    <option v-for="locale in $i18n.locales" v-if="locale.code !== $i18n.locale" :key="locale.code" >
      {{ locale.code }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'LangSwitcher',
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    changeLocale () { 
      this.$router.push(this.switchLocalePath(this.selected));
    } 
  }
}
</script>
<style lang="scss">
select {
  border-radius: 0;
  color: $primary;
  padding: 1rem 3rem 1rem 1rem;
  border: 1px solid transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 50'><polygon fill='rgb(108, 92, 255)' points='0,0 100,0 50,50'/></svg>") no-repeat;
  background-size: 12px;
  background-position: calc(100% - 1rem) center;
  background-repeat: no-repeat;
  text-transform: uppercase;
  transition: border-color .3s;
  cursor: pointer;

  &:hover {
    border-color: $primary;
  }
  
  &:focus {
    outline: none;
  }
}
</style>
