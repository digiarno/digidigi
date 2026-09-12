import { postalCentroids } from "@/config/postal-centroids";
import type { PostalCentroid, Reseller } from "@/config/types";

const EARTH_KM = 6371;

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

export function normalizeQuery(value: string): string {
  return value.trim().toLocaleLowerCase("fi-FI");
}

export function lookupPostal(query: string): PostalCentroid | undefined {
  const compact = query.replace(/\s/g, "");
  if (/^\d{5}$/.test(compact)) {
    const exact = postalCentroids.find((item) => item.postalCode === compact);
    if (exact) return exact;
    const prefix = compact.slice(0, 2);
    return postalCentroids.find((item) => item.postalCode.startsWith(prefix));
  }
  const needle = normalizeQuery(query);
  if (!needle) return undefined;
  return postalCentroids.find((item) => normalizeQuery(item.city).includes(needle));
}

export type RankedReseller = Reseller & { distanceKm?: number };

export function filterResellers(resellers: Reseller[], query: string): RankedReseller[] {
  const needle = normalizeQuery(query);
  if (!needle) {
    return [...resellers].sort((a, b) => a.name.localeCompare(b.name, "fi"));
  }

  const origin = lookupPostal(query);
  const digits = query.replace(/\s/g, "");

  const matched = resellers.filter((reseller) => {
    const city = normalizeQuery(reseller.city);
    const name = normalizeQuery(reseller.name);
    const postal = reseller.postalCode;
    if (city.includes(needle) || name.includes(needle)) return true;
    if (/^\d{5}$/.test(digits) && postal === digits) return true;
    if (/^\d{5}$/.test(digits) && postal.startsWith(digits.slice(0, 2))) return true;
    return false;
  });

  const pool = matched.length > 0 ? matched : resellers;

  if (!origin) {
    return [...pool].sort((a, b) => a.name.localeCompare(b.name, "fi"));
  }

  return [...pool]
    .map((reseller) => ({
      ...reseller,
      distanceKm: haversineKm(origin, { lat: reseller.lat, lng: reseller.lng }),
    }))
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

export function groupByRegion(resellers: RankedReseller[]): Map<string, RankedReseller[]> {
  const groups = new Map<string, RankedReseller[]>();
  for (const reseller of resellers) {
    const list = groups.get(reseller.region) ?? [];
    list.push(reseller);
    groups.set(reseller.region, list);
  }
  return groups;
}
