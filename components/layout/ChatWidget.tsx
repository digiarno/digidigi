"use client";

import { useEffect } from "react";
import { publicEnv } from "@/lib/env";

/**
 * Isolated chat widget (HubSpot / Zendesk / custom).
 * Loads after idle + afterInteractive equivalent delay so it never blocks LCP.
 * If CookieYes is present, wait for a consent event when available.
 */
export function ChatWidget() {
  const src = publicEnv.chatWidgetUrl;

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    const load = () => {
      if (cancelled || document.querySelector(`script[data-lukkan-chat]`)) return;
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.lukkanChat = "true";
      document.body.appendChild(script);
    };

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ accepted?: string[] }>).detail;
      if (!detail?.accepted || detail.accepted.includes("functional") || detail.accepted.includes("all")) {
        load();
      }
    };

    window.addEventListener("cookieyes_consent_update", onConsent);

    const idle = window.setTimeout(load, 3500);

    return () => {
      cancelled = true;
      window.clearTimeout(idle);
      window.removeEventListener("cookieyes_consent_update", onConsent);
    };
  }, [src]);

  return null;
}
