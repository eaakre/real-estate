"use client";

import { useState, useEffect, useCallback } from "react";
import { ListingsFilter, FilterState } from "./ListingsFilter";
import { ListingCard } from "./ListingCard";
import { getFilteredIdxListings } from "../../../lib/idx";
import { Listing } from "../../../types/listing";
import { Loader2 } from "lucide-react";

interface ListingsPageClientProps {
  allListings: Listing[];
}

export function ListingsPageClient({ allListings }: ListingsPageClientProps) {
  const [filteredListings, setFilteredListings] =
    useState<Listing[]>(allListings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterState | null>(
    null
  );

  // Function to apply filters
  const handleFilterChange = useCallback(
    async (filters: FilterState) => {
      setLoading(true);
      setError(null);

      console.log("Applying filters:", filters); // Debug log

      try {
        // Check if filters are "empty" (all default values)
        const isEmptyFilter =
          filters.minPrice === 0 &&
          filters.maxPrice === 20000000 &&
          filters.minBeds === 0 &&
          filters.minBaths === 0 &&
          filters.status === "All" &&
          filters.propertyType === "All" &&
          filters.minYear === 1900 &&
          filters.maxYear === new Date().getFullYear();

        if (isEmptyFilter) {
          // No filters applied, use original listings
          console.log("No filters applied, using all listings");
          setFilteredListings(allListings);
          setCurrentFilters(null);
        } else {
          // Apply filters via API first, then client-side for unsupported filters
          const apiFilters = {
            minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
            maxPrice:
              filters.maxPrice < 20000000 ? filters.maxPrice : undefined,
            minBeds: filters.minBeds > 0 ? filters.minBeds : undefined,
            minBaths: filters.minBaths > 0 ? filters.minBaths : undefined,
            // Skip API filtering for property type and status for now - handle client-side
            limit: 100,
          };

          console.log("API filters:", apiFilters);
          const newListings = await getFilteredIdxListings(apiFilters);
          console.log(`API returned ${newListings.length} listings`);

          // Apply client-side filtering for all fields to ensure accuracy
          const finalListings = applyClientSideFilters(newListings, filters);
          console.log(
            `After client-side filtering: ${finalListings.length} listings`
          );

          setFilteredListings(finalListings);
          setCurrentFilters(filters);
        }
      } catch (err) {
        console.error("Filter error:", err);
        setError("Failed to apply filters. Using local filtering instead.");

        // Fallback to client-side filtering on original data
        const clientFiltered = applyClientSideFilters(allListings, filters);
        console.log(`Fallback filtering: ${clientFiltered.length} listings`);
        setFilteredListings(clientFiltered);
        setCurrentFilters(filters);
      } finally {
        setLoading(false);
      }
    },
    [allListings]
  );

  // Client-side filtering fallback
  const applyClientSideFilters = (
    listings: Listing[],
    filters: FilterState
  ): Listing[] => {
    console.log("Applying client-side filters to", listings.length, "listings");

    return listings.filter((listing) => {
      // Price filtering (remove $ and commas for comparison)
      const listingPrice = parseInt(listing.price.replace(/[$,]/g, ""));
      if (filters.minPrice > 0 && listingPrice < filters.minPrice) {
        console.log(
          `Filtered out ${listing.address} - price ${listingPrice} < ${filters.minPrice}`
        );
        return false;
      }
      if (filters.maxPrice < 20000000 && listingPrice > filters.maxPrice) {
        console.log(
          `Filtered out ${listing.address} - price ${listingPrice} > ${filters.maxPrice}`
        );
        return false;
      }

      // Bed/bath filtering
      if (filters.minBeds > 0 && listing.beds < filters.minBeds) {
        console.log(
          `Filtered out ${listing.address} - beds ${listing.beds} < ${filters.minBeds}`
        );
        return false;
      }
      if (filters.minBaths > 0 && listing.baths < filters.minBaths) {
        console.log(
          `Filtered out ${listing.address} - baths ${listing.baths} < ${filters.minBaths}`
        );
        return false;
      }

      // Property type filtering - handle various formats
      if (filters.propertyType !== "All") {
        const listingType = listing.propertyType?.toLowerCase() || "";
        const filterType = filters.propertyType.toLowerCase();

        // More flexible matching
        const typeMatches =
          listingType === filterType ||
          listingType.includes(filterType) ||
          filterType.includes(listingType) ||
          (filterType === "single family" &&
            (listingType === "res" || listingType.includes("single"))) ||
          (filterType === "condo" &&
            (listingType === "con" || listingType.includes("condo"))) ||
          (filterType === "rental" &&
            (listingType === "rnt" || listingType.includes("rent")));

        if (!typeMatches) {
          console.log(
            `Filtered out ${listing.address} - type "${listingType}" doesn't match "${filterType}"`
          );
          return false;
        }
      }

      // Status filtering - handle various formats
      if (filters.status !== "All") {
        const listingStatus = listing.status?.toLowerCase() || "";
        const filterStatus = filters.status.toLowerCase();

        const statusMatches =
          listingStatus === filterStatus ||
          listingStatus.includes(filterStatus) ||
          (filterStatus === "for sale" && listingStatus === "active") ||
          (filterStatus === "active" && listingStatus === "for sale");

        if (!statusMatches) {
          console.log(
            `Filtered out ${listing.address} - status "${listingStatus}" doesn't match "${filterStatus}"`
          );
          return false;
        }
      }

      // Year built filtering
      if (filters.minYear > 1900 && listing.yearBuilt < filters.minYear) {
        console.log(
          `Filtered out ${listing.address} - year ${listing.yearBuilt} < ${filters.minYear}`
        );
        return false;
      }
      if (
        filters.maxYear < new Date().getFullYear() &&
        listing.yearBuilt > filters.maxYear
      ) {
        console.log(
          `Filtered out ${listing.address} - year ${listing.yearBuilt} > ${filters.maxYear}`
        );
        return false;
      }

      return true;
    });
  };

  // Initialize with all listings
  useEffect(() => {
    setFilteredListings(allListings);
  }, [allListings]);

  return (
    <div className="space-y-6">
      {/* Filter Component */}
      <ListingsFilter onFilterChange={handleFilterChange} />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredListings.length}</span> of{" "}
            <span className="font-semibold">{allListings.length}</span>{" "}
            properties
          </p>

          {currentFilters && (
            <button
              onClick={() =>
                handleFilterChange({
                  minBeds: 0,
                  maxBeds: 10,
                  minBaths: 0,
                  minPrice: 0,
                  maxPrice: 20000000,
                  status: "All",
                  propertyType: "All",
                  minYear: 1900,
                  maxYear: new Date().getFullYear(),
                })
              }
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Updating results...</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Search Notice
              </h3>
              <p className="mt-1 text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria to find more properties.
          </p>
          <button
            onClick={() =>
              handleFilterChange({
                minBeds: 0,
                maxBeds: 10,
                minBaths: 0,
                minPrice: 0,
                maxPrice: 20000000,
                status: "All",
                propertyType: "All",
                minYear: 1900,
                maxYear: new Date().getFullYear(),
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            View All Properties
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
