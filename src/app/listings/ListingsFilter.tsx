"use client";

import { useState, ChangeEvent } from "react";
import {
  Search,
  DollarSign,
  Bed,
  Bath,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";

interface ListingsFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  minBeds: number;
  maxBeds: number;
  minBaths: number;
  minPrice: number;
  maxPrice: number;
  status: string;
  propertyType: string;
  minYear: number;
  maxYear: number;
}

export function ListingsFilter({ onFilterChange }: ListingsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minBeds: 0,
    maxBeds: 10,
    minBaths: 0,
    minPrice: 0,
    maxPrice: 20000000,
    status: "All",
    propertyType: "All",
    minYear: 1900,
    maxYear: new Date().getFullYear(),
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const updated = {
      ...filters,
      [name]:
        name.includes("Price") ||
        name.includes("Beds") ||
        name.includes("Year") ||
        name.includes("Baths")
          ? Number(value)
          : value,
    };
    setFilters(updated);
  }

  function handleSearch() {
    onFilterChange(filters);
  }

  function handleReset() {
    const resetFilters = {
      minBeds: 0,
      maxBeds: 10,
      minBaths: 0,
      minPrice: 0,
      maxPrice: 20000000,
      status: "All",
      propertyType: "All",
      minYear: 1900,
      maxYear: new Date().getFullYear(),
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  }

  const hasAdvancedFilters =
    filters.status !== "All" ||
    filters.propertyType !== "All" ||
    filters.minYear !== 1900 ||
    filters.maxYear !== new Date().getFullYear();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Search size={20} />
          Filter Properties
        </h3>
        {hasAdvancedFilters && (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
      </div>

      <div className="space-y-4">
        {/* Always Visible - Essential Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign size={16} className="inline mr-1" />
              Price Range
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  className="w-full h-10 pl-8 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  value={filters.minPrice || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  className="w-full h-10 pl-8 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  value={filters.maxPrice || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Bed size={16} className="inline mr-1" />
              Bedrooms
            </label>
            <select
              name="minBeds"
              value={filters.minBeds}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm"
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Bath size={16} className="inline mr-1" />
              Bathrooms
            </label>
            <select
              name="minBaths"
              value={filters.minBaths}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm"
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expandable Advanced Filters */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <SlidersHorizontal size={16} />
            Advanced Filters
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {hasAdvancedFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>

          {isExpanded && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Property Type and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleChange}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm"
                  >
                    <option value="All">All Types</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Rental">Rental</option>
                    <option value="Land">Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Year Built Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    name="minYear"
                    placeholder="From Year"
                    className="h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    value={filters.minYear || ""}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                  <input
                    type="number"
                    name="maxYear"
                    placeholder="To Year"
                    className="h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    value={filters.maxYear || ""}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleSearch}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <Search size={18} />
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-md font-medium transition-colors duration-200 border border-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
