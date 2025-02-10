"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-provider"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export function Header() {
  const { items } = useCart()
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        controls.start({
          scale: [1, 1.2, 1],
          transition: { duration: 0.5 },
        })
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [controls, items.length])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold flex items-center">
            <motion.span className="inline-block" whileHover={{ scaleX: 1.2 }}>
              E
            </motion.span>
            <motion.span className="inline-block" whileHover={{ scale: 1.2 }}>
              M
            </motion.span>
            <motion.span className="inline-block" whileHover={{ scale: 1.2 }}>
              P
            </motion.span>
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#products" className="text-sm font-medium transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/reviews" className="text-sm font-medium transition-colors hover:text-primary">
            Reviews
          </Link>
        </nav>
        <Button variant="outline" size="icon" asChild>
          <Link href="/cart">
            <ShoppingCart className="h-4 w-4" />
            {items.length > 0 && (
              <motion.span
                animate={controls}
                className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center"
              >
                {items.length}
              </motion.span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}

