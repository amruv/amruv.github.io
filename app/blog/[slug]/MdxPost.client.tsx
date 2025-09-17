'use client';

import RenderMdx from '../RenderMdx.client';

// export default function MdxPost({ content, frontmatter }: { content: string; frontmatter: any }) {
//   return <RenderMdx content={content} frontmatter={frontmatter} />;
// }

import Post from "@/content/blog/s1e1.mdx";
// import RenderMdx from "./RenderMdx.client";

export default function MdxPost() {
  return (
    <main className="prose max-w-3xl mx-auto">
      <RenderMdx>
        <Post />
      </RenderMdx>
    </main>
  );
}