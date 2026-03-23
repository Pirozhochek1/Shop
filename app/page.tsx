"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { FavoritesDrawer } from "@/components/favorites-drawer"
import { StoreProvider } from "@/lib/store-context"

export default function Home() {
  return (
    <StoreProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <ProductGrid />
        <About />
        <Process />
        <Contact />
        <Footer />
        <CartDrawer />
        <FavoritesDrawer />
      </main>
    </StoreProvider>
  )
}
