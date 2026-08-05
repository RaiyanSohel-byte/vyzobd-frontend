// components/home/HeroSlider.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

import heroImg1 from "../../../public/hero/heroImg1.jpg";
import heroImg2 from "../../../public/hero/heroImg2.jpg";
import heroImg3 from "../../../public/hero/heroImg3.jpg";

// Upgraded mock data with premium copywriting and tags
const SLIDES = [
  {
    id: 1,
    tag: "New Season",
    title: "Spring / Summer '26",
    subtitle:
      "Redefining everyday aesthetics with uncompromising craftsmanship and modern urban silhouettes.",
    image: heroImg1,
    ctaText: "Shop The Collection",
    ctaLink: "/products",
  },
  {
    id: 2,
    tag: "Signature Series",
    title: "Premium Accessories",
    subtitle:
      "Elevate your foundational wardrobe with meticulously curated pieces designed to last a lifetime.",
    image: heroImg2,
    ctaText: "Explore Accessories",
    ctaLink: "/products",
  },
  {
    id: 3,
    tag: "Limited Time",
    title: "The Archive Sale",
    subtitle:
      "Exclusive access to past collections. Up to 50% off selected premium garments.",
    image: heroImg3,
    ctaText: "Shop Now!",
    ctaLink: "/products",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  // Auto-play functionality with updated timing parameter
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <section
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-primary group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
                sizes="100vw"
              />
              {/* Complex Gradient Overlay: Darker at bottom/left for text contrast, fading out to top/right */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent md:bg-gradient-to-r md:from-primary/80 md:via-primary/40 md:to-transparent" />
            </div>

            {/* Text Content with Staggered Entrance */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl">
                {/* Tagline */}
                <div className="overflow-hidden mb-4">
                  <span
                    className={`block text-accent font-semibold text-xs md:text-sm uppercase tracking-[0.2em] transform transition-all duration-700 ease-out delay-300 ${
                      isActive ?
                        "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                    }`}
                  >
                    {slide.tag}
                  </span>
                </div>

                {/* Main Title */}
                <div className="overflow-hidden mb-6">
                  <h1
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] transform transition-all duration-700 ease-out delay-500 ${
                      isActive ?
                        "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                    }`}
                  >
                    {slide.title}
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="overflow-hidden mb-10">
                  <p
                    className={`text-lg md:text-xl text-secondary/90 font-light leading-relaxed max-w-lg transform transition-all duration-700 ease-out delay-700 ${
                      isActive ?
                        "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                </div>

                {/* CTA Button */}
                <div
                  className={`transform transition-all duration-700 ease-out delay-1000 ${
                    isActive ?
                      "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                  }`}
                >
                  <Link
                    href={slide.ctaLink}
                    className="group inline-flex items-center justify-center gap-3 bg-accent hover:bg-white hover:text-primary text-white text-sm font-bold uppercase tracking-wider py-4 px-8 rounded-md transition-all duration-300"
                  >
                    <span>{slide.ctaText}</span>
                    <FiArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls (Glassmorphism) - Visible on Hover for Desktop */}
      <div className="absolute z-30 inset-y-0 right-4 md:right-8 flex items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all transform hover:scale-105"
        >
          <FiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div className="absolute z-30 inset-y-0 left-4 md:left-8 flex items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all transform hover:scale-105"
        >
          <FiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Pagination Indicators - Modern dashes instead of dots */}
      <div className="absolute z-30 bottom-8 left-0 right-0 flex justify-center space-x-3 px-4">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group py-4 relative flex items-center justify-center"
          >
            <div
              className={`transition-all duration-500 ease-out rounded-full h-1 ${
                index === currentSlide ? "w-12 bg-accent" : (
                  "w-6 bg-white/40 group-hover:bg-white/70"
                )
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
