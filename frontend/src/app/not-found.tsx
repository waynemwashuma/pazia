import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-line bg-surface/70 p-10 shadow-lg">
        <p className="text-sm text-accent">Launch not found</p>
        <h1 className="[font-family:var(--font-display)] mt-4 text-5xl text-balance">
          That premiere card is no longer on the board.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted text-pretty">
          Return to the upcoming slate to browse the fictional films currently
          staged for release.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/films"
            className="inline-flex justify-center rounded-full bg-accent px-5 py-3 text-sm text-panel-ink"
          >
            Open the launch slate
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-full border border-accent px-5 py-3 text-sm text-accent hover:bg-accent hover:text-panel-ink"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
