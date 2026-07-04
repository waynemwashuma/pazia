"use client";

import Link from "next/link";
import { useDeferredValue } from "react";
import { Countdown } from "@/components/countdown";
import { InlineErrorPanel, LoadingPanel } from "@/components/page-states";
import { PosterArt } from "@/components/poster-art";
import { useSiteSearch } from "@/components/site-search";
import { useFilmsData } from "@/hooks/use-film-data";
import type { Film } from "@/lib/api/types";
import { cn } from "@/lib/cn";
import { formatRuntime } from "@/lib/format";

function sortByPremiereDate(films: Film[]) {
  return [...films].sort(
    (left, right) =>
      new Date(left.premiereDate).getTime() - new Date(right.premiereDate).getTime(),
  );
}

function sortByRuntime(films: Film[]) {
  return [...films].sort((left, right) => right.runtimeMinutes - left.runtimeMinutes);
}

function sortByCity(films: Film[]) {
  return [...films].sort((left, right) => left.city.localeCompare(right.city));
}

function matchesQuery(film: Film, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    film.title,
    film.logline,
    film.synopsis,
    film.city,
    film.venue,
    film.director,
    film.phase,
    film.launchFocus,
    film.teaserStatus,
    film.genres.join(" "),
    film.cast.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function HomePosterCard({
  film,
  featured = false,
}: {
  film: Film;
  featured?: boolean;
}) {
  return (
    <li className="w-36 shrink-0 snap-start sm:w-40">
      <Link
        href={`/films/${film.slug}`}
        className="block"
        aria-label={`Open launch details for ${film.title}`}
      >
        <PosterArt
          film={film}
          backgroundOnly
          className={cn(
            "aspect-[2/3] w-full",
            featured && "ring-1 ring-accent ring-offset-0",
          )}
        />
        <p className="mt-2 truncate text-xs text-foreground sm:text-sm">
          {film.title}
        </p>
      </Link>
    </li>
  );
}

function RailSection({
  eyebrow,
  title,
  films,
  highlightSlug,
}: {
  eyebrow: string;
  title: string;
  films: Film[];
  highlightSlug?: string;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs text-accent">{eyebrow}</p>
          <h2 className="[font-family:var(--font-display)] text-2xl text-balance sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="hidden text-xs text-muted sm:block">{films.length} titles</p>
      </div>
      <ul className="m-0 flex list-none gap-3 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory">
        {films.map((film) => (
          <HomePosterCard
            key={film.slug}
            film={film}
            featured={highlightSlug === film.slug}
          />
        ))}
      </ul>
    </section>
  );
}

function DiscoveryEmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="rounded-3xl border border-line bg-surface/70 p-8 shadow-lg">
      <p className="text-sm text-accent">No matches found</p>
      <p className="mt-3 max-w-xl text-lg text-pretty text-muted">
        Clear the search and browse the full slate of launches again.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full bg-accent px-5 py-3 text-sm text-panel-ink"
      >
        Clear search
      </button>
    </div>
  );
}

export function HomeScreen() {
  const { data, error, isLoading, retry } = useFilmsData();
  const { query, clearQuery } = useSiteSearch();
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  if (isLoading) {
    return (
      <div className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <LoadingPanel label="Loading film launches" className="min-h-[28rem]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <InlineErrorPanel
            title="Launch feed unavailable"
            message={error.message}
            actionLabel="Reload the launches"
            onAction={retry}
          />
        </div>
      </div>
    );
  }

  const launches = sortByPremiereDate(data ?? []);
  const featuredFilm = launches.find((film) => film.featured) ?? launches[0];
  const filteredLaunches = deferredQuery
    ? launches.filter((film) => matchesQuery(film, deferredQuery))
    : launches;
  const spotlightFilm =
    deferredQuery && filteredLaunches[0] ? filteredLaunches[0] : featuredFilm;
  const showSpotlight = !deferredQuery || filteredLaunches.length > 0;
  const openingSoon = sortByPremiereDate(filteredLaunches);
  const runtimeWatchlist = sortByRuntime(filteredLaunches);
  const citySpotlight = sortByCity(filteredLaunches);

  return (
    <div className="space-y-10 pb-20">
      <section className="px-4 pb-2 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {showSpotlight && spotlightFilm ? (
            <div className="space-y-4 rounded-3xl border border-line bg-surface/70 p-4 shadow-lg sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <PosterArt
                  film={spotlightFilm}
                  backgroundOnly
                  className="aspect-[4/5] w-full"
                />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs text-accent">{spotlightFilm.phase}</p>
                    <h1 className="[font-family:var(--font-display)] text-3xl text-balance sm:text-4xl">
                      {spotlightFilm.title}
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-pretty text-muted">
                      {spotlightFilm.logline}
                    </p>
                  </div>
                  <Countdown targetDate={spotlightFilm.premiereDate} />
                  <div className="grid gap-2 text-xs text-muted sm:grid-cols-3 sm:text-sm">
                    <div className="rounded-2xl border border-line bg-black/20 p-3">
                      <div className="text-foreground">Directed by</div>
                      <div className="mt-1 text-pretty">{spotlightFilm.director}</div>
                    </div>
                    <div className="rounded-2xl border border-line bg-black/20 p-3">
                      <div className="text-foreground">Runtime</div>
                      <div className="mt-1 tabular-nums">
                        {formatRuntime(spotlightFilm.runtimeMinutes)}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-line bg-black/20 p-3">
                      <div className="text-foreground">Venue</div>
                      <div className="mt-1 text-pretty">
                        {spotlightFilm.city} / {spotlightFilm.venue}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/films/${spotlightFilm.slug}`}
                    className="inline-flex rounded-full bg-accent px-4 py-2.5 text-sm text-panel-ink"
                  >
                    Open launch details
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {deferredQuery ? (
            filteredLaunches.length ? (
              <RailSection
                eyebrow="Search results"
                title={`Matches for "${query.trim()}"`}
                films={openingSoon}
              />
            ) : (
              <DiscoveryEmptyState onReset={clearQuery} />
            )
          ) : (
            <div className="space-y-8">
              <RailSection eyebrow="Browse" title="Opening soon" films={openingSoon} />
              <RailSection
                eyebrow="Discover"
                title="Long-form launches"
                films={runtimeWatchlist}
                highlightSlug={featuredFilm?.slug}
              />
              <RailSection
                eyebrow="Explore"
                title="City spotlight"
                films={citySpotlight}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
