---
name: 'disena-programa-skeletons-screens'
trans: 'design-and-code-skeletons-screens'
title: Diseña y programa responsive Skeleton Screens
year: 1 Mayo 2019
color: '#edece7'
isTextColorDark: true
noMainImage: true
extraComponent: 'Datatable'
id: 'design-and-code-skeletons-screens'
description: |
  Aprenderás a diseñar un Skeleton Screen pensando en su asincronometría y programarlo en base a modos de opacidad de Sketch o Photoshop.
---

## ¿Qué son las Skeleton Screens?

Seguramente Facebook o Linkedin han sido los principales impulsores de los llamados Skeleton Screens. Solo tienes que entrar con tu cuenta de usuario y verás una barras que se mueven y que dan la sensación de que el contenido está cargándose.

Las Skeleton Screens sirven para mostrar contenido instantáneo antes de tener el contenido final que cargamos de <strong>forma asíncrona</strong>.
¿Asíncrona? ¿qué es eso?
Contenido asíncrono es todo el contenido que tenemos que "esperar" a que se carge habiendo un retraso temporal. La gran mayoría de los casos es contenido que viene de una petición a un servidor (a través de las famosas APIs) y que esperamos desde el front-end recibirlo pero no sabemos cuándo y eso no impide que se pueda mostrar el resto de la página. Escribiré más sobre ello en otro post, por ahora es importante simplemente saber que <strong>el contenido asíncrono es el que no se carga instantáneamente, sino que tenemos que esperar para obtenerlo</strong>.

## ¿Por qué son importantes las Skeleton Screens para el UX?

Las Skeleton Screen son muy importantes porque sirven para comunicar al usuario que va a recibir un contenido próximamente. El usuario no necesita saber que estamos haciendo una petición a una API que tarda 2 segundos en devolvernos la información, simplemente necesita saber que la página no ha terminado de cargar y que pronto obtendrá esa información. Son muy parecidos a los loaders, solo que se diferencian en que se <strong>asemejan al contenido final</strong> para que el usuario sepa qué es lo que va a recibir y tener contexto.

En este post vamos a ver cómo <strong>diseñar e implementar un Skeleton Screen</strong> para un ejemplo concreto y complejo: <strong>una tabla de contenido.</strong>
Es un ejemplo real que hice para un proyecto de [Holaluz](https://www.holaluz.com/) pero he cambiado el CSS al estilo de mi web y el contenido de las tablas por bandas de música que me gustan, mucho más interesante que contratos eléctricos ;)

## Diseñar un Skeleton Screen

### Paso 1: distinguir el contenido asíncrono

Para empezar el diseño necesitamos saber qué contenido será asíncrono en la carga y qué contenido no lo será, será síncrono. Si solo nos encargamos de la parte de diseño o acabamos de aterrizar en el proyecto, tendremos que preguntar a nuestros compañeros de front-end qué contenido va a enviar la API y lo más importante: qué contenido ya sabemos que vamos a mostrar.

En este caso, yo como UX Engineer en este proyecto (trabajo en el diseño y en el desarrollo), ya tenía esta información y podía distinguir entre:
- <strong>Contenido síncrono:</strong> la estructura de la tabla con sus titulares, que tiene 3 columnas de las cuales sé su alto.
- <strong>Contenido asíncrono:</strong> el contenido de cada fila que la API devolverá como un objeto. Cada fila se divide en 3 columnas.

Este es el esquema gráfico que necesitamos saber antes de coger nuestra herramienta de diseño:

<image-responsive imageURL="blog/design-and-code-skeletons-screens/scheme.jpg" width="100%" alt="Foto del esquema donde se representa el contenido asíncrono y síncrono"/>

Los rectángulos morados representan el contenido síncrono y los rectángulos verdes el asíncrono.

### Paso 2: Vamos a diseñar el skeleton screen con elementos planos para suplir y representar el contenido asíncrono.

Y aquí viene la complicación: <strong>no sabemos cuantas columnas de contenido asíncrono nos va a devolver la API ni la longitud de su contenido</strong> y no tenemos forma de saberlo porque siempre será diferente en función del usuario o filtros. Tenemos que crear un diseño que sirva para todas las opciones posibles, ya devuelva una fila o 50 filas de contenido cuando termine la petición.

Para ello hay recursos visuales que podemos utilizar, en este caso opté por plasmar 3 filas que tuvieran opacidades diferentes hasta mezclarse en el fondo final y 3 columnas en cada fila con longitudes random.
Así conseguimos la sensación visual de que hay un contenido de filas indefinido. Y que cada fila tiene columnas de longitud indefinidas.

<image-responsive imageURL="blog/design-and-code-skeletons-screens/design.jpg" width="100%" alt="Foto del diseño final"/>

Los loaders y los skeleton screens son característicos por sus animaciones ya que hace que nuestro cerebro piense que están pasando cosas y que ese elemento está activo.

En este caso aplicaremos dos animaciones, una vertical que mostrará una fila después de otra y también las retirará una vez que estén las 3 cargadas y la más famosa, característica y difícil de hacer: una animación de izquierda a derecha donde una línea vertical recorre el contenido. Algo parecido a esto:

<img src="https://www.illuminz.com/api/wp-content/uploads/2017/12/loader.gif" alt="Loader" width="100%">

<br>

Las pequeñas animaciones no las suelo diseñar, ya que directamente las programo en CSS por rapidez y por ser realista con el tipo de animación que puedo hacer. Lo que sí que hago es buscar recursos y tener la idea en la cabeza que luego desarrollaré en CSS. Entiendo que muchos diseñadores trabajen en animaciones detalladas pero en mi caso como UX Engineer, donde puedo aplicarlas directamente en código, me es más fácil, realista y rápido de esta forma. De todas formas, si tienes que desarrollar animaciones, transiciones o flujos complejos, te recomiendo siempre diseñarlas antes. Utiliza la herramienta que necesites en el momento adecuado.

## Programar un Skeleton Screen gracias a modos de opacidad de Sketch o Photoshop

Teniendo en cuenta que ya tenemos la tabla maquetada y es esta:

<Component :is="extraComponentLoader" :blend="false" :verticalAnimation="false" :horizontalAnimation="false" :isLoading="false" />

### Paso 1: Maquetar las 3 filas con el contenido falso.

Para ello haremos un `tbody` alternativo al de la tabla real que se enseñará si se cumple el booleano `isLoading`. Dentro de este `tbody` generaremos 3 rows donde cada una tiene las columnas que ya conocemos y cada columna tiene un `div` de anchura random. Esto lo estoy haciendo con Vue.js pero lo puedes hacer con cualquier otro framework, es solo modificar el template según una variable booleana que puede ser cambiada.

```xml
<tbody v-if="isLoading">
  <tr
    v-for="index in 3"
    :key="index"
    class="datagrid__row"
  >
    <td
      v-for="column in columns"
      :key="column.title"
    >
      <span>
        <div
          class="datagrid__loader"
          :style="`width: ${Math.floor(Math.random() * 51) + 50}%;`"
        />
      </span>
    </td>
  </tr>
</tbody>
```

Resultado:

<Component :is="extraComponentLoader" :blend="false" :verticalAnimation="false" :horizontalAnimation="false" />

### Paso 2: Crear la animación vertical

<strong>Esta animación mostrará una fila después de otra y también las retirará una vez que estén las 3 cargadas. </strong> Primero la definimos y luego la aplicamos a `datagrid__row`. En las filas 2 y 3 les pondremos un delay para obtener el efecto deseado: una fila después de otra.

```css
@keyframes aniVertical {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.datagrid__row {
  animation: aniVertical 3s ease;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  opacity: 0;

  &:nth-child(2) {
    animation-delay: .5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
  }
}
```

<Component :is="extraComponentLoader" :blend="false" :horizontalAnimation="false" />

### Paso 3 - La parte más compleja de un Skeleton Screen: la animación horizontal.

Ahora tenemos que crear la animación de izquierda a derecha que hace el efecto de "carga", es una especie de barra que atraviesa el contenido y sin duda la más caracteristica de un Skeleton Screen. Pero nos encontramos con que es muy "difícil".
La razón es que esta animación tiene que pasar por diferentes divs de contenido. Y aún se complica más en una tabla donde la estructura del HTML es más compleja.

<strong>Os voy a enseñar la opción más fácil que se me ha ocurrido para solucionar este problema.</strong>

Se basa en utilizar propiedades que hemos visto en <strong>Photoshop o Sketch</strong> aplicadas a CSS. Los usuarios de estos programas conocéis las propiedades de opacidad de las capas. ¿Las reconocéis?

<image-responsive
    imageURL="blog/design-and-code-skeletons-screens/opacity-properties.png"
    width="100%"
    alt="Foto de propiedades de opacidad"/>

Una de los modos de opacidad es `overlay`, que hace que los colores oscuros de la capa al que se la aplicamos solo se vean reflejados en otros colores oscuros de capas que están por debajo y por tanto no se apliquen a blancos.

Resulta que tenemos disponibles estas mismas propiedades en CSS a través de `mix-blend-mode`. Esto nos viene genial para solucionar el problema de tener diferentes divs de contenido por el que la animación tiene que pasar.

Aplicaremos un `:before` a `datagrid__row` con una posición absoluta a su elemento para que ocupe y esté por encima de toda la fila y después crearemos una animación, `aniHorizontal`, que recorra el contenido.

```css
@keyframes aniHorizontal {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 100% 0;
  }
}

.datagrid__row {
  position: relative;
}

.datagrid__row:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  animation-name: aniHorizontal;
  animation-duration: 3.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  background: linear-gradient(
    to right,
    #cccccc 2%,
    #666666 18%,
    #cccccc 33%
  );
  background-size: 50%;
}
```

Resultado:

<Component :is="extraComponentLoader" :blend="false" />

Por último aplicamos el `mix-blend-mode: overlay` y mágicamente conseguimos que se junten las animaciones verticales y horizontales.

```css
.datagrid__row:before {
  mix-blend-mode: overlay;
}
```
Resultado:

<Component :is="extraComponentLoader" />

## Juega con el resultado final

Todos los ejemplos que has visto anteriormente no son imágenes ni videos, son un único componente de Vue que he cambiado en cada caso modificando sus props.
Ahora puedes jugar con esta variación del componente dándole click al checkbox de `loading` que hará que cambie el estado de normal a cargando.

<Component :is="extraComponentLoader" checkbox :isLoading="false" />

En una aplicación real, la variable de `isLoading` vendrá dada por el sistema con el que se implemente la carga asíncrona y también será booleana como este checkbox.

## Cosas a tener en cuenta sobre blend-mode

- La propiedad de CSS `mix-blend-mode: overlay` sólo funciona si los fondos de las filas son totalmente blancos o totalmente negros (la gran mayoría de los casos).

- `Mix-blend-mode` por ahora no está disponible para IE o Edge. Pero esto cambiará dentro de un tiempo según [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/mixblendmode/). Puedes ver su soporte [aquí](https://caniuse.com/#feat=css-mixblendmode)

Si lo que quieres es crear un Skeleton Screen sobre fondo que no sea blanco o negro, o tienes que soportar IE o Edge, te aconsejo esta [otra solución que utiliza SVG](http://danilowoz.com/create-vue-content-loader/). Es mucho más compleja, no estoy segura de que puedas hacerlo entre diferentes divs y requiere que utilices un paquete externo pero es la mejor alternativa que he podido encontrar.

Si te ha gustado este tutorial o las canciones de la playlist puedes seguirme en [Twitter](https://twitter.com/MarinaAisa) y continuar la conversación por allí.
¡Todo feedback es bienvenido! Si crees que hay algo que se puede mejorar me ayudarías muchísimo.