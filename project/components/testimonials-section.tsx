"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    text: "Chai! This Empire-MarketPlace na correct plug! The products dey top notch, no cap! 💯",
    author: "Chioma A.",
    location: "Lagos",
    rating: 5,
  },
  {
    text: "My brother, the quality wey I see here pass my expectation. Make una keep am up! 🙌",
    author: "Oluwaseun K.",
    location: "Abuja",
    rating: 5,
  },
  {
    text: "I don shop for many online stores, but this one different. Everything authentic, no fake one! 👌",
    author: "Blessing O.",
    location: "Port Harcourt",
    rating: 4.8,
  },
  {
    text: "See ehn, the customer service na bam! Dem sort me out sharp sharp. No long story! ⚡",
    author: "Emeka N.",
    location: "Enugu",
    rating: 5,
  },
  {
    text: "The product quality dey mad! I don refer all my guys come here. Una too much! 🔥",
    author: "Abdul H.",
    location: "Kano",
    rating: 4.9,
  },
  {
    text: "This platform get level! The way dem take handle my order sweet me die. 10/10! ⭐",
    author: "Grace E.",
    location: "Benin",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  if (!isMounted) {
    return null
  }

  return (
    <section id="testimonials" className="container space-y-12 py-16">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Dey Talk</h2>
        <p className="max-w-[700px] text-muted-foreground">
          See our customers experience with Empire-MarketPlace.
        </p>
      </div>

      <div className="relative h-[300px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonials[currentIndex].rating ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="space-y-4">
                <p className="text-xl leading-relaxed">{testimonials[currentIndex].text}</p>
                <footer className="text-sm">
                  <div className="font-semibold">{testimonials[currentIndex].author}</div>
                  <div className="text-muted-foreground">{testimonials[currentIndex].location}</div>
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-4" : "bg-muted"}`}
          >
            <span className="sr-only">Go to testimonial {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

