import { blogPosts } from "@/config/blog";
import { products } from "@/config/products";
import resellersJson from "@/config/resellers.json";
import type { BlogPost, Product, Reseller } from "@/config/types";

/**
 * Thin content adapter. Today it reads local config.
 * Swap the internals for Sanity / Contentful / Payload without touching pages.
 */
const resellers = resellersJson as Reseller[];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((product) => product.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  return products.filter((item) => product.relatedSlugs.includes(item.slug));
}

export async function getPosts(): Promise<BlogPost[]> {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((post) => post.slug === slug);
}

export async function getPostSlugs(): Promise<string[]> {
  return blogPosts.map((post) => post.slug);
}

export async function getResellers(): Promise<Reseller[]> {
  return resellers;
}
