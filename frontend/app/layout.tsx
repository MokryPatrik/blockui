import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Embed Blocks - Raw Component Embedding",
  description: "Brutalist component embedding system. Minimal, powerful, zero bloat. Embed anything, control everything.",
  keywords: "embed, components, brutalism, API, framework-agnostic",
  authors: [{ name: "Embed Blocks" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
