'use client'
import { useState } from 'react'

export default function CartCounter({ value = 0 }: { value?: number }) {
  const [counter, setCounter] = useState(value)

  return (
    <div className="mt-4 text-center">
      <span className="text-9xl block mb-4">{counter}</span>
      <button
        onClick={() => setCounter(counter - 1)}
        className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 w-[100px] mr-2"
      >
        -1
      </button>
      <button
        onClick={() => setCounter(counter + 1)}
        className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 w-[100px] mr-2"
      >
        +1
      </button>
    </div>
  )
}
