'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { store } from '.'
import { setFavoritesPokemons } from './pokemons/pokemons'

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites_pkmns') ?? '{}')
    store.dispatch(setFavoritesPokemons(favorites))
  }, [])
  return <Provider store={store}>{children}</Provider>
}
