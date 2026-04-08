'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { motion, useSpring, useTransform, useMotionValue, MotionValue } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import TypingAnimation from '@/components/ui/typing effect'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface OrbConfig {
  width: number
  height: number
  background: string
  blur: number
  // base position as fraction of section dims (0–1), used as resting anchor
  anchorX: number
  anchorY: number
  // how strongly this orb tracks the cursor (0 = none, 1 = 1:1)
  followStrength: number
  // spring config — heavier orbs feel more inertial
  stiffness: number
  damping: number
}

const ORBS: OrbConfig[] = [
  {
    width: 520,
    height: 520,
    background: 'radial-gradient(circle, #6B3FD4 0%, #2D1372 60%, transparent 100%)',
    blur: 72,
    anchorX: -0.08,
    anchorY: -0.18,
    followStrength: 0.28,
    stiffness: 40,
    damping: 22,
  },
  {
    width: 360,
    height: 360,
    background: 'radial-gradient(circle, #4A1DB5 0%, transparent 70%)',
    blur: 60,
    anchorX: 0.88,
    anchorY: 0.82,
    followStrength: -0.18, // negative → moves opposite the cursor (parallax)
    stiffness: 30,
    damping: 18,
  },
  {
    width: 240,
    height: 240,
    background: 'radial-gradient(circle, rgba(255,234,186,0.16) 0%, transparent 70%)',
    blur: 52,
    anchorX: 0.55,
    anchorY: 0.42,
    followStrength: 0.45,
    stiffness: 55,
    damping: 20,
  },
  {
    width: 180,
    height: 180,
    background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)',
    blur: 44,
    anchorX: 0.78,
    anchorY: 0.1,
    followStrength: 0.35,
    stiffness: 65,
    damping: 24,
  },
]

// ---------------------------------------------------------------------------
// Single cursor-reactive orb
// ---------------------------------------------------------------------------
interface OrbProps {
  config: OrbConfig
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
  sectionW: MotionValue<number>
  sectionH: MotionValue<number>
}

function Orb({ config, cursorX, cursorY, sectionW, sectionH }: OrbProps) {
  const { width, height, background, blur, anchorX, anchorY, followStrength, stiffness, damping } = config

  // Raw target = anchor position (px) + cursor offset scaled by followStrength
  const rawX = useTransform(
    [cursorX, sectionW] as MotionValue[],
    ([cx, sw]: number[]) => anchorX * sw - width / 2 + cx * followStrength,
  )
  const rawY = useTransform(
    [cursorY, sectionH] as MotionValue[],
    ([cy, sh]: number[]) => anchorY * sh - height / 2 + cy * followStrength,
  )

  const x = useSpring(rawX, { stiffness, damping, mass: 1 })
  const y = useSpring(rawY, { stiffness, damping, mass: 1 })

  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: '50%',
        background,
        filter: `blur(${blur}px)`,
        top: 0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// Fluid background — listens to mousemove on the parent section
// ---------------------------------------------------------------------------
function LiquidGlassBg() {
  // Raw motion values — each Orb applies its own spring physics
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const sectionW = useMotionValue(0)
  const sectionH = useMotionValue(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      // cursor relative to section centre → (0,0) = centre
      cursorX.set(e.clientX - rect.left - rect.width / 2)
      cursorY.set(e.clientY - rect.top - rect.height / 2)
    },
    [cursorX, cursorY],
  )

  const handleMouseLeave = useCallback(() => {
    // Snap back to centre when cursor leaves the section
    cursorX.set(0)
    cursorY.set(0)
  }, [cursorX, cursorY])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateSize = () => {
      sectionW.set(el.offsetWidth)
      sectionH.set(el.offsetHeight)
    }
    updateSize()

    const ro = new ResizeObserver(updateSize)
    ro.observe(el)

    // Attach listeners to the parent <section> so the entire viewport is reactive
    const section = el.parentElement
    section?.addEventListener('mousemove', handleMouseMove)
    section?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      ro.disconnect()
      section?.removeEventListener('mousemove', handleMouseMove)
      section?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave, sectionW, sectionH])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {ORBS.map((cfg, i) => (
        <Orb
          key={i}
          config={cfg}
          cursorX={cursorX}
          cursorY={cursorY}
          sectionW={sectionW}
          sectionH={sectionH}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inject the card float keyframe once on mount
// ---------------------------------------------------------------------------
const FLOAT_KEYFRAME = `
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
  useGlobalKeyframes(FLOAT_KEYFRAME)

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 relative"
      style={{ background: '#2D1372' }}
    >
      {/* Cursor-reactive fluid orbs */}
      <LiquidGlassBg />

      {/* Subtle grid overlay */}
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
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 234, 186, 0.12)',
          boxShadow:
            '0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 4px 40px rgba(0,0,0,0.18)',
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

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="relative text-5xl lg:text-5xl font-bold mb-10">
              <span
                className="test-font-courier md:hidden"
                style={{ color: '#FFEABA' }}
              >
                Sai Amruth Balusu.
              </span>

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
