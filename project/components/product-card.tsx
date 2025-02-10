"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-provider"
import { motion } from "framer-motion"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  shortDescription: string
  fullDescription: string
  rating: number
  testimonial: {
    text: string
    author: string
  }
}

export function ProductCard({
  id,
  name,
  price,
  image,
  shortDescription,
  fullDescription,
  rating,
  testimonial,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { addItem, items } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    const isItemInCart = items.some((item) => item.id === id)
    if (isItemInCart) {
      toast({
        title: "Item already in cart",
        description: `${name} is already in your cart.`,
        variant: "destructive",
      })
    } else {
      addItem({ id, name, price, image })
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      })
    }
  }

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: name,
            text: shortDescription,
            url: window.location.href,
          })
        } else {
          // Fallback to copying to clipboard
          await navigator.clipboard.writeText(window.location.href)
          toast({
            title: "Link copied!",
            description: "Product link has been copied to your clipboard.",
          })
        }
      } catch (error) {
        console.error("Error sharing:", error)
        toast({
          title: "Error",
          description: "Unable to share the product. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/products/${id}`}>
        <Card className="relative overflow-hidden transition-all duration-200 transform hover:shadow-xl">
          <CardHeader>
            <motion.div
              className="aspect-square overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm">{rating.toFixed(1)}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="font-marketing">{name}</CardTitle>
            <CardDescription>₦{price.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{isExpanded ? fullDescription : shortDescription}</p>
            <Button
              variant="ghost"
              className="p-0 text-sm underline-offset-4 hover:underline font-marketing"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
            {isExpanded && (
              <motion.blockquote
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-l-2 pl-4 italic"
              >
                <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                <footer className="mt-2 text-sm font-medium">- {testimonial.author}</footer>
              </motion.blockquote>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddToCart} className="w-full font-marketing">
              Get Now
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

