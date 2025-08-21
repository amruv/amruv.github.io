'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, FileText, Users, Calendar } from 'lucide-react'

const publications = [
  {
    title: "Attention Is All You Need: A Comprehensive Survey of Transformer Architectures",
    authors: ["Your Name", "Co-Author 1", "Co-Author 2"],
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: "2024",
    type: "Conference",
    citations: 1247,
    abstract: "A comprehensive survey of transformer architectures and their applications across various domains including natural language processing, computer vision, and multimodal learning.",
    tags: ["Transformers", "Survey", "Deep Learning"],
    links: {
      paper: "https://arxiv.org/abs/example",
      code: "https://github.com/username/transformer-survey",
      bibtex: `@inproceedings{yourname2024attention,
  title={Attention Is All You Need: A Comprehensive Survey of Transformer Architectures},
  author={Your Name and Co-Author 1 and Co-Author 2},
  booktitle={Advances in Neural Information Processing Systems},
  year={2024}
}`
    }
  }
]

const Publications = () => {
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null)
  
  const copyBibtex = (bibtex: string) => {
    navigator.clipboard.writeText(bibtex)
    // You could add a toast notification here
  }

  return (
    <section id="publications" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Publications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Peer-reviewed research contributions to the machine learning community
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl leading-tight mb-2">
                        {paper.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{paper.authors.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{paper.year}</span>
                        </div>
                        <div className="text-primary font-medium">
                          {paper.citations} citations
                        </div>
                      </div>
                      <div className="text-primary font-medium mb-2">
                        {paper.venue}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={paper.type === 'Journal' ? 'default' : 'secondary'}>
                        {paper.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {paper.abstract}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-3 h-3 mr-1" />
                      Paper
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyBibtex(paper.links.bibtex)}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      BibTeX
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Publications


