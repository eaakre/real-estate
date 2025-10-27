"use client";
import Link from "next/link";
import { Listing } from "../../../types/listing";
import Image from "next/image";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`} className="block">
      <div className="bg-white rounded-sm shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-w-16 aspect-h-12">
          {listing?.image && (
            <Image
              src={listing.image?.[0]}
              alt={listing.address}
              width={384}
              height={288}
              className="w-full h-48 object-cover"
            />
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-green-600">
              {listing.price}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                listing.status === "For Sale"
                  ? "bg-green-100 text-green-800"
                  : listing.status === "Sold"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {listing.status}
            </span>
          </div>

          <p className="text-gray-800 font-medium mb-2">{listing.address}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span>
              {listing.beds} bed{listing.beds !== 1 ? "s" : ""}
            </span>
            <span>
              {listing.baths} bath{listing.baths !== 1 ? "s" : ""}
            </span>
            <span>{listing.sqft.toLocaleString()} sqft</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Built {listing.yearBuilt}</span>
            <span>{listing.propertyType}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
