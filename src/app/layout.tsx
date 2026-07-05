import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-dubey-portfolio.vercel.app"),
  title: "Anuj Dubey | Portfolio",
  description:
    "Interactive 3D solar system portfolio of Anuj Dubey — Software Development Engineer and full-stack developer. Explore planets to discover my projects, experience, certifications, and contact info.",
  keywords: [
    "Anuj Dubey",
    "portfolio",
    "software engineer",
    "full stack developer",
    "Three.js",
    "Next.js",
    "IIIT Kalyani",
  ],
  authors: [{ name: "Anuj Dubey" }],
  openGraph: {
    title: "Anuj Dubey | Portfolio",
    description:
      "Explore an interactive 3D solar system — each planet reveals my projects, experience, and contact info.",
    type: "website",
    images: ["/intro.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Dubey | Portfolio",
    description:
      "Explore an interactive 3D solar system — each planet reveals my projects, experience, and contact info.",
    images: ["/intro.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
