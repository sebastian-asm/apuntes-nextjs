import type { Metadata } from 'next'

import { SimplePokemon, PokemonsResponse, PokemonCard } from '@/pokemons'

export const metadata: Metadata = {
  title: 'Favorites Pages',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data: PokemonsResponse = await resp.json()
  const pokemons = data.results.map(({ name, url }) => ({ id: url.split('/').at(-2)!, name }))
  // throw new Error('Este error lanzará error.tsx')
  return pokemons
}

export default async function FavoritesPage() {
  const pokemons = await getPokemons(151)
  return (
    <section className="p-2">
      <h1 className="text-center text-2xl font-bold">
        Listado de Pokemons <small className="font-normal block">obtenidos de forma estática</small>
      </h1>
      <div className="flex flex-wrap mt-5 gap-8">
        <PokemonCard pokemons={pokemons} />
      </div>
    </section>
  )
}
