"use client";

import Link from "next/link";
import { InlineErrorPanel, LoadingPanel } from "@/components/page-states";
import { PosterArt } from "@/components/poster-art";
import { useFilmData } from "@/hooks/use-film-data";
import { formatFullDate, formatRuntime } from "@/lib/format";

export function FilmDetailScreen({ slug }: { slug: string }) {
  const { data: film, error, isLoading, retry } = useFilmData(slug);

  if (isLoading) {
    return (
      <div className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <LoadingPanel label="Loading film launch details" className="min-h-[36rem]" />
        </div>
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <InlineErrorPanel
            title="Launch details unavailable"
            message={error?.message ?? "That launch could not be opened."}
            actionLabel="Reload launch details"
            onAction={retry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 rounded-3xl border border-line bg-surface/70 p-8 shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
          <PosterArt film={film} backgroundOnly className="min-h-[30rem]" />
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-accent">{film.phase}</p>
              <h1 className="[font-family:var(--font-display)] text-5xl text-balance">
                {film.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted text-pretty">
                {film.logline}
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-black/20 p-5">
                <dt className="text-sm text-accent">World premiere</dt>
                <dd className="mt-2 text-pretty">{formatFullDate(film.premiereDate)}</dd>
              </div>
              <div className="rounded-3xl border border-line bg-black/20 p-5">
                <dt className="text-sm text-accent">Public release</dt>
                <dd className="mt-2 text-pretty">{formatFullDate(film.releaseDate)}</dd>
              </div>
              <div className="rounded-3xl border border-line bg-black/20 p-5">
                <dt className="text-sm text-accent">Premiere venue</dt>
                <dd className="mt-2 text-pretty">
                  {film.venue}, {film.city}
                </dd>
              </div>
              <div className="rounded-3xl border border-line bg-black/20 p-5">
                <dt className="text-sm text-accent">Runtime</dt>
                <dd className="mt-2 tabular-nums">{formatRuntime(film.runtimeMinutes)}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3">
              {film.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-line bg-black/20 px-4 py-2 text-sm text-muted"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/films"
                className="inline-flex justify-center rounded-full bg-accent px-5 py-3 text-sm text-panel-ink"
              >
                Back to the slate
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full border border-accent px-5 py-3 text-sm text-accent hover:bg-accent hover:text-panel-ink"
              >
                Ask about this launch
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <article className="rounded-3xl border border-line bg-surface/70 p-8 shadow-lg">
            <p className="text-sm text-accent">Synopsis</p>
            <p className="mt-4 text-base leading-8 text-muted text-pretty">
              {film.synopsis}
            </p>
            <div className="mt-8 rounded-3xl border border-line bg-black/20 p-5">
              <p className="text-sm text-accent">Launch focus</p>
              <p className="mt-3 text-sm leading-7 text-muted text-pretty">
                {film.launchFocus}
              </p>
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-3xl border border-line bg-surface/70 p-8 shadow-lg">
              <p className="text-sm text-accent">Cast</p>
              <ul className="mt-4 space-y-3">
                {film.cast.map((castMember) => (
                  <li
                    key={castMember}
                    className="rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-muted"
                  >
                    {castMember}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-line bg-surface/70 p-8 shadow-lg">
              <p className="text-sm text-accent">Trailer placeholder</p>
              <div className="mt-4 rounded-3xl border border-dashed border-line bg-black/20 p-6">
                <p className="[font-family:var(--font-display)] text-2xl text-balance">
                  Teaser reel still under embargo.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted text-pretty">
                  {film.teaserStatus} When the final asset opens, this panel can
                  switch from a placeholder to a real embed without changing the
                  page contract.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex rounded-full border border-accent px-5 py-3 text-sm text-accent hover:bg-accent hover:text-panel-ink"
                >
                  Get alerted when the teaser drops
                </Link>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
