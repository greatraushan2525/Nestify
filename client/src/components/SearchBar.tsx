import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, DollarSign, Users } from "lucide-react";
import { useState } from "react";

/**
 * SearchBar Component - Advanced search with multiple filters
 * Design: Warm Hospitality - Rounded corners, warm colors
 */

interface SearchBarProps {
  onSearch: (location: string, priceRange: string, type: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [type, setType] = useState("all");

  const handleSearch = () => {
    onSearch(location, priceRange, type);
  };

  return (
    <div className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Location */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <Input
              type="text"
              placeholder="Enter city or area..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-full border-border"
            />
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
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
              <Users className="w-4 h-4 inline mr-2" />
              Property Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-border bg-background text-foreground"
            >
              <option value="all">All Types</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="co-ed">Co-ed</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full rounded-full bg-primary hover:bg-primary/90"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
