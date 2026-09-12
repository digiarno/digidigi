import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getPostBySlug, getPostSlugs } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";

type Props = PageProps<"/blogi/[slug]">;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} | Lukkan`,
    description: post.excerpt,
    path: `/blogi/${post.slug}`,
    image: post.imageSrc,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Etusivu", path: "/" },
          { name: "Blogi", path: "/blogi" },
          { name: post.title, path: `/blogi/${post.slug}` },
        ])}
      />
      <header className="bg-charcoal text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-cta">{post.category}</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">{post.h1}</h1>
          <p className="mt-4 text-white/70">
            {post.date} · {post.readingMinutes} min · {post.author}
          </p>
        </div>
      </header>
      <div className="relative mx-auto -mt-8 max-w-4xl overflow-hidden rounded-3xl px-4">
        <div className="relative aspect-[16/8]">
          <Image src={post.imageSrc} alt={post.imageAlt} fill className="object-cover" sizes="100vw" priority />
        </div>
      </div>
      <SectionContainer className="pt-10">
        <div className="mx-auto max-w-3xl space-y-8">
          {post.content.map((block, index) => (
            <section key={index}>
              {block.heading ? <h2 className="font-display text-3xl">{block.heading}</h2> : null}
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </SectionContainer>
    </article>
  );
}
