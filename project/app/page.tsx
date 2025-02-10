import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { FloatingContact } from "@/components/floating-contact"

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FloatingContact />
    </div>
  )
}

