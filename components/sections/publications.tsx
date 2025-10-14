'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, FileText, Users, Calendar } from 'lucide-react'

const publications = [
  {
    title: "PRIVATE-AI: A Hybrid Approach to privacy-preserving AI",
    authors: ["Sai Amruth Balusu", "Saif K.", "Siri S."],
    venue: "2023 IEEE/ACIS 8th International Conference on Big Data, Cloud Computing, and Data Science (BCD)",
    year: "2023",
    type: "Conference",
    citations: 2,
    abstract: "Designed and implemented a hybrid approach to protect sensitive user data using multiple techniques.",
    tags: ["Privacy", "ML", "Federated Learning", "Reinforcement Learning"],
    links: {
      paper: "https://doi.org/10.1109/BCD57833.2023.10466330",
      code: "https://github.com/amruv/Private-AI",
      bibtex: `@inproceedings{balusu2023bcd,
  title={Paper at IEEE Big Data Conference},
  author={Balusu, Sai Amruth and others},
  booktitle={IEEE Big Data},
  year={2023},
  doi={10.1109/BCD57833.2023.10466330}
}`
    }
  }
]

const Publications = () => {
  // const [selectedPaper, setSelectedPaper] = useState<number | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  const copyBibtex = (bibtex: string, index: number) => {
    navigator.clipboard.writeText(bibtex)
    setCopiedIndex(index)
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
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
          <h2 className="text-4xl font-bold mb-4 text-accent test-font-courier">Publications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto test-font-mono">
            Publication contributions to the machine learning community
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
                      <div className="text-primary font-medium test-font-mono">
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
                      variant={copiedIndex === index ? "default" : "outline"}
                      className={`transition-all duration-300 ${
                        copiedIndex === index 
                          ? 'bg-accent hover:bg-accent text-background' 
                          : ''
                      }`}
                      onClick={() => copyBibtex(paper.links.bibtex, index)}
                    >
                      <motion.div
                        key={copiedIndex === index ? 'copied' : 'normal'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                      >
                        {copiedIndex === index ? (
                          <>
                            {/* <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                              className="w-3 h-3 mr-1"
                            >
                              ✓
                            </motion.div> */}
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              Copied!
                            </motion.span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-3 h-3 mr-1" />
                            BibTeX
                          </>
                        )}
                      </motion.div>
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


