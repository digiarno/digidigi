import { homeContent } from "@/config/site-content";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function TrustSignals() {
  const { trust, dealers, howToBuy, studio } = homeContent;
  return (
    <>
      <SectionContainer dark eyebrow={trust.eyebrow} title={trust.h2} lead={trust.lead}>
        <div className="grid gap-6 md:grid-cols-3">
          {trust.points.map((point) => (
            <article key={point.title} className="glass-panel rounded-3xl p-6">
              <h3 className="font-display text-2xl">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{point.text}</p>
            </article>
          ))}
        </div>
      </SectionContainer>
      <SectionContainer title={dealers.h2} lead={dealers.lead} className="bg-white">
        <Button href={dealers.cta.href}>{dealers.cta.label}</Button>
      </SectionContainer>
      <SectionContainer title={howToBuy.h2} className="bg-fog">
        <ol className="grid gap-6 md:grid-cols-3">
          {howToBuy.steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>
      <SectionContainer dark title={studio.h2} lead={studio.lead}>
        <Button href={studio.cta.href}>{studio.cta.label}</Button>
      </SectionContainer>
    </>
  );
}
