import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://afroboosteur.com"),
  title: "Afroboosteur - Culture, Santé & Lien Social",
  description:
    "Association Afroboosteur - Promouvoir la culture afrobeat et le bien-être à Neuchâtel à travers des activités sportives et artistiques innovantes.",
  manifest: "/manifest.webmanifest",
  keywords: [
    "Afroboosteur",
    "Afroboost",
    "Neuchâtel",
    "culture",
    "afrobeat",
    "silent party",
    "association",
    "sport",
    "danse",
  ],
  openGraph: {
    title: "Afroboosteur - Culture, Santé & Lien Social",
    description:
      "Promouvoir la culture afrobeat et le bien-être à Neuchâtel",
    url: "https://afroboosteur.com",
    siteName: "Afroboosteur",
    locale: "fr_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
