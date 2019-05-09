<script lang="js">
  import InlineCode from './InlineCode.vue'
  import hljs from 'highlight.js/lib/highlight'
  import javascript from 'highlight.js/lib/languages/javascript'
  import css from 'highlight.js/lib/languages/css'
  import xml from 'highlight.js/lib/languages/xml'
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('css', css)
  hljs.registerLanguage('xml', xml)
  import 'highlight.js/styles/a11y-light.css'

  export default {
    props: ["renderFunc", "staticRenderFuncs", "extraComponent"],

    components: {
      InlineCode
    },

    computed: {
      initHighlightJs () {
        let targets = document.querySelectorAll('code')
        targets.forEach((target) => {
          hljs.highlightBlock(target)
        })
      },
      extraComponentLoader () {
        if (!this.extraComponent) {
          return null
        }
        return () => import(`~/components/blog/${this.extraComponent}.vue`)
      }
    },

    mounted() {
      this.initHighlightJs
    },

    render (createElement) {
      return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
    },

    created () {
      this.templateRender = new Function(this.renderFunc)()
      this.$options.staticRenderFns = new Function(this.staticRenderFuncs)()
    }
  }
</script>