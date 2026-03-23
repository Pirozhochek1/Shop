"use client"

import Image from "next/image"
import { Heart, ShoppingBag, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useStore } from "@/lib/store-context"

interface ProductCardProps {
  id: string
  name: string
  category: string
  categoryKey?: string
  price: number
  image: string
  showCategory?: boolean
  isListView?: boolean
}

export function ProductCard({ 
  id, 
  name, 
  category, 
  categoryKey,
  price, 
  image, 
  showCategory = false,
  isListView = false 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { t, addToCart, locale, isFavorite, addToFavorites, removeFromFavorites } = useStore()

  const isLiked = isFavorite(id)

  const categoryTranslations: Record<string, Record<string, string>> = {
    pl: { decor: "Dekoracje", figurines: "Figurki", accessories: "Akcesoria", gifts: "Prezenty" },
    uk: { decor: "Декор", figurines: "Фігурки", accessories: "Аксесуари", gifts: "Подарунки" },
    en: { decor: "Decor", figurines: "Figurines", accessories: "Accessories", gifts: "Gifts" },
  }
  const localizedCategory = categoryKey 
    ? categoryTranslations[locale]?.[categoryKey] || category
    : category

  const handleAddToCart = () => {
    addToCart({ id, name, category: localizedCategory, price, image })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleFavorite = () => {
    if (isLiked) {
      removeFromFavorites(id)
    } else {
      addToFavorites({ id, name, category: localizedCategory, price, image })
    }
  }

  const fallbackImage = `https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop`
  const imageUrl = imageError ? fallbackImage : image

  if (isListView) {
    return (
      <div className="group flex gap-6 bg-card rounded-2xl overflow-hidden border border-border/50 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        </div>
        
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {localizedCategory}
              </span>
              <span className="text-xs text-muted-foreground">
                {t.catalog.article} {id}
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              {name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-foreground">
              {price} PLN
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isLiked 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button 
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {addedToCart ? (
                  <><CheckCircle className="w-4 h-4" /> {(t.catalog as any).added}</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> {t.catalog.addToCart}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showCategory && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-card/90 backdrop-blur-md text-xs font-medium text-foreground rounded-full border border-border/50">
            {localizedCategory}
          </span>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <span className="px-2.5 py-1 bg-card/90 backdrop-blur-md text-xs font-medium text-muted-foreground rounded-full border border-border/50">
          {t.catalog.article} {id}
        </span>
      </div>

      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          onError={() => setImageError(true)}
        />
        
        <div className={`absolute inset-0 bg-foreground/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
        
        <div className={`absolute top-14 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
          <button 
            onClick={handleToggleFavorite}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isLiked 
                ? "bg-accent text-accent-foreground" 
                : "bg-card/80 text-foreground hover:bg-card"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button 
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              addedToCart
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
                  {addedToCart ? (
          <><CheckCircle className="w-4 h-4" /> {(t.catalog as any).added}</>
        ) : (
          <><ShoppingBag className="w-4 h-4" /> {t.catalog.addToCart}</>
        )}
          </button>
        </div>
      </div>

      <div className="p-5">
        {!showCategory && (
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {localizedCategory}
          </span>
        )}
        <h3 className={`font-serif text-lg font-medium text-foreground transition-colors group-hover:text-accent ${showCategory ? "" : "mt-1"}`}>
          {name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-foreground">
            {price} PLN
          </span>
        </div>
      </div>
    </div>
  )
}