'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Award, Calendar } from 'lucide-react'

const certifications = [
  {
    category: "CERTIFICATE",
    title: "OCI Data Science Professional",
    issuer: "Oracle Cloud Infrastructure",
    date: "",
    credentialId: "",
    description: "Validates expertise in implementing end-to-end machine learning solutions on Oracle Cloud Infrastructure, including data ingestion, model development, deployment, and ML pipeline automation using Python",
    skills: ["OCI", "Data Science", "AutoML", "ML Pipeline"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    logo: "🎓",
    certificateUrl: "Certificates/OCI DS Professional.pdf"
  },
  {
    category: "COURSE",
    title: "Agentic AI: Building DataFirst AI Agents",
    issuer: "LinkedIn Learning",
    date: "",
    credentialId: "",
    description: "Covers building autonomous AI agents capable of independent decision-making and task execution through data-first architectural approaches and modern agentic AI frameworks.",
    skills: ["Agents", "AI", "RAGs"],
    gradient: "from-purple-500/20 to-pink-500/20",
    logo: "🧠",
    certificateUrl: "Certificates/Agentic AI.pdf"
  },
  {
    category: "COURSE",
    title: "Deploying Scalable ML for Data Science",
    issuer: "LinkedIn Learning",
    date: "",
    credentialId: "",
    description: "Demonstrates skills in deploying machine learning models at scale using containers, APIs, and orchestration tools like Kubernetes for production environments",
    skills: ["MLOps", "Scaling"],
    gradient: "from-green-500/20 to-teal-500/20",
    logo: "⚙️",
    certificateUrl: "Certificates/Deploying Scalable ML for Data Science.pdf"
  },
  {
    category: "CERTIFICATE",
    title: "Inventory Cloud Professional",
    issuer: "Oracle Cloud Infrastructure",
    date: "",
    credentialId: "",
    description: "Certifies ability to design enterprise structures, manage inventory transactions, handle consigned inventory, and integrate inventory systems within Oracle Supply Chain Management Cloud",
    skills: ["Cloud", "Inventory"],
    gradient: "from-orange-500/20 to-yellow-500/20",
    logo: "☁️",
    certificateUrl: "Certificates/Inventory Cloud Professional.pdf"
  }
  // {
  //   category: "CLOUD",
  //   title: "Google Cloud Professional ML Engineer",
  //   issuer: "Google Cloud",
  //   date: "March 2024",
  //   credentialId: "GCP-ML-2024-001234",
  //   description: "Comprehensive certification covering ML model design, development, and deployment on Google Cloud Platform with focus on scalable ML systems.",
  //   skills: ["MLOps", "Vertex AI", "BigQuery ML", "Kubeflow"],
  //   gradient: "from-blue-500/20 to-cyan-500/20",
  //   logo: "🎓"
  // },
  // {
  //   category: "DEEP LEARNING",
  //   title: "Deep Learning Specialization",
  //   issuer: "DeepLearning.AI",
  //   date: "January 2024",
  //   credentialId: "DLAI-SPEC-2024-5678",
  //   description: "Five-course specialization covering neural networks, deep learning, structuring ML projects, CNNs, and sequence models.",
  //   skills: ["Neural Networks", "CNNs", "RNNs", "Transformers"],
  //   gradient: "from-purple-500/20 to-pink-500/20",
  //   logo: "🧠"
  // },
  // {
  //   category: "AWS",
  //   title: "AWS Certified Machine Learning - Specialty",
  //   issuer: "Amazon Web Services",
  //   date: "November 2023",
  //   credentialId: "AWS-MLS-2023-9012",
  //   description: "Advanced certification validating expertise in building, training, tuning, and deploying ML models on AWS platform.",
  //   skills: ["SageMaker", "AWS ML Services", "Data Engineering", "Model Deployment"],
  //   gradient: "from-orange-500/20 to-yellow-500/20",
  //   logo: "☁️"
  // },
  // {
  //   category: "MLOps",
  //   title: "MLOps Engineering on AWS",
  //   issuer: "AWS Training",
  //   date: "September 2023",
  //   credentialId: "AWS-MLOPS-2023-3456",
  //   description: "Specialized training in implementing MLOps practices on AWS, covering CI/CD for ML, model monitoring, and automated retraining.",
  //   skills: ["CI/CD", "Model Monitoring", "Infrastructure as Code", "Automation"],
  //   gradient: "from-green-500/20 to-teal-500/20",
  //   logo: "⚙️"
  // },
  // {
  //   category: "RESEARCH",
  //   title: "Stanford AI Professional Certificate",
  //   issuer: "Stanford University",
  //   date: "June 2023",
  //   credentialId: "STANFORD-AI-2023-7890",
  //   description: "Rigorous program covering AI fundamentals, machine learning theory, and practical applications in various domains.",
  //   skills: ["AI Theory", "Algorithms", "Ethics", "Applications"],
  //   gradient: "from-red-500/20 to-pink-500/20",
  //   logo: "🎯"
  // },
  // {
  //   category: "DATA SCIENCE",
  //   title: "TensorFlow Developer Certificate",
  //   issuer: "TensorFlow",
  //   date: "March 2023",
  //   credentialId: "TF-DEV-2023-1122",
  //   description: "Hands-on certification demonstrating proficiency in building and training neural networks using TensorFlow.",
  //   skills: ["TensorFlow", "Keras", "Model Training", "Deployment"],
  //   gradient: "from-indigo-500/20 to-purple-500/20",
  //   logo: "🔧"
  // }
]

const Certifications = () => {
  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 test-font-courier text-accent">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto test-font-mono">
            Professional certifications and continuous learning in machine learning and cloud technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="overflow-y-auto pb-20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs font-medium text-accent test-font-inter">
                        {cert.category}
                      </Badge>
                      <div className="text-2xl">{cert.logo}</div>
                    </div>
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {cert.title}
                    </CardTitle>
                    <div className="text-sm text-accent font-medium">
                      {cert.issuer}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <CardDescription className="text-sm leading-relaxed mb-4 test-font-inter">
                      {cert.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-1 mb-4 test-font-inter">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Issued: {cert.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Award className="w-3 h-3" />
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div> */}
                    </CardContent>

                    <CardFooter className = 'absolute bottom-0 left-0 right-0 pt-0 text-accent'>
                    <a href = {cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="flex space-x-2 w-full">
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Certificate
                      </Button>
                    </a>
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

export default Certifications


