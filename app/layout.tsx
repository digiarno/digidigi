import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import { a11y } from "@/config/site-content";
import { siteConfig } from "@/config/site";
import { ChatWidgetLoader } from "@/components/layout/ChatWidgetLoader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GtmNoscript, TrackingScripts } from "@/components/layout/TrackingScripts";
import { publicEnv } from "@/lib/env";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const plex = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  ...pageMetadata({
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "Lukkan-terassilasit valmistetaan Suomessa ja suunnitellaan mittatilaustyönä. Terassilasit, lasiterassit, parvekelasitus ja kaiteet.",
    path: "/",
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fi" className={`${inter.variable} ${plex.variable} h-full antialiased`}>
      <head>
        {publicEnv.cookieYesId ? (
          /* CookieYes first in <head> so it precedes GTM/GA4/Pixel. See README. */
          <script
            id="cookieyes-head"
            src={`https://cdn-cookieyes.com/client_data/${publicEnv.cookieYesId}/script.js`}
            async
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-mist font-sans text-ink">
        <GtmNoscript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cta focus:px-4 focus:py-2"
        >
          {a11y.skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <TrackingScripts />
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
