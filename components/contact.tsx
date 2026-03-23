"use client"

import { useState } from "react"
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store-context"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: ""
  })
  const { t } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setIsSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Contact error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: t.contact.email, value: "hello@3dprintstudio.pl" },
    { icon: Phone, label: t.contact.phone, value: "+48 511 525 917" },
    { icon: MapPin, label: t.contact.address, value: "Warszawa, Poland" },
  ]

  return (
    <section id="kontakt" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{t.contact.label}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-2 mb-6">
              {t.contact.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {t.contact.description}
            </p>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-card rounded-xl border border-border/50 flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="bg-card p-8 rounded-2xl border border-border/50">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Сообщение отправлено!
                </h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.contact.form.name}</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t.contact.form.namePlaceholder}
                      className="h-12 bg-background border-border/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.contact.form.email}</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="h-12 bg-background border-border/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.contact.form.subject}</label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder={t.contact.form.subjectPlaceholder}
                    className="h-12 bg-background border-border/50 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.contact.form.message}</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={5}
                    className="bg-background border-border/50 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? t.contact.form.sending : (
                    <>{t.contact.form.submit} <Send className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}