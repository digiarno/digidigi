type SectionContainerProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export function SectionContainer({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
  dark = false,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`px-4 py-16 md:px-8 md:py-24 ${dark ? "bg-charcoal text-white" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        {eyebrow || title || lead ? (
          <header className="mb-10 max-w-3xl md:mb-14">
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
            ) : null}
            {lead ? (
              <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>
                {lead}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
