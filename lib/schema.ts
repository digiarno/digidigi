import { siteConfig } from "@/config/site";
import type { Product } from "@/config/types";
import { publicEnv } from "@/lib/env";

type JsonLd = Record<string, unknown>;

export function localBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Manufacturer"],
    name: siteConfig.legalName,
    legalName: "Aluroll Oy",
    brand: siteConfig.name,
    url: publicEnv.siteUrl,
    telephone: "+358291230221",
    email: publicEnv.contactReceiver || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHours: "Mo-Fr 08:00-16:00",
    areaServed: "FI",
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Terassilasitukset ja parvekelasitukset",
      },
    },
  };
}

export function productJsonLd(product: Product): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        postalCode: siteConfig.address.postalCode,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
    image: `${publicEnv.siteUrl}${product.imageSrc}`,
    url: `${publicEnv.siteUrl}/tuotteet/${product.slug}`,
    countryOfOrigin: "FI",
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${publicEnv.siteUrl}${item.path}`,
    })),
  };
}
