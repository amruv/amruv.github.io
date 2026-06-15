'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGradient } from '@/components/gradient-provider'

const GradientToggle = () => {
  const { isAnimating, toggleAnimation } = useGradient()

  return (
    <motion.button
      onClick={toggleAnimation}
      className="relative w-9 h-9 flex items-center justify-center rounded-full 
                 text-foreground hover:text-primary transition-colors"
      aria-label={isAnimating ? 'Pause background animation' : 'Play background animation'}
      whileTap={{ scale: 0.9 }}
      title={isAnimating ? 'Pause animation' : 'Play animation'}
    >
      {/* Pause icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          scale: isAnimating ? 1 : 0,
          opacity: isAnimating ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </motion.svg>

      {/* Play icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          scale: isAnimating ? 0 : 1,
          opacity: isAnimating ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </motion.svg>
    </motion.button>
  )
}

export default GradientToggle
