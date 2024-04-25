# Apuntes de NextJS 13+ (App Router)

Las ventajas que ofrece el framework son:

- SSR: server side rendering (se ejecuta en tiempo de solicitud "on-demand")
- SSG: static site generation (se realiza en tiempo de compilación "build")
- CSR: clien side rendering (una spa)
- ISR: incremental static regeneration
- DR: dynamic routing

Algunas nuevas herramientas:

- **generateMetadata**: para generar los meta datos de forma dinámica
- **usePathname** (client side): obtener datos de la url
- **notFound**: redirige a un archivo not-found.tsx
- **generateStaticParams**: permite generar rutas estáticamente en el momento de la compilación y evitar una solicitud on-demand
- **fetch**: ahora nos permite trabajar con múltiples [estrategias](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating) entre ellas revalidar la solicitud en un lapso de tiempo

Ahora en NextJS todos los componentes que estén dentro de la carpeta `/app` son _server components_ de forma nativa, o sea, generados del lado del servidor para enviar el menos código de JS posible al cliente. Esto nos hará pensar cuales serán los componentes que se ejecutarán del lado del cliente y quizás para conseguirlo, será necesario pensar en como dividir en pequeños componentes nuestra app para lograrlo.

También, dentro de `/app` hay nombres especiales y reservados para algunos archivos, los cuales no se deberían renombar como en el caso de: page, layout, error, not-found y loading. Esta carpeta solo debería contener el sistema de rutas y todos los demas componentes por fuera.

Cuando se indica un nombre de carpeta entre (), ejemplo, (pages) es para que NextJS no la haga parte del routing.

Para los meta datos (SEO) solo es necesario exportar la constante `metadata` en cada page con todo lo que queramos que forme parte de `<head>`.

Para trabajar con turbo basta con agregar la bandera `--turbo` en el script del package.json, pro ejemplo: `"dev": "next dev --turbo"`

Por defecto, cuando se usa el `fetch` se estará cacheando la respuesta desde la segunda petición. Para conocer más, revisar la [documentación](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating).
