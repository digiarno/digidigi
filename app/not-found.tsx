import { notFoundContent } from "@/config/site-content";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-4 py-24">
      <h1 className="font-display text-5xl">{notFoundContent.h1}</h1>
      <p className="mt-4 text-lg text-muted">{notFoundContent.lead}</p>
      <div className="mt-8">
        <Button href={notFoundContent.cta.href}>{notFoundContent.cta.label}</Button>
      </div>
    </div>
  );
}
