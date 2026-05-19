import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MapPin, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import {
  getAllProperties,
  CITIES,
  CITY_LOCATIONS,
  getPropertiesNearColleges,
  COLLEGES,
} from "@/lib/propertyData";
import PropertyCard from "@/components/PropertyCard";

/**
 * Home Page - Warm Hospitality Design
 * Features: Hero section, search bar, advanced sorting, pagination, property listings with filters
 * Design: Warm colors, rounded cards, organic layout
 */

type SortOption = "newest" | "price-low" | "price-high" | "rating" | "distance";

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "mid" | "high">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "boys" | "girls" | "co-ed">("all");
  const [showNearColleges, setShowNearColleges] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const allProperties = getAllProperties();
  const locations = selectedCity ? CITY_LOCATIONS[selectedCity] || [] : [];

  const [realProperties, setRealProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => setRealProperties(data))
      .catch(console.error);
  }, []);

  const filteredProperties = useMemo(() => {
    // Combine static properties with real ones from API
    let filtered = [...allProperties, ...realProperties];

    // Filter by city if selected
    if (selectedCity) {
      filtered = filtered.filter((p) => p.city.toLowerCase() === selectedCity.toLowerCase());
    }

    // Filter by location if selected
    if (selectedLocation) {
      filtered = filtered.filter((p) => p.location.toLowerCase() === selectedLocation.toLowerCase());
    }

    // Filter by search location
    if (searchLocation) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
          p.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filter by price
    if (priceFilter !== "all") {
      filtered = filtered.filter((p) => {
        const price = p.price;
        if (priceFilter === "low") return price < 5000;
        if (priceFilter === "mid") return price >= 5000 && price < 10000;
        if (priceFilter === "high") return price >= 10000;
        return true;
      });
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((p) => p.type === typeFilter);
    }

    // Filter by near colleges
    if (showNearColleges) {
      filtered = filtered.filter((p) => p.nearbyColleges && p.nearbyColleges.length > 0);
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "distance") {
      // Sort by distance if available
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [
    allProperties,
    realProperties,
    selectedCity,
    selectedLocation,
    searchLocation,
    priceFilter,
    typeFilter,
    showNearColleges,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-rose-50 py-12 px-4 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-orange-600">Nest</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover comfortable PGs and hostels near your college
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
            <div className="flex-1 flex items-center px-4">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <Input
                placeholder="Search by location or property name..."
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-0 focus:ring-0 text-base"
              />
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocation("");
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Cities</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          {selectedCity && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={priceFilter}
              onChange={(e) => {
                setPriceFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="low">Below ₹5,000</option>
              <option value="mid">₹5,000 - ₹10,000</option>
              <option value="high">Above ₹10,000</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="co-ed">Co-ed</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest</option>
            </select>
          </div>
        </div>

        {/* Near Colleges Toggle */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="checkbox"
            id="nearColleges"
            checked={showNearColleges}
            onChange={(e) => {
              setShowNearColleges(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="nearColleges" className="text-sm font-medium text-gray-700">
            Show only properties near colleges
          </label>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{currentProperties.length}</span> of{" "}
            <span className="font-semibold">{filteredProperties.length}</span> properties
          </p>
          {filteredProperties.length > 0 && (
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        {currentProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No properties found matching your criteria</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                className={`rounded-full w-10 h-10 p-0 ${
                  currentPage === page ? "bg-orange-600 hover:bg-orange-700" : ""
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
