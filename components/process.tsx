"use client"

import { useStore } from "@/lib/store-context"

export function Process() {
  const { t } = useStore()

  return (
    <section id="proces" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">{t.process.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-2">
            {t.process.title}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.process.steps.map((step, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Connector Line */}
              {index < t.process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0">
                  <div className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              )}
              
              <div className="relative z-10 p-6 bg-card rounded-2xl border border-border/50 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-2 hover:border-accent/20">
                <span className="font-serif text-5xl font-bold text-muted/50 transition-colors group-hover:text-accent/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl font-medium text-foreground mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
