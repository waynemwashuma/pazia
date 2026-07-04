"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api/errors";
import { getFilmBySlug, getFilms } from "@/lib/api";
import type { Film } from "@/lib/api/types";

interface AsyncState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

function toApiError(error: unknown) {
  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError("The request could not be completed.", 500);
}

export function useFilmsData() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<AsyncState<Film[]>>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let isActive = true;

    void getFilms()
      .then((films) => {
        if (!isActive) {
          return;
        }

        setState({
          data: films,
          error: null,
          isLoading: false,
        });
      })
      .catch((error: unknown) => {
        if (!isActive) {
          return;
        }

        setState({
          data: null,
          error: toApiError(error),
          isLoading: false,
        });
      });

    return () => {
      isActive = false;
    };
  }, [attempt]);

  return {
    ...state,
    retry() {
      setState((current) => ({
        data: current.data,
        error: null,
        isLoading: true,
      }));
      setAttempt((value) => value + 1);
    },
  };
}

export function useFilmData(slug: string) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<AsyncState<Film>>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let isActive = true;

    void getFilmBySlug(slug)
      .then((film) => {
        if (!isActive) {
          return;
        }

        setState({
          data: film,
          error: null,
          isLoading: false,
        });
      })
      .catch((error: unknown) => {
        if (!isActive) {
          return;
        }

        setState({
          data: null,
          error: toApiError(error),
          isLoading: false,
        });
      });

    return () => {
      isActive = false;
    };
  }, [attempt, slug]);

  return {
    ...state,
    retry() {
      setState((current) => ({
        data: current.data,
        error: null,
        isLoading: true,
      }));
      setAttempt((value) => value + 1);
    },
  };
}
