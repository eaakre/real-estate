// lib/idx.ts
import { Listing } from "../types/listing";
import { SimplyRetsListing } from "../types/simplyRetsListing";

// SimplyRETS test credentials (these are public demo credentials)
const SIMPLYRETS_USERNAME = "simplyrets";
const SIMPLYRETS_PASSWORD = "simplyrets";
const SIMPLYRETS_BASE_URL = "https://api.simplyrets.com";

// Helper function to create auth header
function getAuthHeader(): string {
  const credentials = btoa(`${SIMPLYRETS_USERNAME}:${SIMPLYRETS_PASSWORD}`);
  return `Basic ${credentials}`;
}

// Helper function to format price from number to string
function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

// Helper function to map SimplyRETS data to your Listing type
function mapSimplyRetsToListing(property: SimplyRetsListing): Listing {
  return {
    id:
      property.mlsId?.toString() ||
      property.listingId?.toString() ||
      Math.random().toString(),
    address: `${property.address?.full || "Address not available"}`,
    price: formatPrice(property.listPrice || 0),
    beds: property.property?.bedrooms || 0,
    baths: property.property?.bathsFull || 0,
    sqft: property.property?.area || 0,
    yearBuilt: property.property?.yearBuilt || 1900,
    lotSize: property.property?.lotSize || 0,
    propertyType: property.property?.type || "Single Family",
    garageSpaces: property.property?.garageSpaces || 0,
    image: property.photos || ["/listings/placeholder.jpg"],
    status: property.listingStatus || "For Sale",
  };
}

export async function getIdxListings(limit: number = 50): Promise<Listing[]> {
  try {
    const response = await fetch(
      `${SIMPLYRETS_BASE_URL}/properties?limit=${limit}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        // Add cache control for development
        cache: "no-store", // or 'force-cache' for production
      }
    );

    if (!response.ok) {
      throw new Error(
        `SimplyRETS API error: ${response.status} ${response.statusText}`
      );
    }

    const properties = await response.json();

    // Map the SimplyRETS data to your Listing format
    const listings: Listing[] = properties.map(mapSimplyRetsToListing);

    console.log(`Fetched ${listings.length} listings from SimplyRETS`);
    return listings;
  } catch (error) {
    console.error("Error fetching IDX listings:", error);

    // Fallback to mock data if API fails
    const { mockIdxListings } = await import("../data/mockIdxListings");
    console.log("Using fallback mock data");
    return mockIdxListings;
  }
}

// Optional: Add function to get a single listing by ID
export async function getIdxListing(
  listingId: string
): Promise<Listing | null> {
  console.log(listingId);
  try {
    const response = await fetch(
      `${SIMPLYRETS_BASE_URL}/properties/${listingId}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(
        `SimplyRETS API error: ${response.status} ${response.statusText}`
      );
    }

    const property = await response.json();
    return mapSimplyRetsToListing(property);
  } catch (error) {
    console.error("Error fetching single listing:", error);
    return null;
  }
}

// Optional: Add function with filters for your filter component
export async function getFilteredIdxListings(filters: {
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  propertyType?: string;
  status?: string;
  limit?: number;
}): Promise<Listing[]> {
  try {
    // Build query parameters
    const params = new URLSearchParams();

    if (filters.minPrice)
      params.append("minprice", filters.minPrice.toString());
    if (filters.maxPrice)
      params.append("maxprice", filters.maxPrice.toString());
    if (filters.minBeds) params.append("minbeds", filters.minBeds.toString());
    if (filters.minBaths)
      params.append("minbaths", filters.minBaths.toString());
    if (filters.propertyType && filters.propertyType !== "All") {
      params.append("type", filters.propertyType);
    }
    if (filters.status && filters.status !== "All") {
      params.append("status", filters.status);
    }
    params.append("limit", (filters.limit || 50).toString());

    const response = await fetch(
      `${SIMPLYRETS_BASE_URL}/properties?${params.toString()}`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `SimplyRETS API error: ${response.status} ${response.statusText}`
      );
    }

    const properties = await response.json();
    return properties.map(mapSimplyRetsToListing);
  } catch (error) {
    console.error("Error fetching filtered listings:", error);

    // Fallback to regular fetch
    return getIdxListings(filters.limit);
  }
}
