"use client";

import { useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
  provider: "youtube" | "vimeo";
  id: string;
  title: string;
};

export function VideoEmbed({ provider, id, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const thumb =
    provider === "youtube"
      ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      : `https://vumbnail.com/${id}.jpg`;
  const src =
    provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`
      : `https://player.vimeo.com/video/${id}?autoplay=1`;

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-3xl bg-charcoal text-left"
        aria-label={`Toista video: ${title}`}
      >
        <Image src={thumb} alt="" fill className="object-cover opacity-80" sizes="100vw" unoptimized />
        <span className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cta text-ink shadow-lg transition group-hover:scale-105">
            ▶
          </span>
        </span>
        <span className="absolute bottom-4 left-4 font-display text-lg text-white">{title}</span>
      </button>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-3xl bg-charcoal">
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
