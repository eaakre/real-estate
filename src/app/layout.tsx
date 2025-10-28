import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const domain = process.env.DOMAIN || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Real Estate of Mind | Fargo Real Estate",
    template: "%s | Real Estate of Mind",
  },
  description:
    "Helping clients buy and sell homes in Fargo, Moorhead, and West Fargo.",
  keywords: [
    "Fargo real estate",
    "Moorhead homes for sale",
    "West Fargo real estate",
    "buy a house Fargo",
    "sell your home Fargo",
    "real estate agent Fargo ND",
  ],
  metadataBase: new URL(domain),
  alternates: {
    canonical: process.env.DOMAIN,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.DOMAIN,
    siteName: "Real Estate of Mind",
    title: "Real Estate of Mind | Fargo Real Estate",
    description:
      "Helping clients buy and sell homes in Fargo, Moorhead, and West Fargo.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate of Mind - Fargo Real Estate",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
