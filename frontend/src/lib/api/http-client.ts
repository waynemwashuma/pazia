import { ApiError } from "@/lib/api/errors";
import {
  getMockFilmBySlug,
  listMockFilms,
  submitMockNewsletterForm,
} from "@/lib/api/mock-adapter";
import { ensureMockServiceWorkerReady, shouldUseMockApi } from "@/lib/api/mock-browser";
import type { Film, NewsletterReceipt, NewsletterSubmission } from "@/lib/api/types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";

function resolveApiUrl(path: string) {
  if (!apiBaseUrl) {
    return path;
  }

  return new URL(path, apiBaseUrl).toString();
}

async function fallbackToLocalMock<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const method = (init?.method ?? "GET").toUpperCase();

  if (method === "GET" && path === "/api/films") {
    return (await listMockFilms()) as T;
  }

  if (method === "GET" && path.startsWith("/api/films/")) {
    return (await getMockFilmBySlug(path.replace("/api/films/", ""))) as T;
  }

  if (
    method === "POST" &&
    (path === "/api/newsletter" || path === "/api/contact")
  ) {
    const submission = JSON.parse(String(init?.body ?? "{}")) as NewsletterSubmission;
    return (await submitMockNewsletterForm(submission)) as T;
  }

  throw new ApiError("The mock API could not resolve that request.", 500);
}

async function parseErrorMessage(response: Response) {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message ?? "The request could not be completed.";
  } catch {
    return "The request could not be completed.";
  }
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  if (typeof window !== "undefined" && shouldUseMockApi()) {
    try {
      await ensureMockServiceWorkerReady();
    } catch {
      return fallbackToLocalMock<T>(path, init);
    }
  }

  const response = await fetch(resolveApiUrl(path), {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(await parseErrorMessage(response), response.status);
  }

  return (await response.json()) as T;
}

export type FilmListResponse = Film[];
export type FilmDetailResponse = Film;
export type NewsletterResponse = NewsletterReceipt;
