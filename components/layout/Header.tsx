"use client";

import Link from "next/link";
import { useState } from "react";
import { a11y, navItems } from "@/config/site-content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo variant="light" />
        <nav className="hidden items-center gap-7 lg:flex" aria-label={a11y.mainNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href="/yhteystiedot">Pyydä tarjous</Button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? a11y.closeMenu : a11y.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? a11y.closeMenu : a11y.openMenu}</span>
          <span aria-hidden className="text-xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>
      {open ? (
        <nav className="border-t border-white/10 px-4 py-4 lg:hidden" aria-label={a11y.mainNav}>
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl px-3 py-3 text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button href="/yhteystiedot" className="w-full">
                Pyydä tarjous
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
