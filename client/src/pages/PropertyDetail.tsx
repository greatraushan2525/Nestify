import { useRoute } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare, Share2, Heart, MessageCircle, BookOpen } from "lucide-react";
import { getPropertyById } from "@/lib/propertyData";
import { useWishlist } from "@/contexts/WishlistContext";
import LiveChat from "@/components/LiveChat";
import VirtualTour from "@/components/VirtualTour";
import InstantBooking from "@/components/InstantBooking";

/**
 * Property Detail Page - Warm Hospitality Design
 * Features: Virtual tours, instant booking, live chat, wishlist, full property information
 */

export default function PropertyDetail() {
  const [, params] = useRoute("/property/:id");
  const propertyId = params?.id ? parseInt(params.id) : 1;
  const property = getPropertyById(propertyId);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showChat, setShowChat] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Property Not Found
          </h1>
          <p className="text-muted-foreground">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const isSaved = isInWishlist(property.id);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Virtual Tour */}
            <div className="mb-6">
              <VirtualTour property={property} />
            </div>

            {/* Details */}
            <Card className="p-6 rounded-2xl mb-6">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5" />
                {property.location}, {property.city}
              </div>

              {/* Proximity Info */}
              {(property.nearCollege || property.nearMetro) && (
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  {property.nearCollege && (
                    <div className="text-sm">
                      <p className="text-blue-600 font-semibold">{property.nearCollege.distance}</p>
                      <p className="text-blue-700 text-xs">{property.nearCollege.name}</p>
                    </div>
                  )}
                  {property.nearMetro && (
                    <div className="text-sm">
                      <p className="text-purple-600 font-semibold">{property.nearMetro.distance}</p>
                      <p className="text-purple-700 text-xs">{property.nearMetro.name}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-foreground">{property.description}</p>
              </div>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent"></div>
                    <span className="text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Rooms</p>
                  <p className="font-bold text-foreground">{property.rooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-bold text-foreground">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parking</p>
                  <p className="font-bold text-foreground">
                    {property.parking ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-bold text-foreground capitalize">{property.type}</p>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            <Card className="p-6 rounded-2xl">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Reviews ({property.reviews})
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">Reviewer {i}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Great place to stay with friendly landlord and good amenities.
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Price Card */}
            <Card className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 sticky top-8">
              <div className="text-3xl font-bold text-primary mb-2">
                ₹{property.price.toLocaleString()}
              </div>
              <p className="text-muted-foreground mb-4">per month</p>
              <Button
                className="w-full rounded-full bg-primary hover:bg-primary/90 mb-3 font-semibold"
                onClick={() => setShowBooking(true)}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Book Now
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full mb-3"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() =>
                  isSaved ? removeFromWishlist(property.id) : addToWishlist(property)
                }
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isSaved ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </Card>

            {/* Live Chat */}
            {showChat && (
              <Card className="p-0 rounded-2xl mb-6 overflow-hidden h-96">
                <LiveChat property={property} onClose={() => setShowChat(false)} />
              </Card>
            )}

            {/* Landlord Card */}
            <Card className="p-6 rounded-2xl mb-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Landlord Details
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {property.landlord.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {property.landlord.name}
                  </p>
                  {property.landlord.verified && (
                    <p className="text-xs text-accent">✓ Verified</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${property.landlord.phone}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {property.landlord.phone}
                </a>
                <a
                  href={`mailto:${property.landlord.email}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {property.landlord.email}
                </a>
              </div>
            </Card>

            {/* Share Card */}
            <Card className="p-6 rounded-2xl">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Share
              </h3>
              <Button variant="outline" className="w-full rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Property
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Instant Booking Modal */}
      <InstantBooking
        property={property}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
}
