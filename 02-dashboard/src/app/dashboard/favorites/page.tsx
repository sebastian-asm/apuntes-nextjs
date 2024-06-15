import type { Metadata } from 'next'

import { FavoritesPokemons } from '@/pokemons'

export const metadata: Metadata = {
  title: 'Favorites Pages',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
}

export default async function FavoritesPage() {
  return (
    <section className="p-2">
      <h1 className="text-center text-2xl font-bold">Pokemons favoritos</h1>
      <FavoritesPokemons />
    </section>
  )
}
