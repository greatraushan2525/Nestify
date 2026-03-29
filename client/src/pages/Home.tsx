import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PROPERTIES } from "@/lib/propertyData";
import PropertyCard from "@/components/PropertyCard";

/**
 * Home Page - Warm Hospitality Design
 * Features: Hero section, search bar, property listings with filters
 * Design: Warm colors, rounded cards, organic layout
 */



export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "mid" | "high">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "boys" | "girls" | "co-ed">("all");

  // Filter properties based on search and filters
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      const locationMatch = property.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());

      let priceMatch = true;
      if (priceFilter === "low") priceMatch = property.price < 5000;
      if (priceFilter === "mid") priceMatch = property.price >= 5000 && property.price <= 7000;
      if (priceFilter === "high") priceMatch = property.price > 7000;

      const typeMatch = typeFilter === "all" || property.type === typeFilter;

      return locationMatch && priceMatch && typeMatch;
    });
  }, [searchLocation, priceFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663490327936/TzN54ThndsQfyZ4yvrXWYy/nestify-hero-MypPbgT6S6Y4WWu5X8Nsnd.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover comfortable PG accommodations and hostels tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Search Location
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter city or area..."
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
                className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground"
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
                className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground"
              >
                <option value="all">All Types</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="co-ed">Co-ed</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Available Properties
            </h2>
            <p className="text-muted-foreground">
              {filteredProperties.length} properties found
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
                variant="outline"
                onClick={() => {
                  setSearchLocation("");
                  setPriceFilter("all");
                  setTypeFilter("all");
                }}
                className="rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Nestify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Easy Search",
                description: "Find properties by location, price, and amenities in seconds",
              },
              {
                icon: "💬",
                title: "Direct Contact",
                description: "Message landlords and get instant responses to your queries",
              },
              {
                icon: "⭐",
                title: "Verified Reviews",
                description: "Read authentic reviews from current and past residents",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
