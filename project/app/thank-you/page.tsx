"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://wa.me/2348142656848"
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-4 font-marketing text-center"
      >
        Thank You for Your Purchase!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-8 text-center"
      >
        We appreciate your business. You will be redirected to our WhatsApp contact in 5 seconds.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Image src="/thank-you-image.svg" alt="Thank You" width={200} height={200} />
      </motion.div>
    </div>
  )
}

