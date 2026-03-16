import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afroboosteur - Culture, Sant\u00e9 & Lien Social",
  description:
    "Association Afroboosteur - Promouvoir la culture afrobeat et le bien-\u00eatre \u00e0 Neuch\u00e2tel \u00e0 travers des activit\u00e9s sportives et artistiques innovantes.",
  keywords: [
    "Afroboosteur",
    "Afroboost",
    "Neuch\u00e2tel",
    "culture",
    "afrobeat",
    "silent party",
    "association",
    "sport",
    "danse",
  ],
  openGraph: {
    title: "Afroboosteur - Culture, Sant\u00e9 & Lien Social",
    description:
      "Promouvoir la culture afrobeat et le bien-\u00eatre \u00e0 Neuch\u00e2tel",
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
