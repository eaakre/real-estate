import { Typography } from "@/components/ui/Typography";
import { ListingCard } from "@/app/listings/ListingCard";
import { getIdxListings } from "../../../lib/idx";
import type { Metadata } from "next";
import { Listing } from "../../../types/listing";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Jeremy Kopp, a trusted real estate agent serving Fargo, Moorhead, and West Fargo. Discover his experience, approach, and commitment to helping clients buy and sell homes.",
  openGraph: {
    title: "About Jeremy Kopp - Fargo Real Estate",
    description:
      "Learn about Jeremy Kopp, your local real estate expert for Fargo, Moorhead, and West Fargo.",
    url: "https://jeremykopp.com/about",
    type: "website",
  },
  alternates: {
    canonical: "https://jeremykopp.com/about",
  },
};

export default async function AboutPage() {
  const listings: Listing[] = await getIdxListings();
  const featuredListings = listings.slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Typography variant="h1">About Jeremy Kopp</Typography>

      <Typography variant="p">
        Jeremy Kopp is a dedicated real estate agent serving Fargo, Moorhead,
        and West Fargo. With years of experience in the local housing market,
        Jeremy helps clients buy and sell homes with confidence and ease.
      </Typography>

      <Typography variant="p">
        Jeremy’s approach focuses on clear communication, honesty, and putting
        his clients’ needs first. Whether you are a first-time buyer or looking
        to sell your home, Jeremy is committed to providing a smooth and
        successful experience.
      </Typography>

      <Typography variant="p">
        Outside of real estate, Jeremy enjoys exploring the local community,
        staying up to date with market trends, and helping people achieve their
        homeownership dreams.
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
