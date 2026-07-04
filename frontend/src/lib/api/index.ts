import { fetchJson } from "@/lib/api/http-client";
import {
  getMockFilmBySlug,
  listMockFilms,
  submitMockNewsletterForm,
} from "@/lib/api/mock-adapter";
import type {
  Film,
  NewsletterReceipt,
  NewsletterSubmission,
} from "@/lib/api/types";

function shouldUseLiveApi() {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API === "true") {
    return false;
  }

  return Boolean(process.env.NEXT_PUBLIC_API_URL?.trim());
}

export async function getFilms(): Promise<Film[]> {
  if (typeof window === "undefined" && !shouldUseLiveApi()) {
    return listMockFilms();
  }

  return fetchJson<Film[]>("/api/films");
}

export async function getFilmBySlug(slug: string): Promise<Film> {
  if (typeof window === "undefined" && !shouldUseLiveApi()) {
    return getMockFilmBySlug(slug);
  }

  return fetchJson<Film>(`/api/films/${slug}`);
}

export async function submitNewsletterForm(
  submission: NewsletterSubmission,
): Promise<NewsletterReceipt> {
  if (typeof window === "undefined" && !shouldUseLiveApi()) {
    return submitMockNewsletterForm(submission);
  }

  return fetchJson<NewsletterReceipt>("/api/newsletter", {
    body: JSON.stringify(submission),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
