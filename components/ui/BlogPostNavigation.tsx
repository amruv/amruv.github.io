import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getChildNavigation, getGlobalNavigation } from '@/lib/series'
import type { NavLink } from '@/lib/series'

function truncateTitle(title: string, maxLength: number = 40): string {
  if (title.length <= maxLength) return title
  return title.slice(0, maxLength).trimEnd() + '…'
}

// ── Carousel Dot Indicators ─────────────────────────────────────────────

function CarouselDots({
  posts,
  currentSlug,
  label,
}: {
  posts: { slug: string; title: string; published?: boolean }[]
  currentSlug: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <span className="text-xs text-muted-foreground test-font-mono uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {posts.map((post) => {
          const isActive = post.slug === currentSlug
          const isPublished = post.published !== false

          if (!isPublished) {
            // Unpublished placeholder — non-clickable, outlined with dashed border
            return (
              <span
                key={post.slug}
                title="Not yet published"
                className="w-2.5 h-2.5 rounded-full border border-dashed border-accent/40 bg-transparent shrink-0"
              />
            )
          }

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              className="group"
            >
              <span
                className={`block rounded-full shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'w-3 h-3 bg-primary'
                    : 'w-2.5 h-2.5 border-2 border-accent bg-transparent group-hover:bg-primary/20'
                }`}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Navigation Buttons ──────────────────────────────────────────────────

function NavButtons({
  prev,
  next,
}: {
  prev: NavLink | null
  next: NavLink | null
}) {
  if (!prev && !next) return null

  return (
    <div className="flex items-stretch justify-between gap-4">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="flex-1 min-w-0">
          <Button
            variant="default"
            className="w-full h-auto py-3 px-4 test-font-mono text-sm justify-start text-left whitespace-normal"
          >
            <span className="flex flex-col items-start gap-0.5 min-w-0">
              <span className="text-xs opacity-70">← Previous</span>
              <span className="truncate max-w-full">
                {truncateTitle(prev.title)}
              </span>
            </span>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="flex-1 min-w-0">
          <Button
            variant="default"
            className="w-full h-auto py-3 px-4 test-font-mono text-sm justify-end text-right whitespace-normal"
          >
            <span className="flex flex-col items-end gap-0.5 min-w-0">
              <span className="text-xs opacity-70">Next →</span>
              <span className="truncate max-w-full">
                {truncateTitle(next.title)}
              </span>
            </span>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────────────────

export default function BlogPostNavigation({ slug }: { slug: string }) {
  // Try child navigation first (series part posts like s1e2)
  const childNav = getChildNavigation(slug)
  if (childNav) {
    return (
      <nav className="mt-16 pt-8 border-t border-border" aria-label="Blog post navigation">
        <CarouselDots
          posts={childNav.posts}
          currentSlug={slug}
          label={childNav.seriesTitle}
        />
        <NavButtons prev={childNav.prev} next={childNav.next} />
      </nav>
    )
  }

  // Fall back to global navigation (parent / standalone)
  const globalNav = getGlobalNavigation(slug)
  if (globalNav && (globalNav.prev || globalNav.next || globalNav.posts.length > 1)) {
    return (
      <nav className="mt-16 pt-8 border-t border-border" aria-label="Blog post navigation">
        <CarouselDots
          posts={globalNav.posts}
          currentSlug={slug}
          label="Blog Posts"
        />
        <NavButtons prev={globalNav.prev} next={globalNav.next} />
      </nav>
    )
  }

  return null
}
