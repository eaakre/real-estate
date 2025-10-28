import { Typography } from "@/components/ui/Typography";
import { ListingCard } from "@/app/listings/ListingCard";
import { getIdxListings } from "../../lib/idx";
import type { Metadata } from "next";
import { Listing } from "../../types/listing";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Real Estate of Mind - Fargo Real Estate | Homes for Sale in Fargo, Moorhead & West Fargo",
  description:
    "Find your dream home in Fargo, Moorhead, and West Fargo with Real Estate of Mind, your trusted local real estate agents. Browse homes for sale and get expert guidance for buying or selling.",
  openGraph: {
    title: "Real Estate of Mind - Fargo Real Estate",
    description:
      "Your trusted real estate expert for Fargo, Moorhead, and West Fargo. Find homes for sale and get expert buying and selling guidance.",
    url: process.env.DOMAIN,
    type: "website",
  },
  alternates: {
    canonical: process.env.DOMAIN,
  },
};

export default async function Home() {
  const listings: Listing[] = await getIdxListings();
  const featuredListings = listings.slice(0, 6); // Show 6 featured listings

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/80" />
        <div className="relative max-w-6xl mx-auto px-4 py-50 text-center text-white">
          <Typography variant="h1" className="mb-6">
            Your Trusted Fargo Real Estate Experts
          </Typography>

          <Typography
            variant="p"
            className="text-xl text-secondary-foreground mb-8 max-w-3xl mx-auto"
          >
            Real Estate of Mind helps families buy and sell homes throughout
            Fargo, Moorhead, and West Fargo. Experience personalized service and
            local expertise that makes your real estate journey smooth and
            successful.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/listings"
              className="bg-[#0d3b69] text-white px-8 py-3 rounded-lg hover:bg-[#0c3a59] transition-colors font-semibold"
            >
              Browse Homes
            </Link>
            <Link
              href="/contact"
              className="bg-white text-[#0d3b69] px-8 py-3 rounded-lg border-2 border-[#0d3b69] hover:bg-blue-50 transition-colors font-semibold"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Services Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Typography variant="h2">How We Can Help You</Typography>
            <Typography
              variant="p"
              className="text-secondary-foreground mt-4 max-w-2xl mx-auto"
            >
              Whether you&apos;re buying your first home or selling a longtime
              family residence, we&apos;re here to guide you through every step
              of the process.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-secondary rounded-sm shadow-sm ">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-16 h-16 text-blue-600"
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
                Home Buying
              </Typography>
              <Typography variant="p" className="text-gray-600">
                Find the perfect home with expert guidance through the entire
                buying process, from search to closing.
              </Typography>
            </div>

            <div className="text-center p-6 bg-secondary rounded-sm shadow-sm ">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-16 h-16 text-green-600"
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
                Home Selling
              </Typography>
              <Typography variant="p" className="text-gray-600">
                Maximize your home&apos;s value with strategic pricing,
                marketing, and negotiation expertise.
              </Typography>
            </div>

            <div className="text-center p-6 bg-secondary rounded-sm shadow-sm ">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-16 h-16 text-purple-600"
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
                Market Analysis
              </Typography>
              <Typography variant="p" className="text-gray-600">
                Get detailed insights into local market trends and property
                values to make informed decisions.
              </Typography>
            </div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="py-16 bg-secondary -mx-4 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Typography variant="h2">Featured Properties</Typography>
              <Typography variant="p" className="text-gray-600 mt-4">
                Discover exceptional homes currently available in the Fargo
                area.
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/listings"
                className="bg-[#0d3b69] text-white px-8 py-3 rounded-lg hover:bg-[#0c3a59] transition-colors font-semibold"
              >
                View All Listings
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Typography variant="h2" className="mb-6">
                Why Choose Real Estate of Mind?
              </Typography>

              <Typography variant="p" className="mb-4">
                With years of experience in the Fargo-Moorhead real estate
                market, Real Estate of Mind brings deep local knowledge and a
                commitment to exceptional service to every client relationship.
              </Typography>

              <Typography variant="p" className="mb-6">
                Real Estate of Mind&apos;s approach focuses on clear
                communication, honest advice, and putting your needs first.
                Whether you&apos;re a first-time buyer or experienced investor,
                you&apos;ll receive personalized attention and expert guidance
                throughout your real estate journey.
              </Typography>

              <Link
                href="/about"
                className="inline-block text-accent hover:text-primary-hover font-semibold"
              >
                Learn More About Real Estate of Mind →
              </Link>
            </div>

            <div className="bg-secondary p-8 rounded-lg">
              <Typography variant="h3" className="mb-4">
                Ready to Get Started?
              </Typography>
              <Typography variant="p" className="mb-6">
                Whether you&apos;re buying or selling, Real Estate of Mind is
                here to help you achieve your real estate goals. Get in touch
                today for a free consultation.
              </Typography>

              <div className="mb-8 space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-secondary-foreground mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>(701) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-secondary-foreground mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>realestate@realestateofmind.com</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="bg-[#0d3b69] mt-8 text-white px-8 py-3 rounded-lg hover:bg-[#0c3a59] transition-colors font-semibold"
              >
                Contact Real Estate of Mind
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
