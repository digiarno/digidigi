import { homeContent } from "@/config/site-content";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqList } from "@/components/sections/FaqList";
import { Hero } from "@/components/sections/Hero";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), faqJsonLd(homeContent.faqs)]} />
      <Hero />
      <ProductHighlights />
      <TrustSignals />
      <FaqList />
      <ContactForm />
    </>
  );
}
