"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import type React from "react" // Added import for React

const reviews = [
  {
    name: "Dr. Oluwaseun Adebayo",
    rating: 5,
    text: "The digital marketing course has transformed my business approach completely. The ROI has been exceptional!",
    product: "Digital Marketing Course",
  },
  {
    name: "Chioma Okonkwo",
    rating: 5,
    text: "Na correct investment be this! The 21 in 1 Secret don show me way to start my own business. E sweet me die! 🔥",
    product: "21 in 1 Secret",
  },
  {
    name: "Mohammed Ibrahim",
    rating: 4,
    text: "The location tracking system works perfectly. Technical support is very responsive.",
    product: "Location Tracker",
  },
  {
    name: "Elizabeth Dada",
    rating: 5,
    text: "The pound earning strategy is legitimate and practical. I've seen results within weeks.",
    product: "Earn in Pounds",
  },
  {
    name: "Blessing Okafor",
    text: "This platform dey provide real value. The products no be scam at all!",
    rating: 5,
    product: "21 in 1 Secret",
  },
]

export default function ReviewsPage() {
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5, product: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    console.log(newReview)
    setNewReview({ name: "", text: "", rating: 5, product: "" })
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Customer Reviews</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg border bg-card"
          >
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{review.text}</p>
            <div className="text-sm font-semibold">{review.name}</div>
            <div className="text-sm text-muted-foreground">{review.product}</div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Product Name"
              value={newReview.product}
              onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      i < newReview.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Textarea
              placeholder="Share your experience..."
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  )
}

