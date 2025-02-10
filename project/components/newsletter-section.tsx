"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your newsletter subscription logic here
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    })
    setEmail("")
  }

  return (
    <section className="border-t bg-muted/50">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Stay Updated</h2>
          <p className="max-w-[600px] text-muted-foreground">
            Subscribe to our newsletter to get updates on new products, special offers, and exclusive deals!
          </p>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

