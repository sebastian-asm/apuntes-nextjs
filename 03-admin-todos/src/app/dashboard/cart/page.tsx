import { cookies } from 'next/headers'

import { Product, products } from '@/products'
import { ItemCard } from '@/shopping-cart'
import { WidgetItem } from '@/components'

export const metadata = {
  title: 'Carrito de compras'
}

interface ProductsInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductsInCart[] => {
  const productsInCart: ProductsInCart[] = []
  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id)
    if (product) productsInCart.push({ product, quantity: cart[id] })
  }
  return productsInCart
}

export default function CartPage() {
  const cookiesStore = cookies()
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number }
  const productsInCart = getProductsInCart(cart)
  const totalToPay = productsInCart.reduce((prev, current) => current.product.price * current.quantity + prev, 0)

  return (
    <div className="p-6">
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="my-4" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <p className="font-bold text-2xl">${(totalToPay * 1.19).toFixed(2)}</p>
            <p className="text-sm mt-2 text-gray-600">
              IVA 19%: <strong>${(totalToPay * 0.19).toFixed(2)}</strong>
            </p>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}
