"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-red-900 bg-red-950/60 p-8 shadow-lg">
        <p className="text-sm text-accent">Application error</p>
        <h1 className="[font-family:var(--font-display)] mt-4 text-4xl text-balance">
          The premiere board hit an unexpected interruption.
        </h1>
        <p className="mt-4 text-base leading-7 text-pretty">
          {error.message || "Reload the current view and try again."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-accent px-5 py-3 text-sm text-panel-ink"
        >
          Reload this view
        </button>
      </div>
    </div>
  );
}
