"use client"

import { useCart } from "@/lib/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const total = items.reduce((acc, item) => acc + item.price, 0)

  const config = {
    public_key: "FLWPUBK-730700e6a3472e4f63a40d80ab8d7609-X",
    tx_ref: Date.now().toString(),
    amount: total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: phone,
      name,
    },
    customizations: {
      title: "Empire-MarketPlace Payment",
      description: "Payment for items in cart",
      logo: "https://i.ibb.co/MwzzJmz/20241216-170307-01.jpg",
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handleCheckout = () => {
    if (!email || !phone || !name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log(response)
        closePaymentModal()
        if (response.status === "successful") {
          clearCart()
          router.push("/thank-you")
        } else {
          toast({
            title: "Payment Failed",
            description: "Please try again or contact support.",
            variant: "destructive",
          })
        }
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "You have cancelled the payment.",
          variant: "default",
        })
      },
    })
  }

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="mb-4 text-2xl font-bold font-marketing">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold font-marketing">Your Cart</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium font-marketing">{item.name}</h3>
                <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          ))}
          <div className="flex justify-between border-t pt-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">₦{total.toLocaleString()}</span>
          </div>
        </div>
        <div className="space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-bold font-marketing">Checkout</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleCheckout} className="w-full font-marketing">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  )
}

