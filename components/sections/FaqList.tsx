import { homeContent } from "@/config/site-content";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function FaqList({
  items = homeContent.faqs,
}: {
  items?: { question: string; answer: string }[];
}) {
  return (
    <SectionContainer title="Usein kysyttyä">
      <div className="space-y-4">
        {items.map((item) => (
          <details key={item.question} className="glass-card rounded-3xl px-6 py-4">
            <summary className="cursor-pointer font-display text-xl text-ink">{item.question}</summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionContainer>
  );
}
