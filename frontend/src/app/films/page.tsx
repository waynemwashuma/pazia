import type { Metadata } from "next";
import { companyProfile } from "@/content/site";
import { FilmsScreen } from "@/components/screens/films-screen";

export const metadata: Metadata = {
  title: "Upcoming Launches",
  description:
    `Browse the fictional launch slate, premiere dates, poster treatments, and opening-night notes for ${companyProfile.name}.`,
};

export default function FilmsPage() {
  return <FilmsScreen />;
}
