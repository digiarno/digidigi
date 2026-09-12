type HeroBackgroundVideoProps = {
  videoSrc?: string;
  posterSrc: string;
  alt: string;
};

export function HeroBackgroundVideo({ videoSrc, posterSrc, alt }: HeroBackgroundVideoProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={!videoSrc}>
      {videoSrc ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${posterSrc})` }}
          role="img"
          aria-label={alt}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/35" />
    </div>
  );
}
