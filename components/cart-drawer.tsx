"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store-context"

export function CartDrawer() {
  const { 
    t, 
    cart, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useStore()
  
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const [formData, setFormData] = useState({
  name: "", phone: "", email: "", address: "", comment: ""
})

// Замени handleSubmitOrder на этот
const handleSubmitOrder = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        cart,
        total: cartTotal
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      setIsSubmitting(false)
      setOrderSuccess(true)
      setTimeout(() => {
        clearCart()
        setOrderSuccess(false)
        setShowOrderForm(false)
        setIsCartOpen(false)
        setFormData({ name: "", phone: "", email: "", address: "", comment: "" })
      }, 2000)
    }
  } catch (error) {
    console.error("Order error:", error)
    setIsSubmitting(false)
  }
}
if (!isCartOpen) return null
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {t.cart.title}
            </h2>
          </div>
          <button 
  onClick={() => {
    setIsCartOpen(false)
    setShowOrderForm(false)
    setOrderSuccess(false)
  }}
  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 rounded-full hover:scale-110"
>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {t.cart.success}
              </h3>
              <p className="text-muted-foreground">{t.cart.successDesc}</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                {t.cart.empty}
              </h3>
              <p className="text-sm text-muted-foreground">{t.cart.emptyDesc}</p>
            </div>
          ) : showOrderForm ? (
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                {t.cart.orderTitle}
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.cart.orderForm.name} *</label>
                <Input 
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t.cart.orderForm.name}
                  className="h-12 bg-muted/50 border-border/50 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.cart.orderForm.phone} *</label>
                <Input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+48..."
                  className="h-12 bg-muted/50 border-border/50 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.cart.orderForm.email}</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="h-12 bg-muted/50 border-border/50 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.cart.orderForm.address} *</label>
             <Input 
                    required
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder={t.cart.orderForm.address}
                    className="h-12 bg-muted/50 border-border/50 rounded-xl"
                  />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.cart.orderForm.comment}</label>
                <Textarea 
                  value={formData.comment}
                  onChange={e => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder={t.cart.orderForm.comment}
                  rows={3}
                  className="bg-muted/50 border-border/50 rounded-xl resize-none"
                />
              </div>
              <div className="pt-4 space-y-3">
                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium"
                >
                  {isSubmitting ? t.cart.orderForm.sending : t.cart.orderForm.submit}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowOrderForm(false)}
                  className="w-full h-12 rounded-xl"
                >
                  {t.nav.catalog}
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-6 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border/50"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {item.price} PLN
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-muted rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && !showOrderForm && !orderSuccess && (
          <div className="p-6 border-t border-border bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">{t.cart.total}:</span>
              <span className="font-serif text-2xl font-semibold text-foreground">
                {cartTotal} PLN
              </span>
            </div>
            <Button 
              size="lg"
              onClick={() => setShowOrderForm(true)}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.cart.checkout}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
