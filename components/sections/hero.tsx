'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import TypingAnimation from '@/components/ui/typing effect'

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="relative text-5xl lg:text-5xl font-bold mb-10">
            <TypingAnimation texts={["Sai Amruth Balusu."]} className="text-primary test-font-courier" />
              <br />
              <span className="text-4xl text-accent test-font-mono">ML Engineer</span>
            </h1>
            
            <p className="text-xl test-font-mono text-muted-foreground mb-8 leading-relaxed">
              Passionate about advancing the frontiers of artificial intelligence through 
              cutting-edge research in machine learning, deep learning, and neural networks. 
              Currently focusing on transformer architectures and their applications in 
              natural language processing.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="/Sai-Amruth-Balusu-Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </a>
              <a href="mailto:saiamruth3@gmail.com">
                <Button size="lg" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </a>
            </div>

            <div className="flex space-x-4">
              <a href="https://github.com/amruv" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/sai-amruth-balusu" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:saiamruth3@gmail.com">
                <Button size="icon" variant="ghost">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-6xl text-primary/50">🧠</div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}

export default Hero


