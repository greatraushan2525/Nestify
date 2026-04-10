import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, Trash2, Maximize2, MapPin, Star, Wind, Wifi, UtensilsCrossed } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * Wishlist Page - View saved properties and compare
 * Design: Warm Hospitality
 */

export default function Wishlist() {
  const { wishlist, comparison, removeFromWishlist, addToComparison, removeFromComparison, isInComparison, clearComparison } = useWishlist();
  const [showComparison, setShowComparison] = useState(false);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Your Wishlist is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Start adding properties to your wishlist to save them for later!
            </p>
            <Link href="/">
              <a className="no-underline">
                <Button className="rounded-full bg-primary hover:bg-primary/90">
                  Browse Properties
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlist.length} properties saved • {comparison.length} in comparison
          </p>
        </div>

        {/* Comparison Section */}
        {comparison.length > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Comparing {comparison.length} Properties
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearComparison}
                className="rounded-full"
              >
                Clear Comparison
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparison.map((property) => (
                <div key={property.id} className="bg-white rounded-lg p-4">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-foreground mb-2">{property.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-primary">
                      ₹{property.price.toLocaleString()}/mo
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{property.rating} ({property.reviews} reviews)</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 rounded-full"
                    onClick={() => removeFromComparison(property.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            {comparison.length > 0 && (
              <Button
                className="w-full mt-4 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => setShowComparison(!showComparison)}
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                {showComparison ? "Hide" : "View"} Detailed Comparison
              </Button>
            )}
          </div>
        )}

        {/* Detailed Comparison Table */}
        {showComparison && comparison.length > 0 && (
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="border border-border p-4 text-left font-bold text-foreground">Feature</th>
                  {comparison.map((property) => (
                    <th key={property.id} className="border border-border p-4 text-left font-bold text-foreground">
                      {property.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Price</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4 text-primary font-bold">
                      ₹{property.price.toLocaleString()}/mo
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-4 font-semibold text-foreground">Type</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">WiFi</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4">
                      {property.wifi ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <Wifi className="w-4 h-4" /> Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-4 font-semibold text-foreground">AC</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4">
                      {property.ac ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <Wind className="w-4 h-4" /> Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Food</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4">
                      {property.food ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <UtensilsCrossed className="w-4 h-4" /> Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-4 font-semibold text-foreground">Parking</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4">
                      {property.parking ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Rating</td>
                  {comparison.map((property) => (
                    <td key={property.id} className="border border-border p-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{property.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Wishlist Grid */}
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Saved Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((property) => (
              <Card key={property.id} className="overflow-hidden rounded-2xl hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                  {isInComparison(property.id) && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                      In Comparison
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-foreground mb-1 line-clamp-2">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-primary text-lg">
                      ₹{property.price.toLocaleString()}/mo
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/property/${property.id}`}>
                      <a className="flex-1 no-underline">
                        <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-sm">
                          View Details
                        </Button>
                      </a>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() =>
                        isInComparison(property.id)
                          ? removeFromComparison(property.id)
                          : addToComparison(property)
                      }
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => removeFromWishlist(property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
