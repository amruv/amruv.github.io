'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

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

export default function BlogGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        const hasImage = !!post.coverImage

        return (
          <motion.div key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer">

                {/* Cover image overlay on hover */}
                {hasImage && (
                  <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Image
                      src={post.coverImage!}
                      alt={post.title ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                )}

                <div className="relative z-30 overflow-y-auto pb-16">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`text-xs font-medium transition-colors ${hasImage ? 'group-hover:text-white group-hover:border-white/50' : ''}`}>
                        {post.category}
                      </Badge>
                      <div className={`flex items-center space-x-2 text-xs text-muted-foreground transition-colors ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className={`text-lg font-semibold leading-tight transition-colors ${hasImage ? 'group-hover:text-white group-hover:drop-shadow-md' : 'group-hover:text-primary'}`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <CardDescription className={`text-sm leading-relaxed mb-4 transition-colors ${hasImage ? 'group-hover:text-gray-200' : ''}`}>
                      {post.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags?.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className={`text-xs transition-colors ${hasImage ? 'group-hover:text-white group-hover:border-white/40' : ''}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                  </CardContent>
                </div>

                <CardFooter className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between">
                  <div className={`flex items-center space-x-1 text-xs text-muted-foreground transition-colors ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <Button variant="transparent" size="sm" className={`text-accent transition-colors ${hasImage ? 'group-hover:text-white group-hover: bg-transparent group-hover:border-white/40' : ''}`}>
                    Read more
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}


