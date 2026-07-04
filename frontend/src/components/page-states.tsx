import Link from "next/link";
import { cn } from "@/lib/cn";

export function LoadingPanel({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-3xl border border-line bg-surface/70 p-6 shadow-lg",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <div className="space-y-4">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-12 max-w-xl rounded-2xl bg-white/10" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-56 rounded-3xl bg-white/10" />
          <div className="h-56 rounded-3xl bg-white/10" />
          <div className="h-56 rounded-3xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function InlineErrorPanel({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-3xl border border-red-900 bg-red-950/60 p-6 shadow-lg"
    >
      <p className="text-sm text-accent">{title}</p>
      <p className="mt-3 max-w-xl text-lg text-pretty">{message}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-5 rounded-full bg-accent px-5 py-3 text-sm text-panel-ink"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-line bg-surface/70 p-8 text-center shadow-lg">
      <p className="text-sm text-accent">{title}</p>
      <p className="mx-auto mt-3 max-w-xl text-lg text-muted text-pretty">
        {description}
      </p>
      <Link
        href={actionHref}
        className="mt-6 inline-flex rounded-full border border-accent px-5 py-3 text-sm text-accent hover:bg-accent hover:text-panel-ink"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
