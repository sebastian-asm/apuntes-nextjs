import type { Metadata } from 'next'

import { SimplePokemon, PokemonsResponse, PokemonGrid } from '@/pokemons'

export const metadata: Metadata = {
  title: '151 Pokémons',
  description: '151 Pokémons'
}

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data: PokemonsResponse = await resp.json()
  const pokemons = data.results.map(({ name, url }) => ({ id: url.split('/').at(-2)!, name }))
  // throw new Error('Este error lanzará error.tsx')
  return pokemons
}

export default async function Pokemons() {
  const pokemons = await getPokemons(151)
  return (
    <section className="p-2">
      <h1 className="text-center text-2xl font-bold">
        Listado de Pokemons <small className="font-normal block">obtenidos de forma estática</small>
      </h1>
      <div className="flex flex-wrap mt-5 gap-8">
        <PokemonGrid pokemons={pokemons} />
      </div>
    </section>
  )
}
