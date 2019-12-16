---
name: 'vuex-que-es-cuando-utilizarlo'
title: Cómo funciona Vuex y cómo lo utilicé mal
year: 23 Enero 2019
color: '#edece7'
isTextColorDark: true
trans: 'vuex-what-is-when-use-it'
id: 'vuex-what-when'
description: |
  Conceptos básicos de Vuex, cómo empeoré la performance de mi web con ello y por qué.
---
## Qué es Vuex

Abreviadamente, [Vuex](https://vuex.vuejs.org/) te permite centralizar información y funciones de la app que son accesibles a través de cualquier componente.

## Qué problema resuelve

Cuando trabajas con una librería como Vue, la información de los componentes se transporta de componente padre a componente hijo a través de "props" y viceversa a través de emitir un evento que escuchará el padre. Hay algunas veces que necesitas acceder a información de un componente desde otro sin que tengan la relación de padre e hijo. ¿Cómo la vas a obtener entonces? Técnicamente se puede hacer, pero además de ser una movida acabas con lógica de negocio repartida por cualquier componente que seguramente se repita y que en aplicaciones grandes puede ser un drama. Aquí es donde entra la centralización de esa información con herramientras como Vuex (en Vue) o Redux (en React). No solo puedes centralizar información sino también funciones. 

## La estructura para utilizar Vuex
Vuex se distribuye de la siguiente manera:

- **Estado** (en el código `state`):
  - Es un objeto que puede contener cualquier tipo de información: strings, arrays u otros objetos.
  - Es la información que almacenamos de forma centralizada en toda la app.
- **Mutaciones** (en el código `mutations`):
  - Son funciones.
  - Son las únicas funciones que pueden modificar el estado.
  - Son llamadas por las acciones.
  - Se pueden inicializar en el componente a utilizar a través de commit o inicializarse a través de una acción.
  - Son síncronas.
- **Acciones** (en el código `actions`):
  - Son funciones.
  - Poseen la lógica de negocio.
  - Para cambiar el estado deben de llamar a mutaciones a través de *commit*.
  - Pueden llamar otras acciones a través de *dispatch*. 
  - La forma de inicializarse en el componente es a través de *dispatch* o utilizando modulos.
  - Son asíncronas.
- **Getters** (en el código `getters`).
  - Son funciones.
  - No cambian el estado pero sí que lo formatean para que podemos utilizar esa información de la manera que la necesitemos.
  - Sería lo más parecido a una propiedad *computed* en el componente. 
  - Un ejemplo sería una función que filtrara el estado. No lo modifica pero te devuelve un nuevo objeto diferente con los datos filtrados que necesitas.

## Cómo y por qué yo lo utilicé mal

**¡El hecho de que exista Vuex no quiere decir que todas las aplicaciones lo necesiten! Para nada.** Recordemos que Vuex tiene sentido si se reutiliza el código o si hay si hay componentes distantes que necesiten comunicarse. No tiene sentido que hagas un getter si solo lo vas a utilizar una vez y no se comunica con otro componente, para eso crea una propiedad computed en el mismo componente que lo necesita.

Pero yo como era una novata, pensé que esta idea de centralización de información me vendría de lujo para crear esta web con blog que expliqué en este <nuxt-link to="/es/blog/blog-usando-vue-nuxt-markdown">post</nuxt-link>. En un primer paso pensé en importar todos los archivos markdown en mi webapp de una sola vez a través de una acción que comitearía una mutación para terminar guardando todos los posts en el estado. Así, después tendría acceso desde el estado a todos los posts o a uno solo, según necesitara en cada componente. Por ejemplo, en la página dinámica de cada post simplemente haría algo así y obtendría el post que busco:

```javascript
data () {
  const blogs = this.$store.state[this.$i18n.locale].blogs
  return {
    blog: blogs[params.slug]
  }
}
```

No utilizo módulos de Vuex en el ejemplo porque así se entiende mejor. Simplemente estamos llamando al estado que lo tenemos configurado como un array con los idiomas de la página, (en este caso queremos que solo nos saque los del idioma actual) y el tipo de información que queremos (en este caso queremos blogs).
Devolvemos un objeto que será el objeto de la URL del post que coincida con el array blogs.

En teoría el estado lo reutilizaría muchas veces, por ejemplo, para sacar todos los posts en la página home de la web.

Así lo hice, tenía sentido hasta aquí o eso creía. PERO NO. Estaba muy equivocada. PENSÉMOSLO MEJOR.

El principal problema de cómo había planteado Vuex era la ESCALABILIDAD. No es que sea un problema de Vuex, sino de cómo yo lo había construido al no tener en cuenta cómo funciona.

Había planteado una importación de todos los markdown en Vuex donde los guardaba y gestionaba desde allí. Al guardarlos en Vuex, se ejecutaban en la primera carga en el JS inicial todos los posts y cuantos más posts tuviera más grande sería y más tardaría en cargar la web. Eso sí, una vez pasaba la primera carga, la web volaba de rápido... pero no tenía ningún sentido a nivel de escalabilidad.

**Te voy a explicar mi gran error con Vuex en un ejemplo no técnico:** Pensando que no caduca la leche, es como si en vez de comprar una caja de leche en el supermercado cuando la necesitaras, compraras la primera vez todas las cajas de leche que vas a consumir en tu vida y las guardaras en casa. El coste inicial sería tremendo y no tiene sentido guardar cosas que no vas a utilizar en ese momento, eso sí, no tendrías que volver a ir al supermercado.

Este error, como tantos que me he ido encontrando en este proyecto sola, me sirvió para aprender bastante de Vuex y de cuando utilizarlo y cuando no, con eso me quedo.

Por suerte me dí cuenta de mi error antes de publicar la web y pude cambiar el sistema de importación. Escribí un post sobre cómo hice esta importación dinámica <nuxt-link to="/es/blog/blog-usando-vue-nuxt-markdown"> aquí</nuxt-link>.

Como no tengo comentarios en el blog, me encantaría continuar la conversación en [Twitter](https://twitter.com/MarinaAisa). ¡Todo feedback es bienvenido! Si crees que hay algo que se puede mejorar me ayudarías muchísimo.