"use client";

import { useEffect, useRef } from "react";
import { resellersContent } from "@/config/site-content";
import type { Reseller } from "@/config/types";
import { publicEnv } from "@/lib/env";

type MapsWindow = Window & {
  google?: {
    maps: {
      Map: new (el: HTMLElement, opts: Record<string, unknown>) => {
        setCenter: (x: unknown) => void;
        setZoom: (z: number) => void;
        fitBounds: (b: unknown) => void;
      };
      Marker: new (opts: Record<string, unknown>) => { addListener: (e: string, cb: () => void) => void; setMap: (m: null) => void };
      InfoWindow: new (opts: Record<string, unknown>) => { open: (opts: Record<string, unknown>) => void };
      LatLngBounds: new () => { extend: (x: unknown) => void };
    };
  };
};

export function ResellerMap({ resellers }: { resellers: Reseller[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const key = publicEnv.googleMapsKey;

  useEffect(() => {
    if (!key || !mapRef.current || resellers.length === 0) return;
    let cancelled = false;
    const markers: { setMap: (m: null) => void }[] = [];

    const init = async () => {
      await loadMaps(key);
      if (cancelled || !mapRef.current) return;
      const g = (window as MapsWindow).google;
      if (!g?.maps) return;
      const map = new g.maps.Map(mapRef.current, {
        zoom: 6,
        center: { lat: 64.9, lng: 26.0 },
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
      });
      const bounds = new g.maps.LatLngBounds();
      for (const reseller of resellers) {
        const position = { lat: reseller.lat, lng: reseller.lng };
        bounds.extend(position);
        const marker = new g.maps.Marker({ position, map, title: reseller.name });
        const info = new g.maps.InfoWindow({
          content: `<div style="font:14px Inter,sans-serif;max-width:220px">
            <strong>${escapeHtml(reseller.name)}</strong><br/>
            ${escapeHtml(reseller.street)}<br/>${escapeHtml(reseller.postalCode)} ${escapeHtml(reseller.city)}<br/>
            <a href="tel:${reseller.phone.replace(/\s/g, "")}">${escapeHtml(reseller.phone)}</a><br/>
            <a href="mailto:${escapeHtml(reseller.email)}">Ota yhteyttä</a>
          </div>`,
        });
        marker.addListener("click", () => info.open({ map, anchor: marker }));
        markers.push(marker);
      }
      if (resellers.length === 1) {
        map.setCenter({ lat: resellers[0].lat, lng: resellers[0].lng });
        map.setZoom(11);
      } else {
        map.fitBounds(bounds);
      }
    };

    void init();
    return () => {
      cancelled = true;
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [key, resellers]);

  if (!key) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-[radial-gradient(circle_at_30%_20%,#4f79ab33,transparent_45%),linear-gradient(180deg,#16191e,#012544)] p-8 text-white">
        <p className="max-w-md text-sm leading-relaxed text-white/80">{resellersContent.mapFallback}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="min-h-[520px] overflow-hidden rounded-3xl bg-charcoal" />;
}

function loadMaps(key: string): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>("script[data-lukkan-maps]");
  if (existing && (window as MapsWindow).google?.maps) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("maps")));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    script.async = true;
    script.dataset.lukkanMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("maps"));
    document.head.appendChild(script);
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1c1f24" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9aa0a6" }] },
  { featureType: "water", stylers: [{ color: "#003568" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ color: "#2a3038" }] },
];
