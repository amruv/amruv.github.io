'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, LayoutGrid } from 'lucide-react'
import BlogGrid from './BlogGrid.client'
import SeriesExperiment from '@/components/series/SeriesExperiment'
import { cn } from '@/lib/utils'
import type { BlogPostMeta } from '@/lib/types'
import type { SeriesWithPosts } from '@/lib/series'

type BlogView = 'grid' | 'notebook'

interface BlogViewSwitcherProps {
  posts: BlogPostMeta[]
  seriesList: SeriesWithPosts[]
}

const viewOptions: Array<{
  value: BlogView
  label: string
  Icon: React.ComponentType<{ className?: string }>
}> = [
  { value: 'grid', label: 'Grid', Icon: LayoutGrid },
  { value: 'notebook', label: 'Notebook', Icon: BookOpen },
]

export default function BlogViewSwitcher({ posts, seriesList }: BlogViewSwitcherProps) {
  const [activeView, setActiveView] = React.useState<BlogView>('grid')

  return (
    <>
      <div className="bg-background border-b border-border pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 test-font-courier text-primary">
                Blog
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl test-font-mono leading-relaxed">
                Sharing insights, tutorials, and thoughts on machine learning research and development
              </p>
            </div>

            <div
              className="relative inline-grid grid-cols-2 self-start md:self-auto rounded-lg border border-border bg-card/70 p-1 shadow-sm"
              role="tablist"
              aria-label="Blog view"
            >
              {viewOptions.map(({ value, label, Icon }) => {
                const isActive = activeView === value

                return (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={cn(
                      'relative z-10 inline-flex h-11 min-w-[126px] items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors test-font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setActiveView(value)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="blog-view-toggle-active"
                        className="absolute inset-0 -z-10 rounded-md bg-primary shadow-sm"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <AnimatePresence mode="wait" initial={false}>
          {activeView === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(3px)' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <BlogGrid posts={posts} />
            </motion.div>
          ) : (
            <motion.div
              key="notebook"
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(3px)' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="flex flex-col">
                {seriesList.map((series) => (
                  <SeriesExperiment key={series.seriesId} series={series} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
