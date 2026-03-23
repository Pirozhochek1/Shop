"use client"

import { ArrowRight, Box, Layers, Sparkles, Hexagon, Triangle, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store-context"

export function Hero() {
  const { t } = useStore()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-muted/80 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements - Fixed positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Area - above text */}
        <div className="absolute top-28 left-[8%] animate-float opacity-60">
          <div className="w-12 h-12 bg-card/80 backdrop-blur border border-border/30 rounded-xl shadow-lg flex items-center justify-center rotate-12">
            <Hexagon className="w-5 h-5 text-accent/70" />
          </div>
        </div>
        
        {/* Top Center - above badge */}
        <div className="absolute top-24 left-[35%] animate-float delay-200 opacity-50">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Circle className="w-4 h-4 text-accent/60" />
          </div>
        </div>
        
        {/* Right side - above 3D illustration */}
        <div className="absolute top-32 right-[8%] animate-float delay-500 opacity-70">
          <div className="w-14 h-14 bg-card/80 backdrop-blur border border-border/30 rounded-2xl shadow-lg flex items-center justify-center -rotate-6">
            <Box className="w-6 h-6 text-accent" />
          </div>
        </div>
        
        {/* Right middle */}
        <div className="absolute top-[45%] right-[5%] animate-float delay-300 opacity-50">
          <div className="w-10 h-10 bg-muted/60 rounded-xl flex items-center justify-center rotate-45">
            <Triangle className="w-4 h-4 text-muted-foreground/50" />
          </div>
        </div>

        {/* Left side - middle */}
        <div className="absolute top-[55%] left-[5%] animate-float delay-700 opacity-60">
          <div className="w-10 h-10 bg-card/80 backdrop-blur border border-border/30 rounded-xl shadow-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent/70" />
          </div>
        </div>
        
        {/* Bottom left */}
        <div className="absolute bottom-32 left-[12%] animate-float delay-1000 opacity-50">
          <div className="w-6 h-6 bg-accent/20 rounded-full" />
        </div>
        
        {/* Bottom center-left */}
        <div className="absolute bottom-24 left-[30%] animate-float delay-500 opacity-40">
          <div className="w-8 h-8 border border-border/40 rounded-lg rotate-12" />
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-28 right-[15%] animate-float delay-300 opacity-60">
          <div className="w-12 h-12 bg-card/80 backdrop-blur border border-border/30 rounded-xl shadow-lg flex items-center justify-center -rotate-12">
            <Layers className="w-5 h-5 text-muted-foreground/60" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur border border-border/50 rounded-full mb-8 animate-fade-in shadow-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">{t.hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-6 animate-fade-in-up">
              <span className="text-balance block">{t.hero.title1}</span>
              <span className="text-muted-foreground block mt-2">{t.hero.title2}</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-in-up delay-200 mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-300 relative z-20">
              <Button 
                size="lg" 
                className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.cta}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-base font-medium rounded-full border-border hover:bg-muted transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById("o-nas")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.learnMore}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-12 animate-fade-in-up delay-500">
              {[
                { value: "200+", label: t.hero.stats.products },
                { value: "50+", label: t.hero.stats.models },
                { value: "100%", label: t.hero.stats.handmade },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left group">
                  <div className="font-serif text-3xl md:text-4xl font-semibold text-foreground transition-transform group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - 3D Illustration Area */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in delay-300">
            <div className="relative">
              {/* Main visual */}
              <div className="w-[420px] h-[420px] bg-gradient-to-br from-card via-muted/30 to-card rounded-[3rem] border border-border/50 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Decorative rings */}
                  <div className="absolute w-64 h-64 border border-border/20 rounded-full animate-[spin_25s_linear_infinite]" />
                  <div className="absolute w-48 h-48 border border-accent/15 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="absolute w-32 h-32 border border-border/20 rounded-full animate-[spin_12s_linear_infinite]" />
                  
                  {/* Orbital dots */}
                  <div className="absolute w-64 h-64 animate-[spin_20s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent/40 rounded-full" />
                  </div>
                  <div className="absolute w-48 h-48 animate-[spin_15s_linear_infinite_reverse]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground/30 rounded-full" />
                  </div>
                  
                  {/* Center element */}
                  <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl flex items-center justify-center border border-accent/20 shadow-xl backdrop-blur">
                    <Box className="w-12 h-12 text-accent" />
                  </div>

                  {/* Floating product previews */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-card/90 rounded-xl shadow-lg border border-border/30 overflow-hidden backdrop-blur">
                    <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent/50" />
                    </div>
                  </div>
                  <div className="absolute bottom-12 left-6 w-20 h-20 bg-card/90 rounded-xl shadow-lg border border-border/30 overflow-hidden backdrop-blur">
                    <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                      <Layers className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent glow */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-muted/60 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
