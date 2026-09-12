import type { Metadata } from "next";
import { contactPageContent } from "@/config/site-content";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Yhteystiedot ja tarjouspyyntö | Lukkan",
  description: contactPageContent.lead,
  path: "/yhteystiedot",
});

export default function ContactPage() {
  return (
    <SectionContainer
      eyebrow={contactPageContent.eyebrow}
      title={contactPageContent.h1}
      lead={contactPageContent.lead}
      className="pt-12"
    >
      <div className="mb-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl bg-navy p-8 text-white">
          <h2 className="font-display text-3xl">{contactPageContent.factoryHeading}</h2>
          <p className="mt-4 leading-relaxed text-white/80">{contactPageContent.factoryBody}</p>
          <p className="mt-6 text-sm">
            {siteConfig.legalName}
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.city}
            <br />
            <a className="underline" href={siteConfig.phoneHref}>
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </article>
        <div className="glass-card rounded-3xl p-8">
          <ContactForm nested />
        </div>
      </div>
    </SectionContainer>
  );
}
