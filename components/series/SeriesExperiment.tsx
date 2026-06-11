import React from 'react'
import { SeriesWithPosts } from '@/lib/series'
import ExperimentHeader from './ExperimentHeader'
import SectionRow from './SectionRow'
import ConsolidatedReport from './ConsolidatedReport'

interface SeriesExperimentProps {
  series: SeriesWithPosts
}

export default function SeriesExperiment({ series }: SeriesExperimentProps) {
  const activePosts = series.posts.filter((p) => p.published !== false)

  return (
    <div className="relative border border-border rounded-xl bg-card/25 dark:bg-card/10 backdrop-blur-[2px] transition-all duration-300 hover:border-border/80 shadow-sm flex flex-col mb-16">
      {/* 1. Header */}
      <ExperimentHeader series={series} activePartsCount={activePosts.length} />

      {/* 2. Section Rows (List of posts within the series) */}
      <div className="flex flex-col">
        {series.posts.map((post) => (
          <SectionRow key={post.slug} post={post} />
        ))}
      </div>

      {/* 3. Consolidated Report */}
      <ConsolidatedReport series={series} posts={series.posts} />
    </div>
  )
}
