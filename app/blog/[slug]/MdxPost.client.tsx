'use client';

import RenderMdx from '../RenderMdx.client';

export default function MdxPost({ content, frontmatter }: { content: string; frontmatter: any }) {
  return <RenderMdx content={content} frontmatter={frontmatter} />;
}