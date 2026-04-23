'use client'

import React from 'react'
import { motion } from 'framer-motion'
import BlogGrid from '@/app/blog/BlogGrid.client'

type BlogPostMeta = {
  slug: string
  title?: string
  description?: string
  category?: string
  date?: string
  readTime?: string
  tags?: string[]
  gradient?: string
  coverImage?: string
}

const Blog = ({ posts }: { posts: BlogPostMeta[] }) => {
  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 test-font-courier text-accent">Blog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto test-font-mono">
            Sharing insights, tutorials, and thoughts on machine learning research and development
          </p>
        </motion.div>

        <BlogGrid posts={posts} />
      </div>
    </section>
  )
}

export default Blog
