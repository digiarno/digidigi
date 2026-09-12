import type { Metadata } from "next";
import { productsIndexContent } from "@/config/site-content";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getFeaturedProducts, getProducts } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Tuotteet | Lukkan terassilasit",
  description: productsIndexContent.lead,
  path: "/tuotteet",
});

export default async function ProductsPage() {
  const featured = await getFeaturedProducts();
  const models = (await getProducts()).filter((product) => !product.featured);

  return (
    <SectionContainer
      eyebrow={productsIndexContent.eyebrow}
      title={productsIndexContent.h1}
      lead={productsIndexContent.lead}
      className="pt-12"
    >
      <h2 className="sr-only">{productsIndexContent.h2}</h2>
      <p className="mb-10 max-w-3xl text-muted">{productsIndexContent.intro}</p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <h2 className="mt-16 mb-6 font-display text-3xl">Mallit</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {models.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
}
