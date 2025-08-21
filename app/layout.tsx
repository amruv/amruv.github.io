import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://amruv.github.io'),
  title: 'Sai Amruth Balusu',
  description: 'Personal website of Sai Amruth Balusu, Machine Learning Researcher specializing in transformers, computer vision, and distributed systems.',
  keywords: ['machine learning', 'AI research', 'deep learning', 'transformers', 'computer vision'],
  authors: [{ name: 'Sai Amruth Balusu' }],
  openGraph: {
    title: 'Sai Amruth Balusu - ML Researcher',
    description: 'Personal website showcasing research, publications, and projects in machine learning.',
    type: 'website',
    url: 'https://amruv.github.io',
    siteName: 'Sai Amruth Balusu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sai Amruth Balusu - ML Researcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sai Amruth Balusu - ML Researcher',
    description: 'Personal website showcasing research, publications, and projects in machine learning.',
    images: ['/og-image.png'],
  },
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


