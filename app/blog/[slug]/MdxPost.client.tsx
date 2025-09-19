// 'use client';

// import RenderMdx from '../RenderMdx.client';

// // export default function MdxPost({ content, frontmatter }: { content: string; frontmatter: any }) {
// //   return <RenderMdx content={content} frontmatter={frontmatter} />;
// // }

// import Post from "@/content/blog/s1e1.mdx";
// // import RenderMdx from "./RenderMdx.client";

// // export default function MdxPost({ Post }: { Post: React.ComponentType }) {
// export default function MdxPost() {
//   return (
//     <main className="prose max-w-3xl mx-auto">
//       <RenderMdx>
//         <Post />
//       </RenderMdx>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import RenderMdx from '../RenderMdx.client';

type Props = { slug: string };

export default function MdxPost({ slug }: Props) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    import(/* webpackInclude: /\.mdx$/ */ `../../../content/blog/${slug}.mdx`)
      .then((mod) => { if (mounted) setComp(() => mod.default as React.ComponentType); })
      .catch(() => setComp(null));
    return () => { mounted = false; };
  }, [slug]);

  if (!Comp) return null;

  return (
    <main className="prose max-w-3xl mx-auto">
      <RenderMdx>
        <Comp />
      </RenderMdx>
    </main>
  );
}