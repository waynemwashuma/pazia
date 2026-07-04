"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

interface SiteSearchContextValue {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
}

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <SiteSearchContext.Provider
      value={{
        query,
        setQuery,
        clearQuery: () => setQuery(""),
      }}
    >
      {children}
    </SiteSearchContext.Provider>
  );
}

export function useSiteSearch() {
  const context = useContext(SiteSearchContext);

  if (!context) {
    throw new Error("useSiteSearch must be used within SiteSearchProvider");
  }

  return context;
}

export function SiteSearchBar({ className }: { className?: string }) {
  const { query, setQuery, clearQuery } = useSiteSearch();

  return (
    <form
      role="search"
      className={cn("flex w-full items-center", className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="site-search" className="sr-only">
        Search launches
      </label>
      <div className="relative w-full">
        <input
          id="site-search"
          name="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search launches, cities, people"
          className="w-full rounded-full border border-line bg-surface-raised px-4 py-2 pr-16 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        />
        {query ? (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Clear
          </button>
        ) : null}
      </div>
    </form>
  );
}
