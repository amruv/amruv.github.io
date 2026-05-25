import React from 'react'
import { Badge } from '@/components/ui/badge'
import { SeriesMeta } from '@/lib/series'

interface ExperimentHeaderProps {
  series: SeriesMeta
  activePartsCount: number
}

export default function ExperimentHeader({ series, activePartsCount }: ExperimentHeaderProps) {
  const getStatusBadge = () => {
    switch (series.status) {
      case 'complete':
        return (
          <Badge 
            variant="outline" 
            className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 px-3 py-1 font-mono tracking-wider font-semibold text-[11px]"
          >
            COMPLETE
          </Badge>
        )
      case 'in-progress':
        return (
          <Badge 
            variant="outline" 
            className="bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400 dark:border-purple-500/30 px-3 py-1 font-mono tracking-wider font-semibold text-[11px]"
          >
            IN PROGRESS · {activePartsCount}/{series.totalParts}
          </Badge>
        )
      case 'planned':
      default:
        return (
          <Badge 
            variant="outline" 
            className="bg-zinc-500/10 text-zinc-500 border-zinc-500/20 dark:text-zinc-400 dark:border-zinc-500/30 px-3 py-1 font-mono tracking-wider font-semibold text-[11px]"
          >
            PLANNED
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-card/60 dark:bg-card/40 border-b border-border rounded-t-xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className={`text-sm font-mono font-bold uppercase tracking-widest ${series.textColorClass}`}>
          {series.seriesId.replace('-', ' · ')}
        </span>
        <span className="hidden sm:inline text-muted-foreground/40">•</span>
        <h3 className="text-lg font-medium tracking-tight text-card-foreground dark:text-secondary-foreground font-sans">
          {series.title}
        </h3>
      </div>
      <div className="flex items-center self-start md:self-auto">
        {getStatusBadge()}
      </div>
    </div>
  )
}
