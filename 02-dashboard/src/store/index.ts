import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

// import { localStorageMiddleware } from './middlewares/localstorage-middleware'
import counterReduce from './counter/counterSlice'
import pokemonsReduce from './pokemons/pokemons'

export const store = configureStore({
  reducer: {
    counter: counterReduce,
    pokemons: pokemonsReduce
  }
  // forma recomendada para trabajar con LS en redux
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware as any)
})

// disparar acciones
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// leer de nuestro store
export const useAppSelector = useSelector.withTypes<RootState>()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
