import { ApiError } from "@/lib/api/errors";
import { mockFilms } from "@/lib/mock-data/films";
import type { Film, NewsletterReceipt, NewsletterSubmission } from "@/lib/api/types";

function wait(duration = 450) {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  return new Promise((resolve) => setTimeout(resolve, duration));
}

function normaliseFilms() {
  return [...mockFilms].sort(
    (left, right) =>
      new Date(left.premiereDate).getTime() - new Date(right.premiereDate).getTime(),
  );
}

export async function listMockFilms() {
  await wait(420);
  return normaliseFilms();
}

export async function getMockFilmBySlug(slug: string): Promise<Film> {
  await wait(520);

  const film = mockFilms.find((entry) => entry.slug === slug);

  if (!film) {
    throw new ApiError("That launch could not be found.", 404);
  }

  return film;
}

export async function submitMockNewsletterForm(
  submission: NewsletterSubmission,
): Promise<NewsletterReceipt> {
  await wait(760);

  const email = submission.email.trim();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    throw new ApiError("Enter a valid email address to join the bulletin.", 422);
  }

  if (email.includes("hold")) {
    throw new ApiError("The guest list is temporarily paused. Try again shortly.", 503);
  }

  return {
    id: crypto.randomUUID(),
    message:
      "You are on the bulletin for teaser drops, premiere dates, and opening-night notes.",
  };
}
