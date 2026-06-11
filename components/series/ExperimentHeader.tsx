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
            className="text-xs font-medium"
          >
            Complete
          </Badge>
        )
      case 'in-progress':
        return (
          <Badge 
            variant="outline" 
            className="text-xs font-medium"
          >
            In progress · {activePartsCount}/{series.totalParts}
          </Badge>
        )
      case 'planned':
      default:
        return (
          <Badge 
            variant="outline" 
            className="text-xs font-medium text-muted-foreground"
          >
            Planned
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-card border-b border-border rounded-t-xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Badge variant="outline" className="text-xs font-medium">
          {series.seriesId.replace('-', ' · ')}
        </Badge>
        <span className="hidden sm:inline text-muted-foreground/40">•</span>
        <h3 className="text-lg font-semibold leading-tight text-primary test-font-mono">
          {series.title}
        </h3>
      </div>
      <div className="flex items-center self-start md:self-auto">
        {getStatusBadge()}
      </div>
    </div>
  )
}
