export type NavItem = {
  href: string;
  label: string;
};

export type TrustBadge = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Highlight = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

export type Step = {
  title: string;
  description: string;
};

export type InterestOption = {
  value: "terrace" | "balcony";
  label: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  featured: boolean;
  parentSlug?: string;
  tagline: string;
  excerpt: string;
  description: string;
  heroEyebrow: string;
  h1: string;
  h2: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  specs: ProductSpec[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  video?: {
    provider: "youtube" | "vimeo";
    id: string;
    title: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  readingMinutes: number;
  h1: string;
  content: { heading?: string; paragraphs: string[] }[];
};

export type Reseller = {
  id: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
  region: string;
  website?: string;
  products?: string[];
};

export type PostalCentroid = {
  postalCode: string;
  city: string;
  lat: number;
  lng: number;
};
