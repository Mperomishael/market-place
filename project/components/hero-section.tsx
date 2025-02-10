"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"

export function HeroSection() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: [100, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    })
  }, [controls])

  return (
    <section className="container relative overflow-hidden space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <motion.h1
          className="font-marketing text-4xl font-bold sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block transform hover:scale-110 transition-transform duration-200">E</span>
          <span className="inline-block transform hover:scale-110 transition-transform duration-200">
            <span className="font-icon">M</span>
          </span>
          <span className="inline-block transform hover:scale-110 transition-transform duration-200">
            <span className="font-icon">P</span>
          </span>
          ire-MarketPlace
        </motion.h1>
        <motion.p
          className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your trusted destination for quality products. We pride ourselves in delivering excellence and satisfaction to
          our customers.
        </motion.p>
        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" className="font-marketing">
            <Link href="#products">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="font-marketing">
            <Link href="/reviews">See Reviews</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div className="absolute right-0 top-1/2 transform -translate-y-1/2" animate={controls}>
        <Image
          src="https://sjc.microlink.io/jSGuTQeruzzOjvsx9lhvQwKkDvCRCIxQTdVBFvnwhtfhgbPPU4Svc0okPjdmUCWn3VzH2hrS8hQirV4Z58UljQ.jpeg"
          alt="Shopping Cart"
          width={200}
          height={200}
          className="opacity-20"
        />
      </motion.div>
    </section>
  )
}

