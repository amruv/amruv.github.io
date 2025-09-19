'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    category: "TUTORIAL",
    title: "Building Efficient Transformers from Scratch",
    description: "A comprehensive guide to implementing transformer architectures with optimizations for memory and compute efficiency. Includes PyTorch code examples and performance benchmarks.",
    date: "March 15, 2024",
    readTime: "12 min read",
    tags: ["PyTorch", "Transformers", "Tutorial"],
    gradient: "from-blue-500/20 to-purple-500/20",
    slug: "s1e1"
  },
  {
    category: "RESEARCH",
    title: "The Future of Multimodal AI: Trends and Challenges",
    description: "Exploring the latest developments in multimodal artificial intelligence, from vision-language models to audio-visual understanding systems.",
    date: "February 28, 2024", 
    readTime: "8 min read",
    tags: ["Multimodal AI", "Computer Vision", "NLP"],
    gradient: "from-green-500/20 to-teal-500/20",
    slug: "s1e2"
  },
  {
    category: "OPINION",
    title: "Ethics in AI Research: A Researcher's Perspective",
    description: "Personal reflections on the ethical considerations that should guide AI research, including bias mitigation, fairness, and responsible AI development.",
    date: "February 10, 2024",
    readTime: "6 min read", 
    tags: ["AI Ethics", "Responsible AI", "Bias"],
    gradient: "from-orange-500/20 to-red-500/20",
    slug: "ethics-in-ai-research"
  },
  {
    category: "TECHNICAL",
    title: "Optimizing Deep Learning Models for Production",
    description: "Best practices for deploying machine learning models in production environments, covering model optimization, serving infrastructure, and monitoring.",
    date: "January 22, 2024",
    readTime: "15 min read",
    tags: ["MLOps", "Production", "Optimization"],
    gradient: "from-pink-500/20 to-violet-500/20", 
    slug: "optimizing-models-for-production"
  },
  {
    category: "REVIEW",
    title: "Paper Review: Attention Mechanisms in 2024",
    description: "A critical review of recent papers on attention mechanisms, analyzing their contributions, limitations, and potential impact on the field.",
    date: "December 18, 2023",
    readTime: "10 min read",
    tags: ["Attention", "Paper Review", "Deep Learning"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    slug: "attention-mechanisms-2024-review"
  },
  {
    category: "INSIGHT",
    title: "Lessons Learned from 5 Years in ML Research",
    description: "Personal insights and lessons learned during my journey in machine learning research, from PhD to industry and back to academia.",
    date: "November 30, 2023",
    readTime: "7 min read",
    tags: ["Career", "Research", "Lessons"],
    gradient: "from-yellow-500/20 to-orange-500/20",
    slug: "lessons-from-ml-research"
  }
]

const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on machine learning research and development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          {post.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <CardDescription className="text-sm leading-relaxed mb-4">
                        {post.description}
                      </CardDescription>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          Read more
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog


