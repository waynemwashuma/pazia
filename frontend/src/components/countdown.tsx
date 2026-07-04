"use client";

import { useSyncExternalStore } from "react";
import { getCountdownParts } from "@/lib/format";

let currentNow = 0;
let countdownIntervalId: number | null = null;

const countdownListeners = new Set<() => void>();

function notifyCountdownListeners() {
  currentNow = Date.now();
  countdownListeners.forEach((listener) => listener());
}

function subscribeToCountdown(listener: () => void) {
  countdownListeners.add(listener);

  if (countdownListeners.size === 1) {
    window.setTimeout(notifyCountdownListeners, 0);
    countdownIntervalId = window.setInterval(notifyCountdownListeners, 1000);
  }

  return () => {
    countdownListeners.delete(listener);

    if (countdownListeners.size === 0 && countdownIntervalId !== null) {
      window.clearInterval(countdownIntervalId);
      countdownIntervalId = null;
    }
  };
}

function getCountdownSnapshot() {
  return currentNow;
}

function getCountdownServerSnapshot() {
  return 0;
}

function CountdownUnit({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-line bg-black/25 px-3 py-3 text-center">
      <div className="text-2xl tabular-nums text-foreground sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[11px] text-muted">{label}</div>
    </div>
  );
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const now = useSyncExternalStore(
    subscribeToCountdown,
    getCountdownSnapshot,
    getCountdownServerSnapshot,
  );

  const { days, hours, minutes } =
    now > 0
      ? getCountdownParts(targetDate, now)
      : { days: 0, hours: 0, minutes: 0 };

  return (
    <div
      aria-label={`Countdown to premiere: ${days} days, ${hours} hours, and ${minutes} minutes.`}
      className="grid grid-cols-3 gap-2"
    >
      <CountdownUnit label="Days" value={days} />
      <CountdownUnit label="Hours" value={hours} />
      <CountdownUnit label="Minutes" value={minutes} />
    </div>
  );
}
