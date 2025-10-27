// types/listing.ts
export interface Listing {
  // Core listing data
  id: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  garageSpaces: number;
  image: string[];
  status: string;

  // MLS identifiers
  mlsId?: string;
  listingId?: string;

  // Rich content
  description?: string;
  photos?: string[];
  daysOnMarket?: number;

  // Agent information
  agent?: {
    name?: string;
    phone?: string;
    email?: string;
  };

  // Property features
  features?: {
    stories?: number;
    fireplaces?: number;
    pool?: boolean;
    garage?: boolean;
    heating?: string;
    cooling?: string;
    roof?: string;
    foundation?: string;
    exteriorFeatures?: string;
    interiorFeatures?: string;
  };

  // Location details
  location?: {
    city?: string;
    state?: string;
    zip?: string;
    county?: string;
    latitude?: number;
    longitude?: number;
    marketArea?: string;
  };

  // School information
  school?: {
    elementary?: string;
    middle?: string;
    high?: string;
    district?: string;
  };

  // HOA information
  hoa?: {
    fee?: number;
    frequency?: string;
    name?: string;
    amenities?: string;
  };
}
