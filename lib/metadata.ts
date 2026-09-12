import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { publicEnv } from "@/lib/env";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const url = `${publicEnv.siteUrl}${path === "/" ? "" : path}`;
  const ogImage = image ?? "/images/og-default.svg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
