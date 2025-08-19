import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. [Your Name] - ML Researcher',
  description: 'Personal website of Dr. [Your Name], Machine Learning Researcher specializing in transformers, computer vision, and distributed systems.',
  keywords: ['machine learning', 'AI research', 'deep learning', 'transformers', 'computer vision'],
  authors: [{ name: 'Dr. [Your Name]' }],
  openGraph: {
    title: 'Dr. [Your Name] - ML Researcher',
    description: 'Personal website showcasing research, publications, and projects in machine learning.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}


