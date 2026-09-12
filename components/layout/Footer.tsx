import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerColumns, navItems } from "@/config/site-content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            {siteConfig.legalName}
            <br />
            {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
            <br />
            {siteConfig.phoneDisplay}
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {column.title}
            </p>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Kaikki oikeudet pidätetään.</p>
          <nav className="flex flex-wrap gap-4">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
