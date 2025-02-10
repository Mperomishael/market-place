"use client"

import { useState, useEffect } from "react"
import { WhatsappLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function FloatingContact() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/2347086757575`, "_blank")
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="lg"
        className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        onClick={handleWhatsAppClick}
      >
        <WhatsappLogo weight="fill" className="h-6 w-6" />
        <span className="ml-2">Chat with us</span>
      </Button>
    </div>
  )
}

