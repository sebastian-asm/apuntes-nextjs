import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import counterReduce from './counter/counterSlice'

export const store = configureStore({
  reducer: { counter: counterReduce }
})

// disparar acciones
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// leer de nuestro store
export const useAppSelector = useSelector.withTypes<RootState>()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
