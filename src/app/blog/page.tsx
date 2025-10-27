import { Typography } from "@/components/ui/Typography";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real Estate Blog - Jeremy Kopp | Fargo Home Buying & Selling Tips",
  description:
    "Stay informed with Jeremy Kopp's real estate blog. Get expert insights on buying and selling homes in Fargo, Moorhead, and West Fargo, plus local market updates and tips.",
  openGraph: {
    title: "Real Estate Blog - Jeremy Kopp",
    description:
      "Expert real estate insights and tips for Fargo, Moorhead, and West Fargo home buyers and sellers.",
    url: "https://jeremykopp.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://jeremykopp.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Typography variant="h1">Real Estate Insights & Tips</Typography>
        <Typography
          variant="p"
          className="text-xl text-secondary-foreground mt-4 max-w-3xl mx-auto"
        >
          Stay up-to-date with the latest real estate trends, home buying and
          selling tips, and local market insights for the Fargo-Moorhead area.
        </Typography>
      </div>

      {/* Empty state */}
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-secondary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 012-2h2M7 7v3a1 1 0 001 1h3m-4 0a1 1 0 01-1-1V7a1 1 0 011-1h3m-4 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <Typography variant="h2" className="mb-4">
          Blog Coming Soon
        </Typography>

        <Typography
          variant="p"
          className="text-secondary-foreground mb-8 max-w-2xl mx-auto"
        >
          Jeremy is preparing valuable content to help you navigate the real
          estate market. Check back soon for expert insights on buying and
          selling homes in the Fargo area.
        </Typography>

        <div className="bg-secondary p-8 rounded-lg max-w-md mx-auto">
          <Typography variant="h3" className="mb-4">
            Get Updates
          </Typography>
          <Typography variant="p" className="text-secondary-foreground mb-6">
            Want to be notified when new blog posts are published? Get in touch
            with Jeremy to stay informed about market updates and real estate
            tips.
          </Typography>

          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Contact Jeremy
          </Link>
        </div>
      </div>

      {/* Topics Preview - What the blog will cover */}
      <section className="mt-16">
        <Typography variant="h2" className="text-center mb-12">
          Topics We&apos;ll Cover
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-secondary rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <Typography variant="h3" className="mb-3">
              Home Buying Tips
            </Typography>
            <Typography variant="p" className="text-secondary-foreground">
              First-time buyer guides, financing options, and what to look for
              when touring homes in the Fargo area.
            </Typography>
          </div>

          <div className="text-center p-6 bg-secondary rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <Typography variant="h3" className="mb-3">
              Market Updates
            </Typography>
            <Typography variant="p" className="text-secondary-foreground">
              Monthly insights into Fargo, Moorhead, and West Fargo housing
              market trends, pricing, and inventory updates.
            </Typography>
          </div>

          <div className="text-center p-6 bg-secondary rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <Typography variant="h3" className="mb-3">
              Selling Strategies
            </Typography>
            <Typography variant="p" className="text-secondary-foreground">
              Home staging tips, pricing strategies, and how to prepare your
              property for a successful sale.
            </Typography>
          </div>

          <div className="text-center p-6 bg-secondary rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <Typography variant="h3" className="mb-3">
              Neighborhood Guides
            </Typography>
            <Typography variant="p" className="text-secondary-foreground">
              Detailed insights into different Fargo-Moorhead neighborhoods,
              schools, amenities, and community features.
            </Typography>
          </div>

          <div className="text-center p-6 bg-secondary rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <Typography variant="h3" className="mb-3">
              Legal & Process
            </Typography>
            <Typography variant="p" className="text-secondary-foreground">
              Understanding contracts, inspections, closings, and the legal
              aspects of buying and selling real estate.
            </Typography>
          </div>

          <div className="text-center p-6 bg-secondary rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <Typography variant="h3" className="mb-3">
              Home Maintenance
            </Typography>
            <Typography variant="p" className="text-secondary-foreground">
              Seasonal maintenance tips, home improvement ideas, and how to
              protect your investment year-round.
            </Typography>
          </div>
        </div>
      </section>
    </main>
  );
}
