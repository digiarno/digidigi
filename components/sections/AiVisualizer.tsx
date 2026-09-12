"use client";

import { useRef, useState } from "react";
import { studioContent } from "@/config/site-content";
import { Button } from "@/components/ui/Button";

type VisualState =
  | { status: "idle" }
  | { status: "loading"; original: string }
  | { status: "done"; original: string; result: string; mocked: boolean }
  | { status: "error"; message: string };

export function AiVisualizer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<VisualState>({ status: "idle" });

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
      setState({ status: "error", message: studioContent.error });
      return;
    }
    const original = await fileToDataUrl(file);
    setState({ status: "loading", original });
    const body = new FormData();
    body.append("image", file);
    try {
      const response = await fetch("/api/visualize", { method: "POST", body });
      if (!response.ok) throw new Error("fail");
      const payload = (await response.json()) as {
        image: string;
        mimeType: string;
        mocked: boolean;
      };
      const result = `data:${payload.mimeType};base64,${payload.image}`;
      setState({ status: "done", original, result, mocked: payload.mocked });
    } catch {
      setState({ status: "error", message: studioContent.error });
    }
  }

  return (
    <div className="grid gap-8">
      {state.status === "idle" || state.status === "error" ? (
        <DropZone
          onFile={handleFile}
          onBrowse={() => inputRef.current?.click()}
          inputRef={inputRef}
        />
      ) : null}
      {state.status === "error" ? (
        <p role="alert" className="text-red-700">
          {state.message}
        </p>
      ) : null}
      {state.status === "loading" ? (
        <div className="overflow-hidden rounded-[2rem] bg-charcoal p-8 text-white">
          <p className="font-display text-3xl">{studioContent.loading}</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-cta" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={state.original} alt="" className="mt-6 max-h-80 w-full rounded-2xl object-cover opacity-50" />
        </div>
      ) : null}
      {state.status === "done" ? (
        <div>
          <div className="grid gap-4 md:grid-cols-2">
            <figure className="overflow-hidden rounded-3xl bg-charcoal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={state.original} alt={studioContent.beforeLabel} className="h-80 w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm text-white/80">{studioContent.beforeLabel}</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-3xl bg-charcoal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={state.result} alt={studioContent.afterLabel} className="h-80 w-full object-cover" />
              {state.mocked ? <GlassOverlay /> : null}
              <figcaption className="px-4 py-3 text-sm text-white/80">{studioContent.afterLabel}</figcaption>
            </figure>
          </div>
          {state.mocked ? <p className="mt-4 text-sm text-muted">{studioContent.mockNotice}</p> : null}
          <div className="mt-6">
            <Button
              onClick={() => {
                setState({ status: "idle" });
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              {studioContent.resetLabel}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DropZone({
  onFile,
  onBrowse,
  inputRef,
}: {
  onFile: (file: File) => void;
  onBrowse: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setOver(false);
        const file = event.dataTransfer.files[0];
        if (file) onFile(file);
      }}
      className={`rounded-[2rem] border border-dashed px-6 py-16 text-center transition ${
        over ? "border-cta bg-cta/10" : "border-navy/20 bg-white/60"
      }`}
    >
      <p className="font-display text-3xl">{studioContent.dropTitle}</p>
      <p className="mt-2 text-muted">{studioContent.dropHint}</p>
      <div className="mt-6">
        <Button onClick={onBrowse}>{studioContent.browseLabel}</Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </div>
  );
}

function GlassOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 mix-blend-screen">
      <div className="absolute inset-y-[12%] left-[8%] right-[8%] grid grid-cols-4 gap-1 opacity-70">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-sm border border-white/50 bg-gradient-to-br from-white/35 to-sky-200/20 shadow-[inset_0_0_30px_rgba(255,255,255,0.25)]"
          />
        ))}
      </div>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
