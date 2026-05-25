import React from 'react'
import Navigation from '@/components/navigation'
import SeriesExperiment from '@/components/series/SeriesExperiment'
import { getSeriesWithPosts } from '@/lib/series'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Blog Series - Sai Amruth Balusu',
  description: 'Machine learning blog series organized as experiment logs in a lab notebook layout.',
}

export default function SeriesIndexPage() {
  const seriesList = getSeriesWithPosts()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <div className="bg-background border-b border-border pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="test-font-mono">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 test-font-courier text-primary leading-tight">
              Lab Notebook
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl test-font-mono leading-relaxed">
              Scientific experiment logs & focused research series detailing deep neural networks, transformer architectures, and modern ML engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Series Grid/List */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col">
          {seriesList.map((series) => (
            <SeriesExperiment key={series.seriesId} series={series} />
          ))}
        </div>
      </div>
    </main>
  )
}
