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

type ParsedSeriesSlug =
  | { kind: 'consolidated'; seriesNumber: number }
  | { kind: 'part'; seriesNumber: number; part: number }

type SeriesRegistryEntry = Partial<Omit<SeriesMeta, 'seriesId' | 'seriesOrder' | 'consolidatedSlug'>>

export const SERIES_REGISTRY: Record<number, SeriesRegistryEntry> = {
  2: {
    title: 'How tf do LLMs Learn?',
    status: 'planned',
    totalParts: 5,
    accentColor: '#8FAA92',
    textColorClass: 'text-accent',
    borderColorClass: 'border-accent/50',
    badgeColorClass: 'bg-muted/10 text-muted-foreground border-muted/20'
  }
}

const DEFAULT_SERIES_STYLE = {
  accentColor: '#CC5500',
  textColorClass: 'text-primary',
  borderColorClass: 'border-primary/50',
  badgeColorClass: 'bg-muted/10 text-muted-foreground border-muted/20'
}

const DEFAULT_PART_TAGS = ['background', 'method', 'architecture', 'analysis']

export function getSeriesId(seriesNumber: number) {
  return `blog-${String(seriesNumber).padStart(3, '0')}`
}

function parseSeriesSlug(slug: string): ParsedSeriesSlug | null {
  const consolidatedMatch = slug.match(/^s(\d+)$/i)
  if (consolidatedMatch) {
    return {
      kind: 'consolidated',
      seriesNumber: Number(consolidatedMatch[1])
    }
  }

  const partMatch = slug.match(/^s(\d+)e(\d+)$/i)
  if (partMatch) {
    return {
      kind: 'part',
      seriesNumber: Number(partMatch[1]),
      part: Number(partMatch[2])
    }
  }

  return null
}

function normalizePostFromSlug(post: BlogPostMeta): BlogPostMeta {
  const parsedSlug = parseSeriesSlug(post.slug)

  if (!parsedSlug) {
    return {
      ...post,
      published: post.published !== false
    }
  }

  const seriesId = getSeriesId(parsedSlug.seriesNumber)

  return {
    ...post,
    seriesId,
    seriesOrder: parsedSlug.seriesNumber,
    part: parsedSlug.kind === 'part' ? parsedSlug.part : post.part,
    published: post.published !== false
  }
}

function createSeriesMeta(
  seriesNumber: number,
  consolidatedPost: BlogPostMeta | undefined,
  partPosts: BlogPostMeta[]
): SeriesMeta {
  const registryEntry = SERIES_REGISTRY[seriesNumber] || {}
  const totalParts = registryEntry.totalParts || consolidatedPost?.totalParts || partPosts.length
  const publishedParts = partPosts.filter((post) => post.published !== false).length
  const status =
    registryEntry.status ||
    (totalParts > 0 && publishedParts >= totalParts ? 'complete' : publishedParts > 0 ? 'in-progress' : 'planned')

  return {
    ...DEFAULT_SERIES_STYLE,
    ...registryEntry,
    seriesId: getSeriesId(seriesNumber),
    seriesOrder: seriesNumber,
    title: registryEntry.title || consolidatedPost?.series || consolidatedPost?.title || `Series ${seriesNumber}`,
    status,
    totalParts,
    consolidatedSlug: consolidatedPost?.slug || `s${seriesNumber}`
  }
}

export function getBlogPosts(): BlogPostMeta[] {
  const postsDir = path.join(process.cwd(), 'content/blog/')

  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs.readdirSync(postsDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(source)
      return normalizePostFromSlug({
        slug,
        ...data
      } as BlogPostMeta)
    })
}

export function getSeriesWithPosts(): SeriesWithPosts[] {
  const posts = getBlogPosts()

  const groupedPosts: Record<number, BlogPostMeta[]> = {}
  const consolidatedPosts: Record<number, BlogPostMeta> = {}

  posts.forEach((post) => {
    const parsedSlug = parseSeriesSlug(post.slug)
    if (!parsedSlug) {
      return
    }

    if (parsedSlug.kind === 'consolidated') {
      consolidatedPosts[parsedSlug.seriesNumber] = post
      return
    }

    if (!groupedPosts[parsedSlug.seriesNumber]) {
      groupedPosts[parsedSlug.seriesNumber] = []
    }
    groupedPosts[parsedSlug.seriesNumber].push(post)
  })

  const seriesNumbers = new Set<number>([
    ...Object.keys(groupedPosts).map(Number),
    ...Object.keys(consolidatedPosts).map(Number),
    ...Object.keys(SERIES_REGISTRY).map(Number)
  ])

  const seriesList: SeriesWithPosts[] = Array.from(seriesNumbers).map((seriesNumber) => {
    const sortedPosts = [...(groupedPosts[seriesNumber] || [])].sort((a, b) => (a.part || 0) - (b.part || 0))
    const series = createSeriesMeta(seriesNumber, consolidatedPosts[seriesNumber], sortedPosts)
    const fullPostsList: BlogPostMeta[] = []

    for (let i = 1; i <= series.totalParts; i++) {
      const existingPost = sortedPosts.find((p) => p.part === i)
      if (existingPost) {
        fullPostsList.push({
          ...existingPost,
          series: existingPost.series || series.title,
          seriesId: series.seriesId,
          seriesOrder: series.seriesOrder,
          part: i,
          partTag: existingPost.partTag || DEFAULT_PART_TAGS[i - 1] || 'analysis'
        })
      } else {
        fullPostsList.push({
          slug: `${series.seriesId}-part-${i}-placeholder`,
          title: 'Section not yet published',
          description: `Part ${i} of the "${series.title}" series.`,
          series: series.title,
          seriesId: series.seriesId,
          seriesOrder: series.seriesOrder,
          part: i,
          partTag: DEFAULT_PART_TAGS[i - 1] || 'analysis',
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

// ── Navigation helpers ──────────────────────────────────────────────────

export type NavLink = { slug: string; title: string }

export type ChildNavigation = {
  prev: NavLink | null
  next: NavLink | null
  currentIndex: number
  posts: { slug: string; title: string; published: boolean }[]
  seriesTitle: string
}

export type GlobalNavigation = {
  prev: NavLink | null
  next: NavLink | null
  currentIndex: number
  posts: { slug: string; title: string }[]
}

/**
 * Navigation for child blogs (e.g. s1e2) within their series.
 * Only published children are navigable; placeholders are shown as inactive dots.
 */
export function getChildNavigation(slug: string): ChildNavigation | null {
  const parsed = parseSeriesSlug(slug)
  if (!parsed || parsed.kind !== 'part') return null

  const seriesList = getSeriesWithPosts()
  const series = seriesList.find((s) => s.seriesOrder === parsed.seriesNumber)
  if (!series) return null

  const allParts = series.posts.map((p) => ({
    slug: p.slug,
    title: p.title || `Part ${p.part}`,
    published: p.published !== false
  }))

  const publishedParts = allParts.filter((p) => p.published)
  const currentPublishedIndex = publishedParts.findIndex((p) => p.slug === slug)
  if (currentPublishedIndex === -1) return null

  return {
    prev: currentPublishedIndex > 0
      ? { slug: publishedParts[currentPublishedIndex - 1].slug, title: publishedParts[currentPublishedIndex - 1].title }
      : null,
    next: currentPublishedIndex < publishedParts.length - 1
      ? { slug: publishedParts[currentPublishedIndex + 1].slug, title: publishedParts[currentPublishedIndex + 1].title }
      : null,
    currentIndex: currentPublishedIndex,
    posts: allParts,
    seriesTitle: series.title
  }
}

/**
 * Navigation for parent (consolidated) and standalone blogs.
 * Builds a global timeline sorted by date descending (newest first).
 * Child blogs (sNe*) are excluded per design requirement.
 */
export function getGlobalNavigation(slug: string): GlobalNavigation | null {
  const posts = getBlogPosts()

  // Include only consolidated (parent) and standalone (non-series) posts
  const globalPosts = posts
    .filter((post) => {
      const parsed = parseSeriesSlug(post.slug)
      // Include if: not a series slug at all (standalone), or a consolidated parent
      return !parsed || parsed.kind === 'consolidated'
    })
    .filter((post) => post.published !== false)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })

  const currentIndex = globalPosts.findIndex((p) => p.slug === slug)
  if (currentIndex === -1) return null

  return {
    prev: currentIndex < globalPosts.length - 1
      ? { slug: globalPosts[currentIndex + 1].slug, title: globalPosts[currentIndex + 1].title || globalPosts[currentIndex + 1].slug }
      : null,
    next: currentIndex > 0
      ? { slug: globalPosts[currentIndex - 1].slug, title: globalPosts[currentIndex - 1].title || globalPosts[currentIndex - 1].slug }
      : null,
    currentIndex,
    posts: globalPosts.map((p) => ({ slug: p.slug, title: p.title || p.slug }))
  }
}
