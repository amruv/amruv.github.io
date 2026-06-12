'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, ChevronRight, ChevronDown, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

import { BlogPostMeta } from '@/lib/types'

type BlogGridProps = {
  posts: BlogPostMeta[]
  maxGroups?: number
}

type BlogGridGroup =
  | { kind: 'series'; parent: BlogPostMeta; children: BlogPostMeta[] }
  | { kind: 'post'; post: BlogPostMeta }

function buildBlogGroups(posts: BlogPostMeta[], maxGroups?: number): BlogGridGroup[] {
  const parentsBySeries = new Map<string, BlogPostMeta>()
  const childrenBySeries = new Map<string, BlogPostMeta[]>()

  posts.forEach((post) => {
    if (!post.seriesId) {
      return
    }

    if (typeof post.part === 'number') {
      const children = childrenBySeries.get(post.seriesId) || []
      children.push(post)
      childrenBySeries.set(post.seriesId, children)
      return
    }

    parentsBySeries.set(post.seriesId, post)
  })

  childrenBySeries.forEach((children) => {
    children.sort((a, b) => (a.part || 0) - (b.part || 0))
  })

  const groups = posts
    .filter((post) => {
      const isChildWithParent = post.seriesId && typeof post.part === 'number' && parentsBySeries.has(post.seriesId)
      return !isChildWithParent
    })
    .map((post): BlogGridGroup => {
      const children = post.seriesId ? childrenBySeries.get(post.seriesId) || [] : []

      if (children.length > 0 && typeof post.part !== 'number') {
        return { kind: 'series', parent: post, children }
      }

      return { kind: 'post', post }
    })

  return typeof maxGroups === 'number' ? groups.slice(0, maxGroups) : groups
}

function BlogPostCard({
  post,
  compact = false,
  href = `/blog/${post.slug}`,
  footerAction,
}: {
  post: BlogPostMeta
  compact?: boolean
  href?: string
  footerAction?: React.ReactNode
}) {
  const hasImage = !!post.coverImage

  return (
    <Card className="h-full hover:shadow-lg transition-[box-shadow,color] duration-300 group overflow-hidden cursor-pointer">
      <Link href={href} className="absolute inset-x-0 top-0 bottom-16 z-40" aria-label={`Read ${post.title}`} />

      {hasImage && (
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
          <Image
            src={post.coverImage!}
            alt={post.title ?? ''}
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
            sizes={compact ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative z-30 overflow-y-auto pb-16">
        <CardHeader className={compact ? 'pb-3 p-5' : 'pb-4'}>
          <div className="flex items-center justify-between mb-2 gap-3">
            <Badge variant="outline" className={`text-xs test-font-mono transition-colors ${hasImage ? 'group-hover:text-white group-hover:border-white/50' : ''}`}>
              {typeof post.part === 'number' ? `Part ${post.part}` : post.category}
            </Badge>
            <div className={`flex items-center space-x-2 text-xs text-muted-foreground transition-colors shrink-0 ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <CardTitle className={`${compact ? 'text-base' : 'text-lg'} font-semibold leading-tight transition-colors ${hasImage ? 'group-hover:text-white group-hover:drop-shadow-md' : 'group-hover:text-primary'}`}>
            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent className={compact ? 'pb-4 px-5' : 'pb-4'}>
          <CardDescription className={`${compact ? 'text-xs line-clamp-3' : 'text-sm'} leading-relaxed mb-4 transition-colors ${hasImage ? 'group-hover:text-gray-200' : ''}`}>
            {post.description}
          </CardDescription>

          <div className="flex flex-wrap gap-1 mb-4">
            {(compact ? [post.partTag, ...(post.tags || []).slice(2,)].filter(Boolean) : post.tags)?.map((tag, tagIndex) => (
              <Badge key={`${tag}-${tagIndex}`} variant="outline" className={`text-xs transition-colors ${hasImage ? 'group-hover:text-white group-hover:border-white/40' : ''}`}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter className={`absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between ${compact ? 'px-5 pb-5' : ''}`}>
        <div className={`flex items-center space-x-1 text-xs text-muted-foreground transition-colors ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
          <Calendar className="w-3 h-3" />
          <span>{post.date}</span>
        </div>
        {footerAction || (
          <Link href={href} className={`inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-accent transition-colors ${hasImage ? 'group-hover:text-white group-hover:border-white/40' : ''}`}>
            Read more
            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

function LinkedBlogPostCard({ post, compact = false }: { post: BlogPostMeta; compact?: boolean }) {
  return <BlogPostCard post={post} compact={compact} />
}

function SeriesBlogGroup({ parent, seriesPosts, index }: { parent: BlogPostMeta; seriesPosts: BlogPostMeta[]; index: number }) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const hasImage = !!parent.coverImage

  return (
    <motion.div
      key={parent.slug}
      className={isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex gap-4 items-stretch relative w-full">
        {/* Toggle + Parent card group – items-center keeps button at exact vertical center of parent card */}
        <div className="flex items-center gap-4 w-full md:w-auto md:shrink-0">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsExpanded((current) => !current)}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-accent/40 bg-card hover:bg-accent/10 text-accent transition-all duration-300 shadow-sm shrink-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label={isExpanded ? 'Collapse series' : 'Expand series'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </motion.button>

          {/* Parent card wrapper */}
          <motion.div
            className="relative z-10 flex-1 min-w-0 md:flex-none md:w-[280px] lg:w-[320px] self-stretch"
          >
            <BlogPostCard
              post={parent}
              footerAction={
                <div className="flex items-center gap-2">
                  <Link href={`/blog/${parent.slug}`} className={`inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-accent transition-colors ${hasImage ? 'group-hover:text-white' : ''}`}>
                    Read more
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Button
                    type="button"
                    variant="transparent"
                    size="sm"
                    aria-expanded={isExpanded}
                    aria-controls={`${parent.slug}-parts`}
                    className={`text-accent transition-colors ${hasImage ? 'group-hover:text-white group-hover:border-white/40' : ''}`}
                    onClick={() => setIsExpanded((current) => !current)}
                  >
                    <Layers className="w-3 h-3 mr-1" />
                    Parts
                    <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${isExpanded ? 'rotate-90 md:rotate-0' : ''}`} />
                  </Button>
                </div>
              }
            />
          </motion.div>
        </div>

        {/* Children container wrapper */}
        <motion.div
          id={`${parent.slug}-parts`}
          className="relative z-0 overflow-hidden min-w-0"
          initial={false}
          animate={isExpanded ? 'open' : 'closed'}
          variants={{
            open: {
              opacity: 1,
              x: 0,
              scale: 1,
              flexGrow: 2,
              flexShrink: 2,
              flexBasis: '0%',
              display: 'block',
            },
            closed: {
              opacity: 0,
              x: -20, // slides behind parent card
              scale: 0.98,
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: '0%',
              transitionEnd: { display: 'none' }
            }
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden={!isExpanded}
        >
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 h-full">
            {seriesPosts.map((child) => (
              <div key={child.slug} className="min-w-0 h-full">
                <LinkedBlogPostCard post={child} compact />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function BlogGrid({ posts, maxGroups }: BlogGridProps) {
  const groups = React.useMemo(() => buildBlogGroups(posts, maxGroups), [posts, maxGroups])

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group, index) =>
        group.kind === 'series' ? (
          <SeriesBlogGroup key={group.parent.slug} parent={group.parent} seriesPosts={group.children} index={index} />
        ) : (
          <motion.div
            key={group.post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <LinkedBlogPostCard post={group.post} />
          </motion.div>
        )
      )}
    </div>
  )
}
