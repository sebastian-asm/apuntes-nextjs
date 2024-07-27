# Apuntes de NextJS 13+ (App Router)

## Intro

El término **cliente** hace referencia al navegador en el dispositivo del usuario, el cual envía una solicitud al **servidor** para recibir el código de la app y convertirlo en una interfaz visual para el usuario.

Ahora, el término **servidor** se refiere a una computadora en un centro de datos que almacena el código de la app y recibe solicitudes de los clientes, proporcionando respuestas a estas solicitudes. Todo lo que pasa en el servidor no es expuesto ni visible para el cliente, solamente lo que se retorna.

Podemos visualizar esta transición como un flujo unidireccional desde el servidor hacia el cliente. Una vez que una solicitud se completa en el servidor y se transfiere al cliente, no puede regresar al servidor (si se necesita volver al servidor, se realiza una nueva solicitud, por ejemplo, accediendo a una nueva ruta). La línea imaginaria que separa el servidor del cliente se conoce como _network boundary_.

Las principales ventajas que ofrece el framework son:

- **Renderizado estático (por defecto)**: se realiza en tiempo de compilación "build", lo que permite que los datos estén disponibles desde la primera visita de un usuario. Recomendado para aquellos sitios que su contenido no cambia con frecuencia o no incluye información personalizada. Es una opción que se puede combinar con obtener datos desde el cliente.

- **Renderizado dinámico**: con el renderizado dinámico, las rutas se renderizan cada vez que un usuario ingresa a ellas. El renderizado dinámico es útil cuando una ruta contiene información personalizada de un usuario, cuando la información de la página no puede calcularse antes de tiempo o cuando la información cambia con mucha frecuencia.

- **Streaming**: el streaming es una técnica de transferencia de datos que nos permite dividir el contenido en trozos más pequeños y enviarlos al cliente a medida que esten disponibles. Esto evita que procesos bloqueantes (como obtener datos) eviten que el usuario no vea nada hasta que todo esté disponible.

- **Pre-renderizado parcial (experimental)**: el problema radica en que nuestras aplicaciones o rutas no suelen ser estáticas o dinámicas (de manera excluyente), sino que una combinación de ambas. El Pre-renderizado parcial es una optimización de compilador que permite que partes estáticas de una ruta sean pre-renderizadas desde caché con "agujeros" dinámicos donde el contenido se irá streameando, todo en una sola petición.

## Nuevas herramientas

- `generateMetadata`: para generar los metadatos de forma dinámica
- `metadata`: es una constante que genera los metadatos de forma estática
- `usePathname`: obtener datos de la url (client side)
- `notFound`: redirige a un archivo `not-found.tsx`
- `generateStaticParams`: permite generar rutas estáticamente en el momento de compilación y evitar una solicitud on-demand
- `fetch`: ahora nos permite trabajar con múltiples [estrategias](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating) entre ellas revalidar la solicitud en un lapso de tiempo y la caché
- `useRouter`: el nuevo useRouter que viene de `next/navigation` ahora permite hacer _refresh_ de la página o componente desde el servidor, por ejemplo:

  ```ts
  import { useRouter } from 'next/navigation'
  const router = useRouter()
  router.refresh()
  ```

## Router

Dentro de la carpeta `app` hay nombres especiales y reservados para algunos archivos, los cuales no se deberían renombar, ya que estos forman parte del router de NextJS:

- `page.tsx`: para definir una página, recibe parámetros y parámetros de búsquedas como props
- `layout.tsx`: para indicar un contendor de un conjunto de páginas, el cual se encargará de establecer la estructura del html que se compartirá dentro de ese conjunto
- `route.tsx`: define una ruta de API, se ejecuta en el servidor y devuelve datos usando el objeto `Response`
- `error.tsx`: se muestra cuando hay una excepción o error en la ejecución en una page o layout
- `loading.tsx`: página de carga que se muestra mientras la página se esta
  cargando, esta construido sobre [React Suspense](https://react.dev/reference/react/Suspense)

Es recomendable que la carpeta `app` solo contenga el sistema de rutas y que todos los demas componentes esten por fuera.

Cuando se indica un nombre de carpeta entre (), ejemplo, (pages) es para que NextJS no la haga parte del routing.

[https://nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing)

## Server Components

Por defecto, todos los componentes que usamos en la carpeta `app` (en App Router) son React Server Components. Los Server Components son componentes de React que se ejecutan exclusivamente en el servidor. Estos componentes solo se ejecutan cuando el usuario accede a una ruta o segmento y no vuelven a ejecutarse en el cliente. Esto implica que no pueden manejar eventos del usuario, estados locales ni hooks, pero pueden acceder directamente a datos del servidor, bases de datos, variables de entorno privadas y todo lo que se pueda hacer en el servidor.

Sin embargo, una aplicación típica también está compuesta por componentes dinámicos e interactivos que requieren interacciones del usuario, eventos y más. Para estos casos, podemos usar **Client Components**. Los Server Components pueden importar y usar Client Components, pero los Client Components no pueden importar Server Components.

Podemos utilizar Server Components dentro de otros Server Components de manera indefinida, pero, en el momento en que usamos un Client Component, marcamos nuestro _network boundary_.

En caso de ser necesario, se puede usar la directiva `'use server'` para indicar un Server Component.

Los Server Components pueden utilizar `async/await`. Esto nos ayuda a reducir el boilerplate y la complejidad de nuestra aplicación al obtener datos de manera eficiente.

### ¿Porqué renderizar del lado del servidor?

- **Obtención de datos**: Podemos obtener nuestros datos desde un servidor más cercano a nuestra fuente de datos, lo que hace que la obtención sea más rápida y eficiente.

- **Seguridad**: Al ejecutarse desde el servidor, podemos mantener toda la información sensible, como tokens, credenciales y más, oculta al usuario.

- **Caching**: Cuando almacenamos en caché datos en el cliente, esa caché es única para cada usuario. En cambio, cuando almacenamos en caché datos en el servidor, esa caché se comparte entre todos los usuarios, lo que nos permite ahorrar recursos y mejorar el rendimiento de nuestra aplicación.

- **Tamaño del bundle**: Muchas tareas que antes debíamos realizar en el cliente ahora las podemos hacer en el servidor, minimizando la cantidad de código que debemos enviar al cliente.

- **Pintado inicial y FCP (First Contentful Paint)**: En el servidor, podemos generar HTML y CSS que se envían al cliente de inmediato, sin necesidad de esperar a que se descargue y ejecute JavaScript en el cliente.

- **SEO**: El HTML renderizado por el servidor puede ser utilizado por los motores de búsqueda para indexar nuestra aplicación.

- **Streaming**: Podemos enviar contenido al cliente a medida que se va generando, en lugar de esperar a que se genere todo el contenido para enviarlo al cliente. Esto permite al usuario ver el contenido más rápido.

## Client Components

Los **Client Components** nos permiten escribir interfaces interactivas y dinámicas que se ejecutan en el cliente. Se pueden usar hooks, estados locales, eventos, APIs del navegador y más. Podemos pensar en los Client Components como "los componentes habituales que usamos en React".

Para marcar un componente como Client Component, debemos agregar la directiva `'use client'` al inicio del archivo.

## Server Actions

Nos permiten ejecutar código del lado del servidor, para ello es necesario usar `'user server'` a nivel de componente o a nivel de función. Dentro de los SA se pueden utilizar las _actualizaciones optimistas_ la que nos permitiría darle la sensación a un usuario de tener 0 latencia al momento de realizar alguna acción en nuestro sitio.

- **revalidatePath**: permite actualizar el front pero solo lo que cambio
- **revalidateTag**: nos permite revalidar todas las rutas que tengan un tag en particular
- **useOptimistic (hook)**: las actualizaciones optimistas son una técnica que nos permite mejorar la velocidad _visual_ de nuestra app. Esto dará la sensación que nuestra app no tiene latencia y que responde rápidamente a los eventos del usuario

Las rutas pueden exportar constantes de configuración para definir ciertos comportamientos, incluyendo la revalidación y la estrategia de renderizado.

- `dynamic`: cambia la estrategia de renderizado de una ruta para ser estática o dinámica
- `revalidate`: define el tiempo de revalidación por defecto para una ruta

```ts
export const dynamic = 'force-dynamic' // por defecto: auto
export const revalidate = 100 // por defecto: false
```

## Caching

NextJS, por defecto, intentará cachear tanto como sea posible para mejorar el rendimiento y reducir los costos. Cuando tenemos un segmento dinámico pero una petición de datos todavía tiene caché relevante, en lugar de ir al origen, NextJS intentará obtenerlo desde el caché de datos.

Tenemos muchos tipos de caché:

- **Memorización de Solicitudes**: reutilizar datos en un árbol de componentes React (duración de la solicitud).
- **Caché de Datos**: almacenar datos entre solicitudes de usuario y despliegues (persistene)
- **Caché de Ruta Completa**: reducir el costo de renderización y mejorar el rendimiento (persistente)
- **Caché de Enrutamiento**: reducir las solicitudes al servidor durante la navegación (sesión de usuario o basado en el tiempo)

El comportamiento del caché dependerá de si la ruta tiene renderizado estático o dinámico, si los datos están en caché o no, o si una solicitud es parte de una visita inicial o una navegación subsecuente.

### Configuraciones de revalidación de caché

- `cache: no-store`: ssto le indicará que no debe usar la caché de datos es un `fetch` que se use en una página o segmento.

  ```ts
  const result = await fetch('https://...', { cache: 'no-store' })
  ```

- `revalidate: number`: si no queremos que cada petición traiga nueva información cada vez, más bien, que queremos que "revalide" esa información cada cierto tiempo, podemos definir la propiedad revalidate en nuestros fetch de la siguiente manera:

  ```ts
  const result = await fetch('https://...', { next: { revalidate: 100 } })
  ```

  Esto hará que después de 100 segundos de haber obtenido los datos, la próxima vez que un usuario ingrese a la ruta, se le servirán datos de la caché y, en segundo plano, se obtendrán datos nuevos. Estos datos sobrescribirán la caché y la próxima vez que un usuario ingrese a la ruta, se le servirán los datos nuevos.

## Lazy loading

Podemos usar la función dynamic importada desde `next/dynamic` para realizar lazy loading de nuestros componentes. Esto nos permite importar un componente de manera dinámica, solo cuando sea necesario. También nos permite definir si un componente debería o no ser renderizado en el servidor mediante la propiedad `ssr`.

```ts
const DynamicComponentName = dynamic(async () => ComponentName, { ssr: false })
```

## Otros datos

Para trabajar con turbo basta con agregar la bandera `--turbo` en el script del package.json, pro ejemplo: `"dev": "next dev --turbo"`

Por defecto, cuando se usa el `fetch` se estará cacheando la respuesta desde la segunda petición. Para conocer más, revisar la [documentación](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating).

Las _cookies_, viajan automáticamente cuando se realiza una petición HTTP, y los server components puede leer esa información que viaja en las cookies para generar el contenido del lado del Servidor, pero de todas formas no hay que confirmar absolumente en ellas ya que son volátiles.

**_Créditos_**

👉 [https://cursos.devtalles.com/courses/nextjs](https://cursos.devtalles.com/courses/nextjs)  
👉 [https://github.com/goncy/nextjs-course](https://github.com/goncy/nextjs-course)
