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
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <TypingAnimation texts={["Sai Amruth Balusu."]} className="text-foreground" />
              <br />
              <span className="text-muted-foreground">ML Researcher</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Passionate about advancing the frontiers of artificial intelligence through 
              cutting-edge research in machine learning, deep learning, and neural networks. 
              Currently focusing on transformer architectures and their applications in 
              natural language processing.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button size="icon" variant="ghost">
                <Github className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-6xl text-primary/50">🧠</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero


