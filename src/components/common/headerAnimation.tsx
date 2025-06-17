"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"

export default function HeaderAnimation({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
}) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Enhanced header animation that comes from below
  const headerVariants: Variants = {
    hidden: {
      y: 120, // Start from below
      opacity: 0,
      scale: 0.97,
      transformOrigin: "bottom",
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12, // Lower damping for more bounce
        stiffness: 100,
        mass: 0.9, // Slightly heavier feel
        delay,
        duration,
      },
    },
  }

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start("visible")
          setHasAnimated(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: "0px 0px -5% 0px",
      },
    )

    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [controls, hasAnimated])

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div initial="hidden" animate={controls} variants={headerVariants} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
