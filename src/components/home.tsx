"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const slides = [
  {
    image: "/images/farmer-market.jpg",
    title: "FOOD BUNDLES",
    description: "Connect Your Restaurant to Our Farm.",
  },
  {
    image: "/images/products.jpg",
    title: "FOOD BUNDLES",
    description: "Get groceries, drinks, and essentials instantly.",
  },
  {
    image: "/images/egges.svg",
    title: "FOOD BUNDLES",
    description: "Top-quality fresh produce every time.",
  },
];

interface HomeData {
  title: string
  description: string
  secondaryButton: {
    text: string
    href: string
  }
  heroImage: {
    src: string
    alt: string
  }
  decorativeElements: {
    stars: {
      large: {
        src: string
        alt: string
      }
      small: {
        src: string
        alt: string
      }
    }
  }
}

interface AnimatedHomeProps {
  data: HomeData
}

export default function Home({ data }: AnimatedHomeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!data) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [data])

  const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000); // 5s per slide

  return () => clearInterval(interval);
}, []);


  return (
<div
  ref={sectionRef}
  className="relative  h-screen overflow-hidden font-sans"
>
      {/* Hero Section */}
      {data && (
        <main className="relative z-10 px-8 py-12 h-full flex items-center justify-center">
          {/* Sliding Background */}
          {/* Sliding Background */}
<div className="absolute inset-0 -z-10 w-full h-full text-white">
  {slides.map((slide, index) => (
    <div
      key={index}
     className={`absolute inset-0 w-full h-full text-white transition-opacity duration-500ms  ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute top-0 right- h-full w-1/1"
        style={{
          background:
            "linear-gradient(to left, rgba(246, 229, 191, 1) 0%, rgba(255,255,255,0) 100%)",
        }}
      ></div>
    </div>
  ))}
</div>
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
          
              <div className="space-y-8 order-1 lg:order-1  ">
                <div className="space-y-6">
                  <h1
  className={`text-5xl lg:text-7xl font-bold text-[#fffff] leading-[1.1] transition-all duration-1000 ease-out ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`}
>
  {slides[currentSlide].title}
</h1>

<p
  className={`text-lg text-[#fffff] max-w-lg leading-relaxed transition-all duration-1000 ease-out ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`}
>
  {slides[currentSlide].description}
</p>

                  <p
                    className={`text-lg text- max-w-lg leading-relaxed transition-all duration-1000 ease-out ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "400ms" : "0ms",
                    }}
                  >
                    {data.description || "Default description"}
                  </p>
                </div>

                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isVisible ? "600ms" : "0ms",
                  }}
                >

                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full font-medium transform hover:scale-105 transition-all duration-300">
                    {data.secondaryButton?.text || "Secondary Button"}
                  </Button>
                </div>
              </div>

              {/* Right Content - Restaurant Image in Circle */}
              <div className="relative flex justify-center lg:justify-end order-2 ">
                <div
                  className={`absolute top-0 right-90 z-20 transition-all duration-1200 ease-out ${
                    isVisible && imageLoaded
                      ? "translate-y-0 opacity-100 rotate-0"
                      : "-translate-y-8 opacity-0 rotate-12"
                  }`}
                  style={{
                    transitionDelay: isVisible && imageLoaded ? "100ms" : "0ms",
                  }}
                >
                  <Image
                    src={data.decorativeElements?.stars?.large?.src || "/placeholder.svg"}
                    alt={data.decorativeElements?.stars?.large?.alt || "Decorative star"}
                    width={80}
                    height={80}
                    className="w-16 h-16 lg:w-20 lg:h-20 animate-pulse"
                  />
                </div>

                {/* Small decorative star */}
                  <div
                  className={`absolute bottom-16 right-140 z-20 transition-all duration-1200 ease-out ${
                    isVisible && imageLoaded
                      ? "translate-y-0 opacity-100 rotate-0"
                      : "translate-y-8 opacity-0 -rotate-12"
                  }`}
                  style={{
                    transitionDelay: isVisible && imageLoaded ? "1200ms" : "0ms",
                  }}
                 >
                  <Image
                    src={data.decorativeElements?.stars?.small?.src || "/placeholder.svg"}
                    alt={data.decorativeElements?.stars?.small?.alt || "Small decorative star"}
                    width={40}
                    height={40}
                    className="w-8 h-8 lg:w-10 lg:h-10 animate-pulse"
                   />
                   </div>

                {/* Restaurant image in circle with animation */}
                <div className="relative">
                  {/* Background circle with animation */}
                  <div
                    className={`absolute inset-0 w-[400px] h-[400px] lg:w-[450px] lg:h-[450px] bg-green-100/40 rounded-full transition-all duration-1500 ease-out ${
                      isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "800ms" : "0ms",
                    }}
                  ></div>

                  <div
                    className={`relative z-10 transition-all duration-1200 ease-out ${
                      isVisible
                        ? "translate-y-0 translate-x-0 opacity-100 scale-100"
                        : "translate-y-12 translate-x-8 opacity-0 scale-95"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "1000ms" : "0ms",
                    }}
                  >
                    <div className="w-60 h-12 lg:w-96 lg:h-126 rounded-2xl overflow-hidden border-4 border-gray shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-out -mt-12 lg:mr-0 ">
                      <Image
                        src={data.heroImage?.src || "/placeholder.svg"}
                        alt={data.heroImage?.alt || "Hero image"}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        priority
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </div>

                  <div
                    className={`absolute -top-4 -right-4 w-6 h-6 bg-orange-400 rounded-full transition-all duration-1000 ease-out ${
                      isVisible && imageLoaded ? "opacity-100 animate-bounce" : "opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible && imageLoaded ? "1400ms" : "0ms",
                      animationDelay: "1600ms",
                      animationDuration: "2s",
                    }}
                  ></div>

                  <div
                    className={`absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full transition-all duration-1000 ease-out ${
                      isVisible && imageLoaded ? "opacity-100 animate-ping" : "opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible && imageLoaded ? "1600ms" : "0ms",
                      animationDelay: "1800ms",
                      animationDuration: "3s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <div
        className={`absolute top-1/4 right-1/4 w-8 h-8 border-2 border-green-300 rounded-full transition-all duration-1500 ease-out ${
          isVisible ? "opacity-30 scale-100 rotate-45" : "opacity-0 scale-50 rotate-0"
        }`}
        style={{
          transitionDelay: isVisible ? "1800ms" : "0ms",
        }}
      ></div>

      <div
        className={`absolute bottom-1/3 left-1/4 w-6 h-6 border-2 border-orange-300 rounded-full transition-all duration-1500 ease-out ${
          isVisible ? "opacity-80 scale-800 -rotate-45" : "opacity-0 scale-50 rotate-0"
        }`}
        style={{
          transitionDelay: isVisible ? "2000ms" : "0ms",
        }}
      ></div>
    </div>
  )
}
