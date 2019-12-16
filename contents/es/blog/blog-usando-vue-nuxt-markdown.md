---
name: 'blog-usando-vue-nuxt-markdown'
title: Web con blog y portfolio usando Vue.js + Nuxt + Markdown
year: 1 Enero 2019
color: '#8e7964'
trans: 'blog-using-vue-nuxt-markdown'
id: 'vue-nuxt-blog'
description: |
  Cómo he creado mi nueva web con portfolio y blog en dos idiomas. Qué tecnología he utilizado y por qué.
---

## ¿Por qué re-hice mi web con Nuxt?

Aunque algunos ya me conoceis, soy [Marina Aísa](https://twitter.com/MarinaAisa), UX Engineer (diseño y front-end) y actualmente trabajo en [Holaluz](https://www.holaluz.com).

El pasado año, 2018, estuve muy enfocada en aprender más de JavaScript, la cual era una asignatura pendiente y a la vez aprendí una de sus librerías, [Vue.js](https://vuejs.org/). Al mismo tiempo, en Holaluz, empezamos a utilizar [Nuxt.js](https://nuxtjs.org/), un framework sobre VueJS para rehacer tanto las webs estáticas como las dinámicas (SPA) de la empresa en componentes y poder crear un sistema de diseño con ello.

Mi web anterior estaba hecha con [Middleman](https://middlemanapp.com/), un generador de páginas estáticas basado en Ruby, así que aproveché para rehacer mi web con Nuxt y Vue, con el fin de:
- Aprender
- Mejorar la performance
- Añadir funcionalidades a la web como un blog y portfolio
- Añadir dos idiomas, español e inglés, **también en los posts del blog** pero de forma independiente, ya que cuento con algunos posts que no estén traducidos en ambos idiomas.

Lo que más me atrae de Nuxt es la filosofía *serverless* (aunque Nuxt también puede ser SSR) y el prerendering estático que proporciona a aplicaciones SPA. Resumidamente, con ello se puede combinar lo mejor de una web estática: HTML compilado, lo que conlleva mejor SEO, y lo mejor de una *single page application*: Webpack, optimizaciones de caché, lazy-loading, funciones y datos asíncronos...

## ¿De dónde saco el contenido si no tengo servidor?

Nuxt, al seguir la arquitectura [JAMStack](https://jamstack.org/), está construido para obtener contenido mediante APIs, por ello muchas personas utilizan headless CMSs como [Contentful](https://www.contentful.com/) o [Prismic](https://prismic.io/). Me parecían opciones interesantes en un principio pero me di cuenta que no era necesario para una web como la mía ya que los CMSs están orientados para ser utilizados por personas sin conocimientos técnicos, además de ser caros, guardar los assets en sus propios servidores y no ser la mejor opción si quería tener la mejor performance.

**Por ello, me decidí a utilizar un sistema de Markdowns que guardaría en Github y llamaría dinámicamente.**

### Importación de los artículos en la página principal dependiendo del idioma

Mediante la función asíncrona `asyncData` que proporciona Nuxt solo en sus páginas (no en sus componentes) hago una importación de los Markdown que tengo guardados en la carpeta `content` del proyecto. Posteriormente los devuelvo en forma de promesa como un array de objetos. Como puedes ver a continuación, la importación depende de la constante `blogs` que será el array `blogsEs` o `blogsEn` dependiendo del idioma de la página.

```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsEs from '~/contents/es/blogsEs.js'

async asyncData ({app}) {
  const blogs = app.i18n.locale === 'en' ? blogsEn : blogsEs
  
  async function asyncImport (blogName) {
    const wholeMD = await import(`~/content/${app.i18n.locale}/blog/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog)))
  .then((res) => {
    return {
      blogs: res
    }
  })
}
```

La razón por la cual tengo los arrays de los nombres de los blogs importados desde fuera es porque quiero utilizarlos también para generar las páginas de forma estática a través del objeto [generate](https://nuxtjs.org/api/configuration-generate/) en la configuración de Nuxt, fichero `nuxt.config.js`.

```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsEs from '~/contents/es/blogsEs.js'

generate: {
  routes: [
    '/es', '404'
  ]
  .concat(blogsEn.map(blog => `/blog/${blog}`))
  .concat(blogsEs.map(blog => `es/blog/${blog}`))
}
```

### Generación de páginas dinámicas a partir de archivos Markdown

Nuxt tiene una funcionalidad muy interesante y es la creación de [rutas dinámicas](https://nuxtjs.org/guide/routing/#dynamic-routes).

En la siguiente importación vuelvo a utilizar la función `asyncData` en vez de `data` como suele hacerse en Vue, para primero importar cada Markdown y después devolver un nuevo objeto con la información que quiero utilizar en el template de la página.
**En la importación juego con que la URL es igual al nombre de cada archivo markdown.** 
En el caso de que el archivo md no exista simplemente irá a la página 404.

```javascript
async asyncData ({params, app}) {
  const fileContent = await import(`~/contents/${app.i18n.locale}/blog/${params.slug}.md`)
  const attr = fileContent.attributes
  return {
    colors: attr.colors,
    date: attr.date,
    description: attr.description,
    id: attr.id,
    name: params.slug,
    related: attr.related,
    renderFunc: fileContent.vue.render,
    staticRenderFuncs: fileContent.vue.staticRenderFns,
    title: attr.title,
    urlTranslation: attr.urlTranslation
  }
}
```

Si quisieramos crear un portfolio sería exactamente igual que el blog. Crearíamos dentro de `contents` una carpeta llamada `portfolio` y haríamos el mismo proceso que hemos hecho con `blogs`.

El loader para archivos Markdown de Webpack que utilizo es: [frontmatter-markdown-loader](https://www.npmjs.com/package/frontmatter-markdown-loader) que me permite meter componentes de Vue dentro de markdown, así como extraer los atributos `frontmatter` como hacen generadores estáticos como Jekyll. Y para que el código se vea así de bonito le aplico: [HighlightJS](https://highlightjs.org/)

## Hablemos de performance

¿Recuerdas que antes te he hablado que una de mis motivaciones para crear esta web era tener un blog que tuviera una buena performance?
Con Nuxt lo he conseguido, y aún me queda bastante por optimizar.

Si has llegado hasta aquí seguramente habrás pensado: *"Vaya percal ha montado Marina, si total podía haber hecho un blog en [Medium](https://medium.com/) y ya está"* y justo ahora vas a entender por qué no me gusta Medium.

Además de que escribiendo en Medium **no tienes el control sobre tu blog** como CSS, SEO, añadir funcionalidades, el contenido **lo cedes a Medium**, tiene limitación de artículos leídos... encima, **tienen una performance que deja mucho que desear.**

Gracias a la herramienta [Lighthouse](https://developers.google.com/web/fundamentals/performance/audit/) de Google podemos analizar y comparar Medium con mi web.

<image-responsive
    imageURL="blog/vue-nuxt-blog/performance.jpg"
    :width="'952'"
    :height="'509'"
    alt="performance" />

Como ves, Medium hace muchas cosas bien pero la performance no es una de ellas. Esto se traduce en experiencia de usuario como una carga muy lenta, sobre todo en dispositivos móviles. **Porque la performance es experiencia de usuario.** Ya hablaremos más de ello otro día.
Lo interesante aquí es que con Nuxt he conseguido llegar a un **94%** de performance frente a un 40% que ofrece Medium en la primera carga, pero lo mejor es que al utilizar sistemas de caché, **la segunda vez que entres en mi web la performance es de 100%** mientras que Medium es del 60%.

## Web en dos idiomas

Para traducir la web en inglés y español utilizo [nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n). Es una capa por encima de [vue-i18n](https://github.com/kazupon/vue-i18n) la cual tiene lazy-loading de las traducciones. *Nuxt-i18n* automatiza cómo se trabajan las traducciones en el router de Vue, simplificándolo para Nuxt. Te lo recomiendo por el router, aunque el paquete en sí está un poco verde, la documentación no es la mejor y tiene algunas cosas que no he conseguido que funcionaran como la cookie de redirección en base al idioma del navegador. Pero es un problema que tienes que aceptar si utilizas un nuevo framework como es Nuxt.

## Funcionalidades y mejoras que quiero añadir en el futuro

- No estoy muy contenta con la cantidad de JS que estoy metiendo en la web, tengo un total de más de 100k de JS síncrono y quiero reducirlo. Aún tengo que averiguar el cómo. Mi relación con JS es de amor/odio. Por un lado me encanta todo lo que te permite hacer y por otro lo odio porque tiene un coste terrible en la performance de la página.

- Añadir un sistema de portfolio con páginas dinámicas como el blog.

- Mejoras en el diseño y usabilidad.

- Hacer la web totalmente accesible desde el diseño al código.

- Limpiar CSS que no utilizo e intentar reducirlo.

- Critico mucho Medium pero en verdad me gusta mucho tanto su diseño como algunas de sus funcionalidades, de hecho me gustaría añadir su famoso botón *"clap"* a mi web.

- Añadir comentarios al post.

- Añadir posts similares al que has leído.

## Cosas de la web que os contaré otro día

- Lazy loading de componentes e imágenes en Nuxt, te contaré qué paquetes utilizo y el componente propio que hice para renderizar una primera imagen *placeholder* en base64 y después de forma asíncrona la imagen final.

- Cómo utilizar `analyze` de Nuxt para analizar el JS que genera Webpack en nuestra app y poder optimizarlo.

- El gran error que cometí en el camino: Vuex. <nuxt-link to="/es/blog/vuex-que-es-cuando-utilizarlo">Ya lo puedes leer aquí</nuxt-link>.

- Cómo meter emojis en tu web a través de un sprite hecho en SCSS para que se vean siempre igual independientemente del navegador o dispositivo.

- Carga de componentes asíncronos de Vue con el ejemplo práctico del mapa que hay en la home.

Pensé en publicar un starter de Nuxt pero siendo realista no tendría tiempo para mantenerlo. Creo que este post explica muy bien cómo hacerlo, pero si te has quedado con alguna duda, siempre puedes contactarme a mi email: [marina@marinaaisa](mailto:marina@marinaaisa.com).

Como no tengo comentarios en el blog, me encantaría continuar la conversación en [Twitter](https://twitter.com/MarinaAisa). ¡Todo feedback es bienvenido! Si crees que hay algo que se puede mejorar me ayudarías muchísimo.