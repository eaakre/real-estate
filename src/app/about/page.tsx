import { Typography } from "@/components/ui/Typography";
import { ListingCard } from "@/app/listings/ListingCard";
import { getIdxListings } from "../../../lib/idx";
import type { Metadata } from "next";
import { Listing } from "../../../types/listing";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Real Estate of Mind, trusted real estate agents serving Fargo, Moorhead, and West Fargo. Discover their experience, approach, and commitment to helping clients buy and sell homes.",
  openGraph: {
    title: "About Real Estate of Mind - Fargo Real Estate",
    description:
      "Learn about Real Estate of Mind, your local real estate experts for Fargo, Moorhead, and West Fargo.",
    url: "http://localhost:3000/about",
    type: "website",
  },
  alternates: {
    canonical: "http://localhost:3000/about",
  },
};

export default async function AboutPage() {
  const listings: Listing[] = await getIdxListings();
  const featuredListings = listings.slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Typography variant="h1">About Real Estate of Mind</Typography>

      <Typography variant="p">
        Real Estate of Mind are dedicated real estate agents serving Fargo,
        Moorhead, and West Fargo. With years of experience in the local housing
        market, Real Estate of Mind helps clients buy and sell homes with
        confidence and ease.
      </Typography>

      <Typography variant="p">
        Real Estate of Mind&apos;s approach focuses on clear communication,
        honesty, and putting their clients&apos; needs first. Whether you are a
        first-time buyer or looking to sell your home, Real Estate of Mind is
        committed to providing a smooth and successful experience.
      </Typography>

      <Typography variant="p">
        Outside of real estate, the agents at Real Estate of Mind enjoys
        exploring the local community, staying up to date with market trends,
        and helping people achieve their homeownership dreams.
      </Typography>

      {/* Featured Listings */}
      <section className="mt-12">
        <Typography variant="h2">Featured Listings</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </main>
  );
}
