const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatFullDate(date: string) {
  return fullDateFormatter.format(new Date(date));
}

export function formatShortDate(date: string) {
  return shortDateFormatter.format(new Date(date));
}

export function formatRuntime(runtimeMinutes: number) {
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export function getCountdownParts(targetDate: string, now = Date.now()) {
  const difference = Math.max(new Date(targetDate).getTime() - now, 0);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return { days, hours, minutes };
}
