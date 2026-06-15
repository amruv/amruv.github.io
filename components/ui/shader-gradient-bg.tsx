'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useGradient } from '@/components/gradient-provider'

// Dynamically import ShaderGradient components with SSR disabled
// This is required because Three.js / WebGL APIs are browser-only
// and would break Next.js static export if rendered server-side.
const ShaderGradientCanvas = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
)

const ShaderGradient = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradient),
  { ssr: false }
)

const ShaderGradientBg: React.FC = () => {
  const { isAnimating } = useGradient()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ShaderGradient
          animate={isAnimating ? 'on' : 'off'}
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={3.59}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#cc5500"
          color2="#fffbef"
          color3="#8faa92"
          envPreset="city"
          grain="on"
          lightType="3d"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="plane"
          uAmplitude={1}
          uDensity={1.3}
          uFrequency={5.5}
          uSpeed={0.4}
          uStrength={4}
          uTime={0}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}

export default ShaderGradientBg
