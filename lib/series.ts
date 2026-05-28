import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPostMeta } from './types'

export type SeriesMeta = {
  seriesId: string
  seriesOrder: number
  title: string
  status: 'complete' | 'in-progress' | 'planned'
  totalParts: number
  accentColor: string // hex code or tailwind color class
  textColorClass: string
  borderColorClass: string
  badgeColorClass: string
  consolidatedSlug?: string
}

export type SeriesWithPosts = SeriesMeta & {
  posts: BlogPostMeta[]
}

// Assigned colors from existing personal site palette:
// Burnt Orange (#CC5500, var(--primary)) for exp-001
export const SERIES_REGISTRY: Record<string, SeriesMeta> = {
  'exp-001': {
    seriesId: 'exp-001',
    seriesOrder: 1,
    title: 'How tf do LLMs work?',
    status: 'complete',
    totalParts: 4,
    accentColor: '#CC5500',
    textColorClass: 'text-primary',
    borderColorClass: 'border-primary/50',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
    consolidatedSlug: 's1'
  },
  'exp-002': {
    seriesId: 'exp-002',
    seriesOrder: 2,
    title: 'How tf do LLMs Learn?',
    status: 'planned',
    totalParts: 5,
    accentColor: '#8FAA92',
    textColorClass: 'text-accent',
    borderColorClass: 'border-accent/50',
    badgeColorClass: 'bg-muted/10 text-muted-foreground border-muted/20'
  }
}

export function getSeriesWithPosts(): SeriesWithPosts[] {
  const postsDir = path.join(process.cwd(), 'content/blog/')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs.readdirSync(postsDir)
  const posts: BlogPostMeta[] = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(source)
      return {
        slug,
        ...data,
        // Default published to true if not specified
        published: data.published !== false
      } as BlogPostMeta
    })

  // Group posts by seriesId
  const groupedPosts: Record<string, BlogPostMeta[]> = {}
  posts.forEach((post) => {
    if (post.seriesId) {
      if (!groupedPosts[post.seriesId]) {
        groupedPosts[post.seriesId] = []
      }
      groupedPosts[post.seriesId].push(post)
    }
  })

  // Map registry series with posts
  const seriesList: SeriesWithPosts[] = Object.values(SERIES_REGISTRY).map((series) => {
    const seriesPosts = groupedPosts[series.seriesId] || []
    
    // Sort posts by part order
    const sortedPosts = [...seriesPosts].sort((a, b) => (a.part || 0) - (b.part || 0))

    // If a series is planned and has no posts yet, we can create placeholder posts
    // according to totalParts or just keep it empty. 
    // Let's create placeholders for planned/unpublished parts in active series to show them as faded rows!
    const fullPostsList: BlogPostMeta[] = []
    
    for (let i = 1; i <= series.totalParts; i++) {
      const existingPost = sortedPosts.find((p) => p.part === i)
      if (existingPost) {
        fullPostsList.push(existingPost)
      } else {
        // Create an unpublished placeholder post
        fullPostsList.push({
          slug: `${series.seriesId}-part-${i}-placeholder`,
          title: 'Section not yet published',
          description: `Part ${i} of the "${series.title}" series.`,
          series: series.title,
          seriesId: series.seriesId,
          seriesOrder: series.seriesOrder,
          part: i,
          partTag: i === 1 ? 'background' : i === 2 ? 'method' : i === 3 ? 'architecture' : 'analysis',
          published: false,
          readTime: '-- min read'
        })
      }
    }

    return {
      ...series,
      posts: fullPostsList
    }
  })

  // Sort series by seriesOrder
  return seriesList.sort((a, b) => a.seriesOrder - b.seriesOrder)
}
