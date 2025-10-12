'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'


type BlogPostMeta = {
  slug: string
  title?: string
  description?: string
  category?: string
  date?: string
  readTime?: string
  tags?: string[]
  gradient?: string
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient ?? ''} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          {post.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <CardDescription className="text-sm leading-relaxed mb-4">
                        {post.description}
                      </CardDescription>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags?.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:text-background">
                          Read more
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog


