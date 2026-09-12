import Script from "next/script";
import { publicEnv } from "@/lib/env";

/**
 * CookieYes is injected as a raw <script> first in app/layout.tsx <head>,
 * not via next/script beforeInteractive. CookieYes must precede GTM/GA4/Pixel.
 * App Router has no _document, and eslint-config-next flags beforeInteractive
 * outside pages/_document.js — the raw first-in-head tag is the GDPR-safe path.
 */

export function TrackingScripts() {
  return (
    <>
      {publicEnv.gtmId ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
Date.now(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${publicEnv.gtmId}');`}
        </Script>
      ) : null}
      {publicEnv.ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());gtag('config','${publicEnv.ga4Id}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {publicEnv.metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');fbq('init','${publicEnv.metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}

export function GtmNoscript() {
  if (!publicEnv.gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${publicEnv.gtmId}`}
        height="0"
        width="0"
        className="hidden"
        title="Google Tag Manager"
      />
    </noscript>
  );
}
