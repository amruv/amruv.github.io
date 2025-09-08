'use client'

import React from 'react'
import dynamic from 'next/dynamic'

export default function PostContent({ slug }: { slug: string }) {
  const MDXComponent = dynamic(() => import(`@/content/blog/${slug}.mdx`), {
    ssr: false,
  }) as React.ComponentType

  return <MDXComponent />
}


