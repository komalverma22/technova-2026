'use client'

import { useEffect, useRef, useState } from 'react'
import GalleryMasonry from "./galleryImg"

const GalleryHeading = () => {
  const [isVisible, setIsVisible] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
        rootMargin: '0px'
      }
    )

    if (galleryRef.current) {
      observer.observe(galleryRef.current)
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={galleryRef}
      className="w-full relative"
      style={{
        // background: "linear-gradient(180deg, #020B1B 0%, #031433 50%, #010E25 100%)",
      }}
    >
      {/* Heading */}
      <div className="flex justify-center items-center w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-tight leading-tight pt-12 pb-8"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            GALLERY
          </h1>
        </div>
      </div>

      {/* Gallery Masonry */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 relative z-10">
        <GalleryMasonry startAnimation={isVisible} />
      </div>
    </div>
  )
}

export default GalleryHeading;