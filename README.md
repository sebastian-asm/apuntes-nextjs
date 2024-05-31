# Apuntes de NextJS 13+ (App Router)

Las ventajas que ofrece el framework son:

- SSR: Server Side Rendering (se ejecuta en tiempo de solicitud "on-demand")
- SSG: Static Site Generation (se realiza en tiempo de compilación "build")
- CSR: Clien Side Rendering (una spa)
- ISR: Incremental Static Regeneration
- DR: Dynamic Routing

Algunas nuevas herramientas:

- **generateMetadata**: para generar los meta datos de forma dinámica
- **usePathname** (client side): obtener datos de la url
- **notFound**: redirige a un archivo `not-found.tsx`
- **generateStaticParams**: permite generar rutas estáticamente en el momento de la compilación y evitar una solicitud on-demand
- **fetch**: ahora nos permite trabajar con múltiples [estrategias](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating) entre ellas revalidar la solicitud en un lapso de tiempo
- **useRouter**: el nuevo useRouter que viene de `next/navigation` ahora permite hacer _refresh_ de la página o componente sin necesidad de usar un useEffect, por ejemplo:

  ```ts
  import { useRouter } from 'next/navigation'
  const router = useRouter()
  router.refresh()
  ```

Ahora en NextJS todos los componentes que estén dentro de la carpeta `/app` son _server components_ de forma nativa, o sea, generados del lado del servidor para enviar el menos código de JS posible al cliente. Esto nos hará pensar cuales serán los componentes que se ejecutarán del lado del cliente y quizás para conseguirlo, será necesario pensar en como dividir en pequeños componentes nuestra app para lograrlo.

También, dentro de `/app` hay nombres especiales y reservados para algunos archivos, los cuales no se deberían renombar como en el caso de: `page`, `layout`, `route`, `error`, `not-found` y `loading`. Esta carpeta solo debería contener el sistema de rutas y todos los demas componentes por fuera.

Cuando se indica un nombre de carpeta entre (), ejemplo, (pages) es para que NextJS no la haga parte del routing.

Para los meta datos (SEO) solo es necesario exportar la constante `metadata` en cada page con todo lo que queramos que forme parte de `<head>`.

Para trabajar con turbo basta con agregar la bandera `--turbo` en el script del package.json, pro ejemplo: `"dev": "next dev --turbo"`

Por defecto, cuando se usa el `fetch` se estará cacheando la respuesta desde la segunda petición. Para conocer más, revisar la [documentación](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating).

## NextJS API Routes

Las APIs pueden ir en cualquier carpeta de nuestro poyecto, a diferencia de la versión anterior _Pages Router_, donde solo tenian que ir estrictamente dentro de la carpeta `/api`. La unica exensión en esta versión actual de _App Router_ es que solo puede ir un archivo de api llamado `route.ts` el cual **no** puede convivir con el archivo `page.tsx`, en caso de existir ambos en la misma carpeta, NextJS ejecutaría el page y dejando de lado el archivo de api route.

Desde la versión 5.2 de TypeScript, se retorna una respuesta json con `Response` en vez de `NextResponse` en el archivo de `route.ts`.

## Server Actions

Es una función que tiene acceso al servidor, para ello es necesario usar `'user server'` a nivel de componente o a nivel de función. Dentro de los SA se pueden utilizar las _actualizaciones optimistas_ la que nos permitiría darle la sensación a un usuario de tener 0 latencia al momento de realizar alguna acción en nuestro sitio.

- **revalidatePath**: permite actualizar el front pero solo lo que cambio
- **useOptimistic (hook)**: las actualizaciones optimistas son una técnica que nos permite mejorar la velocidad **visual** de nuestra app. Esto dará la sensación que nuestra app no tiene latencia y que responde rápidamente a los eventos del usuario
- **[Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)**: permiten configurar el comportamiento y caché de una page, layout o route handler

Las _cookies_ viajan automáticamente cuando se realiza una petición HTTP, y los server components puede leer esa información que viaja en las cookies para generar el contenido del lado del Servidor, pero de todas formas no hay que confirmar absolumente en ellas ya que son volátiles.
