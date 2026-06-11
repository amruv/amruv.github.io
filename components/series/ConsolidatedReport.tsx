'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, ArrowRight } from 'lucide-react'
import { BlogPostMeta } from '@/lib/types'
import { SeriesMeta } from '@/lib/series'

interface ConsolidatedReportProps {
  series: SeriesMeta
  posts: BlogPostMeta[]
}

export default function ConsolidatedReport({ series, posts }: ConsolidatedReportProps) {
  const isComplete = series.status === 'complete'

  // Calculate total reading time from all published parts
  const activePosts = posts.filter(p => p.published !== false)
  const totalMinutes = activePosts.reduce((acc, p) => {
    const timeMatch = p.readTime?.match(/\d+/)
    return acc + (timeMatch ? parseInt(timeMatch[0]) : 0)
  }, 0)

  // Use the cover image of the first post as the background
  const coverImage = activePosts[0]?.coverImage
  const hasImage = !!coverImage

  const content = (
    <div className={`relative w-full p-5 transition-all duration-300 overflow-hidden border-t border-border rounded-b-xl ${isComplete
      ? 'cursor-pointer bg-card hover:bg-card/50 group'
      : 'opacity-40 select-none bg-card'
      }`}>
      {/* Cover image overlay on hover (Reused from BlogGrid.client.tsx) */}
      {isComplete && hasImage && (
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
          <Image
            src={coverImage}
            alt={`${series.title} Consolidated Report`}
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/80 dark:bg-black/85" />
        </div>
      )}

      {/* Grid wrapper for layout */}
      <div className="relative z-30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: File Icon, Title, and parts/time breakdown */}
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-lg border bg-card/80 dark:bg-card/40 border-border shrink-0 transition-colors group-hover:bg-white/10 group-hover:border-white/20`}>
            <FileText className={`w-5 h-5 ${isComplete ? hasImage ? 'text-primary group-hover:text-white' : 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <span className={`text-xs test-font-mono transition-colors ${isComplete ? hasImage ? 'text-muted-foreground group-hover:text-gray-300' : 'text-muted-foreground' : 'text-muted-foreground'}`}>
              {isComplete ? 'Complete Series' : 'Incomplete Series'}
            </span>
            <h4 className={`text-base font-semibold leading-tight transition-colors test-font-mono ${isComplete ? hasImage ? 'text-primary group-hover:text-white group-hover:drop-shadow-md' : 'text-primary' : 'text-muted-foreground'}`}>
              {series.title} - {isComplete ? 'Full Blog' : 'In Progress'}
            </h4>
            <p className={`text-sm transition-colors test-font-inter ${isComplete ? hasImage ? 'text-muted-foreground group-hover:text-gray-200' : 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
              {isComplete
                ? `Parts 1 through ${posts.length} · ${totalMinutes} min total read`
                : `Parts 1 through ${series.totalParts} · PENDING COMPLETION`
              }
            </p>
          </div>
        </div>

        {/* Right Side: Action CTA or Pending */}
        <div className="flex items-center self-start md:self-auto shrink-0 font-mono text-sm font-semibold">
          {isComplete ? (
            <div className={`flex items-center gap-1.5 transition-colors test-font-inter ${hasImage ? 'text-accent group-hover:text-white' : 'text-accent'}`}>
              <span>Read report</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              Pending
            </span>
          )}
        </div>
      </div>
    </div>
  )

  // If incomplete, it shouldn't link anywhere
  if (!isComplete || activePosts.length === 0) {
    return (
      <div aria-disabled="true">
        {content}
      </div>
    )
  }

  // Links to the consolidated report or the first post as the entry point of the series
  const targetSlug = series.consolidatedSlug || activePosts[0]?.slug

  if (!targetSlug) return <div aria-disabled="true">{content}</div>

  return (
    <Link href={`/blog/${targetSlug}`} className="block focus:outline-none" role="link">
      {content}
    </Link>
  )
}
