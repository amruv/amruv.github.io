import React from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/sections/hero'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects'
import Publications from '@/components/sections/publications'
import Blog from '@/components/sections/blog'
import Certifications from '@/components/sections/certifications'
import Contact from '@/components/sections/contact'
import { getBlogPosts } from '@/lib/series'

export default function Home() {
  const posts = getBlogPosts().slice(0, 6)

  return (
    <main className="relative">
      <Navigation />
      <div className="space-y-0">
        <Hero />
        <Experience />
        <Projects />
        <Publications />
        <Blog posts={posts} />
        <Certifications />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="test-font-mono text-primary">
            © 2026 Sai Amruth Balusu.
          </p>
          <p className="test-font-mono text-accent"> All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

