"use client"

import { Printer, Palette, Package, Sparkles } from "lucide-react"
import { useStore } from "@/lib/store-context"

export function About() {
  const { t } = useStore()

  const features = [
    {
      icon: Printer,
      title: t.about.features.tech.title,
      description: t.about.features.tech.desc,
    },
    {
      icon: Palette,
      title: t.about.features.design.title,
      description: t.about.features.design.desc,
    },
    {
      icon: Package,
      title: t.about.features.package.title,
      description: t.about.features.package.desc,
    },
    {
      icon: Sparkles,
      title: t.about.features.handmade.title,
      description: t.about.features.handmade.desc,
    },
  ]

  return (
    <section id="o-nas" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{t.about.label}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-2 mb-6">
              {t.about.title1} <br />
              <span className="text-muted-foreground">{t.about.title2}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t.about.description}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {i === 4 ? "+50" : ""}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">50+</span> {t.about.customers}
              </p>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 bg-card rounded-2xl border border-border/50 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 hover:border-accent/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
