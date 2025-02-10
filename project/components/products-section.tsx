import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export function ProductsSection() {
  return (
    <section id="products" className="container space-y-8 py-12">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
        <p className="max-w-[700px] text-muted-foreground">
          Discover our carefully curated selection of premium products, each chosen for their exceptional quality and
          value.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

