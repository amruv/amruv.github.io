import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import React from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/sections/hero'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects'
import Publications from '@/components/sections/publications'
import Blog from '@/components/sections/blog'
import Certifications from '@/components/sections/certifications'
import Contact from '@/components/sections/contact'

export default function Home() {
  const postsDir = path.join(process.cwd(), 'content/blog/')
  const files = fs.readdirSync(postsDir)
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(source)
      return { slug, ...data }
    })
    .slice(0, 6)

  return (
    <main className="relative">
      <Navigation />
      <div className="space-y-0">
        <Hero />
        <Experience />
        <Projects />
        <Publications />
        <Blog posts={posts as any} />
        <Certifications />
        <Contact />
      </div>
      
      {/* Footer */}
      <footer className="bg-secondary/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground test-font-mono">
            © 2025 Sai Amruth Balusu. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  )
}


