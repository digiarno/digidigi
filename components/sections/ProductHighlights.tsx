import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/config/site-content";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function ProductHighlights() {
  return (
    <SectionContainer
      title={homeContent.highlightsHeading}
      lead={homeContent.highlightsLead}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {homeContent.highlights.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group overflow-hidden rounded-3xl bg-charcoal text-white"
          >
            <div className="relative aspect-[16/10]">
              <Image src={item.imageSrc} alt="" fill className="object-cover opacity-80" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
