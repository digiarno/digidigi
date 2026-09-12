import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label={`${siteConfig.name} etusivu`}>
      <Image
        src="/lukkan-logo.svg"
        alt=""
        width={128}
        height={30}
        className={variant === "light" ? "brightness-0 invert" : ""}
        priority
      />
    </Link>
  );
}
