import { getIdxListings } from "../../../lib/idx";
import type { Metadata } from "next";
import { ListingsPageClient } from "./ListingsPageClient";
import { Listing } from "../../../types/listing";
import { Typography } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Listings | Jeremy Kopp Real Estate",
  description:
    "Browse current real estate listings in Fargo, Moorhead, and West Fargo. Find homes for sale, view details, and explore featured properties.",
};

export default async function ListingsPage() {
  const allListings: Listing[] = (await getIdxListings()) as Listing[];

  // pass fetched listings to client component
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Typography variant="h1">Current Listings</Typography>
      <Typography variant="p" className="mb-4">
        Browse current homes for sale in Fargo, Moorhead, and West Fargo. Use
        the filters below to narrow your search.
      </Typography>
      <ListingsPageClient allListings={allListings} />
    </main>
  );
}
