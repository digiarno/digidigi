"use client";

import { useMemo, useState } from "react";
import { resellersContent } from "@/config/site-content";
import type { Reseller } from "@/config/types";
import { Button } from "@/components/ui/Button";
import { fieldControlClass } from "@/components/ui/FormField";
import { filterResellers, groupByRegion, type RankedReseller } from "@/lib/geo";
import { ResellerMap } from "@/components/sections/ResellerMap";

export function ResellerDirectory({ resellers }: { resellers: Reseller[] }) {
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState("");

  const results = useMemo(() => filterResellers(resellers, applied), [resellers, applied]);
  const groups = useMemo(() => groupByRegion(results), [results]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setApplied(query);
        }}
      >
        <label htmlFor="reseller-search" className="text-sm font-medium">
          {resellersContent.searchLabel}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="reseller-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={resellersContent.searchPlaceholder}
            className={fieldControlClass}
          />
          <Button type="submit">{resellersContent.searchButton}</Button>
        </div>
        {applied ? (
          <button
            type="button"
            className="self-start text-sm text-navy underline"
            onClick={() => {
              setQuery("");
              setApplied("");
            }}
          >
            {resellersContent.resetLabel}
          </button>
        ) : null}
        {results.length === 0 ? <p>{resellersContent.empty}</p> : null}
        <div className="space-y-8">
          {[...groups.entries()].map(([region, list]) => (
            <section key={region}>
              <h2 className="mb-3 font-display text-2xl">{region}</h2>
              <ul className="space-y-3">
                {list.map((reseller) => (
                  <ResellerCard key={reseller.id} reseller={reseller} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </form>
      <ResellerMap resellers={results} />
    </div>
  );
}

function ResellerCard({ reseller }: { reseller: RankedReseller }) {
  return (
    <li className="glass-card rounded-3xl p-5">
      <h3 className="font-display text-xl">{reseller.name}</h3>
      <p className="mt-1 text-sm text-muted">
        {reseller.street}, {reseller.postalCode} {reseller.city}
      </p>
      {typeof reseller.distanceKm === "number" ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-accent">
          {reseller.distanceKm.toFixed(0)} km
        </p>
      ) : null}
      <p className="mt-2 text-sm">
        <a className="text-navy underline" href={`tel:${reseller.phone.replace(/\s/g, "")}`}>
          {reseller.phone}
        </a>
        {" · "}
        <a className="text-navy underline" href={`mailto:${reseller.email}`}>
          {reseller.email}
        </a>
      </p>
      <div className="mt-4">
        <Button href={`mailto:${reseller.email}`} variant="outline" className="!px-4 !py-2 text-xs">
          {resellersContent.contactCta}
        </Button>
      </div>
    </li>
  );
}
