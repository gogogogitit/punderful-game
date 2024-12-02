import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/analytics'
import dynamic from 'next/dynamic'
import JsonLd from '../components/JsonLd'
import { headers } from 'next/headers'

const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), { 
  ssr: false,
})

const inter = Inter({ subsets: ['latin'] })

const FB_APP_ID = '462159136491139'

export const viewport: Viewport = {
  themeColor: '#00B4D8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
}

function getBaseUrl() {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return `${protocol}://${host}`
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Punderous™ - the Pun-A-Day Word Game!',
  description: 'Play Punderous™ - the Pun-A-Day Word Game!',
  openGraph: {
    title: 'Punderous™ - the Pun-A-Day Word Game!',
    description: 'Play Punderous™ - the Pun-A-Day Word Game!',
    url: 'https://punderous.com',
    siteName: 'Punderous™',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Punderous™ - the Pun-A-Day Word Game!'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punderous™ - the Pun-A-Day Word Game!',
    description: 'Play Punderous™ - the Pun-A-Day Word Game!',
    images: ['/images/twitter-image.jpg']
  },
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
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fb:app_id" content={FB_APP_ID} />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
        <JsonLd />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-[#00B4D8]">
          {children}
        </main>
        <Analytics />
        <GoogleAnalytics />
        <Script
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  )
}