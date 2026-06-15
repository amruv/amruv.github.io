'use client'

import React, { createContext, useContext, useState } from 'react'

interface GradientContextType {
  isAnimating: boolean
  toggleAnimation: () => void
}

const GradientContext = createContext<GradientContextType>({
  isAnimating: true,
  toggleAnimation: () => {},
})

export const useGradient = () => useContext(GradientContext)

export default function GradientProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true)

  const toggleAnimation = () => {
    setIsAnimating(prev => !prev)
  }

  return (
    <GradientContext.Provider value={{ isAnimating, toggleAnimation }}>
      {children}
    </GradientContext.Provider>
  )
}
