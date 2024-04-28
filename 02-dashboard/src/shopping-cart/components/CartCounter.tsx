'use client'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import { addOne, initCounterState, substractOne } from '@/store/counter/counterSlice'

interface CounterResponse {
  count: number
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const resp = await fetch('/api/counter')
  const data: CounterResponse = await resp.json()
  return data
}

export default function CartCounter({ value = 0 }: { value?: number }) {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()

  // evitar que el contador se reinicie cuando se cambia de componente
  // useEffect(() => {
  //   dispatch(initCounterState(value))
  // }, [dispatch, value])

  // obteniendo el valor desde la API
  useEffect(() => {
    getApiCounter().then(({ count }) => dispatch(initCounterState(count)))
  }, [dispatch])

  return (
    <div className="mt-4 text-center">
      <span className="text-9xl block mb-4">{count}</span>
      <button
        onClick={() => dispatch(substractOne())}
        className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 w-[100px] mr-2"
      >
        -1
      </button>
      <button
        onClick={() => dispatch(addOne())}
        className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 w-[100px] mr-2"
      >
        +1
      </button>
    </div>
  )
}
