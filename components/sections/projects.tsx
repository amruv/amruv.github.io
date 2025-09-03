'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink, Star } from 'lucide-react'

type Project = {
  category: string
  title: string
  description: string
  bullets?: string[]
  stats?: { stars: string; forks: string; status: string }
  technologies: string[]
  github: string
  demo?: string
  gradient: string
}

const projects: Project[] = [
  {
    category: "AI",
    title: "Private-AI",
    description: "A hybrid approach to privacy‑preserving AI.",
    bullets: [
      "Aim: Design and implement a hybrid approach to protect sensitive user data using multiple techniques.",
      "Approach: Combine Federated Learning, Differential Privacy, and Homomorphic Encryption.",
      "Result: ~9x increase in privacy with a measured accuracy trade‑off."
    ],
    // stats: { stars: "-", forks: "-", status: "Active" },
    technologies: ["Python", "AI", "Safety", "Reinforcement Learning [RL]", "Federated Learning"],
    github: "https://github.com/amruv/Private-AI",
    // demo: "https://github.com/amruv/Private-AI",
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    category: "DEV",
    title: "ScoutSmart-Dev",
    description: "Football Scouting. Smart. Accessible. Powerful.",
    bullets: [
      "AI-powered scouting platform built with React, TypeScript, and Google Gemini.",
      "Chat-based AI assistant with real-time league data integration.",
      "Generates analytic graphs, stats, and tactical profiles for talent identification."
    ],
    stats: { stars: "-", forks: "-", status: "Active" },
    technologies: ["TypeScript", "Node.js"],
    github: "https://github.com/amruv/ScoutSmart-Dev",
    // demo: "https://github.com/amruv/ScoutSmart-Dev",
    gradient: "from-teal-500/20 to-emerald-500/20"
  },
  {
    category: "DEEP LEARNING",
    title: "Neural Architecture Search for Transformers",
    description: "Automated architecture search framework for discovering optimal transformer configurations. Achieved 15% performance improvement over manual designs.",
    stats: { stars: "2.3k", forks: "456", status: "Active" },
    technologies: ["PyTorch", "Ray Tune", "Weights & Biases", "CUDA"],
    github: "https://github.com/username/nas-transformers",
    demo: "https://demo.example.com",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    category: "COMPUTER VISION", 
    title: "Multi-Modal Medical Imaging",
    description: "State-of-the-art model combining CT, MRI, and clinical data for early disease detection. Published in Nature Machine Intelligence.",
    stats: { stars: "1.8k", forks: "234", status: "Research" },
    technologies: ["TensorFlow", "MONAI", "Docker", "MLflow"],
    github: "https://github.com/username/medical-imaging",
    demo: "https://demo.example.com",
    gradient: "from-green-500/20 to-teal-500/20"
  },
  {
    category: "REINFORCEMENT LEARNING",
    title: "Distributed Multi-Agent RL",
    description: "Scalable framework for training multiple RL agents in complex environments. Supports up to 1000+ concurrent agents with efficient communication.",
    stats: { stars: "3.1k", forks: "567", status: "Production" },
    technologies: ["Ray RLlib", "Redis", "Kubernetes", "gRPC"],
    github: "https://github.com/username/distributed-marl",
    demo: "https://demo.example.com",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    category: "NLP",
    title: "Code-Mixed Language Model",
    description: "Large language model trained on multilingual code-mixed data. Handles seamless switching between languages in conversational AI.",
    stats: { stars: "4.2k", forks: "789", status: "Beta" },
    technologies: ["Transformers", "Tokenizers", "Datasets", "Accelerate"],
    github: "https://github.com/username/code-mixed-lm",
    demo: "https://demo.example.com",
    gradient: "from-pink-500/20 to-violet-500/20"
  },
  {
    category: "OPTIMIZATION",
    title: "Federated Learning Framework",
    description: "Privacy-preserving ML framework enabling collaborative training across distributed devices without sharing raw data.",
    stats: { stars: "1.5k", forks: "301", status: "Stable" },
    technologies: ["PySyft", "Flower", "FastAPI", "Encryption"],
    github: "https://github.com/username/federated-ml",
    demo: "https://demo.example.com",
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    category: "TOOLS",
    title: "ML Experiment Tracker",
    description: "Lightweight experiment tracking and model versioning tool with beautiful visualizations and collaborative features.",
    stats: { stars: "892", forks: "156", status: "Maintenance" },
    technologies: ["FastAPI", "React", "PostgreSQL", "Redis"],
    github: "https://github.com/username/ml-tracker",
    demo: "https://demo.example.com",
    gradient: "from-yellow-500/20 to-orange-500/20"
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Research Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the boundaries of machine learning through innovative research and open-source contributions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs font-medium">
                        {project.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Star className="w-3 h-3" />
                        <span>{project.stats.stars}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {project.description}
                    </CardDescription>
                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                        {project.bullets.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center space-x-4">
                        <span>Forks: {project.stats.forks}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          project.stats.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          project.stats.status === 'Research' ? 'bg-blue-500/20 text-blue-400' :
                          project.stats.status === 'Production' ? 'bg-purple-500/20 text-purple-400' :
                          project.stats.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                          project.stats.status === 'Stable' ? 'bg-teal-500/20 text-teal-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {project.stats.status}
                        </span>
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="flex space-x-2 w-full">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects


