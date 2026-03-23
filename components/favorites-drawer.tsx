"use client"

import { X, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useStore } from "@/lib/store-context"
import Image from "next/image"
import { useState } from "react"

export function FavoritesDrawer() {
  const { 
    favorites, 
    removeFromFavorites, 
    addToCart, 
    isFavoritesOpen, 
    setIsFavoritesOpen,
    t 
  } = useStore()

  if (!isFavoritesOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsFavoritesOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 shadow-2xl animate-fade-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-accent" />
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {t.favorites.title}
              </h2>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  {favorites.length}
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsFavoritesOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium">{t.favorites.empty}</p>
                <p className="text-muted-foreground text-sm mt-1">{t.favorites.emptyDesc}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((item) => (
                  <FavoriteItem 
                    key={item.id} 
                    item={item} 
                    onRemove={removeFromFavorites}
                    onAddToCart={addToCart}
                    t={t}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function FavoriteItem({ 
  item, 
  onRemove, 
  onAddToCart,
  t 
}: { 
  item: { id: string; name: string; category: string; price: number; image: string }
  onRemove: (id: string) => void
  onAddToCart: (item: { id: string; name: string; category: string; price: number; image: string }) => void
  t: ReturnType<typeof useStore>["t"]
}) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop"

  const handleAddToCart = () => {
    onAddToCart(item)
  }

  return (
    <div className="flex gap-4 bg-background rounded-xl p-3 border border-border/50">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={imageError ? fallbackImage : item.image}
          alt={item.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-accent font-medium uppercase tracking-wider">
              {item.category}
            </p>
            <h3 className="font-medium text-foreground truncate mt-0.5">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t.catalog.article} {item.id}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-muted"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-foreground">{item.price} PLN</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="w-3 h-3" />
            {t.catalog.addToCart}
          </button>
        </div>
      </div>
    </div>
  )
}
