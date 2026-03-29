import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, User, Phone, Mail } from "lucide-react";
import { useState } from "react";

/**
 * Bookings Page - User's booking history and status
 * Design: Warm Hospitality
 */

interface Booking {
  id: number;
  property: string;
  location: string;
  landlord: string;
  landlordPhone: string;
  landlordEmail: string;
  checkIn: string;
  checkOut: string;
  price: number;
  status: "confirmed" | "pending" | "cancelled";
  totalDays: number;
  totalPrice: number;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      property: "Sunrise PG",
      location: "Jaipur",
      landlord: "Rajesh Kumar",
      landlordPhone: "+91-9876543210",
      landlordEmail: "rajesh@nestify.com",
      checkIn: "2026-04-01",
      checkOut: "2026-06-30",
      price: 4000,
      status: "confirmed",
      totalDays: 91,
      totalPrice: 364000,
    },
    {
      id: 2,
      property: "Green Valley",
      location: "Delhi",
      landlord: "Priya Singh",
      landlordPhone: "+91-8765432109",
      landlordEmail: "priya@nestify.com",
      checkIn: "2026-05-15",
      checkOut: "2026-07-15",
      price: 5500,
      status: "pending",
      totalDays: 61,
      totalPrice: 335500,
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleCancelBooking = (id: number) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-accent/20 text-accent";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="p-6 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {booking.property}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {booking.location}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Check-in
                      </p>
                      <p className="font-semibold text-foreground">
                        {booking.checkIn}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Check-out
                      </p>
                      <p className="font-semibold text-foreground">
                        {booking.checkOut}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Total
                      </p>
                      <p className="font-semibold text-foreground">
                        ₹{booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                    >
                      View Details
                    </Button>
                    {booking.status !== "cancelled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full text-red-600 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelBooking(booking.id);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 rounded-2xl text-center">
                <p className="text-muted-foreground">
                  You don't have any bookings yet.
                </p>
              </Card>
            )}
          </div>

          {/* Booking Details */}
          <div className="lg:col-span-1">
            {selectedBooking ? (
              <div className="space-y-4">
                <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">
                    Booking Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price/Month</span>
                      <span className="font-semibold text-foreground">
                        ₹{selectedBooking.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Days</span>
                      <span className="font-semibold text-foreground">
                        {selectedBooking.totalDays}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-primary text-lg">
                        ₹{selectedBooking.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">
                    Landlord Contact
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {selectedBooking.landlord.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedBooking.landlord}
                      </p>
                      <p className="text-xs text-muted-foreground">Landlord</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`tel:${selectedBooking.landlordPhone}`}
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{selectedBooking.landlordPhone}</span>
                    </a>
                    <a
                      href={`mailto:${selectedBooking.landlordEmail}`}
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{selectedBooking.landlordEmail}</span>
                    </a>
                  </div>
                </Card>

                <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                  Message Landlord
                </Button>
              </div>
            ) : (
              <Card className="p-6 rounded-2xl text-center">
                <p className="text-muted-foreground">
                  Select a booking to view details
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
