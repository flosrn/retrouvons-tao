import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import dynamic from 'next/dynamic'
import './globals.css'

// Lazy load accessibility improvements
const AccessibilityImprovements = dynamic(() => import('@/components/accessibility-improvements'))

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Tao, chat perdu à Toulouse - 500€ de récompense | Retrouvons Tao',
  description: 'Aidez-nous à retrouver Tao, chat mâle aux oreilles recourbées, disparu le 22 juillet 2025 à Toulouse (31400). Récompense de 500€. Formulaire de signalement disponible.',
  keywords: ['chat perdu', 'Toulouse', 'Tao', 'récompense', 'oreilles recourbées', 'Ramonville', 'Pouvourville', 'animal perdu'],
  authors: [{ name: 'Famille de Tao' }],
  creator: 'Retrouvons Tao',
  publisher: 'Retrouvons Tao',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://retrouvons-tao.vercel.app',
    title: 'Tao, chat perdu à Toulouse - 500€ de récompense',
    description: 'Aidez-nous à retrouver Tao, chat aux oreilles recourbées disparu à Toulouse. Récompense de 500€.',
    siteName: 'Retrouvons Tao',
    images: [
      {
        url: 'https://retrouvons-tao.vercel.app/tao-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Tao, chat perdu à Toulouse aux oreilles recourbées',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tao, chat perdu à Toulouse - 500€ de récompense',
    description: 'Aidez-nous à retrouver Tao, chat aux oreilles recourbées disparu à Toulouse.',
    images: ['https://retrouvons-tao.vercel.app/tao-main.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://retrouvons-tao.vercel.app',
  },
  category: 'Animals',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Retrouvons Tao - Chat perdu à Toulouse",
              "description": "Site de recherche pour Tao, chat perdu à Toulouse avec récompense de 500€",
              "url": "https://retrouvons-tao.vercel.app",
              "inLanguage": "fr-FR",
              "about": {
                "@type": "LostAndFoundAction",
                "object": {
                  "@type": "Pet",
                  "name": "Tao",
                  "species": "Chat",
                  "gender": "Mâle",
                  "description": "Chat aux oreilles recourbées, robe gris tigré",
                },
                "location": {
                  "@type": "Place",
                  "name": "Toulouse",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Toulouse",
                    "postalCode": "31400",
                    "addressCountry": "FR"
                  }
                },
                "startTime": "2025-07-22",
                "reward": {
                  "@type": "MonetaryAmount",
                  "currency": "EUR",
                  "value": "500"
                }
              }
            })
          }}
        />
        
        {/* Performance and mobile optimization */}
        <meta name="theme-color" content="#fb923c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Favicon and icons */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐱</text></svg>" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐱</text></svg>" />
        
        
        <style>{`
            html {
              font-family: ${GeistSans.style.fontFamily};
              --font-sans: ${GeistSans.variable};
              --font-mono: ${GeistMono.variable};
            }
        `}</style>
        
        {/* Register custom service worker to override UploadThing's restrictive CSP */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('Custom SW registered'))
                .catch(error => console.log('Custom SW registration failed'));
            }
          `
        }} />
      </head>
      <body>
        <AccessibilityImprovements />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
