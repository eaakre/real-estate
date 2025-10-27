export interface SimplyRetsListing {
  mlsId?: number;
  listingId: string;
  address?: {
    full?: string;
  };
  listPrice?: number;
  listingStatus?: string;
  photos?: string[];
  property?: {
    bedrooms?: number;
    bathsFull?: number;
    area?: number;
    yearBuilt?: number;
    lotSize?: number;
    type?: string;
    garageSpaces?: number;
  };
  mls?: {
    status?: string;
  };
}
