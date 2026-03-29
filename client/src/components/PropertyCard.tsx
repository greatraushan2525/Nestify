import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Wifi, UtensilsCrossed, Users, Heart } from "lucide-react";
import { Property } from "@/lib/propertyData";
import { useState } from "react";

/**
 * PropertyCard Component - Reusable property listing card
 * Design: Warm Hospitality - Rounded corners, warm colors, smooth interactions
 */

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Link href={`/property/${property.id}`}>
      <a className="no-underline">
        <Card className="overflow-hidden hover:shadow-lg transition-all rounded-2xl h-full flex flex-col group">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              ₹{property.price}/mo
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsSaved(!isSaved);
              }}
              className="absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? "fill-primary text-primary" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-display text-lg font-bold text-foreground mb-1 line-clamp-2">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(property.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {property.rating} ({property.reviews})
              </span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {property.food && (
                <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                  <UtensilsCrossed className="w-3 h-3" />
                  Food
                </div>
              )}
              {property.ac && (
                <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                  ❄️
                  <span>AC</span>
                </div>
              )}
              {property.wifi && (
                <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                  <Wifi className="w-3 h-3" />
                  WiFi
                </div>
              )}
            </div>

            {/* Type Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-4">
              <Users className="w-4 h-4" />
              {property.type === "boys"
                ? "Boys Only"
                : property.type === "girls"
                ? "Girls Only"
                : "Co-ed"}
            </div>
          </div>

          {/* CTA */}
          <div className="p-4 border-t border-border">
            <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </div>
        </Card>
      </a>
    </Link>
  );
}
