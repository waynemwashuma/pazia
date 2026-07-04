import type { Film } from "@/lib/api/types";
import { cn } from "@/lib/cn";

export function PosterArt({
  film,
  className,
  backgroundOnly = false,
}: {
  film: Film;
  className?: string;
  backgroundOnly?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden text-white",
        backgroundOnly
          ? "rounded-none border-0 shadow-none"
          : "rounded-3xl border border-white/10 shadow-2xl",
        className,
      )}
      style={{ backgroundColor: film.poster.base }}
    >
      {backgroundOnly && film.posterUrl ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${film.posterUrl})` }}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-3/5"
            style={{ backgroundColor: film.poster.accent, opacity: 0.48 }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded-2xl border border-white/15"
          />
          <div
            aria-hidden="true"
            className="absolute -left-8 top-12 size-32 rounded-full border border-white/10"
            style={{ backgroundColor: film.poster.highlight, opacity: 0.22 }}
          />
          <div
            aria-hidden="true"
            className="absolute -right-10 bottom-12 h-40 w-56 rotate-12 rounded-full border border-white/10"
            style={{ backgroundColor: film.poster.shadow, opacity: 0.5 }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36"
            style={{ backgroundColor: film.poster.shadow, opacity: 0.7 }}
          />
        </>
      )}
      {backgroundOnly ? null : (
        <>
          <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-white/90">
            {film.poster.motif}
          </div>
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <p className="text-sm text-white/72 text-pretty">{film.phase}</p>
            <h3 className="[font-family:var(--font-display)] text-3xl text-balance">
              {film.title}
            </h3>
            <p className="max-w-xs text-sm text-white/78 text-pretty">
              {film.poster.treatment}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
