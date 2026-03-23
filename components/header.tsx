"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Globe, Moon, Sun, ChevronDown, Heart } from "lucide-react"
import { useStore } from "@/lib/store-context"
import type { Locale } from "@/lib/translations"

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "pl", label: "Polski", flag: "PL" },
  { code: "uk", label: "Українська", flag: "UA" },
  { code: "en", label: "English", flag: "EN" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { 
    locale, 
    setLocale, 
    t, 
    cartCount, 
    setIsCartOpen, 
    theme, 
    toggleTheme,
    favorites,
    setIsFavoritesOpen
  } = useStore()

  const navItems = [
    { label: t.nav.catalog, href: "#katalog" },
    { label: t.nav.about, href: "#o-nas" },
    { label: t.nav.process, href: "#proces" },
    { label: t.nav.contact, href: "#kontakt" },
  ]

  const currentLang = languages.find(l => l.code === locale) || languages[0]

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsLangOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            3D Print Studio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-1">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-full hover:bg-muted"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{currentLang.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isLangOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 min-w-[140px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLocaleChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                          locale === lang.code ? "bg-muted text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span className="font-medium">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-muted-foreground transition-colors hover:text-foreground rounded-full hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Favorites Button */}
            <button 
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 text-muted-foreground transition-colors hover:text-foreground group"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-muted-foreground transition-colors hover:text-foreground group"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 py-4 border-t border-border/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
