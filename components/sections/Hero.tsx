import { homeContent } from "@/config/site-content";
import { publicEnv } from "@/lib/env";
import { Button } from "@/components/ui/Button";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import { TrustBadges } from "@/components/ui/TrustBadges";

export function Hero() {
  const { hero } = homeContent;
  return (
    <section className="relative min-h-[86vh] overflow-hidden text-white">
      <HeroBackgroundVideo
        videoSrc={publicEnv.heroVideoUrl}
        posterSrc="/images/hero-poster.svg"
        alt={hero.videoFallbackAlt}
      />
      <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end gap-8 px-4 py-20 md:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cta">{hero.eyebrow}</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">{hero.h1}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{hero.lead}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
        <TrustBadges />
      </div>
    </section>
  );
}
