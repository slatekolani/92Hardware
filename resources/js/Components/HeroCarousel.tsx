"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  cta: string
  href: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Professional Tools & Equipment",
    subtitle: "Everything you need for your construction and maintenance projects",
    cta: "Shop Tools",
    href: "/Products"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Quality Building Materials",
    subtitle: "From screws to lumber - we have all your construction needs covered",
    cta: "View Materials",
    href: "/BuildingBlocks"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Expert Hardware Solutions",
    subtitle: "Over 25 years of experience serving contractors and DIY enthusiasts",
    cta: "Contact Us",
    href: "/HardwareDealership"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Building Blocks Manufacturing",
    subtitle: "High-quality concrete blocks and construction materials manufactured on-site",
    cta: "View Blocks",
    href: "/BuildingBlocks"
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  const slideInterval = 9000
  const progressInterval = 20
  const totalDots = slides.length

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsAnimating(false)
    }, 1600)
  }, [isAnimating])

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsAnimating(false)
    }, 1600)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide || index >= slides.length) return
    setIsAnimating(true)
    setProgress(0)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsAnimating(false)
    }, 1600)
  }

  useEffect(() => {
    if (isAnimating) return
    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = (progressInterval / slideInterval) * 100
        const next = prev + increment
        if (next >= 100) {
          nextSlide()
          return 0
        }
        return next
      })
    }, progressInterval)
    return () => clearInterval(timer)
  }, [currentSlide, isAnimating, nextSlide])

  useEffect(() => {
    setProgress(0)
  }, [currentSlide])

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-8">
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide
        const isPrev = index === (currentSlide - 1 + slides.length) % slides.length
        const isNext = index === (currentSlide + 1) % slides.length

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[2200ms] cubic-bezier(0.23, 1, 0.32, 1) ${
              isActive
                ? "opacity-100 scale-100 translate-x-0 rotate-0 z-20"
                : isPrev
                ? "opacity-0 scale-125 -translate-x-full -rotate-2 blur-lg z-10"
                : isNext
                ? "opacity-0 scale-90 translate-x-full rotate-1 blur-lg z-10"
                : "opacity-0 scale-95 translate-y-8 z-0"
            }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="relative w-full h-full transition-transform duration-[9000ms] ease-linear"
                style={{
                  transform: `scale(${isActive ? 1.02 + progress * 0.006 : 1.12})`,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-all duration-[9000ms] ease-linear"
                  style={{
                    filter: `brightness(${isActive ? 0.75 + progress * 0.002 : 0.6})
                             contrast(${isActive ? 1.08 + progress * 0.0015 : 1})
                             saturate(${isActive ? 1.05 : 0.8})`,
                    transform: isActive ? "scale(1)" : "scale(1.05) translateY(20px)",
                    objectPosition: "center 50%",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${slide.image}`)
                    e.currentTarget.src = "/Images/fallback.jpg"
                  }}
                />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-[9000ms] ease-linear ${
                  isActive
                    ? "bg-gradient-to-br from-black/60 via-black/30 to-black/70"
                    : "bg-gradient-to-br from-black/80 via-black/60 to-black/90"
                }`}
              />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white max-w-5xl mx-auto px-6 relative z-10">
                <div className="overflow-hidden mb-4">
                  <p
                    className={`text-xl md:text-3xl font-poppins font-light tracking-wide transition-all duration-[1800ms] ease-out ${
                      isActive && !isAnimating
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-12"
                    }`}
                    style={{
                      fontSize: '40px',
                      fontFamily: "'cinzel', sans-serif",
                      textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                      transitionDelay: "1300ms",
                    }}
                  >
                    {slide.title}
                  </p>
                </div>

                <div className="overflow-hidden mb-8">
                  <p
                    className={`text-lg md:text-xl font-light tracking-wide transition-all duration-[1800ms] ease-out ${
                      isActive && !isAnimating
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-12"
                    }`}
                    style={{
                      transitionDelay: "1600ms",
                    }}
                  >
                    {slide.subtitle}
                  </p>
                </div>

                {/* Gradient Line */}
                <div
                  className={`h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent mb-6 transition-all duration-1200 ease-out ${
                    isActive && !isAnimating
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                  style={{ width: "120px", margin: "0 auto 1.5rem" }}
                />

                {/* CTA Button */}
                <div className="overflow-hidden mb-6">
                  <a
                    href={slide.href}
                    className={`relative px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-400 font-semibold rounded-lg shadow-lg transition-all duration-500 inline-flex items-center overflow-hidden group ${
                      isActive && !isAnimating
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "2000ms" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></span>
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white flex items-center">
                      {slide.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 transform scale-0 group-hover:scale-105 transition-transform duration-300 ease-out bg-gradient-to-r from-purple-300/10 to-blue-600/10 rounded-lg"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation */}
      <button
        className="absolute left-8 top-1/2 -translate-y-1/2 group bg-black/10 backdrop-blur-lg hover:bg-black/25 text-white p-4 rounded-full transition-all duration-500 disabled:opacity-30 border border-white/10 hover:border-white/30 hover:scale-110 hover:shadow-xl z-30"
        onClick={prevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 group bg-black/10 backdrop-blur-lg hover:bg-black/25 text-white p-4 rounded-full transition-all duration-500 disabled:opacity-30 border border-white/10 hover:border-white/30 hover:scale-110 hover:shadow-xl z-30"
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Horizontal Connected Progress Bar */}
      <div className="absolute bottom-4 left-0 w-full px-8 flex items-center justify-center z-40">
        <div className="flex items-center justify-center w-auto mx-auto">
          {[...Array(totalDots)].map((_, index: number) => {
            const isLast = index === totalDots - 1
            const segmentProgress =
              index === currentSlide && index < slides.length
                ? progress
                : index < currentSlide
                ? 100
                : 0

            return (
              <div key={index} className="flex items-center relative">
                <div
                  className={`w-4 h-4 rounded-full border-2 z-20 cursor-pointer ${
                    index <= currentSlide && index < slides.length
                      ? "bg-purple-400 border-purple-400 scale-125 shadow-lg shadow-purple-400/50"
                      : "bg-blue-400 border-blue-400"
                  }`}
                  onClick={() => goToSlide(index)}
                />
                {!isLast && (
                  <div className="w-12 h-1 bg-blue-400/40 z-0 rounded-full mx-2">
                    <div
                      className="h-1 bg-purple-400 z-10 rounded-full transition-all duration-[9000ms] ease-linear"
                      style={{
                        width: `${segmentProgress}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}