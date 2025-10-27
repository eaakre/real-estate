import { getIdxListing } from "../../../../lib/idx";
import type { Metadata } from "next";
import { Listing } from "../../../../types/listing";
import { Typography } from "@/components/ui/Typography";
import { Gallery } from "@/components/Gallery";
import { ContactForm } from "@/components/ContactForm";

interface ListingPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing: Listing = (await getIdxListing(id)) as Listing;
  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "The listing you are looking for could not be found.",
    };
  }

  return {
    title: `${listing.address} | ${listing.price}`,
    description: `${listing.beds} beds • ${listing.baths} baths • ${listing.sqft} sqft`,
    openGraph: {
      title: listing.address,
      description: `${listing.beds} beds • ${listing.baths} baths • ${listing.sqft} sqft`,
      url: `https://jeremykopp.com/listings/${listing.id}`,
      images: [listing.image?.[0]],
      type: "website",
    },
    alternates: {
      canonical: `https://jeremykopp.com/listings/${listing.id}`,
    },
  };
}

export default async function ListingsPage({ params }: ListingPageProps) {
  const { id } = await params;

  const listing: Listing = (await getIdxListing(id)) as Listing;

  if (!listing) {
    return (
      <main className="max-w-4xl mx-auto px-4 gap-y-4 py-12">
        <Typography variant="h1">Listing Not Found</Typography>
        <Typography variant="p">
          Sorry, we could not find the listing you are looking for.
        </Typography>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* <Image
        src={listing.image?.[0]}
        alt={listing.address}
        width={778}
        height={576}
        className="w-full h-96 object-cover rounded mb-6"
      /> */}
      <Gallery images={listing.image || []} alt={listing.address} />

      <Typography variant="h1">{listing.address}</Typography>
      <Typography variant="h2" color="muted">
        {listing.price}
      </Typography>

      <div className="grid grid-cols-2 mt-4">
        <Typography variant="p">{listing.beds} beds</Typography>
        <Typography variant="p">{listing.baths} baths</Typography>
        <Typography variant="p">{listing.sqft} sqft</Typography>
        <Typography variant="p">Built in {listing.yearBuilt}</Typography>
        {listing.lotSize && (
          <Typography variant="p">Lot: {listing.lotSize}</Typography>
        )}
        {listing.propertyType && (
          <Typography variant="p">Type: {listing.propertyType}</Typography>
        )}
        {listing.garageSpaces !== undefined && (
          <Typography variant="p">
            Garage: {listing.garageSpaces.toFixed(2)}{" "}
            {listing.garageSpaces === 1 ? "space" : "spaces"}
          </Typography>
        )}
        <Typography variant="p">Status: {listing.status}</Typography>
      </div>
      <ContactForm
        listingId={id}
        listingAddress={listing.address}
        listingPrice={listing.price}
      />
    </main>
  );
}
