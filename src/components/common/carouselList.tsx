
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import type { StaticImageData } from 'next/image'

interface CoverflowImage {
  id: number
  src: string | StaticImageData
  alt: string
}

interface CoverflowCarouselProps {
  images: CoverflowImage[]
}

export default function CoverflowCarousel({ images }: CoverflowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2))
  const [containerWidth, setContainerWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Track container width for responsive sizing
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('.coverflow-container')
      if (container) {
        setContainerWidth(container.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? images.length - 1 : prevIndex - 1
    )
  }

  // Handle dragging for mobile devices
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStartX(clientX)
    setDragDelta(0)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const delta = clientX - dragStartX
    setDragDelta(delta)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Threshold to determine if it was a swipe (adjust as needed)
    const swipeThreshold = 50
    
    if (dragDelta > swipeThreshold) {
      handlePrev()
    } else if (dragDelta < -swipeThreshold) {
      handleNext()
    }
    
    setDragDelta(0)
  }

  // Calculate positions for all images with stable positioning
  const getImageVariants = (index: number) => {
    const diff = index - currentIndex
    const totalImages = images.length
    
    // Responsive sizing based on screen width
    const isMobile = containerWidth < 640 // sm breakpoint
    const isTablet = containerWidth >= 640 && containerWidth < 768 // md breakpoint
    
    // Adjust dimensions for different screen sizes
    const centerWidth = isMobile 
      ? Math.min(300, containerWidth * 0.7) 
      : isTablet 
        ? Math.min(400, containerWidth * 0.6) 
        : Math.min(600, containerWidth * 0.55)
    
    const centerHeight = isMobile ? 300 : isTablet ? 400 : 485
    
    const sideWidth = isMobile ? 20 : isTablet ? 30 : 40
    const sideHeight = isMobile ? 300 : isTablet ? 400 : 485
    
    const gapBetweenImages = isMobile 
      ? Math.min(20, containerWidth * 0.7) 
      : isTablet 
        ? Math.min(30, containerWidth * 0.75) 
        : Math.min(40, containerWidth * 0.8)
    
    // For circular effect - calculate shortest path distance
    const circularDiff = ((diff % totalImages) + totalImages) % totalImages
    
    // Center image
    if (diff === 0) {
      return {
        x: isDragging ? dragDelta * 0.5 : 0, // Apply drag effect
        scale: 1,
        width: `${centerWidth}px`,
        height: `${centerHeight}px`,
        zIndex: 20,
        opacity: 1,
        rotateY: 0,
        transformOrigin: "center center",
        borderRadius: isMobile ? "1rem" : "9%", // Ensure rounded corners on mobile
      }
    }

    // Images to the right
    if (diff > 0) {
      const effectiveDiff = Math.min(diff, Math.min(3, Math.floor(totalImages / 2)))
      const xOffset = centerWidth/2 + gapBetweenImages + (effectiveDiff - 1) * (sideWidth + gapBetweenImages)
      const rotationFactor = Math.min(effectiveDiff, 2) * (isMobile ? 10 : 15) // Reduced rotation on mobile
      
      return {
        x: xOffset + (isDragging ? dragDelta * 0.3 : 0), // Apply drag effect
        scale: 1 - (effectiveDiff * (isMobile ? 0.1 : 0.15)), // Adjusted scaling for mobile
        width: `${sideWidth}px`,
        height: `${sideHeight}px`,
        zIndex: 20 - effectiveDiff,
        opacity: Math.max(0.6, 1 - effectiveDiff * 0.2),
        rotateY: rotationFactor,
        transformOrigin: "left center",
        borderRadius: "1rem", // Consistent rounded corners
      }
    }

    // Images to the left
    const effectiveDiff = Math.min(Math.abs(diff), Math.min(3, Math.floor(totalImages / 2)))
    const xOffset = -(centerWidth/2 + gapBetweenImages + (effectiveDiff - 1) * (sideWidth + gapBetweenImages))
    const rotationFactor = Math.min(effectiveDiff, 2) * (isMobile ? -10 : -15) // Reduced rotation on mobile
    
    return {
      x: xOffset + (isDragging ? dragDelta * 0.3 : 0), // Apply drag effect
      scale: 1 - (effectiveDiff * (isMobile ? 0.1 : 0.15)), // Adjusted scaling for mobile
      width: `${sideWidth}px`,
      height: `${sideHeight}px`,
      zIndex: 20 - effectiveDiff,
      opacity: Math.max(0.6, 1 - effectiveDiff * 0.2),
      rotateY: rotationFactor,
      transformOrigin: "right center",
      borderRadius: "1rem", // Consistent rounded corners
    }
  }

  return (
    <div 
      className="relative w-full overflow-hidden coverflow-container"
      style={{ height: containerWidth < 640 ? "40vh" : "50vh" }} // Adjust height for mobile
    >
      {/* Perspective wrapper */}
      <div 
        ref={carouselRef}
        className="relative mx-auto h-full"
        style={{ width: containerWidth < 640 ? "95%" : "90%" }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Navigation - Left */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 z-30 hidden sm:flex -translate-y-1/2 items-center justify-center rounded-full bg-[#D2D2D7] hover:bg-[#bcbcc2] h-8 w-8 md:h-10 md:w-10"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
        </button>

        {/* Touch navigation indicators for mobile */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 sm:hidden z-30">
          {images.map((_, index) => (
            <div 
              key={`dot-${index}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Images */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            perspective: containerWidth < 640 ? "800px" : "1200px",
            perspectiveOrigin: "center center",
            transformStyle: "preserve-3d",
            cursor: isDragging ? "grabbing" : "grab"
          }}
        >
          {images.map((image, index) => {
            const variants = getImageVariants(index)
            const visible = Math.abs(index - currentIndex) <= (containerWidth < 640 ? 2 : 3)
            const isActive = index === currentIndex

            return (
              <div
                key={image.id}
                className="absolute overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                onClick={() => !isDragging && setCurrentIndex(index)}
                style={{
                  transform: `translateX(${variants.x}px) rotateY(${variants.rotateY}deg) scale(${variants.scale})`,
                  width: variants.width,
                  height: variants.height,
                  zIndex: variants.zIndex as number,
                  opacity: visible ? variants.opacity as number : 0,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transformOrigin: variants.transformOrigin,
                  borderRadius: variants.borderRadius || (isActive ? "9%" : "1rem"),
                  boxShadow: isActive ? "0 8px 16px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.1)",
                  willChange: "transform, opacity",
                  transition: isDragging 
                    ? "none" // Disable transition during dragging for smooth movement
                    : `
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s ease-out
                    `
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={Math.abs(index - currentIndex) <= 1}
                    sizes={
                      isActive 
                        ? containerWidth < 640 
                          ? "300px" 
                          : containerWidth < 768 
                            ? "400px" 
                            : "485px"
                        : "80px"
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation - Right */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-30 hidden sm:flex -translate-y-1/2 items-center justify-center rounded-full bg-[#D2D2D7] hover:bg-[#bcbcc2] h-8 w-8 md:h-10 md:w-10"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
        </button>
      </div>
    </div>
  )
}