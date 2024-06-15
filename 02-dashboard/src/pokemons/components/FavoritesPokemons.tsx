'use client'
import { useAppSelector } from '@/store'
import { IoHeartOutline } from 'react-icons/io5'

import PokemonGrid from './PokemonGrid'

export default function FavoritesPokemons() {
  const favoritesPokemons = useAppSelector((state) => Object.values(state.pokemons.favorites))
  return favoritesPokemons.length > 0 ? <PokemonGrid pokemons={favoritesPokemons} /> : <NoFavorites />
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center w-100">
      <IoHeartOutline size={100} className="text-red-600" />
      <p>No hay favoritos</p>
    </div>
  )
}
