import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogIndexContent } from "@/config/site-content";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blogi | Lukkan",
  description: blogIndexContent.lead,
  path: "/blogi",
});

export default async function BlogIndexPage() {
  const posts = await getPosts();
  return (
    <SectionContainer
      eyebrow={blogIndexContent.eyebrow}
      title={blogIndexContent.h1}
      lead={blogIndexContent.lead}
      className="pt-12"
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blogi/${post.slug}`} className="glass-card block overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/9]">
                <Image src={post.imageSrc} alt={post.imageAlt} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">{post.category}</p>
                <h2 className="mt-2 font-display text-2xl">{post.title}</h2>
                <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
