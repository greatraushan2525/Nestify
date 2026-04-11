import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MapPin } from "lucide-react";
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
 * Features: Hero section, search bar, property listings with filters, Near Colleges section
 * Design: Warm colors, rounded cards, organic layout
 */

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "mid" | "high">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "boys" | "girls" | "co-ed">("all");
  const [showNearColleges, setShowNearColleges] = useState(false);

  const allProperties = getAllProperties();
  const locations = selectedCity ? CITY_LOCATIONS[selectedCity] || [] : [];

  const filteredProperties = useMemo(() => {
    let filtered = allProperties;

    // Filter by city if selected
    if (selectedCity) {
      filtered = filtered.filter((p) => p.city === selectedCity);
    }

    // Filter by location if selected
    if (selectedLocation) {
      filtered = filtered.filter((p) => p.location === selectedLocation);
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
  }, [searchLocation, selectedCity, selectedLocation, priceFilter, typeFilter]);

  const nearCollegeProperties = useMemo(() => {
    if (!selectedCity) return [];
    return getPropertiesNearColleges(selectedCity);
  }, [selectedCity]);

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
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* City Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedLocation("");
                }}
                className="w-full px-3 py-2 rounded-full border border-border bg-background text-foreground font-medium text-sm"
              >
                <option value="">All Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            {selectedCity && (
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-full border border-border bg-background text-foreground font-medium text-sm"
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

            {/* Search Location */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Area or PG name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-9 rounded-full border-border text-sm"
                />
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Price
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-full border border-border bg-background text-foreground font-medium text-sm"
              >
                <option value="all">All Prices</option>
                <option value="low">Under ₹5000</option>
                <option value="mid">₹5000 - ₹7000</option>
                <option value="high">Above ₹7000</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-full border border-border bg-background text-foreground font-medium text-sm"
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
                className="w-full rounded-full text-sm h-9"
                onClick={() => {
                  setSelectedCity("");
                  setSelectedLocation("");
                  setSearchLocation("");
                  setPriceFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Near Colleges Section */}
      {selectedCity && nearCollegeProperties.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-display font-bold text-foreground">
                    PGs Near Colleges & Universities
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {nearCollegeProperties.length} properties near educational institutions
                  </p>
                </div>
              </div>
              <Button
                variant={showNearColleges ? "default" : "outline"}
                className="rounded-full text-sm"
                onClick={() => setShowNearColleges(!showNearColleges)}
              >
                {showNearColleges ? "Hide" : "Show"} Near Colleges
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Near Colleges Properties */}
      {showNearColleges && selectedCity && nearCollegeProperties.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Student-Friendly PGs Near Top Colleges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {nearCollegeProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* Properties Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
            Available Properties
          </h2>
          <p className="text-muted-foreground text-sm">
            {filteredProperties.length} properties found
            {selectedCity && ` in ${selectedCity}`}
            {selectedLocation && ` • ${selectedLocation}`}
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
                setSelectedLocation("");
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
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-3xl font-bold text-primary mb-1">
                {allProperties.length}+
              </p>
              <p className="text-xs text-muted-foreground">Properties</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary mb-1">
                {CITIES.length}
              </p>
              <p className="text-xs text-muted-foreground">Cities</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary mb-1">
                50K+
              </p>
              <p className="text-xs text-muted-foreground">Happy Residents</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary mb-1">
                4.6★
              </p>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🔍</span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Easy Search
            </h3>
            <p className="text-sm text-muted-foreground">
              Find properties across 15+ cities with advanced filtering
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">✅</span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Verified Listings
            </h3>
            <p className="text-sm text-muted-foreground">
              All properties verified for your safety
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">💬</span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Direct Chat
            </h3>
            <p className="text-sm text-muted-foreground">
              Message landlords and get instant responses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
