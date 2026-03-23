"use client"

import { useState, useEffect, useRef } from "react"
import { ProductCard } from "./product-card"
import { useStore } from "@/lib/store-context"
import { Grid3X3, List, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { parseCSV, getLocalizedProducts, getCategoryKey, getCategoryTranslations, type Product } from "@/lib/products"

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [visibleCount, setVisibleCount] = useState(6)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const { t, locale } = useStore()

  // Load products from CSV
  useEffect(() => {
  async function loadProducts() {
    try {
      const response = await fetch('/products.csv')
      const csvText = await response.text()
      const parsedProducts = parseCSV(csvText)
      const shuffled = [...parsedProducts].sort(() => Math.random() - 0.5)
      setProducts(parsedProducts)
      setShuffledProducts(shuffled)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setIsLoading(false)
    }
  }
  loadProducts()
}, [])

  // Get localized products
  const localizedProducts = getLocalizedProducts(products, locale)
  const categoryTranslations = getCategoryTranslations(locale)

  // Get unique categories from products
  const uniqueCategories = Array.from(new Set(products.map(p => getCategoryKey(p.category))))
  
  const categories = [
    { key: "all", label: t.catalog.all },
    ...uniqueCategories.map(key => ({
      key,
      label: categoryTranslations[key] || key,
    }))
  ]

  // Get first product from each category for "all" view


const allShuffled = getLocalizedProducts(shuffledProducts, locale)

const filteredProducts = activeCategory === "all" 
  ? allShuffled
  : localizedProducts.filter(p => p.categoryKey === activeCategory)

const displayedProducts = filteredProducts.slice(0, visibleCount)

const hasMore = visibleCount < filteredProducts.length

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(6)
  }, [activeCategory])

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setShowScrollTop(rect.top < -200)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  if (isLoading) {
    return (
      <section id="katalog" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="katalog" ref={sectionRef} className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">{t.nav.catalog}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-2">
            {t.catalog.title}
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground mt-4 leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                {category.label}
                {activeCategory !== "all" && category.key === activeCategory && (
                  <span className="ml-2 text-xs opacity-70">
                    ({filteredProducts.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* View Mode Toggle - only show when not "all" */}
          {activeCategory !== "all" && (
            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "grid" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "list" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div className={
          viewMode === "grid" || activeCategory === "all"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            : "flex flex-col gap-4"
        }>
          {displayedProducts.map((product, index) => (
            <div 
              key={`product-${product.id}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard 
                {...product} 
                showCategory={activeCategory === "all"}
                isListView={viewMode === "list" && activeCategory !== "all"}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              className="rounded-full px-8 gap-2"
            >
              {t.catalog.showMore}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-fade-in"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  )
}
