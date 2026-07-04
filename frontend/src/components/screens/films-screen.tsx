"use client";

import { useDeferredValue } from "react";
import { FilmCard } from "@/components/film-card";
import { InlineErrorPanel, LoadingPanel } from "@/components/page-states";
import { useSiteSearch } from "@/components/site-search";
import { useFilmsData } from "@/hooks/use-film-data";

function FilmsEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-line bg-surface/70 p-8 shadow-lg">
      <p className="text-sm text-accent">No launches match that search</p>
      <p className="mt-3 max-w-xl text-lg text-pretty text-muted">
        Clear the navbar search to return to the full slate of upcoming premieres.
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

export function FilmsScreen() {
  const { query, clearQuery } = useSiteSearch();
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const { data, error, isLoading, retry } = useFilmsData();

  const filteredFilms = !data
    ? []
    : data.filter((film) => {
        if (!deferredQuery) {
          return true;
        }

        const haystack = [
          film.title,
          film.city,
          film.logline,
          film.director,
          film.phase,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(deferredQuery);
      });

  return (
    <div className="px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        {isLoading && <LoadingPanel label="Loading upcoming launches" />}
        {error && (
          <InlineErrorPanel
            title="Launch slate unavailable"
            message={error.message}
            actionLabel="Reload launches"
            onAction={retry}
          />
        )}
        {!isLoading && !error && filteredFilms.length === 0 && (
          <FilmsEmptyState onReset={clearQuery} />
        )}
        {!isLoading && !error && filteredFilms.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 text-sm text-muted">
              <p className="text-pretty">
                {filteredFilms.length} launch
                {filteredFilms.length === 1 ? "" : "es"} on the current slate.
              </p>
              <p className="tabular-nums">
                {deferredQuery ? `Filter active: ${query}` : "Full slate"}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredFilms.map((film, index) => (
                <FilmCard key={film.slug} film={film} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
