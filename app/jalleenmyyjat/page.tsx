import type { Metadata } from "next";
import { resellersContent } from "@/config/site-content";
import { ResellerDirectory } from "@/components/sections/ResellerDirectory";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getResellers } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Jälleenmyyjät | Lukkan",
  description: resellersContent.lead,
  path: "/jalleenmyyjat",
});

export default async function ResellersPage() {
  const resellers = await getResellers();
  return (
    <SectionContainer
      eyebrow={resellersContent.eyebrow}
      title={resellersContent.h1}
      lead={resellersContent.lead}
      className="pt-12"
    >
      <ResellerDirectory resellers={resellers} />
    </SectionContainer>
  );
}
