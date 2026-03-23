import type { Locale } from "./translations"

export interface Product {
  id: string
  name_pl: string
  name_ukr: string
  name_eng: string
  category: string
  price: number
  url: string
  image: string
}

export interface LocalizedProduct {
  id: string
  name: string
  category: string
  categoryKey: string
  price: number
  url: string
  image: string
}

// Category mapping for filtering (Polish category names to keys)
const categoryToKey: Record<string, string> = {
  "Dekoracje": "decor",
  "Декор": "decor",
  "Decor": "decor",
  "Figurki": "figurines",
  "Фігурки": "figurines",
  "Figurines": "figurines",
  "Akcesoria": "accessories",
  "Аксесуари": "accessories",
  "Accessories": "accessories",
  "Prezenty": "gifts",
  "Подарунки": "gifts",
  "Gifts": "gifts",
}

// Get category key from category name
export function getCategoryKey(category: string): string {
  return categoryToKey[category] || category.toLowerCase()
}

// Parse CSV string to Product array
export function parseCSV(csvText: string): Product[] {
  const lines = csvText.trim().split('\n').map(line => line.replace(/\r/g, ''))
  const headers = lines[0].split(',')
  
  return lines.slice(1).map(line => {
    // Handle quoted values that might contain commas
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    
    const product: Record<string, string | number> = {}
    headers.forEach((header, index) => {
      const value = values[index] || ''
      if (header === 'price') {
        product[header] = parseFloat(value) || 0
      } else {
        product[header] = value
      }
    })
    
    return product as unknown as Product
  })
}

// Get localized product based on current locale
export function getLocalizedProducts(products: Product[], locale: Locale): LocalizedProduct[] {
  return products.map(product => {
    let name: string
    switch (locale) {
      case 'uk':
        name = product.name_ukr
        break
      case 'en':
        name = product.name_eng
        break
      default:
        name = product.name_pl
    }
    
    return {
      id: product.id,
      name,
      category: product.category,
      categoryKey: getCategoryKey(product.category),
      price: product.price,
      url: product.url,
      image: product.image,
    }
  })
}

// Get unique categories from products
export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set(products.map(p => p.category))
  return Array.from(categories)
}

// Get category translations
export function getCategoryTranslations(locale: Locale): Record<string, string> {
  const translations: Record<Locale, Record<string, string>> = {
    pl: {
      decor: "Dekoracje",
      figurines: "Figurki",
      accessories: "Akcesoria",
      gifts: "Prezenty",
    },
    uk: {
      decor: "Декор",
      figurines: "Фігурки",
      accessories: "Аксесуари",
      gifts: "Подарунки",
    },
    en: {
      decor: "Decor",
      figurines: "Figurines",
      accessories: "Accessories",
      gifts: "Gifts",
    },
  }
  return translations[locale]
}
