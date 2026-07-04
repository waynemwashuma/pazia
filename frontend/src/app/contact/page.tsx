import type { Metadata } from "next";
import { companyProfile } from "@/content/site";
import { ContactScreen } from "@/components/screens/contact-screen";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Join the premiere bulletin or start a launch conversation with ${companyProfile.name}.`,
};

export default function ContactPage() {
  return <ContactScreen />;
}
