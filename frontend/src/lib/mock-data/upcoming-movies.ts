import seedData from "../../../../data/seed.json";

export interface UpcomingMovieSeed {
  id: number;
  title: string;
  posterUrl: string;
  publicReleaseDate: string;
  description: string;
  director: string;
  worldPremiere: string;
  categories: string[];
  mainCast: string[];
  runtime: string;
  releaseVenue: string;
}

const typedSeedData = seedData as {
  films: UpcomingMovieSeed[];
};

export const upcomingMovies = typedSeedData.films;
