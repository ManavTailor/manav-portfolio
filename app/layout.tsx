import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manav Tailor — Software Developer',
  description: 'Full-Stack Software Developer specializing in React, Node.js, and Next.js. Building top-tier digital experiences from Udaipur, India.',
  keywords: ['Manav Tailor', 'Software Developer', 'React', 'Node.js', 'Next.js', 'Full Stack Developer', 'Udaipur'],
  authors: [{ name: 'Manav Tailor', url: 'https://github.com/Manav Tailor' }],
  openGraph: {
    title: 'Manav Tailor — Software Developer',
    description: 'Full-Stack Software Developer specializing in React, Node.js, and Next.js.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
