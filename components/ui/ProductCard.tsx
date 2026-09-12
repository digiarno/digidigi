import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/config/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/tuotteet/${product.slug}`}
      className="group glass-card flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{product.category}</p>
        <h3 className="font-display text-2xl text-ink">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted">{product.excerpt}</p>
        <span className="mt-auto pt-2 text-sm font-semibold text-navy">Lue lisää →</span>
      </div>
    </Link>
  );
}
