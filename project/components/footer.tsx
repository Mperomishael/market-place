import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-4 md:gap-2">
          <Link href="/" className="text-lg font-bold">
            Empire-MarketPlace
          </Link>
          <p className="text-sm text-muted-foreground">Your trusted destination for quality products</p>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
      <div className="container py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Empire-MarketPlace. All rights reserved.
      </div>
    </footer>
  )
}

