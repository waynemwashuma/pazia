import Link from "next/link";
import { companyProfile } from "@/content/site";
import { MockServiceWorkerBoot } from "@/components/mock-service-worker-boot";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteSearchBar, SiteSearchProvider } from "@/components/site-search";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only rounded-md bg-panel px-4 py-2 text-panel-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <MockServiceWorkerBoot />
      <SiteSearchProvider>
        <div className="flex min-h-dvh flex-col">
          <header
            className="fixed inset-x-0 top-0 z-40 border-b border-line bg-surface"
            style={{ paddingTop: "max(env(safe-area-inset-top), 0.5rem)" }}
          >
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-10">
              <div className="grid gap-2 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
                <Link
                  href="/"
                  className="[font-family:var(--font-display)] text-xl text-foreground"
                >
                  {companyProfile.name}
                </Link>
                <SiteSearchBar />
                <SiteNavigation />
              </div>
            </div>
          </header>
          <main id="content" className="flex-1 pt-32 sm:pt-36 lg:pt-24">
            {children}
          </main>
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
              <div className="space-y-2">
                <p className="[font-family:var(--font-display)] text-2xl text-balance">
                  {companyProfile.name}
                </p>
                <p className="max-w-xl text-sm text-muted text-pretty">
                  A studio-adjacent launch partner for premieres, teaser drops,
                  and press campaigns that deserve a first-night pulse.
                </p>
              </div>
              <div className="space-y-1 text-sm text-muted">
                <p>{companyProfile.contactEmail}</p>
                <p>{companyProfile.contactPhone}</p>
                <p>{companyProfile.locations.join(" / ")}</p>
              </div>
            </div>
          </footer>
        </div>
      </SiteSearchProvider>
    </>
  );
}
