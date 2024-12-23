// components/JsonLd.tsx
'use client';

interface JsonLdProps {
  baseUrl?: string
}

export default function JsonLd({ baseUrl = 'https://punderous.com' }: JsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Punderous™",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "description": "Play Punderous™ - the pun-a-day word game that's fun for the whole family!",
    "url": baseUrl,
    "image": `${baseUrl}/images/og-image.jpg`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "http://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
      id="schema-jsonld"
    />
  );
}