import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { SimplePokemon } from '@/pokemons'

interface PokemonsState {
  favorites: { [key: string]: SimplePokemon }
}

// const getInitialState = (): PokemonsState => JSON.parse(localStorage.getItem('favorites_pkmns') ?? '{}')
// const initialState: PokemonsState = { ...getInitialState() }
const initialState: PokemonsState = { favorites: {} }

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload
      const { id } = pokemon
      // si existe en la lista de favoritos se elimina
      if (!!state.favorites[id]) delete state.favorites[id]
      // se lo contrario se agrega
      else state.favorites[id] = pokemon
      localStorage.setItem('favorites_pkmns', JSON.stringify(state.favorites))
    },
    setFavoritesPokemons(state, action: PayloadAction<{ [key: string]: SimplePokemon }>) {
      state.favorites = action.payload
    }
  }
})

export const { toggleFavorite, setFavoritesPokemons } = pokemonsSlice.actions
export default pokemonsSlice.reducer
