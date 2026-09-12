import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/sections/FaqList";
import { ProductCard } from "@/components/ui/ProductCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd } from "@/lib/schema";

type Props = PageProps<"/tuotteet/[slug]">;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} | Lukkan`,
    description: product.excerpt,
    path: `/tuotteet/${product.slug}`,
    image: product.imageSrc,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          faqJsonLd(product.faqs),
          breadcrumbJsonLd([
            { name: "Etusivu", path: "/" },
            { name: "Tuotteet", path: "/tuotteet" },
            { name: product.name, path: `/tuotteet/${product.slug}` },
          ]),
        ]}
      />
      <article>
        <header className="relative overflow-hidden bg-charcoal text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cta">{product.heroEyebrow}</p>
              <h1 className="mt-4 font-display text-4xl md:text-6xl">{product.h1}</h1>
              <p className="mt-6 text-lg text-white/75">{product.description}</p>
              <div className="mt-8">
                <Button href="/yhteystiedot">Pyydä tarjous</Button>
              </div>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-3xl">
              <Image src={product.imageSrc} alt={product.imageAlt} fill className="object-cover" sizes="50vw" priority />
            </div>
          </div>
        </header>
        <SectionContainer title={product.h2}>
          <ul className="grid gap-4 md:grid-cols-2">
            {product.highlights.map((item) => (
              <li key={item} className="rounded-3xl bg-white px-5 py-4 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="rounded-3xl border border-navy/10 p-5">
                <dt className="text-xs uppercase tracking-[0.16em] text-accent">{spec.label}</dt>
                <dd className="mt-2 font-display text-xl">{spec.value}</dd>
              </div>
            ))}
          </dl>
          {product.video ? (
            <div className="mt-12">
              <VideoEmbed {...product.video} />
            </div>
          ) : null}
        </SectionContainer>
        <FaqList items={product.faqs} />
        {related.length > 0 ? (
          <SectionContainer title="Tutustu myös">
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </SectionContainer>
        ) : null}
      </article>
    </>
  );
}
