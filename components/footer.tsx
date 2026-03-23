"use client"

import Link from "next/link"
import { useStore } from "@/lib/store-context"

export function Footer() {
  const { t } = useStore()

  const navItems = [
    { label: t.nav.catalog, href: "#katalog" },
    { label: t.nav.about, href: "#o-nas" },
    { label: t.nav.process, href: "#proces" },
    { label: t.nav.contact, href: "#kontakt" },
  ]

  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-serif text-xl font-semibold text-foreground"
          >
            3D Print Studio
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 3D Print Studio
          </p>
        </div>
      </div>
    </footer>
  )
}
