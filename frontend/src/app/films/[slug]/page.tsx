import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmDetailScreen } from "@/components/screens/film-detail-screen";
import { companyProfile } from "@/content/site";
import { getFilmBySlug, getFilms } from "@/lib/api";
import { ApiError } from "@/lib/api/errors";

interface FilmPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const films = await getFilms();

  return films.map((film) => ({
    slug: film.slug,
  }));
}

export async function generateMetadata({
  params,
}: FilmPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const film = await getFilmBySlug(slug);

    return {
      title: film.title,
      description: film.logline,
      openGraph: {
        title: `${film.title} | ${companyProfile.name}`,
        description: film.logline,
      },
    };
  } catch {
    return {
      title: "Launch not found",
      description: "The requested film launch could not be found.",
    };
  }
}

export default async function FilmPage({ params }: FilmPageProps) {
  const { slug } = await params;

  try {
    await getFilmBySlug(slug);
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return <FilmDetailScreen slug={slug} />;
}
