import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const postsDir = path.join(process.cwd(), "content/blog/");

import React from 'react'
import Navigation from '@/components/navigation'
import BlogGrid from './BlogGrid.client'

// const blogPosts = [
//   {
//     category: "TUTORIAL",
//     title: "Building Efficient Transformers from Scratch",
//     description: "A comprehensive guide to implementing transformer architectures with optimizations for memory and compute efficiency. Includes PyTorch code examples and performance benchmarks.",
//     date: "March 15, 2024",
//     readTime: "12 min read",
//     tags: ["PyTorch", "Transformers", "Tutorial"],
//     gradient: "from-blue-500/20 to-purple-500/20",
//     slug: "efficient-transformers-from-scratch"
//   },
//   {
//     category: "RESEARCH",
//     title: "The Future of Multimodal AI: Trends and Challenges",
//     description: "Exploring the latest developments in multimodal artificial intelligence, from vision-language models to audio-visual understanding systems.",
//     date: "February 28, 2024", 
//     readTime: "8 min read",
//     tags: ["Multimodal AI", "Computer Vision", "NLP"],
//     gradient: "from-green-500/20 to-teal-500/20",
//     slug: "future-of-multimodal-ai"
//   },
//   {
//     category: "OPINION",
//     title: "Ethics in AI Research: A Researcher's Perspective",
//     description: "Personal reflections on the ethical considerations that should guide AI research, including bias mitigation, fairness, and responsible AI development.",
//     date: "February 10, 2024",
//     readTime: "6 min read", 
//     tags: ["AI Ethics", "Responsible AI", "Bias"],
//     gradient: "from-orange-500/20 to-red-500/20",
//     slug: "ethics-in-ai-research"
//   },
//   {
//     category: "TECHNICAL",
//     title: "Optimizing Deep Learning Models for Production",
//     description: "Best practices for deploying machine learning models in production environments, covering model optimization, serving infrastructure, and monitoring.",
//     date: "January 22, 2024",
//     readTime: "15 min read",
//     tags: ["MLOps", "Production", "Optimization"],
//     gradient: "from-pink-500/20 to-violet-500/20", 
//     slug: "optimizing-models-for-production"
//   },
//   {
//     category: "REVIEW",
//     title: "Paper Review: Attention Mechanisms in 2024",
//     description: "A critical review of recent papers on attention mechanisms, analyzing their contributions, limitations, and potential impact on the field.",
//     date: "December 18, 2023",
//     readTime: "10 min read",
//     tags: ["Attention", "Paper Review", "Deep Learning"],
//     gradient: "from-cyan-500/20 to-blue-500/20",
//     slug: "attention-mechanisms-2024-review"
//   },
//   {
//     category: "INSIGHT",
//     title: "Lessons Learned from 5 Years in ML Research",
//     description: "Personal insights and lessons learned during my journey in machine learning research, from PhD to industry and back to academia.",
//     date: "November 30, 2023",
//     readTime: "7 min read",
//     tags: ["Career", "Research", "Lessons"],
//     gradient: "from-yellow-500/20 to-orange-500/20",
//     slug: "lessons-from-ml-research"
//   }
// ]

export default function BlogPage() {
  const files = fs.readdirSync(postsDir);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(source);
      return { slug, ...data };
    });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Header */}
      <div className="bg-background border-b border-border pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 test-font-courier text-primary">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto test-font-mono">
              Sharing insights, tutorials, and thoughts on machine learning research and development
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <BlogGrid posts={posts as any} />
      </div>
    </main>
  )
}
