"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type Locale, translations, type Translations } from "./translations"

export interface CartItem {
  id: string
  name: string
  category: string
  price: number
  image: string
  quantity: number
}

export interface FavoriteItem {
  id: string
  name: string
  category: string
  price: number
  image: string
}

interface StoreContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  theme: "light" | "dark"
  toggleTheme: () => void
  favorites: FavoriteItem[]
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (id: string) => boolean
  isFavoritesOpen: boolean
  setIsFavoritesOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pl")
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const savedCart = localStorage.getItem("cart")
    const savedFavorites = localStorage.getItem("favorites")
    const savedLocale = localStorage.getItem("locale") as Locale | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch {}
    }
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch {}
    }
    if (savedLocale) {
      setLocale(savedLocale)
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  // Save favorites to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isHydrated])

  // Save locale to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("locale", locale)
    }
  }, [locale, isHydrated])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
      return newTheme
    })
  }, [])

  const t = translations[locale]

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
  setCart((prev) => {
    const existing = prev.find((i) => i.id === item.id)
    if (existing) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    }
    return [...prev, { ...item, quantity: 1 }]
  })
}, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const addToFavorites = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const isFavorite = useCallback((id: string) => {
    return favorites.some((i) => i.id === id)
  }, [favorites])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        locale,
        setLocale,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        theme,
        toggleTheme,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        isFavoritesOpen,
        setIsFavoritesOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
