'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { BlogPostMeta } from '@/lib/types'

interface SectionRowProps {
  post: BlogPostMeta
}

export default function SectionRow({ post }: SectionRowProps) {
  const isPublished = post.published !== false
  const hasImage = !!post.coverImage

  const content = (
    <div className={`relative w-full border-b border-border last:border-b-0 p-5 group overflow-hidden transition-all duration-300 ${isPublished ? 'cursor-pointer hover:bg-card/50' : 'opacity-40 select-none'
      }`}>
      {/* Cover image overlay on hover (Reused from BlogGrid.client.tsx) */}
      {isPublished && hasImage && (
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
          <Image
            src={post.coverImage!}
            alt={post.title ?? ''}
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          {/* Subtle dark overlay to ensure readability */}
          <div className="absolute inset-0 bg-black/75 dark:bg-black/80" />
        </div>
      )}

      {/* Content wrapper ensuring z-30 layout */}
      <div className="relative z-30 grid grid-cols-12 items-center gap-4">
        {/* Column 1: Index Symbol (§N) - Collapses on mobile */}
        <div className="hidden md:block md:col-span-1 text-center">
          <span className={`text-sm text-muted-foreground transition-colors test-font-inter ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
            {post.part}
          </span>
        </div>

        {/* Column 2: Content Area (Pill, Title, Muted description) */}
        <div className="col-span-9 md:col-span-9 flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            {/* Mobile inline §N index */}
            <span className={`md:hidden text-muted-foreground text-xs mr-1 transition-colors test-font-inter ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
              §{post.part}
            </span>
            <Badge
              variant="outline"
              className={`text-xs font-medium transition-colors ${isPublished
                ? hasImage ? 'group-hover:text-white group-hover:border-white/40' : ''
                : 'text-muted-foreground'
                }`}
              aria-hidden="true"
            >
              {post.partTag}
            </Badge>
          </div>

          <h4 className={`text-base font-semibold leading-tight transition-colors test-font-mono ${isPublished
            ? hasImage ? 'text-primary group-hover:text-white group-hover:drop-shadow-md' : 'text-primary'
            : 'text-muted-foreground italic'
            }`}>
            {post.title}
          </h4>

          <p className={`text-sm line-clamp-1 leading-relaxed transition-colors test-font-inter ${isPublished
            ? hasImage ? 'text-muted-foreground group-hover:text-gray-200' : 'text-muted-foreground'
            : 'text-muted-foreground/60'
            }`}>
            {isPublished ? post.description : 'Section not yet published'}
          </p>
        </div>

        {/* Column 3: Read time */}
        <div className={`col-span-3 md:col-span-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground transition-colors test-font-inter ${hasImage ? 'group-hover:text-gray-300' : ''}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  )

  if (!isPublished) {
    return (
      <div aria-disabled="true">
        {content}
      </div>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block focus:outline-none" role="link">
      {content}
    </Link>
  )
}
