import type { Metadata } from "next";
import { companyProfile } from "@/content/site";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pazia.co.ke"),
  title: {
    default: `${companyProfile.name} | ${companyProfile.label}`,
    template: `%s | ${companyProfile.name}`,
  },
  description: companyProfile.description,
  openGraph: {
    title: `${companyProfile.name} | ${companyProfile.label}`,
    description: companyProfile.description,
    siteName: companyProfile.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-dvh bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
