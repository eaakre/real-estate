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

export const metadata: Metadata = {
  title: {
    default: "Jeremy Kopp | Fargo Real Estate",
    template: "%s | Jeremy Kopp Real Estate",
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
  metadataBase: new URL("https://jeremykopp.com"),
  alternates: {
    canonical: "https://jeremykopp.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jeremykopp.com",
    siteName: "Jeremy Kopp Real Estate",
    title: "Jeremy Kopp | Fargo Real Estate",
    description:
      "Helping clients buy and sell homes in Fargo, Moorhead, and West Fargo.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jeremy Kopp - Fargo Real Estate Agent",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
