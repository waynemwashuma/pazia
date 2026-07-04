import type { Film, FilmPoster } from "@/lib/api/types";
import { upcomingMovies } from "@/lib/mock-data/upcoming-movies";
type UpcomingMovieSeed = (typeof upcomingMovies)[number];

const posterThemes: FilmPoster[] = [
  {
    base: "#1a3140",
    accent: "#2d6173",
    highlight: "#d9ad72",
    shadow: "#081117",
    motif: "Submerged horizon",
    treatment: "Cut-glass lines, midnight tides, and a warm brass seam.",
  },
  {
    base: "#173228",
    accent: "#406e5c",
    highlight: "#b98d53",
    shadow: "#09130f",
    motif: "Midnight conservatory",
    treatment: "Emerald glass, brass stems, and a veil of shadowed petals.",
  },
  {
    base: "#42181a",
    accent: "#8a2e31",
    highlight: "#d4a063",
    shadow: "#140709",
    motif: "Signal flare",
    treatment: "Scarlet transmission bands, lacquer black, and warm radio heat.",
  },
  {
    base: "#292229",
    accent: "#61505e",
    highlight: "#bd975d",
    shadow: "#110d11",
    motif: "Cathedral ash",
    treatment: "Stone plumage, cinder grey, and a restrained gold ember.",
  },
  {
    base: "#202e3a",
    accent: "#3d5564",
    highlight: "#d3a96f",
    shadow: "#0b1218",
    motif: "Silent horizon",
    treatment: "Orbital blue, soft metal, and a narrow seam of launch light.",
  },
  {
    base: "#3b1f1d",
    accent: "#6d3c35",
    highlight: "#d7ae6c",
    shadow: "#120b0a",
    motif: "Velvet corridor",
    treatment: "Dusky burgundy, polished bronze, and a stage-lit edge.",
  },
  {
    base: "#1e2b26",
    accent: "#466157",
    highlight: "#d0a15b",
    shadow: "#09110e",
    motif: "Paper moon",
    treatment: "Forest ink, warm parchment, and a thin crescent of light.",
  },
  {
    base: "#33242f",
    accent: "#6a4c63",
    highlight: "#d8b16a",
    shadow: "#120d11",
    motif: "Nocturne gate",
    treatment: "Plum lacquer, smoked gold, and a corridor of deep shadow.",
  },
  {
    base: "#25343c",
    accent: "#4a6572",
    highlight: "#cda869",
    shadow: "#0d1418",
    motif: "Arterial city",
    treatment: "Steel blue, ember gold, and a pulse of urban light.",
  },
  {
    base: "#342a1f",
    accent: "#6a5840",
    highlight: "#d6ab69",
    shadow: "#120e0a",
    motif: "Golden static",
    treatment: "Warm grain, amber light, and a slightly distressed edge.",
  },
];

function slugify(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseRuntimeMinutes(runtime: string) {
  const minutes = Number.parseInt(runtime, 10);

  return Number.isFinite(minutes) ? minutes : 0;
}

function parseWorldPremiere(worldPremiere: string) {
  const [datePart, locationPart = worldPremiere] = worldPremiere.split(" — ");
  const location = locationPart.trim();

  if (location.includes(",")) {
    const parts = location.split(",");
    const city = parts.pop()?.trim() ?? location;
    const venue = parts.join(",").trim();

    return {
      premiereDate: `${datePart}T19:30:00`,
      city,
      venue,
    };
  }

  const pieces = location.split(/\s+/);

  if (pieces.length > 1) {
    return {
      premiereDate: `${datePart}T19:30:00`,
      city: pieces[0],
      venue: pieces.slice(1).join(" "),
    };
  }

  return {
    premiereDate: `${datePart}T19:30:00`,
    city: location,
    venue: location,
  };
}

function buildPhase(movie: UpcomingMovieSeed, index: number) {
  if (index === 0) {
    return "Featured launch";
  }

  const day = Number(movie.publicReleaseDate.slice(8, 10));

  if (movie.publicReleaseDate.startsWith("2026-07")) {
    if (day <= 10) return "Opening week";
    if (day <= 17) return "Mid-July";
    if (day <= 24) return "Late July";
    return "July release";
  }

  if (movie.publicReleaseDate.startsWith("2026-08")) {
    if (day <= 7) return "Early August";
    if (day <= 14) return "Mid-August";
    return "August release";
  }

  return "Upcoming release";
}

function buildSynopsis(movie: UpcomingMovieSeed) {
  return `${movie.description} The release campaign moves from ${movie.worldPremiere} into the public opening at ${movie.releaseVenue}.`;
}

function buildLaunchFocus(movie: UpcomingMovieSeed) {
  const primaryCategory = movie.categories[0] ?? "Launch";

  return `${primaryCategory} positioning built around ${movie.worldPremiere} and ${movie.releaseVenue}.`;
}

function buildTeaserStatus(movie: UpcomingMovieSeed) {
  return `World premiere: ${movie.worldPremiere}. Public release: ${movie.publicReleaseDate}.`;
}

function posterFor(index: number) {
  return posterThemes[index % posterThemes.length];
}

export const mockFilms: Film[] = upcomingMovies.map((movie, index) => {
  const { premiereDate, city, venue } = parseWorldPremiere(movie.worldPremiere);

  return {
    slug: slugify(movie.title),
    title: movie.title,
    phase: buildPhase(movie, index),
    featured: index === 0,
    logline: movie.description,
    synopsis: buildSynopsis(movie),
    premiereDate,
    releaseDate: `${movie.publicReleaseDate}T00:00:00`,
    city,
    venue,
    director: movie.director,
    runtimeMinutes: parseRuntimeMinutes(movie.runtime),
    genres: movie.categories,
    cast: movie.mainCast,
    launchFocus: buildLaunchFocus(movie),
    teaserStatus: buildTeaserStatus(movie),
    poster: posterFor(index),
    posterUrl: movie.posterUrl,
  };
});
