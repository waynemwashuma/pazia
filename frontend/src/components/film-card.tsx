"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PosterArt } from "@/components/poster-art";
import type { Film } from "@/lib/api/types";
import { formatFullDate } from "@/lib/format";

export function FilmCard({
  film,
  index = 0,
}: {
  film: Film;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.45,
        ease: "easeOut",
      }}
      className="group"
    >
      <Link
        href={`/films/${film.slug}`}
        className="relative flex aspect-[2/3] h-auto overflow-hidden rounded-3xl border border-line bg-surface shadow-lg"
      >
        <PosterArt
          film={film}
          backgroundOnly
          className="absolute inset-0 transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />
        <div className="relative z-10 mt-auto w-full">
          <div className="w-full border-t border-white/10 bg-black/10 p-3 transition-colors duration-200 ease-out group-hover:bg-black/85 group-focus-visible:bg-black/85">
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/75 sm:text-sm">
              <span>{film.phase}</span>
              <span aria-hidden="true">/</span>
              <span>{film.city}</span>
              <span aria-hidden="true">/</span>
              <span className="tabular-nums">
                {formatFullDate(film.premiereDate)}
              </span>
            </div>
            <p className="[font-family:var(--font-display)] text-lg text-balance text-white sm:text-xl line-clamp-2">
              {film.title}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
