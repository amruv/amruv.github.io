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
  },
  {
    title: "Federated Learning with Differential Privacy: A Multi-Agent Reinforcement Learning Approach",
    authors: ["Your Name", "Co-Author 1"],
    venue: "International Conference on Machine Learning (ICML)",
    year: "2024",
    type: "Conference",
    citations: 892,
    abstract: "We propose a novel approach to federated learning that incorporates differential privacy through multi-agent reinforcement learning, ensuring both model performance and data privacy.",
    tags: ["Federated Learning", "Privacy", "Reinforcement Learning"],
    links: {
      paper: "https://arxiv.org/abs/example",
      code: "https://github.com/username/federated-rl",
      bibtex: `@inproceedings{yourname2024federated,
  title={Federated Learning with Differential Privacy: A Multi-Agent Reinforcement Learning Approach},
  author={Your Name and Co-Author 1},
  booktitle={International Conference on Machine Learning},
  year={2024}
}`
    }
  },
  {
    title: "Neural Architecture Search for Efficient Medical Image Analysis",
    authors: ["Co-Author 1", "Your Name", "Co-Author 2", "Co-Author 3"],
    venue: "Nature Machine Intelligence",
    year: "2023",
    type: "Journal",
    citations: 1456,
    abstract: "This work presents an automated neural architecture search framework specifically designed for medical image analysis, achieving state-of-the-art performance while maintaining computational efficiency.",
    tags: ["Medical AI", "AutoML", "Computer Vision"],
    links: {
      paper: "https://nature.com/articles/example",
      code: "https://github.com/username/medical-nas",
      bibtex: `@article{coauthor2023neural,
  title={Neural Architecture Search for Efficient Medical Image Analysis},
  author={Co-Author 1 and Your Name and Co-Author 2 and Co-Author 3},
  journal={Nature Machine Intelligence},
  year={2023}
}`
    }
  },
  {
    title: "Large-Scale Distributed Training of Graph Neural Networks",
    authors: ["Your Name", "Co-Author 1", "Co-Author 2"],
    venue: "International Conference on Learning Representations (ICLR)",
    year: "2023",
    type: "Conference",
    citations: 734,
    abstract: "We introduce a scalable framework for distributed training of graph neural networks on large-scale graphs, enabling efficient processing of graphs with billions of nodes and edges.",
    tags: ["Graph Neural Networks", "Distributed Computing", "Scalability"],
    links: {
      paper: "https://arxiv.org/abs/example",
      code: "https://github.com/username/distributed-gnn",
      bibtex: `@inproceedings{yourname2023largescale,
  title={Large-Scale Distributed Training of Graph Neural Networks},
  author={Your Name and Co-Author 1 and Co-Author 2},
  booktitle={International Conference on Learning Representations},
  year={2023}
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


