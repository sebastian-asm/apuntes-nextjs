import type { Metadata } from 'next'

import { CartCounter } from '@/shopping-cart'

export const metadata: Metadata = {
  title: 'Shopping Cart Page',
  description: 'Shopping Cart Page'
}

export default function Counter() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p>Productos en el carrito</p>
      <CartCounter value={10} />
    </div>
  )
}
