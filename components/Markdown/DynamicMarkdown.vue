<script lang="js">

  export default {
    props: ["renderFunc", "staticRenderFuncs", "extraComponent"],

    computed: {
      extraComponentLoader () {
        if (!this.extraComponent) {
          return null
        }
        return () => import(`~/components/blog/${this.extraComponent}.vue`)
      }
    },

    render (createElement) {
      return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
    },

    created () {
      this.templateRender = eval(this.renderFunc)
      this.$options.staticRenderFns = eval(this.staticRenderFuncs)
    }
  }
</script>