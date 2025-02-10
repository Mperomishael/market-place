"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const { addItem, items } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id)
    setProduct(foundProduct)
  }, [params.id])

  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    const isItemInCart = items.some((item) => item.id === product.id)
    if (isItemInCart) {
      toast({
        title: "Item already in cart",
        description: `${product.name} is already in your cart.`,
        variant: "destructive",
      })
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)} rating</span>
          </div>
          <p className="text-3xl font-bold">₦{product.price.toLocaleString()}</p>
          <div className="prose max-w-none">
            <p className="text-lg">{product.shortDescription}</p>
            <div className="mt-4 whitespace-pre-wrap">{product.fullDescription}</div>
          </div>
          <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

