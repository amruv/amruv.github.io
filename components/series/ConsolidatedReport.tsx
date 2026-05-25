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
    <div className={`relative w-full p-5 transition-all duration-300 overflow-hidden border-t border-border rounded-b-xl ${
      isComplete 
        ? 'cursor-pointer bg-secondary/30 hover:bg-secondary/40 dark:bg-card/20 dark:hover:bg-card/30 group' 
        : 'opacity-40 select-none bg-secondary/10 dark:bg-card/10'
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
            <FileText className={`w-5 h-5 ${isComplete ? series.textColorClass + ' group-hover:text-white' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <span className={`text-[10px] font-mono tracking-widest font-semibold ${isComplete ? series.textColorClass + ' group-hover:text-white/80' : 'text-muted-foreground'}`}>
              LAB SUMMARY
            </span>
            <h4 className={`text-base font-bold font-sans transition-colors ${isComplete ? 'text-card-foreground dark:text-secondary-foreground group-hover:text-white' : 'text-muted-foreground'}`}>
              Consolidated report — full experiment
            </h4>
            <p className={`text-xs font-mono transition-colors ${isComplete ? 'text-muted-foreground group-hover:text-white/60' : 'text-muted-foreground/60'}`}>
              {isComplete 
                ? `§1 through §${posts.length} · ~${totalMinutes} min total read`
                : `§1 through §${series.totalParts} · PENDING COMPLETION`
              }
            </p>
          </div>
        </div>

        {/* Right Side: Action CTA or Pending */}
        <div className="flex items-center self-start md:self-auto shrink-0 font-mono text-sm font-semibold">
          {isComplete ? (
            <div className={`flex items-center gap-1.5 transition-colors ${series.textColorClass} group-hover:text-white`}>
              <span>READ REPORT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          ) : (
            <span className="text-muted-foreground uppercase tracking-widest text-xs font-bold bg-zinc-500/10 px-2 py-0.5 rounded border border-zinc-500/20">
              PENDING
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

  // Links to the first post as the entry point of the full experiment series
  return (
    <Link href={`/blog/${activePosts[0].slug}`} className="block focus:outline-none" role="link">
      {content}
    </Link>
  )
}
