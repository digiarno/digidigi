import Link from "next/link";

const variants = {
  primary:
    "bg-cta text-ink hover:bg-cta-hover focus-visible:outline-cta shadow-[0_10px_30px_rgba(157,207,88,0.28)]",
  secondary:
    "bg-white/10 text-white border border-white/25 hover:bg-white/18 focus-visible:outline-white",
  outline:
    "bg-transparent text-navy border border-navy/20 hover:border-navy hover:bg-navy/5 focus-visible:outline-navy",
  ghost: "bg-transparent text-white hover:bg-white/10 focus-visible:outline-white",
} as const;

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
