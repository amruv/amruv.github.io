import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/theme-provider'

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
        url: '/ScoutSmart Short Logo.png',
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
    images: ['/ScoutSmart Short Logo.png'],
  },
  icons: {
    icon: '/ScoutSmart Short Logo.png'
  },
}

// Inline script to prevent flash of wrong theme on page load
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


