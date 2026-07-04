export interface FilmPoster {
  base: string;
  accent: string;
  highlight: string;
  shadow: string;
  motif: string;
  treatment: string;
}

export interface Film {
  slug: string;
  title: string;
  phase: string;
  featured: boolean;
  logline: string;
  synopsis: string;
  premiereDate: string;
  releaseDate: string;
  city: string;
  venue: string;
  director: string;
  runtimeMinutes: number;
  genres: string[];
  cast: string[];
  launchFocus: string;
  teaserStatus: string;
  poster: FilmPoster;
  posterUrl?: string;
}

export interface NewsletterSubmission {
  name: string;
  email: string;
  company: string;
  interest: string;
  notes: string;
}

export interface NewsletterReceipt {
  id: string;
  message: string;
}
