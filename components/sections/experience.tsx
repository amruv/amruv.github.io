'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    title: "Senior ML Research Scientist",
    company: "AI Research Lab",
    period: "2022 - Present",
    description: "Leading research on transformer architectures and their applications in multimodal learning. Published 8+ papers in top-tier conferences including NeurIPS and ICML.",
    technologies: ["PyTorch", "Transformers", "CUDA", "Distributed Training"],
  },
  {
    title: "ML Research Engineer",
    company: "Tech Giant Inc.",
    period: "2020 - 2022",
    description: "Developed and deployed large-scale recommendation systems serving millions of users. Improved model accuracy by 15% using novel attention mechanisms.",
    technologies: ["TensorFlow", "Kubernetes", "MLflow", "Apache Spark"],
  },
  {
    title: "PhD Candidate",
    company: "University of Excellence",
    period: "2016 - 2020",
    description: "Doctoral research focused on deep reinforcement learning for autonomous systems. Thesis: 'Novel Approaches to Multi-Agent Reinforcement Learning in Dynamic Environments'.",
    technologies: ["OpenAI Gym", "Ray RLlib", "PyBullet", "ROS"],
  },
  {
    title: "Research Intern",
    company: "Innovation Labs",
    period: "2019 - 2019",
    description: "Summer internship working on computer vision models for medical imaging. Developed CNN architectures for early cancer detection with 94% accuracy.",
    technologies: ["Keras", "OpenCV", "DICOM", "Medical Imaging"],
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey through my career in machine learning research and development
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary md:left-1/2 md:transform md:-translate-x-px"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 md:mb-8 ${
                index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
              } md:w-1/2`}
            >
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-primary rounded-full left-6 top-6 md:left-auto md:right-auto md:transform md:-translate-x-1/2 md:left-1/2"></div>

              {/* Content card */}
              <div className="ml-16 md:ml-0 bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                  <span className="text-sm text-primary font-medium">{exp.period}</span>
                </div>
                
                <h4 className="text-lg text-muted-foreground mb-3">{exp.company}</h4>
                
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience


