export const siteConfig = {
  name: "Lukkan",
  legalName: "Lukkan (Aluroll Oy)",
  tagline: "Sinun elämäsi tila",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lukkan.fi",
  locale: "fi_FI",
  language: "fi",
  phoneDisplay: "0291 230 221",
  phoneHref: "tel:+358291230221",
  email: process.env.NEXT_PUBLIC_CONTACT_RECEIVER ?? "",
  foundingYear: 1980,
  address: {
    street: "Metallikatu 1",
    postalCode: "15160",
    city: "Lahti",
    region: "Päijät-Häme",
    country: "FI",
    countryName: "Finland",
  },
  geo: {
    lat: 60.9827,
    lng: 25.6612,
  },
  social: {
    facebook: "https://www.facebook.com/lukkan.fi",
    instagram: "https://www.instagram.com/lukkan.fi",
    youtube: "https://www.youtube.com/@lukkan",
  },
  hours: "ma–pe 8–16",
} as const;

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
