import type { Metadata } from "next";
import { studioContent } from "@/config/site-content";
import { AiVisualizer } from "@/components/sections/AiVisualizer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Lukkan Studio | Tekoäly visualisoi terassilasituksen",
  description: studioContent.lead,
  path: "/lukkan-studio",
});

export default function StudioPage() {
  return (
    <SectionContainer
      eyebrow={studioContent.eyebrow}
      title={studioContent.h1}
      lead={studioContent.lead}
      className="pt-12"
    >
      <AiVisualizer />
    </SectionContainer>
  );
}
