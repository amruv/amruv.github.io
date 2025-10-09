'use client'

import React, { useEffect, useRef } from 'react'

interface GeometricBackgroundProps {
  className?: string
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      // Make canvas larger than viewport to ensure full coverage
      canvas.width = Math.max(window.innerWidth, 1920) // Minimum 1920px width
      canvas.height = Math.max(window.innerHeight, 1080) // Minimum 1080px height
      drawGeometricPattern()
    }

    const drawGeometricPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set up colors with transparency - all using #2C3E50
      const primaryColor = 'rgba(44, 62, 80, 0.08)' // #2C3E50 with low opacity
      const accentColor = 'rgba(44, 62, 80, 0.06)' // #2C3E50 with lower opacity
      const mutedColor = 'rgba(44, 62, 80, 0.04)' // #2C3E50 with very low opacity

      // Generate distributed points across the entire canvas
      const points: Array<{x: number, y: number, size: number, color: string}> = []
      
      // Create evenly distributed points across the entire canvas
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        
        const size = Math.random() * 1 + 0.3 // Smaller points
        const color = Math.random() > 0.7 ? primaryColor : 
                     Math.random() > 0.4 ? accentColor : mutedColor
        points.push({ x, y, size, color })
      }

      // Add some concentrated clusters for visual interest
      for (let cluster = 0; cluster < 8; cluster++) {
        const centerX = Math.random() * canvas.width
        const centerY = Math.random() * canvas.height
        const clusterSize = 20 + Math.random() * 30 // Slightly larger clusters
        
        for (let i = 0; i < 6 + Math.random() * 10; i++) {
          const angle = Math.random() * 2 * Math.PI
          const distance = Math.random() * clusterSize
          const x = centerX + distance * Math.cos(angle)
          const y = centerY + distance * Math.sin(angle)
          
          // Only add points within canvas bounds
          if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
            const size = Math.random() * 0.8 + 0.2 // Smaller points
            const color = Math.random() > 0.6 ? primaryColor : 
                         Math.random() > 0.3 ? accentColor : mutedColor
            points.push({ x, y, size, color })
          }
        }
      }

      // Draw all points
      points.forEach(point => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI)
        ctx.fillStyle = point.color
        ctx.fill()
      })

      // Draw connecting lines between nearby points - more spaced out
      ctx.strokeStyle = accentColor
      ctx.lineWidth = 0.3 // Thinner lines
      
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Connect points within a larger distance but with lower probability
          if (distance < 120 && Math.random() > 0.92) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      // Add some geometric shapes - more distributed across full canvas
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 0.5 // Thinner lines
      
      // Draw some circles - more distributed
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = 8 + Math.random() * 15 // Smaller circles
        
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.stroke()
      }

      // Draw some triangles - more distributed
      for (let i = 0; i < 6; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = 6 + Math.random() * 10 // Smaller triangles
        
        ctx.beginPath()
        ctx.moveTo(x, y - size)
        ctx.lineTo(x + size * Math.cos(Math.PI / 6), y + size * Math.sin(Math.PI / 6))
        ctx.lineTo(x - size * Math.cos(Math.PI / 6), y + size * Math.sin(Math.PI / 6))
        ctx.closePath()
        ctx.stroke()
      }

      // Add some hexagons - more distributed
      for (let i = 0; i < 4; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = 5 + Math.random() * 8 // Smaller hexagons
        
        ctx.beginPath()
        for (let j = 0; j < 6; j++) {
          const angle = (j * Math.PI) / 3
          const px = x + radius * Math.cos(angle)
          const py = y + radius * Math.sin(angle)
          if (j === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.closePath()
        ctx.stroke()
      }
    }

    // Initial draw
    resizeCanvas()

    // Handle resize
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}

export default GeometricBackground
