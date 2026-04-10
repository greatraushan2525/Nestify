import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PROPERTIES, CITIES, filterProperties } from "@/lib/propertyData";
import PropertyCard from "@/components/PropertyCard";

/**
 * Home Page - Warm Hospitality Design
 * Features: Hero section, search bar, property listings with filters
 * Design: Warm colors, rounded cards, organic layout
 */

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "mid" | "high">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "boys" | "girls" | "co-ed">("all");

  const filteredProperties = useMemo(() => {
    let filtered = PROPERTIES;

    // Filter by city if selected
    if (selectedCity) {
      filtered = filtered.filter((p) => p.city === selectedCity);
    }

    // Filter by search location
    if (searchLocation) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
          p.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filter by price range
    if (priceFilter !== "all") {
      if (priceFilter === "low") {
        filtered = filtered.filter((p) => p.price < 5000);
      } else if (priceFilter === "mid") {
        filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 7000);
      } else if (priceFilter === "high") {
        filtered = filtered.filter((p) => p.price > 7000);
      }
    }

    // Filter by property type
    if (typeFilter !== "all") {
      filtered = filtered.filter((p) => p.type === typeFilter);
    }

    return filtered;
  }, [searchLocation, selectedCity, priceFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-hero-MypPbgT6S6Y4WWu5X8Nsnd.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-display text-5xl font-bold mb-4">Find Your Perfect Home</h1>
          <p className="text-xl">
            Discover comfortable PG accommodations and hostels tailored to your needs
          </p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* City Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground font-medium"
              >
                <option value="">All Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Location */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Search Location
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter area or PG name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 rounded-full border-border"
                />
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Price Range
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground font-medium"
              >
                <option value="all">All Prices</option>
                <option value="low">Under ₹5000</option>
                <option value="mid">₹5000 - ₹7000</option>
                <option value="high">Above ₹7000</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Property Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground font-medium"
              >
                <option value="all">All Types</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="co-ed">Co-ed</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => {
                  setSelectedCity("");
                  setSearchLocation("");
                  setPriceFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Available Properties
          </h2>
          <p className="text-muted-foreground text-lg">
            {filteredProperties.length} properties found
            {selectedCity && ` in ${selectedCity}`}
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No properties found matching your criteria.
            </p>
            <Button
              className="rounded-full bg-primary hover:bg-primary/90"
              onClick={() => {
                setSelectedCity("");
                setSearchLocation("");
                setPriceFilter("all");
                setTypeFilter("all");
              }}
            >
              Clear Filters & Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-4xl font-bold text-primary mb-2">
                {PROPERTIES.length}+
              </p>
              <p className="text-muted-foreground">Properties Listed</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-primary mb-2">
                {CITIES.length}
              </p>
              <p className="text-muted-foreground">Cities Covered</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-primary mb-2">
                50K+
              </p>
              <p className="text-muted-foreground">Happy Residents</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-primary mb-2">
                4.6★
              </p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
          Why Choose Nestify?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Easy Search
            </h3>
            <p className="text-muted-foreground">
              Find properties across 15+ Indian cities with advanced filtering options
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Verified Listings
            </h3>
            <p className="text-muted-foreground">
              All properties and landlords are verified for your safety and peace of mind
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Direct Communication
            </h3>
            <p className="text-muted-foreground">
              Message landlords directly and get instant responses to your queries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
