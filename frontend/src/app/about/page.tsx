import type { Metadata } from "next";
import { AboutScreen } from "@/components/screens/about-screen";

export const metadata: Metadata = {
  title: "About Pazia Publishing",
  description:
    "Pazia Publishing is a Kenyan film launch and movie publishing company focused on Swahili and African-language cinema.",
};

export default function AboutPage() {
  return <AboutScreen />;
}
