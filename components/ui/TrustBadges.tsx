import Image from "next/image";
import { trustBadges } from "@/config/site-content";

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-4 ${className}`}>
      {trustBadges.map((badge) => (
        <li
          key={badge.id}
          className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur"
        >
          <Image src={badge.imageSrc} alt="" width={40} height={40} />
          <div>
            <p className="text-sm font-semibold">{badge.name}</p>
            <p className="text-xs opacity-70">{badge.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
