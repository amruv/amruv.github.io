'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const experiences = [
  {
    title: "Software Developer",
    company: "Oracle · Bengaluru",
    period: "Jul 2023 – Jun 2025",
    // description: "Resolved 250+ customer issues and delivered 10+ projects using SQL, Groovy, Java, and Python (9.8/10 CSAT). Built an internal LLM + RAG assistant for Oracle Fusion HCM that cut research time from 1–2 weeks to under 5 minutes and reduced resolution time by 60% via PL/SQL code generation. Integrated Generative AI features for 3 clients using Fine-Tuning, Context Prompting, and RAG within Oracle Fusion to accelerate AI deployment.",
    bullets: [
      "Resolved 250+ issues; delivered 10+ projects across SQL, Groovy, Java, Python (9.8/10 CSAT)",
      "Built LLM + RAG assistant for Fusion HCM; reduced research time to <5 minutes and MTTR by 60%",
      "Integrated GenAI features for 3 clients using fine‑tuning, context prompting, and RAG"
    ],
    technologies: ["SQL", "PL/SQL", "Groovy", "Java", "Python", "LLM", "RAG", "Oracle Cloud"],
  },
  {
    title: "ML Engineer (Freelance)",
    company: "Mercuri.ai · Bengaluru",
    period: "May 2023 – Aug 2023",
    // description: "Developed an end-to-end RAG pipeline for Mercuri's SMS Marketing Tool using OpenAI API, LangChain, and MongoDB Vector Search, achieving 87% customer query satisfaction. Optimized prompting strategies and deployed the AI solution across 10+ client environments, enabling seamless access to product catalogs and customer documentation.",
    bullets: [
      "Built E2E RAG pipeline with OpenAI, LangChain, MongoDB Vector Search (87% CSAT)",
      "Optimized prompts and deployed across 10+ client environments",
      "Enabled catalog and docs retrieval via SMS assistant"
    ],
    technologies: ["OpenAI API", "LangChain", "MongoDB Vector Search", "Prompt Engineering", "RAG"],
  },
  {
    title: "Data Science Intern",
    company: "Material Depot (YC) · Bengaluru",
    period: "Jan 2023 – Apr 2023",
    // description: "Engineered an image-based product recommendation system using ResNet-150 (CNN) and k-means clustering, boosting accuracy from 79% to 92%, increasing product browsing engagement by 27%, and improving sales conversions by 6%.",
    bullets: [
      "Built image-based recommender with ResNet‑150 and k‑means",
      "Improved accuracy 79% → 92%; +27% engagement; +6% conversions"
    ],
    technologies: ["ResNet-150 (CNN)", "k-means", "Computer Vision"],
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
          <h2 className="text-4xl font-bold mb-4 test-font-courier text-accent">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto test-font-mono">
            A journey through my career in machine learning development
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
                  <h3 className="text-xl font-semibold text-primary test-font-mono">{exp.title}</h3>
                  <span className="text-sm text-primary font-medium test-font-mono">{exp.period}</span>
                </div>
                
                <h4 className="text-lg text-accent mb-3 test-font-mono">{exp.company}</h4>
                
                {/* {exp.description && (
                  <p className="text-muted-foreground mb-3">{exp.description}</p>
                )} */}

                {Array.isArray((exp as any).bullets) && (exp as any).bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                    {(exp as any).bullets.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                
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


