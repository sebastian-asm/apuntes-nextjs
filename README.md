# NextJS 13+ (App Router)

Las ventajas que ofrece el framework son:

- SSR: server side rendering
- SSG: static site generation
- CSR: clien side rendering (una spa)
- ISR: incremental static regeneration
- DR: dynamic routing

Ahora en NextJS todos los componentes que estén dentro de la carpeta `/app` son _server components_ de forma nativa, o sea, generados del lado del servidor.

También, dentro de `/app` hay nombres especiales y reservados para algunos archivos, los cuales no se deberían renombar como en el caso de: page, layout, error y loading.

Cuando se indica un nombre de carpeta entre (), ejemplo, (pages) es para que NextJS no la haga parte del routing.

Para los meta datos (SEO) solo es necesario exportar la constante `metadata` en cada page con todo lo que queramos que forme parte de `<head>`.

Para trabajar con turbo basta con agregar la bandera `--turbo` en el script del package.json, pro ejemplo:
`"dev": "next dev --turbo"`
