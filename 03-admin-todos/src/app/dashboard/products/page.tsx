import { ProductCard, products } from '@/products'

export default function ProductsPage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
