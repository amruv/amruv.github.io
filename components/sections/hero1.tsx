'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import TypingAnimation from '@/components/ui/typing effect'

// ---------------------------------------------------------------------------
// Liquid-glass background — self-contained, no extra deps
// ---------------------------------------------------------------------------
function LiquidGlassBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Orb 1 — large deep-purple bloom top-left */}
      <span
        style={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          top: -120,
          left: -80,
          background:
            'radial-gradient(circle, #6B3FD4 0%, #2D1372 65%, transparent 100%)',
          filter: 'blur(64px)',
          animation: 'heroDrift1 9s ease-in-out infinite alternate',
        }}
      />
      {/* Orb 2 — mid-purple bottom-right */}
      <span
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          bottom: -60,
          right: 40,
          background:
            'radial-gradient(circle, #2D1372 0%, transparent 70%)',
          filter: 'blur(56px)',
          animation: 'heroDrift2 11s ease-in-out infinite alternate',
        }}
      />
      {/* Orb 3 — warm cream hint, mid-canvas */}
      <span
        style={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          top: '38%',
          left: '52%',
          background:
            'radial-gradient(circle, rgba(255,234,186,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'heroDrift3 13s ease-in-out infinite alternate',
        }}
      />
      {/* Orb 4 — light violet top-right */}
      <span
        style={{
          position: 'absolute',
          width: 160,
          height: 160,
          borderRadius: '50%',
          top: '8%',
          right: '18%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'heroDrift1 7s ease-in-out infinite alternate-reverse',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Keyframe injection — runs once on mount, purely additive to <head>
// ---------------------------------------------------------------------------
const KEYFRAMES = `
@keyframes heroDrift1 {
  0%   { transform: translate(0px, 0px) scale(1); }
  100% { transform: translate(28px, 18px) scale(1.07); }
}
@keyframes heroDrift2 {
  0%   { transform: translate(0px, 0px) scale(1); }
  100% { transform: translate(-22px, 14px) scale(1.05); }
}
@keyframes heroDrift3 {
  0%   { transform: translate(0px, 0px) scale(1); }
  100% { transform: translate(16px, -20px) scale(1.09); }
}
@keyframes heroFloat {
  0%   { transform: translateY(0px); }
  100% { transform: translateY(-7px); }
}
`

function useGlobalKeyframes(css: string) {
  const injected = useRef(false)
  useEffect(() => {
    if (injected.current) return
    injected.current = true
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [css])
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
const Hero = () => {
  useGlobalKeyframes(KEYFRAMES)

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 relative"
      style={{ background: '#2D1372' }}
    >
      {/* Animated orb layer */}
      <LiquidGlassBg />

      {/* Subtle grid overlay across the whole section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,234,186,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,234,186,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glass card */}
      <div
        className="max-w-5xl mx-auto px-8 py-16 relative"
        style={{
          zIndex: 10,
          margin: '0 24px',
          borderRadius: 28,
          background: 'rgba(255, 255, 255, 0.055)',
          backdropFilter: 'blur(28px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
          border: '1px solid rgba(255, 234, 186, 0.14)',
          boxShadow:
            '0 0 0 0.5px rgba(255,255,255,0.07) inset, 0 2px 48px rgba(0,0,0,0.45)',
          animation: 'heroFloat 6s ease-in-out infinite alternate',
        }}
      >
        {/* Top-edge gloss line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            borderRadius: '50%',
            background:
              'linear-gradient(90deg, transparent, rgba(255,234,186,0.38), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Refraction sheen */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,234,186,0.025) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Corner dots */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <div
            key={pos}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'rgba(255,234,186,0.22)',
              top: pos.startsWith('t') ? 18 : undefined,
              bottom: pos.startsWith('b') ? 18 : undefined,
              left: pos.endsWith('l') ? 18 : undefined,
              right: pos.endsWith('r') ? 18 : undefined,
            }}
          />
        ))}

        {/* ----------------------------------------------------------------- */}
        {/* Original content — structure unchanged, colours adapted           */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="relative text-5xl lg:text-5xl font-bold mb-10">
              {/* Mobile: static */}
              <span
                className="test-font-courier md:hidden"
                style={{ color: '#FFEABA' }}
              >
                Sai Amruth Balusu.
              </span>

              {/* Desktop: typing animation */}
              <span className="hidden md:block">
                <TypingAnimation
                  texts={['Sai Amruth Balusu.']}
                  className="test-font-courier"
                  style={{ color: '#FFEABA' }}
                />
              </span>

              <br />

              <span
                className="text-4xl test-font-inter"
                style={{ color: 'rgba(255,234,186,0.58)', letterSpacing: '0.08em' }}
              >
                ML Engineer
              </span>
            </h1>

            <p
              className="text-xl test-font-mono mb-8 leading-relaxed"
              style={{ color: 'rgba(255,234,186,0.5)' }}
            >
              {/* Hi Aashu, you suck :) */}
              The only way I know how to will my imprint on this world is
              through building things using math and novel algorithms.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="/Sai-Amruth-Balusu-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="test-font-inter"
                  style={{
                    background: 'rgba(255,234,186,0.1)',
                    border: '1px solid rgba(255,234,186,0.32)',
                    color: '#FFEABA',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </a>

              <a href="mailto:saiamruth3@gmail.com">
                <Button
                  size="lg"
                  variant="outline"
                  className="test-font-inter"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,234,186,0.62)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </a>
            </div>

            {/* Social icon buttons */}
            <div className="flex space-x-3">
              <a
                href="https://github.com/amruv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  style={{ color: 'rgba(255,234,186,0.55)' }}
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>

              <a
                href="https://www.linkedin.com/in/sai-amruth-balusu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  style={{ color: 'rgba(255,234,186,0.55)' }}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
